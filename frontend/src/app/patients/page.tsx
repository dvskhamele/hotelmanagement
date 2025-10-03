'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, admitted: 0, discharged: 0, critical: 0, stable: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 0,
    gender: 'Male',
    department: '',
    status: 'Admitted',
    diagnosis: '',
    roomNumber: '',
    attendingDoctor: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchPatients()
    }
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital management system
      const mockPatients = [
        { id: 1, name: 'John Smith', age: 54, gender: 'Male', department: 'Cardiology', status: 'Admitted', diagnosis: 'Heart Attack', roomNumber: '201', attendingDoctor: 'Dr. Alice Johnson', admissionDate: '2023-09-25', dischargeDate: null },
        { id: 2, name: 'Mary Johnson', age: 67, gender: 'Female', department: 'Orthopedics', status: 'Discharged', diagnosis: 'Hip Replacement', roomNumber: '305', attendingDoctor: 'Dr. David Wilson', admissionDate: '2023-09-20', dischargeDate: '2023-09-25' },
        { id: 3, name: 'Robert Williams', age: 42, gender: 'Male', department: 'Emergency', status: 'Critical', diagnosis: 'Severe Pneumonia', roomNumber: 'ICU-01', attendingDoctor: 'Dr. Eva Brown', admissionDate: '2023-09-27', dischargeDate: null },
        { id: 4, name: 'Patricia Davis', age: 35, gender: 'Female', department: 'Pediatrics', status: 'Stable', diagnosis: 'Asthma', roomNumber: '402', attendingDoctor: 'Dr. Grace Lee', admissionDate: '2023-09-24', dischargeDate: null },
        { id: 5, name: 'James Wilson', age: 78, gender: 'Male', department: 'Neurology', status: 'Admitted', diagnosis: 'Stroke', roomNumber: '207', attendingDoctor: 'Dr. Henry Taylor', admissionDate: '2023-09-22', dischargeDate: null },
        { id: 6, name: 'Sarah Miller', age: 45, gender: 'Female', department: 'Cardiology', status: 'Stable', diagnosis: 'Hypertension', roomNumber: '312', attendingDoctor: 'Dr. Alice Johnson', admissionDate: '2023-09-26', dischargeDate: null },
        { id: 7, name: 'Michael Brown', age: 29, gender: 'Male', department: 'Emergency', status: 'Critical', diagnosis: 'Multiple Injuries', roomNumber: 'ICU-03', attendingDoctor: 'Dr. Jack Roberts', admissionDate: '2023-09-28', dischargeDate: null },
        { id: 8, name: 'Jennifer Wilson', age: 51, gender: 'Female', department: 'Internal Medicine', status: 'Admitted', diagnosis: 'Diabetes', roomNumber: '108', attendingDoctor: 'Dr. Frank Miller', admissionDate: '2023-09-23', dischargeDate: null }
      ];
      
      setPatients(mockPatients);
      
      // Calculate stats
      const total = mockPatients.length;
      const admitted = mockPatients.filter(p => p.status === 'Admitted' || p.status === 'Critical' || p.status === 'Stable').length;
      const discharged = mockPatients.filter(p => p.status === 'Discharged').length;
      const critical = mockPatients.filter(p => p.status === 'Critical').length;
      const stable = mockPatients.filter(p => p.status === 'Stable').length;
      
      setStats({ total, admitted, discharged, critical, stable });
    } catch (err) {
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800'
      case 'Admitted':
        return 'bg-blue-100 text-blue-800'
      case 'Stable':
        return 'bg-emerald-100 text-emerald-800'
      case 'Discharged':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'Critical'
      case 'Admitted':
        return 'Admitted'
      case 'Stable':
        return 'Stable'
      case 'Discharged':
        return 'Discharged'
      default:
        return status
    }
  }

  // Filter patients based on selected status, department, and search term
  const filteredPatients = patients.filter(patient => {
    const statusMatch = selectedStatus ? patient.status === selectedStatus : true
    const departmentMatch = selectedDepartment ? patient.department === selectedDepartment : true
    const searchMatch = searchTerm 
      ? patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.attendingDoctor.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && departmentMatch && searchMatch
  })

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddPatient = () => {
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1
    const patientToAdd = {
      ...newPatient,
      id: newId,
      admissionDate: new Date().toISOString().split('T')[0]
    }
    
    setPatients([...patients, patientToAdd])
    
    // Update stats
    const total = patients.length + 1;
    const admitted = newPatient.status === 'Admitted' || newPatient.status === 'Critical' || newPatient.status === 'Stable' ? stats.admitted + 1 : stats.admitted;
    const discharged = newPatient.status === 'Discharged' ? stats.discharged + 1 : stats.discharged;
    const critical = newPatient.status === 'Critical' ? stats.critical + 1 : stats.critical;
    const stable = newPatient.status === 'Stable' ? stats.stable + 1 : stats.stable;
    
    setStats({ total, admitted, discharged, critical, stable })
    
    // Reset form and close modal
    setNewPatient({
      name: '',
      age: 0,
      gender: 'Male',
      department: '',
      status: 'Admitted',
      diagnosis: '',
      roomNumber: '',
      attendingDoctor: ''
    })
    setShowAddPatientModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">Patient Management System</h2>
            <p className="text-slate-600">Manage patient records, admissions, and care coordination</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddPatientModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Patient
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Patients</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.admitted}</p>
            <p className="text-sm text-blue-600">Admitted</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.stable}</p>
            <p className="text-sm text-emerald-600">Stable</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.critical}</p>
            <p className="text-sm text-rose-600">Critical</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.discharged}</p>
            <p className="text-sm text-amber-600">Discharged</p>
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
                placeholder="Name, diagnosis, or doctor"
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
                <option value="Admitted">Admitted</option>
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
            <div>
              <label htmlFor="departmentFilter" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select
                id="departmentFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Emergency">Emergency</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Neurology">Neurology</option>
                <option value="Internal Medicine">Internal Medicine</option>
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
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="department">Department</option>
                <option value="status">Status</option>
                <option value="admissionDate">Admission Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedDepartment('')
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

        {/* Patient Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Patient Overview</h3>
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
            {sortedPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">{patient.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800">{patient.name}</h4>
                      <p className="text-sm text-slate-600">{patient.age} years • {patient.gender}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(patient.status)}`}>
                    {getStatusText(patient.status)}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-medium text-slate-800">{patient.department}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Room</p>
                    <p className="text-sm font-medium text-slate-800">{patient.roomNumber}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Admitted</p>
                    <p className="text-sm font-medium text-slate-800">{new Date(patient.admissionDate).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Doctor</p>
                    <p className="text-sm font-medium text-slate-800">{patient.attendingDoctor}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Diagnosis</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mt-1">{patient.diagnosis}</p>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Admitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{patient.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{patient.name}</div>
                          <div className="text-sm text-slate-500">{patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(patient.status)}`}>
                        {getStatusText(patient.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.diagnosis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.roomNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(patient.admissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.attendingDoctor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Patient</h3>
              <button 
                onClick={() => setShowAddPatientModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter patient name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Age"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newPatient.department}
                    onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                  >
                    <option value="">Select department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newPatient.status}
                    onChange={(e) => setNewPatient({...newPatient, status: e.target.value})}
                  >
                    <option value="Admitted">Admitted</option>
                    <option value="Stable">Stable</option>
                    <option value="Critical">Critical</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter diagnosis"
                    value={newPatient.diagnosis}
                    onChange={(e) => setNewPatient({...newPatient, diagnosis: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Room number"
                      value={newPatient.roomNumber}
                      onChange={(e) => setNewPatient({...newPatient, roomNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Attending Doctor</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Doctor name"
                      value={newPatient.attendingDoctor}
                      onChange={(e) => setNewPatient({...newPatient, attendingDoctor: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddPatientModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddPatient}
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}