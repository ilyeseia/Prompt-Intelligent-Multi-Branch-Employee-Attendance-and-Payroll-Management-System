'use client';

import * as React from 'react';
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { dailyAttendance, branchStats, employees } from '@/lib/mock-data/data';

const chartConfig = {
  present: {
    label: 'Present',
    color: 'oklch(0.7 0.18 195)',
  },
  absent: {
    label: 'Absent',
    color: 'oklch(0.65 0.22 25)',
  },
  late: {
    label: 'Late',
    color: 'oklch(0.75 0.15 85)',
  },
  onLeave: {
    label: 'On Leave',
    color: 'oklch(0.68 0.2 300)',
  },
} satisfies ChartConfig;

const COLORS = [
  'oklch(0.7 0.18 195)',
  'oklch(0.72 0.16 160)',
  'oklch(0.78 0.14 85)',
  'oklch(0.68 0.2 300)',
  'oklch(0.8 0.14 35)',
  'oklch(0.65 0.15 220)',
];

export function AttendanceChart() {
  const data = dailyAttendance.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    present: d.present,
    absent: d.absent,
    late: d.late,
    onLeave: d.onLeave,
  }));

  return (
    <Card className="col-span-full lg:col-span-2 animate-fade-in-up stagger-2 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Attendance Overview</CardTitle>
        <CardDescription>
          Daily attendance trends for the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="date" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'oklch(0.7 0.18 195 / 10%)' }}
            />
            <Bar 
              dataKey="present" 
              fill="oklch(0.7 0.18 195)" 
              radius={[4, 4, 0, 0]}
              name="Present"
            />
            <Bar 
              dataKey="late" 
              fill="oklch(0.75 0.15 85)" 
              radius={[4, 4, 0, 0]}
              name="Late"
            />
            <Bar 
              dataKey="absent" 
              fill="oklch(0.65 0.22 25)" 
              radius={[4, 4, 0, 0]}
              name="Absent"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function DepartmentChart() {
  // Count employees by department
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(departmentCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <Card className="animate-fade-in-up stagger-3 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Department Distribution</CardTitle>
        <CardDescription>
          Employees by department
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.slice(0, 6).map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="h-2 w-2 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground truncate">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function BranchPerformanceChart() {
  const data = branchStats.map(b => ({
    name: b.branchName.replace(' Branch', '').replace(' Headquarters', ''),
    attendance: Math.round(b.attendanceRate),
    employees: b.employeeCount,
  }));

  return (
    <Card className="animate-fade-in-up stagger-4 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Branch Performance</CardTitle>
        <CardDescription>
          Attendance rate by branch location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
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
              width={80}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'oklch(0.7 0.18 195 / 10%)' }}
            />
            <Bar 
              dataKey="attendance" 
              fill="oklch(0.7 0.18 195)" 
              radius={[0, 4, 4, 0]}
              name="Attendance Rate"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PayrollTrendChart() {
  // Generate monthly payroll data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  const data = months.map((month, index) => ({
    month,
    payroll: 26 + Math.random() * 4,
    employees: 340 + Math.floor(Math.random() * 15),
  }));

  return (
    <Card className="col-span-full animate-fade-in-up stagger-5 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Payroll Trend</CardTitle>
        <CardDescription>
          Total payroll amount in millions DZD over the year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.18 195)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="oklch(0.7 0.18 195)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="month" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}M`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: 'oklch(0.7 0.18 195 / 50%)' }}
            />
            <Area
              type="monotone"
              dataKey="payroll"
              stroke="oklch(0.7 0.18 195)"
              strokeWidth={2}
              fill="url(#payrollGradient)"
              name="Payroll (M DZD)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
