# Backend Development Guidelines

## Payroll Management System - Java Spring Boot Backend

---

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [Project Structure](#project-structure)
3. [Coding Standards](#coding-standards)
4. [Entity Design Guidelines](#entity-design-guidelines)
5. [Repository Layer](#repository-layer)
6. [Service Layer](#service-layer)
7. [Controller Layer](#controller-layer)
8. [Security Guidelines](#security-guidelines)
9. [Error Handling](#error-handling)
10. [Testing Guidelines](#testing-guidelines)
11. [Performance Guidelines](#performance-guidelines)
12. [Database Guidelines](#database-guidelines)
13. [API Documentation](#api-documentation)
14. [Logging Guidelines](#logging-guidelines)

---

## Architecture Principles

### Layered Architecture

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│         (REST Controllers)              │
├─────────────────────────────────────────┤
│           Business Layer                │
│           (Services)                    │
├─────────────────────────────────────────┤
│           Data Access Layer             │
│         (Repositories)                  │
├─────────────────────────────────────────┤
│           Database Layer                │
│         (PostgreSQL)                    │
└─────────────────────────────────────────┘
```

### Key Principles

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Single Responsibility**: Each class should have one reason to change
3. **Dependency Injection**: Use constructor injection over field injection
4. **Interface Segregation**: Use interfaces for service contracts
5. **Don't Repeat Yourself (DRY)**: Extract common logic to utility classes

---

## Project Structure

```
src/main/java/com/attendance/payroll/
├── config/                    # Configuration classes
│   ├── SecurityConfig.java
│   ├── KafkaConfig.java
│   ├── RedisConfig.java
│   └── OpenApiConfig.java
├── controller/                # REST Controllers
│   ├── EmployeeController.java
│   ├── AttendanceController.java
│   ├── PayrollController.java
│   └── BranchController.java
├── service/                   # Business Logic
│   ├── EmployeeService.java
│   ├── AttendanceService.java
│   ├── PayrollService.java
│   └── impl/                  # Service implementations
├── repository/                # Data Access
│   ├── EmployeeRepository.java
│   ├── AttendanceRepository.java
│   └── PayrollRepository.java
├── entity/                    # JPA Entities
│   ├── Employee.java
│   ├── Attendance.java
│   └── PayrollRecord.java
├── dto/                       # Data Transfer Objects
│   ├── request/
│   └── response/
├── mapper/                    # MapStruct Mappers
│   ├── EmployeeMapper.java
│   └── PayrollMapper.java
├── exception/                 # Custom Exceptions
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   └── BusinessException.java
├── util/                      # Utility Classes
│   ├── DateUtils.java
│   └── PayrollCalculator.java
├── security/                  # Security Components
│   ├── JwtTokenProvider.java
│   └── UserPrincipal.java
└── audit/                     # Audit Logging
    └── AuditLogListener.java
```

---

## Coding Standards

### Naming Conventions

```java
// Classes: PascalCase
public class EmployeeService { }

// Interfaces: PascalCase with descriptive name
public interface EmployeeRepository { }

// Methods: camelCase with verb prefix
public Employee findById(Long id) { }
public List<Employee> findAllByDepartment(Department department) { }
public void calculateMonthlyPayroll(Long employeeId) { }

// Constants: SCREAMING_SNAKE_CASE
public static final String DEFAULT_TIMEZONE = "Africa/Algiers";
public static final int MAX_PAGE_SIZE = 100;

// Variables: camelCase
Employee employee;
List<Attendance> attendanceRecords;

// Packages: lowercase
package com.attendance.payroll.service;
```

### Code Formatting

```java
// Maximum line length: 120 characters
// Indentation: 4 spaces (no tabs)
// Braces: K&R style

// Good
public Employee createEmployee(EmployeeRequest request) {
    validateRequest(request);
    Employee employee = mapper.toEntity(request);
    return repository.save(employee);
}

// Avoid
public Employee createEmployee(EmployeeRequest request)
{
validateRequest(request);
Employee employee=mapper.toEntity(request);
return repository.save(employee);
}
```

### Constructor Injection

```java
// Preferred: Constructor injection
@Service
@RequiredArgsConstructor // Lombok annotation
public class EmployeeService {
    
    private final EmployeeRepository repository;
    private final DepartmentService departmentService;
    private final AuditService auditService;
    
    // No @Autowired needed with single constructor
}

// Avoid: Field injection
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository; // Not recommended
}
```

---

## Entity Design Guidelines

### Base Entity

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
public abstract class BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Version
    private Long version;
    
    @PreRemove
    protected void onDelete() {
        this.deletedAt = LocalDateTime.now();
        this.isActive = false;
    }
}
```

### Entity Best Practices

```java
@Entity
@Table(name = "employees", indexes = {
    @Index(name = "idx_employee_email", columnList = "email"),
    @Index(name = "idx_employee_branch", columnList = "branch_id"),
    @Index(name = "idx_employee_status", columnList = "status")
})
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_at IS NULL")
public class Employee extends BaseEntity {
    
    // Use wrapper types, not primitives for nullable fields
    @NotBlank(message = "Employee ID is required")
    @Column(name = "employee_id", unique = true, nullable = false)
    private String employeeId;
    
    // Use enums for fixed values
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EmployeeStatus status = EmployeeStatus.ACTIVE;
    
    // Use BigDecimal for monetary values
    @Column(name = "base_salary", precision = 12, scale = 2)
    private BigDecimal baseSalary;
    
    // Use LocalDateTime for timestamps
    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;
    
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Attendance> attendanceRecords = new ArrayList<>();
}
```

---

## Repository Layer

### Repository Interface

```java
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Find by unique field
    Optional<Employee> findByEmployeeId(String employeeId);
    
    // Find by email
    Optional<Employee> findByEmail(String email);
    
    // Find by status
    List<Employee> findByStatus(EmployeeStatus status);
    
    // Find by branch
    List<Employee> findByBranchId(Long branchId);
    
    // Find by department
    @Query("SELECT e FROM Employee e WHERE e.department = :department AND e.status = 'ACTIVE'")
    List<Employee> findActiveByDepartment(@Param("department") Department department);
    
    // Count by status
    long countByStatus(EmployeeStatus status);
    
    // Exists check
    boolean existsByEmail(String email);
    
    // Pagination
    Page<Employee> findByStatus(EmployeeStatus status, Pageable pageable);
    
    // Custom query with join
    @Query("SELECT e FROM Employee e JOIN FETCH e.branch WHERE e.id = :id")
    Optional<Employee> findByIdWithBranch(@Param("id") Long id);
    
    // Bulk update
    @Modifying
    @Query("UPDATE Employee e SET e.status = :status WHERE e.branch.id = :branchId")
    int updateStatusByBranch(@Param("branchId") Long branchId, @Param("status") EmployeeStatus status);
}
```

---

## Service Layer

### Service Interface

```java
public interface EmployeeService {
    EmployeeResponse create(EmployeeRequest request);
    EmployeeResponse update(Long id, EmployeeRequest request);
    EmployeeResponse findById(Long id);
    PageResponse<EmployeeResponse> findAll(EmployeeFilter filter, Pageable pageable);
    void delete(Long id);
    List<EmployeeResponse> findByBranch(Long branchId);
    void updateStatus(Long id, EmployeeStatus status);
}
```

### Service Implementation

```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    
    private final EmployeeRepository repository;
    private final EmployeeMapper mapper;
    private final AuditService auditService;
    private final CacheManager cacheManager;
    
    @Override
    @Transactional
    @CacheEvict(value = "employees", allEntries = true)
    public EmployeeResponse create(EmployeeRequest request) {
        log.info("Creating employee with email: {}", request.getEmail());
        
        // Validate
        if (repository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email already exists: " + request.getEmail());
        }
        
        // Map and save
        Employee employee = mapper.toEntity(request);
        employee.setStatus(EmployeeStatus.PENDING_APPROVAL);
        employee = repository.save(employee);
        
        // Audit
        auditService.logCreation("Employee", employee.getId());
        
        log.info("Employee created with ID: {}", employee.getId());
        return mapper.toResponse(employee);
    }
    
    @Override
    @Cacheable(value = "employees", key = "#id")
    public EmployeeResponse findById(Long id) {
        Employee employee = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return mapper.toResponse(employee);
    }
    
    @Override
    @Transactional
    @CacheEvict(value = "employees", key = "#id")
    public void delete(Long id) {
        Employee employee = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        
        repository.delete(employee);
        auditService.logDeletion("Employee", id);
    }
}
```

---

## Controller Layer

### REST Controller

```java
@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Tag(name = "Employee Management", description = "Employee CRUD operations")
@Slf4j
public class EmployeeController {
    
    private final EmployeeService service;
    
    @PostMapping
    @Operation(summary = "Create a new employee")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Employee created"),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
        @ApiResponse(responseCode = "409", description = "Email already exists")
    })
    public ResponseEntity<EmployeeResponse> create(
            @Valid @RequestBody EmployeeRequest request) {
        EmployeeResponse response = service.create(request);
        return ResponseEntity
            .created(URI.create("/api/v1/employees/" + response.getId()))
            .body(response);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID")
    public ResponseEntity<EmployeeResponse> findById(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
    
    @GetMapping
    @Operation(summary = "Get all employees with pagination")
    public ResponseEntity<PageResponse<EmployeeResponse>> findAll(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastName,asc") String sort) {
        
        Pageable pageable = PageRequest.of(page, Math.min(size, 100), parseSort(sort));
        EmployeeFilter filter = new EmployeeFilter(department, status);
        
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update employee")
    public ResponseEntity<EmployeeResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Update employee status")
    public ResponseEntity<EmployeeResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        service.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(service.findById(id));
    }
}
```

---

## Security Guidelines

### Authentication & Authorization

```java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/employees/**")
                    .hasAnyRole("ADMIN", "HR_MANAGER")
                .requestMatchers("/api/v1/payroll/**")
                    .hasAnyRole("ADMIN", "PAYROLL_OFFICER")
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
```

### Input Validation

```java
@Data
public class EmployeeRequest {
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z\\s-']+$", message = "Invalid characters in first name")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String phone;
    
    @NotNull(message = "Department is required")
    private Department department;
    
    @NotNull(message = "Branch ID is required")
    @Positive(message = "Branch ID must be positive")
    private Long branchId;
    
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    
    @NotNull(message = "Hire date is required")
    @PastOrPresent(message = "Hire date cannot be in the future")
    private LocalDate hireDate;
}
```

---

## Error Handling

### Global Exception Handler

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("Not Found")
            .message(ex.getMessage())
            .path(getCurrentRequestPath())
            .build();
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.UNPROCESSABLE_ENTITY.value())
            .error("Business Rule Violation")
            .message(ex.getMessage())
            .path(getCurrentRequestPath())
            .build();
        
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .toList();
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Validation Failed")
            .message("Input validation failed")
            .details(errors)
            .path(getCurrentRequestPath())
            .build();
        
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        log.error("Unexpected error occurred", ex);
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("Internal Server Error")
            .message("An unexpected error occurred")
            .path(getCurrentRequestPath())
            .build();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

---

## Testing Guidelines

### Unit Tests

```java
@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {
    
    @Mock
    private EmployeeRepository repository;
    
    @Mock
    private EmployeeMapper mapper;
    
    @Mock
    private AuditService auditService;
    
    @InjectMocks
    private EmployeeServiceImpl service;
    
    private Employee testEmployee;
    private EmployeeRequest testRequest;
    
    @BeforeEach
    void setUp() {
        testEmployee = Employee.builder()
            .id(1L)
            .employeeId("EMP001")
            .firstName("John")
            .lastName("Doe")
            .email("john.doe@example.com")
            .build();
        
        testRequest = new EmployeeRequest();
        testRequest.setFirstName("John");
        testRequest.setLastName("Doe");
        testRequest.setEmail("john.doe@example.com");
    }
    
    @Test
    @DisplayName("Should create employee successfully")
    void createEmployee_Success() {
        // Given
        when(repository.existsByEmail(anyString())).thenReturn(false);
        when(mapper.toEntity(any())).thenReturn(testEmployee);
        when(repository.save(any())).thenReturn(testEmployee);
        when(mapper.toResponse(any())).thenReturn(new EmployeeResponse());
        
        // When
        service.create(testRequest);
        
        // Then
        verify(repository).save(any(Employee.class));
        verify(auditService).logCreation(any(), any());
    }
    
    @Test
    @DisplayName("Should throw exception when email exists")
    void createEmployee_EmailExists_ThrowsException() {
        // Given
        when(repository.existsByEmail(anyString())).thenReturn(true);
        
        // When & Then
        assertThrows(BusinessException.class, () -> service.create(testRequest));
        verify(repository, never()).save(any());
    }
}
```

### Integration Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class EmployeeControllerIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb");
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private EmployeeRepository repository;
    
    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Should create and retrieve employee")
    void createAndFindEmployee() throws Exception {
        // Create
        String requestBody = """
            {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "department": "IT",
                "branchId": 1
            }
            """;
        
        mockMvc.perform(post("/api/v1/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.firstName").value("John"));
    }
}
```

---

## Performance Guidelines

### Database Optimization

```java
// Use pagination for large datasets
Page<Employee> findByStatus(EmployeeStatus status, Pageable pageable);

// Use fetch joins for N+1 problem
@Query("SELECT e FROM Employee e JOIN FETCH e.branch LEFT JOIN FETCH e.attendanceRecords")
List<Employee> findAllWithBranchAndAttendance();

// Use batch processing
@Transactional
public void processPayrollBatch(List<Long> employeeIds) {
    List<List<Long>> batches = Lists.partition(employeeIds, 100);
    for (List<Long> batch : batches) {
        List<Employee> employees = repository.findAllById(batch);
        processPayroll(employees);
    }
}

// Use indexes
@Table(name = "attendance", indexes = {
    @Index(name = "idx_attendance_employee_date", columnList = "employee_id, attendance_date"),
    @Index(name = "idx_attendance_branch_date", columnList = "branch_id, attendance_date")
})
```

### Caching

```java
@Service
public class BranchServiceImpl implements BranchService {
    
    @Cacheable(value = "branches", key = "#id")
    public BranchResponse findById(Long id) {
        return mapper.toResponse(repository.findById(id).orElseThrow());
    }
    
    @CacheEvict(value = "branches", key = "#id")
    public void update(Long id, BranchRequest request) {
        // Update logic
    }
    
    @CacheEvict(value = "branches", allEntries = true)
    public void refreshCache() {
        // Force cache refresh
    }
}
```

---

## API Documentation

### OpenAPI/Swagger

```java
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Payroll Management System API")
                .version("1.0.0")
                .description("Enterprise payroll and attendance management")
                .contact(new Contact()
                    .name("API Support")
                    .email("support@payrollpro.dz")))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

---

## Logging Guidelines

```java
@Service
@Slf4j
public class PayrollServiceImpl implements PayrollService {
    
    public PayrollResponse calculatePayroll(Long employeeId, LocalDate month) {
        // Log entry with context
        log.info("Calculating payroll for employee: {}, month: {}", employeeId, month);
        
        try {
            Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
            
            // Log important milestones
            log.debug("Found employee: {}", employee.getEmployeeId());
            
            PayrollRecord record = performCalculation(employee, month);
            
            // Log success with key metrics
            log.info("Payroll calculated successfully. Employee: {}, Net Salary: {}", 
                employeeId, record.getNetSalary());
            
            return mapper.toResponse(record);
            
        } catch (ResourceNotFoundException e) {
            // Log business exceptions as warnings
            log.warn("Payroll calculation failed - employee not found: {}", employeeId);
            throw e;
            
        } catch (Exception e) {
            // Log technical errors with full stack trace
            log.error("Error calculating payroll for employee: {}", employeeId, e);
            throw new PayrollCalculationException("Failed to calculate payroll", e);
        }
    }
}
```

---

## Checklist for Code Review

- [ ] Code follows naming conventions
- [ ] Proper exception handling implemented
- [ ] Input validation in place
- [ ] Security annotations applied
- [ ] Unit tests written
- [ ] Integration tests for critical paths
- [ ] Logging statements added
- [ ] API documentation updated
- [ ] Performance considerations addressed
- [ ] No hardcoded values
- [ ] Proper transaction boundaries
- [ ] Caching strategy implemented where needed

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Author**: Development Team
