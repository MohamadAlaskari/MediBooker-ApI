# Cursor Prompt: MediBooker API with NestJS

Create a comprehensive medical appointment booking system using NestJS with the following specifications:

## Project Overview
Build a web-based medical appointment management system that allows doctors and medical staff to easily plan and coordinate patient appointments. The system should provide real-time updates, secure authentication, and an intuitive interface for efficient medical appointment management.

## Technology Stack
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI
- **Real-time**: WebSockets (Socket.IO)
- **Validation**: Class-validator & Class-transformer
- **Configuration**: ConfigModule with environment variables

## Core Features Required

### 1. User Management
- **Patient Management**: Complete CRUD operations for patient records
- **Employee Management**: Separate management for medical staff
- **Role-based Access Control**: Different permissions for patients vs medical staff
- **User Registration & Authentication**: Secure signup/login with email verification

### 2. Appointment System
- **Appointment Scheduling**: Create, read, update, delete appointments
- **Time Slot Management**: Available time slots for booking
- **Appointment Status**: Track appointment status (scheduled, completed, cancelled)
- **Conflict Prevention**: Prevent double-booking of time slots

### 3. Reservation System
- **Patient Reservations**: Allow patients to book appointments
- **Service Selection**: Link appointments with specific medical services
- **Reservation Management**: Full CRUD operations for reservations

### 4. Service Management
- **Medical Services**: Manage different types of medical services
- **Service Categories**: Organize services by type (Health Check-ups, X-rays, Vaccinations, etc.)
- **Service Descriptions**: Detailed information about each service

### 5. Real-time Features
- **WebSocket Integration**: Real-time updates for appointment changes
- **Live Notifications**: Instant notifications for new appointments, cancellations
- **Real-time Dashboard**: Live updates on appointment status

### 6. Email System
- **Appointment Confirmations**: Send confirmation emails for bookings
- **Reminder Emails**: Automated reminders before appointments
- **Password Reset**: Email-based password recovery
- **Email Verification**: Verify user email addresses during registration

## Database Schema Requirements

### Patient Entity
```typescript
- id: number (Primary Key, Auto Increment)
- name: string (Required)
- surname: string (Required)
- dateOfBirth: Date (Required)
- email: string (Unique, Required)
- password: string (Hashed, Required)
- phoneNumber: string (Required)
- healthInsurance: string (Required)
- insuranceNumber: string (Unique, Required)
- insuranceType: enum('private', 'gesetzlich') (Required)
- street: string (Required)
- houseNumber: string (Required)
- postcode: string (Required)
- city: string (Required)
- isActive: boolean (Default: false)
- emailVerified: boolean (Default: false)
- createdAt: Date
- updatedAt: Date
```

### Employee Entity
```typescript
- id: number (Primary Key, Auto Increment)
- name: string (Required)
- surname: string (Required)
- email: string (Unique, Required)
- password: string (Hashed, Required)
- role: enum('doctor', 'nurse', 'admin', 'receptionist') (Required)
- specialization: string (Optional)
- street: string (Required)
- houseNumber: string (Required)
- postcode: string (Required)
- city: string (Required)
- isActive: boolean (Default: false)
- emailVerified: boolean (Default: false)
- createdAt: Date
- updatedAt: Date
```

### Appointment Entity
```typescript
- id: number (Primary Key, Auto Increment)
- date: Date (Required)
- startTime: string (Required, Format: HH:mm)
- endTime: string (Required, Format: HH:mm)
- status: enum('scheduled', 'completed', 'cancelled', 'no_show') (Default: 'scheduled')
- notes: string (Optional)
- employeeId: number (Foreign Key to Employee)
- createdAt: Date
- updatedAt: Date
```

### Service Entity
```typescript
- id: number (Primary Key, Auto Increment)
- name: string (Required)
- type: enum('Health Check-ups', 'X-rays', 'Vaccinations', 'Blood Tests', 'Allergy Testing', 'Ultrasound', 'Consultation', 'Other') (Required)
- description: string (Required)
- duration: number (Required, in minutes)
- price: number (Optional)
- isActive: boolean (Default: true)
- createdAt: Date
- updatedAt: Date
```

### Reservation Entity
```typescript
- id: number (Primary Key, Auto Increment)
- appointmentId: number (Foreign Key to Appointment)
- patientId: number (Foreign Key to Patient)
- serviceId: number (Foreign Key to Service)
- status: enum('confirmed', 'cancelled', 'completed') (Default: 'confirmed')
- notes: string (Optional)
- createdAt: Date
- updatedAt: Date
```

## API Endpoints Required

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Verify email address

### Patient Endpoints
- `GET /patients` - Get all patients (Admin/Employee only)
- `GET /patients/:id` - Get patient by ID
- `POST /patients` - Create new patient
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient
- `GET /patients/profile` - Get current patient profile
- `PUT /patients/profile` - Update current patient profile

### Employee Endpoints
- `GET /employees` - Get all employees (Admin only)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee (Admin only)
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee (Admin only)
- `GET /employees/profile` - Get current employee profile
- `PUT /employees/profile` - Update current employee profile

### Appointment Endpoints
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment
- `GET /appointments/available` - Get available time slots
- `GET /appointments/patient/:patientId` - Get appointments for specific patient
- `GET /appointments/employee/:employeeId` - Get appointments for specific employee

### Reservation Endpoints
- `GET /reservations` - Get all reservations
- `GET /reservations/:id` - Get reservation by ID
- `POST /reservations` - Create new reservation
- `PUT /reservations/:id` - Update reservation
- `DELETE /reservations/:id` - Cancel reservation
- `GET /reservations/patient/:patientId` - Get reservations for specific patient

### Service Endpoints
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create new service (Admin/Employee only)
- `PUT /services/:id` - Update service (Admin/Employee only)
- `DELETE /services/:id` - Delete service (Admin/Employee only)

## Technical Requirements

### 1. Project Structure
```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   └── guards/
│       ├── jwt-auth.guard.ts
│       └── roles.guard.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
│   └── database.config.ts
├── email/
│   ├── email.service.ts
│   ├── email.module.ts
│   └── templates/
├── patients/
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   ├── patients.module.ts
│   └── dto/
├── employees/
│   ├── employees.controller.ts
│   ├── employees.service.ts
│   ├── employees.module.ts
│   └── dto/
├── appointments/
│   ├── appointments.controller.ts
│   ├── appointments.service.ts
│   ├── appointments.module.ts
│   └── dto/
├── reservations/
│   ├── reservations.controller.ts
│   ├── reservations.service.ts
│   ├── reservations.module.ts
│   └── dto/
├── services/
│   ├── services.controller.ts
│   ├── services.service.ts
│   ├── services.module.ts
│   └── dto/
├── websocket/
│   ├── websocket.gateway.ts
│   └── websocket.module.ts
├── app.module.ts
└── main.ts
```

### 2. Security Features
- JWT-based authentication with refresh tokens
- Password hashing using bcrypt
- Role-based access control (RBAC)
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet for security headers

### 3. Email Features
- Email verification for new users
- Password reset functionality
- Appointment confirmation emails
- Appointment reminder emails
- Email templates with HTML formatting

### 4. Real-time Features
- WebSocket gateway for real-time communication
- Event-driven notifications
- Live appointment updates
- Real-time dashboard updates

### 5. Validation & DTOs
- Comprehensive DTOs for all endpoints
- Class-validator decorators for input validation
- Custom validation pipes
- Error handling with detailed messages

### 6. Database Features
- TypeORM entities with proper relationships
- Database migrations
- Seeding for initial data
- Connection pooling
- Query optimization

### 7. Documentation
- Swagger/OpenAPI documentation
- API endpoint documentation
- Request/response examples
- Authentication documentation
- Error code documentation

## Environment Configuration
Create a comprehensive `.env` file with:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=medibooker

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=noreply@medibooker.com

# Server
PORT=3000
NODE_ENV=development

# WebSocket
WEBSOCKET_PORT=3001
```

## Additional Features to Implement

### 1. Advanced Appointment Features
- Recurring appointments
- Appointment conflict detection
- Time slot availability checking
- Appointment rescheduling
- Waitlist management

### 2. Notification System
- Email notifications
- SMS notifications (optional)
- In-app notifications
- Push notifications (optional)

### 3. Reporting & Analytics
- Appointment statistics
- Patient reports
- Revenue reports
- Performance metrics

### 4. File Management
- Document upload for patients
- Medical record attachments
- Image storage for appointments

### 5. Calendar Integration
- Google Calendar sync
- Outlook integration
- iCal export

## Testing Requirements
- Unit tests for all services
- Integration tests for API endpoints
- E2E tests for critical user flows
- Test database setup
- Mock external services

## Deployment Considerations
- Docker containerization
- Environment-specific configurations
- Database migration strategies
- Health check endpoints
- Logging and monitoring
- Error tracking

## Code Quality Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Husky pre-commit hooks
- Comprehensive error handling
- Proper logging
- Code documentation

Create a production-ready, scalable medical appointment booking system that follows NestJS best practices and provides a solid foundation for a real-world medical practice management application.