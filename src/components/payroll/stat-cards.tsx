'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';
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
  Calendar,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  index?: number;
}

// Memoized StatCard for performance optimization
export const StatCard = memo(function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = 'default',
  className,
  index = 1
}: StatCardProps) {
  // Memoize variant styles to prevent recalculation
  const variantStyles = useMemo(() => ({
    default: 'bg-card hover:border-border',
    primary: 'bg-primary/5 border-primary/20 hover:border-primary/40',
    success: 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40',
    warning: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40',
    danger: 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40',
    info: 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40',
  }), [variant]);

  const iconStyles = useMemo(() => ({
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/15 text-primary',
    success: 'bg-emerald-500/15 text-emerald-500',
    warning: 'bg-amber-500/15 text-amber-500',
    danger: 'bg-rose-500/15 text-rose-500',
    info: 'bg-blue-500/15 text-blue-500',
  }), []);

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 border card-hover',
      'animate-fade-in-up',
      variantStyles[variant],
      `stagger-${Math.min(index, 8)}`,
      className
    )}>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-50 dark:opacity-30">
        <div className={cn(
          'absolute top-0 right-0 w-full h-full rounded-full blur-3xl',
          variant === 'primary' && 'bg-primary/20',
          variant === 'success' && 'bg-emerald-500/20',
          variant === 'warning' && 'bg-amber-500/20',
          variant === 'danger' && 'bg-rose-500/20',
          variant === 'info' && 'bg-blue-500/20',
        )} />
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          'rounded-xl p-2.5 transition-transform duration-200 hover:scale-110',
          iconStyles[variant]
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md',
              trend.isPositive 
                ? 'text-emerald-600 bg-emerald-500/10' 
                : 'text-rose-600 bg-rose-500/10'
            )}>
              {trend.isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {(description || trend?.label) && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {description || trend?.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
});

interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string | number;
    description?: string;
    icon: React.ElementType;
    trend?: { value: number; isPositive: boolean; label?: string };
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  }>;
}

// Memoized StatsGrid for optimized rendering
export const StatsGrid = memo(function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={stat.title} 
          {...stat} 
          index={index + 1}
        />
      ))}
    </div>
  );
});

// Quick stats for the dashboard with enhanced design
// Memoized stats data to prevent unnecessary recalculations
const DASHBOARD_STATS = [
  {
    title: 'Total Employees',
    value: '353',
    description: 'Across 6 branches',
    icon: Users,
    trend: { value: 5.2, isPositive: true, label: 'vs last month' },
    variant: 'primary' as const,
  },
  {
    title: 'Present Today',
    value: '298',
    description: '84.4% attendance rate',
    icon: UserCheck,
    trend: { value: 2.1, isPositive: true, label: 'vs yesterday' },
    variant: 'success' as const,
  },
  {
    title: 'On Leave',
    value: '25',
    description: '15 annual, 10 sick',
    icon: Calendar,
    variant: 'warning' as const,
  },
  {
    title: 'Late Arrivals',
    value: '12',
    description: 'Within grace period',
    icon: Clock,
    trend: { value: 8.5, isPositive: false, label: 'vs yesterday' },
    variant: 'danger' as const,
  },
];

export const DashboardStats = memo(function DashboardStats() {
  return <StatsGrid stats={DASHBOARD_STATS} />;
});

// Payroll specific stats
const PAYROLL_STATS = [
  {
    title: 'Monthly Payroll',
    value: '28.5M DZD',
    description: 'Total this month',
    icon: Wallet,
    trend: { value: 3.2, isPositive: true, label: 'vs last month' },
    variant: 'primary' as const,
  },
  {
    title: 'Pending Approvals',
    value: '15',
    description: 'Awaiting review',
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
    icon: BarChart3,
    trend: { value: 1.5, isPositive: true, label: 'vs last week' },
    variant: 'info' as const,
  },
];

export const PayrollStats = memo(function PayrollStats() {
  return <StatsGrid stats={PAYROLL_STATS} />;
});

// HR Stats
const HR_STATS = [
  {
    title: 'Open Positions',
    value: '8',
    description: '3 urgent hiring',
    icon: Briefcase,
    trend: { value: 2, isPositive: false, label: 'new positions' },
    variant: 'primary' as const,
  },
  {
    title: 'New Hires',
    value: '12',
    description: 'This month',
    icon: UserCheck,
    trend: { value: 15, isPositive: true, label: 'vs last month' },
    variant: 'success' as const,
  },
  {
    title: 'Training Active',
    value: '24',
    description: 'Employees in training',
    icon: Target,
    variant: 'info' as const,
  },
  {
    title: 'Turnover Rate',
    value: '3.2%',
    description: 'Below target 5%',
    icon: Activity,
    trend: { value: 0.5, isPositive: true, label: 'improvement' },
    variant: 'success' as const,
  },
];

export const HRStats = memo(function HRStats() {
  return <StatsGrid stats={HR_STATS} />;
});

// Mini stat card for compact displays
interface MiniStatProps {
  label: string;
  value: string | number;
  icon?: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MiniStat = memo(function MiniStat({ label, value, icon: Icon, trend }: MiniStatProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      {Icon && (
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground truncate">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
      {trend && (
        <div className={cn(
          'flex items-center text-xs font-medium',
          trend.isPositive ? 'text-emerald-500' : 'text-rose-500'
        )}>
          {trend.isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
});
