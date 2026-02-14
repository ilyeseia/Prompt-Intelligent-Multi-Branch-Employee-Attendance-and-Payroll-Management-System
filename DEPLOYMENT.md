# Production Deployment Guide - PayrollPro

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Monitoring & Logging](#monitoring--logging)
7. [Security Hardening](#security-hardening)
8. [Backup & Recovery](#backup--recovery)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS**: Linux (Ubuntu 22.04+ recommended)
- **CPU**: 4+ cores
- **RAM**: 8GB+ (16GB recommended for production)
- **Storage**: 50GB+ SSD
- **Docker**: 24.0+
- **Docker Compose**: 2.20+

### Required Tools
```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

---

## Environment Configuration

### Production Environment Variables

Create `.env.production` file:
```bash
# Application
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_API_URL=https://api.payrollpro.dz

# Database
POSTGRES_DB=payrollpro
POSTGRES_USER=payrolladmin
POSTGRES_PASSWORD=<secure-password>
DATABASE_URL=postgresql://payrolladmin:<password>@db:5432/payrollpro

# Redis
REDIS_URL=redis://redis:6379

# Security
JWT_SECRET=<random-256-bit-secret>
ENCRYPTION_KEY=<32-byte-encryption-key>
CSRF_SECRET=<random-secret>

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@payrollpro.dz
SMTP_PASS=<smtp-password>

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
LOG_LEVEL=info
```

### Generate Secure Secrets
```bash
# Generate JWT secret (256-bit)
openssl rand -base64 32

# Generate encryption key (32 bytes)
openssl rand -hex 32

# Generate CSRF secret
openssl rand -base64 32
```

---

## Docker Deployment

### Quick Start (Development)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start services with health checks
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec backend ./mvnw flyway:migrate

# Verify deployment
curl -f https://payrollpro.dz/health || exit 1
```

### Scaling Services
```bash
# Scale frontend to 3 instances
docker-compose up -d --scale frontend=3

# Use nginx for load balancing
docker-compose up -d nginx
```

---

## Kubernetes Deployment

### Namespace & ConfigMap
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: payrollpro
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: payrollpro-config
  namespace: payrollpro
data:
  NODE_ENV: "production"
  NEXT_PUBLIC_API_URL: "https://api.payrollpro.dz"
```

### Deployment Manifests
```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payrollpro-frontend
  namespace: payrollpro
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payrollpro-frontend
  template:
    metadata:
      labels:
        app: payrollpro-frontend
    spec:
      containers:
      - name: frontend
        image: ghcr.io/ilyeseia/payrollpro-frontend:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        envFrom:
        - configMapRef:
            name: payrollpro-config
        - secretRef:
            name: payrollpro-secrets
```

### Deploy to Kubernetes
```bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n payrollpro

# View logs
kubectl logs -f deployment/payrollpro-frontend -n payrollpro

# Scale deployment
kubectl scale deployment payrollpro-frontend --replicas=5 -n payrollpro
```

---

## CI/CD Pipeline

### GitHub Actions Workflow
The project includes automated CI/CD pipelines:

1. **CI Pipeline** (`.github/workflows/ci.yml`):
   - Linting & type checking
   - Unit & integration tests
   - Build verification
   - Security audit
   - Lighthouse performance check

2. **CD Pipeline** (`.github/workflows/cd.yml`):
   - Docker image build & push
   - Staging deployment
   - Production deployment
   - Automated rollback

### Manual Deployment
```bash
# Trigger deployment via GitHub UI
# Actions -> CD -> Run workflow -> Select environment

# Or via CLI
gh workflow run cd.yml -f environment=production
```

---

## Monitoring & Logging

### Health Endpoints
- `/api/health` - Application health
- `/api/ready` - Readiness probe
- `/api/metrics` - Prometheus metrics

### Logging Configuration
```yaml
# fluentd/fluent.conf
<source>
  @type forward
  port 24224
</source>

<match payrollpro.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  logstash_format true
</match>
```

### Prometheus Metrics
```yaml
# prometheus/prometheus.yml
scrape_configs:
  - job_name: 'payrollpro'
    static_configs:
      - targets: ['frontend:3000', 'backend:8080']
    metrics_path: /api/metrics
```

---

## Security Hardening

### SSL/TLS Configuration
```nginx
# nginx/ssl.conf
ssl_certificate /etc/nginx/ssl/payrollpro.crt;
ssl_certificate_key /etc/nginx/ssl/payrollpro.key;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
add_header Strict-Transport-Security "max-age=63072000" always;
```

### Firewall Rules
```bash
# Allow only necessary ports
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw enable
```

### Security Headers
The application includes these security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: default-src 'self'`

---

## Backup & Recovery

### Database Backup
```bash
# Manual backup
docker-compose exec db pg_dump -U payrolladmin payrollpro > backup_$(date +%Y%m%d).sql

# Automated backup (cron)
0 2 * * * /opt/payrollpro/scripts/backup.sh >> /var/log/payrollpro/backup.log 2>&1
```

### Backup Script
```bash
#!/bin/bash
# scripts/backup.sh

BACKUP_DIR="/opt/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="payrollpro_${TIMESTAMP}.sql.gz"

# Create backup
docker-compose exec -T db pg_dump -U payrolladmin payrollpro | gzip > "${BACKUP_DIR}/${BACKUP_FILE}"

# Upload to S3 (optional)
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" s3://payrollpro-backups/

# Clean old backups (keep 30 days)
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +30 -delete
```

### Disaster Recovery
```bash
# Restore from backup
gunzip -c backup_20240101.sql.gz | docker-compose exec -T db psql -U payrolladmin payrollpro

# Point-in-time recovery (with WAL archives)
# See PostgreSQL documentation for PITR setup
```

---

## Troubleshooting

### Common Issues

#### Container won't start
```bash
# Check logs
docker-compose logs frontend

# Check container status
docker-compose ps

# Restart service
docker-compose restart frontend
```

#### Database connection issues
```bash
# Verify database is running
docker-compose ps db

# Check database logs
docker-compose logs db

# Test connection
docker-compose exec backend ./mvnw spring-boot:run -Dspring-boot.run.arguments="--debug"
```

#### Memory issues
```bash
# Check container memory usage
docker stats

# Increase memory limits
docker-compose up -d --memory=1g frontend
```

### Useful Commands
```bash
# View all logs
docker-compose logs -f

# Execute command in container
docker-compose exec frontend sh

# Rebuild and restart
docker-compose up -d --build

# Clean up unused resources
docker system prune -a
```

---

## Support & Escalation

### Contact Information
- **Development Team**: dev@payrollpro.dz
- **DevOps**: ops@payrollpro.dz
- **Emergency**: +213-XXX-XXXX

### On-Call Procedures
1. Check monitoring dashboard
2. Review recent deployments
3. Check error logs
4. Escalate to senior engineer if unresolved within 15 minutes
