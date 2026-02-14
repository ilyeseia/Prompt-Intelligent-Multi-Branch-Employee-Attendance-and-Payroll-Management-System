'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy chart components with loading fallbacks
// This reduces the initial bundle size and improves LCP

// Loading skeleton for charts
function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-card p-6 ${className || ''}`}>
      <div className="h-4 w-32 bg-muted rounded mb-4" />
      <div className="h-3 w-48 bg-muted/70 rounded mb-6" />
      <div className="h-[200px] w-full bg-muted/50 rounded" />
    </div>
  );
}

// Lazy loaded chart components with suspense boundaries
export const LazyAttendanceChart = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.AttendanceChart })),
  {
    loading: () => <ChartSkeleton className="col-span-full lg:col-span-2" />,
    ssr: true, // Enable SSR for better SEO and initial paint
  }
);

export const LazyDepartmentChart = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.DepartmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: true,
  }
);

export const LazyBranchPerformanceChart = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.BranchPerformanceChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: true,
  }
);

export const LazyPayrollTrendChart = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.PayrollTrendChart })),
  {
    loading: () => <ChartSkeleton className="col-span-full" />,
    ssr: true,
  }
);

export const LazyAttendanceGauge = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.AttendanceGauge })),
  {
    loading: () => <ChartSkeleton />,
    ssr: true,
  }
);

export const LazyPayrollSummaryCards = dynamic(
  () => import('./charts').then((mod) => ({ default: mod.PayrollSummaryCards })),
  {
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-card p-6">
            <div className="h-3 w-20 bg-muted rounded mb-2" />
            <div className="h-6 w-24 bg-muted/70 rounded mb-2" />
            <div className="h-3 w-16 bg-muted/50 rounded" />
          </div>
        ))}
      </div>
    ),
    ssr: true,
  }
);
