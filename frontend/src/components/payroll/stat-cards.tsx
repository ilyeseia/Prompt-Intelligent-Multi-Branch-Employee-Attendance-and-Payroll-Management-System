'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  Building2,
  Calendar
} from 'lucide-react';

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
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = 'default' 
}: StatCardProps) {
  const variantStyles = {
    default: 'bg-card hover:border-border',
    primary: 'bg-primary/5 border-primary/20 hover:border-primary/40',
    success: 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40',
    warning: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40',
    danger: 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-rose-500/10 text-rose-500',
  };

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 border card-hover animate-fade-in-up',
      variantStyles[variant]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('rounded-lg p-2', iconStyles[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend.isPositive ? 'text-emerald-500' : 'text-rose-500'
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string | number;
    description?: string;
    icon: React.ElementType;
    trend?: { value: number; isPositive: boolean };
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  }>;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.title} className={cn(`stagger-${index + 1}`)}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}

// Quick stats for the dashboard
export function DashboardStats() {
  const stats = [
    {
      title: 'Total Employees',
      value: '353',
      description: 'Across all branches',
      icon: Users,
      trend: { value: 5.2, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Present Today',
      value: '298',
      description: '84.4% attendance rate',
      icon: UserCheck,
      trend: { value: 2.1, isPositive: true },
      variant: 'success' as const,
    },
    {
      title: 'On Leave',
      value: '25',
      description: 'Approved leaves',
      icon: Calendar,
      variant: 'warning' as const,
    },
    {
      title: 'Late Arrivals',
      value: '12',
      description: 'Today so far',
      icon: Clock,
      trend: { value: 8.5, isPositive: false },
      variant: 'danger' as const,
    },
  ];

  return <StatsGrid stats={stats} />;
}

export function PayrollStats() {
  const stats = [
    {
      title: 'Monthly Payroll',
      value: '28.5M DZD',
      description: 'Total this month',
      icon: Wallet,
      trend: { value: 3.2, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Pending Approvals',
      value: '15',
      description: 'Payroll records',
      icon: Clock,
      variant: 'warning' as const,
    },
    {
      title: 'Active Branches',
      value: '6',
      description: 'All operational',
      icon: Building2,
      variant: 'success' as const,
    },
    {
      title: 'Average Hours',
      value: '7.8h',
      description: 'Per day this week',
      icon: TrendingUp,
      trend: { value: 1.5, isPositive: true },
    },
  ];

  return <StatsGrid stats={stats} />;
}
