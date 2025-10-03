'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import MobileRequests from './page-mobile'

export default function Requests() {
  const [requests, setRequests] = useState<any[]>([])
  const [filteredRequests, setFilteredRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  // Mock data for requests
  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    // Load mock data
    setTimeout(() => {
      const mockRequests = [
        { id: 1, patientId: 'P001', patientName: 'John Smith', roomNumber: '201', department: 'Housekeeping', title: 'Clean room', description: 'Need room cleaning urgently', priority: 'High', status: 'Pending', timestamp: new Date(Date.now() - 3600000).toISOString(), assignedTo: 'Nurse Alice' },
        { id: 2, patientId: 'P002', patientName: 'Sarah Johnson', roomNumber: '203', department: 'Maintenance', title: 'AC not working', description: 'Room AC is malfunctioning', priority: 'Medium', status: 'In Progress', timestamp: new Date(Date.now() - 1800000).toISOString(), assignedTo: 'Technician Bob' },
        { id: 3, patientId: 'P003', patientName: 'Robert Williams', roomNumber: '301', department: 'Food Service', title: 'Special dietary request', description: 'Patient requested low sodium meals', priority: 'Low', status: 'Completed', timestamp: new Date(Date.now() - 7200000).toISOString(), assignedTo: 'Chef Carol' },
        { id: 4, patientId: 'P004', patientName: 'Emily Davis', roomNumber: '305', department: 'Medical', title: 'Medication reminder', description: 'Patient needs medication at 4 PM', priority: 'High', status: 'Pending', timestamp: new Date(Date.now() - 14400000).toISOString(), assignedTo: 'Dr. Mike' },
        { id: 5, patientId: 'P005', patientName: 'Michael Brown', roomNumber: '401', department: 'Security', title: 'Visitor request', description: 'Patient wants to receive visitors', priority: 'Low', status: 'Completed', timestamp: new Date(Date.now() - 21600000).toISOString(), assignedTo: 'Guard David' },
        { id: 6, patientId: 'P006', patientName: 'Jennifer Wilson', roomNumber: '405', department: 'Housekeeping', title: 'Extra towels', description: 'Patient requested extra towels and blankets', priority: 'Medium', status: 'In Progress', timestamp: new Date(Date.now() - 900000).toISOString(), assignedTo: 'Staff Emma' },
        { id: 7, patientId: 'P007', patientName: 'David Miller', roomNumber: '501', department: 'Pharmacy', title: 'Medicine refill', description: 'Patient needs prescription refill', priority: 'High', status: 'Pending', timestamp: new Date(Date.now() - 600000).toISOString(), assignedTo: 'Pharmacist John' },
        { id: 8, patientId: 'P008', patientName: 'Lisa Taylor', roomNumber: '503', department: 'Medical', title: 'Physical therapy', description: 'Patient needs physical therapy session', priority: 'Medium', status: 'Completed', timestamp: new Date(Date.now() - 28800000).toISOString(), assignedTo: 'Therapist Susan' }
      ]
      
      setRequests(mockRequests)
      setFilteredRequests(mockRequests)
      setLoading(false)
    }, 500)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Apply filters when any filter changes
  useEffect(() => {
    let result = requests
    
    if (selectedStatus !== 'all') {
      result = result.filter(request => request.status === selectedStatus)
    }
    
    if (selectedDepartment !== 'all') {
      result = result.filter(request => request.department === selectedDepartment)
    }
    
    if (selectedPriority !== 'all') {
      result = result.filter(request => request.priority === selectedPriority)
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(request => 
        request.patientName.toLowerCase().includes(term) ||
        request.title.toLowerCase().includes(term) ||
        request.description.toLowerCase().includes(term) ||
        request.roomNumber.toLowerCase().includes(term)
      )
    }
    
    setFilteredRequests(result)
  }, [selectedStatus, selectedDepartment, selectedPriority, searchTerm, requests])

  // Render mobile requests page for small screens
  if (isMobile) {
    return <MobileRequests />
  }

  // Status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800'
      case 'In Progress':
        return 'bg-amber-100 text-amber-800'
      case 'Pending':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Priority badge class
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-800'
      case 'Medium':
        return 'bg-amber-100 text-amber-800'
      case 'Low':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Department badge class
  const getDepartmentClass = (department: string) => {
    switch (department) {
      case 'Medical':
        return 'bg-blue-100 text-blue-800'
      case 'Housekeeping':
        return 'bg-purple-100 text-purple-800'
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800'
      case 'Food Service':
        return 'bg-emerald-100 text-emerald-800'
      case 'Pharmacy':
        return 'bg-indigo-100 text-indigo-800'
      case 'Security':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Function to update request status
  const updateRequestStatus = (requestId: number, newStatus: string) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ))
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
      <Header user={{ name: 'Admin User', role: 'ADMIN' } as any} onLogout={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Medical Requests Management</h2>
            <p className="text-slate-600">Track and manage patient requests across all departments</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{requests.filter(r => r.status === 'Pending').length}</p>
            <p className="text-sm text-rose-600">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{requests.filter(r => r.status === 'In Progress').length}</p>
            <p className="text-sm text-amber-600">In Progress</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{requests.filter(r => r.status === 'Completed').length}</p>
            <p className="text-sm text-emerald-600">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-700">{requests.length}</p>
            <p className="text-sm text-slate-600">Total Requests</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Patient, room, or request"
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
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
                <option value="all">All Departments</option>
                <option value="Medical">Medical</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Food Service">Food Service</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <div>
              <label htmlFor="priorityFilter" className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select
                id="priorityFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('all')
                  setSelectedDepartment('all')
                  setSelectedPriority('all')
                  setSearchTerm('')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRequests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white rounded-xl shadow p-5 border-l-4 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: 
                  request.status === 'Pending' ? '#f87171' : // rose-500
                  request.status === 'In Progress' ? '#fbbf24' : // amber-500
                  '#10b981' // emerald-500
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800">{request.title}</h3>
                  <p className="text-sm text-slate-600">Room {request.roomNumber} • {request.patientName}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-slate-600 line-clamp-2">{request.description}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDepartmentClass(request.department)}`}>
                    {request.department}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(request.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <p className="text-sm text-slate-600">Assigned to: {request.assignedTo}</p>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{request.patientName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{request.patientName}</div>
                          <div className="text-sm text-slate-500">ID: {request.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.roomNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{request.title}</div>
                        <div className="text-sm text-slate-500">{request.description.substring(0, 40)}{request.description.length > 40 ? '...' : ''}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDepartmentClass(request.department)}`}>
                        {request.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={request.status}
                          onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}