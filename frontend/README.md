# PayrollPro - Frontend

Modern Next.js 15 frontend for the Intelligent Multi-Branch Employee Attendance and Payroll Management System.

## 🎨 Design

**Style**: Sophisticated Dark Professional  
**Accent Colors**: Cyan/Teal  
**Framework**: Next.js 15 with App Router

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens & animations
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Dashboard page
│   ├── components/
│   │   ├── payroll/         # Payroll-specific components
│   │   │   ├── sidebar.tsx
│   │   │   ├── stat-cards.tsx
│   │   │   ├── charts.tsx
│   │   │   ├── data-tables.tsx
│   │   │   └── branch-cards.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   ├── mock-data/       # Mock data for development
│   │   └── utils.ts
│   ├── types/
│   │   └── payroll.ts       # TypeScript types
│   └── hooks/
├── public/
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## ✨ Features

- **Dashboard** - Real-time statistics and analytics
- **Employee Management** - Sortable tables with actions
- **Attendance Tracking** - Live status badges
- **Payroll Processing** - Net salary calculations
- **Branch Overview** - 6 Algeria locations
- **Dark/Light Mode** - Theme toggle
- **Responsive Design** - Mobile, tablet, desktop

## 🏢 Branches

1. Algiers Headquarters (ALG) - 145 employees
2. Oran Branch (ORN) - 78 employees
3. Setif Branch (SET) - 52 employees
4. Annaba Branch (ANN) - 35 employees
5. Tamanrasset Branch (TAM) - 25 employees
6. Tindouf Branch (TND) - 18 employees

## 🛠️ Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Data visualization
- **Lucide Icons** - Iconography

## 📡 API Integration

The frontend is designed to connect to the Spring Boot backend API. Update the API base URL in the environment configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## 🔗 Related

- [Backend Repository](../) - Spring Boot backend
- [System Documentation](../SYSTEM_DOCUMENTATION.md)

---

**Developer**: Ilyes Aia  
**Version**: 1.0.0  
**Last Updated**: November 2024
