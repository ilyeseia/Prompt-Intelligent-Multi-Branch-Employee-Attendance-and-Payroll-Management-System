package com.attendance.payroll.repository;

import com.attendance.payroll.entity.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Branch entity
 */
@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

    Optional<Branch> findByBranchIdAndIsActiveTrue(String branchId);

    List<Branch> findByStatusOrderByName(Branch.BranchStatus status);

    List<Branch> findByIsActiveTrueOrderByName();

    @Query("SELECT b FROM Branch b WHERE b.isActive = true AND b.status = 'ACTIVE'")
    List<Branch> findActiveBranches();

    @Query("SELECT b FROM Branch b WHERE b.isActive = true AND " +
           "(LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Branch> findBySearchTerm(@Param("searchTerm") String searchTerm, Pageable pageable);

    boolean existsByBranchId(String branchId);

    boolean existsByNameAndIsActiveTrue(String name);

    @Query("SELECT b FROM Branch b WHERE b.managerName = :managerName AND b.isActive = true")
    List<Branch> findByManagerName(@Param("managerName") String managerName);
}