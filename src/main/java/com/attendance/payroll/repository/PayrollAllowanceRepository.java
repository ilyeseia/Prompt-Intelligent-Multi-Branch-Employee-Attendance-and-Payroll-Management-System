package com.attendance.payroll.repository;

import com.attendance.payroll.entity.PayrollAllowance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for PayrollAllowance entity
 */
@Repository
public interface PayrollAllowanceRepository extends JpaRepository<PayrollAllowance, Long> {

    List<PayrollAllowance> findByPayrollRecordId(Long payrollRecordId);

    @Query("SELECT pa FROM PayrollAllowance pa WHERE pa.payrollRecord.employee.id = :employeeId AND pa.payrollRecord.payrollMonth BETWEEN :startDate AND :endDate")
    List<PayrollAllowance> findByEmployeeAndDateRange(@Param("employeeId") Long employeeId,
                                                    @Param("startDate") java.time.LocalDate startDate,
                                                    @Param("endDate") java.time.LocalDate endDate);

    @Query("SELECT SUM(pa.amount) FROM PayrollAllowance pa WHERE pa.payrollRecord.id = :payrollRecordId")
    Double sumAmountByPayrollRecord(@Param("payrollRecordId") Long payrollRecordId);

    List<PayrollAllowance> findByAllowanceType(PayrollAllowance.AllowanceType allowanceType);

    @Query("SELECT pa FROM PayrollAllowance pa WHERE pa.payrollRecord.branch.id = :branchId AND pa.payrollRecord.payrollMonth = :payrollMonth")
    List<PayrollAllowance> findByBranchAndMonth(@Param("branchId") Long branchId, @Param("payrollMonth") java.time.LocalDate payrollMonth);
}