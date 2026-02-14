'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/chart';
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { dailyAttendance, branchStats, employees, payrollRecords } from '@/lib/mock-data/data';

// Memoized chart config - static definition
const chartConfig = {
  present: {
    label: 'Present',
    color: 'oklch(0.72 0.16 195)',
  },
  absent: {
    label: 'Absent',
    color: 'oklch(0.65 0.20 25)',
  },
  late: {
    label: 'Late',
    color: 'oklch(0.78 0.14 85)',
  },
  onLeave: {
    label: 'On Leave',
    color: 'oklch(0.68 0.18 300)',
  },
} satisfies ChartConfig;

// Static colors array - no recalculation needed
const COLORS = [
  'oklch(0.72 0.16 195)',
  'oklch(0.74 0.14 160)',
  'oklch(0.80 0.12 85)',
  'oklch(0.70 0.18 300)',
  'oklch(0.82 0.12 35)',
  'oklch(0.68 0.15 220)',
  'oklch(0.75 0.13 140)',
  'oklch(0.72 0.17 250)',
];

// Custom gradient definitions for charts - memoized
const GradientDefs = memo(function GradientDefs() {
  return (
    <defs>
      <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="oklch(0.72 0.16 195)" stopOpacity={0.4}/>
        <stop offset="95%" stopColor="oklch(0.72 0.16 195)" stopOpacity={0.05}/>
      </linearGradient>
      <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="oklch(0.78 0.14 85)" stopOpacity={0.4}/>
        <stop offset="95%" stopColor="oklch(0.78 0.14 85)" stopOpacity={0.05}/>
      </linearGradient>
      <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="oklch(0.65 0.20 25)" stopOpacity={0.4}/>
        <stop offset="95%" stopColor="oklch(0.65 0.20 25)" stopOpacity={0.05}/>
      </linearGradient>
      <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="oklch(0.72 0.16 195)" stopOpacity={0.35}/>
        <stop offset="95%" stopColor="oklch(0.72 0.16 195)" stopOpacity={0}/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  );
});

// Attendance Chart with animations - memoized
export const AttendanceChart = memo(function AttendanceChart() {
  // Memoize data transformation to prevent recalculation on each render
  const data = useMemo(() => dailyAttendance.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    present: d.present,
    absent: d.absent,
    late: d.late,
    onLeave: d.onLeave,
  })), []);

  return (
    <Card className="col-span-full lg:col-span-2 animate-fade-in-up stagger-2 card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Weekly Attendance Overview</CardTitle>
            <CardDescription>
              Daily attendance trends for the past 7 days
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.78 0.14 85)' }} />
              <span className="text-muted-foreground">Late</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.65 0.20 25)' }} />
              <span className="text-muted-foreground">Absent</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <GradientDefs />
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis 
              dataKey="date" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: 'oklch(0.72 0.16 195 / 30%)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="oklch(0.72 0.16 195)"
              strokeWidth={2}
              fill="url(#colorPresent)"
              name="Present"
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="late"
              stroke="oklch(0.78 0.14 85)"
              strokeWidth={2}
              fill="url(#colorLate)"
              name="Late"
              animationDuration={1000}
              animationEasing="ease-out"
              animationBegin={200}
            />
            <Area
              type="monotone"
              dataKey="absent"
              stroke="oklch(0.65 0.20 25)"
              strokeWidth={2}
              fill="url(#colorAbsent)"
              name="Absent"
              animationDuration={1000}
              animationEasing="ease-out"
              animationBegin={400}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

// Department Distribution with Donut Chart - memoized
export const DepartmentChart = memo(function DepartmentChart() {
  // Memoize expensive department counting operation
  const data = useMemo(() => {
    const departmentCounts = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(departmentCounts)
      .map(([name, value]) => ({ 
        name: name.replace('_', ' '), 
        value,
        percentage: ((value / employees.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, []);

  return (
    <Card className="animate-fade-in-up stagger-3 card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Department Distribution</CardTitle>
        <CardDescription>
          Employees by department
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 relative">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                  className="transition-opacity hover:opacity-80 cursor-pointer"
                />
              ))}
            </Pie>
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
        </ChartContainer>
        
        {/* Center stats */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '120px' }}>
          <div className="text-center">
            <div className="text-2xl font-bold">{employees.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
          {data.slice(0, 6).map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 group cursor-default">
              <div 
                className="h-2 w-2 rounded-full transition-transform group-hover:scale-125" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors">
                {item.name}
              </span>
              <span className="text-xs font-medium ml-auto">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

// Branch Performance with Horizontal Bar Chart - memoized
export const BranchPerformanceChart = memo(function BranchPerformanceChart() {
  const data = useMemo(() => branchStats.map(b => ({
    name: b.branchName.replace(' Branch', '').replace(' Headquarters', ''),
    attendance: Math.round(b.attendanceRate),
    employees: b.employeeCount,
    present: b.presentCount,
  })), []);

  return (
    <Card className="animate-fade-in-up stagger-4 card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Branch Performance</CardTitle>
        <CardDescription>
          Attendance rate by branch
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-border/50" 
              horizontal={false} 
            />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              width={65}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'oklch(0.72 0.16 195 / 8%)' }}
            />
            <Bar 
              dataKey="attendance" 
              fill="oklch(0.72 0.16 195)" 
              radius={[0, 4, 4, 0]}
              name="Attendance Rate"
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity hover:opacity-80 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

// Payroll Trend Chart with gradient - memoized
export const PayrollTrendChart = memo(function PayrollTrendChart() {
  // Memoize payroll data calculation with deterministic values to avoid hydration mismatch
  const data = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Use deterministic values based on index to prevent hydration mismatch
    const payrollValues = [27.2, 26.8, 27.5, 28.1, 27.9, 28.3, 28.0, 27.6, 28.2, 27.8, 28.5];
    const employeeValues = [342, 345, 348, 352, 350, 353, 351, 349, 352, 350, 353];
    const salaryValues = [78000, 76500, 79200, 81000, 78500, 82000, 79800, 77500, 81500, 79000, 82500];
    
    return months.slice(0, 11).map((month, index) => ({
      month,
      payroll: payrollValues[index],
      employees: employeeValues[index],
      avgSalary: salaryValues[index],
    }));
  }, []);

  return (
    <Card className="col-span-full animate-fade-in-up stagger-5 card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Monthly Payroll Trend</CardTitle>
            <CardDescription>
              Total payroll amount in millions DZD over the year
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10">
              <span className="font-medium text-primary">28.5M</span>
              <span className="text-muted-foreground">Current Month</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <GradientDefs />
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis 
              dataKey="month" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dx={-10}
              tickFormatter={(value) => `${value}M`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: 'oklch(0.72 0.16 195 / 50%)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="payroll"
              stroke="oklch(0.72 0.16 195)"
              strokeWidth={2.5}
              fill="url(#payrollGradient)"
              name="Payroll (M DZD)"
              animationDuration={1200}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: 'oklch(0.12 0.012 260)', 
                strokeWidth: 2,
                fill: 'oklch(0.72 0.16 195)'
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

// Attendance Gauge Chart - memoized
export const AttendanceGauge = memo(function AttendanceGauge() {
  const attendanceRate = 92.5;
  
  const data = useMemo(() => [
    {
      name: 'attendance',
      value: attendanceRate,
      fill: 'oklch(0.72 0.16 195)',
    },
  ], []);

  return (
    <Card className="animate-fade-in-up stagger-6 card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Today's Attendance</CardTitle>
        <CardDescription>
          Overall attendance rate
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative h-[180px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RadialBarChart
              cx="50%"
              cy="70%"
              innerRadius="60%"
              outerRadius="100%"
              startAngle={180}
              endAngle={0}
              data={data}
            >
              <RadialBar
                background={{ fill: 'oklch(0.22 0.012 260)' }}
                dataKey="value"
                cornerRadius={10}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </RadialBarChart>
          </ChartContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ top: '20px' }}>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{attendanceRate}%</div>
              <div className="text-xs text-muted-foreground mt-1">Attendance Rate</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 text-xs">
          <div className="text-center">
            <div className="font-semibold text-emerald-500">298</div>
            <div className="text-muted-foreground">Present</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-amber-500">12</div>
            <div className="text-muted-foreground">Late</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-rose-500">18</div>
            <div className="text-muted-foreground">Absent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// Payroll Summary Cards with mini charts - memoized
export const PayrollSummaryCards = memo(function PayrollSummaryCards() {
  // Memoize calculations to prevent recalculation on each render
  const stats = useMemo(() => {
    const totalPayroll = payrollRecords.reduce((sum, r) => sum + r.netSalary, 0);
    const avgSalary = totalPayroll / payrollRecords.length;
    
    return [
      {
        title: 'Total Payroll',
        value: `${(totalPayroll / 1000000).toFixed(1)}M DZD`,
        change: '+3.2%',
        isPositive: true,
      },
      {
        title: 'Average Salary',
        value: `${(avgSalary / 1000).toFixed(0)}K DZD`,
        change: '+1.8%',
        isPositive: true,
      },
      {
        title: 'Pending Approvals',
        value: '15',
        change: '-2',
        isPositive: true,
      },
      {
        title: 'Processed',
        value: '338',
        change: '+12',
        isPositive: true,
      },
    ];
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className={cn(
            'animate-fade-in-up card-hover',
            `stagger-${index + 1}`
          )}
        >
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground mb-1">{stat.title}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={cn(
              'text-xs mt-2 flex items-center gap-1',
              stat.isPositive ? 'text-emerald-500' : 'text-rose-500'
            )}>
              {stat.isPositive ? (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {stat.change} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
