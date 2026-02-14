package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Monthly payroll record for employees
 * Stores detailed payroll calculations and payment information
 */
@Entity
@Table(name = "payroll_records", indexes = {
    @Index(name = "idx_payroll_employee_month", columnList = "employee_id, payroll_month"),
    @Index(name = "idx_payroll_branch_month", columnList = "branch_id, payroll_month"),
    @Index(name = "idx_payroll_month", columnList = "payroll_month"),
    @Index(name = "idx_payroll_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
public class PayrollRecord extends BaseEntity {

    @NotNull(message = "Employee is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @NotNull(message = "Branch is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @NotNull(message = "Payroll month is required")
    @Column(name = "payroll_month", nullable = false)
    private LocalDate payrollMonth; // First day of the month

    @NotNull(message = "Working days is required")
    @Column(name = "working_days", nullable = false)
    private Integer workingDays = 22; // Standard working days per month

    @NotNull(message = "Present days is required")
    @Column(name = "present_days", nullable = false)
    private Integer presentDays = 0;

    @Column(name = "absent_days")
    private Integer absentDays = 0;

    @Column(name = "late_arrivals")
    private Integer lateArrivals = 0;

    @Column(name = "early_departures")
    private Integer earlyDepartures = 0;

    @Column(name = "overtime_hours", precision = 8, scale = 2)
    private BigDecimal overtimeHours = BigDecimal.ZERO;

    // Salary Components
    @NotNull(message = "Base salary is required")
    @Column(name = "base_salary", nullable = false, precision = 12, scale = 2)
    private BigDecimal baseSalary = BigDecimal.ZERO;

    @Column(name = "allowances", precision = 12, scale = 2)
    private BigDecimal allowances = BigDecimal.ZERO;

    @Column(name = "overtime_amount", precision = 12, scale = 2)
    private BigDecimal overtimeAmount = BigDecimal.ZERO;

    @Column(name = "bonus", precision = 12, scale = 2)
    private BigDecimal bonus = BigDecimal.ZERO;

    @Column(name = "commission", precision = 12, scale = 2)
    private BigDecimal commission = BigDecimal.ZERO;

    @Column(name = "gross_salary", precision = 12, scale = 2)
    private BigDecimal grossSalary = BigDecimal.ZERO;

    // Deductions
    @Column(name = "tax_deduction", precision = 12, scale = 2)
    private BigDecimal taxDeduction = BigDecimal.ZERO;

    @Column(name = "social_security_deduction", precision = 12, scale = 2)
    private BigDecimal socialSecurityDeduction = BigDecimal.ZERO;

    @Column(name = "health_insurance_deduction", precision = 12, scale = 2)
    private BigDecimal healthInsuranceDeduction = BigDecimal.ZERO;

    @Column(name = "pension_deduction", precision = 12, scale = 2)
    private BigDecimal pensionDeduction = BigDecimal.ZERO;

    @Column(name = "other_deductions", precision = 12, scale = 2)
    private BigDecimal otherDeductions = BigDecimal.ZERO;

    @Column(name = "total_deductions", precision = 12, scale = 2)
    private BigDecimal totalDeductions = BigDecimal.ZERO;

    @Column(name = "net_salary", precision = 12, scale = 2)
    private BigDecimal netSalary = BigDecimal.ZERO;

    @NotNull(message = "Payroll status is required")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private PayrollStatus status = PayrollStatus.DRAFT;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.BANK_TRANSFER;

    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "reference_number")
    private String referenceNumber;

    // AI and Analytics
    @Column(name = "ai_calculated_ot")
    private Boolean aiCalculatedOvertime = false;

    @Column(name = "anomaly_score")
    private Double anomalyScore = 0.0;

    @Column(name = "is_flagged")
    private Boolean isFlagged = false;

    @Column(name = "flag_reason")
    private String flagReason;

    // Approval and Authorization
    @Column(name = "calculated_by")
    private String calculatedBy;

    @Column(name = "calculated_at")
    private LocalDateTime calculatedAt;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(name = "processed_by")
    private String processedBy;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    // Notes and comments
    @Column(name = "calculation_notes")
    private String calculationNotes;

    @Column(name = "corrections", type = "json")
    private String corrections;

    // Children records for detailed breakdown
    @OneToMany(mappedBy = "payrollRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PayrollAllowance> allowances = new ArrayList<>();

    @OneToMany(mappedBy = "payrollRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PayrollDeduction> deductions = new ArrayList<>();

    public enum PayrollStatus {
        DRAFT, CALCULATED, REVIEWED, APPROVED, PROCESSED, PAID, CANCELLED
    }

    public enum PaymentMethod {
        BANK_TRANSFER, CASH, CHECK, MOBILE_PAYMENT, OTHER
    }

    // Helper methods
    public boolean isProcessed() {
        return status == PayrollStatus.PROCESSED || status == PayrollStatus.PAID;
    }

    public boolean isPending() {
        return status == PayrollStatus.DRAFT || status == PayrollStatus.CALCULATED;
    }

    public BigDecimal calculateGrossSalary() {
        BigDecimal gross = baseSalary.add(allowances).add(overtimeAmount).add(bonus).add(commission);
        this.grossSalary = gross;
        return gross;
    }

    public BigDecimal calculateTotalDeductions() {
        BigDecimal total = taxDeduction.add(socialSecurityDeduction)
                .add(healthInsuranceDeduction).add(pensionDeduction).add(otherDeductions);
        this.totalDeductions = total;
        return total;
    }

    public BigDecimal calculateNetSalary() {
        BigDecimal gross = calculateGrossSalary();
        BigDecimal deductions = calculateTotalDeductions();
        BigDecimal net = gross.subtract(deductions);
        this.netSalary = net;
        return net;
    }

    public double getAttendancePercentage() {
        if (workingDays == 0) return 0.0;
        return (double) presentDays / workingDays * 100;
    }

    public int getWorkingDaysForMonth() {
        return workingDays != null ? workingDays : 22;
    }
}