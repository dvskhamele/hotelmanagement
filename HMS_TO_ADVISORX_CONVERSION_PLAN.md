# HMS to AdvisorX CRM Conversion Plan (Galaxy Research)

## Overview
Converting the SuperHealth Hospital Management System to AdvisorX CRM for Galaxy Research - a SEBI-compliant stock advisory platform.

## Module Conversion Mapping

### ✅ Modules to Convert

| HMS Module | AdvisorX CRM Equivalent | Changes Required |
|------------|-------------------------|------------------|
| SuperHealth | AdvisorX Core | Rebrand as main CRM engine |
| Dashboard | AdvisorX Dashboard | Show: Client KYC status, Subscriptions, Signals Sent, Revenue, Compliance Logs |
| Patients | Clients/Investors | Replace medical details with KYC info: PAN, Aadhaar, Bank Proof, eSign Agreements, Subscription Plan |
| Requests | KYC Requests / Subscription Requests | Track pending KYC verifications and subscription changes |
| Staff | Employees (Research Analysts / Admins) | Internal users who manage signals, verify KYC, handle invoices |
| Doctors | Advisors (SEBI RAs) | Assign advisors to client groups for signals/research |
| Insurance | Contracts & Compliance | Store signed advisory agreements (via eSign API) |
| VIP | Premium Subscribers | Special handling for high-value clients |
| Reception | Client Onboarding | OTP login + Initial KYC submission |
| Schedules | Signals Scheduler | Schedule stock tips (e.g., daily at 9:15am) |
| Reports | Research Reports / Compliance Reports | Upload/share market research PDFs, Auto-generate compliance/KYC audit logs |
| Patient Mgmt | Client Management | Lifecycle: Onboarding → KYC → Subscription → Signals → Renewal |
| Admin User | Admin Control Panel | Manage employees, clients, subscriptions, billing, compliance |
| Beds | Client Accommodation Management | Convert to client portfolio management |
| Wards | Client Group Management | Convert to client segment management |

### ❌ Modules to Remove

| HMS Module | Action | Reason |
|------------|--------|---------|
| Rooms | REMOVE | Not needed in advisory CRM |
| Emergency | REMOVE | Not needed in advisory CRM |
| Operations | REMOVE | Not needed in advisory CRM |
| Pharmacy | REMOVE | Not needed in advisory CRM |
| Ambulance | REMOVE | Not needed in advisory CRM |
| Canteen | REMOVE | Not needed in advisory CRM |
| Beds | REMOVE (after conversion to portfolio) | Not needed as hospital beds |

### 🚀 New Modules to Add

| New Module | Functionality | Technical Requirements |
|------------|---------------|------------------------|
| KYC Panel | Integrate with Karza/Signzy APIs for Aadhaar/PAN verification | Aadhaar/PAN verification APIs |
| E-Sign Module | Digio eSign API (Aadhaar OTP) - store signed PDFs | eSign API integration |
| Invoicing & Payments | Razorpay/Zoho Books integration - auto-generate invoices on subscription payments | Payment gateway APIs |
| Messaging Hub | WhatsApp Business API (Gupshup/Twilio) + Telegram Bot API for advisory signals | Messaging APIs |
| Subscription Management | Plans (Basic, Premium, VIP) - auto-renewals + expiry handling | Subscription management system |

### 🔒 Compliance Requirements

| Requirement | Implementation | Priority |
|-------------|----------------|----------|
| Encrypt all stored KYC data | Implement data encryption at rest | High |
| Store audit logs of KYC & eSign | Comprehensive audit logging | High |
| Host on India-based servers | Ensure data residency in India for SEBI | Critical |
| SEBI RIA compliance | Ensure Research Analyst registration compliance | Critical |
| GDPR compliance | For any international clients | Medium |

## Implementation Strategy

### Phase 1: Core Data Structure Conversion
1. Update `data.json` structure to support:
   - Client records instead of patient records
   - Research Analysts instead of doctors
   - Client portfolios instead of medical records
   - KYC requests instead of medical requests
   - Compliance records instead of medical inventory

### Phase 2: Backend API Conversion
1. Update all API endpoints to handle financial data:
   - `/api/clients` instead of `/api/patients`
   - `/api/kyc-requests` instead of `/api/requests`
   - `/api/advisors` instead of `/api/doctors`
   - Update authentication for financial advisor roles
   - Implement financial-specific business logic

### Phase 3: Frontend UI Conversion
1. Update all components to reflect financial terminology:
   - Dashboard to show client metrics instead of patient metrics
   - Navigation to reflect client advisory workflows
   - Forms to collect financial information (KYC)
   - Client management screens
   - Research report management screens

### Phase 4: New Feature Implementation
1. Implement Client Management System:
   - Client registration and demographics
   - KYC management
   - Subscription management
   - Portfolio tracking
   - Client-advisor assignment

2. Implement Research & Signals System:
   - Signal scheduling
   - Research report publishing
   - Client communication tools
   - Subscription-based access control

3. Implement KYC & Compliance System:
   - API integration for Aadhaar/PAN verification
   - eSign integration
   - Compliance audit logging
   - Document management

### Phase 5: Testing and Validation
1. Test all converted functionality
2. Ensure data consistency
3. Validate security and compliance requirements
4. User acceptance testing
5. SEBI compliance verification

## Technical Approach

### Backend Conversion
- Update server.js to support new data models
- Create new API endpoints for financial functionality
- Preserve existing architecture patterns
- Maintain real-time capabilities

### Frontend Conversion
- Update Next.js components to financial terminology
- Preserve responsive design and PWA functionality
- Update charts and analytics for financial metrics
- Maintain mobile compatibility

### Data Migration
- Convert existing sample data to financial context
- Update data validation rules for financial requirements
- Implement necessary compliance measures