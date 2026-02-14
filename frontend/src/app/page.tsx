'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar, Header } from '@/components/payroll/sidebar';
import { DashboardStats, PayrollStats } from '@/components/payroll/stat-cards';
import { 
  AttendanceChart, 
  DepartmentChart, 
  BranchPerformanceChart, 
  PayrollTrendChart 
} from '@/components/payroll/charts';
import { EmployeeTable, AttendanceTable, PayrollTable } from '@/components/payroll/data-tables';
import { ActivityFeed, BranchesOverview } from '@/components/payroll/branch-cards';
import { 
  DashboardSkeleton, 
  EmptyState, 
  ErrorState,
  TableSkeleton,
  StatCardSkeleton
} from '@/components/payroll/skeleton';
import { ThemeProvider } from '@/components/payroll/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TabsListProps } from '@radix-ui/react-tabs';
import { 
  Download, 
  Plus, 
  RefreshCw,
  Calendar,
  Users,
  Wallet,
  UsersRound,
  AlertCircle,
  Search,
  Loader2
} from 'lucide-react';
import { 
  employees, 
  todayAttendance, 
  payrollRecords 
} from '@/lib/mock-data/data';

// Skip link for keyboard navigation
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </a>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading dashboard data...</p>
    </div>
  );
}

// Main dashboard content
function DashboardContent() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

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
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening across all branches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="Export report">
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Export Report
          </Button>
          <Button size="sm" aria-label="Add new employee">
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Employee
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <section aria-label="Statistics overview">
        <DashboardStats />
      </section>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" role="tablist">
          <TabsTrigger 
            value="overview" 
            className="gap-2"
            aria-label="Overview tab"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="employees" 
            className="gap-2"
            aria-label="Employees tab"
          >
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Employees</span>
          </TabsTrigger>
          <TabsTrigger 
            value="attendance" 
            className="gap-2"
            aria-label="Attendance tab"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payroll" 
            className="gap-2"
            aria-label="Payroll tab"
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
              <DepartmentChart />
              <BranchPerformanceChart />
            </div>
          </div>

          {/* Branches */}
          <section aria-label="Branch performance">
            <BranchesOverview />
          </section>

          {/* Payroll Stats and Trend */}
          <PayrollStats />
          <PayrollTrendChart />

          {/* Activity and Recent Employees */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ActivityFeed />
            <EmployeeTable 
              employees={employees.slice(0, 5)} 
              title="Recent Employees"
              description="Latest additions to the workforce"
            />
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6" role="tabpanel">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Employee Management</h2>
              <p className="text-sm text-muted-foreground">
                Manage and view all employees across branches
              </p>
            </div>
            <Button size="sm" aria-label="Add new employee">
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Add New Employee
            </Button>
          </div>
          
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
              employees={employees.slice(0, 20)} 
              title="All Employees"
              description="Showing 20 of 353 employees"
            />
          )}
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6" role="tabpanel">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Attendance Tracking</h2>
              <p className="text-sm text-muted-foreground">
                Real-time attendance monitoring across all branches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" aria-label="Sync biometric devices">
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                Sync Devices
              </Button>
              <Button size="sm" aria-label="Add manual attendance entry">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Manual Entry
              </Button>
            </div>
          </div>
          
          <AttendanceChart />
          
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Payroll Management</h2>
              <p className="text-sm text-muted-foreground">
                Process and manage employee payroll records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" aria-label="Export payslips">
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Export Payslips
              </Button>
              <Button size="sm" aria-label="Run payroll calculation">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Run Payroll
              </Button>
            </div>
          </div>
          
          <PayrollStats />
          <PayrollTrendChart />
          
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
              payroll={payrollRecords.slice(0, 15)} 
              title="Current Month Payroll"
              description="November 2024 payroll records"
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className={cn(
        'min-h-screen bg-background transition-all duration-300',
        sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'
      )}>
        {/* Skip link for accessibility */}
        <SkipLink />
        
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
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
        >
          Dashboard loaded successfully
        </div>
      </div>
    </ThemeProvider>
  );
}
