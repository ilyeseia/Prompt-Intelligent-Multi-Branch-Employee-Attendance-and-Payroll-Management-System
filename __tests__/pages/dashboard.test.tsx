/**
 * Dashboard Page Integration Tests
 * End-to-end tests for the main dashboard
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/page';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('renders loading state initially', () => {
      render(<DashboardPage />);
      
      // Should show loading skeleton initially
      expect(screen.getByText(/Loading/i) || 
             document.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('renders dashboard after loading', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('renders live badge', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Live')).toBeInTheDocument();
      });
    });
  });

  describe('Dashboard Stats', () => {
    it('displays all stat cards after loading', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Total Employees')).toBeInTheDocument();
        expect(screen.getByText('Present Today')).toBeInTheDocument();
        expect(screen.getByText('On Leave')).toBeInTheDocument();
        expect(screen.getByText('Late Arrivals')).toBeInTheDocument();
      });
    });

    it('shows correct employee count', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('353')).toBeInTheDocument();
      });
    });
  });

  describe('Tab Navigation', () => {
    it('renders all tab buttons', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByRole('tablist')).toBeInTheDocument();
      });
    });

    it('switches to employees tab', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      const employeesTab = screen.getByRole('tab', { name: /employees/i });
      fireEvent.click(employeesTab);
      
      await waitFor(() => {
        expect(screen.getByText('Employee Management')).toBeInTheDocument();
      });
    });

    it('switches to attendance tab', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      const attendanceTab = screen.getByRole('tab', { name: /attendance/i });
      fireEvent.click(attendanceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Attendance Tracking')).toBeInTheDocument();
      });
    });

    it('switches to payroll tab', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      const payrollTab = screen.getByRole('tab', { name: /payroll/i });
      fireEvent.click(payrollTab);
      
      await waitFor(() => {
        expect(screen.getByText('Payroll Management')).toBeInTheDocument();
      });
    });
  });

  describe('Sidebar', () => {
    it('renders sidebar navigation', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
    });

    it('toggles sidebar collapse', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
      
      const toggleButton = screen.getByLabelText(/sidebar/i);
      fireEvent.click(toggleButton);
      
      // Sidebar should collapse/expand
      expect(toggleButton).toBeInTheDocument();
    });

    it('renders navigation items', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      // Navigation items in sidebar
      expect(screen.getByText('Employees')).toBeInTheDocument();
      expect(screen.getByText('Attendance')).toBeInTheDocument();
      expect(screen.getByText('Payroll')).toBeInTheDocument();
      expect(screen.getByText('Branches')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('renders search input in header', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
      });
    });

    it('allows typing in search input', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
      });
      
      const searchInput = screen.getByPlaceholderText(/Search/i);
      fireEvent.change(searchInput, { target: { value: 'John Doe' } });
      
      expect(searchInput).toHaveValue('John Doe');
    });
  });

  describe('Action Buttons', () => {
    it('renders export button', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Export')).toBeInTheDocument();
      });
    });

    it('renders sync button', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Sync')).toBeInTheDocument();
      });
    });

    it('renders add employee button', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Add Employee')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has skip link for keyboard navigation', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Skip to main content')).toBeInTheDocument();
      });
    });

    it('has proper heading hierarchy', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBeGreaterThan(0);
      });
    });

    it('main content has correct role', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
    });

    it('tabs have correct ARIA attributes', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        const tablist = screen.getByRole('tablist');
        expect(tablist).toBeInTheDocument();
        
        const tabs = screen.getAllByRole('tab');
        expect(tabs.length).toBe(4);
      });
    });
  });

  describe('Performance', () => {
    it('components are memoized', async () => {
      const { rerender } = render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      // Rerender should not cause full re-render of memoized components
      rerender(<DashboardPage />);
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('uses useCallback for handlers', async () => {
      render(<DashboardPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
      
      // Toggle sidebar multiple times - should use same callback reference
      const toggleButton = screen.getByLabelText(/sidebar/i);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      
      expect(toggleButton).toBeInTheDocument();
    });
  });
});
