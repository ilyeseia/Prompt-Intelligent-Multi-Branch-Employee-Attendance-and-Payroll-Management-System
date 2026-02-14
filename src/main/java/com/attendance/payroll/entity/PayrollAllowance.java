package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * Detailed payroll allowances for employees
 */
@Entity
@Table(name = "payroll_allowances")
@Data
@EqualsAndHashCode(callSuper = true)
public class PayrollAllowance extends BaseEntity {

    @NotNull(message = "Payroll record is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payroll_record_id", nullable = false)
    private PayrollRecord payrollRecord;

    @NotBlank(message = "Allowance name is required")
    @Size(max = 100, message = "Allowance name must not exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Amount is required")
    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount = BigDecimal.ZERO;

    @Column(name = "is_taxable")
    private Boolean isTaxable = true;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "description")
    private String description;

    @Column(name = "allowance_type")
    @Enumerated(EnumType.STRING)
    private AllowanceType allowanceType = AllowanceType.FIXED;

    public enum AllowanceType {
        FIXED, PERCENTAGE, CONDITIONAL, ONE_TIME
    }
}