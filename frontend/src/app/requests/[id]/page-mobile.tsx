'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import MobileNavigation from '../../../components/MobileNavigation'

interface User {
  name: string;
  role: string;
}

interface Request {
  id: string;
  guestName: string;
  roomNumber: string;
  title: string;
  description: string;
  department: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  notes: string[];
}

export default function MobileRequestDetail({ params }: { params: { id: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [request, setRequest] = useState<Request | null>(null)
  const [newNote, setNewNote] = useState('')

  const router = useRouter()

  useEffect(() => {
    // For prototype, always allow access and mock login
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Admin User', role: 'ADMIN' } as User);
    setIsLoggedIn(true)
    fetchRequest()
  }, [params.id])

  const fetchRequest = async () => {
    // Mock request data
    const mockRequest: Request = {
      id: params.id,
      guestName: 'Emma Davis',
      roomNumber: '201',
      title: 'Extra Pillows',
      description: 'Guest needs additional pillows for their stay. They mentioned they have allergies and need hypoallergenic options if possible.',
      department: 'HOUSEKEEPING',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T11:15:00Z',
      notes: [
        'Requested at 10:30 AM',
        'Assigned to Sarah Johnson',
        'Pillows delivered at 11:15 AM'
      ]
    }
    
    setRequest(mockRequest)
  }

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
    return date.toLocaleString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAddNote = () => {
    if (newNote.trim() && request) {
      const updatedRequest = {
        ...request,
        notes: [...request.notes, newNote]
      }
      setRequest(updatedRequest)
      setNewNote('')
    }
  }

  const handleStatusChange = (newStatus: string) => {
    if (request) {
      const updatedRequest = {
        ...request,
        status: newStatus,
        updatedAt: new Date().toISOString()
      }
      setRequest(updatedRequest)
    }
  }

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading request details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-16">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center text-teal-600 font-medium"
              onClick={() => router.back()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <div className="flex space-x-2">
              <button 
                className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
                onClick={() => router.push(`/requests/${params.id}/edit`)}
              >
                Edit
              </button>
              <button className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition">
                Assign
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-4">{request.title}</h1>
          <p className="text-slate-600 text-sm mt-1">Request #{request.id}</p>
        </div>

        {/* Request Details Card */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{request.guestName.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-slate-900">{request.guestName}</h3>
                <p className="text-sm text-slate-500">Room {request.roomNumber}</p>
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

          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 mb-1">Description</h4>
            <p className="text-slate-600 text-sm">{request.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">Department</h4>
              <p className="text-slate-600 text-sm">{request.department.replace('_', ' ')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">Created</h4>
              <p className="text-slate-600 text-sm">{formatDate(request.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">Last Updated</h4>
              <p className="text-slate-600 text-sm">{formatDate(request.updatedAt)}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Update Status</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`text-xs py-2 px-2 rounded-lg transition ${
                  request.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => handleStatusChange('PENDING')}
              >
                Pending
              </button>
              <button
                className={`text-xs py-2 px-2 rounded-lg transition ${
                  request.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => handleStatusChange('IN_PROGRESS')}
              >
                In Progress
              </button>
              <button
                className={`text-xs py-2 px-2 rounded-lg transition ${
                  request.status === 'COMPLETED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => handleStatusChange('COMPLETED')}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Notes</h3>
          
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {request.notes.map((note, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-700 text-sm">{note}</p>
                <p className="text-xs text-slate-500 mt-1">Just now</p>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              placeholder="Add a note..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-teal-700 transition"
              onClick={handleAddNote}
            >
              Add
            </button>
          </div>
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  )
}