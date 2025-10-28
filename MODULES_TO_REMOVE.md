# Modules to Remove from HMS (for AdvisorX CRM)

## Modules for Complete Removal

### 1. Rooms Module
**Location**: `/frontend/src/app/rooms`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/rooms/page.tsx`
  - `/frontend/src/app/rooms/layout.tsx` (if exists)
  - Backend API endpoints for rooms
  - Related components and services

### 2. Beds Module
**Location**: `/frontend/src/app/beds`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/beds/page.tsx`
  - Backend API endpoints for beds
  - Related data models and services

### 3. Wards Module
**Location**: `/frontend/src/app/wards`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/wards/page.tsx`
  - Backend API endpoints for wards
  - Related data models and services

### 4. Emergency Module
**Location**: `/frontend/src/app/emergency`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/emergency/page.tsx`
  - `/frontend/src/app/emergency/page.backup.tsx`
  - Backend API endpoints for emergency
  - Related components and services

### 5. Operations Module
**Location**: `/frontend/src/app/operations`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/operations/page.tsx`
  - Backend API endpoints for operations
  - Related data models and services

### 6. Pharmacy Module
**Location**: `/frontend/src/app/pharmacy`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/pharmacy/page.tsx`
  - Backend API endpoints for pharmacy
  - Related inventory and medication data models

### 7. Canteen Module
**Location**: Not explicitly found but referenced in requirements
- **Reason**: Not applicable to financial advisory business
- **Action**: Verify and remove any canteen-related files/components

### 8. Ambulance Module
**Location**: `/frontend/src/app/ambulance`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/ambulance/page.tsx`
  - Backend API endpoints for ambulance
  - Related tracking and management services

### 9. Inventory Module (Hospital-specific)
**Location**: `/frontend/src/app/inventory`
- **Reason**: While inventory exists, the medical-specific version is not applicable
- **Action**: Convert to financial document/document management system
- **Files to review**:
  - `/frontend/src/app/inventory/page.tsx`
  - Backend API endpoints for inventory
  - Related data models

### 10. Smart Rooms Module
**Location**: `/frontend/src/app/smart-rooms`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/smart-rooms/page.tsx`
  - Related IoT and automation components

### 11. Housekeeping Module
**Location**: `/frontend/src/app/housekeeping`
- **Reason**: Not applicable to financial advisory business
- **Files to remove**:
  - `/frontend/src/app/housekeeping/page.tsx`
  - Backend API endpoints for housekeeping
  - Related task management services

### 12. Guest Portal Module
**Location**: `/frontend/src/app/guest-portal`
- **Reason**: Not applicable, will be replaced with client portal
- **Action**: Remove and replace with client portal functionality
- **Files to remove**:
  - `/frontend/src/app/guest-portal/page.tsx`
  - Related guest-specific components

### 13. Guests Module
**Location**: `/frontend/src/app/guests`
- **Reason**: Not applicable, will be replaced with clients/investors
- **Files to remove**:
  - `/frontend/src/app/guests/page.tsx`
  - Backend API endpoints for guests
  - Guest-specific data models

### 14. Advanced Equipment Sections
**Location**: Various pages (especially homepage)
- **Reason**: Medical equipment sections not applicable
- **Action**: Remove medical equipment references from:
  - Homepage content
  - Feature sections referencing medical equipment
  - Technology stack items related to medical devices

## Removal Strategy

### Phase 1: Identify and List All Files
- Scan all directories for medical-specific modules
- List all files that contain medical terminology
- Identify backend API endpoints that are medical-specific

### Phase 2: Safe Removal Process
- Comment out functionality before complete removal
- Update navigation to remove references to removed modules
- Update dashboard widgets to remove medical-specific metrics
- Remove medical-specific API routes

### Phase 3: Verification
- Ensure no broken links or references remain
- Verify that core functionality remains intact
- Test navigation and routing after removals