# Deployment Guide - Intelligent Multi-Branch Employee Attendance and Payroll Management System

## System Overview

This deployment guide covers the complete setup and deployment of the enterprise-grade employee attendance and payroll management system for a company with branches in Algiers, Oran, Setif, Annaba, Tamanrasset, and Tindouf.

## Prerequisites

### System Requirements
- Docker & Docker Compose
- Java 17+
- Maven 3.9+
- PostgreSQL 15+
- Redis 7+
- Apache Kafka 7.4+
- Keycloak 23.0+

### Hardware Requirements (Production)
- **CPU**: 8+ cores
- **RAM**: 16GB+ 
- **Storage**: 500GB+ SSD
- **Network**: 1Gbps+ for multi-branch synchronization

## Quick Start

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd intelligent-attendance-payroll

# Build the application
mvn clean package -DskipTests

# Start all services
docker-compose up -d
```

### 2. Service Health Check
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f attendance-app

# Health check endpoints
curl http://localhost:8081/api/v1/actuator/health
```

## Detailed Deployment Steps

### Phase 1: Database Setup

#### PostgreSQL Configuration
```yaml
# docker-compose.yml excerpt for PostgreSQL
postgres:
  image: postgres:15
  environment:
    POSTGRES_DB: attendance_payroll_db
    POSTGRES_USER: attendance_user
    POSTGRES_PASSWORD: ${DB_PASSWORD:-attendance_password}
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - ./sql/init.sql:/docker-entrypoint-initdb.d/init.sql
```

#### Database Initialization Script
```sql
-- sql/init.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Keycloak database
CREATE DATABASE keycloak;
CREATE DATABASE n8n;

-- Initialize with sample data
INSERT INTO branches (branch_id, name, location, timezone, status) VALUES
('ALG', 'Algiers Headquarters', 'Algiers, Algeria', 'Africa/Algiers', 'ACTIVE'),
('ORN', 'Oran Branch', 'Oran, Algeria', 'Africa/Algiers', 'ACTIVE'),
('SET', 'Setif Branch', 'Setif, Algeria', 'Africa/Algiers', 'ACTIVE'),
('ANN', 'Annaba Branch', 'Annaba, Algeria', 'Africa/Algiers', 'ACTIVE'),
('TAM', 'Tamanrasset Branch', 'Tamanrasset, Algeria', 'Africa/Algiers', 'ACTIVE'),
('TND', 'Tindouf Branch', 'Tindouf, Algeria', 'Africa/Algiers', 'ACTIVE');
```

### Phase 2: Authentication Setup

#### Keycloak Configuration
1. Access Keycloak Admin Console: http://localhost:8080/auth/admin
2. Login with admin/admin credentials
3. Create Realm: `attendance`
4. Create Clients:
   - `attendance-webapp` (Public Client)
   - `attendance-api` (Confidential Client)
5. Create Roles:
   - `SYSTEM_ADMIN`
   - `APP_ADMIN`
   - `HR_MANAGER`
   - `PLANNER`
   - `EMPLOYEE`
6. Create Users with appropriate role assignments

#### Spring Security Configuration
```java
// Security configuration already implemented in application.yml
security:
  jwt:
    secret: ${JWT_SECRET:mySecretKey123456789012345678901234567890}
    expiration: 86400000
  oauth2:
    client-registration:
      keycloak:
        client-id: attendance-webapp
        client-secret: ${KEYCLOAK_CLIENT_SECRET}
    provider:
      keycloak:
        issuer-uri: ${KEYCLOAK_ISSUER_URI:http://keycloak:8080/auth/realms/attendance}
```

### Phase 3: Service Configuration

#### Environment Variables
```bash
# .env file
DB_PASSWORD=secure_password_here
JWT_SECRET=your_super_secret_jwt_key_here
KEYCLOAK_CLIENT_SECRET=your_keycloak_client_secret
REDIS_PASSWORD=redis_password_here
```

#### Application Profiles
- `docker` - Docker container environment
- `production` - Production deployment
- `development` - Local development
- `test` - Testing environment

### Phase 4: Monitoring Setup

#### Prometheus Configuration
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'attendance-app'
    static_configs:
      - targets: ['attendance-app:8080']
    metrics_path: '/api/v1/actuator/prometheus'
```

#### Grafana Dashboard
- Access: http://localhost:3000
- Login: admin/admin
- Import dashboards for Spring Boot metrics

## Production Deployment

### Kubernetes Deployment

#### Namespace Setup
```yaml
# k8s/namespace.yml
apiVersion: v1
kind: Namespace
metadata:
  name: attendance-system
```

#### Application Deployment
```yaml
# k8s/attendance-app.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: attendance-app
  namespace: attendance-system
spec:
  replicas: 3
  selector:
    matchLabels:
      app: attendance-app
  template:
    metadata:
      labels:
        app: attendance-app
    spec:
      containers:
      - name: attendance-app
        image: attendance-payroll:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DB_HOST
          value: "postgres-service"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

#### Ingress Configuration
```yaml
# k8s/ingress.yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: attendance-ingress
  namespace: attendance-system
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: attendance.company.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: attendance-app-service
            port:
              number: 8080
```

### Load Balancing

#### HAProxy Configuration
```haproxy
# haproxy/haproxy.cfg
frontend attendance_frontend
    bind *:80
    bind *:443 ssl crt /etc/ssl/certs/attendance.pem
    redirect scheme https if !{ ssl_fc }
    default_backend attendance_backend

backend attendance_backend
    balance roundrobin
    option httpchk GET /api/v1/actuator/health
    server app1 attendance-app:8080 check
    server app2 attendance-app-2:8080 check
    server app3 attendance-app-3:8080 check
```

## Backup and Recovery

### Database Backup
```bash
#!/bin/bash
# backup_database.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="attendance_payroll_db"

# Create backup
pg_dump -h postgres -U attendance_user $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Cleanup old backups (keep last 30 days)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

### Application Data Backup
```bash
# Backup Redis data
redis-cli --rdb /backups/redis_backup_$DATE.rdb

# Backup file uploads
tar -czf /backups/uploads_backup_$DATE.tar.gz /app/uploads/
```

## Security Hardening

### SSL/TLS Configuration
```nginx
# nginx/ssl.conf
server {
    listen 443 ssl http2;
    server_name attendance.company.com;
    
    ssl_certificate /etc/ssl/certs/attendance.pem;
    ssl_certificate_key /etc/ssl/private/attendance.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
}
```

### Firewall Configuration
```bash
# UFW firewall rules
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow from 10.0.0.0/8 to any port 5432
ufw allow from 10.0.0.0/8 to any port 6379
ufw --force enable
```

## Performance Optimization

### Database Optimization
```sql
-- PostgreSQL performance tuning
-- postgresql.conf adjustments
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
```

### Application Performance
```yaml
# application-production.yml
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 100
        order_inserts: true
        order_updates: true
        cache:
          use_second_level_cache: true
          region.factory_class: org.hibernate.cache.jcache.JCacheRegionFactory
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 20000
      idle-timeout: 600000
      max-lifetime: 1800000
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check database connectivity
docker-compose exec postgres psql -U attendance_user -d attendance_payroll_db -c "SELECT 1;"

# Check connection pool
curl http://localhost:8081/api/v1/actuator/health
```

#### 2. Authentication Problems
```bash
# Verify Keycloak connection
curl -X GET "http://keycloak:8080/auth/realms/attendance/.well-known/openid_configuration"

# Check JWT token validation
curl -H "Authorization: Bearer <token>" http://localhost:8081/api/v1/employees
```

#### 3. Performance Issues
```bash
# Monitor application metrics
curl http://localhost:8081/api/v1/actuator/metrics

# Check Kafka lag
docker-compose exec kafka kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group attendance-group
```

### Log Analysis
```bash
# Application logs
docker-compose logs -f attendance-app

# Database logs
docker-compose logs -f postgres

# Kafka logs
docker-compose logs -f kafka

# Application-specific log patterns
grep "ERROR" logs/attendance-payroll.log
grep "WARN" logs/attendance-payroll.log
```

## Maintenance

### Regular Tasks
1. **Daily**: Monitor system health and performance
2. **Weekly**: Review security logs and backup verification
3. **Monthly**: Update dependencies and security patches
4. **Quarterly**: Performance tuning and capacity planning

### Update Procedures
```bash
# Application updates
git pull origin main
mvn clean package -DskipTests
docker build -t attendance-payroll:latest .
docker-compose up -d --force-recreate attendance-app

# Database migrations
mvn flyway:migrate

# Service restart
docker-compose restart
```

This deployment guide provides a comprehensive foundation for deploying and maintaining the intelligent attendance and payroll management system in production environments.