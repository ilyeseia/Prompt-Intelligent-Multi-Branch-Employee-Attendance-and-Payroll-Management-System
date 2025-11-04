package com.attendance.payroll.entity;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * ZKTeco biometric device configuration
 */
@Data
public class ZktDevice {
    
    @NotBlank(message = "Device ID is required")
    private String deviceId;
    
    @NotBlank(message = "Device name is required")
    private String deviceName;
    
    @NotBlank(message = "Device IP is required")
    private String ipAddress;
    
    @NotNull(message = "Device port is required")
    @Min(value = 1, message = "Port must be between 1 and 65535")
    @Max(value = 65535, message = "Port must be between 1 and 65535")
    private Integer port;
    
    private String serialNumber;
    
    @NotNull(message = "Device status is required")
    private DeviceStatus status = DeviceStatus.OFFLINE;
    
    private String macAddress;
    
    @Min(value = 1, message = "Timeout must be positive")
    private Integer connectionTimeout = 5000;
    
    @Min(value = 1, message = "Read timeout must be positive")
    private Integer readTimeout = 3000;
    
    private String firmwareVersion;
    
    private String model;
    
    private Integer maxUsers;
    
    private Integer maxRecords;
    
    public enum DeviceStatus {
        ONLINE, OFFLINE, MAINTENANCE, ERROR
    }
}