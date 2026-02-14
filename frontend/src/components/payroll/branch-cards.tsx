'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building2, 
  MapPin, 
  Users, 
  Phone, 
  Mail,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  Calendar,
  Briefcase,
  Wallet,
  FileText,
  Bell,
  Zap
} from 'lucide-react';
import { Branch, BranchStats } from '@/types/payroll';
import { branchStats, branches } from '@/lib/mock-data/data';

interface BranchCardProps {
  branch: Branch;
  stats: BranchStats;
  index?: number;
}

export function BranchCard({ branch, stats, index = 0 }: BranchCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 card-hover group',
      'animate-fade-in-up',
      `stagger-${Math.min(index + 1, 8)}`
    )}>
      {/* Accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl',
              'bg-gradient-to-br from-primary/20 to-primary/5',
              'border border-primary/10'
            )}>
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{branch.name.split(' ')[0]}</CardTitle>
              <CardDescription className="text-xs flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {branch.location}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              'font-normal text-xs',
              branch.status === 'ACTIVE' 
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                : 'bg-muted text-muted-foreground'
            )}
          >
            <span className={cn(
              'h-1.5 w-1.5 rounded-full mr-1.5',
              branch.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'
            )} />
            {branch.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted/30 p-2.5 text-center transition-colors hover:bg-muted/50">
            <div className="text-lg font-bold">{stats.employeeCount}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Staff</div>
          </div>
          <div className="rounded-lg bg-emerald-500/5 p-2.5 text-center border border-emerald-500/10">
            <div className="text-lg font-bold text-emerald-600">{stats.presentCount}</div>
            <div className="text-[10px] text-emerald-600/70 uppercase tracking-wide">Present</div>
          </div>
          <div className="rounded-lg bg-rose-500/5 p-2.5 text-center border border-rose-500/10">
            <div className="text-lg font-bold text-rose-600">{stats.absentCount + stats.lateCount}</div>
            <div className="text-[10px] text-rose-600/70 uppercase tracking-wide">Issues</div>
          </div>
        </div>
        
        {/* Attendance Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground text-xs">Attendance Rate</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{stats.attendanceRate.toFixed(1)}%</span>
              {stats.attendanceRate >= 95 && (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              )}
            </div>
          </div>
          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className={cn(
                'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                stats.attendanceRate >= 95 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                stats.attendanceRate >= 85 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                'bg-gradient-to-r from-rose-500 to-rose-400'
              )}
              style={{ width: `${stats.attendanceRate}%` }}
            />
          </div>
        </div>
        
        {/* Working Hours */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{branch.workingHoursStart} - {branch.workingHoursEnd}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono">{branch.phone?.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BranchesOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Branch Performance</h2>
          <p className="text-sm text-muted-foreground">Real-time attendance across all locations</p>
        </div>
        <Badge variant="secondary" className="font-normal text-xs gap-1.5">
          <Activity className="h-3 w-3" />
          {branches.length} Active
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {branches.slice(0, 6).map((branch, index) => (
          <BranchCard 
            key={branch.id} 
            branch={branch} 
            stats={branchStats[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

// Activity Feed Component
interface ActivityItem {
  id: string;
  type: 'check_in' | 'check_out' | 'leave' | 'payroll' | 'alert' | 'hire' | 'promotion';
  user: string;
  message: string;
  time: string;
  avatar?: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'check_in',
    user: 'Ahmed Benali',
    message: 'Checked in at Algiers HQ',
    time: '2 min ago',
  },
  {
    id: '2',
    type: 'check_out',
    user: 'Fatima Zohra',
    message: 'Checked out from Oran Branch',
    time: '5 min ago',
  },
  {
    id: '3',
    type: 'leave',
    user: 'Mohamed Khaled',
    message: 'Leave request approved for Nov 25-27',
    time: '15 min ago',
  },
  {
    id: '4',
    type: 'payroll',
    user: 'HR Department',
    message: 'November payroll batch processed',
    time: '1 hour ago',
  },
  {
    id: '5',
    type: 'alert',
    user: 'System',
    message: 'Late arrival detected: 3 employees',
    time: '2 hours ago',
  },
  {
    id: '6',
    type: 'hire',
    user: 'New Employee',
    message: 'Karim Messaoudi joined IT Department',
    time: '3 hours ago',
  },
];

export function ActivityFeed() {
  const getActivityConfig = (type: ActivityItem['type']) => {
    const configs: Record<ActivityItem['type'], { bg: string; icon: React.ReactNode; color: string }> = {
      check_in: { 
        bg: 'bg-emerald-500/10', 
        icon: <ArrowUpRight className="h-3.5 w-3.5" />,
        color: 'text-emerald-500'
      },
      check_out: { 
        bg: 'bg-blue-500/10', 
        icon: <ArrowDownRight className="h-3.5 w-3.5" />,
        color: 'text-blue-500'
      },
      leave: { 
        bg: 'bg-amber-500/10', 
        icon: <Calendar className="h-3.5 w-3.5" />,
        color: 'text-amber-500'
      },
      payroll: { 
        bg: 'bg-primary/10', 
        icon: <Wallet className="h-3.5 w-3.5" />,
        color: 'text-primary'
      },
      alert: { 
        bg: 'bg-rose-500/10', 
        icon: <AlertCircle className="h-3.5 w-3.5" />,
        color: 'text-rose-500'
      },
      hire: { 
        bg: 'bg-violet-500/10', 
        icon: <UserCheck className="h-3.5 w-3.5" />,
        color: 'text-violet-500'
      },
      promotion: { 
        bg: 'bg-cyan-500/10', 
        icon: <TrendingUp className="h-3.5 w-3.5" />,
        color: 'text-cyan-500'
      },
    };
    return configs[type] || configs.check_in;
  };

  return (
    <Card className="animate-fade-in-up card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs font-normal">
            Live
          </Badge>
        </div>
        <CardDescription>
          Latest updates across all branches
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3">
        <div className="space-y-1">
          {recentActivities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            return (
              <div 
                key={activity.id}
                className={cn(
                  'flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-muted/50 cursor-default',
                  'animate-fade-in-up',
                  `stagger-${index + 1}`
                )}
              >
                <div className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  config.bg
                )}>
                  <span className={config.color}>{config.icon}</span>
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <p className="text-sm font-medium truncate">{activity.user}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.message}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap pt-1">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* View all link */}
        <button className="w-full mt-3 py-2 text-xs text-center text-muted-foreground hover:text-primary transition-colors">
          View all activity →
        </button>
      </CardContent>
    </Card>
  );
}

// Quick Actions Component
export function QuickActions() {
  const actions = [
    { icon: UserCheck, label: 'Add Employee', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Calendar, label: 'Mark Leave', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: Wallet, label: 'Run Payroll', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: FileText, label: 'Reports', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <Card className="animate-fade-in-up card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>
          Common tasks at your fingertips
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <button
              key={action.label}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-lg border border-transparent',
                'hover:border-border hover:bg-muted/30 transition-all duration-200',
                'animate-fade-in-up',
                `stagger-${index + 1}`
              )}
            >
              <div className={cn('p-2.5 rounded-xl', action.bg)}>
                <action.icon className={cn('h-4 w-4', action.color)} />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Notifications Panel
export function NotificationsPanel() {
  const notifications = [
    { id: 1, type: 'warning', message: '3 pending leave requests', time: 'Now' },
    { id: 2, type: 'info', message: 'Payroll deadline in 3 days', time: '1h' },
    { id: 3, type: 'alert', message: 'ZKTeco device offline in Oran', time: '2h' },
  ];

  return (
    <Card className="animate-fade-in-up card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Notifications</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">3 new</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        <div className="space-y-1">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={cn(
                'h-2 w-2 rounded-full',
                notif.type === 'warning' && 'bg-amber-500',
                notif.type === 'info' && 'bg-blue-500',
                notif.type === 'alert' && 'bg-rose-500'
              )} />
              <span className="text-sm flex-1 truncate">{notif.message}</span>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
