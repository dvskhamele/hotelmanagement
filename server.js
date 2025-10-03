const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'backend/src/data.json');

// Import hospital models
const {
  Patient,
  Bed,
  Ward,
  Doctor,
  Nurse,
  Appointment,
  Prescription,
  Medicine,
  Department,
  VisitorPass,
  Ambulance,
  Operation,
  Checkup,
  Insurance,
  Canteen,
  EmergencyCase,
  WaitingList,
  Report,
  Schedule
} = require('./backend/src/hospital-models');

// Initialize data storage
let data = {
  users: [],
  patients: [],
  beds: [],
  wards: [],
  doctors: [],
  nurses: [],
  appointments: [],
  prescriptions: [],
  medicines: [],
  departments: [],
  rooms: [],
  staff: [],
  requests: [],
  inventory: [],
  activity: [],
  passes: [],
  ambulances: [],
  operations: [],
  checkups: [],
  insurance: [],
  canteen: [],
  emergency_cases: [],
  waiting_list: [],
  reports: [],
  schedules: []
};

// Load data from file or initialize with sample data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      data = JSON.parse(fileData);
    } else {
      // Initialize with comprehensive sample hospital data
      data = {
        users: [
          {
            id: 1,
            email: 'admin@hospitalops.com',
            password: 'password123',
            name: 'Admin User',
            role: 'ADMIN'
          },
          {
            id: 2,
            email: 'reception@hospitalops.com',
            password: 'password123',
            name: 'Reception Staff',
            role: 'RECEPTION'
          },
          {
            id: 3,
            email: 'doctor@hospitalops.com',
            password: 'password123',
            name: 'Dr. John Smith',
            role: 'DOCTOR'
          }
        ],
        patients: [
          {
            id: 1,
            patientId: 'PT001',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1985-05-15',
            gender: 'Male',
            contactNumber: '+1234567890',
            email: 'john.doe@example.com',
            address: '123 Main St, City, State',
            emergencyContact: '+1234567891',
            bloodType: 'O+',
            medicalHistory: ['Hypertension', 'Diabetes'],
            insuranceId: 1,
            admissionDate: '2023-09-28T10:00:00.000Z',
            dischargeDate: null,
            wardId: 1,
            bedId: 1,
            doctorId: 1,
            status: 'active',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            patientId: 'PT002',
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfBirth: '1990-08-22',
            gender: 'Female',
            contactNumber: '+1234567892',
            email: 'jane.smith@example.com',
            address: '456 Oak Ave, City, State',
            emergencyContact: '+1234567893',
            bloodType: 'A+',
            medicalHistory: [],
            insuranceId: 2,
            admissionDate: '2023-09-28T11:00:00.000Z',
            dischargeDate: null,
            wardId: 2,
            bedId: 2,
            doctorId: 2,
            status: 'active',
            createdAt: '2023-09-28T11:00:00.000Z',
            updatedAt: '2023-09-28T11:00:00.000Z'
          }
        ],
        beds: [
          {
            id: 1,
            bedNumber: 'B001',
            wardId: 1,
            floor: 1,
            roomNumber: '101',
            bedType: 'general',
            status: 'occupied',
            patientId: 1,
            rate: 100,
            features: ['Oxygen', 'IV Stand'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            bedNumber: 'B002',
            wardId: 1,
            floor: 1,
            roomNumber: '101',
            bedType: 'general',
            status: 'occupied',
            patientId: 2,
            rate: 100,
            features: ['Oxygen', 'IV Stand'],
            createdAt: '2023-09-28T11:00:00.000Z',
            updatedAt: '2023-09-28T11:00:00.000Z'
          },
          {
            id: 3,
            bedNumber: 'B003',
            wardId: 1,
            floor: 1,
            roomNumber: '101',
            bedType: 'general',
            status: 'available',
            patientId: null,
            rate: 100,
            features: ['Oxygen', 'IV Stand'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        wards: [
          {
            id: 1,
            name: 'General Ward A',
            type: 'general',
            floor: 1,
            capacity: 30,
            occupiedBeds: 2,
            availableBeds: 28,
            nurseInCharge: 1,
            doctorInCharge: 1,
            rate: 100,
            status: 'active',
            features: ['Oxygen Supply', 'Nursing Station'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            name: 'ICU',
            type: 'icu',
            floor: 2,
            capacity: 10,
            occupiedBeds: 0,
            availableBeds: 10,
            nurseInCharge: 2,
            doctorInCharge: 2,
            rate: 500,
            status: 'active',
            features: ['Ventilators', 'Monitoring Equipment'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 3,
            name: 'Emergency Ward',
            type: 'emergency',
            floor: 1,
            capacity: 20,
            occupiedBeds: 0,
            availableBeds: 20,
            nurseInCharge: 3,
            doctorInCharge: 3,
            rate: 150,
            status: 'active',
            features: ['Emergency Equipment', 'Resuscitation Unit'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        doctors: [
          {
            id: 1,
            name: 'Dr. Alice Johnson',
            doctorId: 'DOC001',
            licenseNumber: 'LIC001',
            departmentId: 1,
            specialization: 'Cardiology',
            qualification: 'MD, DM Cardiology',
            experience: 10,
            contactNumber: '+1234567895',
            email: 'alice.johnson@hospitalops.com',
            schedule: {
              monday: { start: '09:00', end: '17:00', active: true },
              tuesday: { start: '09:00', end: '17:00', active: true },
              wednesday: { start: '09:00', end: '17:00', active: true },
              thursday: { start: '09:00', end: '17:00', active: true },
              friday: { start: '09:00', end: '17:00', active: true },
              saturday: { start: '09:00', end: '13:00', active: true },
              sunday: { start: '09:00', end: '13:00', active: false }
            },
            status: 'active',
            rating: 4.5,
            successRate: 95,
            operationsPerformed: 120,
            patientsTreated: 850,
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            name: 'Dr. Bob Smith',
            doctorId: 'DOC002',
            licenseNumber: 'LIC002',
            departmentId: 2,
            specialization: 'General Medicine',
            qualification: 'MD, DM Medicine',
            experience: 8,
            contactNumber: '+1234567896',
            email: 'bob.smith@hospitalops.com',
            schedule: {
              monday: { start: '09:00', end: '17:00', active: true },
              tuesday: { start: '09:00', end: '17:00', active: true },
              wednesday: { start: '09:00', end: '17:00', active: true },
              thursday: { start: '09:00', end: '17:00', active: true },
              friday: { start: '09:00', end: '17:00', active: true },
              saturday: { start: '09:00', end: '13:00', active: true },
              sunday: { start: '09:00', end: '13:00', active: false }
            },
            status: 'active',
            rating: 4.7,
            successRate: 93,
            operationsPerformed: 95,
            patientsTreated: 720,
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        nurses: [
          {
            id: 1,
            name: 'Nurse Carol Davis',
            nurseId: 'NUR001',
            licenseNumber: 'NUR001',
            departmentId: 1,
            qualification: 'B.Sc Nursing',
            experience: 5,
            contactNumber: '+1234567897',
            email: 'carol.davis@hospitalops.com',
            schedule: {
              monday: { start: '09:00', end: '17:00', active: true },
              tuesday: { start: '09:00', end: '17:00', active: true },
              wednesday: { start: '09:00', end: '17:00', active: true },
              thursday: { start: '09:00', end: '17:00', active: true },
              friday: { start: '09:00', end: '17:00', active: true },
              saturday: { start: '09:00', end: '13:00', active: true },
              sunday: { start: '09:00', end: '13:00', active: false }
            },
            status: 'active',
            patientsAssigned: [1],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            name: 'Nurse Emma Wilson',
            nurseId: 'NUR002',
            licenseNumber: 'NUR002',
            departmentId: 2,
            qualification: 'B.Sc Nursing',
            experience: 3,
            contactNumber: '+1234567898',
            email: 'emma.wilson@hospitalops.com',
            schedule: {
              monday: { start: '09:00', end: '17:00', active: true },
              tuesday: { start: '09:00', end: '17:00', active: true },
              wednesday: { start: '09:00', end: '17:00', active: true },
              thursday: { start: '09:00', end: '17:00', active: true },
              friday: { start: '09:00', end: '17:00', active: true },
              saturday: { start: '09:00', end: '13:00', active: true },
              sunday: { start: '09:00', end: '13:00', active: false }
            },
            status: 'active',
            patientsAssigned: [2],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        appointments: [
          {
            id: 1,
            appointmentId: 'APT001',
            patientId: 1,
            doctorId: 1,
            scheduledDate: '2023-09-30',
            scheduledTime: '10:00',
            duration: 30,
            status: 'scheduled',
            type: 'checkup',
            notes: 'Follow up for hypertension',
            reason: 'Regular checkup',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        prescriptions: [
          {
            id: 1,
            prescriptionId: 'RX001',
            patientId: 1,
            doctorId: 1,
            appointmentId: 1,
            medicines: [
              {
                medicineId: 1,
                name: 'Amlodipine',
                dosage: '5mg',
                frequency: 'once daily',
                duration: '30 days',
                remarks: 'After meals'
              }
            ],
            totalCost: 25.50,
            status: 'active',
            issuedDate: '2023-09-28T10:00:00.000Z',
            expiryDate: '2023-10-28T10:00:00.000Z',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        medicines: [
          {
            id: 1,
            name: 'Amlodipine',
            brand: 'Amlovas',
            manufacturer: 'Pharma Co.',
            batchNumber: 'BATCH001',
            expiryDate: '2024-12-31',
            category: 'cardiac',
            type: 'tablet',
            unit: 'pcs',
            rate: 0.85,
            stock: 500,
            minStock: 100,
            supplier: 'Med Supply Inc.',
            prescriptionRequired: true,
            sideEffects: ['Dizziness', 'Swelling'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        departments: [
          {
            id: 1,
            name: 'Cardiology',
            code: 'CARD',
            headDoctorId: 1,
            headDoctorName: 'Dr. Alice Johnson',
            floor: 2,
            contactNumber: '+1234567899',
            email: 'cardiology@hospitalops.com',
            description: 'Heart and cardiovascular treatment',
            services: ['ECG', 'Echocardiography', 'Stress Test'],
            staffCount: 8,
            active: true,
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          },
          {
            id: 2,
            name: 'General Medicine',
            code: 'GMED',
            headDoctorId: 2,
            headDoctorName: 'Dr. Bob Smith',
            floor: 1,
            contactNumber: '+1234567900',
            email: 'general@hospitalops.com',
            description: 'General medical treatment',
            services: ['Checkup', 'Consultation', 'Vaccination'],
            staffCount: 12,
            active: true,
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        rooms: [
          { id: 1, number: '101', floor: 1, type: 'General Ward', status: 'occupied', updatedAt: '2023-09-28T10:00:00.000Z' },
          { id: 2, number: '102', floor: 1, type: 'General Ward', status: 'occupied', updatedAt: '2023-09-28T11:00:00.000Z' },
          { id: 3, number: '103', floor: 1, type: 'General Ward', status: 'available', updatedAt: '2023-09-28T09:00:00.000Z' }
        ],
        staff: [
          { id: 1, name: 'John Receptionist', department: 'Reception', position: 'Front Desk', status: 'Active', email: 'john.reception@hospitalops.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM' },
          { id: 2, name: 'Sarah Nurse', department: 'Nursing', position: 'Staff Nurse', status: 'Active', email: 'sarah.nurse@hospitalops.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 87, schedule: '9:00 AM - 5:00 PM' },
          { id: 3, name: 'Mike Technician', department: 'Laboratory', position: 'Lab Technician', status: 'Active', email: 'mike.tech@hospitalops.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 95, schedule: '9:00 AM - 5:00 PM' }
        ],
        requests: [
          { id: 1, guestName: 'John Doe', roomNumber: '101', title: 'Pain medication', department: 'Pharmacy', priority: 'HIGH', status: 'PENDING', createdAt: '2023-09-28T12:30:00.000Z' },
          { id: 2, guestName: 'Jane Smith', roomNumber: '102', title: 'Lab test - Complete Blood Count', department: 'Laboratory', priority: 'MEDIUM', status: 'IN_PROGRESS', createdAt: '2023-09-28T09:30:00.000Z' }
        ],
        inventory: [
          { id: 1, name: 'Surgical Masks', category: 'Medical Supplies', quantity: 1500, minStock: 500, supplier: 'Medical Supply Co.', price: 0.50, lastOrdered: '2023-08-15' },
          { id: 2, name: 'N95 Respirators', category: 'Medical Supplies', quantity: 850, minStock: 300, supplier: 'Healthcare Essentials', price: 2.50, lastOrdered: '2023-08-20' },
          { id: 3, name: 'Syringes 10ml', category: 'Medical Equipment', quantity: 1200, minStock: 400, supplier: 'MediTech Supply', price: 0.75, lastOrdered: '2023-09-01' }
        ],
        activity: [
          { id: 1, type: 'patient', title: 'New patient admitted', description: 'John Doe admitted to General Ward A', timestamp: '2023-09-28T10:00:00.000Z', status: 'admitted' },
          { id: 2, type: 'appointment', title: 'Appointment scheduled', description: 'John Doe - Cardiology checkup', timestamp: '2023-09-28T11:00:00.000Z', status: 'scheduled' },
          { id: 3, type: 'prescription', title: 'Prescription created', description: 'Dr. Alice Johnson prescribed medication for John Doe', timestamp: '2023-09-28T12:00:00.000Z', status: 'created' }
        ],
        passes: [
          {
            id: 1,
            passNumber: 'VP001',
            visitorName: 'James Doe',
            visitorId: 'ID123456',
            visitorContact: '+1234567890',
            visitorAddress: '123 Main St, City, State',
            relationship: 'Brother',
            patientId: 1,
            patientName: 'John Doe',
            purpose: 'visit',
            ward: 'General Ward A',
            roomNumber: '101',
            issuedBy: 1,
            issuedAt: '2023-09-28T12:00:00.000Z',
            validFrom: '2023-09-28T12:00:00.000Z',
            validTo: '2023-09-28T18:00:00.000Z',
            status: 'active',
            entryTime: '2023-09-28T12:15:00.000Z',
            exitTime: null,
            createdAt: '2023-09-28T12:00:00.000Z',
            updatedAt: '2023-09-28T12:00:00.000Z'
          }
        ],
        ambulances: [
          {
            id: 1,
            vehicleNumber: 'AMB-001',
            type: 'advanced',
            capacity: 2,
            status: 'available',
            driverId: null,
            paramedicId: null,
            lastService: '2023-08-15T00:00:00.000Z',
            insuranceExpiry: '2024-12-31T00:00:00.000Z',
            registrationExpiry: '2024-06-30T00:00:00.000Z',
            location: {
              latitude: 40.7128,
              longitude: -74.0060,
              lastUpdated: '2023-09-28T10:00:00.000Z'
            },
            equipment: ['Defibrillator', 'Oxygen Tank', 'Stretcher'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        operations: [
          {
            id: 1,
            operationId: 'OP001',
            patientId: 1,
            doctorId: 1,
            assistantDoctorId: 2,
            anesthetistId: 3,
            nurseId: 1,
            operationTheaterId: 1,
            scheduledDate: '2023-10-05',
            scheduledTime: '09:00',
            duration: 120,
            type: 'Cardiac Surgery',
            status: 'scheduled',
            remarks: 'Elective cardiac procedure',
            preOperationNotes: 'Patient stable, all tests normal',
            postOperationNotes: '',
            success: null,
            outcome: '',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        checkups: [
          {
            id: 1,
            checkupId: 'CHK001',
            patientId: 1,
            doctorId: 1,
            appointmentId: 1,
            date: '2023-09-28',
            time: '10:30',
            type: 'general',
            symptoms: ['Chest pain', 'Shortness of breath'],
            diagnosis: 'Hypertension',
            vitalSigns: {
              temperature: 98.6,
              bloodPressure: '140/90',
              pulse: 78,
              weight: 75,
              height: 175,
              respiratoryRate: 18,
              oxygenSaturation: 98
            },
            notes: 'Patient responding well to medication',
            recommendations: 'Continue current medication',
            followUpRequired: true,
            followUpDate: '2023-10-28',
            status: 'completed',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        insurance: [
          {
            id: 1,
            policyNumber: 'POL001',
            provider: 'HealthPlus Insurance',
            patientId: 1,
            holderName: 'John Doe',
            relationship: 'self',
            startDate: '2023-01-01T00:00:00.000Z',
            endDate: '2023-12-31T00:00:00.000Z',
            coverage: 80,
            maxCoverage: 100000,
            claimAmount: 0,
            remainingAmount: 100000,
            status: 'active',
            documents: ['policy.pdf'],
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        canteen: [
          {
            id: 1,
            name: 'Main Canteen',
            type: 'general',
            menu: [
              {
                itemId: 'M001',
                name: 'Vegetable Biryani',
                category: 'main',
                price: 150,
                available: true,
                description: 'Delicious vegetable biryani with spices'
              },
              {
                itemId: 'M002',
                name: 'Chicken Soup',
                category: 'soup',
                price: 100,
                available: true,
                description: 'Hot and nutritious chicken soup'
              }
            ],
            operatingHours: {
              breakfast: { start: '07:00', end: '10:00' },
              lunch: { start: '12:00', end: '15:00' },
              dinner: { start: '18:00', end: '21:00' }
            },
            status: 'open',
            staffId: 1,
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ],
        emergency_cases: [
          {
            id: 1,
            caseId: 'EMG001',
            patientId: null,
            patientName: 'Unknown Patient',
            arrivalTime: '2023-09-28T14:30:00.000Z',
            condition: 'critical',
            priority: 'high',
            attendingDoctorId: 3,
            triageNurseId: 1,
            location: 'Emergency Room 1',
            status: 'in-progress',
            symptoms: ['Severe chest pain', 'Breathing difficulty'],
            preliminaryDiagnosis: 'Possible heart attack',
            treatmentStarted: true,
            treatmentNotes: 'Administered oxygen, ECG performed',
            outcome: 'pending',
            createdAt: '2023-09-28T14:30:00.000Z',
            updatedAt: '2023-09-28T14:30:00.000Z'
          }
        ],
        waiting_list: [
          {
            id: 1,
            patientId: 2,
            doctorId: 1,
            departmentId: 1,
            priority: 'normal',
            reason: 'Regular checkup',
            waitTime: 0,
            status: 'waiting',
            estimatedWaitTime: 30,
            position: 3,
            addedAt: '2023-09-28T15:00:00.000Z',
            calledAt: null,
            servedAt: null,
            createdAt: '2023-09-28T15:00:00.000Z',
            updatedAt: '2023-09-28T15:00:00.000Z'
          }
        ],
        reports: [
          {
            id: 1,
            reportId: 'RPT001',
            type: 'daily',
            departmentId: 1,
            doctorId: 1,
            title: 'Daily Patient Report',
            content: 'Total patients: 12, New admissions: 2, Discharges: 1',
            generatedBy: 1,
            generatedAt: '2023-09-28T18:00:00.000Z',
            data: {
              totalPatients: 12,
              newAdmissions: 2,
              discharges: 1,
              revenue: 15000
            },
            period: {
              from: '2023-09-27T00:00:00.000Z',
              to: '2023-09-27T23:59:59.000Z'
            },
            status: 'generated',
            createdAt: '2023-09-28T18:00:00.000Z',
            updatedAt: '2023-09-28T18:00:00.000Z'
          }
        ],
        schedules: [
          {
            id: 1,
            staffId: 1,
            staffType: 'doctor',
            date: '2023-09-29T00:00:00.000Z',
            shifts: [
              {
                shiftId: 'S001',
                startTime: '09:00',
                endTime: '17:00',
                status: 'scheduled',
                breakTime: '12:00-12:30'
              }
            ],
            status: 'active',
            notes: 'Regular shift',
            createdAt: '2023-09-28T10:00:00.000Z',
            updatedAt: '2023-09-28T10:00:00.000Z'
          }
        ]
      };
      saveData();
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Save data to file
function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Load data on startup
loadData();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'SuperHealth Hospital Management API' });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // For prototype, we'll be more flexible with login
  // In a real app, you would hash passwords and use proper authentication
  const user = data.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token: 'fake-jwt-token'
    });
  } else {
    // For prototype, we'll be more permissive and allow login with any credentials
    // Create a user if one doesn't exist
    res.json({
      user: {
        id: Math.floor(Math.random() * 1000),
        email: email,
        name: email.split('@')[0],
        role: 'DOCTOR'
      },
      token: 'fake-jwt-token'
    });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', (req, res) => {
  const stats = {
    // Patient stats
    totalPatients: data.patients.length,
    activePatients: data.patients.filter(p => p.status === 'active').length,
    inpatients: data.patients.filter(p => p.wardId !== null).length,
    
    // Bed stats
    totalBeds: data.beds.length,
    occupiedBeds: data.beds.filter(b => b.status === 'occupied').length,
    availableBeds: data.beds.filter(b => b.status === 'available').length,
    
    // Ward stats
    totalWards: data.wards.length,
    occupiedWards: data.wards.filter(w => w.occupiedBeds > 0).length,
    
    // Staff stats
    totalDoctors: data.doctors.length,
    activeDoctors: data.doctors.filter(d => d.status === 'active').length,
    totalNurses: data.nurses.length,
    activeNurses: data.nurses.filter(n => n.status === 'active').length,
    
    // Appointment stats
    appointmentsToday: data.appointments.filter(a => a.scheduledDate === new Date().toISOString().split('T')[0]).length,
    pendingAppointments: data.appointments.filter(a => a.status === 'scheduled').length,
    
    // Revenue and financial stats
    dailyRevenue: 12500,
    pendingBills: 8500,
    
    // Operation stats
    operationsToday: data.operations.filter(o => o.scheduledDate === new Date().toISOString().split('T')[0]).length,
    
    // Emergency stats
    emergencyCases: data.emergency_cases.filter(e => e.status === 'pending' || e.status === 'in-progress').length,
    
    patientSatisfaction: 94
  };
  
  res.json(stats);
});

app.get('/api/dashboard/activity', (req, res) => {
  // Return recent activity (last 10 items)
  const recentActivity = data.activity.slice(-10).reverse();
  res.json(recentActivity);
});

// Patients routes
app.get('/api/patients', (req, res) => {
  res.json(data.patients);
});

app.get('/api/patients/:id', (req, res) => {
  const patientId = parseInt(req.params.id);
  const patient = data.patients.find(p => p.id === patientId);
  
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

app.post('/api/patients', (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, contactNumber, email, address, emergencyContact, bloodType } = req.body;
  
  const newPatient = {
    id: data.patients.length > 0 ? Math.max(...data.patients.map(p => p.id)) + 1 : 1,
    patientId: 'PT' + String(data.patients.length + 1).padStart(3, '0'),
    firstName,
    lastName,
    dateOfBirth,
    gender,
    contactNumber,
    email,
    address,
    emergencyContact,
    bloodType,
    medicalHistory: [],
    insuranceId: null,
    admissionDate: new Date().toISOString(),
    dischargeDate: null,
    wardId: null,
    bedId: null,
    doctorId: null,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.patients.push(newPatient);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'patient',
    title: 'New patient registered',
    description: `${newPatient.firstName} ${newPatient.lastName} registered`,
    timestamp: new Date().toISOString(),
    status: 'registered'
  };
  data.activity.push(activity);
  
  saveData();
  res.json(newPatient);
});

// Beds routes
app.get('/api/beds', (req, res) => {
  res.json(data.beds);
});

app.get('/api/beds/:id', (req, res) => {
  const bedId = parseInt(req.params.id);
  const bed = data.beds.find(b => b.id === bedId);
  
  if (bed) {
    res.json(bed);
  } else {
    res.status(404).json({ error: 'Bed not found' });
  }
});

app.put('/api/beds/:id/status', (req, res) => {
  const bedId = parseInt(req.params.id);
  const { status, patientId } = req.body;
  
  const bed = data.beds.find(b => b.id === bedId);
  if (bed) {
    bed.status = status;
    bed.patientId = patientId || null;
    bed.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'bed',
      title: 'Bed status updated',
      description: `Bed ${bed.bedNumber} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(bed);
  } else {
    res.status(404).json({ error: 'Bed not found' });
  }
});

// Wards routes
app.get('/api/wards', (req, res) => {
  res.json(data.wards);
});

app.get('/api/wards/:id', (req, res) => {
  const wardId = parseInt(req.params.id);
  const ward = data.wards.find(w => w.id === wardId);
  
  if (ward) {
    res.json(ward);
  } else {
    res.status(404).json({ error: 'Ward not found' });
  }
});

// Doctors routes
app.get('/api/doctors', (req, res) => {
  res.json(data.doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = data.doctors.find(d => d.id === doctorId);
  
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

// Nurses routes
app.get('/api/nurses', (req, res) => {
  res.json(data.nurses);
});

app.get('/api/nurses/:id', (req, res) => {
  const nurseId = parseInt(req.params.id);
  const nurse = data.nurses.find(n => n.id === nurseId);
  
  if (nurse) {
    res.json(nurse);
  } else {
    res.status(404).json({ error: 'Nurse not found' });
  }
});

// Appointments routes
app.get('/api/appointments', (req, res) => {
  res.json(data.appointments);
});

app.get('/api/appointments/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const appointment = data.appointments.find(a => a.id === appointmentId);
  
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

app.post('/api/appointments', (req, res) => {
  const { patientId, doctorId, scheduledDate, scheduledTime, type, reason } = req.body;
  
  const newAppointment = {
    id: data.appointments.length > 0 ? Math.max(...data.appointments.map(a => a.id)) + 1 : 1,
    appointmentId: 'APT' + String(data.appointments.length + 1).padStart(3, '0'),
    patientId,
    doctorId,
    scheduledDate,
    scheduledTime,
    duration: 30,
    status: 'scheduled',
    type: type || 'checkup',
    notes: '',
    reason: reason || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.appointments.push(newAppointment);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'appointment',
    title: 'New appointment scheduled',
    description: `Appointment scheduled for patient ${patientId}`,
    timestamp: new Date().toISOString(),
    status: 'scheduled'
  };
  data.activity.push(activity);
  
  saveData();
  res.json(newAppointment);
});

app.put('/api/appointments/:id/status', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const { status } = req.body;
  
  const appointment = data.appointments.find(a => a.id === appointmentId);
  if (appointment) {
    appointment.status = status;
    appointment.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'appointment',
      title: `Appointment ${status}`,
      description: `Appointment ${appointment.appointmentId} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(appointment);
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

// Prescriptions routes
app.get('/api/prescriptions', (req, res) => {
  res.json(data.prescriptions);
});

app.get('/api/prescriptions/:id', (req, res) => {
  const prescriptionId = parseInt(req.params.id);
  const prescription = data.prescriptions.find(p => p.id === prescriptionId);
  
  if (prescription) {
    res.json(prescription);
  } else {
    res.status(404).json({ error: 'Prescription not found' });
  }
});

// Medicines routes
app.get('/api/medicines', (req, res) => {
  res.json(data.medicines);
});

// Departments routes
app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

// Passes (Visitor Management) routes
app.get('/api/passes', (req, res) => {
  res.json(data.passes);
});

app.post('/api/passes', (req, res) => {
  const { visitorName, visitorId, visitorContact, relationship, patientId, purpose } = req.body;
  
  // Find patient details
  const patient = data.patients.find(p => p.id === patientId);
  
  const newPass = {
    id: data.passes.length > 0 ? Math.max(...data.passes.map(p => p.id)) + 1 : 1,
    passNumber: 'VP' + String(data.passes.length + 1).padStart(3, '0'),
    visitorName,
    visitorId,
    visitorContact,
    visitorAddress: req.body.visitorAddress || '',
    relationship,
    patientId,
    patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
    purpose: purpose || 'visit',
    ward: req.body.ward || '',
    roomNumber: req.body.roomNumber || '',
    issuedBy: req.body.issuedBy || 1,
    issuedAt: new Date().toISOString(),
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    status: 'active',
    entryTime: null,
    exitTime: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.passes.push(newPass);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'pass',
    title: 'Visitor pass created',
    description: `${visitorName} granted visit pass to patient ${patientName}`,
    timestamp: new Date().toISOString(),
    status: 'created'
  };
  data.activity.push(activity);
  
  saveData();
  res.json(newPass);
});

// Ambulance routes
app.get('/api/ambulances', (req, res) => {
  res.json(data.ambulances);
});

app.put('/api/ambulances/:id/status', (req, res) => {
  const ambulanceId = parseInt(req.params.id);
  const { status } = req.body;
  
  const ambulance = data.ambulances.find(a => a.id === ambulanceId);
  if (ambulance) {
    ambulance.status = status;
    ambulance.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'ambulance',
      title: 'Ambulance status updated',
      description: `Ambulance ${ambulance.vehicleNumber} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(ambulance);
  } else {
    res.status(404).json({ error: 'Ambulance not found' });
  }
});

// Operations routes
app.get('/api/operations', (req, res) => {
  res.json(data.operations);
});

app.get('/api/operations/:id', (req, res) => {
  const operationId = parseInt(req.params.id);
  const operation = data.operations.find(o => o.id === operationId);
  
  if (operation) {
    res.json(operation);
  } else {
    res.status(404).json({ error: 'Operation not found' });
  }
});

// Checkups routes
app.get('/api/checkups', (req, res) => {
  res.json(data.checkups);
});

// Insurance routes
app.get('/api/insurance', (req, res) => {
  res.json(data.insurance);
});

// Canteen routes
app.get('/api/canteen', (req, res) => {
  res.json(data.canteen);
});

// Emergency cases routes
app.get('/api/emergency/cases', (req, res) => {
  res.json(data.emergency_cases);
});

// Waiting list routes
app.get('/api/waiting-list', (req, res) => {
  res.json(data.waiting_list);
});

// Reports routes
app.get('/api/reports', (req, res) => {
  res.json(data.reports);
});

// Schedule routes
app.get('/api/schedules', (req, res) => {
  res.json(data.schedules);
});

// General routes for remaining entities
app.get('/api/staff', (req, res) => {
  res.json(data.staff);
});

app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

app.get('/api/inventory', (req, res) => {
  res.json(data.inventory);
});

// Serve static files from the frontend build
// Handle both local development and Vercel deployment paths
const frontendPath = path.join(__dirname, 'frontend/out');

// Always serve static files from the frontend build directory
app.use(express.static(frontendPath));

// Serve frontend for all other routes (this should be last)
app.get(/(.*)/, (req, res) => {
  // For static export with Next.js, we should serve index.html for all routes
  // to let client-side routing handle the navigation
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback to API response if frontend files are not found
    res.json({ 
      message: 'SuperHealth Hospital Management API', 
      version: '1.0.0',
      description: 'This is the backend API for SuperHealth Hospital Management System.',
      available_endpoints: [
        'GET /api/dashboard/stats',
        'GET /api/dashboard/activity',
        'GET /api/patients',
        'POST /api/patients',
        'GET /api/patients/:id',
        'GET /api/beds',
        'PUT /api/beds/:id/status',
        'GET /api/wards',
        'GET /api/doctors',
        'GET /api/nurses',
        'GET /api/appointments',
        'POST /api/appointments',
        'PUT /api/appointments/:id/status',
        'GET /api/prescriptions',
        'GET /api/medicines',
        'GET /api/departments',
        'GET /api/passes',
        'POST /api/passes',
        'GET /api/ambulances',
        'PUT /api/ambulances/:id/status',
        'GET /api/operations',
        'GET /api/checkups',
        'GET /api/insurance',
        'GET /api/canteen',
        'GET /api/emergency/cases',
        'GET /api/waiting-list',
        'GET /api/reports',
        'GET /api/schedules',
        'GET /api/staff',
        'GET /api/requests',
        'GET /api/inventory'
      ]
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SuperHealth Hospital Management server running on http://localhost:${PORT}`);
});