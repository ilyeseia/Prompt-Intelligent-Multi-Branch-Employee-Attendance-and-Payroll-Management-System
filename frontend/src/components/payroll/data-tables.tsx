'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MoreHorizontal, 
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Employee, Attendance, PayrollRecord } from '@/types/payroll';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  showCard?: boolean;
}

interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

function DataTableInner<T extends { id: number }>({ 
  data, 
  columns, 
  title, 
  description,
  showCard = true 
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const tableContent = (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b">
          {columns.map((column) => (
            <TableHead 
              key={String(column.key)} 
              className={cn('font-medium text-muted-foreground', column.className)}
            >
              {column.sortable ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 data-[state=open]:bg-accent hover:bg-muted"
                  onClick={() => handleSort(column.key as keyof T)}
                >
                  {column.header}
                  <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
                </Button>
              ) : (
                column.header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow 
            key={item.id}
            className={cn(
              'data-table-row animate-fade-in-up border-b last:border-b-0',
              `stagger-${Math.min(index + 1, 8)}`
            )}
          >
            {columns.map((column) => (
              <TableCell key={String(column.key)} className={column.className}>
                {column.render 
                  ? column.render(item) 
                  : String(item[column.key as keyof T] ?? '')
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (!showCard) {
    return tableContent;
  }

  return (
    <Card className="animate-fade-in-up overflow-hidden">
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && <CardTitle className="text-lg">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-b-lg">
          {tableContent}
        </div>
      </CardContent>
    </Card>
  );
}

// Employee Table
interface EmployeeTableProps {
  employees: Employee[];
  title?: string;
  description?: string;
  showCard?: boolean;
}

export function EmployeeTable({ employees, title, description, showCard = true }: EmployeeTableProps) {
  const columns: ColumnDef<Employee>[] = [
    {
      key: 'firstName',
      header: 'Employee',
      sortable: true,
      render: (emp) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
            <AvatarImage src={emp.profilePicture} alt={emp.firstName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {emp.firstName[0]}{emp.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium truncate">{emp.firstName} {emp.lastName}</div>
            <div className="text-xs text-muted-foreground truncate">{emp.employeeId}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (emp) => (
        <Badge variant="secondary" className="font-normal text-xs">
          {emp.department.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'position',
      header: 'Position',
      sortable: true,
      className: 'hidden md:table-cell',
      render: (emp) => (
        <div className="flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm truncate max-w-[150px]">{emp.position}</span>
        </div>
      ),
    },
    {
      key: 'branch',
      header: 'Branch',
      render: (emp) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm truncate max-w-[100px]">{emp.branch?.name?.split(' ')[0]}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{emp.branch?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (emp) => {
        const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
          ACTIVE: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-500' },
          INACTIVE: { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
          ON_LEAVE: { bg: 'bg-amber-500/10', text: 'text-amber-600', dot: 'bg-amber-500' },
          TERMINATED: { bg: 'bg-rose-500/10', text: 'text-rose-600', dot: 'bg-rose-500' },
        };
        const style = statusStyles[emp.status] || statusStyles.INACTIVE;
        return (
          <Badge variant="outline" className={cn('font-normal text-xs gap-1.5', style.bg, style.text)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
            {emp.status.replace('_', ' ')}
          </Badge>
        );
      },
    },
    {
      key: 'id',
      header: '',
      className: 'w-12',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Employee
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Mail className="h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTableInner 
      data={employees} 
      columns={columns} 
      title={title} 
      description={description}
      showCard={showCard}
    />
  );
}

// Attendance Table
interface AttendanceTableProps {
  attendance: Attendance[];
  title?: string;
  description?: string;
  showCard?: boolean;
}

export function AttendanceTable({ attendance, title, description, showCard = true }: AttendanceTableProps) {
  const columns: ColumnDef<Attendance>[] = [
    {
      key: 'employee',
      header: 'Employee',
      render: (att) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {att.employee?.firstName?.[0]}{att.employee?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium truncate">{att.employee?.firstName} {att.employee?.lastName}</div>
            <div className="text-xs text-muted-foreground truncate">{att.employee?.position}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'attendanceDate',
      header: 'Date',
      sortable: true,
      render: (att) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{new Date(att.attendanceDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
      ),
    },
    {
      key: 'checkInTime',
      header: 'Check In',
      render: (att) => att.checkInTime ? (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Clock className="h-3 w-3 text-emerald-500" />
          </div>
          <span className="text-sm font-mono">{new Date(att.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      ),
    },
    {
      key: 'checkOutTime',
      header: 'Check Out',
      render: (att) => att.checkOutTime ? (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Clock className="h-3 w-3 text-blue-500" />
          </div>
          <span className="text-sm font-mono">{new Date(att.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      ),
    },
    {
      key: 'totalWorkingHours',
      header: 'Hours',
      render: (att) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">
            {att.totalWorkingHours.toFixed(1)}h
          </span>
          {att.overtimeHours > 0 && (
            <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
              +{att.overtimeHours.toFixed(1)}h OT
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (att) => {
        const statusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
          PRESENT: { 
            bg: 'bg-emerald-500/10', 
            text: 'text-emerald-600',
            icon: <CheckCircle2 className="h-3 w-3" />
          },
          ABSENT: { 
            bg: 'bg-rose-500/10', 
            text: 'text-rose-600',
            icon: <XCircle className="h-3 w-3" />
          },
          LATE: { 
            bg: 'bg-amber-500/10', 
            text: 'text-amber-600',
            icon: <Clock className="h-3 w-3" />
          },
          LEAVE: { 
            bg: 'bg-blue-500/10', 
            text: 'text-blue-600',
            icon: <Calendar className="h-3 w-3" />
          },
        };
        const config = statusStyles[att.status] || statusStyles.PRESENT;
        return (
          <Badge variant="outline" className={cn('font-normal text-xs gap-1', config.bg, config.text)}>
            {config.icon}
            {att.status}
          </Badge>
        );
      },
    },
  ];

  return (
    <DataTableInner 
      data={attendance} 
      columns={columns} 
      title={title} 
      description={description}
      showCard={showCard}
    />
  );
}

// Payroll Table
interface PayrollTableProps {
  payroll: PayrollRecord[];
  title?: string;
  description?: string;
  showCard?: boolean;
}

export function PayrollTable({ payroll, title, description, showCard = true }: PayrollTableProps) {
  const columns: ColumnDef<PayrollRecord>[] = [
    {
      key: 'employee',
      header: 'Employee',
      sortable: true,
      render: (rec) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {rec.employee?.firstName?.[0]}{rec.employee?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium truncate">{rec.employee?.firstName} {rec.employee?.lastName}</div>
            <div className="text-xs text-muted-foreground truncate">{rec.employee?.position}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'payrollMonth',
      header: 'Month',
      sortable: true,
      render: (rec) => (
        <span className="text-sm">{new Date(rec.payrollMonth).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      ),
    },
    {
      key: 'grossSalary',
      header: 'Gross',
      className: 'hidden md:table-cell',
      render: (rec) => (
        <span className="font-mono text-sm text-muted-foreground">
          {rec.grossSalary.toLocaleString('fr-DZ')}
        </span>
      ),
    },
    {
      key: 'totalDeductions',
      header: 'Deductions',
      className: 'hidden lg:table-cell',
      render: (rec) => (
        <span className="font-mono text-sm text-rose-500">
          -{rec.totalDeductions.toLocaleString('fr-DZ')}
        </span>
      ),
    },
    {
      key: 'netSalary',
      header: 'Net Salary',
      render: (rec) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-primary">
            {rec.netSalary.toLocaleString('fr-DZ')}
          </span>
          <span className="text-xs text-muted-foreground">DZD</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (rec) => {
        const statusStyles: Record<string, { bg: string; text: string }> = {
          DRAFT: { bg: 'bg-muted', text: 'text-muted-foreground' },
          CALCULATED: { bg: 'bg-blue-500/10', text: 'text-blue-600' },
          APPROVED: { bg: 'bg-amber-500/10', text: 'text-amber-600' },
          PAID: { bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
        };
        const style = statusStyles[rec.status] || statusStyles.DRAFT;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className={cn('font-normal text-xs', style.bg, style.text)}>
                  {rec.status}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                <div className="space-y-1">
                  <p>Present: {rec.presentDays}/{rec.workingDays} days</p>
                  <p>Overtime: {rec.overtimeHours}h</p>
                  <p>Leave: {rec.absentDays} days</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      key: 'id',
      header: '',
      className: 'w-12',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Payroll
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-emerald-600 focus:text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTableInner 
      data={payroll} 
      columns={columns} 
      title={title} 
      description={description}
      showCard={showCard}
    />
  );
}
