// ============================================
// PAYROLL MANAGEMENT SYSTEM - TYPESCRIPT TYPES
// Based on Java Spring Boot entities
// ============================================

// Enums
export type Department = 
  | 'IT' 
  | 'HR' 
  | 'FINANCE' 
  | 'MARKETING' 
  | 'SALES' 
  | 'OPERATIONS' 
  | 'LEGAL' 
  | 'ADMINISTRATION' 
  | 'SECURITY' 
  | 'QUALITY_ASSURANCE';

export type EmployeeStatus = 
  | 'ACTIVE' 
  | 'INACTIVE' 
  | 'TERMINATED' 
  | 'ON_LEAVE' 
  | 'SUSPENDED' 
  | 'PENDING_APPROVAL';

export type WorkScheduleType = 
  | 'FULL_TIME' 
  | 'PART_TIME' 
  | 'CONTRACT' 
  | 'TEMPORARY' 
  | 'SHIFT_WORK';

export type AttendanceStatus = 
  | 'PRESENT' 
  | 'ABSENT' 
  | 'LATE' 
  | 'HALF_DAY' 
  | 'WEEKEND' 
  | 'HOLIDAY' 
  | 'LEAVE';

export type AttendanceType = 
  | 'REGULAR' 
  | 'OVERTIME' 
  | 'EMERGENCY' 
  | 'WORK_FROM_HOME' 
  | 'BUSINESS_TRIP';

export type BiometricMethod = 
  | 'FINGERPRINT' 
  | 'FACE_RECOGNITION' 
  | 'CARD' 
  | 'PIN' 
  | 'MANUAL';

export type LeaveType = 
  | 'ANNUAL' 
  | 'SICK' 
  | 'MATERNITY' 
  | 'PATERNITY' 
  | 'EMERGENCY' 
  | 'UNPAID' 
  | 'COMPENSATORY';

export type BranchStatus = 
  | 'ACTIVE' 
  | 'INACTIVE' 
  | 'MAINTENANCE' 
  | 'SUSPENDED';

export type PayrollStatus = 
  | 'DRAFT' 
  | 'CALCULATED' 
  | 'REVIEWED' 
  | 'APPROVED' 
  | 'PROCESSED' 
  | 'PAID' 
  | 'CANCELLED';

export type PaymentMethod = 
  | 'BANK_TRANSFER' 
  | 'CASH' 
  | 'CHECK' 
  | 'MOBILE_PAYMENT' 
  | 'OTHER';

// Entities
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  isActive: boolean;
}

export interface Branch extends Omit<BaseEntity, 'id'> {
  id: number;
  branchId: string;
  name: string;
  location?: string;
  timezone: string;
  status: BranchStatus;
  address?: string;
  phone?: string;
  email?: string;
  managerName?: string;
  maxCapacity?: number;
  workingHoursStart: string;
  workingHoursEnd: string;
  employeeCount?: number;
}

export interface Employee extends Omit<BaseEntity, 'id'> {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  department: Department;
  position: string;
  status: EmployeeStatus;
  branchId: number;
  branch?: Branch;
  managerId?: number;
  supervisorId?: number;
  workScheduleType: WorkScheduleType;
  shiftStartTime: string;
  shiftEndTime: string;
  workingDaysPerWeek: number;
  workingDays: string[];
  biometricId?: string;
  address?: string;
  city?: string;
  country: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  nationalId?: string;
  profilePicture?: string;
  annualLeaveBalance: number;
  sickLeaveBalance: number;
  aiRiskScore: number;
}

export interface Attendance extends Omit<BaseEntity, 'id'> {
  id: number;
  employeeId: number;
  employee?: Employee;
  branchId: number;
  branch?: Branch;
  attendanceDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  breakStartTime?: string;
  breakEndTime?: string;
  totalWorkingHours: number;
  totalBreakHours: number;
  overtimeHours: number;
  status: AttendanceStatus;
  attendanceType: AttendanceType;
  lateArrivalMinutes: number;
  earlyDepartureMinutes: number;
  checkInDeviceId?: string;
  checkOutDeviceId?: string;
  biometricVerificationMethod?: BiometricMethod;
  verificationScore?: number;
  leaveType?: LeaveType;
  leaveReason?: string;
  approvedBy?: string;
  checkInLatitude?: number;
  checkInLongitude?: number;
  checkOutLatitude?: number;
  checkOutLongitude?: number;
  aiAnomalyScore: number;
  isFlaggedForReview: boolean;
  flagReason?: string;
  manualOverride: boolean;
  manualOverrideBy?: string;
  manualOverrideReason?: string;
  notes?: string;
}

export interface PayrollRecord extends Omit<BaseEntity, 'id'> {
  id: number;
  employeeId: number;
  employee?: Employee;
  branchId: number;
  branch?: Branch;
  payrollMonth: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  lateArrivals: number;
  earlyDepartures: number;
  overtimeHours: number;
  baseSalary: number;
  allowances: number;
  overtimeAmount: number;
  bonus: number;
  commission: number;
  grossSalary: number;
  taxDeduction: number;
  socialSecurityDeduction: number;
  healthInsuranceDeduction: number;
  pensionDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  status: PayrollStatus;
  paymentDate?: string;
  paymentMethod: PaymentMethod;
  bankAccountNumber?: string;
  bankName?: string;
  referenceNumber?: string;
  aiCalculatedOvertime: boolean;
  anomalyScore: number;
  isFlagged: boolean;
  flagReason?: string;
  calculatedBy?: string;
  calculatedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  processedBy?: string;
  processedAt?: string;
  calculationNotes?: string;
}

export interface PayrollAllowance extends Omit<BaseEntity, 'id'> {
  id: number;
  payrollRecordId: number;
  name: string;
  amount: number;
  type: string;
  isRecurring: boolean;
  description?: string;
}

export interface PayrollDeduction extends Omit<BaseEntity, 'id'> {
  id: number;
  payrollRecordId: number;
  name: string;
  amount: number;
  type: string;
  isRecurring: boolean;
  description?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeave: number;
  totalBranches: number;
  activeBranches: number;
  monthlyPayroll: number;
  pendingPayrolls: number;
  attendanceRate: number;
  averageWorkingHours: number;
}

export interface BranchStats {
  branchId: number;
  branchName: string;
  employeeCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
}

export interface DailyAttendance {
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Form types
export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  department: Department;
  position: string;
  branchId: number;
  workScheduleType: WorkScheduleType;
  shiftStartTime: string;
  shiftEndTime: string;
  address?: string;
  city?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  nationalId?: string;
}

export interface AttendanceFormData {
  employeeId: number;
  attendanceDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceStatus;
  attendanceType: AttendanceType;
  leaveType?: LeaveType;
  leaveReason?: string;
  notes?: string;
}

export interface PayrollFormData {
  employeeId: number;
  payrollMonth: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  overtimeHours: number;
  bonus?: number;
  commission?: number;
  otherDeductions?: number;
  calculationNotes?: string;
}
