'use client';

import * as React from 'react';
import { memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar, Header } from '@/components/payroll/sidebar';
import { DashboardStats, PayrollStats, HRStats } from '@/components/payroll/stat-cards';
import { 
  AttendanceChart, 
  DepartmentChart, 
  BranchPerformanceChart, 
  PayrollTrendChart,
  AttendanceGauge,
  PayrollSummaryCards
} from '@/components/payroll/charts';
import { EmployeeTable, AttendanceTable, PayrollTable } from '@/components/payroll/data-tables';
import { ActivityFeed, BranchesOverview, QuickActions, NotificationsPanel } from '@/components/payroll/branch-cards';
import { 
  DashboardSkeleton, 
  EmptyState, 
  ErrorState,
} from '@/components/payroll/skeleton';
import { ThemeProvider } from '@/components/payroll/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Plus, 
  RefreshCw,
  Calendar,
  Users,
  Wallet,
  UsersRound,
  Search,
  Loader2,
  ChevronRight,
  Sparkles,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';
import { 
  employees, 
  todayAttendance, 
  payrollRecords 
} from '@/lib/mock-data/data';

// Skip link for keyboard navigation - memoized
const SkipLink = memo(function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </a>
  );
});

// Loading state component - memoized
const LoadingState = memo(function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading dashboard data...</p>
    </div>
  );
});

// Main dashboard content - optimized with memoization
const DashboardContent = memo(function DashboardContent() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  // Simulate loading with effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  // Memoized tab change handler
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // Memoized employee slices to prevent recalculation
  const recentEmployees = useMemo(() => employees.slice(0, 5), []);
  const displayedEmployees = useMemo(() => employees.slice(0, 20), []);
  const displayedPayroll = useMemo(() => payrollRecords.slice(0, 15), []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState 
        title="Failed to load dashboard"
        description="We couldn't load the dashboard data. Please check your connection and try again."
        retry={handleRetry}
      />
    );
  }

  return (
    <>
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <Badge variant="secondary" className="text-xs font-normal">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening across all branches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="Export report" className="gap-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>
          <Button variant="outline" size="sm" aria-label="Sync data" className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Sync
          </Button>
          <Button size="sm" aria-label="Add new employee" className="gap-2 glow-hover">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Employee
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <section aria-label="Statistics overview" className="animate-fade-in-up stagger-1">
        <DashboardStats />
      </section>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" role="tablist">
          <TabsTrigger 
            value="overview" 
            className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="employees" 
            className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Employees</span>
          </TabsTrigger>
          <TabsTrigger 
            value="attendance" 
            className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payroll" 
            className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Wallet className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Payroll</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6" role="tabpanel">
          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <AttendanceChart />
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <AttendanceGauge />
                <DepartmentChart />
              </div>
            </div>
          </div>

          {/* Branches */}
          <section aria-label="Branch performance">
            <BranchesOverview />
          </section>

          {/* Payroll Stats and Trend */}
          <PayrollStats />
          <PayrollTrendChart />

          {/* Activity and Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-3">
            <ActivityFeed />
            <QuickActions />
            <NotificationsPanel />
          </div>

          {/* Recent Employees */}
          <EmployeeTable 
            employees={recentEmployees} 
            title="Recent Employees"
            description="Latest additions to the workforce"
          />
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6" role="tabpanel">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Employee Management</h2>
              <p className="text-sm text-muted-foreground">
                Manage and view all employees across branches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button size="sm" aria-label="Add new employee" className="gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add Employee
              </Button>
            </div>
          </div>
          
          {/* HR Stats */}
          <HRStats />
          
          {employees.length === 0 ? (
            <EmptyState
              icon={<UsersRound className="h-8 w-8 text-muted-foreground" />}
              title="No employees found"
              description="Get started by adding your first employee to the system."
              action={
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Employee
                </Button>
              }
            />
          ) : (
            <EmployeeTable 
              employees={displayedEmployees} 
              title="All Employees"
              description="Showing 20 of 353 employees"
            />
          )}
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6" role="tabpanel">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Attendance Tracking</h2>
              <p className="text-sm text-muted-foreground">
                Real-time attendance monitoring across all branches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" aria-label="Sync biometric devices" className="gap-2">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Sync Devices
              </Button>
              <Button size="sm" aria-label="Add manual attendance entry" className="gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Manual Entry
              </Button>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AttendanceChart />
            <AttendanceGauge />
          </div>
          
          {todayAttendance.length === 0 ? (
            <EmptyState
              icon={<Calendar className="h-8 w-8 text-muted-foreground" />}
              title="No attendance records for today"
              description="Attendance records will appear here once employees check in."
            />
          ) : (
            <AttendanceTable 
              attendance={todayAttendance} 
              title="Today's Attendance"
              description="Live attendance records from all branches"
            />
          )}
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6" role="tabpanel">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Payroll Management</h2>
              <p className="text-sm text-muted-foreground">
                Process and manage employee payroll records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" aria-label="Export payslips" className="gap-2">
                <Download className="h-4 w-4" aria-hidden="true" />
                Export
              </Button>
              <Button size="sm" aria-label="Run payroll calculation" className="gap-2 glow-hover">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Run Payroll
              </Button>
            </div>
          </div>
          
          <PayrollStats />
          <PayrollTrendChart />
          <PayrollSummaryCards />
          
          {payrollRecords.length === 0 ? (
            <EmptyState
              icon={<Wallet className="h-8 w-8 text-muted-foreground" />}
              title="No payroll records"
              description="Run payroll for the current month to generate records."
              action={
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Run Payroll
                </Button>
              }
            />
          ) : (
            <PayrollTable 
              payroll={displayedPayroll} 
              title="Current Month Payroll"
              description="November 2024 payroll records"
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
});

// Main Dashboard Page - optimized
export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Memoized toggle handler
  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'
      )}>
        {/* Skip link for accessibility */}
        <SkipLink />
        
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={handleSidebarToggle} 
        />
        
        <Header />
        
        <main 
          id="main-content" 
          className="p-6 space-y-6 outline-none"
          tabIndex={-1}
          role="main"
          aria-label="Dashboard main content"
        >
          <DashboardContent />
        </main>
        
        {/* Live region for announcements */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
          suppressHydrationWarning
        >
          Dashboard loaded successfully
        </div>
      </div>
    </ThemeProvider>
  );
}
