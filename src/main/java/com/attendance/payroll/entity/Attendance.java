package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Daily attendance record for employees
 * Tracks daily attendance status and provides data for payroll processing
 */
@Entity
@Table(name = "attendance", indexes = {
    @Index(name = "idx_attendance_employee_date", columnList = "employee_id, attendance_date"),
    @Index(name = "idx_attendance_branch_date", columnList = "branch_id, attendance_date"),
    @Index(name = "idx_attendance_date", columnList = "attendance_date"),
    @Index(name = "idx_attendance_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
public class Attendance extends BaseEntity {

    @NotNull(message = "Employee is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @NotNull(message = "Branch is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @NotNull(message = "Attendance date is required")
    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Column(name = "break_start_time")
    private LocalDateTime breakStartTime;

    @Column(name = "break_end_time")
    private LocalDateTime breakEndTime;

    @Column(name = "total_working_hours", precision = 5, scale = 2)
    private Double totalWorkingHours = 0.0;

    @Column(name = "total_break_hours", precision = 5, scale = 2)
    private Double totalBreakHours = 0.0;

    @Column(name = "overtime_hours", precision = 5, scale = 2)
    private Double overtimeHours = 0.0;

    @NotNull(message = "Attendance status is required")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AttendanceStatus status = AttendanceStatus.PRESENT;

    @Column(name = "attendance_type")
    @Enumerated(EnumType.STRING)
    private AttendanceType attendanceType = AttendanceType.REGULAR;

    // Late arrival and early departure tracking
    @Column(name = "late_arrival_minutes")
    private Integer lateArrivalMinutes = 0;

    @Column(name = "early_departure_minutes")
    private Integer earlyDepartureMinutes = 0;

    // Biometric verification data
    @Column(name = "check_in_device_id")
    private String checkInDeviceId;

    @Column(name = "check_out_device_id")
    private String checkOutDeviceId;

    @Column(name = "biometric_verification_method")
    @Enumerated(EnumType.STRING)
    private BiometricMethod biometricVerificationMethod;

    @Column(name = "verification_score")
    private Double verificationScore;

    // Leave and absence information
    @Column(name = "leave_type")
    @Enumerated(EnumType.STRING)
    private LeaveType leaveType;

    @Column(name = "leave_reason")
    private String leaveReason;

    @Column(name = "approved_by")
    private String approvedBy;

    // Geolocation tracking (optional for security)
    @Column(name = "check_in_latitude", precision = 10, scale = 8)
    private Double checkInLatitude;

    @Column(name = "check_in_longitude", precision = 11, scale = 8)
    private Double checkInLongitude;

    @Column(name = "check_out_latitude", precision = 10, scale = 8)
    private Double checkOutLatitude;

    @Column(name = "check_out_longitude", precision = 11, scale = 8)
    private Double checkOutLongitude;

    // AI and analytics data
    @Column(name = "ai_anomaly_score")
    private Double aiAnomalyScore = 0.0;

    @Column(name = "is_flagged_for_review")
    private Boolean isFlaggedForReview = false;

    @Column(name = "flag_reason")
    private String flagReason;

    @Column(name = "manual_override")
    private Boolean manualOverride = false;

    @Column(name = "manual_override_by")
    private String manualOverrideBy;

    @Column(name = "manual_override_reason")
    private String manualOverrideReason;

    // Notes and comments
    @Column(name = "notes")
    private String notes;

    public enum AttendanceStatus {
        PRESENT, ABSENT, LATE, HALF_DAY, WEEKEND, HOLIDAY, LEAVE
    }

    public enum AttendanceType {
        REGULAR, OVERTIME, EMERGENCY, WORK_FROM_HOME, BUSINESS_TRIP
    }

    public enum BiometricMethod {
        FINGERPRINT, FACE_RECOGNITION, CARD, PIN, MANUAL
    }

    public enum LeaveType {
        ANNUAL, SICK, MATERNITY, PATERNITY, EMERGENCY, UNPAID, COMPENSATORY
    }

    // Helper methods
    public boolean isPresent() {
        return status == AttendanceStatus.PRESENT || status == AttendanceStatus.LATE;
    }

    public boolean isLate() {
        return status == AttendanceStatus.LATE;
    }

    public boolean isAbsent() {
        return status == AttendanceStatus.ABSENT;
    }

    public double getActualWorkingHours() {
        if (checkInTime != null && checkOutTime != null) {
            return (checkOutTime.getHour() - checkInTime.getHour()) + 
                   (checkOutTime.getMinute() - checkInTime.getMinute()) / 60.0;
        }
        return 0.0;
    }

    public boolean isOvertime() {
        return overtimeHours != null && overtimeHours > 0;
    }

    public boolean requiresReview() {
        return isFlaggedForReview != null && isFlaggedForReview;
    }
}