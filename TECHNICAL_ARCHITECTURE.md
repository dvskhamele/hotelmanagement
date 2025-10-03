# Technical Architecture for AdvisorX CRM

## Overview
AdvisorX CRM is a comprehensive, API-driven investment advisory platform designed for Galaxy Research's SEBI-compliant operations. The architecture follows a microservices approach with a Next.js frontend and Node.js/Express backend.

## High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Frontend      │    │   Mobile Apps    │    │   Admin Portal   │
│   (Next.js)     │    │   (React Native) │    │   (Next.js)      │
└─────────┬───────┘    └─────────┬────────┘    └─────────┬────────┘
          │                      │                       │
          │                      │                       │
          └──────────┬───────────┼───────────────────────┘
                     │           │
                     ▼           ▼
            ┌─────────────────────────────┐
            │        API Gateway          │
            │     (Rate Limiting,         │
            │      Authentication)        │
            └─────────────┬───────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Client Mgmt   │ │  Signal &      │ │  Compliance    │
│  Service       │ │  Research      │ │  Service       │
│                │ │  Service       │ │                │
├────────────────┤ ├────────────────┤ ├────────────────┤
│ • Client CRUD  │ │ • Signal       │ │ • Audit Logs   │
│ • KYC Mgmt     │ │   Scheduling   │ │ • Compliance   │
│ • Portfolio    │ │ • Research     │ │   Tracking     │
│   Management   │ │   Reports      │ │ • SEBI Reports │
└────────────────┘ └────────────────┘ └────────────────┘

        │                 │                 │
        ▼                 ▼                 ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Payment &     │ │  Communication │ │  Third-party   │
│  Billing       │ │  Service       │ │  Integrations  │
│  Service       │ │                │ │                │
├────────────────┤ ├────────────────┤ ├────────────────┤
│ • Subscription │ │ • WhatsApp API │ │ • KYC APIs     │
│   Management   │ │ • Telegram API │ │ • E-Sign APIs  │
│ • Invoicing    │ │ • Email/SMS    │ │ • Payment APIs │
└────────────────┘ └────────────────┘ └────────────────┘

        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
                ┌──────────────────┐
                │   Database       │
                │   (PostgreSQL)   │
                └──────────────────┘
```

## Frontend Architecture (Next.js 13+)

### App Router Structure
```
src/app/
├── advisorx-core/           # Main dashboard
├── clients/                 # Client management
├── kyc-panel/              # KYC verification
├── advisors/               # Advisor management
├── signals/                # Signal management
├── subscriptions/          # Subscription management
├── research/               # Research reports
├── compliance/             # Compliance dashboard
├── messaging/              # Communication hub
├── admin/                  # Admin control panel
├── dashboard/              # Main dashboard
├── login/                  # Authentication
├── signup/                 # Client onboarding
└── api/                    # API routes
```

### Technology Stack
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context + SWR for data fetching
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts or Chart.js for analytics
- **UI Components**: Custom component library based on Tailwind

## Backend Architecture (Node.js/Express)

### API Structure
```
backend/
├── api/
│   ├── clients/
│   │   ├── index.js           # CRUD operations
│   │   ├── kyc.js             # KYC operations
│   │   └── portfolio.js       # Portfolio operations
│   ├── advisors/
│   │   ├── index.js           # Advisor CRUD
│   │   └── assignments.js     # Client-advisor assignments
│   ├── signals/
│   │   ├── index.js           # Signal management
│   │   └── scheduler.js       # Signal scheduling
│   ├── research/
│   │   ├── reports.js         # Research reports
│   │   └── publications.js    # Publication management
│   ├── compliance/
│   │   ├── audit.js           # Audit logs
│   │   └── reports.js         # Compliance reports
│   ├── payments/
│   │   ├── subscriptions.js   # Subscription management
│   │   └── invoices.js        # Invoice management
│   └── auth/                  # Authentication
├── services/
│   ├── kycService.js         # KYC verification
│   ├── esignService.js       # E-signature service
│   ├── paymentService.js     # Payment processing
│   ├── messagingService.js   # Messaging service
│   ├── complianceService.js  # Compliance tracking
│   └── emailService.js       # Email service
├── middleware/
│   ├── auth.js               # Authentication
│   ├── rbac.js               # Role-based access
│   ├── encryption.js         # Data encryption
│   └── audit.js              # Audit logging
├── utils/
│   ├── crypto.js             # Cryptography utilities
│   ├── validators.js         # Data validation
│   └── helpers.js            # Helper functions
└── config/
    ├── database.js           # Database config
    ├── redis.js              # Redis config
    └── security.js           # Security config
```

### API Design Principles
- RESTful API design with proper HTTP verbs
- Consistent response structure:
```javascript
{
  success: boolean,
  data?: any,
  error?: string,
  message?: string
}
```
- Standard error responses with appropriate HTTP status codes
- Rate limiting per endpoint
- Request/response validation using Joi or Zod
- Proper authentication and authorization headers

## Database Architecture (PostgreSQL)

### Connection Pooling
- Use pg-pool for connection management
- Optimize for concurrent requests
- Handle database failover scenarios

### Indexing Strategy
- Index foreign keys for performance
- Create composite indexes for complex queries
- Optimize for common access patterns
- Regular index maintenance scripts

### Data Partitioning
- Partition large tables (audit logs, signals) by date
- Archive old data to improve performance
- Optimize storage costs

## Security Architecture

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Multi-factor authentication for admin users
- Session management
- Password policies and rotation

### Data Protection
- AES-256 encryption for sensitive data
- Client-side encryption for KYC documents
- Secure key management
- Data masking for non-privileged users

### Network Security
- API rate limiting
- IP whitelisting for admin access
- DDoS protection
- Web Application Firewall (WAF)

## Third-Party Integrations

### KYC Verification
- Integration with Karza/Signzy APIs
- Aadhaar/PAN verification
- Biometric authentication
- Document verification

### E-Signature
- Digio eSign API integration
- Aadhaar-based eKYC
- Document PDF generation
- Signature status tracking

### Payment Gateway
- Razorpay integration
- Subscription management
- Invoice generation
- Payment status tracking

### Communication
- WhatsApp Business API (Gupshup/Twilio)
- Telegram Bot API
- SMS gateway (MSG91/SMSAPI)
- Email service (SendGrid/Mailgun)

### Monitoring & Analytics
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Usage analytics
- Business intelligence dashboards

## Deployment Architecture

### Infrastructure
- Containerized deployment (Docker)
- Orchestration with Kubernetes (optional)
- Load balancing
- Auto-scaling based on demand

### Hosting (India-based for SEBI compliance)
- AWS Mumbai (ap-south-1)
- Azure India South (southindia)
- GCP Mumbai (asia-south1)

### CI/CD Pipeline
- Automated testing
- Code quality checks
- Security scanning
- Blue-green deployments
- Rollback capabilities

## Performance Architecture

### Caching
- Redis for session management
- Application-level caching
- Database query caching
- CDN for static assets

### Asynchronous Processing
- Background job processing (Bull/Queue)
- Signal scheduling
- Report generation
- Bulk operations

### Database Optimization
- Read replicas for reporting
- Query optimization
- Connection pooling
- Database indexing

## Monitoring & Observability

### Application Monitoring
- Request/response time tracking
- Error rate monitoring
- Resource utilization
- Custom business metrics

### Logging
- Structured logging (JSON format)
- Centralized log aggregation
- Log rotation and retention
- Anomaly detection

### Alerting
- Real-time alerting
- Escalation policies
- Alert deduplication
- On-call rotation

## Backup & Disaster Recovery

### Data Backup
- Automated daily backups
- Point-in-time recovery
- Cross-region backup copies
- Backup testing procedures

### Disaster Recovery
- Recovery Time Objective (RTO): 4 hours
- Recovery Point Objective (RPO): 1 hour
- Failover procedures
- Regular disaster recovery testing

This architecture ensures scalability, security, and compliance while maintaining the flexibility to adapt to changing business requirements and regulatory changes.