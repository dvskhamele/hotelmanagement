'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false)
  const [showDepartmentDetailModal, setShowDepartmentDetailModal] = useState(false)
  const [selectedDeptDetails, setSelectedDeptDetails] = useState<any>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    head: '',
    phone: '',
    email: ''
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
    const mockDepartments = [
      {
        id: 1,
        name: 'Housekeeping',
        description: 'Responsible for maintaining cleanliness and hygiene throughout the hotel',
        head: 'Alice Johnson',
        phone: '+1234567890',
        email: 'housekeeping@hotel.com',
        staffCount: 12,
        openRequests: 8,
        completedToday: 15
      },
      {
        id: 2,
        name: 'Maintenance',
        description: 'Handles all repair and maintenance tasks throughout the property',
        head: 'David Wilson',
        phone: '+1234567891',
        email: 'maintenance@hotel.com',
        staffCount: 6,
        openRequests: 5,
        completedToday: 7
      },
      {
        id: 3,
        name: 'Food & Beverage',
        description: 'Manages all dining services including restaurants and room service',
        head: 'Frank Miller',
        phone: '+1234567892',
        email: 'f&b@hotel.com',
        staffCount: 18,
        openRequests: 12,
        completedToday: 28
      },
      {
        id: 4,
        name: 'Front Desk',
        description: 'Handles guest check-ins, check-outs, and general inquiries',
        head: 'Kate Williams',
        phone: '+1234567893',
        email: 'frontdesk@hotel.com',
        staffCount: 8,
        openRequests: 3,
        completedToday: 22
      },
      {
        id: 5,
        name: 'Concierge',
        description: 'Assists guests with reservations, recommendations, and special requests',
        head: 'Michael Brown',
        phone: '+1234567894',
        email: 'concierge@hotel.com',
        staffCount: 4,
        openRequests: 7,
        completedToday: 9
      },
      {
        id: 6,
        name: 'Security',
        description: 'Ensures the safety and security of guests and property',
        head: 'Robert Taylor',
        phone: '+1234567895',
        email: 'security@hotel.com',
        staffCount: 6,
        openRequests: 1,
        completedToday: 3
      }
    ]
    
    setDepartments(mockDepartments)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddDepartment = () => {
    const newId = departments.length > 0 ? Math.max(...departments.map((d: any) => d.id)) + 1 : 1
    const departmentToAdd = {
      ...newDepartment,
      id: newId,
      staffCount: 0,
      openRequests: 0,
      completedToday: 0
    }
    
    setDepartments([...departments, departmentToAdd])
    
    // Reset form and close modal
    setNewDepartment({
      name: '',
      description: '',
      head: '',
      phone: '',
      email: ''
    })
    setShowAddDepartmentModal(false)
  }

  const viewDepartmentDetails = (dept: any) => {
    setSelectedDeptDetails(dept)
    setShowDepartmentDetailModal(true)
  }

  // Filter departments if needed
  const filteredDepartments = selectedDepartment 
    ? departments.filter(dept => dept.name === selectedDepartment)
    : departments

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Department Coordination</h2>
            <p className="text-slate-600">Manage and coordinate between hotel departments</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddDepartmentModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Department
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{departments.length}</p>
            <p className="text-sm text-slate-600">Total Departments</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">
              {departments.reduce((total, dept) => total + dept.staffCount, 0)}
            </p>
            <p className="text-sm text-blue-600">Total Staff</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">
              {departments.reduce((total, dept) => total + dept.openRequests, 0)}
            </p>
            <p className="text-sm text-amber-600">Open Requests</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">
              {departments.reduce((total, dept) => total + dept.completedToday, 0)}
            </p>
            <p className="text-sm text-emerald-600">Completed Today</p>
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDepartments.map((dept: any) => (
            <div 
              key={dept.id} 
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-slate-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{dept.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{dept.description}</p>
                </div>
                <button 
                  className="text-slate-400 hover:text-teal-600"
                  onClick={() => viewDepartmentDetails(dept)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold">{dept.head.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-800">{dept.head}</p>
                    <p className="text-xs text-slate-500">Department Head</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-slate-800">{dept.staffCount}</p>
                  <p className="text-xs text-slate-600">Staff</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-amber-700">{dept.openRequests}</p>
                  <p className="text-xs text-amber-600">Open</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-emerald-700">{dept.completedToday}</p>
                  <p className="text-xs text-emerald-600">Done</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                  View Requests
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
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Coordination Matrix */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Department Coordination Matrix</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Communication Log</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Housekeeping</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Maintenance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Food & Beverage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Front Desk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Concierge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Security</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Housekeeping</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800">
                      Low
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Maintenance</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Food & Beverage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Front Desk</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Concierge</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Security</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interdepartmental Communication */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Communications</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">Housekeeping → Front Desk</h4>
                <span className="text-xs text-slate-500">2 hours ago</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Room 205 is now clean and ready for check-in.</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">From: Alice Johnson</span>
                <button className="text-xs text-teal-600 hover:text-teal-800">Reply</button>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">Maintenance → Housekeeping</h4>
                <span className="text-xs text-slate-500">5 hours ago</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">AC unit in Room 302 has been repaired. Please inspect and confirm.</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">From: David Wilson</span>
                <button className="text-xs text-teal-600 hover:text-teal-800">Reply</button>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">Front Desk → Food & Beverage</h4>
                <span className="text-xs text-slate-500">1 day ago</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Guest in Room 108 has requested late checkout until 2pm. Please adjust room service timing.</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">From: Kate Williams</span>
                <button className="text-xs text-teal-600 hover:text-teal-800">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Department Modal */}
      {showAddDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Department</h3>
              <button 
                onClick={() => setShowAddDepartmentModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter department name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter department description"
                    rows={3}
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department Head</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter head of department"
                    value={newDepartment.head}
                    onChange={(e) => setNewDepartment({...newDepartment, head: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter phone"
                      value={newDepartment.phone}
                      onChange={(e) => setNewDepartment({...newDepartment, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter email"
                      value={newDepartment.email}
                      onChange={(e) => setNewDepartment({...newDepartment, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddDepartmentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddDepartment}
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Department Detail Modal */}
      {showDepartmentDetailModal && selectedDeptDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">{selectedDeptDetails.name} Details</h3>
              <button 
                onClick={() => setShowDepartmentDetailModal(false)}
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
                  <span className="text-white font-bold">{selectedDeptDetails.head.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedDeptDetails.head}</h4>
                  <p className="text-sm text-slate-600">Department Head</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Department Information</h4>
                  <p className="text-sm text-slate-600">{selectedDeptDetails.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-600">Staff Members</p>
                    <p className="text-lg font-bold text-slate-800">{selectedDeptDetails.staffCount}</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-600">Open Requests</p>
                    <p className="text-lg font-bold text-amber-700">{selectedDeptDetails.openRequests}</p>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-3">
                  <p className="text-sm text-slate-600">Completed Today</p>
                  <p className="text-lg font-bold text-emerald-700">{selectedDeptDetails.completedToday}</p>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-sm text-slate-600">{selectedDeptDetails.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-sm text-slate-600">{selectedDeptDetails.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end">
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => setShowDepartmentDetailModal(false)}
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