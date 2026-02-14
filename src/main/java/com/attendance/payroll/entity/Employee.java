package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Employee entity representing all company employees across all branches
 */
@Entity
@Table(name = "employees", indexes = {
    @Index(name = "idx_employee_email", columnList = "email"),
    @Index(name = "idx_employee_branch", columnList = "branch_id"),
    @Index(name = "idx_employee_employee_id", columnList = "employee_id"),
    @Index(name = "idx_employee_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Where(clause = "deleted_at IS NULL")
public class Employee extends BaseEntity {

    @NotBlank(message = "Employee ID is required")
    @Size(max = 20, message = "Employee ID must not exceed 20 characters")
    @Column(name = "employee_id", unique = true, nullable = false)
    private String employeeId;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(name = "phone")
    private String phone;

    @NotNull(message = "Date of birth is required")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull(message = "Hire date is required")
    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @NotNull(message = "Department is required")
    @Column(name = "department", nullable = false)
    @Enumerated(EnumType.STRING)
    private Department department;

    @NotNull(message = "Position is required")
    @Column(name = "position", nullable = false)
    private String position;

    @NotNull(message = "Employment status is required")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EmployeeStatus status = EmployeeStatus.ACTIVE;

    @NotNull(message = "Branch is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "supervisor_id")
    private Long supervisorId;

    // Work Schedule Information
    @Column(name = "work_schedule_type")
    @Enumerated(EnumType.STRING)
    private WorkScheduleType workScheduleType = WorkScheduleType.FULL_TIME;

    @Column(name = "shift_start_time")
    private String shiftStartTime = "09:00";

    @Column(name = "shift_end_time")
    private String shiftEndTime = "17:00";

    @Column(name = "working_days_per_week")
    private Integer workingDaysPerWeek = 5;

    @ElementCollection
    @CollectionTable(name = "employee_working_days", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "working_day")
    private List<String> workingDays = Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY");

    // Biometric Information
    @Column(name = "biometric_id")
    private String biometricId;

    @Column(name = "fingerprint_data", columnDefinition = "TEXT")
    private String fingerprintData;

    @Column(name = "face_data", columnDefinition = "TEXT")
    private String faceData;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "pin_code")
    private String pinCode;

    // Address Information
    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state_province")
    private String stateProvince;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "country")
    private String country = "Algeria";

    // Emergency Contact
    @Column(name = "emergency_contact_name")
    private String emergencyContactName;

    @Column(name = "emergency_contact_phone")
    private String emergencyContactPhone;

    @Column(name = "emergency_contact_relationship")
    private String emergencyContactRelationship;

    // Additional Information
    @Column(name = "national_id")
    private String nationalId;

    @Column(name = "passport_number")
    private String passportNumber;

    @Column(name = "nationality")
    private String nationality = "Algerian";

    @Column(name = "profile_picture")
    private String profilePicture;

    // Performance and Attendance Metrics
    @Column(name = "annual_leave_balance")
    private Double annualLeaveBalance = 21.0; // days

    @Column(name = "sick_leave_balance")
    private Double sickLeaveBalance = 10.0; // days

    @Column(name = "last_attendance_sync")
    private LocalDateTime lastAttendanceSync;

    // Validation and AI tracking
    @Column(name = "ai_risk_score")
    private Double aiRiskScore = 0.0;

    @Column(name = "validation_flags", type = "json")
    private String validationFlags;

    public enum Department {
        IT, HR, FINANCE, MARKETING, SALES, OPERATIONS, LEGAL, ADMINISTRATION, SECURITY, QUALITY_ASSURANCE
    }

    public enum EmployeeStatus {
        ACTIVE, INACTIVE, TERMINATED, ON_LEAVE, SUSPENDED, PENDING_APPROVAL
    }

    public enum WorkScheduleType {
        FULL_TIME, PART_TIME, CONTRACT, TEMPORARY, SHIFT_WORK
    }

    // Helper methods
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public boolean isActive() {
        return status == EmployeeStatus.ACTIVE && super.isActive();
    }

    public int getAge() {
        return LocalDate.now().getYear() - dateOfBirth.getYear();
    }

    public int getYearsOfService() {
        return LocalDate.now().getYear() - hireDate.getYear();
    }
}