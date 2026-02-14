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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Plus, 
  RefreshCw,
  Calendar,
  Users,
  Wallet
} from 'lucide-react';
import { 
  employees, 
  todayAttendance, 
  payrollRecords 
} from '@/lib/mock-data/data';

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className={cn(
      'min-h-screen bg-background transition-all duration-300',
      sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'
    )}>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <Header />
      
      <main className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening across all branches.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Employees</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Payroll</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <AttendanceChart />
              <div className="space-y-6">
                <DepartmentChart />
                <BranchPerformanceChart />
              </div>
            </div>

            {/* Branches */}
            <BranchesOverview />

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
          <TabsContent value="employees" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Employee Management</h2>
                <p className="text-sm text-muted-foreground">
                  Manage and view all employees across branches
                </p>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Employee
              </Button>
            </div>
            <EmployeeTable 
              employees={employees.slice(0, 20)} 
              title="All Employees"
              description="Showing 20 of 353 employees"
            />
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Attendance Tracking</h2>
                <p className="text-sm text-muted-foreground">
                  Real-time attendance monitoring across all branches
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Devices
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
              </div>
            </div>
            <AttendanceChart />
            <AttendanceTable 
              attendance={todayAttendance} 
              title="Today's Attendance"
              description="Live attendance records from all branches"
            />
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Payroll Management</h2>
                <p className="text-sm text-muted-foreground">
                  Process and manage employee payroll records
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Payslips
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Run Payroll
                </Button>
              </div>
            </div>
            <PayrollStats />
            <PayrollTrendChart />
            <PayrollTable 
              payroll={payrollRecords.slice(0, 15)} 
              title="Current Month Payroll"
              description="November 2024 payroll records"
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
