'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Operations() {
  const [operations, setOperations] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedTheater, setSelectedTheater] = useState('')
  const [sortBy, setSortBy] = useState('scheduledTime')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, scheduled: 0, inProgress: 0, completed: 0, cancelled: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddOperationModal, setShowAddOperationModal] = useState(false)
  const [newOperation, setNewOperation] = useState({
    patientName: '',
    patientAge: '',
    patientGender: 'Male',
    procedure: '',
    surgeon: '',
    anesthesiologist: '',
    theater: 'OT-1',
    status: 'Scheduled',
    scheduledTime: new Date().toISOString(),
    duration: 60,
    priority: 'Routine',
    notes: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchOperations()
    }
  }, [])

  const fetchOperations = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital operation theater management
      const mockOperations = [
        { id: 1, patientName: 'John Smith', patientAge: 45, patientGender: 'Male', procedure: 'Coronary Artery Bypass', surgeon: 'Dr. Alice Johnson', anesthesiologist: 'Dr. Michael Chen', theater: 'OT-1', status: 'In Progress', scheduledTime: new Date(Date.now() - 3600000).toISOString(), startTime: new Date(Date.now() - 1800000).toISOString(), duration: 180, priority: 'Urgent', notes: 'High-risk patient' },
        { id: 2, patientName: 'Mary Johnson', patientAge: 32, patientGender: 'Female', procedure: 'Laparoscopic Cholecystectomy', surgeon: 'Dr. David Wilson', anesthesiologist: 'Dr. Eva Brown', theater: 'OT-2', status: 'Scheduled', scheduledTime: new Date(Date.now() + 3600000).toISOString(), duration: 90, priority: 'Routine', notes: 'Day surgery' },
        { id: 3, patientName: 'Robert Williams', patientAge: 78, patientGender: 'Male', procedure: 'Hip Replacement', surgeon: 'Dr. Frank Miller', anesthesiologist: 'Dr. Grace Lee', theater: 'OT-3', status: 'Completed', scheduledTime: new Date(Date.now() - 7200000).toISOString(), startTime: new Date(Date.now() - 5400000).toISOString(), endTime: new Date(Date.now() - 1800000).toISOString(), duration: 240, priority: 'Elective', notes: 'Post-op care in ICU' },
        { id: 4, patientName: 'Patricia Davis', patientAge: 28, patientGender: 'Female', procedure: 'Appendectomy', surgeon: 'Dr. Henry Taylor', anesthesiologist: 'Dr. Jack Roberts', theater: 'OT-4', status: 'Cancelled', scheduledTime: new Date(Date.now() - 10800000).toISOString(), duration: 60, priority: 'Emergency', notes: 'Patient condition improved' },
        { id: 5, patientName: 'James Wilson', patientAge: 55, patientGender: 'Male', procedure: 'Knee Arthroscopy', surgeon: 'Dr. Kate Williams', anesthesiologist: 'Dr. Alice Johnson', theater: 'OT-1', status: 'Scheduled', scheduledTime: new Date(Date.now() + 7200000).toISOString(), duration: 120, priority: 'Routine', notes: 'Follow-up in 2 weeks' },
        { id: 6, patientName: 'Sarah Miller', patientAge: 40, patientGender: 'Female', procedure: 'Cataract Surgery', surgeon: 'Dr. Michael Chen', anesthesiologist: 'Dr. David Wilson', theater: 'OT-5', status: 'In Progress', scheduledTime: new Date(Date.now() - 1800000).toISOString(), startTime: new Date(Date.now() - 900000).toISOString(), duration: 45, priority: 'Routine', notes: 'Outpatient procedure' },
        { id: 7, patientName: 'Michael Brown', patientAge: 67, patientGender: 'Male', procedure: 'Prostatectomy', surgeon: 'Dr. Eva Brown', anesthesiologist: 'Dr. Frank Miller', theater: 'OT-2', status: 'Scheduled', scheduledTime: new Date(Date.now() + 10800000).toISOString(), duration: 150, priority: 'Elective', notes: 'Pre-op consultation completed' },
        { id: 8, patientName: 'Jennifer Wilson', patientAge: 35, patientGender: 'Female', procedure: 'Caesarean Section', surgeon: 'Dr. Grace Lee', anesthesiologist: 'Dr. Henry Taylor', theater: 'OT-3', status: 'Completed', scheduledTime: new Date(Date.now() - 14400000).toISOString(), startTime: new Date(Date.now() - 12600000).toISOString(), endTime: new Date(Date.now() - 10800000).toISOString(), duration: 90, priority: 'Emergency', notes: 'Healthy baby boy born' }
      ];
      
      setOperations(mockOperations);
      
      // Calculate stats
      const total = mockOperations.length;
      const scheduled = mockOperations.filter(o => o.status === 'Scheduled').length;
      const inProgress = mockOperations.filter(o => o.status === 'In Progress').length;
      const completed = mockOperations.filter(o => o.status === 'Completed').length;
      const cancelled = mockOperations.filter(o => o.status === 'Cancelled').length;
      
      setStats({ total, scheduled, inProgress, completed, cancelled });
    } catch (err) {
      console.error('Error fetching operations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'In Progress':
        return 'bg-amber-100 text-amber-800'
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800'
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Emergency':
        return 'bg-rose-100 text-rose-800'
      case 'Urgent':
        return 'bg-red-100 text-red-800'
      case 'Elective':
        return 'bg-amber-100 text-amber-800'
      case 'Routine':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter operations based on selected status, theater, and search term
  const filteredOperations = operations.filter(operation => {
    const statusMatch = selectedStatus ? operation.status === selectedStatus : true
    const theaterMatch = selectedTheater ? operation.theater === selectedTheater : true
    const searchMatch = searchTerm 
      ? operation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        operation.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operation.surgeon.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operation.anesthesiologist.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && theaterMatch && searchMatch
  })

  // Sort operations
  const sortedOperations = [...filteredOperations].sort((a, b) => {
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

  const handleAddOperation = () => {
    const newId = operations.length > 0 ? Math.max(...operations.map(o => o.id)) + 1 : 1
    const operationToAdd = {
      ...newOperation,
      id: newId,
      scheduledTime: new Date().toISOString()
    }
    
    setOperations([...operations, operationToAdd])
    
    // Update stats
    const total = operations.length + 1;
    const scheduled = newOperation.status === 'Scheduled' ? stats.scheduled + 1 : stats.scheduled;
    const inProgress = newOperation.status === 'In Progress' ? stats.inProgress + 1 : stats.inProgress;
    const completed = newOperation.status === 'Completed' ? stats.completed + 1 : stats.completed;
    const cancelled = newOperation.status === 'Cancelled' ? stats.cancelled + 1 : stats.cancelled;
    
    setStats({ total, scheduled, inProgress, completed, cancelled })
    
    // Reset form and close modal
    setNewOperation({
      patientName: '',
      patientAge: '',
      patientGender: 'Male',
      procedure: '',
      surgeon: '',
      anesthesiologist: '',
      theater: 'OT-1',
      status: 'Scheduled',
      scheduledTime: new Date().toISOString(),
      duration: 60,
      priority: 'Routine',
      notes: ''
    })
    setShowAddOperationModal(false)
  }

  // Function to update operation status
  const updateOperationStatus = (operationId: number, newStatus: string) => {
    const updatedOperations = operations.map(operation => 
      operation.id === operationId ? { 
        ...operation, 
        status: newStatus,
        ...(newStatus === 'In Progress' && !operation.startTime ? { startTime: new Date().toISOString() } : {}),
        ...(newStatus === 'Completed' && !operation.endTime ? { endTime: new Date().toISOString() } : {})
      } : operation
    );
    
    setOperations(updatedOperations);
    
    // Update stats
    const scheduled = updatedOperations.filter(o => o.status === 'Scheduled').length;
    const inProgress = updatedOperations.filter(o => o.status === 'In Progress').length;
    const completed = updatedOperations.filter(o => o.status === 'Completed').length;
    const cancelled = updatedOperations.filter(o => o.status === 'Cancelled').length;
    
    setStats({ 
      total: updatedOperations.length, 
      scheduled, 
      inProgress, 
      completed, 
      cancelled 
    })
  }

  // Function to get time difference
  const getTimeDifference = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins;
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
            <h2 className="text-2xl font-bold text-slate-800">Operation Theater Management</h2>
            <p className="text-slate-600">Manage surgical procedures, theater schedules, and staff assignments</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddOperationModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Schedule Operation
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Operations</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.scheduled}</p>
            <p className="text-sm text-blue-600">Scheduled</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.inProgress}</p>
            <p className="text-sm text-amber-600">In Progress</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.completed}</p>
            <p className="text-sm text-emerald-600">Completed</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.cancelled}</p>
            <p className="text-sm text-rose-600">Cancelled</p>
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
                placeholder="Patient, procedure, or surgeon"
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="theaterFilter" className="block text-sm font-medium text-slate-700 mb-1">Theater</label>
              <select
                id="theaterFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedTheater}
                onChange={(e) => setSelectedTheater(e.target.value)}
              >
                <option value="">All Theaters</option>
                <option value="OT-1">OT-1</option>
                <option value="OT-2">OT-2</option>
                <option value="OT-3">OT-3</option>
                <option value="OT-4">OT-4</option>
                <option value="OT-5">OT-5</option>
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
                <option value="scheduledTime">Scheduled Time</option>
                <option value="patientName">Patient Name</option>
                <option value="procedure">Procedure</option>
                <option value="surgeon">Surgeon</option>
                <option value="theater">Theater</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedTheater('')
                  setSearchTerm('')
                  setSortBy('scheduledTime')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Operation Theater Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Operation Theater Overview</h3>
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
          
          {/* Theater Layout Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['OT-1', 'OT-2', 'OT-3', 'OT-4', 'OT-5'].map((theater) => (
              <div 
                key={theater} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800">{theater}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sortedOperations.some(op => op.theater === theater && op.status === 'In Progress') 
                      ? 'bg-amber-100 text-amber-800' 
                      : sortedOperations.some(op => op.theater === theater && op.status === 'Scheduled') 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {sortedOperations.some(op => op.theater === theater && op.status === 'In Progress') 
                      ? 'In Use' 
                      : sortedOperations.some(op => op.theater === theater && op.status === 'Scheduled') 
                        ? 'Scheduled' 
                        : 'Available'}
                  </span>
                </div>
                
                {/* Current Operation */}
                {sortedOperations
                  .filter(op => op.theater === theater && (op.status === 'In Progress' || op.status === 'Scheduled'))
                  .slice(0, 1)
                  .map((operation) => (
                    <div 
                      key={operation.id} 
                      className={`rounded-lg p-3 mb-3 border-2 ${
                        operation.status === 'In Progress' 
                          ? 'border-amber-200 bg-amber-50' 
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-bold text-slate-800">{operation.patientName}</h5>
                          <p className="text-sm text-slate-600">{operation.procedure}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(operation.status)}`}>
                          {operation.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Surgeon:</span>
                          <span className="font-medium">{operation.surgeon}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Anesthesiologist:</span>
                          <span className="font-medium">{operation.anesthesiologist}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Scheduled:</span>
                          <span className="font-medium">
                            {new Date(operation.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {operation.status === 'In Progress' && operation.startTime && (
                          <div className="flex justify-between mt-1">
                            <span>In Progress:</span>
                            <span className="font-medium">
                              {Math.floor((new Date().getTime() - new Date(operation.startTime).getTime()) / 60000)} min
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                
                {/* Upcoming Operations */}
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Upcoming</h5>
                  <div className="space-y-2">
                    {sortedOperations
                      .filter(op => op.theater === theater && op.status === 'Scheduled')
                      .slice(1, 3)
                      .map((operation) => (
                        <div key={operation.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                          <div>
                            <div className="font-medium text-slate-800">{operation.patientName}</div>
                            <div className="text-slate-600">{operation.procedure}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-600">
                              {new Date(operation.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-xs text-slate-500">
                              {operation.duration} min
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {sortedOperations.filter(op => op.theater === theater && op.status === 'Scheduled').length === 0 && (
                      <div className="text-center text-sm text-slate-500 py-2">
                        No upcoming operations
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operation Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Procedure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Theater</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Scheduled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedOperations.map((operation) => (
                  <tr key={operation.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{operation.patientName}</div>
                        <div className="text-sm text-slate-500">{operation.patientAge}y • {operation.patientGender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {operation.procedure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Surgeon: {operation.surgeon}</div>
                        <div>Anesth: {operation.anesthesiologist}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {operation.theater}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(operation.status)}`}>
                        {operation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(operation.scheduledTime).toLocaleString([], { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {operation.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(operation.priority)}`}>
                        {operation.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={operation.status}
                          onChange={(e) => updateOperationStatus(operation.id, e.target.value)}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => {
                            // Show operation details modal
                            alert(`View details for ${operation.patientName}`);
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

        {/* Operation Analytics */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Operation Analytics</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Avg. Duration</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">125 min</p>
              <p className="text-sm text-blue-600">Across all procedures</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Success Rate</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">96%</p>
              <p className="text-sm text-emerald-600">Last 30 days</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Utilization</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">82%</p>
              <p className="text-sm text-amber-600">Theater utilization rate</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Operation Modal */}
      {showAddOperationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Schedule New Operation</h3>
              <button 
                onClick={() => setShowAddOperationModal(false)}
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter patient name"
                      value={newOperation.patientName}
                      onChange={(e) => setNewOperation({...newOperation, patientName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Age"
                      value={newOperation.patientAge}
                      onChange={(e) => setNewOperation({...newOperation, patientAge: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newOperation.patientGender}
                    onChange={(e) => setNewOperation({...newOperation, patientGender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Procedure</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter procedure name"
                    value={newOperation.procedure}
                    onChange={(e) => setNewOperation({...newOperation, procedure: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Surgeon</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter surgeon name"
                      value={newOperation.surgeon}
                      onChange={(e) => setNewOperation({...newOperation, surgeon: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Anesthesiologist</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter anesthesiologist name"
                      value={newOperation.anesthesiologist}
                      onChange={(e) => setNewOperation({...newOperation, anesthesiologist: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Theater</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newOperation.theater}
                      onChange={(e) => setNewOperation({...newOperation, theater: e.target.value})}
                    >
                      <option value="OT-1">OT-1</option>
                      <option value="OT-2">OT-2</option>
                      <option value="OT-3">OT-3</option>
                      <option value="OT-4">OT-4</option>
                      <option value="OT-5">OT-5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter duration"
                      value={newOperation.duration}
                      onChange={(e) => setNewOperation({...newOperation, duration: parseInt(e.target.value) || 60})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newOperation.status}
                      onChange={(e) => setNewOperation({...newOperation, status: e.target.value})}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newOperation.priority}
                      onChange={(e) => setNewOperation({...newOperation, priority: e.target.value})}
                    >
                      <option value="Routine">Routine</option>
                      <option value="Elective">Elective</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Additional notes"
                    rows={3}
                    value={newOperation.notes}
                    onChange={(e) => setNewOperation({...newOperation, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddOperationModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddOperation}
              >
                Schedule Operation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}