package com.attendance.payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a company branch/location
 * Supports multi-branch architecture for the enterprise system
 */
@Entity
@Table(name = "branches")
@Data
@EqualsAndHashCode(callSuper = true)
public class Branch extends BaseEntity {

    @NotBlank(message = "Branch ID is required")
    @Size(max = 10, message = "Branch ID must not exceed 10 characters")
    @Column(name = "branch_id", unique = true, nullable = false)
    private String branchId;

    @NotBlank(message = "Branch name is required")
    @Size(max = 100, message = "Branch name must not exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Column(name = "location")
    private String location;

    @Size(max = 50, message = "Timezone must not exceed 50 characters")
    @Column(name = "timezone")
    private String timezone = "Africa/Algiers";

    @NotNull(message = "Branch status is required")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private BranchStatus status = BranchStatus.ACTIVE;

    @Column(name = "address")
    private String address;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(name = "phone")
    private String phone;

    @Email(message = "Invalid email format")
    @Column(name = "email")
    private String email;

    @Column(name = "manager_name")
    private String managerName;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "working_hours_start")
    private String workingHoursStart = "09:00";

    @Column(name = "working_hours_end")
    private String workingHoursEnd = "17:00";

    @Column(name = "zkt_devices", type = "json")
    @Convert(converter = ZktDeviceListConverter.class)
    private List<ZktDevice> zktDevices = new ArrayList<>();

    // Sync timestamp for cross-branch synchronization
    @Column(name = "last_sync_timestamp")
    private LocalDateTime lastSyncTimestamp;

    // Branch-specific configuration
    @Column(name = "config", type = "json")
    private String config;

    public enum BranchStatus {
        ACTIVE, INACTIVE, MAINTENANCE, SUSPENDED
    }
}