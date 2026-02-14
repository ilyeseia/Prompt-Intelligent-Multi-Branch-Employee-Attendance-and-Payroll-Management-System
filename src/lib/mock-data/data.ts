// ============================================
// MOCK DATA FOR PAYROLL MANAGEMENT SYSTEM
// ============================================

import { 
  Branch, 
  Employee, 
  Attendance, 
  PayrollRecord,
  DashboardStats,
  BranchStats,
  DailyAttendance
} from '@/types/payroll';

// Branches across Algeria
export const branches: Branch[] = [
  {
    id: 1,
    branchId: 'ALG',
    name: 'Algiers Headquarters',
    location: 'Algiers, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '123 Didouche Mourad Street, Algiers 16000',
    phone: '+213 21 123 456',
    email: 'algiers@company.dz',
    managerName: 'Ahmed Benali',
    maxCapacity: 500,
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    employeeCount: 145,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  },
  {
    id: 2,
    branchId: 'ORN',
    name: 'Oran Branch',
    location: 'Oran, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '45 Boulevard Maata Mohamed El Habib, Oran 31000',
    phone: '+213 41 234 567',
    email: 'oran@company.dz',
    managerName: 'Fatima Zohra',
    maxCapacity: 200,
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    employeeCount: 78,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  },
  {
    id: 3,
    branchId: 'SET',
    name: 'Setif Branch',
    location: 'Setif, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '78 Rue de l\'Independance, Setif 19000',
    phone: '+213 36 345 678',
    email: 'setif@company.dz',
    managerName: 'Mohamed Khaled',
    maxCapacity: 150,
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    employeeCount: 52,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  },
  {
    id: 4,
    branchId: 'ANN',
    name: 'Annaba Branch',
    location: 'Annaba, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '12 Avenue de la Republique, Annaba 23000',
    phone: '+213 38 456 789',
    email: 'annaba@company.dz',
    managerName: 'Samira Hadj',
    maxCapacity: 100,
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    employeeCount: 35,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  },
  {
    id: 5,
    branchId: 'TAM',
    name: 'Tamanrasset Branch',
    location: 'Tamanrasset, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '34 Rue du Sahara, Tamanrasset 11000',
    phone: '+213 29 567 890',
    email: 'tamanrasset@company.dz',
    managerName: 'Youcef Amokrane',
    maxCapacity: 80,
    workingHoursStart: '07:00',
    workingHoursEnd: '16:00',
    employeeCount: 25,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  },
  {
    id: 6,
    branchId: 'TND',
    name: 'Tindouf Branch',
    location: 'Tindouf, Algeria',
    timezone: 'Africa/Algiers',
    status: 'ACTIVE',
    address: '56 Avenue des Oasis, Tindouf 37000',
    phone: '+213 49 678 901',
    email: 'tindouf@company.dz',
    managerName: 'Amina Belkaid',
    maxCapacity: 50,
    workingHoursStart: '07:00',
    workingHoursEnd: '16:00',
    employeeCount: 18,
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  }
];

// Generate employees
const firstNames = ['Ahmed', 'Mohamed', 'Karim', 'Youssef', 'Amine', 'Sofiane', 'Nabil', 'Farid', 'Riad', 'Bilal', 
  'Fatima', 'Amina', 'Samira', 'Nadia', 'Linda', 'Sarah', 'Meriem', 'Wassila', 'Houda', 'Yasmine'];
const lastNames = ['Benali', 'Hadj', 'Amokrane', 'Belkaid', 'Zerhouni', 'Bouazza', 'Khalidi', 'Mansouri', 'Boudiaf', 'Djaballah',
  'Cherif', 'Messaoudi', 'Boumendjel', 'Benyahia', 'Hamidi', 'Lounis', 'Taleb', 'Benslimane', 'Khelifi', 'Ait'];

const departments: Array<'IT' | 'HR' | 'FINANCE' | 'MARKETING' | 'SALES' | 'OPERATIONS' | 'LEGAL' | 'ADMINISTRATION' | 'SECURITY' | 'QUALITY_ASSURANCE'> = 
  ['IT', 'HR', 'FINANCE', 'MARKETING', 'SALES', 'OPERATIONS', 'LEGAL', 'ADMINISTRATION', 'SECURITY', 'QUALITY_ASSURANCE'];

const positions: Record<string, string[]> = {
  'IT': ['Software Engineer', 'Senior Developer', 'DevOps Engineer', 'System Administrator', 'IT Manager'],
  'HR': ['HR Specialist', 'Recruiter', 'HR Manager', 'Training Coordinator', 'Payroll Specialist'],
  'FINANCE': ['Accountant', 'Financial Analyst', 'Finance Manager', 'Auditor', 'Budget Analyst'],
  'MARKETING': ['Marketing Specialist', 'Content Creator', 'Marketing Manager', 'Brand Manager', 'SEO Specialist'],
  'SALES': ['Sales Representative', 'Account Manager', 'Sales Manager', 'Business Developer', 'Sales Director'],
  'OPERATIONS': ['Operations Manager', 'Logistics Coordinator', 'Supply Chain Analyst', 'Quality Inspector', 'Project Manager'],
  'LEGAL': ['Legal Advisor', 'Compliance Officer', 'Legal Manager', 'Contract Specialist', 'Corporate Lawyer'],
  'ADMINISTRATION': ['Administrative Assistant', 'Office Manager', 'Executive Secretary', 'Receptionist', 'Admin Manager'],
  'SECURITY': ['Security Officer', 'Security Supervisor', 'Security Manager', 'Access Control Specialist', 'Safety Coordinator'],
  'QUALITY_ASSURANCE': ['QA Engineer', 'QA Lead', 'QA Manager', 'Test Analyst', 'Quality Manager']
};

function generateEmployee(id: number): Employee {
  const branch = branches[Math.floor(Math.random() * branches.length)];
  const department = departments[Math.floor(Math.random() * departments.length)];
  const positionList = positions[department];
  const position = positionList[Math.floor(Math.random() * positionList.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  const hireYear = 2018 + Math.floor(Math.random() * 6);
  const hireMonth = 1 + Math.floor(Math.random() * 12);
  const hireDay = 1 + Math.floor(Math.random() * 28);
  
  const birthYear = 1975 + Math.floor(Math.random() * 25);
  const birthMonth = 1 + Math.floor(Math.random() * 12);
  const birthDay = 1 + Math.floor(Math.random() * 28);

  return {
    id,
    employeeId: `EMP${String(id).padStart(5, '0')}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.dz`,
    phone: `+213 5${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`,
    dateOfBirth: `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`,
    hireDate: `${hireYear}-${String(hireMonth).padStart(2, '0')}-${String(hireDay).padStart(2, '0')}`,
    department,
    position,
    status: Math.random() > 0.1 ? 'ACTIVE' : ['ON_LEAVE', 'INACTIVE', 'TERMINATED'][Math.floor(Math.random() * 3)] as Employee['status'],
    branchId: branch.id,
    branch,
    workScheduleType: Math.random() > 0.2 ? 'FULL_TIME' : ['PART_TIME', 'CONTRACT'][Math.floor(Math.random() * 2)] as Employee['workScheduleType'],
    shiftStartTime: '08:00',
    shiftEndTime: '17:00',
    workingDaysPerWeek: 5,
    workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    biometricId: `BIO${String(id).padStart(6, '0')}`,
    address: `${Math.floor(Math.random() * 200) + 1} Street, ${branch.location?.split(',')[0] || 'Algiers'}`,
    city: branch.location?.split(',')[0] || 'Algiers',
    country: 'Algeria',
    emergencyContactName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`,
    emergencyContactPhone: `+213 5${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`,
    nationalId: `${String(Math.floor(Math.random() * 99999999)).padStart(8, '0')}`,
    profilePicture: undefined,
    annualLeaveBalance: 21 - Math.floor(Math.random() * 10),
    sickLeaveBalance: 10 - Math.floor(Math.random() * 5),
    aiRiskScore: Math.random() * 0.3,
    createdAt: `${hireYear}-${String(hireMonth).padStart(2, '0')}-${String(hireDay).padStart(2, '0')}T00:00:00Z`,
    updatedAt: '2024-12-01T00:00:00Z',
    isActive: true
  };
}

export const employees: Employee[] = Array.from({ length: 353 }, (_, i) => generateEmployee(i + 1));

// Generate today's attendance
function generateTodayAttendance(): Attendance[] {
  const today = new Date().toISOString().split('T')[0];
  const activeEmployees = employees.filter(e => e.status === 'ACTIVE');
  
  return activeEmployees.slice(0, 50).map((emp, index) => {
    const statusRand = Math.random();
    let status: Attendance['status'];
    let checkInTime: string | undefined;
    let checkOutTime: string | undefined;
    let lateArrivalMinutes = 0;
    
    if (statusRand > 0.85) {
      status = 'ABSENT';
    } else if (statusRand > 0.75) {
      status = 'LATE';
      const lateMinutes = Math.floor(Math.random() * 45) + 5;
      lateArrivalMinutes = lateMinutes;
      checkInTime = `${today}T0${8 + Math.floor(lateMinutes / 60)}:${String((30 + lateMinutes) % 60).padStart(2, '0')}:00`;
    } else if (statusRand > 0.7) {
      status = 'LEAVE';
    } else {
      status = 'PRESENT';
      const checkInHour = Math.random() > 0.7 ? 7 : 8;
      const checkInMin = Math.floor(Math.random() * 30);
      checkInTime = `${today}T0${checkInHour}:${String(checkInMin).padStart(2, '0')}:00`;
      if (Math.random() > 0.5) {
        checkOutTime = `${today}T17:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}:00`;
      }
    }
    
    return {
      id: index + 1,
      employeeId: emp.id,
      employee: emp,
      branchId: emp.branchId,
      branch: emp.branch,
      attendanceDate: today,
      checkInTime,
      checkOutTime,
      totalWorkingHours: checkInTime && checkOutTime ? 8 : 0,
      totalBreakHours: 1,
      overtimeHours: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
      status: status as Attendance['status'],
      attendanceType: 'REGULAR',
      lateArrivalMinutes,
      earlyDepartureMinutes: 0,
      biometricVerificationMethod: Math.random() > 0.3 ? 'FINGERPRINT' : 'FACE_RECOGNITION',
      verificationScore: 0.95 + Math.random() * 0.05,
      aiAnomalyScore: Math.random() * 0.2,
      isFlaggedForReview: false,
      manualOverride: false,
      createdAt: `${today}T00:00:00Z`,
      updatedAt: `${today}T00:00:00Z`,
      isActive: true
    };
  });
}

export const todayAttendance = generateTodayAttendance();

// Generate payroll records
function generatePayrollRecords(): PayrollRecord[] {
  const records: PayrollRecord[] = [];
  const activeEmployees = employees.filter(e => e.status === 'ACTIVE').slice(0, 50);
  const currentMonth = new Date().toISOString().slice(0, 7) + '-01';
  
  activeEmployees.forEach((emp, index) => {
    const baseSalary = 45000 + Math.floor(Math.random() * 55000);
    const allowances = Math.floor(Math.random() * 15000);
    const overtimeHours = Math.floor(Math.random() * 20);
    const overtimeAmount = overtimeHours * (baseSalary / 176) * 1.5;
    const bonus = Math.random() > 0.8 ? Math.floor(Math.random() * 10000) : 0;
    
    const grossSalary = baseSalary + allowances + overtimeAmount + bonus;
    const taxDeduction = grossSalary * 0.05;
    const socialSecurityDeduction = grossSalary * 0.09;
    const healthInsuranceDeduction = grossSalary * 0.02;
    const pensionDeduction = grossSalary * 0.04;
    const totalDeductions = taxDeduction + socialSecurityDeduction + healthInsuranceDeduction + pensionDeduction;
    const netSalary = grossSalary - totalDeductions;
    
    records.push({
      id: index + 1,
      employeeId: emp.id,
      employee: emp,
      branchId: emp.branchId,
      branch: emp.branch,
      payrollMonth: currentMonth,
      workingDays: 22,
      presentDays: 20 + Math.floor(Math.random() * 2),
      absentDays: Math.floor(Math.random() * 2),
      lateArrivals: Math.floor(Math.random() * 4),
      earlyDepartures: Math.floor(Math.random() * 2),
      overtimeHours,
      baseSalary,
      allowances,
      overtimeAmount,
      bonus,
      commission: 0,
      grossSalary,
      taxDeduction,
      socialSecurityDeduction,
      healthInsuranceDeduction,
      pensionDeduction,
      otherDeductions: 0,
      totalDeductions,
      netSalary,
      status: ['DRAFT', 'CALCULATED', 'APPROVED', 'PAID'][Math.floor(Math.random() * 4)] as PayrollRecord['status'],
      paymentMethod: 'BANK_TRANSFER',
      bankName: 'BNA (Banque Nationale d\'Algérie)',
      aiCalculatedOvertime: true,
      anomalyScore: Math.random() * 0.15,
      isFlagged: false,
      createdAt: currentMonth + 'T00:00:00Z',
      updatedAt: currentMonth + 'T00:00:00Z',
      isActive: true
    });
  });
  
  return records;
}

export const payrollRecords = generatePayrollRecords();

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalEmployees: employees.length,
  activeEmployees: employees.filter(e => e.status === 'ACTIVE').length,
  presentToday: todayAttendance.filter(a => a.status === 'PRESENT').length,
  absentToday: todayAttendance.filter(a => a.status === 'ABSENT').length,
  lateToday: todayAttendance.filter(a => a.status === 'LATE').length,
  onLeave: todayAttendance.filter(a => a.status === 'LEAVE').length,
  totalBranches: branches.length,
  activeBranches: branches.filter(b => b.status === 'ACTIVE').length,
  monthlyPayroll: payrollRecords.reduce((sum, r) => sum + r.netSalary, 0),
  pendingPayrolls: payrollRecords.filter(r => r.status === 'DRAFT' || r.status === 'CALCULATED').length,
  attendanceRate: 92.5,
  averageWorkingHours: 7.8
};

// Branch stats
export const branchStats: BranchStats[] = branches.map(branch => {
  const branchEmployees = todayAttendance.filter(a => a.branchId === branch.id);
  return {
    branchId: branch.id,
    branchName: branch.name,
    employeeCount: branch.employeeCount || 0,
    presentCount: branchEmployees.filter(a => a.status === 'PRESENT').length,
    absentCount: branchEmployees.filter(a => a.status === 'ABSENT').length,
    lateCount: branchEmployees.filter(a => a.status === 'LATE').length,
    attendanceRate: branchEmployees.length > 0 
      ? (branchEmployees.filter(a => a.status === 'PRESENT').length / branchEmployees.length) * 100 
      : 95 + Math.random() * 5
  };
});

// Daily attendance for the past 7 days
export const dailyAttendance: DailyAttendance[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const dateStr = date.toISOString().split('T')[0];
  
  return {
    date: dateStr,
    present: 280 + Math.floor(Math.random() * 40),
    absent: 15 + Math.floor(Math.random() * 20),
    late: 8 + Math.floor(Math.random() * 15),
    onLeave: 10 + Math.floor(Math.random() * 10)
  };
}).reverse();
