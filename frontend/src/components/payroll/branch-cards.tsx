'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  MapPin, 
  Users, 
  Phone, 
  Mail,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity
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
      'relative overflow-hidden transition-all duration-300 card-hover',
      'animate-fade-in-up',
      `stagger-${Math.min(index + 1, 6)}`
    )}>
      {/* Accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              'bg-primary/10'
            )}>
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{branch.name.split(' ')[0]}</CardTitle>
              <CardDescription className="text-xs flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {branch.location}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              'font-normal',
              branch.status === 'ACTIVE' 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-muted text-muted-foreground'
            )}
          >
            {branch.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-muted/50 p-2">
            <div className="text-lg font-semibold">{stats.employeeCount}</div>
            <div className="text-xs text-muted-foreground">Employees</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <div className="text-lg font-semibold text-emerald-500">{stats.presentCount}</div>
            <div className="text-xs text-emerald-500/70">Present</div>
          </div>
          <div className="rounded-lg bg-rose-500/10 p-2">
            <div className="text-lg font-semibold text-rose-500">{stats.absentCount + stats.lateCount}</div>
            <div className="text-xs text-rose-500/70">Absent/Late</div>
          </div>
        </div>
        
        {/* Attendance Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Attendance Rate</span>
            <span className="font-medium">{stats.attendanceRate.toFixed(1)}%</span>
          </div>
          <Progress 
            value={stats.attendanceRate} 
            className="h-2"
          />
        </div>
        
        {/* Working Hours */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{branch.workingHoursStart} - {branch.workingHoursEnd}</span>
        </div>
        
        {/* Contact Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span className="truncate">{branch.phone}</span>
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
        <h2 className="text-lg font-semibold">Branch Overview</h2>
        <Badge variant="secondary" className="font-normal">
          {branches.length} Active Branches
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
  type: 'check_in' | 'check_out' | 'leave' | 'payroll' | 'alert';
  user: string;
  message: string;
  time: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'check_in',
    user: 'Ahmed Benali',
    message: 'Checked in at Algiers HQ',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'check_out',
    user: 'Fatima Zohra',
    message: 'Checked out from Oran Branch',
    time: '5 minutes ago',
  },
  {
    id: '3',
    type: 'leave',
    user: 'Mohamed Khaled',
    message: 'Leave request approved for Nov 25-27',
    time: '15 minutes ago',
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
];

export function ActivityFeed() {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'check_in':
        return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
      case 'check_out':
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />;
      case 'leave':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'payroll':
        return <Activity className="h-4 w-4 text-primary" />;
      case 'alert':
        return <Activity className="h-4 w-4 text-rose-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'check_in':
        return 'bg-emerald-500/10';
      case 'check_out':
        return 'bg-blue-500/10';
      case 'leave':
        return 'bg-amber-500/10';
      case 'payroll':
        return 'bg-primary/10';
      case 'alert':
        return 'bg-rose-500/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="animate-fade-in-up stagger-6 card-hover">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest updates across all branches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div 
              key={activity.id}
              className={cn(
                'flex items-start gap-3 animate-fade-in-up',
                `stagger-${index + 1}`
              )}
            >
              <div className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                getActivityBg(activity.type)
              )}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.message}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
