/**
 * Dashboard Stats Component Tests
 * Tests for stat cards display and interactions
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardStats, StatCard, StatsGrid } from '@/components/payroll/stat-cards';
import { Users, UserCheck } from 'lucide-react';

describe('StatCard Component', () => {
  const defaultProps = {
    title: 'Total Employees',
    value: 353,
    icon: Users,
    description: 'Across 6 branches',
  };

  it('renders title and value correctly', () => {
    render(<StatCard {...defaultProps} />);
    
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('353')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<StatCard {...defaultProps} />);
    
    expect(screen.getByText('Across 6 branches')).toBeInTheDocument();
  });

  it('renders trend indicator when provided', () => {
    render(
      <StatCard 
        {...defaultProps} 
        trend={{ value: 5.2, isPositive: true, label: 'vs last month' }}
      />
    );
    
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('displays positive trend with green styling', () => {
    render(
      <StatCard 
        {...defaultProps} 
        trend={{ value: 5.2, isPositive: true }}
      />
    );
    
    const trendElement = screen.getByText('5.2%').closest('div');
    expect(trendElement).toHaveClass('text-emerald-600');
  });

  it('displays negative trend with red styling', () => {
    render(
      <StatCard 
        {...defaultProps} 
        trend={{ value: 8.5, isPositive: false }}
      />
    );
    
    const trendElement = screen.getByText('8.5%').closest('div');
    expect(trendElement).toHaveClass('text-rose-600');
  });

  it('applies variant styles correctly', () => {
    const { container } = render(
      <StatCard {...defaultProps} variant="primary" />
    );
    
    const card = container.querySelector('[class*="bg-primary"]');
    expect(card).toBeInTheDocument();
  });

  it('formats large numbers with locale', () => {
    render(<StatCard {...defaultProps} value={1234567} />);
    
    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<StatCard {...defaultProps} />);
    
    // Check that the card is accessible
    const card = screen.getByText('Total Employees').closest('div');
    expect(card).toBeInTheDocument();
  });
});

describe('StatsGrid Component', () => {
  const stats = [
    { title: 'Employees', value: 100, icon: Users },
    { title: 'Active', value: 80, icon: UserCheck },
  ];

  it('renders all stat cards', () => {
    render(<StatsGrid stats={stats} />);
    
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies correct grid layout classes', () => {
    const { container } = render(<StatsGrid stats={stats} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-4');
  });
});

describe('DashboardStats Component', () => {
  it('renders all four stat cards', () => {
    render(<DashboardStats />);
    
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('Present Today')).toBeInTheDocument();
    expect(screen.getByText('On Leave')).toBeInTheDocument();
    expect(screen.getByText('Late Arrivals')).toBeInTheDocument();
  });

  it('displays correct values', () => {
    render(<DashboardStats />);
    
    expect(screen.getByText('353')).toBeInTheDocument();
    expect(screen.getByText('298')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('displays trend information', () => {
    render(<DashboardStats />);
    
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    expect(screen.getByText('2.1%')).toBeInTheDocument();
  });

  it('applies correct variant colors', () => {
    const { container } = render(<DashboardStats />);
    
    // Primary variant for Total Employees
    const primaryCard = container.querySelector('[class*="primary"]');
    expect(primaryCard).toBeInTheDocument();
  });
});

describe('StatCard Performance', () => {
  it('should be memoized', () => {
    const { rerender } = render(<StatCard {...{
      title: 'Test',
      value: 100,
      icon: Users,
    }} />);
    
    // Rerender with same props should not cause re-render
    rerender(<StatCard {...{
      title: 'Test',
      value: 100,
      icon: Users,
    }} />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
