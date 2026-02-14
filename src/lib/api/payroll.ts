// ============================================
// Payroll API Service - Frontend Development Guidelines
// ============================================

import { api, type PaginatedResponse } from './client';
import type { PayrollRecord, PayrollFormData } from '@/types/payroll';

// Types
interface PayrollFilters {
  employeeId?: number;
  branchId?: number;
  status?: string;
  month?: string;
}

interface PayrollListParams extends PayrollFilters {
  page?: number;
  size?: number;
  sort?: string;
}

interface PayrollCalculationRequest {
  employeeId: number;
  month: string;
  bonus?: number;
  commission?: number;
  otherDeductions?: number;
  notes?: string;
}

interface PayrollBatchRequest {
  branchId?: number;
  month: string;
  employeeIds?: number[];
}

interface PayrollSummary {
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  totalEmployees: number;
  pendingApprovals: number;
  processed: number;
}

interface PayrollStats {
  averageSalary: number;
  medianSalary: number;
  highestSalary: number;
  lowestSalary: number;
  totalOvertime: number;
}

// API Service
export const payrollApi = {
  /**
   * Get all payroll records with pagination
   */
  getAll: (params?: PayrollListParams) =>
    api.get<PaginatedResponse<PayrollRecord>>('/payroll', params as Record<string, unknown>),

  /**
   * Get payroll by ID
   */
  getById: (id: number) =>
    api.get<PayrollRecord>(`/payroll/${id}`),

  /**
   * Get payroll by employee
   */
  getByEmployee: (employeeId: number) =>
    api.get<PayrollRecord[]>(`/payroll/employee/${employeeId}`),

  /**
   * Calculate payroll for single employee
   */
  calculate: (data: PayrollCalculationRequest) =>
    api.post<PayrollRecord>('/payroll/calculate', data),

  /**
   * Run batch payroll calculation
   */
  runBatch: (data: PayrollBatchRequest) =>
    api.post<{ processed: number; errors: string[] }>('/payroll/batch', data),

  /**
   * Update payroll record
   */
  update: (id: number, data: Partial<PayrollFormData>) =>
    api.put<PayrollRecord>(`/payroll/${id}`, data),

  /**
   * Approve payroll
   */
  approve: (id: number) =>
    api.put<PayrollRecord>(`/payroll/${id}/approve`, {}),

  /**
   * Reject payroll
   */
  reject: (id: number, reason: string) =>
    api.put<PayrollRecord>(`/payroll/${id}/reject`, { reason }),

  /**
   * Process payment
   */
  processPayment: (id: number, paymentMethod: string) =>
    api.put<PayrollRecord>(`/payroll/${id}/process`, { paymentMethod }),

  /**
   * Get payroll summary for month
   */
  getSummary: (month: string, branchId?: number) =>
    api.get<PayrollSummary>('/payroll/summary', { month, branchId }),

  /**
   * Get payroll statistics
   */
  getStats: (month: string) =>
    api.get<PayrollStats>(`/payroll/stats/${month}`),

  /**
   * Get pending approvals
   */
  getPendingApprovals: () =>
    api.get<PayrollRecord[]>('/payroll/pending'),

  /**
   * Export payroll slips
   */
  exportSlips: (month: string, employeeIds?: number[]) =>
    api.get<Blob>('/payroll/export-slips', { month, employeeIds: employeeIds?.join(',') }),

  /**
   * Generate payroll report
   */
  generateReport: (params: { month: string; branchId?: number; format: 'pdf' | 'excel' }) =>
    api.get<Blob>('/payroll/report', params as Record<string, unknown>),
};

export type { 
  PayrollFilters, 
  PayrollListParams, 
  PayrollCalculationRequest, 
  PayrollBatchRequest,
  PayrollSummary,
  PayrollStats 
};
