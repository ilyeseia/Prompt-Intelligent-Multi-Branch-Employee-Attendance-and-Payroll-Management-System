package com.attendance.payroll.repository;

import com.attendance.payroll.entity.Employee;
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
 * Repository interface for Employee entity
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeIdAndIsActiveTrue(String employeeId);

    Optional<Employee> findByEmailAndIsActiveTrue(String email);

    List<Employee> findByBranchIdAndIsActiveTrue(Long branchId);

    List<Employee> findByStatusAndIsActiveTrue(Employee.EmployeeStatus status);

    @Query("SELECT e FROM Employee e WHERE e.branch.id = :branchId AND e.status = 'ACTIVE' AND e.isActive = true")
    List<Employee> findActiveEmployeesByBranch(@Param("branchId") Long branchId);

    @Query("SELECT e FROM Employee e WHERE e.isActive = true AND " +
           "(LOWER(e.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.employeeId) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Employee> findBySearchTerm(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE e.department = :department AND e.status = 'ACTIVE' AND e.isActive = true")
    List<Employee> findByDepartmentAndStatus(@Param("department") Employee.Department department);

    @Query("SELECT e FROM Employee e WHERE e.branch.id = :branchId AND e.position = :position AND e.status = 'ACTIVE'")
    List<Employee> findByBranchAndPosition(@Param("branchId") Long branchId, @Param("position") String position);

    boolean existsByEmployeeId(String employeeId);

    boolean existsByEmail(String email);

    @Query("SELECT e FROM Employee e WHERE e.hireDate BETWEEN :startDate AND :endDate AND e.isActive = true")
    List<Employee> findByHireDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT e FROM Employee e WHERE e.branch.id = :branchId AND e.hireDate >= :sinceDate AND e.status = 'ACTIVE'")
    List<Employee> findRecentHiresByBranch(@Param("branchId") Long branchId, @Param("sinceDate") LocalDate sinceDate);

    @Query("SELECT e FROM Employee e WHERE e.branch.id = :branchId AND " +
           "MONTH(e.hireDate) = :month AND YEAR(e.hireDate) = :year")
    List<Employee> findAnniversaryByMonthAndYear(@Param("branchId") Long branchId, @Param("month") int month, @Param("year") int year);

    @Query("SELECT e FROM Employee e WHERE e.branch.id = :branchId AND " +
           "MONTH(e.dateOfBirth) = :month")
    List<Employee> findBirthdaysByMonth(@Param("branchId") Long branchId, @Param("month") int month);

    long countByBranchIdAndStatus(Long branchId, Employee.EmployeeStatus status);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.department = :department AND e.status = 'ACTIVE'")
    long countByDepartment(@Param("department") Employee.Department department);
}