package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * Detailed payroll deductions for employees
 */
@Entity
@Table(name = "payroll_deductions")
@Data
@EqualsAndHashCode(callSuper = true)
public class PayrollDeduction extends BaseEntity {

    @NotNull(message = "Payroll record is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payroll_record_id", nullable = false)
    private PayrollRecord payrollRecord;

    @NotBlank(message = "Deduction name is required")
    @Size(max = 100, message = "Deduction name must not exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Amount is required")
    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount = BigDecimal.ZERO;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "description")
    private String description;

    @Column(name = "deduction_type")
    @Enumerated(EnumType.STRING)
    private DeductionType deductionType = DeductionType.MANDATORY;

    @Column(name = "is_pre_tax")
    private Boolean isPreTax = false;

    @Column(name = "is_reimbursable")
    private Boolean isReimbursable = false;

    public enum DeductionType {
        MANDATORY, VOLUNTARY, LOAN, ADVANCE, TAX, INSURANCE
    }
}