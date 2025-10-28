'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'

interface User {
  name: string;
  role: string;
}

interface Request {
  id: string;
  patientName: string;
  roomNumber: string;
  title: string;
  description: string;
  department: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function MobileRequests() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const router = useRouter()

  useEffect(() => {
    // For prototype, always allow access and mock login
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Admin User', role: 'ADMIN' } as User);
    setIsLoggedIn(true)
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    // Mock requests data
    const mockRequests: Request[] = [
      {
        id: '1001',
        patientName: 'John Smith',
        roomNumber: '201',
        title: 'Pain Medication',
        description: 'Patient requests additional pain medication for post-operative care',
        department: 'PHARMACY',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2023-09-28T10:30:00Z',
        updatedAt: '2023-09-28T11:15:00Z'
      },
      {
        id: '1002',
        patientName: 'Mary Johnson',
        roomNumber: '305',
        title: 'X-ray Request',
        description: 'X-ray of chest requested by attending physician',
        department: 'RADIOLOGY',
        priority: 'URGENT',
        status: 'PENDING',
        createdAt: '2023-09-28T09:45:00Z',
        updatedAt: '2023-09-28T09:45:00Z'
      },
      {
        id: '1003',
        patientName: 'Robert Williams',
        roomNumber: '108',
        title: 'Dietary Consultation',
        description: 'Patient needs consultation with dietitian for diabetes management',
        department: 'NUTRITION',
        priority: 'MEDIUM',
        status: 'COMPLETED',
        createdAt: '2023-09-27T08:20:00Z',
        updatedAt: '2023-09-27T09:00:00Z'
      },
      {
        id: '1004',
        patientName: 'Patricia Davis',
        roomNumber: '402',
        title: 'Physical Therapy',
        description: 'Patient requires physical therapy session for post-surgery recovery',
        department: 'PHYSICAL_THERAPY',
        priority: 'MEDIUM',
        status: 'COMPLETED',
        createdAt: '2023-09-27T07:15:00Z',
        updatedAt: '2023-09-27T07:30:00Z'
      },
      {
        id: '1005',
        patientName: 'James Wilson',
        roomNumber: '207',
        title: 'Lab Test - CBC',
        description: 'Complete blood count test requested by attending physician',
        department: 'LABORATORY',
        priority: 'HIGH',
        status: 'PENDING',
        createdAt: '2023-09-26T20:30:00Z',
        updatedAt: '2023-09-26T20:30:00Z'
      },
      {
        id: '1006',
        patientName: 'Sarah Miller',
        roomNumber: '312',
        title: 'Nebulizer Treatment',
        description: 'Patient needs nebulizer treatment for respiratory condition',
        department: 'RESPIRATORY_THERAPY',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        createdAt: '2023-09-26T16:45:00Z',
        updatedAt: '2023-09-26T17:00:00Z'
      }
    ]
    
    setRequests(mockRequests)
    setFilteredRequests(mockRequests)
  }

  useEffect(() => {
    let result = requests
    
    // Apply status filter
    if (filter !== 'all') {
      result = result.filter(request => request.status === filter)
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(request => 
        request.patientName.toLowerCase().includes(query) ||
        request.roomNumber.includes(query) ||
        request.title.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query)
      )
    }
    
    setFilteredRequests(result)
  }, [filter, searchQuery, requests])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-16">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">Medical Requests</h1>
            <button 
              className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
              onClick={() => router.push('/requests/new')}
            >
              + New
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-1">Manage all patient requests in one place</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col space-y-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search Requests</label>
              <input
                type="text"
                id="search"
                placeholder="Search by patient, room, or request..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Status</label>
              <div className="grid grid-cols-4 gap-2">
                {['all', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
                  <button
                    key={status}
                    className={`text-xs py-2 px-2 rounded-lg transition ${
                      filter === status
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setFilter(status)}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-slate-900">No requests found</h3>
              <p className="mt-1 text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
                onClick={() => router.push(`/requests/${request.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{request.patientName.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-slate-900">{request.patientName}</h3>
                        <p className="text-xs text-slate-500">Room {request.roomNumber}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-base font-medium text-slate-800">{request.title}</h4>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{request.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityClass(request.priority)}`}>
                      {request.priority}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {formatDate(request.createdAt)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {request.department.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  )
}