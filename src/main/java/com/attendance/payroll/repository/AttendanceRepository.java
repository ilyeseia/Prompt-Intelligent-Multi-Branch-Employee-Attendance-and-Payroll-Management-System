package com.attendance.payroll.repository;

import com.attendance.payroll.entity.Attendance;
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
 * Repository interface for Attendance entity
 */
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeIdAndAttendanceDate(Long employeeId, LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate BETWEEN :startDate AND :endDate ORDER BY a.attendanceDate DESC")
    List<Attendance> findByEmployeeAndDateRange(@Param("employeeId") Long employeeId, 
                                              @Param("startDate") LocalDate startDate, 
                                              @Param("endDate") LocalDate endDate);

    @Query("SELECT a FROM Attendance a WHERE a.branch.id = :branchId AND a.attendanceDate = :attendanceDate ORDER BY a.employee.firstName")
    List<Attendance> findByBranchAndDate(@Param("branchId") Long branchId, @Param("attendanceDate") LocalDate attendanceDate);

    @Query("SELECT a FROM Attendance a WHERE a.attendanceDate BETWEEN :startDate AND :endDate AND a.status = :status ORDER BY a.attendanceDate DESC")
    List<Attendance> findByDateRangeAndStatus(@Param("startDate") LocalDate startDate, 
                                            @Param("endDate") LocalDate endDate, 
                                            @Param("status") Attendance.AttendanceStatus status);

    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate = :date")
    Optional<Attendance> findByEmployeeAndAttendanceDate(@Param("employeeId") Long employeeId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.employee.employeeId = :employeeId AND a.attendanceDate = :date")
    Optional<Attendance> findByEmployeeCodeAndDate(@Param("employeeId") String employeeId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.isFlaggedForReview = true AND a.isActive = true")
    List<Attendance> findFlaggedForReview();

    @Query("SELECT a FROM Attendance a WHERE a.branch.id = :branchId AND a.attendanceDate = :date AND a.status IN :statuses")
    List<Attendance> findByBranchAndDateAndStatus(@Param("branchId") Long branchId, 
                                                @Param("date") LocalDate date, 
                                                @Param("statuses") List<Attendance.AttendanceStatus> statuses);

    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate >= :sinceDate ORDER BY a.attendanceDate DESC")
    List<Attendance> findRecentAttendanceByEmployee(@Param("employeeId") Long employeeId, @Param("sinceDate") LocalDate sinceDate);

    @Query("SELECT a FROM Attendance a WHERE a.branch.id = :branchId AND a.attendanceDate BETWEEN :startDate AND :endDate AND a.status IN :presentStatuses")
    List<Attendance> findPresentAttendanceByBranchAndPeriod(@Param("branchId") Long branchId, 
                                                          @Param("startDate") LocalDate startDate, 
                                                          @Param("endDate") LocalDate endDate,
                                                          @Param("presentStatuses") List<Attendance.AttendanceStatus> presentStatuses);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate BETWEEN :startDate AND :endDate AND a.status IN :presentStatuses")
    long countPresentAttendanceByEmployee(@Param("employeeId") Long employeeId,
                                        @Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate,
                                        @Param("presentStatuses") List<Attendance.AttendanceStatus> presentStatuses);

    @Query("SELECT SUM(a.totalWorkingHours) FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate BETWEEN :startDate AND :endDate")
    Double sumWorkingHoursByEmployee(@Param("employeeId") Long employeeId,
                                   @Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate);

    @Query("SELECT SUM(a.overtimeHours) FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate BETWEEN :startDate AND :endDate")
    Double sumOvertimeHoursByEmployee(@Param("employeeId") Long employeeId,
                                    @Param("startDate") LocalDate startDate,
                                    @Param("endDate") LocalDate endDate);

    @Query("SELECT a FROM Attendance a WHERE a.attendanceDate = :date AND a.branch.id = :branchId AND (a.lateArrivalMinutes > 0 OR a.earlyDepartureMinutes > 0)")
    List<Attendance> findLateOrEarlyDepartures(@Param("date") LocalDate date, @Param("branchId") Long branchId);

    boolean existsByEmployeeIdAndAttendanceDate(Long employeeId, LocalDate date);

    @Query("SELECT a.attendanceDate FROM Attendance a WHERE a.employee.id = :employeeId AND a.attendanceDate BETWEEN :startDate AND :endDate ORDER BY a.attendanceDate")
    List<LocalDate> findAttendanceDatesByEmployee(@Param("employeeId") Long employeeId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}