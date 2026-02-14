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
import { 
  MoreHorizontal, 
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar
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
        <TableRow className="hover:bg-transparent">
          {columns.map((column) => (
            <TableHead 
              key={String(column.key)} 
              className={cn('font-medium', column.className)}
            >
              {column.sortable ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                  onClick={() => handleSort(column.key as keyof T)}
                >
                  {column.header}
                  <ArrowUpDown className="ml-2 h-3 w-3" />
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
              'data-table-row animate-fade-in-up',
              `stagger-${Math.min(index + 1, 6)}`
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
    <Card className="animate-fade-in-up">
      {(title || description) && (
        <CardHeader>
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
          <Avatar className="h-8 w-8">
            <AvatarImage src={emp.profilePicture} alt={emp.firstName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {emp.firstName[0]}{emp.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{emp.firstName} {emp.lastName}</div>
            <div className="text-xs text-muted-foreground">{emp.employeeId}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (emp) => (
        <Badge variant="outline" className="font-normal">
          {emp.department}
        </Badge>
      ),
    },
    {
      key: 'position',
      header: 'Position',
      sortable: true,
      className: 'hidden md:table-cell',
    },
    {
      key: 'branch',
      header: 'Branch',
      render: (emp) => (
        <span className="text-sm">{emp.branch?.name?.split(' ')[0]}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (emp) => {
        const statusStyles: Record<string, string> = {
          ACTIVE: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          INACTIVE: 'bg-muted text-muted-foreground border-border',
          ON_LEAVE: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          TERMINATED: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        };
        return (
          <Badge variant="outline" className={cn('font-normal', statusStyles[emp.status] || '')}>
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
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Employee
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
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
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {att.employee?.firstName?.[0]}{att.employee?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{att.employee?.firstName} {att.employee?.lastName}</div>
            <div className="text-xs text-muted-foreground">{att.employee?.employeeId}</div>
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
          <span>{new Date(att.attendanceDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'checkInTime',
      header: 'Check In',
      render: (att) => att.checkInTime ? (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(att.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
    },
    {
      key: 'checkOutTime',
      header: 'Check Out',
      render: (att) => att.checkOutTime ? (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(att.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
    },
    {
      key: 'totalWorkingHours',
      header: 'Hours',
      render: (att) => (
        <span className="font-mono text-sm">
          {att.totalWorkingHours.toFixed(1)}h
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (att) => {
        const statusStyles: Record<string, { style: string; icon: React.ReactNode }> = {
          PRESENT: { 
            style: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', 
            icon: <CheckCircle2 className="h-3 w-3 mr-1" /> 
          },
          ABSENT: { 
            style: 'bg-rose-500/10 text-rose-500 border-rose-500/20', 
            icon: <XCircle className="h-3 w-3 mr-1" /> 
          },
          LATE: { 
            style: 'bg-amber-500/10 text-amber-500 border-amber-500/20', 
            icon: <Clock className="h-3 w-3 mr-1" /> 
          },
          LEAVE: { 
            style: 'bg-blue-500/10 text-blue-500 border-blue-500/20', 
            icon: <Calendar className="h-3 w-3 mr-1" /> 
          },
        };
        const config = statusStyles[att.status] || statusStyles.PRESENT;
        return (
          <Badge variant="outline" className={cn('font-normal', config.style)}>
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
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {rec.employee?.firstName?.[0]}{rec.employee?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{rec.employee?.firstName} {rec.employee?.lastName}</div>
            <div className="text-xs text-muted-foreground">{rec.employee?.position}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'payrollMonth',
      header: 'Month',
      sortable: true,
      render: (rec) => (
        <span>{new Date(rec.payrollMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
      ),
    },
    {
      key: 'grossSalary',
      header: 'Gross',
      className: 'hidden md:table-cell',
      render: (rec) => (
        <span className="font-mono text-sm">
          {rec.grossSalary.toLocaleString('fr-DZ')} DZD
        </span>
      ),
    },
    {
      key: 'totalDeductions',
      header: 'Deductions',
      className: 'hidden lg:table-cell',
      render: (rec) => (
        <span className="font-mono text-sm text-rose-500">
          -{rec.totalDeductions.toLocaleString('fr-DZ')} DZD
        </span>
      ),
    },
    {
      key: 'netSalary',
      header: 'Net Salary',
      render: (rec) => (
        <span className="font-mono text-sm font-semibold text-primary">
          {rec.netSalary.toLocaleString('fr-DZ')} DZD
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (rec) => {
        const statusStyles: Record<string, string> = {
          DRAFT: 'bg-muted text-muted-foreground border-border',
          CALCULATED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          APPROVED: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          PAID: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        };
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className={cn('font-normal', statusStyles[rec.status] || '')}>
                  {rec.status}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Present: {rec.presentDays}/{rec.workingDays} days</p>
                <p>Overtime: {rec.overtimeHours}h</p>
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
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Payroll
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-emerald-500">
              <CheckCircle2 className="mr-2 h-4 w-4" />
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
