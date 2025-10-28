'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function VIP() {
  // Helper function for satisfaction emoji
  const getSatisfactionEmoji = (score: number) => {
    if (score >= 95) return '🌟';
    if (score >= 90) return '👍';
    if (score >= 80) return '👌';
    return '⚠️';
  };

  const [vipPatients, setVipPatients] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, active: 0, discharged: 0, pending: 0, appointments: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddVipModal, setShowAddVipModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [selectedVip, setSelectedVip] = useState<any>(null)
  const [newVip, setNewVip] = useState({
    name: '',
    patientId: '',
    category: 'Gold',
    status: 'Active',
    admissionDate: new Date().toISOString().split('T')[0],
    dischargeDate: '',
    assignedDoctor: '',
    assignedNurse: '',
    roomNumber: '',
    contactPerson: '',
    contactPhone: '',
    specialRequests: '',
    dietaryPreferences: '',
    securityLevel: 'Standard',
    amenities: [],
    billingAccount: '',
    insuranceProvider: '',
    nextAppointment: '',
    lastVisit: new Date().toISOString().split('T')[0],
    visitCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchVipPatients()
    }
  }, [])

  const fetchVipPatients = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital VIP patient management
      const mockVipPatients = [
        { id: 1, name: 'Mr. Robert Thompson', patientId: 'VIP001', category: 'Platinum', status: 'Active', admissionDate: '2023-01-15', dischargeDate: '', assignedDoctor: 'Dr. Alice Johnson', assignedNurse: 'Nurse Sarah Miller', roomNumber: 'VIP-101', contactPerson: 'Mrs. Jennifer Thompson', contactPhone: '+1234567890', specialRequests: 'Daily newspaper, fresh flowers, private chef', dietaryPreferences: 'Vegetarian, gluten-free', securityLevel: 'High', amenities: ['Personal Butler', 'Private Lounge', 'Executive Chef', 'Chauffeur Service'], billingAccount: 'ACC001', insuranceProvider: 'Elite Health Insurance', nextAppointment: '2023-09-25T10:00:00Z', lastVisit: '2023-09-20T14:30:00Z', visitCount: 12, satisfactionScore: 98, averageStay: 7.5 },
        { id: 2, name: 'Ms. Catherine Williams', patientId: 'VIP002', category: 'Gold', status: 'Active', admissionDate: '2023-03-22', dischargeDate: '', assignedDoctor: 'Dr. Michael Chen', assignedNurse: 'Nurse Eva Brown', roomNumber: 'VIP-205', contactPerson: 'Mr. David Williams', contactPhone: '+1234567891', specialRequests: 'Ocean view room, spa treatments', dietaryPreferences: 'Vegan', securityLevel: 'Standard', amenities: ['Spa Access', 'Private Terrace', 'Personal Concierge'], billingAccount: 'ACC002', insuranceProvider: 'Premium Care Insurance', nextAppointment: '2023-09-26T15:30:00Z', lastVisit: '2023-09-18T09:15:00Z', visitCount: 8, satisfactionScore: 95, averageStay: 5.2 },
        { id: 3, name: 'Mr. James Anderson', patientId: 'VIP003', category: 'Platinum', status: 'Discharged', admissionDate: '2023-02-10', dischargeDate: '2023-02-25', assignedDoctor: 'Dr. David Wilson', assignedNurse: 'Nurse Grace Lee', roomNumber: 'VIP-303', contactPerson: 'Ms. Lisa Anderson', contactPhone: '+1234567892', specialRequests: 'Silent room, luxury bedding', dietaryPreferences: 'Keto', securityLevel: 'High', amenities: ['Personal Butler', 'Private Gym', 'Executive Chef', 'Limousine Service'], billingAccount: 'ACC003', insuranceProvider: 'Executive Health Insurance', nextAppointment: '', lastVisit: '2023-02-24T11:45:00Z', visitCount: 1, satisfactionScore: 92, averageStay: 15 },
        { id: 4, name: 'Mrs. Margaret Davis', patientId: 'VIP004', category: 'Silver', status: 'Active', admissionDate: '2023-05-18', dischargeDate: '', assignedDoctor: 'Dr. Frank Miller', assignedNurse: 'Nurse Henry Taylor', roomNumber: 'VIP-108', contactPerson: 'Mr. Robert Davis', contactPhone: '+1234567893', specialRequests: 'Fresh fruit basket daily, premium WiFi', dietaryPreferences: 'Mediterranean', securityLevel: 'Standard', amenities: ['Premium WiFi', 'Daily Fruit Basket', 'Newspaper Service'], billingAccount: 'ACC004', insuranceProvider: 'Silver Shield Insurance', nextAppointment: '2023-09-27T14:00:00Z', lastVisit: '2023-09-22T16:20:00Z', visitCount: 5, satisfactionScore: 96, averageStay: 4.8 },
        { id: 5, name: 'Mr. William Johnson', patientId: 'VIP005', category: 'Gold', status: 'Pending', admissionDate: '', dischargeDate: '', assignedDoctor: 'Dr. Kate Williams', assignedNurse: '', roomNumber: 'VIP-212', contactPerson: 'Ms. Susan Johnson', contactPhone: '+1234567894', specialRequests: 'Early check-in, late check-out', dietaryPreferences: 'Halal', securityLevel: 'Standard', amenities: ['Early Check-in', 'Late Check-out', 'Priority Booking'], billingAccount: 'ACC005', insuranceProvider: 'Golden Care Insurance', nextAppointment: '2023-09-30T09:00:00Z', lastVisit: '2023-08-15T10:30:00Z', visitCount: 3, satisfactionScore: 94, averageStay: 6.3 },
        { id: 6, name: 'Ms. Elizabeth Wilson', patientId: 'VIP006', category: 'Platinum', status: 'Active', admissionDate: '2023-07-05', dischargeDate: '', assignedDoctor: 'Dr. Jack Roberts', assignedNurse: 'Nurse Jennifer Wilson', roomNumber: 'VIP-307', contactPerson: 'Mr. Thomas Wilson', contactPhone: '+1234567895', specialRequests: 'Helicopter transfer, private helicopter pad access', dietaryPreferences: 'Organic', securityLevel: 'Maximum', amenities: ['Helicopter Transfer', 'Private Helipad', 'Personal Security', 'Executive Chef', 'Private Spa'], billingAccount: 'ACC006', insuranceProvider: 'Platinum Plus Insurance', nextAppointment: '2023-09-28T11:00:00Z', lastVisit: '2023-09-25T08:45:00Z', visitCount: 2, satisfactionScore: 99, averageStay: 12.5 },
        { id: 7, name: 'Mr. Charles Brown', patientId: 'VIP007', category: 'Gold', status: 'Active', admissionDate: '2023-08-20', dischargeDate: '', assignedDoctor: 'Dr. Alice Johnson', assignedNurse: 'Nurse Sarah Miller', roomNumber: 'VIP-105', contactPerson: 'Mrs. Mary Brown', contactPhone: '+1234567896', specialRequests: 'Art gallery access, music therapy', dietaryPreferences: 'Pescatarian', securityLevel: 'Standard', amenities: ['Art Gallery Access', 'Music Therapy', 'Library Access'], billingAccount: 'ACC007', insuranceProvider: 'Cultural Care Insurance', nextAppointment: '2023-09-29T13:30:00Z', lastVisit: '2023-09-15T14:20:00Z', visitCount: 4, satisfactionScore: 93, averageStay: 8.7 },
        { id: 8, name: 'Mrs. Diana Miller', patientId: 'VIP008', category: 'Silver', status: 'Active', admissionDate: '2023-09-01', dischargeDate: '', assignedDoctor: 'Dr. Michael Chen', assignedNurse: 'Nurse Eva Brown', roomNumber: 'VIP-209', contactPerson: 'Mr. Kevin Miller', contactPhone: '+1234567897', specialRequests: 'Pet-friendly room, dog walking service', dietaryPreferences: 'Standard', securityLevel: 'Standard', amenities: ['Pet-Friendly Room', 'Dog Walking Service', 'Pet Grooming'], billingAccount: 'ACC008', insuranceProvider: 'Family Health Insurance', nextAppointment: '2023-09-26T16:00:00Z', lastVisit: '2023-09-20T10:15:00Z', visitCount: 1, satisfactionScore: 97, averageStay: 6 }
      ];
      
      setVipPatients(mockVipPatients);
      
      // Calculate stats
      const total = mockVipPatients.length;
      const active = mockVipPatients.filter(v => v.status === 'Active').length;
      const discharged = mockVipPatients.filter(v => v.status === 'Discharged').length;
      const pending = mockVipPatients.filter(v => v.status === 'Pending').length;
      const appointments = mockVipPatients.filter(v => v.nextAppointment && new Date(v.nextAppointment) > new Date()).length;
      
      setStats({ total, active, discharged, pending, appointments });
    } catch (err) {
      console.error('Error fetching VIP patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800'
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800'
      case 'Silver':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Discharged':
        return 'bg-slate-100 text-slate-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter VIP patients based on selected status, category, and search term
  const filteredVipPatients = vipPatients.filter(patient => {
    const statusMatch = selectedStatus ? patient.status === selectedStatus : true
    const categoryMatch = selectedCategory ? patient.category === selectedCategory : true
    const searchMatch = searchTerm 
      ? patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && categoryMatch && searchMatch
  })

  // Sort VIP patients
  const sortedVipPatients = [...filteredVipPatients].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(vipPatients.map(v => v.category)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddVip = () => {
    const newId = vipPatients.length > 0 ? Math.max(...vipPatients.map(v => v.id)) + 1 : 1
    const vipToAdd = {
      ...newVip,
      id: newId,
      lastVisit: new Date().toISOString(),
      visitCount: 0,
      satisfactionScore: 0,
      averageStay: 0
    }
    
    setVipPatients([...vipPatients, vipToAdd])
    
    // Update stats
    const total = vipPatients.length + 1;
    const active = newVip.status === 'Active' ? stats.active + 1 : stats.active;
    const discharged = newVip.status === 'Discharged' ? stats.discharged + 1 : stats.discharged;
    const pending = newVip.status === 'Pending' ? stats.pending + 1 : stats.pending;
    const appointments = stats.appointments;
    
    setStats({ total, active, discharged, pending, appointments })
    
    // Reset form and close modal
    setNewVip({
      name: '',
      patientId: '',
      category: 'Gold',
      status: 'Active',
      admissionDate: new Date().toISOString().split('T')[0],
      dischargeDate: '',
      assignedDoctor: '',
      assignedNurse: '',
      roomNumber: '',
      contactPerson: '',
      contactPhone: '',
      specialRequests: '',
      dietaryPreferences: '',
      securityLevel: 'Standard',
      amenities: [],
      billingAccount: '',
      insuranceProvider: '',
      nextAppointment: '',
      lastVisit: new Date().toISOString().split('T')[0],
      visitCount: 0
    })
    setShowAddVipModal(false)
  }

  const openAppointmentModal = (vip: any) => {
    setSelectedVip(vip)
    setShowAppointmentModal(true)
  }

  // Function to get days until next appointment
  const getDaysUntilAppointment = (appointmentDate: string) => {
    if (!appointmentDate) return null;
    const appt = new Date(appointmentDate);
    const today = new Date();
    const diffTime = appt.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">VIP Patient Management</h2>
            <p className="text-slate-600">Manage VIP patients, premium services, and exclusive care programs</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddVipModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add VIP Patient
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total VIP Patients</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-slate-50 rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-700">{stats.discharged}</p>
            <p className="text-sm text-slate-600">Discharged</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
            <p className="text-sm text-amber-600">Pending</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.appointments}</p>
            <p className="text-sm text-blue-600">Upcoming Appointments</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Patient name, ID, or room"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Discharged">Discharged</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                id="categoryFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category: string) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Patient Name</option>
                <option value="category">Category</option>
                <option value="admissionDate">Admission Date</option>
                <option value="roomNumber">Room Number</option>
                <option value="assignedDoctor">Assigned Doctor</option>
                <option value="satisfactionScore">Satisfaction Score</option>
                <option value="visitCount">Visit Count</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedCategory('')
                  setSearchTerm('')
                  setSortBy('name')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* VIP Patient Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">VIP Patient Directory</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Sort:</span>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('asc')}
              >
                Asc
              </button>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('desc')}
              >
                Desc
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVipPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{patient.name}</h4>
                    <p className="text-sm text-slate-600">ID: {patient.patientId}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryClass(patient.category)}`}>
                      {patient.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Room</p>
                    <p className="text-sm font-medium text-slate-800">{patient.roomNumber}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Doctor</p>
                    <p className="text-sm font-medium text-slate-800">{patient.assignedDoctor}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Nurse</p>
                    <p className="text-sm font-medium text-slate-800">{patient.assignedNurse}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Contact</p>
                    <p className="text-sm font-medium text-slate-800 truncate">{patient.contactPerson}</p>
                  </div>
                </div>
                
                <div className="flex items-center mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          (patient.satisfactionScore || 0) >= 95 ? 'bg-emerald-500' : 
                          (patient.satisfactionScore || 0) >= 90 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${patient.satisfactionScore || 0}%` }}
                      ></div>
                      <span className="text-xs font-bold text-slate-800 flex items-center">
                        {patient.satisfactionScore}% {!getSatisfactionEmoji ? 'N/A' : getSatisfactionEmoji(patient.satisfactionScore || 0)}
                      </span>
                    </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Security</span>
                    <span className={`text-sm font-medium ${
                      patient.securityLevel === 'Maximum' ? 'text-rose-600' : 
                      patient.securityLevel === 'High' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {patient.securityLevel}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Amenities</span>
                    <span className="text-sm text-slate-600">{patient.amenities.length} items</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.amenities.slice(0, 2).map((amenity: string, index: number) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                        {amenity}
                      </span>
                    ))}
                    {patient.amenities.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                        +{patient.amenities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                {patient.nextAppointment && getDaysUntilAppointment(patient.nextAppointment) !== null && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Next Appointment</span>
                      <span className={`text-sm font-medium ${
                        getDaysUntilAppointment(patient.nextAppointment)! <= 3 ? 'text-rose-600' : 
                        getDaysUntilAppointment(patient.nextAppointment)! <= 7 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {getDaysUntilAppointment(patient.nextAppointment)} days
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openAppointmentModal(patient)}
                  >
                    Schedule Visit
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="text-slate-600 hover:text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Patient Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preferences</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">History</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Security</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedVipPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{patient.name}</div>
                        <div className="text-sm text-slate-500">ID: {patient.patientId}</div>
                        <div className="text-sm text-slate-500">Room: {patient.roomNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryClass(patient.category)}`}>
                        {patient.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="text-sm text-slate-600">
                        <div>Doctor: {patient.assignedDoctor}</div>
                        <div>Nurse: {patient.assignedNurse}</div>
                        {patient.admissionDate && (
                          <div>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="text-sm text-slate-600">
                        <div>Contact: {patient.contactPerson}</div>
                        <div>Phone: {patient.contactPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="text-sm text-slate-600">
                        <div>Dietary: {patient.dietaryPreferences}</div>
                        <div>Requests: {patient.specialRequests.substring(0, 30)}{patient.specialRequests.length > 30 ? '...' : ''}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Visits: {patient.visitCount}</div>
                        <div className="flex items-center">
                            <span className="mr-1">Satisfaction:</span>
                            <span className="font-medium text-slate-800 flex items-center">
                              {patient.satisfactionScore}% {getSatisfactionEmoji(patient.satisfactionScore || 0)}
                            </span>
                          </div>
                        <div>Avg Stay: {patient.averageStay} days</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Level: {patient.securityLevel}</div>
                        <div>Insurance: {patient.insuranceProvider}</div>
                        <div>Account: {patient.billingAccount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={patient.status}
                          onChange={(e) => {
                            // Update status in mock data
                            const updatedPatients = vipPatients.map(p => 
                              p.id === patient.id ? { ...p, status: e.target.value } : p
                            );
                            setVipPatients(updatedPatients);
                            
                            // Update stats
                            const active = updatedPatients.filter(p => p.status === 'Active').length;
                            const discharged = updatedPatients.filter(p => p.status === 'Discharged').length;
                            const pending = updatedPatients.filter(p => p.status === 'Pending').length;
                            setStats({ ...stats, active, discharged, pending });
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Discharged">Discharged</option>
                          <option value="Pending">Pending</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openAppointmentModal(patient)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VIP Analytics */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">VIP Patient Analytics</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-purple-200 bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-purple-800">Top Category</h4>
              </div>
              <p className="text-xl font-bold text-purple-700 mt-2">
                {vipPatients.length > 0 ? 
                  Object.entries(
                    vipPatients.reduce((acc: any, p) => {
                      acc[p.category] = (acc[p.category] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort((a: any, b: any) => b[1] - a[1])[0][0] : 'N/A'}
              </p>
              <p className="text-sm text-purple-600">
                {vipPatients.length > 0 ? 
                  `${Math.round(((Object.values(
                    vipPatients.reduce((acc: any, p) => {
                      acc[p.category] = (acc[p.category] || 0) + 1;
                      return acc;
                    }, {}) as Record<string, number>
                  ).sort((a: any, b: any) => b - a)[0] || 0) / vipPatients.length) * 100)}% of patients` : ''}
              </p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Avg. Satisfaction</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">
                {vipPatients.length > 0 ? 
                  `${Math.round(vipPatients.reduce((sum, p) => sum + p.satisfactionScore, 0) / vipPatients.length)}%` : '0%'}
              </p>
              <p className="text-sm text-emerald-600">Across all VIP patients</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Avg. Visit Frequency</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">
                {vipPatients.length > 0 ? 
                  `${(vipPatients.reduce((sum, p) => sum + p.visitCount, 0) / vipPatients.length).toFixed(1)}` : '0'} visits
              </p>
              <p className="text-sm text-amber-600">Per patient annually</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add VIP Patient Modal */}
      {showAddVipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New VIP Patient</h3>
              <button 
                onClick={() => setShowAddVipModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter full name"
                      value={newVip.name}
                      onChange={(e) => setNewVip({...newVip, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter patient ID"
                      value={newVip.patientId}
                      onChange={(e) => setNewVip({...newVip, patientId: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newVip.category}
                      onChange={(e) => setNewVip({...newVip, category: e.target.value})}
                    >
                      <option value="Platinum">Platinum</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newVip.status}
                      onChange={(e) => setNewVip({...newVip, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Discharged">Discharged</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Doctor</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter doctor name"
                      value={newVip.assignedDoctor}
                      onChange={(e) => setNewVip({...newVip, assignedDoctor: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Nurse</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter nurse name"
                      value={newVip.assignedNurse}
                      onChange={(e) => setNewVip({...newVip, assignedNurse: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter room number"
                      value={newVip.roomNumber}
                      onChange={(e) => setNewVip({...newVip, roomNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Security Level</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newVip.securityLevel}
                      onChange={(e) => setNewVip({...newVip, securityLevel: e.target.value})}
                    >
                      <option value="Standard">Standard</option>
                      <option value="High">High</option>
                      <option value="Maximum">Maximum</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter contact person"
                      value={newVip.contactPerson}
                      onChange={(e) => setNewVip({...newVip, contactPerson: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter phone number"
                      value={newVip.contactPhone}
                      onChange={(e) => setNewVip({...newVip, contactPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Preferences</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter dietary preferences"
                    value={newVip.dietaryPreferences}
                    onChange={(e) => setNewVip({...newVip, dietaryPreferences: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Special Requests</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter special requests"
                    rows={3}
                    value={newVip.specialRequests}
                    onChange={(e) => setNewVip({...newVip, specialRequests: e.target.value})}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Provider</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter insurance provider"
                    value={newVip.insuranceProvider}
                    onChange={(e) => setNewVip({...newVip, insuranceProvider: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Billing Account</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter billing account"
                    value={newVip.billingAccount}
                    onChange={(e) => setNewVip({...newVip, billingAccount: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddVipModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddVip}
              >
                Add VIP Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      {showAppointmentModal && selectedVip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Schedule Appointment for {selectedVip.name}</h3>
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedVip.name}</h4>
                  <p className="text-sm text-slate-600">ID: {selectedVip.patientId} • {selectedVip.category} Member</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      defaultValue={new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      defaultValue="10:00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                    <option>{selectedVip.assignedDoctor}</option>
                    <option>Dr. Alice Johnson</option>
                    <option>Dr. Michael Chen</option>
                    <option>Dr. David Wilson</option>
                    <option>Dr. Eva Brown</option>
                    <option>Dr. Frank Miller</option>
                    <option>Dr. Grace Lee</option>
                    <option>Dr. Henry Taylor</option>
                    <option>Dr. Jack Roberts</option>
                    <option>Dr. Kate Williams</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purpose of Visit</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                    <option>Regular Checkup</option>
                    <option>Follow-up Appointment</option>
                    <option>Specialist Consultation</option>
                    <option>Diagnostic Tests</option>
                    <option>Procedure/Surgery</option>
                    <option>Emergency Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Preference</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                    <option>{selectedVip.roomNumber}</option>
                    <option>VIP-101</option>
                    <option>VIP-105</option>
                    <option>VIP-108</option>
                    <option>VIP-205</option>
                    <option>VIP-209</option>
                    <option>VIP-212</option>
                    <option>VIP-303</option>
                    <option>VIP-307</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Special Accommodations</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Any special accommodations needed"
                    rows={3}
                    defaultValue={selectedVip.specialRequests}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Considerations</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Any dietary considerations"
                    defaultValue={selectedVip.dietaryPreferences}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAppointmentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => {
                  // Update patient's next appointment in mock data
                  const updatedPatients = vipPatients.map(p => 
                    p.id === selectedVip.id ? { 
                      ...p, 
                      nextAppointment: new Date(Date.now() + 7*24*60*60*1000).toISOString()
                    } : p
                  );
                  setVipPatients(updatedPatients);
                  
                  // Update stats
                  const appointments = updatedPatients.filter(p => 
                    p.nextAppointment && new Date(p.nextAppointment) > new Date()
                  ).length;
                  setStats({ ...stats, appointments });
                  
                  setShowAppointmentModal(false);
                }}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}