# Frontend Development Guidelines

## Payroll Management System - Next.js 15 Frontend

---

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [Project Structure](#project-structure)
3. [Design System & Tokens](#design-system--tokens)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Routing & Navigation](#routing--navigation)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Performance Guidelines](#performance-guidelines)
10. [Testing Guidelines](#testing-guidelines)
11. [Error Handling](#error-handling)
12. [Security Guidelines](#security-guidelines)
13. [Code Style & Conventions](#code-style--conventions)
14. [Git Workflow](#git-workflow)

---

## Architecture Principles

### Core Principles

1. **Component-First Design**: Build reusable, composable components
2. **Mobile-First Responsive**: Design for mobile, enhance for larger screens
3. **Accessibility by Default**: WCAG 2.1 AA compliance
4. **Performance Optimized**: Core Web Vitals focus
5. **Type Safety**: Strict TypeScript throughout

### Technology Stack

```
├── Framework: Next.js 15 (App Router)
├── Language: TypeScript (strict mode)
├── Styling: Tailwind CSS
├── Components: shadcn/ui
├── Charts: Recharts
├── State: React Context + SWR
├── Forms: React Hook Form + Zod
└── Icons: Lucide React
```

---

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Auth route group
│   │   ├── login/
│   │   └── layout.tsx
│   ├── (dashboard)/               # Dashboard route group
│   │   ├── employees/
│   │   ├── attendance/
│   │   ├── payroll/
│   │   └── layout.tsx
│   ├── api/                       # API routes
│   │   ├── employees/
│   │   └── attendance/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   └── not-found.tsx              # 404 page
│
├── components/
│   ├── ui/                        # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── payroll/                   # Domain-specific components
│   │   ├── sidebar.tsx
│   │   ├── charts.tsx
│   │   ├── stat-cards.tsx
│   │   ├── data-tables.tsx
│   │   └── ...
│   └── common/                    # Shared components
│       ├── loading.tsx
│       ├── error-boundary.tsx
│       └── pagination.tsx
│
├── lib/
│   ├── api/                       # API client
│   │   ├── client.ts
│   │   ├── employees.ts
│   │   └── attendance.ts
│   ├── hooks/                     # Custom hooks
│   │   ├── use-employees.ts
│   │   └── use-attendance.ts
│   ├── utils/                     # Utility functions
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── dates.ts
│   └── constants/                 # Constants
│       └── endpoints.ts
│
├── types/                         # TypeScript types
│   ├── payroll.ts
│   ├── api.ts
│   └── common.ts
│
├── hooks/                         # Global hooks
│   ├── use-toast.ts
│   └── use-mobile.ts
│
└── styles/
    └── variables.css              # CSS custom properties
```

---

## Design System & Tokens

### Color System

```css
/* globals.css - Use OKLCH for consistent colors */

:root {
  /* Background & Surface */
  --background: oklch(0.98 0.002 260);
  --surface: oklch(1 0 0);
  --surface-subtle: oklch(0.96 0.005 260);
  --surface-elevated: oklch(1 0 0);
  
  /* Text */
  --text: oklch(0.15 0.015 260);
  --text-secondary: oklch(0.45 0.015 260);
  --text-muted: oklch(0.55 0.015 260);
  
  /* Primary */
  --primary: oklch(0.55 0.18 195);
  --primary-hover: oklch(0.50 0.20 195);
  --primary-active: oklch(0.45 0.22 195);
  --primary-foreground: oklch(1 0 0);
  
  /* Semantic */
  --success: oklch(0.65 0.18 145);
  --warning: oklch(0.75 0.15 85);
  --danger: oklch(0.65 0.20 25);
  --info: oklch(0.60 0.18 240);
  
  /* Border */
  --border: oklch(0.90 0.008 260);
  --border-subtle: oklch(0.94 0.005 260);
}

.dark {
  --background: oklch(0.12 0.012 260);
  --surface: oklch(0.17 0.015 260);
  --text: oklch(0.95 0.005 240);
  --primary: oklch(0.72 0.16 195);
  /* ... */
}
```

### Typography Scale

```css
:root {
  /* Fluid Typography using clamp() */
  --text-xs: clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);
  --text-sm: clamp(0.8125rem, 0.75rem + 0.15vw, 0.875rem);
  --text-base: clamp(0.9375rem, 0.875rem + 0.2vw, 1rem);
  --text-lg: clamp(1.0625rem, 0.975rem + 0.25vw, 1.125rem);
  --text-xl: clamp(1.1875rem, 1.05rem + 0.35vw, 1.25rem);
  --text-2xl: clamp(1.4375rem, 1.2rem + 0.6vw, 1.5rem);
  --text-3xl: clamp(1.75rem, 1.4rem + 0.9vw, 1.875rem);
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### Spacing Scale (8px Grid)

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Motion Tokens

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 220ms;
  --duration-slow: 300ms;
  
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
}
```

---

## Component Development

### Component Template

```tsx
// components/payroll/stat-card.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

// 1. Define Props Interface
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

// 2. Component with forwardRef for flexibility
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    variant = 'default',
    className,
    ...props 
  }, ref) => {
    // 3. Use design tokens, not hardcoded values
    const variantStyles = {
      default: 'bg-card',
      primary: 'bg-primary/5 border-primary/20',
      success: 'bg-success/5 border-success/20',
      warning: 'bg-warning/5 border-warning/20',
      danger: 'bg-danger/5 border-danger/20',
    };

    return (
      <Card
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-200',
          'hover:shadow-md hover:-translate-y-0.5',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div className={cn(
              'flex items-center text-xs mt-1',
              trend.isPositive ? 'text-success' : 'text-danger'
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';
```

### Component States

Every interactive component must implement:

```tsx
// Complete state coverage
interface ComponentStates {
  default: React.ReactNode;
  hover: React.ReactNode;
  focus: React.ReactNode;
  active: React.ReactNode;
  disabled: React.ReactNode;
  loading: React.ReactNode;
  error: React.ReactNode;
  empty: React.ReactNode;
}

// Example: Button with all states
const Button = ({ loading, disabled, children, ...props }) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'px-4 py-2 rounded-md transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:bg-primary-hover active:bg-primary-active'
      )}
      {...props}
    >
      {loading ? <Spinner className="mr-2" /> : null}
      {children}
    </button>
  );
};
```

---

## State Management

### React Context for Global State

```tsx
// lib/context/app-context.tsx
'use client';

import * as React from 'react';

interface AppState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  user: User | null;
}

interface AppContextValue extends AppState {
  toggleSidebar: () => void;
  setTheme: (theme: AppState['theme']) => void;
  setUser: (user: User | null) => void;
}

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>({
    sidebarCollapsed: false,
    theme: 'dark',
    user: null,
  });

  const value = React.useMemo(() => ({
    ...state,
    toggleSidebar: () => setState(prev => ({ 
      ...prev, 
      sidebarCollapsed: !prev.sidebarCollapsed 
    })),
    setTheme: (theme) => setState(prev => ({ ...prev, theme })),
    setUser: (user) => setState(prev => ({ ...prev, user })),
  }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

### SWR for Server State

```tsx
// lib/hooks/use-employees.ts
import useSWR from 'swr';
import { employeesApi } from '@/lib/api/employees';

export function useEmployees(filters?: EmployeeFilters) {
  const key = filters ? ['employees', filters] : 'employees';
  
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => employeesApi.getAll(filters),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    employees: data?.content ?? [],
    totalElements: data?.totalElements ?? 0,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Usage
function EmployeeList() {
  const { employees, isLoading, isError } = useEmployees({ status: 'ACTIVE' });
  
  if (isLoading) return <EmployeeListSkeleton />;
  if (isError) return <ErrorState />;
  if (employees.length === 0) return <EmptyState />;
  
  return <ul>{employees.map(e => <li key={e.id}>{e.name}</li>)}</ul>;
}
```

---

## API Integration

### API Client Setup

```tsx
// lib/api/client.ts
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private buildUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...init } = options;
    const url = this.buildUrl(path, params);
    const token = this.getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...init.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));

      if (response.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }

      throw new ApiError(response.status, error.message, error);
    }

    return response.json();
  }

  get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>(path, { method: 'GET', params });
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = new ApiClient(API_BASE_URL);
```

### API Service Pattern

```tsx
// lib/api/employees.ts
import { api } from './client';
import type { Employee, EmployeeRequest, PaginatedResponse } from '@/types';

export const employeesApi = {
  getAll: (params?: { page?: number; size?: number; status?: string }) =>
    api.get<PaginatedResponse<Employee>>('/employees', params),

  getById: (id: number) =>
    api.get<Employee>(`/employees/${id}`),

  create: (data: EmployeeRequest) =>
    api.post<Employee>('/employees', data),

  update: (id: number, data: Partial<EmployeeRequest>) =>
    api.put<Employee>(`/employees/${id}`, data),

  delete: (id: number) =>
    api.delete<void>(`/employees/${id}`),
};
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Requirements

```tsx
// ✅ Good: Accessible component
<Button
  aria-label="Add new employee"
  aria-describedby="add-employee-tooltip"
>
  <PlusIcon aria-hidden="true" />
  Add Employee
</Button>

// Skip link for keyboard navigation
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Focus management
<main id="main-content" tabIndex={-1}>
  {/* Content */}
</main>

// Form accessibility
<form>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={errors.email ? 'true' : 'false'}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert">
      {errors.email.message}
    </p>
  )}
</form>

// Table accessibility
<table role="table" aria-label="Employee list">
  <caption className="sr-only">List of all employees</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
    </tr>
  </thead>
  <tbody>
    {employees.map(employee => (
      <tr key={employee.id}>
        <td>{employee.name}</td>
        <td>{employee.department}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible (minimum 2px outline)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Images have alt text (decorative images use alt="")
- [ ] Forms have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Skip links are provided
- [ ] ARIA attributes are used appropriately
- [ ] Reduced motion preference is respected

---

## Performance Guidelines

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/charts/chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // If component doesn't need SSR
});
```

### Image Optimization

```tsx
import Image from 'next/image';

// Use Next.js Image component
<Image
  src="/avatar.png"
  alt="Employee avatar"
  width={40}
  height={40}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
export const EmployeeList = memo(function EmployeeList({ 
  employees 
}: { employees: Employee[] }) {
  return (
    <ul>
      {employees.map(employee => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </ul>
  );
});

// Memoize computations
function Dashboard({ data }: { data: RawData[] }) {
  const stats = useMemo(() => {
    return calculateStats(data);
  }, [data]);

  return <StatsDisplay stats={stats} />;
}

// Stable callbacks
function ParentComponent() {
  const handleClick = useCallback((id: number) => {
    console.log('Clicked:', id);
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

---

## Testing Guidelines

### Unit Tests with Jest & Testing Library

```tsx
// __tests__/components/stat-card.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatCard } from '@/components/payroll/stat-card';

describe('StatCard', () => {
  const defaultProps = {
    title: 'Total Employees',
    value: 353,
    icon: Users,
  };

  it('renders with correct title and value', () => {
    render(<StatCard {...defaultProps} />);
    
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('353')).toBeInTheDocument();
  });

  it('displays positive trend correctly', () => {
    render(
      <StatCard 
        {...defaultProps} 
        trend={{ value: 5.2, isPositive: true }} 
      />
    );
    
    expect(screen.getByText('5.2%')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(
      <StatCard {...defaultProps} variant="success" />
    );
    
    expect(container.firstChild).toHaveClass('bg-success/5');
  });
});
```

### Integration Tests

```tsx
// __tests__/integration/employee-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/lib/context/app-context';
import EmployeeList from '@/app/(dashboard)/employees/page';

const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

describe('Employee Management Flow', () => {
  it('displays employees after loading', async () => {
    render(<EmployeeList />, { wrapper });
    
    // Loading state
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Data loaded
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    const user = userEvent.setup();
    render(<EmployeeList />, { wrapper });
    
    const searchInput = screen.getByPlaceholderText('Search employees...');
    await user.type(searchInput, 'John');
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
});
```

---

## Error Handling

### Error Boundary

```tsx
// components/common/error-boundary.tsx
'use client';

import * as React from 'react';
import { ErrorState } from './error-state';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorState 
          title="Something went wrong"
          description={this.state.error?.message}
          retry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <EmployeeList />
</ErrorBoundary>
```

### Async Error Handling

```tsx
// hooks/use-async.ts
import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({ data: null, isLoading: true, error: null });
    
    try {
      const data = await asyncFn();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
      throw error;
    }
  }, []);

  return { ...state, execute };
}

// Usage
function CreateEmployeeForm() {
  const { isLoading, error, execute } = useAsync<Employee>();

  const handleSubmit = async (data: EmployeeRequest) => {
    try {
      await execute(() => employeesApi.create(data));
      toast.success('Employee created successfully');
    } catch (e) {
      toast.error('Failed to create employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" loading={isLoading}>
        Create Employee
      </Button>
      {error && <ErrorAlert error={error} />}
    </form>
  );
}
```

---

## Security Guidelines

### XSS Prevention

```tsx
// ❌ Never use dangerouslySetInnerHTML with user content
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Sanitize HTML if necessary
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />

// ✅ Prefer text content
<div>{userInput}</div>
```

### CSRF Protection

```tsx
// Include CSRF token in API requests
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});
```

### Authentication

```tsx
// Protect routes with middleware
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

---

## Code Style & Conventions

### TypeScript Guidelines

```tsx
// Use strict null checks
interface User {
  id: number;
  name: string;
  email: string | null; // Explicit nullable
}

// Prefer interfaces for object types
interface EmployeeResponse {
  id: number;
  name: string;
  department: Department;
}

// Use type for unions and intersections
type Status = 'active' | 'inactive' | 'pending';
type EmployeeWithBranch = Employee & { branch: Branch };

// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

### File Naming

```
Components:    PascalCase.tsx    (StatCard.tsx)
Hooks:         camelCase.ts      (use-employees.ts)
Utilities:     camelCase.ts      (format-date.ts)
Types:         camelCase.ts      (payroll.ts)
Pages:         lowercase.tsx     (page.tsx, layout.tsx)
API Routes:    route.ts          (route.ts)
```

---

## Git Workflow

### Commit Convention

```
feat: Add employee search functionality
fix: Resolve pagination bug in employee list
docs: Update API documentation
style: Format code with prettier
refactor: Extract common logic to utility function
test: Add unit tests for StatCard component
chore: Update dependencies
```

### Branch Naming

```
feature/employee-search
bugfix/pagination-issue
hotfix/security-patch
release/v1.2.0
```

---

## Checklist for Code Review

- [ ] TypeScript strict mode compliance
- [ ] No hardcoded values (use design tokens)
- [ ] Accessibility attributes present
- [ ] Error handling implemented
- [ ] Loading states defined
- [ ] Empty states designed
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] Unit tests written
- [ ] Documentation updated

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Author**: Development Team
