'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Requests() {
  const [requests, setRequests] = useState<any[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [newRequest, setNewRequest] = useState({
    guestName: '',
    roomNumber: '',
    title: '',
    department: '',
    priority: 'MEDIUM',
    description: ''
  })

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype - focus on today's requests
    const mockRequests = [
      { 
        id: 1, 
        guestName: 'John Doe', 
        roomNumber: '205', 
        title: 'Extra towels needed', 
        department: 'Housekeeping', 
        priority: 'MEDIUM', 
        status: 'PENDING',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        description: 'Guest needs extra towels in room 205'
      },
      { 
        id: 2, 
        guestName: 'Jane Smith', 
        roomNumber: '108', 
        title: 'Breakfast order', 
        department: 'Food & Beverage', 
        priority: 'HIGH', 
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        description: 'Guest ordered breakfast to room 108'
      },
      { 
        id: 3, 
        guestName: 'Robert Johnson', 
        roomNumber: '210', 
        title: 'Leaky faucet', 
        department: 'Maintenance', 
        priority: 'URGENT', 
        status: 'PENDING',
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        description: 'Bathroom faucet is leaking in room 210'
      },
      { 
        id: 4, 
        guestName: 'Emily Wilson', 
        roomNumber: '302', 
        title: 'Room service', 
        department: 'Food & Beverage', 
        priority: 'LOW', 
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        description: 'Guest ordered dinner to room 302'
      },
      { 
        id: 5, 
        guestName: 'Michael Brown', 
        roomNumber: '104', 
        title: 'Air conditioning not working', 
        department: 'Maintenance', 
        priority: 'URGENT', 
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 18000000).toISOString(),
        description: 'Air conditioning unit not cooling properly in room 104'
      }
    ]
    
    setRequests(mockRequests)
    
    // Get unique departments
    const uniqueDepartments = Array.from(new Set(mockRequests.map((r: any) => r.department)))
    setDepartments(uniqueDepartments)
  }, [])

  const updateRequestStatus = async (requestId: number, newStatus: string) => {
    // Mock update for prototype
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus, updatedAt: new Date().toISOString() } : request
    ))
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter requests based on selected filters and search term
  const filteredRequests = requests.filter(request => {
    const departmentMatch = selectedDepartment 
      ? request.department === selectedDepartment 
      : true
    const statusMatch = selectedStatus 
      ? request.status === selectedStatus 
      : true
    const priorityMatch = selectedPriority 
      ? request.priority === selectedPriority 
      : true
    const searchMatch = searchTerm 
      ? request.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        request.roomNumber.includes(searchTerm) ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return departmentMatch && statusMatch && priorityMatch && searchMatch
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddRequest = () => {
    const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1
    const requestToAdd = {
      ...newRequest,
      id: newId,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    }
    
    setRequests([...requests, requestToAdd])
    
    // Reset form and close modal
    setNewRequest({
      guestName: '',
      roomNumber: '',
      title: '',
      department: '',
      priority: 'MEDIUM',
      description: ''
    })
    setShowNewRequestModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Guest Requests</h2>
            <p className="text-slate-600">Manage today's guest requests</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowNewRequestModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Request
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{requests.filter(r => r.status === 'PENDING').length}</p>
            <p className="text-sm text-slate-600">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{requests.filter(r => r.status === 'IN_PROGRESS').length}</p>
            <p className="text-sm text-slate-600">In Progress</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{requests.filter(r => r.status === 'COMPLETED').length}</p>
            <p className="text-sm text-slate-600">Completed</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{requests.filter(r => r.priority === 'URGENT').length}</p>
            <p className="text-sm text-rose-600">Urgent</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Guest, room, or request"
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
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedDepartment('')
                  setSelectedStatus('')
                  setSelectedPriority('')
                  setSearchTerm('')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Requests List - Simplified for daily operations */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest & Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredRequests.map((request: any) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{request.guestName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{request.guestName}</div>
                          <div className="text-sm text-slate-500">Room {request.roomNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{request.title}</div>
                      <div className="text-sm text-slate-500">{request.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.department}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          value={request.status}
                          onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Operations Notes */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Today's Operations Notes</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">Add Note</button>
          </div>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">Front Desk Updates</h4>
                <span className="text-xs text-slate-500">9:15 AM</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">3 early check-ins today. Rooms 201, 305, and 402 are ready for guests.</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">From: Sarah Johnson</span>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">Maintenance Updates</h4>
                <span className="text-xs text-slate-500">11:30 AM</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Room 104 AC unit repaired. Unit tested and functioning normally.</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">From: David Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Request Modal - Simplified for quick entry */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Quick Request Entry</h3>
              <button 
                onClick={() => setShowNewRequestModal(false)}
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Guest Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Guest name"
                      value={newRequest.guestName}
                      onChange={(e) => setNewRequest({...newRequest, guestName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Room number"
                      value={newRequest.roomNumber}
                      onChange={(e) => setNewRequest({...newRequest, roomNumber: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Request</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="What does the guest need?"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept: string) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowNewRequestModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddRequest}
              >
                Add Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}