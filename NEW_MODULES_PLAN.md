# New Modules for AdvisorX CRM

## KYC Panel Module
**Purpose**: Handle client KYC verification and management
- Integrate with Karza/Signzy APIs for Aadhaar/PAN verification
- Document upload and verification workflow
- KYC status tracking (Pending, Verified, Rejected)
- Regulatory compliance dashboard

**Technical Requirements**:
- Aadhaar/PAN verification API integration
- Document upload storage system
- KYC status management
- Compliance reporting

## E-Sign Module
**Purpose**: Handle electronic signature for advisory agreements
- Integrate with Digio eSign API (Aadhaar OTP)
- Store signed PDFs securely
- Track signature status (Pending, Completed, Expired)
- Generate signed agreements

**Technical Requirements**:
- eSign API integration
- Secure document storage
- Signature tracking system
- PDF generation capabilities

## Invoicing & Payments Module
**Purpose**: Handle billing and payment processing
- Razorpay/Zoho Books integration
- Auto-generate invoices on subscription payments
- Payment status tracking
- Revenue reporting

**Technical Requirements**:
- Payment gateway API integration
- Invoice generation system
- Payment status tracking
- Financial reporting

## Messaging Hub Module
**Purpose**: Deliver advisory signals to clients
- WhatsApp Business API (Gupshup/Twilio)
- Telegram Bot API for advisory signals
- SMS Gateway for critical alerts
- Multi-channel communication management

**Technical Requirements**:
- Multi-channel API integrations
- Message scheduling system
- Delivery tracking
- Template management

## Subscription Management Module
**Purpose**: Manage client subscriptions and access levels
- Plans (Basic, Premium, VIP)
- Auto-renewals + expiry handling
- Subscription status management
- Access control based on subscription level

**Technical Requirements**:
- Subscription plan management
- Recurring payment handling
- Access control system
- Expiry notification system

## Signals Scheduler Module
**Purpose**: Schedule and deliver stock advisory tips
- Time-based signal delivery (e.g., daily at 9:15am)
- Custom scheduling for different client segments
- Signal history tracking
- Performance analytics

**Technical Requirements**:
- Job scheduling system
- Time-based execution
- History tracking
- Analytics dashboard

## Client Portfolio Management Module
**Purpose**: Track and manage client investment portfolios
- Portfolio allocation tracking
- Performance monitoring
- Risk assessment
- Portfolio rebalancing suggestions

**Technical Requirements**:
- Portfolio tracking system
- Performance calculation
- Risk modeling
- Rebalancing algorithms

## Research Reports Module
**Purpose**: Manage and distribute market research content
- Research report publishing
- Categorized research content
- Client access control
- Download tracking

**Technical Requirements**:
- Content management system
- Access control based on subscriptions
- Content categorization
- Usage analytics

## Compliance Audit Module
**Purpose**: Track and report all compliance requirements
- KYC audit logs
- eSign transaction logs
- Advisory agreement tracking
- SEBI compliance reporting

**Technical Requirements**:
- Comprehensive audit logging
- Report generation
- Compliance status tracking
- Audit dashboard

## Advisor Assignment Module
**Purpose**: Manage advisor-client relationships
- SEBI-registered advisor management
- Client-advisor assignment
- Performance tracking
- Load balancing

**Technical Requirements**:
- Advisor management system
- Assignment algorithms
- Performance tracking
- Communication tools