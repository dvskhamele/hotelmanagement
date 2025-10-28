// Hospital-specific data models

// Patient model
const Patient = {
  id: 0,
  patientId: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  contactNumber: '',
  email: '',
  address: '',
  emergencyContact: '',
  bloodType: '',
  medicalHistory: [],
  insuranceId: '',
  admissionDate: '',
  dischargeDate: '',
  wardId: null,
  bedId: null,
  doctorId: null,
  status: 'active', // active, discharged, expired
  createdAt: new Date(),
  updatedAt: new Date()
};

// Bed model
const Bed = {
  id: 0,
  bedNumber: '',
  wardId: null,
  floor: 0,
  roomNumber: '',
  bedType: 'general', // general, semi-private, private, icu, emergency
  status: 'available', // available, occupied, maintenance, cleaning
  patientId: null,
  rate: 0,
  features: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Ward model
const Ward = {
  id: 0,
  name: '',
  type: 'general', // general, icu, emergency, maternity, surgery, pediatrics, cardiology
  floor: 0,
  capacity: 0,
  occupiedBeds: 0,
  availableBeds: 0,
  nurseInCharge: null,
  doctorInCharge: null,
  rate: 0,
  status: 'active',
  features: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Doctor model
const Doctor = {
  id: 0,
  name: '',
  doctorId: '',
  licenseNumber: '',
  departmentId: null,
  specialization: '',
  qualification: '',
  experience: 0, // years
  contactNumber: '',
  email: '',
  schedule: {
    monday: { start: '09:00', end: '17:00', active: true },
    tuesday: { start: '09:00', end: '17:00', active: true },
    wednesday: { start: '09:00', end: '17:00', active: true },
    thursday: { start: '09:00', end: '17:00', active: true },
    friday: { start: '09:00', end: '17:00', active: true },
    saturday: { start: '09:00', end: '13:00', active: false },
    sunday: { start: '09:00', end: '13:00', active: false }
  },
  status: 'active', // active, on-leave, suspended
  rating: 0,
  successRate: 0, // percentage
  operationsPerformed: 0,
  patientsTreated: 0,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Nurse model
const Nurse = {
  id: 0,
  name: '',
  nurseId: '',
  licenseNumber: '',
  departmentId: null,
  qualification: '',
  experience: 0,
  contactNumber: '',
  email: '',
  schedule: {
    monday: { start: '09:00', end: '17:00', active: true },
    tuesday: { start: '09:00', end: '17:00', active: true },
    wednesday: { start: '09:00', end: '17:00', active: true },
    thursday: { start: '09:00', end: '17:00', active: true },
    friday: { start: '09:00', end: '17:00', active: true },
    saturday: { start: '09:00', end: '13:00', active: false },
    sunday: { start: '09:00', end: '13:00', active: false }
  },
  status: 'active', // active, on-leave, suspended
  patientsAssigned: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Appointment model
const Appointment = {
  id: 0,
  appointmentId: '',
  patientId: null,
  doctorId: null,
  scheduledDate: '',
  scheduledTime: '',
  duration: 30, // minutes
  status: 'scheduled', // scheduled, confirmed, completed, cancelled, no-show
  type: 'checkup', // checkup, consultation, follow-up, emergency
  notes: '',
  reason: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Prescription model
const Prescription = {
  id: 0,
  prescriptionId: '',
  patientId: null,
  doctorId: null,
  appointmentId: null,
  medicines: [
    {
      medicineId: null,
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      remarks: ''
    }
  ],
  totalCost: 0,
  status: 'active', // active, fulfilled, cancelled
  issuedDate: new Date(),
  expiryDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

// Medicine model
const Medicine = {
  id: 0,
  name: '',
  brand: '',
  manufacturer: '',
  batchNumber: '',
  expiryDate: '',
  category: 'general', // general, antibiotic, painkiller, etc.
  type: 'tablet', // tablet, syrup, injection, capsule, etc.
  unit: 'pcs', // pcs, ml, mg, etc.
  rate: 0,
  stock: 0,
  minStock: 10,
  supplier: '',
  prescriptionRequired: true,
  sideEffects: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Department model
const Department = {
  id: 0,
  name: '',
  code: '',
  headDoctorId: null,
  headDoctorName: '',
  floor: 0,
  contactNumber: '',
  email: '',
  description: '',
  services: [],
  staffCount: 0,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Visitor pass model
const VisitorPass = {
  id: 0,
  passNumber: '',
  visitorName: '',
  visitorId: '',
  visitorContact: '',
  visitorAddress: '',
  relationship: '',
  patientId: null,
  patientName: '',
  purpose: 'visit', // visit, delivery, official, emergency
  ward: '',
  roomNumber: '',
  issuedBy: null,
  issuedAt: new Date(),
  validFrom: new Date(),
  validTo: new Date(),
  status: 'active', // active, expired, cancelled
  entryTime: null,
  exitTime: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Ambulance model
const Ambulance = {
  id: 0,
  vehicleNumber: '',
  type: 'basic', // basic, advanced, critical, emergency
  capacity: 2, // number of patients
  status: 'available', // available, on-duty, maintenance, out-of-service
  driverId: null,
  paramedicId: null,
  lastService: new Date(),
  insuranceExpiry: new Date(),
  registrationExpiry: new Date(),
  location: {
    latitude: 0,
    longitude: 0,
    lastUpdated: new Date()
  },
  equipment: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Operation model
const Operation = {
  id: 0,
  operationId: '',
  patientId: null,
  doctorId: null,
  assistantDoctorId: null,
  anesthetistId: null,
  nurseId: null,
  operationTheaterId: null,
  scheduledDate: new Date(),
  scheduledTime: '',
  duration: 60, // minutes
  type: '',
  status: 'scheduled', // scheduled, in-progress, completed, cancelled
  remarks: '',
  preOperationNotes: '',
  postOperationNotes: '',
  success: null, // true, false, null
  outcome: '', // description of outcome
  createdAt: new Date(),
  updatedAt: new Date()
};

// Checkup model
const Checkup = {
  id: 0,
  checkupId: '',
  patientId: null,
  doctorId: null,
  appointmentId: null,
  date: new Date(),
  time: '',
  type: 'general', // general, specialist, follow-up
  symptoms: [],
  diagnosis: '',
  vitalSigns: {
    temperature: 0,
    bloodPressure: '',
    pulse: 0,
    weight: 0,
    height: 0,
    respiratoryRate: 0,
    oxygenSaturation: 0
  },
  notes: '',
  recommendations: '',
  followUpRequired: false,
  followUpDate: null,
  status: 'completed', // pending, in-progress, completed
  createdAt: new Date(),
  updatedAt: new Date()
};

// Insurance model
const Insurance = {
  id: 0,
  policyNumber: '',
  provider: '',
  patientId: null,
  holderName: '',
  relationship: 'self', // self, spouse, child, parent
  startDate: new Date(),
  endDate: new Date(),
  coverage: 100, // percentage
  maxCoverage: 0, // amount
  claimAmount: 0,
  remainingAmount: 0,
  status: 'active', // active, expired, cancelled
  documents: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Canteen model
const Canteen = {
  id: 0,
  name: '',
  type: 'general', // patient, staff, visitor
  menu: [
    {
      itemId: '',
      name: '',
      category: 'main', // main, soup, dessert, drinks
      price: 0,
      available: true,
      description: ''
    }
  ],
  operatingHours: {
    breakfast: { start: '07:00', end: '10:00' },
    lunch: { start: '12:00', end: '15:00' },
    dinner: { start: '18:00', end: '21:00' }
  },
  status: 'open',
  staffId: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Emergency case model
const EmergencyCase = {
  id: 0,
  caseId: '',
  patientId: null,
  patientName: '',
  arrivalTime: new Date(),
  condition: 'critical', // critical, serious, stable, minor
  priority: 'high', // high, medium, low
  attendingDoctorId: null,
  triageNurseId: null,
  location: '', // where patient is located
  status: 'pending', // pending, in-progress, transferred, discharged
  symptoms: [],
  preliminaryDiagnosis: '',
  treatmentStarted: false,
  treatmentNotes: '',
  outcome: 'pending', // pending, treated, transferred, expired
  createdAt: new Date(),
  updatedAt: new Date()
};

// Waiting list model
const WaitingList = {
  id: 0,
  patientId: null,
  doctorId: null,
  departmentId: null,
  priority: 'normal', // urgent, high, normal, low
  reason: '',
  waitTime: 0, // minutes
  status: 'waiting', // waiting, called, served, cancelled
  estimatedWaitTime: 0, // minutes
  position: 0, // position in queue
  addedAt: new Date(),
  calledAt: null,
  servedAt: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Report model
const Report = {
  id: 0,
  reportId: '',
  type: 'daily', // daily, weekly, monthly, quarterly, annual
  departmentId: null,
  doctorId: null,
  title: '',
  content: '',
  generatedBy: null,
  generatedAt: new Date(),
  data: {}, // actual report data
  period: {
    from: new Date(),
    to: new Date()
  },
  status: 'draft', // draft, generated, published, archived
  createdAt: new Date(),
  updatedAt: new Date()
};

// Schedule model
const Schedule = {
  id: 0,
  staffId: null,
  staffType: 'doctor', // doctor, nurse, other
  date: new Date(),
  shifts: [
    {
      shiftId: '',
      startTime: '09:00',
      endTime: '17:00',
      status: 'scheduled', // scheduled, completed, cancelled
      breakTime: null
    }
  ],
  status: 'active', // active, cancelled, completed
  notes: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = {
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
};