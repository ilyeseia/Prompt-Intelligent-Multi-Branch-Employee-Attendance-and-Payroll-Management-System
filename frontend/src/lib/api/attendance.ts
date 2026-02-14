// ============================================
// Attendance API Service - Frontend Development Guidelines
// ============================================

import { api, type PaginatedResponse } from './client';
import type { Attendance, AttendanceFormData } from '@/types/payroll';

// Types
interface AttendanceFilters {
  employeeId?: number;
  branchId?: number;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface AttendanceListParams extends AttendanceFilters {
  page?: number;
  size?: number;
  sort?: string;
}

interface CheckInOutRequest {
  employeeId: number;
  deviceId?: string;
  latitude?: number;
  longitude?: number;
}

interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  onLeave: number;
  totalWorkingHours: number;
  attendanceRate: number;
}

// API Service
export const attendanceApi = {
  /**
   * Get all attendance records with pagination
   */
  getAll: (params?: AttendanceListParams) =>
    api.get<PaginatedResponse<Attendance>>('/attendance', params as Record<string, unknown>),

  /**
   * Get attendance by ID
   */
  getById: (id: number) =>
    api.get<Attendance>(`/attendance/${id}`),

  /**
   * Get today's attendance
   */
  getToday: (branchId?: number) =>
    api.get<Attendance[]>('/attendance/today', branchId ? { branchId } : undefined),

  /**
   * Get attendance by employee
   */
  getByEmployee: (employeeId: number, params?: { dateFrom?: string; dateTo?: string }) =>
    api.get<Attendance[]>(`/attendance/employee/${employeeId}`, params as Record<string, unknown>),

  /**
   * Check in
   */
  checkIn: (data: CheckInOutRequest) =>
    api.post<Attendance>('/attendance/checkin', data),

  /**
   * Check out
   */
  checkOut: (data: CheckInOutRequest) =>
    api.post<Attendance>('/attendance/checkout', data),

  /**
   * Manual attendance entry
   */
  manualEntry: (data: AttendanceFormData) =>
    api.post<Attendance>('/attendance/manual', data),

  /**
   * Update attendance record
   */
  update: (id: number, data: Partial<AttendanceFormData>) =>
    api.put<Attendance>(`/attendance/${id}`, data),

  /**
   * Delete attendance record
   */
  delete: (id: number) =>
    api.delete<void>(`/attendance/${id}`),

  /**
   * Get attendance stats
   */
  getStats: (params?: { branchId?: number; date?: string }) =>
    api.get<AttendanceStats>('/attendance/stats', params as Record<string, unknown>),

  /**
   * Sync biometric devices
   */
  syncDevices: (branchId?: number) =>
    api.post<{ synced: number; errors: string[] }>('/attendance/sync', { branchId }),

  /**
   * Get daily attendance summary
   */
  getDailySummary: (date: string) =>
    api.get<AttendanceStats>(`/attendance/daily-summary/${date}`),

  /**
   * Export attendance report
   */
  exportReport: (filters?: AttendanceFilters) =>
    api.get<Blob>('/attendance/export', filters as Record<string, unknown>),
};

export type { AttendanceFilters, AttendanceListParams, CheckInOutRequest, AttendanceStats };
