'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Doctors() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, active: 0, onBreak: 0, offline: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: '',
    licenseNumber: '',
    status: 'Active'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchDoctors()
    }
  }, [])

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital doctor management
      const mockDoctors = [
        { id: 1, name: 'Dr. Alice Johnson', department: 'Cardiology', specialization: 'Interventional Cardiologist', qualification: 'MD, FACC', licenseNumber: 'LIC001', status: 'Active', email: 'alice.johnson@hospital.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM', appointmentCount: 120, successRate: 97 },
        { id: 2, name: 'Dr. Michael Chen', department: 'Surgery', specialization: 'General Surgeon', qualification: 'MBBS, MS', licenseNumber: 'LIC002', status: 'Active', email: 'michael.chen@hospital.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 87, schedule: '9:00 AM - 5:00 PM', appointmentCount: 95, successRate: 94 },
        { id: 3, name: 'Dr. Sarah Williams', department: 'Pediatrics', specialization: 'Pediatric Cardiologist', qualification: 'MD, FAAP', licenseNumber: 'LIC003', status: 'Offline', email: 'sarah.williams@hospital.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 95, schedule: '9:00 AM - 5:00 PM', appointmentCount: 85, successRate: 98 },
        { id: 4, name: 'Dr. David Wilson', department: 'Orthopedics', specialization: 'Orthopedic Surgeon', qualification: 'MBBS, MS, FRCS', licenseNumber: 'LIC004', status: 'Active', email: 'david.wilson@hospital.com', phone: '+1234567893', hireDate: '2020-07-18', performance: 88, schedule: '8:00 AM - 4:00 PM', appointmentCount: 110, successRate: 93 },
        { id: 5, name: 'Dr. Eva Brown', department: 'Emergency', specialization: 'Emergency Medicine', qualification: 'MD, FACEP', licenseNumber: 'LIC005', status: 'On Break', email: 'eva.brown@hospital.com', phone: '+1234567894', hireDate: '2023-02-10', performance: 91, schedule: '8:00 AM - 4:00 PM', appointmentCount: 180, successRate: 96 },
        { id: 6, name: 'Dr. Frank Miller', department: 'Internal Medicine', specialization: 'Intensivist', qualification: 'MD, FCCM', licenseNumber: 'LIC006', status: 'Active', email: 'frank.miller@hospital.com', phone: '+1234567895', hireDate: '2019-05-30', performance: 96, schedule: '7:00 AM - 3:00 PM', appointmentCount: 100, successRate: 95 },
        { id: 7, name: 'Dr. Grace Lee', department: 'Neurology', specialization: 'Neurologist', qualification: 'MD, FAAN', licenseNumber: 'LIC007', status: 'Active', email: 'grace.lee@hospital.com', phone: '+1234567896', hireDate: '2022-09-14', performance: 89, schedule: '7:00 AM - 3:00 PM', appointmentCount: 75, successRate: 92 },
        { id: 8, name: 'Dr. Henry Taylor', department: 'Oncology', specialization: 'Medical Oncologist', qualification: 'MD, FACP', licenseNumber: 'LIC008', status: 'Active', email: 'henry.taylor@hospital.com', phone: '+1234567897', hireDate: '2023-01-20', performance: 93, schedule: '7:00 AM - 3:00 PM', appointmentCount: 60, successRate: 89 },
        { id: 9, name: 'Dr. Ivy Chen', department: 'Ophthalmology', specialization: 'Cataract Surgeon', qualification: 'MD, FRCS', licenseNumber: 'LIC009', status: 'Offline', email: 'ivy.chen@hospital.com', phone: '+1234567898', hireDate: '2022-12-03', performance: 85, schedule: '7:00 AM - 3:00 PM', appointmentCount: 90, successRate: 95 },
        { id: 10, name: 'Dr. Jack Roberts', department: 'Emergency', specialization: 'ER Physician', qualification: 'MD, FACEP', licenseNumber: 'LIC010', status: 'Active', email: 'jack.roberts@hospital.com', phone: '+1234567899', hireDate: '2021-04-12', performance: 94, schedule: '6:00 AM - 2:00 PM', appointmentCount: 220, successRate: 96 },
        { id: 11, name: 'Dr. Kate Williams', department: 'Administration', specialization: 'Chief Medical Officer', qualification: 'MD, MBA, FACP', licenseNumber: 'LIC011', status: 'Active', email: 'kate.williams@hospital.com', phone: '+1234567800', hireDate: '2020-09-08', performance: 97, schedule: '6:00 AM - 2:00 PM', appointmentCount: 30, successRate: 99 }
      ];
      
      setDoctors(mockDoctors);
      
      // Calculate stats
      const total = mockDoctors.length;
      const active = mockDoctors.filter(d => d.status === 'Active').length;
      const onBreak = mockDoctors.filter(d => d.status === 'On Break').length;
      const offline = mockDoctors.filter(d => d.status === 'Offline').length;
      
      setStats({ total, active, onBreak, offline });
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'On Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter doctors based on selected department, status, and search term
  const filteredDoctors = doctors.filter(doctor => {
    const departmentMatch = selectedDepartment ? doctor.department === selectedDepartment : true
    const statusMatch = selectedStatus ? doctor.status === selectedStatus : true
    const searchMatch = searchTerm 
      ? doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return departmentMatch && statusMatch && searchMatch
  })

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
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

  const handleAddDoctor = () => {
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1
    const doctorToAdd = {
      ...newDoctor,
      id: newId,
      performance: Math.floor(Math.random() * 20) + 80, // Random performance between 80-100
      hireDate: new Date().toISOString().split('T')[0],
      schedule: '9:00 AM - 5:00 PM',
      appointmentCount: 0,
      successRate: 0
    }
    
    setDoctors([...doctors, doctorToAdd])
    
    // Update stats
    const total = doctors.length + 1;
    const active = newDoctor.status === 'Active' ? stats.active + 1 : stats.active;
    const onBreak = newDoctor.status === 'On Break' ? stats.onBreak + 1 : stats.onBreak;
    const offline = newDoctor.status === 'Offline' ? stats.offline + 1 : stats.offline;
    
    setStats({ total, active, onBreak, offline })
    
    // Reset form and close modal
    setNewDoctor({
      name: '',
      email: '',
      phone: '',
      department: '',
      specialization: '',
      qualification: '',
      licenseNumber: '',
      status: 'Active'
    })
    setShowAddDoctorModal(false)
  }

  const openScheduleModal = (doctor: any) => {
    setSelectedDoctor(doctor)
    setShowScheduleModal(true)
  }

  // Function to get performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'bg-emerald-500'
    if (performance >= 80) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  // Function to get performance emoji
  const getPerformanceEmoji = (performance: number) => {
    if (performance >= 95) return '🌟'
    if (performance >= 90) return '👍'
    if (performance >= 80) return '👌'
    return '⚠️'
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
            <h2 className="text-2xl font-bold text-slate-800">Doctor Management System</h2>
            <p className="text-slate-600">Manage hospital doctors, schedules, and success ratios</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddDoctorModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Doctor
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Doctors</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.onBreak}</p>
            <p className="text-sm text-amber-600">On Break</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-4 text-center border-l-4 border-gray-500">
            <p className="text-2xl font-bold text-gray-700">{stats.offline}</p>
            <p className="text-sm text-gray-600">Offline</p>
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
                placeholder="Name, specialization, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Emergency">Emergency</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Administration">Administration</option>
              </select>
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
                <option value="On Break">On Break</option>
                <option value="Offline">Offline</option>
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
                <option value="department">Department</option>
                <option value="specialization">Specialization</option>
                <option value="performance">Performance</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedDepartment('')
                  setSelectedStatus('')
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

        {/* Doctor Grid */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Doctor Directory</h3>
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
            {sortedDoctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">{doctor.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800">{doctor.name}</h4>
                      <p className="text-sm text-slate-600">{doctor.specialization}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(doctor.status)}`}>
                    {doctor.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-medium text-slate-800">{doctor.department}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Schedule</p>
                    <p className="text-sm font-medium text-slate-800">{doctor.schedule}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Qualification</p>
                    <p className="text-sm font-medium text-slate-800 truncate">{doctor.qualification}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">License</p>
                    <p className="text-sm font-medium text-slate-800">{doctor.licenseNumber}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Performance</span>
                    <span className="text-sm font-bold text-slate-800 flex items-center">
                      {doctor.performance}% {getPerformanceEmoji(doctor.performance)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${getPerformanceColor(doctor.performance)}`}
                      style={{ width: `${doctor.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Success Rate</span>
                    <span className="text-sm font-bold text-slate-800">{doctor.successRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${doctor.successRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openScheduleModal(doctor)}
                  >
                    View Schedule
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </button>
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Success Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{doctor.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{doctor.name}</div>
                          <div className="text-sm text-slate-500">{doctor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {doctor.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {doctor.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(doctor.status)}`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getPerformanceColor(doctor.performance)}`}
                            style={{ width: `${doctor.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 flex items-center">
                          {doctor.performance}% {getPerformanceEmoji(doctor.performance)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {doctor.successRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {doctor.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          value={doctor.status}
                          onChange={(e) => {
                            // Update status in mock data
                            const updatedDoctors = doctors.map(d => 
                              d.id === doctor.id ? { ...d, status: e.target.value } : d
                            );
                            setDoctors(updatedDoctors);
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="On Break">On Break</option>
                          <option value="Offline">Offline</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openScheduleModal(doctor)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
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

        {/* Doctor Performance Insights */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Performance Insights</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Top Performer</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">{doctors.length > 0 ? doctors.reduce((top, doctor) => doctor.performance > top.performance ? doctor : top, doctors[0]).name : 'N/A'}</p>
              <p className="text-sm text-blue-600">Performance: 97%</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Best Success Rate</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">{doctors.length > 0 ? doctors.reduce((top, doctor) => doctor.successRate > top.successRate ? doctor : top, doctors[0]).name : 'N/A'}</p>
              <p className="text-sm text-amber-600">Success Rate: 99%</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Most Appointments</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">{doctors.length > 0 ? doctors.reduce((top, doctor) => doctor.appointmentCount > top.appointmentCount ? doctor : top, doctors[0]).name : 'N/A'}</p>
              <p className="text-sm text-emerald-600">{doctors.length > 0 ? doctors.reduce((top, doctor) => doctor.appointmentCount > top.appointmentCount ? doctor : top, doctors[0]).appointmentCount : 0} appointments</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Doctor</h3>
              <button 
                onClick={() => setShowAddDoctorModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter full name"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter email"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter phone number"
                    value={newDoctor.phone}
                    onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDoctor.department}
                    onChange={(e) => setNewDoctor({...newDoctor, department: e.target.value})}
                  >
                    <option value="">Select department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter specialization"
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter qualification"
                    value={newDoctor.qualification}
                    onChange={(e) => setNewDoctor({...newDoctor, qualification: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter license number"
                    value={newDoctor.licenseNumber}
                    onChange={(e) => setNewDoctor({...newDoctor, licenseNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDoctor.status}
                    onChange={(e) => setNewDoctor({...newDoctor, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="On Break">On Break</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddDoctorModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddDoctor}
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">{selectedDoctor.name}'s Schedule</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold">{selectedDoctor.name.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedDoctor.name}</h4>
                  <p className="text-sm text-slate-600">{selectedDoctor.specialization} - {selectedDoctor.department}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Current Schedule</span>
                  <span className="font-medium text-slate-800">{selectedDoctor.schedule}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Upcoming Appointments</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Today, 10:00 AM</span>
                      <span className="font-medium">John Smith - Checkup</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Today, 11:00 AM</span>
                      <span className="font-medium">Mary Johnson - Follow-up</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tomorrow, 9:00 AM</span>
                      <span className="font-medium">Robert Williams - Surgery</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium">{selectedDoctor.successRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Appointments (Last Month)</span>
                      <span className="font-medium">{selectedDoctor.appointmentCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Performance Score</span>
                      <span className="font-medium">{selectedDoctor.performance}% {getPerformanceEmoji(selectedDoctor.performance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end">
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => setShowScheduleModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}