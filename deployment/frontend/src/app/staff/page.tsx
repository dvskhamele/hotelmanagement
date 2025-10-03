'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: ''
  })

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype
    const mockStaff = [
      { id: 1, name: 'Alice Johnson', department: 'Housekeeping', position: 'Supervisor', status: 'Active', email: 'alice.johnson@example.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM' },
      { id: 2, name: 'Bob Smith', department: 'Housekeeping', position: 'Staff', status: 'Active', email: 'bob.smith@example.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 87, schedule: '9:00 AM - 5:00 PM' },
      { id: 3, name: 'Carol Davis', department: 'Housekeeping', position: 'Staff', status: 'Offline', email: 'carol.davis@example.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 95, schedule: '9:00 AM - 5:00 PM' },
      { id: 4, name: 'David Wilson', department: 'Maintenance', position: 'Supervisor', status: 'Active', email: 'david.wilson@example.com', phone: '+1234567893', hireDate: '2020-07-18', performance: 88, schedule: '8:00 AM - 4:00 PM' },
      { id: 5, name: 'Eva Brown', department: 'Maintenance', position: 'Staff', status: 'Break', email: 'eva.brown@example.com', phone: '+1234567894', hireDate: '2023-02-10', performance: 91, schedule: '8:00 AM - 4:00 PM' },
      { id: 6, name: 'Frank Miller', department: 'Food & Beverage', position: 'Manager', status: 'Active', email: 'frank.miller@example.com', phone: '+1234567895', hireDate: '2019-05-30', performance: 96, schedule: '7:00 AM - 3:00 PM' },
      { id: 7, name: 'Grace Lee', department: 'Food & Beverage', position: 'Staff', status: 'Active', email: 'grace.lee@example.com', phone: '+1234567896', hireDate: '2022-09-14', performance: 89, schedule: '7:00 AM - 3:00 PM' },
      { id: 8, name: 'Henry Taylor', department: 'Food & Beverage', position: 'Staff', status: 'Active', email: 'henry.taylor@example.com', phone: '+1234567897', hireDate: '2023-01-20', performance: 93, schedule: '7:00 AM - 3:00 PM' },
      { id: 9, name: 'Ivy Chen', department: 'Food & Beverage', position: 'Staff', status: 'Offline', email: 'ivy.chen@example.com', phone: '+1234567898', hireDate: '2022-12-03', performance: 85, schedule: '7:00 AM - 3:00 PM' },
      { id: 10, name: 'Jack Roberts', department: 'Front Desk', position: 'Receptionist', status: 'Active', email: 'jack.roberts@example.com', phone: '+1234567899', hireDate: '2021-04-12', performance: 94, schedule: '6:00 AM - 2:00 PM' },
      { id: 11, name: 'Kate Williams', department: 'Front Desk', position: 'Manager', status: 'Active', email: 'kate.williams@example.com', phone: '+1234567800', hireDate: '2020-09-08', performance: 97, schedule: '6:00 AM - 2:00 PM' }
    ]
    
    setStaff(mockStaff)
  }, [])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter staff based on selected filters and search term
  const filteredStaff = staff.filter(member => {
    const departmentMatch = selectedDepartment 
      ? member.department === selectedDepartment 
      : true
    const statusMatch = selectedStatus 
      ? member.status === selectedStatus 
      : true
    const searchMatch = searchTerm 
      ? member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return departmentMatch && statusMatch && searchMatch
  })

  // Sort staff
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(staff.map((member: any) => member.department)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddStaff = () => {
    const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1
    const staffToAdd = {
      ...newStaff,
      id: newId,
      status: 'Active',
      performance: Math.floor(Math.random() * 20) + 80, // Random performance between 80-100
      hireDate: new Date().toISOString().split('T')[0],
      schedule: '9:00 AM - 5:00 PM'
    }
    
    setStaff([...staff, staffToAdd])
    
    // Reset form and close modal
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: ''
    })
    setShowAddStaffModal(false)
  }

  const openScheduleModal = (staffMember: any) => {
    setSelectedStaff(staffMember)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
            <p className="text-slate-600">Manage your hotel staff and track performance</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddStaffModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Staff
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{staff.length}</p>
            <p className="text-sm text-slate-600">Total Staff</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{staff.filter(s => s.status === 'Active').length}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{staff.filter(s => s.status === 'Break').length}</p>
            <p className="text-sm text-amber-600">On Break</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-4 text-center border-l-4 border-gray-500">
            <p className="text-2xl font-bold text-gray-700">{staff.filter(s => s.status === 'Offline').length}</p>
            <p className="text-sm text-gray-600">Offline</p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Name, position, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="departmentFilter" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select
                id="departmentFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept: string) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Break">Break</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="department">Department</option>
                <option value="position">Position</option>
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

        {/* Staff Grid */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Staff Directory</h3>
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
            {sortedStaff.map((member: any) => (
              <div 
                key={member.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800">{member.name}</h4>
                      <p className="text-sm text-slate-600">{member.position}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(member.status)}`}>
                    {member.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-medium text-slate-800">{member.department}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Schedule</p>
                    <p className="text-sm font-medium text-slate-800">{member.schedule}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Hire Date</p>
                    <p className="text-sm font-medium text-slate-800">{new Date(member.hireDate).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Attendance</p>
                    <p className="text-sm font-medium text-slate-800">{member.attendance || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Performance</span>
                    <span className="text-sm font-bold text-slate-800 flex items-center">
                      {member.performance}% {getPerformanceEmoji(member.performance)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${getPerformanceColor(member.performance)}`}
                      style={{ width: `${member.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openScheduleModal(member)}
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

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hire Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedStaff.map((member: any) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{member.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{member.name}</div>
                          <div className="text-sm text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {member.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {member.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getPerformanceColor(member.performance)}`}
                            style={{ width: `${member.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 flex items-center">
                          {member.performance}% {getPerformanceEmoji(member.performance)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {member.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(member.hireDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          value={member.status}
                          onChange={(e) => {
                            // Update status in mock data
                            const updatedStaff = staff.map(s => 
                              s.id === member.id ? { ...s, status: e.target.value } : s
                            );
                            setStaff(updatedStaff);
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Break">Break</option>
                          <option value="Offline">Offline</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openScheduleModal(member)}
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

        {/* Performance Insights */}
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
              <p className="text-xl font-bold text-blue-700 mt-2">Kate Williams</p>
              <p className="text-sm text-blue-600">97% performance score</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Department Performance</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">Food & Beverage</p>
              <p className="text-sm text-amber-600">Avg. 91% performance</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Training Needed</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">2 Staff Members</p>
              <p className="text-sm text-emerald-600">Below 80% performance</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Staff Member</h3>
              <button 
                onClick={() => setShowAddStaffModal(false)}
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
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter phone number"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept: string) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter position"
                    value={newStaff.position}
                    onChange={(e) => setNewStaff({...newStaff, position: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddStaffModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddStaff}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">{selectedStaff.name}'s Schedule</h3>
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
                  <span className="text-white font-bold">{selectedStaff.name.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedStaff.name}</h4>
                  <p className="text-sm text-slate-600">{selectedStaff.position} - {selectedStaff.department}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Current Schedule</span>
                  <span className="font-medium text-slate-800">{selectedStaff.schedule}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Upcoming Shifts</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mon, Sep 18</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tue, Sep 19</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Wed, Sep 20</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Thu, Sep 21</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fri, Sep 22</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Performance</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${getPerformanceColor(selectedStaff.performance)}`}
                        style={{ width: `${selectedStaff.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-800 flex items-center">
                      {selectedStaff.performance}% {getPerformanceEmoji(selectedStaff.performance)}
                    </span>
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