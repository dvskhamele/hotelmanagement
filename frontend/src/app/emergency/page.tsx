'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Emergency() {
  const [emergencies, setEmergencies] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [sortBy, setSortBy] = useState('time')
  const [sortOrder, setSortOrder] = useState('desc')
  const [stats, setStats] = useState({ total: 0, active: 0, critical: 0, high: 0, medium: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddEmergencyModal, setShowAddEmergencyModal] = useState(false)
  const [newEmergency, setNewEmergency] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    condition: '',
    priority: 'High',
    status: 'Active',
    arrivalTime: new Date().toISOString(),
    department: 'Emergency',
    doctorAssigned: '',
    room: '',
    notes: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchEmergencies()
    }
  }, [])

  const fetchEmergencies = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital emergency management
      const mockEmergencies = [
        { id: 1, patientName: 'John Smith', age: 45, gender: 'Male', condition: 'Heart Attack', priority: 'Critical', status: 'Active', arrivalTime: new Date(Date.now() - 3600000).toISOString(), department: 'Cardiology', doctorAssigned: 'Dr. Alice Johnson', room: 'E101', waitTime: 15 },
        { id: 2, patientName: 'Mary Johnson', age: 32, gender: 'Female', condition: 'Severe Asthma Attack', priority: 'High', status: 'Active', arrivalTime: new Date(Date.now() - 1800000).toISOString(), department: 'Pulmonology', doctorAssigned: 'Dr. Michael Chen', room: 'E102', waitTime: 22 },
        { id: 3, patientName: 'Robert Williams', age: 78, gender: 'Male', condition: 'Stroke', priority: 'Critical', status: 'Active', arrivalTime: new Date(Date.now() - 1200000).toISOString(), department: 'Neurology', doctorAssigned: 'Dr. Eva Brown', room: 'E103', waitTime: 8 },
        { id: 4, patientName: 'Patricia Davis', age: 28, gender: 'Female', condition: 'Multiple Injuries', priority: 'High', status: 'Completed', arrivalTime: new Date(Date.now() - 3600000).toISOString(), department: 'Trauma', doctorAssigned: 'Dr. David Wilson', room: 'E104', waitTime: 35 },
        { id: 5, patientName: 'James Wilson', age: 55, gender: 'Male', condition: 'Appendicitis', priority: 'Medium', status: 'Active', arrivalTime: new Date(Date.now() - 300000).toISOString(), department: 'Surgery', doctorAssigned: 'Dr. Frank Miller', room: 'E105', waitTime: 45 },
        { id: 6, patientName: 'Sarah Miller', age: 40, gender: 'Female', condition: 'Severe Allergic Reaction', priority: 'High', status: 'Active', arrivalTime: new Date(Date.now() - 600000).toISOString(), department: 'Allergy', doctorAssigned: 'Dr. Grace Lee', room: 'E106', waitTime: 12 },
        { id: 7, patientName: 'Michael Brown', age: 67, gender: 'Male', condition: 'Fractured Hip', priority: 'Medium', status: 'Active', arrivalTime: new Date(Date.now() - 900000).toISOString(), department: 'Orthopedics', doctorAssigned: 'Dr. Henry Taylor', room: 'E107', waitTime: 30 },
        { id: 8, patientName: 'Jennifer Wilson', age: 35, gender: 'Female', condition: 'Car Accident', priority: 'Critical', status: 'Active', arrivalTime: new Date(Date.now() - 300000).toISOString(), department: 'Trauma', doctorAssigned: 'Dr. Jack Roberts', room: 'E108', waitTime: 5 }
      ];
      
      setEmergencies(mockEmergencies);
      
      // Calculate stats
      const total = mockEmergencies.length;
      const active = mockEmergencies.filter(e => e.status === 'Active').length;
      const critical = mockEmergencies.filter(e => e.priority === 'Critical').length;
      const high = mockEmergencies.filter(e => e.priority === 'High').length;
      const medium = mockEmergencies.filter(e => e.priority === 'Medium').length;
      
      setStats({ total, active, critical, high, medium });
    } catch (err) {
      console.error('Error fetching emergencies:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800'
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-amber-100 text-amber-800'
      case 'Low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800'
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter emergencies based on selected status, priority, and search term
  const filteredEmergencies = emergencies.filter(emergency => {
    const statusMatch = selectedStatus ? emergency.status === selectedStatus : true
    const priorityMatch = selectedPriority ? emergency.priority === selectedPriority : true
    const searchMatch = searchTerm 
      ? emergency.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emergency.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emergency.doctorAssigned.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && priorityMatch && searchMatch
  })

  // Sort emergencies
  const sortedEmergencies = [...filteredEmergencies].sort((a, b) => {
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

  const handleAddEmergency = () => {
    const newId = emergencies.length > 0 ? Math.max(...emergencies.map(e => e.id)) + 1 : 1
    const emergencyToAdd = {
      ...newEmergency,
      id: newId,
      arrivalTime: new Date().toISOString(),
      waitTime: Math.floor(Math.random() * 30) + 5 // Random wait time between 5-35 minutes
    }
    
    setEmergencies([emergencyToAdd, ...emergencies])
    
    // Update stats
    const total = emergencies.length + 1;
    const active = newEmergency.status === 'Active' ? stats.active + 1 : stats.active;
    const critical = newEmergency.priority === 'Critical' ? stats.critical + 1 : stats.critical;
    const high = newEmergency.priority === 'High' ? stats.high + 1 : stats.high;
    const medium = newEmergency.priority === 'Medium' ? stats.medium + 1 : stats.medium;
    
    setStats({ total, active, critical, high, medium })
    
    // Reset form and close modal
    setNewEmergency({
      patientName: '',
      age: '',
      gender: 'Male',
      condition: '',
      priority: 'High',
      status: 'Active',
      arrivalTime: new Date().toISOString(),
      department: 'Emergency',
      doctorAssigned: '',
      room: '',
      notes: ''
    })
    setShowAddEmergencyModal(false)
  }

  // Function to update emergency status
  const updateEmergencyStatus = (emergencyId: number, newStatus: string) => {
    const updatedEmergencies = emergencies.map(emergency => 
      emergency.id === emergencyId ? { ...emergency, status: newStatus } : emergency
    );
    
    setEmergencies(updatedEmergencies);
    
    // Update stats
    const active = updatedEmergencies.filter(e => e.status === 'Active').length;
    const critical = updatedEmergencies.filter(e => e.priority === 'Critical').length;
    const high = updatedEmergencies.filter(e => e.priority === 'High').length;
    const medium = updatedEmergencies.filter(e => e.priority === 'Medium').length;
    
    setStats({ 
      total: updatedEmergencies.length, 
      active, 
      critical, 
      high, 
      medium 
    })
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
            <h2 className="text-2xl font-bold text-slate-800">Emergency Management System</h2>
            <p className="text-slate-600">Manage emergency cases, patient care, and critical situations</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
              onClick={() => setShowAddEmergencyModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Case
            </button>
            <button 
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Emergency
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Cases</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.active}</p>
            <p className="text-sm text-blue-600">Active Cases</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.critical}</p>
            <p className="text-sm text-rose-600">Critical</p>
          </div>
          <div className="bg-red-50 rounded-xl shadow p-4 text-center border-l-4 border-red-500">
            <p className="text-2xl font-bold text-red-700">{stats.high}</p>
            <p className="text-sm text-red-600">High Priority</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.medium}</p>
            <p className="text-sm text-amber-600">Medium Priority</p>
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
                placeholder="Patient, condition, or doctor"
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
                <option value="Completed">Completed</option>
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
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
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
                <option value="time">Arrival Time</option>
                <option value="priority">Priority</option>
                <option value="waitTime">Wait Time</option>
                <option value="patientName">Patient Name</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedPriority('')
                  setSearchTerm('')
                  setSortBy('time')
                  setSortOrder('desc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Active Emergency Cases</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEmergencies.filter(e => e.status === 'Active').map((emergency) => (
              <div 
                key={emergency.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{emergency.patientName}</h4>
                    <p className="text-sm text-slate-600">{emergency.age} years • {emergency.gender}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(emergency.priority)}`}>
                      {emergency.priority}
                    </span>
                    <div className="mt-1 text-xs text-slate-500">Wait: {emergency.waitTime} min</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Condition</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mt-1">{emergency.condition}</p>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Arrival</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(emergency.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Room</p>
                    <p className="text-sm font-medium text-slate-800">{emergency.room}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-medium text-slate-800">{emergency.department}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Doctor</p>
                    <p className="text-sm font-medium text-slate-800">{emergency.doctorAssigned}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => updateEmergencyStatus(emergency.id, 'Completed')}
                  >
                    Mark Completed
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

        {/* Emergency Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Wait Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedEmergencies.map((emergency) => (
                  <tr key={emergency.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{emergency.patientName}</div>
                        <div className="text-sm text-slate-500">{emergency.age}y • {emergency.gender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {emergency.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(emergency.priority)}`}>
                        {emergency.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(emergency.status)}`}>
                        {emergency.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {emergency.waitTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {emergency.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {emergency.doctorAssigned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(emergency.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          value={emergency.status}
                          onChange={(e) => updateEmergencyStatus(emergency.id, e.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => {
                            // Show detailed emergency case modal
                            alert(`View details for ${emergency.patientName}`);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
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

        {/* Emergency Dashboard */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wait Time Analytics */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Wait Time Analytics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Critical Cases (0-5 min)</span>
                  <span className="text-sm text-slate-600">85%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-rose-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">High Priority (5-15 min)</span>
                  <span className="text-sm text-slate-600">70%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Medium Priority (15-30 min)</span>
                  <span className="text-sm text-slate-600">90%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Insights */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Emergency Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-rose-200 bg-rose-50 rounded-lg p-4 hover:bg-rose-100 transition duration-300 cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-rose-800">Critical Cases</h4>
                </div>
                <p className="text-xl font-bold text-rose-700 mt-2">{stats.critical}</p>
                <p className="text-sm text-rose-600">Currently active</p>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-blue-800">Avg. Wait</h4>
                </div>
                <p className="text-xl font-bold text-blue-700 mt-2">18 min</p>
                <p className="text-sm text-blue-600">Target: 15 min</p>
              </div>
              <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-emerald-800">Success Rate</h4>
                </div>
                <p className="text-xl font-bold text-emerald-700 mt-2">94%</p>
                <p className="text-sm text-emerald-600">Last month</p>
              </div>
              <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-amber-800">Most Common</h4>
                </div>
                <p className="text-xl font-bold text-amber-700 mt-2">Heart Attack</p>
                <p className="text-sm text-amber-600">22% of cases</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Emergency Case Modal */}
      {showAddEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Emergency Case</h3>
              <button 
                onClick={() => setShowAddEmergencyModal(false)}
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter name"
                      value={newEmergency.patientName}
                      onChange={(e) => setNewEmergency({...newEmergency, patientName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Age"
                      value={newEmergency.age}
                      onChange={(e) => setNewEmergency({...newEmergency, age: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={newEmergency.gender}
                      onChange={(e) => setNewEmergency({...newEmergency, gender: e.target.value})}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={newEmergency.priority}
                      onChange={(e) => setNewEmergency({...newEmergency, priority: e.target.value})}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Describe condition"
                    value={newEmergency.condition}
                    onChange={(e) => setNewEmergency({...newEmergency, condition: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newEmergency.department}
                    onChange={(e) => setNewEmergency({...newEmergency, department: e.target.value})}
                  >
                    <option value="Emergency">Emergency</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Trauma">Trauma</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Allergy">Allergy</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doctor Assigned</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Doctor name"
                    value={newEmergency.doctorAssigned}
                    onChange={(e) => setNewEmergency({...newEmergency, doctorAssigned: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Room number"
                    value={newEmergency.room}
                    onChange={(e) => setNewEmergency({...newEmergency, room: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Additional notes"
                    rows={3}
                    value={newEmergency.notes}
                    onChange={(e) => setNewEmergency({...newEmergency, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddEmergencyModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddEmergency}
              >
                Add Emergency Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}