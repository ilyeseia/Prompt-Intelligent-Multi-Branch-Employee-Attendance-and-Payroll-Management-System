// ============================================
// Employees API Service - Frontend Development Guidelines
// ============================================

import { api, type PaginatedResponse } from './client';
import type { Employee, EmployeeFormData } from '@/types/payroll';

// Types
interface EmployeeFilters {
  department?: string;
  status?: string;
  branchId?: number;
  search?: string;
}

interface EmployeeListParams extends EmployeeFilters {
  page?: number;
  size?: number;
  sort?: string;
}

// API Service
export const employeesApi = {
  /**
   * Get all employees with pagination
   */
  getAll: (params?: EmployeeListParams) =>
    api.get<PaginatedResponse<Employee>>('/employees', params as Record<string, unknown>),

  /**
   * Get employee by ID
   */
  getById: (id: number) =>
    api.get<Employee>(`/employees/${id}`),

  /**
   * Get employee by employee ID (string)
   */
  getByEmployeeId: (employeeId: string) =>
    api.get<Employee>(`/employees/by-employee-id/${employeeId}`),

  /**
   * Create new employee
   */
  create: (data: EmployeeFormData) =>
    api.post<Employee>('/employees', data),

  /**
   * Update employee
   */
  update: (id: number, data: Partial<EmployeeFormData>) =>
    api.put<Employee>(`/employees/${id}`, data),

  /**
   * Delete employee
   */
  delete: (id: number) =>
    api.delete<void>(`/employees/${id}`),

  /**
   * Update employee status
   */
  updateStatus: (id: number, status: string) =>
    api.patch<Employee>(`/employees/${id}/status`, { status }),

  /**
   * Get employees by branch
   */
  getByBranch: (branchId: number) =>
    api.get<Employee[]>(`/employees/branch/${branchId}`),

  /**
   * Get employees by department
   */
  getByDepartment: (department: string) =>
    api.get<Employee[]>(`/employees/department/${department}`),

  /**
   * Search employees
   */
  search: (query: string) =>
    api.get<Employee[]>('/employees/search', { query }),

  /**
   * Export employees to CSV
   */
  exportCsv: (filters?: EmployeeFilters) =>
    api.get<Blob>('/employees/export', filters as Record<string, unknown>),
};

export type { EmployeeFilters, EmployeeListParams };
