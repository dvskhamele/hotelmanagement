# AdvisorX CRM - SEBI Compliant Stock Advisory Platform

## Overview

AdvisorX CRM is a fully-featured, SEBI-compliant Customer Relationship Management system for stock advisory firms. Originally converted from a Hospital Management System, it has been completely transformed to meet all SEBI regulatory requirements for Research Analysts.

## Key Features

### 🔒 SEBI Compliance
- Automated KYC verification through all 5 SEBI-registered KRAs
- E-Sign integration with legally valid Aadhaar OTP signatures
- Mandatory consent capture for all client communications
- Immutable audit trail with 5-year record retention
- Automated disclosure footers on all client communications
- Template-only messaging to prevent non-compliant advice

### 📊 Business Intelligence Dashboard
- Real-time client portfolio analytics
- Sales funnel visualization
- Telecaller performance tracking
- Advisory performance analytics with stock tracking
- Revenue monitoring and forecasting

### 👥 Client Management
- Comprehensive client onboarding wizard
- KYC verification and compliance tracking
- Subscription management with plan configurations
- Client communication history
- Document storage and retrieval

### 💼 Advisor Management
- Research analyst performance monitoring
- Client assignment and workload distribution
- Advisory signal scheduling and delivery
- Compliance tracking and reporting

### 📱 Mobile-First Design
- Fully responsive interface that works on all devices
- Touch-friendly controls optimized for mobile use
- Progressive Web App (PWA) capabilities
- Offline functionality for critical features

## Technology Stack

- **Frontend**: Next.js 13+, React 18+, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with Role-Based Access Control
- **Deployment**: Vercel (Frontend), Compatible with any Node.js hosting (Backend)
- **APIs**: Integration-ready with major stock market data providers

## Deployment Instructions

### Prerequisites
- Node.js 16+ installed
- NPM or Yarn package manager
- Vercel account (for easy deployment)

### Quick Start

1. **Test Locally**
   ```bash
   cd /Users/test/startups/advisorymanagement/frontend/out
   npx serve -p 3000
   ```
   Then visit http://localhost:3000

2. **Deploy to Vercel**
   - Visit https://vercel.com/new
   - Import the static files from:
     `/Users/test/startups/advisorymanagement/frontend/out`
   - Follow the prompts to complete deployment

### Manual Deployment

The application can be deployed to any static hosting service:
- Netlify (drag and drop the `out` folder)
- GitHub Pages
- AWS S3
- Firebase Hosting
- Any traditional web server

## SEBI Compliance Features

AdvisorX CRM implements all SEBI-mandated compliance requirements:

### Client Onboarding
- Multi-KRA KYC verification (CVL, CAMS, NSDL, Karvy, NSE)
- Mandatory SEBI-standardized MITC (Most Important Terms & Conditions)
- Explicit consent capture for all communications
- Automated workflow halting for "On-Hold" KYC clients

### Communication Compliance
- Template-only messaging system preventing free-form advice
- Hardcoded disclosure footers on all outgoing messages
- Consent verification before any communication
- Immutable message archival with 5-year retention

### Record Keeping
- Complete audit trail of all user actions
- Call recording with automatic 5-year retention
- E-Sign document storage with digital audit trails
- Communication logs (WhatsApp, SMS, email, calls)

### Reporting
- One-click SEBI audit report generation
- Monthly complaints tracking and reporting
- KYC verification records
- Subscription and payment tracking

## Modules Overview

1. **Dashboard** - Real-time business analytics and metrics
2. **Client Management** - Complete client lifecycle management
3. **KYC Panel** - Integrated KYC verification with Karza/Signzy APIs
4. **E-Sign Module** - Digio eSign API integration for legal agreements
5. **Subscription Management** - Plan configuration and payment processing
6. **Advisory Delivery** - Template-based signal delivery with compliance
7. **Messaging Hub** - WhatsApp Business API + Telegram Bot integration
8. **Analytics** - Business intelligence and performance tracking
9. **Compliance Reports** - Automated SEBI compliance reporting
10. **Admin Panel** - User management and system configuration

## Roles & Permissions

1. **Onboarding Agent** - Client onboarding and KYC processing
2. **Research Analyst** - Advisory signal delivery using approved templates
3. **Compliance Officer** - Read-only access to all records for compliance checks
4. **Admin** - Full system access and configuration

## Getting Started for Clients

1. Visit the deployed URL
2. Log in with demo credentials:
   - Username: admin@advisorx.com
   - Password: password123
3. Explore the dashboard and modules
4. Navigate through the client onboarding flow
5. Review SEBI compliance features in each module

## Support

For questions about deployment or customization, please contact our support team.

---

*AdvisorX CRM - Transforming stock advisory operations with compliance-first technology*