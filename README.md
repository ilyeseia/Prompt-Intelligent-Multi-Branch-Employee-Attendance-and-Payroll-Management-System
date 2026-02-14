# PayrollPro - Enterprise HR Management System

<div align="center">
  <img src="public/logo.svg" alt="PayrollPro Logo" width="120" height="120">
  
  **Intelligent Multi-Branch Employee Attendance and Payroll Management System**
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-green?style=flat-square&logo=spring)](https://spring.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 📋 Overview

PayrollPro is a comprehensive enterprise HR management system designed for businesses in Algeria with multiple branch locations. It provides real-time attendance tracking, payroll processing, and employee management capabilities with a modern full-stack architecture.

### 🌍 Branches Supported
| Branch | Code | Employees |
|--------|------|-----------|
| Algiers Headquarters | ALG | 145 |
| Oran Branch | ORN | 78 |
| Setif Branch | SET | 52 |
| Annaba Branch | ANN | 35 |
| Tamanrasset Branch | TAM | 25 |
| Tindouf Branch | TND | 18 |

---

## 🏗️ Architecture

This project follows a modern full-stack architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Dashboard  │ │  Employees  │ │   Payroll   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Attendance  │ │  Reports    │ │   Charts    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Auth Service│ │Employee Svc │ │ Payroll Svc │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │Attendance Svc│ │ Report Svc │ │  Sync Svc   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ PostgreSQL  │ │    Redis    │ │   Kafka     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 📊 Dashboard
- Real-time statistics overview
- Attendance tracking with live status
- Payroll summaries and trends
- Branch performance metrics

### 👥 Employee Management
- Complete employee directory
- Department organization
- Position tracking
- Contact information management

### ⏰ Attendance System
- Daily attendance tracking
- Late arrival monitoring
- Leave management
- Biometric device integration ready (ZKTeco)

### 💰 Payroll Processing
- Automated salary calculations
- Algeria-specific tax calculations
- Deductions and allowances
- Payslip generation

### 📈 Reports & Analytics
- Visual charts and graphs
- Export to Excel/PDF
- Trend analysis
- Custom report generation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ or Bun
- Java 17+ (for backend)
- Docker & Docker Compose

### Frontend Only (Development)

```bash
# Clone the repository
git clone https://github.com/ilyeseia/Prompt-Intelligent-Multi-Branch-Employee-Attendance-and-Payroll-Management-System.git

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Full Stack with Docker

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🛠️ Technology Stack

### Frontend (Next.js)
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Recharts** | Data visualization |
| **Lucide React** | Icon library |

### Backend (Spring Boot)
| Technology | Purpose |
|------------|---------|
| **Java 17** | Runtime environment |
| **Spring Boot 3.2.0** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database operations |
| **PostgreSQL** | Primary database |
| **Redis** | Caching layer |
| **Apache Kafka** | Real-time messaging |

### DevOps & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Service orchestration |
| **GitHub Actions** | CI/CD pipelines |
| **Nginx** | Reverse proxy |
| **Prometheus** | Metrics collection |
| **Grafana** | Monitoring dashboards |

---

## 📁 Project Structure

```
├── src/                          # Frontend source (Next.js)
│   ├── app/                      # App Router pages
│   │   ├── page.tsx             # Dashboard
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── payroll/             # Business components
│   │   │   ├── charts.tsx       # Data visualization
│   │   │   ├── stat-cards.tsx   # Statistics
│   │   │   └── ...
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript types
├── payroll-system/               # Backend source (Spring Boot)
│   └── src/main/java/
│       └── com/attendance/payroll/
│           ├── entity/          # JPA Entities
│           ├── repository/      # Data access
│           ├── service/         # Business logic
│           └── controller/      # REST APIs
├── __tests__/                   # Test files
├── .github/workflows/           # CI/CD pipelines
├── public/                      # Static assets
├── Dockerfile                   # Frontend container
├── docker-compose.yml           # Full stack deployment
└── DEPLOYMENT.md                # Deployment guide
```

---

## 🧪 Testing

### Frontend Tests
```bash
# Run tests
bun test

# Run with coverage
bun test:coverage

# Run linting
bun lint
```

### Backend Tests
```bash
# Unit tests
mvn test

# Integration tests
mvn integration-test
```

---

## 🐳 Docker Deployment

### Services Included
| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js application |
| Backend | 8080 | Spring Boot API |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| Kafka | 9092 | Message broker |
| Keycloak | 8080 | Identity management |
| Prometheus | 9090 | Metrics |
| Grafana | 3000 | Dashboards |

### Commands
```bash
# Start all services
docker-compose up -d

# Scale services
docker-compose up -d --scale attendance-app=3

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

---

## 📊 Performance

### Frontend Optimizations
- ✅ React.memo for all components
- ✅ useMemo for expensive calculations
- ✅ useCallback for event handlers
- ✅ Lazy loading for charts
- ✅ Tree-shaking for lucide-react
- ✅ Image optimization (AVIF/WebP)
- ✅ CSS GPU acceleration

### Core Web Vitals Target
| Metric | Target | Status |
|--------|--------|--------|
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |

---

## 🔒 Security

### Headers Configured
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` enabled

### Authentication
- JWT token-based authentication
- Role-based access control (RBAC)
- Keycloak integration ready
- Session management with Redis

---

## 📱 PWA Support

PayrollPro can be installed as a Progressive Web App:
- Offline capability
- Push notifications ready
- App shortcuts
- Native-like experience

---

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Token refresh

### Employee Management
- `GET /api/v1/employees` - List all employees
- `POST /api/v1/employees` - Create new employee
- `GET /api/v1/employees/{id}` - Get employee details
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee

### Attendance
- `GET /api/v1/attendance` - List attendance records
- `POST /api/v1/attendance/checkin` - Employee check-in
- `POST /api/v1/attendance/checkout` - Employee check-out
- `GET /api/v1/attendance/employee/{id}` - Employee attendance history

### Payroll
- `GET /api/v1/payroll` - List payroll records
- `POST /api/v1/payroll/calculate` - Calculate monthly payroll
- `GET /api/v1/payroll/employee/{id}` - Employee payroll history
- `PUT /api/v1/payroll/{id}/approve` - Approve payroll record

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ilyes Aia**
- GitHub: [@ilyeseia](https://github.com/ilyeseia)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) for icons
- [Spring Boot](https://spring.io/) for the backend framework
- [Z.ai](https://chat.z.ai) for AI-powered development assistance

---

<div align="center">
  Built with ❤️ for Algerian enterprises
</div>
