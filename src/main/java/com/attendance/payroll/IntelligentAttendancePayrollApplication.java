package com.attendance.payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main application class for the Intelligent Attendance & Payroll Management System
 * 
 * Features:
 * - Microservices architecture with Eureka discovery
 * - Kafka messaging for real-time synchronization
 * - JPA repositories for database operations
 * - Async processing for performance
 * - Scheduled tasks for automation
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableKafka
@EnableJpaRepositories
@EnableAsync
@EnableScheduling
public class IntelligentAttendancePayrollApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntelligentAttendancePayrollApplication.class, args);
    }
}