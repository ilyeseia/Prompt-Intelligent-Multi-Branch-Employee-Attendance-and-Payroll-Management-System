package com.attendance.payroll.repository;

import com.attendance.payroll.entity.PayrollRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for PayrollRecord entity
 */
@Repository
public interface PayrollRepository extends JpaRepository<PayrollRecord, Long> {

    Optional<PayrollRecord> findByEmployeeIdAndPayrollMonth(Long employeeId, LocalDate payrollMonth);

    @Query("SELECT p FROM PayrollRecord p WHERE p.employee.id = :employeeId AND p.payrollMonth BETWEEN :startDate AND :endDate ORDER BY p.payrollMonth DESC")
    List<PayrollRecord> findByEmployeeAndDateRange(@Param("employeeId") Long employeeId, 
                                                 @Param("startDate") LocalDate startDate, 
                                                 @Param("endDate") LocalDate endDate);

    @Query("SELECT p FROM PayrollRecord p WHERE p.branch.id = :branchId AND p.payrollMonth = :payrollMonth")
    List<PayrollRecord> findByBranchAndMonth(@Param("branchId") Long branchId, @Param("payrollMonth") LocalDate payrollMonth);

    @Query("SELECT p FROM PayrollRecord p WHERE p.payrollMonth BETWEEN :startDate AND :endDate ORDER BY p.payrollMonth DESC, p.employee.firstName")
    List<PayrollRecord> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT p FROM PayrollRecord p WHERE p.status = :status AND p.payrollMonth = :payrollMonth")
    List<PayrollRecord> findByStatusAndMonth(@Param("status") PayrollRecord.PayrollStatus status, @Param("payrollMonth") LocalDate payrollMonth);

    @Query("SELECT p FROM PayrollRecord p WHERE p.employee.id = :employeeId AND p.status IN :statuses")
    List<PayrollRecord> findByEmployeeAndStatuses(@Param("employeeId") Long employeeId, @Param("statuses") List<PayrollRecord.PayrollStatus> statuses);

    @Query("SELECT p FROM PayrollRecord p WHERE p.isFlagged = true AND p.isActive = true")
    List<PayrollRecord> findFlaggedPayroll();

    @Query("SELECT p FROM PayrollRecord p WHERE p.branch.id = :branchId AND p.status = :status AND p.payrollMonth = :payrollMonth")
    List<PayrollRecord> findByBranchAndStatusAndMonth(@Param("branchId") Long branchId, 
                                                    @Param("status") PayrollRecord.PayrollStatus status, 
                                                    @Param("payrollMonth") LocalDate payrollMonth);

    @Query("SELECT SUM(p.netSalary) FROM PayrollRecord p WHERE p.payrollMonth BETWEEN :startDate AND :endDate AND p.status IN :processedStatuses")
    Double sumTotalNetSalary(@Param("startDate") LocalDate startDate, 
                           @Param("endDate") LocalDate endDate, 
                           @Param("processedStatuses") List<PayrollRecord.PayrollStatus> processedStatuses);

    @Query("SELECT SUM(p.overtimeAmount) FROM PayrollRecord p WHERE p.payrollMonth = :payrollMonth")
    Double sumTotalOvertimeAmount(@Param("payrollMonth") LocalDate payrollMonth);

    boolean existsByEmployeeIdAndPayrollMonth(Long employeeId, LocalDate payrollMonth);

    @Query("SELECT DISTINCT p.payrollMonth FROM PayrollRecord p WHERE p.branch.id = :branchId ORDER BY p.payrollMonth DESC")
    List<LocalDate> findProcessedMonthsByBranch(@Param("branchId") Long branchId);

    @Query("SELECT p FROM PayrollRecord p WHERE p.employee.id = :employeeId ORDER BY p.payrollMonth DESC")
    List<PayrollRecord> findByEmployeeOrderByMonthDesc(@Param("employeeId") Long employeeId);

    @Query("SELECT p FROM PayrollRecord p WHERE p.payrollMonth = :payrollMonth AND p.branch.id = :branchId AND p.status IN :reviewStatuses")
    List<PayrollRecord> findPendingReviewPayroll(@Param("payrollMonth") LocalDate payrollMonth, 
                                               @Param("branchId") Long branchId, 
                                               @Param("reviewStatuses") List<PayrollRecord.PayrollStatus> reviewStatuses);
}