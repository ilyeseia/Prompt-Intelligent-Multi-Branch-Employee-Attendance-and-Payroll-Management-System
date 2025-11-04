package com.attendance.payroll.repository;

import com.attendance.payroll.entity.PayrollDeduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for PayrollDeduction entity
 */
@Repository
public interface PayrollDeductionRepository extends JpaRepository<PayrollDeduction, Long> {

    List<PayrollDeduction> findByPayrollRecordId(Long payrollRecordId);

    @Query("SELECT pd FROM PayrollDeduction pd WHERE pd.payrollRecord.employee.id = :employeeId AND pd.payrollRecord.payrollMonth BETWEEN :startDate AND :endDate")
    List<PayrollDeduction> findByEmployeeAndDateRange(@Param("employeeId") Long employeeId,
                                                    @Param("startDate") java.time.LocalDate startDate,
                                                    @Param("endDate") java.time.LocalDate endDate);

    @Query("SELECT SUM(pd.amount) FROM PayrollDeduction pd WHERE pd.payrollRecord.id = :payrollRecordId")
    Double sumAmountByPayrollRecord(@Param("payrollRecordId") Long payrollRecordId);

    List<PayrollDeduction> findByDeductionType(PayrollDeduction.DeductionType deductionType);

    @Query("SELECT pd FROM PayrollDeduction pd WHERE pd.payrollRecord.branch.id = :branchId AND pd.payrollRecord.payrollMonth = :payrollMonth")
    List<PayrollDeduction> findByBranchAndMonth(@Param("branchId") Long branchId, @Param("payrollMonth") java.time.LocalDate payrollMonth);

    @Query("SELECT pd FROM PayrollDeduction pd WHERE pd.payrollRecord.status = 'PROCESSED' AND pd.payrollRecord.payrollMonth = :payrollMonth")
    List<PayrollDeduction> findProcessedDeductionsByMonth(@Param("payrollMonth") java.time.LocalDate payrollMonth);
}