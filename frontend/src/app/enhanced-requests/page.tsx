'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function EnhancedRequests() {
  const [requests, setRequests] = useState<any[]>([])
  const [filteredRequests, setFilteredRequests] = useState<any[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [staff, setStaff] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [newRequest, setNewRequest] = useState({
    guestName: '',
    roomNumber: '',
    title: '',
    department: '',
    priority: 'MEDIUM',
    description: ''
  })
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN', id: 1 } as any)
    }

    fetchRequests()
    fetchStaff()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      // In a real implementation, this would call our new API
      // For prototype, we'll use mock data
      const mockRequests = [
        { 
          id: 1, 
          guestName: 'John Doe', 
          roomNumber: '205', 
          title: 'Extra towels needed', 
          department: 'Housekeeping', 
          priority: 'MEDIUM', 
          status: 'PENDING',
          assignedTo: null,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          description: 'Guest needs extra towels in room 205',
          comments: [
            {
              id: 1,
              comment: 'Noted, will deliver shortly',
              staffId: 2,
              staffName: 'Alice Johnson',
              timestamp: new Date(Date.now() - 1800000).toISOString()
            }
          ]
        },
        { 
          id: 2, 
          guestName: 'Jane Smith', 
          roomNumber: '108', 
          title: 'Breakfast order', 
          department: 'Food & Beverage', 
          priority: 'HIGH', 
          status: 'IN_PROGRESS',
          assignedTo: 3,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          description: 'Guest ordered breakfast to room 108',
          comments: []
        },
        { 
          id: 3, 
          guestName: 'Robert Johnson', 
          roomNumber: '210', 
          title: 'Leaky faucet', 
          department: 'Maintenance', 
          priority: 'URGENT', 
          status: 'PENDING',
          assignedTo: null,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          description: 'Bathroom faucet is leaking in room 210',
          comments: []
        },
        { 
          id: 4, 
          guestName: 'Emily Wilson', 
          roomNumber: '302', 
          title: 'Room service', 
          department: 'Food & Beverage', 
          priority: 'LOW', 
          status: 'COMPLETED',
          assignedTo: 4,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          description: 'Guest ordered dinner to room 302',
          comments: [
            {
              id: 1,
              comment: 'Order placed',
              staffId: 4,
              staffName: 'Mike Thompson',
              timestamp: new Date(Date.now() - 12600000).toISOString()
            },
            {
              id: 2,
              comment: 'Delivered to room',
              staffId: 4,
              staffName: 'Mike Thompson',
              timestamp: new Date(Date.now() - 12000000).toISOString()
            }
          ]
        },
        { 
          id: 5, 
          guestName: 'Michael Brown', 
          roomNumber: '104', 
          title: 'Air conditioning not working', 
          department: 'Maintenance', 
          priority: 'URGENT', 
          status: 'IN_PROGRESS',
          assignedTo: 5,
          createdAt: new Date(Date.now() - 18000000).toISOString(),
          description: 'Air conditioning unit not cooling properly in room 104',
          comments: [
            {
              id: 1,
              comment: 'Technician dispatched',
              staffId: 5,
              staffName: 'David Wilson',
              timestamp: new Date(Date.now() - 16200000).toISOString()
            }
          ]
        }
      ]
      
      setRequests(mockRequests)
      setFilteredRequests(mockRequests)
      
      // Get unique departments
      const uniqueDepartments = Array.from(new Set(mockRequests.map((r: any) => r.department)))
      setDepartments(uniqueDepartments)
      
      setError('')
    } catch (err) {
      console.error('Error fetching requests:', err)
      setError('Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  const fetchStaff = async () => {
    // Mock staff data
    const mockStaff = [
      { id: 1, name: 'Admin User', department: 'Management' },
      { id: 2, name: 'Alice Johnson', department: 'Housekeeping' },
      { id: 3, name: 'Bob Smith', department: 'Food & Beverage' },
      { id: 4, name: 'Mike Thompson', department: 'Food & Beverage' },
      { id: 5, name: 'David Wilson', department: 'Maintenance' }
    ]
    
    setStaff(mockStaff)
  }

  useEffect(() => {
    // Filter requests based on selected filters and search term
    let result = requests
    
    if (selectedDepartment) {
      result = result.filter(request => request.department === selectedDepartment)
    }
    
    if (selectedStatus) {
      result = result.filter(request => request.status === selectedStatus)
    }
    
    if (selectedPriority) {
      result = result.filter(request => request.priority === selectedPriority)
    }
    
    if (selectedStaff) {
      result = result.filter(request => 
        request.assignedTo === parseInt(selectedStaff) || 
        request.comments?.some((c: any) => c.staffId === parseInt(selectedStaff))
      )
    }
    
    if (searchTerm) {
      result = result.filter(request => 
        request.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        request.roomNumber.includes(searchTerm) ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredRequests(result)
  }, [requests, selectedDepartment, selectedStatus, selectedPriority, selectedStaff, searchTerm])

  const updateRequestStatus = async (requestId: number, newStatus: string) => {
    try {
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      setRequests(requests.map(request => 
        request.id === requestId ? { ...request, status: newStatus, updatedAt: new Date().toISOString() } : request
      ))
      
      // If we're viewing the request details, update that too
      if (selectedRequest && selectedRequest.id === requestId) {
        setSelectedRequest({ ...selectedRequest, status: newStatus, updatedAt: new Date().toISOString() })
      }
      
      // Show success message
      setError('Request status updated successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error updating request status:', error)
      setError('Failed to update request status')
    }
  }

  const assignRequestToStaff = async (requestId: number, staffId: number) => {
    try {
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      setRequests(requests.map(request => 
        request.id === requestId ? { ...request, assignedTo: staffId } : request
      ))
      
      // If we're viewing the request details, update that too
      if (selectedRequest && selectedRequest.id === requestId) {
        const assignedStaff = staff.find(s => s.id === staffId)
        setSelectedRequest({ 
          ...selectedRequest, 
          assignedTo: staffId,
          assignedToName: assignedStaff ? assignedStaff.name : 'Unknown Staff'
        })
      }
      
      // Show success message
      setError('Request assigned successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error assigning request:', error)
      setError('Failed to assign request')
    }
  }

  const addCommentToRequest = async (requestId: number) => {
    try {
      if (!newComment.trim()) return
      
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      const comment = {
        id: Date.now(), // Simple ID for prototype
        comment: newComment,
        staffId: user.id,
        staffName: user.name,
        timestamp: new Date().toISOString()
      }
      
      setRequests(requests.map(request => {
        if (request.id === requestId) {
          const updatedComments = request.comments ? [...request.comments, comment] : [comment]
          return { ...request, comments: updatedComments }
        }
        return request
      }))
      
      // If we're viewing the request details, update that too
      if (selectedRequest && selectedRequest.id === requestId) {
        const updatedComments = selectedRequest.comments ? [...selectedRequest.comments, comment] : [comment]
        setSelectedRequest({ ...selectedRequest, comments: updatedComments })
      }
      
      // Clear comment input
      setNewComment('')
      
      // Show success message
      setError('Comment added successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error adding comment:', error)
      setError('Failed to add comment')
    }
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
      assignedTo: null,
      createdAt: new Date().toISOString(),
      comments: []
    }
    
    setRequests([...requests, requestToAdd])
    setFilteredRequests([...filteredRequests, requestToAdd])
    
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
    
    // Show success message
    setError('Request created successfully')
    setTimeout(() => setError(''), 3000)
  }

  const openRequestDetail = (request: any) => {
    setSelectedRequest(request)
    setShowRequestDetailModal(true)
  }

  const closeRequestDetail = () => {
    setShowRequestDetailModal(false)
    setSelectedRequest(null)
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
            <h2 className="text-2xl font-bold text-slate-800">Enhanced Guest Requests</h2>
            <p className="text-slate-600">Manage guest requests with advanced features</p>
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

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${error.includes('Failed') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {error}
          </div>
        )}

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

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Guest, room, or request"
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
                {departments.map((dept: string) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
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
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
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
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div>
              <label htmlFor="staffFilter" className="block text-sm font-medium text-slate-700 mb-1">Staff</label>
              <select
                id="staffFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">All Staff</option>
                {staff.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
              onClick={() => {
                setSelectedDepartment('')
                setSelectedStatus('')
                setSelectedPriority('')
                setSelectedStaff('')
                setSearchTerm('')
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Requests List */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
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
                      {request.comments && request.comments.length > 0 && (
                        <div className="mt-1 text-xs text-slate-400">
                          {request.comments.length} comment{request.comments.length !== 1 ? 's' : ''}
                        </div>
                      )}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.assignedTo ? 
                        (staff.find(s => s.id === request.assignedTo)?.name || 'Unknown Staff') : 
                        'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openRequestDetail(request)}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          View
                        </button>
                        <select
                          className="px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
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
      </main>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Create New Request</h3>
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Guest name"
                      value={newRequest.guestName}
                      onChange={(e) => setNewRequest({...newRequest, guestName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Room number"
                      value={newRequest.roomNumber}
                      onChange={(e) => setNewRequest({...newRequest, roomNumber: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Request Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="What does the guest need?"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Detailed description of the request"
                    rows={3}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  />
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
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Detail Modal */}
      {showRequestDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Request Details</h3>
              <button 
                onClick={closeRequestDetail}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Request Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Guest:</span>
                      <span className="text-sm font-medium">{selectedRequest.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Room:</span>
                      <span className="text-sm font-medium">{selectedRequest.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Department:</span>
                      <span className="text-sm font-medium">{selectedRequest.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(selectedRequest.priority)}`}>
                        {selectedRequest.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Assigned To:</span>
                      <span className="text-sm font-medium">
                        {selectedRequest.assignedTo ? 
                          (staff.find(s => s.id === selectedRequest.assignedTo)?.name || 'Unknown Staff') : 
                          'Unassigned'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Created:</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Update Status</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedRequest.status}
                        onChange={(e) => updateRequestStatus(selectedRequest.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Assign To Staff</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedRequest.assignedTo || ''}
                        onChange={(e) => assignRequestToStaff(selectedRequest.id, parseInt(e.target.value))}
                      >
                        <option value="">Unassigned</option>
                        {staff
                          .filter(s => s.department === selectedRequest.department)
                          .map((s: any) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Description</h4>
                <p className="text-sm text-slate-600">{selectedRequest.description}</p>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Comments</h4>
                <div className="space-y-4">
                  {selectedRequest.comments && selectedRequest.comments.length > 0 ? (
                    selectedRequest.comments.map((comment: any) => (
                      <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div className="font-medium text-slate-800">{comment.staffName}</div>
                          <div className="text-xs text-slate-500">
                            {new Date(comment.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No comments yet</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Add Comment</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                      onClick={() => addCommentToRequest(selectedRequest.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}