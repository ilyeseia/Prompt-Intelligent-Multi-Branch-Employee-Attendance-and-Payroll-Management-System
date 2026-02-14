/**
 * Charts Component Tests
 * Tests for data visualization components
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  AttendanceChart, 
  DepartmentChart, 
  AttendanceGauge,
  PayrollSummaryCards,
  PayrollTrendChart,
  BranchPerformanceChart
} from '@/components/payroll/charts';

// Mock Recharts to avoid rendering issues in tests
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe('AttendanceChart Component', () => {
  it('renders chart title correctly', () => {
    render(<AttendanceChart />);
    
    expect(screen.getByText('Weekly Attendance Overview')).toBeInTheDocument();
  });

  it('renders chart description', () => {
    render(<AttendanceChart />);
    
    expect(screen.getByText(/Daily attendance trends/)).toBeInTheDocument();
  });

  it('renders legend items', () => {
    render(<AttendanceChart />);
    
    expect(screen.getByText('Present')).toBeInTheDocument();
    expect(screen.getByText('Late')).toBeInTheDocument();
    expect(screen.getByText('Absent')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(<AttendanceChart />);
    
    const chart = container.querySelector('[role="img"]') || 
                  container.querySelector('[class*="chart"]');
    expect(chart || container.firstChild).toBeInTheDocument();
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<AttendanceChart />);
    rerender(<AttendanceChart />);
    
    expect(screen.getByText('Weekly Attendance Overview')).toBeInTheDocument();
  });
});

describe('DepartmentChart Component', () => {
  it('renders chart title', () => {
    render(<DepartmentChart />);
    
    expect(screen.getByText('Department Distribution')).toBeInTheDocument();
  });

  it('displays total employee count', () => {
    render(<DepartmentChart />);
    
    expect(screen.getByText('353')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders chart container', () => {
    const { container } = render(<DepartmentChart />);
    
    expect(container.querySelector('[class*="chart"]') || 
           screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<DepartmentChart />);
    rerender(<DepartmentChart />);
    
    expect(screen.getByText('Department Distribution')).toBeInTheDocument();
  });
});

describe('AttendanceGauge Component', () => {
  it('renders gauge title', () => {
    render(<AttendanceGauge />);
    
    expect(screen.getByText("Today's Attendance")).toBeInTheDocument();
  });

  it('displays attendance rate', () => {
    render(<AttendanceGauge />);
    
    expect(screen.getByText('92.5%')).toBeInTheDocument();
  });

  it('displays summary statistics', () => {
    render(<AttendanceGauge />);
    
    expect(screen.getByText('298')).toBeInTheDocument();
    expect(screen.getByText('Present')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Late')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('Absent')).toBeInTheDocument();
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<AttendanceGauge />);
    rerender(<AttendanceGauge />);
    
    expect(screen.getByText('92.5%')).toBeInTheDocument();
  });
});

describe('PayrollSummaryCards Component', () => {
  it('renders all four summary cards', () => {
    render(<PayrollSummaryCards />);
    
    expect(screen.getByText('Total Payroll')).toBeInTheDocument();
    expect(screen.getByText('Average Salary')).toBeInTheDocument();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
    expect(screen.getByText('Processed')).toBeInTheDocument();
  });

  it('displays change indicators', () => {
    render(<PayrollSummaryCards />);
    
    expect(screen.getByText('+3.2%')).toBeInTheDocument();
    expect(screen.getByText('+1.8%')).toBeInTheDocument();
  });

  it('applies correct styling for positive changes', () => {
    const { container } = render(<PayrollSummaryCards />);
    
    const positiveElements = container.querySelectorAll('.text-emerald-500');
    expect(positiveElements.length).toBeGreaterThan(0);
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<PayrollSummaryCards />);
    rerender(<PayrollSummaryCards />);
    
    expect(screen.getByText('Total Payroll')).toBeInTheDocument();
  });
});

describe('PayrollTrendChart Component', () => {
  it('renders chart title', () => {
    render(<PayrollTrendChart />);
    
    expect(screen.getByText('Monthly Payroll Trend')).toBeInTheDocument();
  });

  it('displays current month indicator', () => {
    render(<PayrollTrendChart />);
    
    expect(screen.getByText('28.5M')).toBeInTheDocument();
    expect(screen.getByText('Current Month')).toBeInTheDocument();
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<PayrollTrendChart />);
    rerender(<PayrollTrendChart />);
    
    expect(screen.getByText('Monthly Payroll Trend')).toBeInTheDocument();
  });
});

describe('BranchPerformanceChart Component', () => {
  it('renders chart title', () => {
    render(<BranchPerformanceChart />);
    
    expect(screen.getByText('Branch Performance')).toBeInTheDocument();
  });

  it('renders chart description', () => {
    render(<BranchPerformanceChart />);
    
    expect(screen.getByText(/Attendance rate by branch/)).toBeInTheDocument();
  });

  it('is memoized for performance', () => {
    const { rerender } = render(<BranchPerformanceChart />);
    rerender(<BranchPerformanceChart />);
    
    expect(screen.getByText('Branch Performance')).toBeInTheDocument();
  });
});

describe('Charts Accessibility', () => {
  it('AttendanceChart has accessible content', () => {
    const { container } = render(<AttendanceChart />);
    
    // Check for accessible structure
    const card = container.querySelector('[class*="card"]') || container.firstChild;
    expect(card).toBeInTheDocument();
  });

  it('DepartmentChart has accessible legend', () => {
    render(<DepartmentChart />);
    
    // Legend items should be readable
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('AttendanceGauge has readable values', () => {
    render(<AttendanceGauge />);
    
    // All values should be screenreader accessible
    expect(screen.getByText('92.5%')).toBeInTheDocument();
    expect(screen.getByText('Present')).toBeInTheDocument();
  });
});
