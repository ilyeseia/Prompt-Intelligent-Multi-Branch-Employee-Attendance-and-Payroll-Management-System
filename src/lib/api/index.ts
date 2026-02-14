// ============================================
// API Services Index - Frontend Development Guidelines
// ============================================

export { api, setAuthToken, getAuthToken, ApiRequestError } from './client';
export type { PaginatedResponse, RequestOptions } from './client';

export { employeesApi } from './employees';
export type { EmployeeFilters, EmployeeListParams } from './employees';

export { attendanceApi } from './attendance';
export type { 
  AttendanceFilters, 
  AttendanceListParams, 
  CheckInOutRequest, 
  AttendanceStats 
} from './attendance';

export { payrollApi } from './payroll';
export type { 
  PayrollFilters, 
  PayrollListParams, 
  PayrollCalculationRequest, 
  PayrollBatchRequest,
  PayrollSummary,
  PayrollStats 
} from './payroll';
