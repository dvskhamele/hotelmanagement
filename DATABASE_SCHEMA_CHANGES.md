# Database Schema Changes for AdvisorX CRM

## Current Data Structure (from data.json)
The current system has these main entities:
- users (staff/admins)
- rooms
- guests
- departments
- requestStatuses
- priorities
- roomStatuses
- requests

## New CRM Data Structure

### 1. Clients/Investors Table
**Converted from**: patients/guests table
```javascript
{
  id: int,
  name: string,
  email: string,
  phone: string,
  pan_number: string,
  aadhaar_number: string,
  bank_details: {
    account_number: string,
    ifsc_code: string,
    bank_name: string
  },
  kyc_status: enum('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED'),
  subscription_plan: enum('BASIC', 'PREMIUM', 'VIP'),
  subscription_start_date: date,
  subscription_end_date: date,
  portfolio_value: decimal,
  risk_profile: enum('CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'),
  investment_goals: string,
  created_at: date,
  updated_at: date
}
```

### 2. Advisors Table
**Converted from**: doctors table
```javascript
{
  id: int,
  name: string,
  email: string,
  phone: string,
  sebi_registration_number: string,
  sebi_registration_expiry: date,
  specialization: string,
  rating: decimal,
  clients_assigned: int,
  status: enum('ACTIVE', 'INACTIVE', 'SUSPENDED'),
  created_at: date,
  updated_at: date
}
```

### 3. KYC Requests Table
**Converted from**: requests table
```javascript
{
  id: int,
  client_id: int,
  document_type: enum('AADHAAR', 'PAN', 'BANK_STATEMENT', 'ADDRESS_PROOF', 'INCOME_PROOF'),
  document_url: string,
  verification_status: enum('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED'),
  verified_by: int (advisor_id),
  verification_date: date,
  remarks: string,
  created_at: date,
  updated_at: date
}
```

### 4. Subscription Plans Table
**New table**
```javascript
{
  id: int,
  name: string (BASIC, PREMIUM, VIP),
  description: string,
  monthly_price: decimal,
  annual_price: decimal,
  features: array of strings,
  signal_frequency: enum('DAILY', 'WEEKLY', 'BI-WEEKLY', 'MONTHLY'),
  research_reports_access: boolean,
  advisory_calls: int,
  created_at: date,
  updated_at: date
}
```

### 5. Subscriptions Table
**New table**
```javascript
{
  id: int,
  client_id: int,
  plan_id: int,
  start_date: date,
  end_date: date,
  status: enum('ACTIVE', 'EXPIRED', 'CANCELLED', 'SUSPENDED'),
  payment_id: string,
  amount_paid: decimal,
  payment_status: enum('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
  auto_renew: boolean,
  created_at: date,
  updated_at: date
}
```

### 6. Signals Table
**New table**
```javascript
{
  id: int,
  advisor_id: int,
  title: string,
  content: text,
  stock_symbol: string,
  target_price: decimal,
  stop_loss: decimal,
  recommendation_type: enum('BUY', 'SELL', 'HOLD'),
  priority: enum('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
  delivery_channel: enum('WHATSAPP', 'TELEGRAM', 'EMAIL', 'SMS'),
  scheduled_time: datetime,
  sent_at: datetime,
  status: enum('DRAFT', 'SCHEDULED', 'SENT', 'CANCELLED'),
  client_segment: enum('ALL', 'PREMIUM', 'VIP', 'CUSTOM'),
  created_at: date,
  updated_at: date
}
```

### 7. Client Signals Table
**New table** (junction table for client-signal relationship)
```javascript
{
  id: int,
  client_id: int,
  signal_id: int,
  sent_at: datetime,
  opened_at: datetime,
  action_taken: enum('NONE', 'BUY', 'SELL', 'HOLD'),
  action_date: date,
  created_at: date,
  updated_at: date
}
```

### 8. Research Reports Table
**New table**
```javascript
{
  id: int,
  title: string,
  summary: text,
  content: text,
  report_type: enum('MARKET_UPDATE', 'STOCK_ANALYSIS', 'SECTOR_REPORT', 'QUARTERLY_REVIEW'),
  author_id: int (advisor_id),
  publish_date: date,
  access_level: enum('ALL', 'PREMIUM', 'VIP'),
  file_url: string,
  status: enum('DRAFT', 'PUBLISHED', 'ARCHIVED'),
  tags: array of strings,
  created_at: date,
  updated_at: date
}
```

### 9. Client Advisory Agreements Table
**New table** (replaces insurance contracts)
```javascript
{
  id: int,
  client_id: int,
  advisor_id: int,
  agreement_template: string,
  signed_document_url: string,
  signature_status: enum('PENDING', 'SIGNED', 'EXPIRED'),
  signature_request_date: date,
  signed_date: date,
  e_sign_transaction_id: string,
  expiry_date: date,
  created_at: date,
  updated_at: date
}
```

### 10. Compliance Logs Table
**New table**
```javascript
{
  id: int,
  entity_type: enum('CLIENT', 'ADVISOR', 'SIGNAL', 'TRANSACTION', 'KYC', 'AGREEMENT'),
  entity_id: int,
  action: string,
  user_id: int,
  ip_address: string,
  user_agent: string,
  details: text,
  created_at: date
}
```

### 11. Messaging Logs Table
**New table**
```javascript
{
  id: int,
  client_id: int,
  signal_id: int,
  channel: enum('WHATSAPP', 'TELEGRAM', 'EMAIL', 'SMS'),
  message_id: string,
  content: text,
  status: enum('QUEUED', 'SENT', 'DELIVERED', 'FAILED'),
  sent_at: datetime,
  delivered_at: datetime,
  error_message: string,
  created_at: date
}
```

### 12. Client Portfolios Table
**New table**
```javascript
{
  id: int,
  client_id: int,
  stock_symbol: string,
  quantity: int,
  purchase_price: decimal,
  current_price: decimal,
  purchase_date: date,
  created_at: date,
  updated_at: date
}
```

## Modified Existing Tables

### Updated Users Table (Employees)
**Converted from**: existing users table
```javascript
{
  id: int,
  email: string,
  password: string,
  name: string,
  role: enum('ADMIN', 'RESEARCH_ANALYST', 'COMPLIANCE_OFFICER', 'SUPPORT_STAFF'),
  department: string,
  sebi_registration_number: string (for research analysts),
  status: enum('ACTIVE', 'INACTIVE'),
  created_at: date,
  updated_at: date
}
```

## Migration Strategy

### Phase 1: Create new tables
- Create all new CRM-specific tables
- Preserve existing tables during transition

### Phase 2: Data transformation
- Migrate guest/patient data to clients table
- Migrate doctor data to advisors table
- Migrate request data to kyc_requests table

### Phase 3: Update relationships
- Update foreign key relationships
- Update API endpoints to use new tables
- Update frontend components to use new data structure

### Phase 4: Cleanup
- Remove obsolete medical-specific fields
- Optimize indexes for financial data queries
- Add compliance and audit fields where needed