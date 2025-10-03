# Frontend Architecture Plan for AdvisorX CRM

## Overview
This document outlines the transformation of the existing Hospital Management System (HMS) frontend to AdvisorX CRM for Galaxy Research - a SEBI-compliant stock advisory platform.

## Current vs. Target Architecture

### Current Architecture (HMS)
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- React Client Components
- API Service Layer
- Component-based architecture

### Target Architecture (AdvisorX CRM)
- Same core stack with advisory-specific components
- Enhanced security and compliance features
- Financial data visualization
- SEBI compliance modules
- Investment advisory workflows

## Updated App Router Structure

```
src/app/
├── advisorx-core/           # Main CRM engine
├── dashboard/              # AdvisorX dashboard with advisory metrics
├── clients/                # Client/Investor management (replaces patients)
├── advisors/               # SEBI-registered advisor management (replaces doctors)
├── kyc-panel/             # KYC verification and management
├── e-sign/                # Electronic signature module
├── subscriptions/         # Subscription management
├── signals/               # Stock advisory signals
├── research/              # Research reports and publications
├── compliance/            # SEBI compliance dashboard
├── messaging/             # Multi-channel communication hub
├── invoicing/             # Invoice management
├── payments/              # Payment processing
├── client-portal/         # Client-facing portal
├── admin/                 # Admin control panel
├── onboarding/            # Client onboarding flow
├── analytics/             # Business intelligence
├── reports/               # Compliance and business reports
├── login/                 # Authentication
├── signup/                # New client signup
├── api/                   # API routes
└── globals.css            # Global styles
```

## Component Architecture

### Updated Components Directory
```
src/components/
├── Header/                 # Updated header with advisory branding
├── Navigation/             # Advisory-specific navigation
├── Dashboard/              # Advisory metrics dashboard components
├── ClientManagement/       # Client management components
├── KYC/                   # KYC verification components
├── ESign/                 # E-signature components
├── Signals/               # Signal management components
├── Research/              # Research components
├── Compliance/            # Compliance components
├── Messaging/             # Messaging components
├── Charts/                # Financial data visualization
├── Modals/                # Reusable modals
├── Forms/                 # Financial forms with validations
├── Tables/                # Data tables for financial data
└── Cards/                 # Financial data cards
```

## Key Component Transformations

### 1. Header Component Transformation
**From**: Hospital-focused header with medical terminology
**To**: Investment advisory header with financial focus
- Branding: SuperHealth → AdvisorX/Galaxy Research
- Navigation: Medical services → Advisory services
- User profile: Medical staff → Research Analysts/Advisors

### 2. Dashboard Component Transformation
**From**: Hospital metrics (patient count, room occupancy, staff activity)
**To**: Advisory metrics (client count, subscription status, signals sent, revenue)
- Client acquisition metrics
- Subscription performance
- Signal effectiveness tracking
- Revenue and billing metrics
- Compliance status indicators

### 3. Data Visualization Components
**New financial-specific charts:**
- Portfolio performance charts
- Revenue trend analysis
- Client growth metrics
- Signal accuracy tracking
- Compliance audit trails

## Updated Page Components

### 1. Clients Page (replaces Patients)
- Client onboarding workflow
- KYC status tracking
- Portfolio management
- Subscription lifecycle
- Communication history

### 2. Advisors Page (replaces Doctors)
- SEBI registration tracking
- Client assignment management
- Performance metrics
- Research publication tools

### 3. Signals Page (new)
- Signal creation and scheduling
- Delivery tracking
- Performance analytics
- Client targeting

### 4. KYC Panel (new)
- Document upload and verification
- Status tracking
- Third-party API integration
- Audit logging

### 5. Compliance Dashboard (new)
- SEBI compliance monitoring
- Audit trail management
- Reporting tools
- Risk assessment

## Security and Compliance Features

### 1. Enhanced Security Components
- Client data encryption display
- Secure document handling
- Authentication for financial data
- Role-based access controls

### 2. Compliance Tracking
- Audit log visualization
- SEBI regulation compliance indicators
- Document retention management
- Risk assessment tools

## User Experience Changes

### 1. Client Journey
- Simplified onboarding flow
- Transparent fee structure
- Clear subscription options
- Easy access to research

### 2. Advisor Workflow
- Streamlined client management
- Efficient signal distribution
- Performance tracking
- Research tools integration

## API Service Layer Updates

### 1. New Service Endpoints
- KYC verification service
- E-signature integration
- Payment processing
- Signal scheduling
- Communication hub

### 2. Updated Data Models
- Client financial data
- Portfolio information
- Subscription details
- Advisory agreements
- Compliance records

## Mobile Responsiveness
- All components remain mobile-compatible
- Responsive design for financial data
- Mobile-optimized advisor tools
- Client mobile experience

## Internationalization
- Financial terminology in appropriate language
- Currency display and formatting
- Regional compliance requirements
- Local payment methods

## Accessibility
- Financial data accessibility
- Screen reader compatibility
- Color contrast for financial charts
- Keyboard navigation for trading interfaces

This architecture ensures a complete transformation from the healthcare-focused HMS to the investment advisory-focused AdvisorX CRM while maintaining the core technical excellence of the existing system.