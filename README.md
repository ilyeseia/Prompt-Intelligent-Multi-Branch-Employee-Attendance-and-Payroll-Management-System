# PayrollPro - Enterprise HR Management System

<div align="center">
  <img src="public/logo.svg" alt="PayrollPro Logo" width="120" height="120">
  
  **Intelligent Multi-Branch Employee Attendance and Payroll Management System**
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 📋 Overview

PayrollPro is a comprehensive enterprise HR management system designed for businesses in Algeria with multiple branch locations. It provides real-time attendance tracking, payroll processing, and employee management capabilities.

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
- Biometric device integration ready

### 💰 Payroll Processing
- Automated salary calculations
- Deductions and allowances
- Tax calculations
- Payslip generation

### 📈 Reports & Analytics
- Visual charts and graphs
- Export to Excel/PDF
- Trend analysis
- Custom report generation

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ilyeseia/Prompt-Intelligent-Multi-Branch-Employee-Attendance-and-Payroll-Management-System.git

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend (Ready)
- **Spring Boot** - Java backend API
- **PostgreSQL** - Relational database
- **Redis** - Caching layer
- **Prisma** - ORM for frontend

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipelines
- **Nginx** - Reverse proxy

---

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Dashboard page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── payroll/           # Business components
│   │   │   ├── charts.tsx     # Data visualization
│   │   │   ├── stat-cards.tsx # Statistics cards
│   │   │   ├── data-tables.tsx# Data tables
│   │   │   ├── sidebar.tsx    # Navigation sidebar
│   │   │   └── ...
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── api/               # API client
│   │   ├── mock-data/         # Mock data
│   │   └── utils.ts           # Utilities
│   └── types/                 # TypeScript types
├── __tests__/                 # Test files
├── .github/workflows/         # CI/CD pipelines
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Full stack deployment
└── DEPLOYMENT.md              # Deployment guide
```

---

## 🧪 Testing

```bash
# Run tests
bun test

# Run with coverage
bun test:coverage

# Run linting
bun lint
```

---

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📊 Performance

### Optimizations Applied
- ✅ React.memo for all components
- ✅ useMemo for expensive calculations
- ✅ useCallback for event handlers
- ✅ Lazy loading for charts
- ✅ Tree-shaking for lucide-react
- ✅ Image optimization (AVIF/WebP)
- ✅ CSS GPU acceleration
- ✅ Content visibility for off-screen content

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

### Best Practices
- Non-root Docker user
- Dependency vulnerability scanning
- TypeScript strict mode
- ESLint security rules

---

## 📱 PWA Support

PayrollPro can be installed as a Progressive Web App:
- Offline capability
- Push notifications ready
- App shortcuts
- Native-like experience

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
- [Z.ai](https://chat.z.ai) for AI-powered development assistance

---

<div align="center">
  Built with ❤️ for Algerian enterprises
</div>
