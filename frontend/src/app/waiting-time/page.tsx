'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function WaitingTime() {
  const [waitingTimes, setWaitingTimes] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [sortBy, setSortBy] = useState('waitTime')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, average: 0, longest: 0, shortest: 0, onTime: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddQueueModal, setShowAddQueueModal] = useState(false)
  const [newQueueItem, setNewQueueItem] = useState({
    patientName: '',
    department: 'Emergency',
    priority: 'Normal',
    arrivalTime: new Date().toISOString(),
    estimatedWaitTime: 30,
    actualStartTime: '',
    status: 'Waiting',
    notes: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchWaitingTimes()
    }
  }, [])

  const fetchWaitingTimes = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital waiting time management
      const mockWaitingTimes = [
        { id: 1, patientName: 'John Smith', department: 'Emergency', priority: 'High', arrivalTime: new Date(Date.now() - 45*60*1000).toISOString(), estimatedWaitTime: 30, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Chest pain', waitTime: 45, exceededEstimate: true, urgency: 'Urgent' },
        { id: 2, patientName: 'Mary Johnson', department: 'Cardiology', priority: 'Normal', arrivalTime: new Date(Date.now() - 20*60*1000).toISOString(), estimatedWaitTime: 15, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Routine checkup', waitTime: 20, exceededEstimate: false, urgency: 'Routine' },
        { id: 3, patientName: 'Robert Williams', department: 'Orthopedics', priority: 'Normal', arrivalTime: new Date(Date.now() - 60*60*1000).toISOString(), estimatedWaitTime: 45, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Knee injury', waitTime: 60, exceededEstimate: true, urgency: 'Semi-Urgent' },
        { id: 4, patientName: 'Patricia Davis', department: 'Pediatrics', priority: 'High', arrivalTime: new Date(Date.now() - 10*60*1000).toISOString(), estimatedWaitTime: 20, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Fever', waitTime: 10, exceededEstimate: false, urgency: 'Urgent' },
        { id: 5, patientName: 'James Wilson', department: 'Neurology', priority: 'Normal', arrivalTime: new Date(Date.now() - 80*60*1000).toISOString(), estimatedWaitTime: 60, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Headache', waitTime: 80, exceededEstimate: true, urgency: 'Semi-Urgent' },
        { id: 6, patientName: 'Sarah Miller', department: 'Emergency', priority: 'Critical', arrivalTime: new Date(Date.now() - 5*60*1000).toISOString(), estimatedWaitTime: 5, actualStartTime: new Date(Date.now() - 2*60*1000).toISOString(), actualEndTime: '', status: 'In Progress', notes: 'Accident', waitTime: 3, exceededEstimate: false, urgency: 'Emergency' },
        { id: 7, patientName: 'Michael Brown', department: 'Dermatology', priority: 'Low', arrivalTime: new Date(Date.now() - 90*60*1000).toISOString(), estimatedWaitTime: 30, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Skin rash', waitTime: 90, exceededEstimate: true, urgency: 'Non-Urgent' },
        { id: 8, patientName: 'Jennifer Wilson', department: 'Ophthalmology', priority: 'Normal', arrivalTime: new Date(Date.now() - 25*60*1000).toISOString(), estimatedWaitTime: 25, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Eye exam', waitTime: 25, exceededEstimate: false, urgency: 'Routine' },
        { id: 9, patientName: 'David Taylor', department: 'Gastroenterology', priority: 'Normal', arrivalTime: new Date(Date.now() - 50*60*1000).toISOString(), estimatedWaitTime: 40, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Stomach pain', waitTime: 50, exceededEstimate: true, urgency: 'Semi-Urgent' },
        { id: 10, patientName: 'Lisa Anderson', department: 'Emergency', priority: 'High', arrivalTime: new Date(Date.now() - 15*60*1000).toISOString(), estimatedWaitTime: 20, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Breathing difficulty', waitTime: 15, exceededEstimate: false, urgency: 'Urgent' },
        { id: 11, patientName: 'Christopher Moore', department: 'Radiology', priority: 'Normal', arrivalTime: new Date(Date.now() - 35*60*1000).toISOString(), estimatedWaitTime: 35, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'X-ray', waitTime: 35, exceededEstimate: false, urgency: 'Routine' },
        { id: 12, patientName: 'Amanda Clark', department: 'Laboratory', priority: 'Normal', arrivalTime: new Date(Date.now() - 10*60*1000).toISOString(), estimatedWaitTime: 15, actualStartTime: '', actualEndTime: '', status: 'Waiting', notes: 'Blood test', waitTime: 10, exceededEstimate: false, urgency: 'Routine' }
      ];
      
      setWaitingTimes(mockWaitingTimes);
      
      // Calculate stats
      const total = mockWaitingTimes.length;
      const average = mockWaitingTimes.length > 0 ? 
        Math.round(mockWaitingTimes.reduce((sum, item) => sum + item.waitTime, 0) / mockWaitingTimes.length) : 0;
      const longest = mockWaitingTimes.length > 0 ? 
        Math.max(...mockWaitingTimes.map(item => item.waitTime)) : 0;
      const shortest = mockWaitingTimes.length > 0 ? 
        Math.min(...mockWaitingTimes.map(item => item.waitTime)) : 0;
      const onTime = mockWaitingTimes.filter(item => !item.exceededEstimate).length;
      
      setStats({ total, average, longest, shortest, onTime });
    } catch (err) {
      console.error('Error fetching waiting times:', err);
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
      case 'Normal':
        return 'bg-amber-100 text-amber-800'
      case 'Low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Waiting':
        return 'bg-amber-100 text-amber-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800'
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'Emergency':
        return 'bg-rose-100 text-rose-800'
      case 'Urgent':
        return 'bg-red-100 text-red-800'
      case 'Semi-Urgent':
        return 'bg-amber-100 text-amber-800'
      case 'Routine':
        return 'bg-blue-100 text-blue-800'
      case 'Non-Urgent':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSatisfactionEmoji = (score: number) => {
    if (score >= 95) return '🌟'
    if (score >= 90) return '👍'
    if (score >= 85) return '👌'
    return '⚠️'
  }

  // Filter waiting times based on selected department, priority, and search term
  const filteredWaitingTimes = waitingTimes.filter(item => {
    const departmentMatch = selectedDepartment ? item.department === selectedDepartment : true
    const priorityMatch = selectedPriority ? item.priority === selectedPriority : true
    const searchMatch = searchTerm 
      ? item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return departmentMatch && priorityMatch && searchMatch
  })

  // Sort waiting times
  const sortedWaitingTimes = [...filteredWaitingTimes].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  })

  // Get unique departments and priorities for filter
  const departments = Array.from(new Set(waitingTimes.map(w => w.department)))
  const priorities = Array.from(new Set(waitingTimes.map(w => w.priority)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddQueueItem = () => {
    const newId = waitingTimes.length > 0 ? Math.max(...waitingTimes.map(w => w.id)) + 1 : 1
    const queueItemToAdd = {
      ...newQueueItem,
      id: newId,
      waitTime: 0,
      exceededEstimate: false,
      urgency: newQueueItem.priority === 'Critical' ? 'Emergency' : 
               newQueueItem.priority === 'High' ? 'Urgent' : 
               newQueueItem.priority === 'Normal' ? 'Semi-Urgent' : 'Routine'
    }
    
    setWaitingTimes([...waitingTimes, queueItemToAdd])
    
    // Update stats
    const total = waitingTimes.length + 1;
    const average = total > 0 ? 
      Math.round((waitingTimes.reduce((sum, item) => sum + item.waitTime, 0) + 0) / total) : 0;
    const longest = total > 0 ? 
      Math.max(...waitingTimes.map(item => item.waitTime), 0) : 0;
    const shortest = total > 0 ? 
      Math.min(...waitingTimes.map(item => item.waitTime), 0) : 0;
    const onTime = [...waitingTimes, queueItemToAdd].filter(item => !item.exceededEstimate).length;
    
    setStats({ total, average, longest, shortest, onTime })
    
    // Reset form and close modal
    setNewQueueItem({
      patientName: '',
      department: 'Emergency',
      priority: 'Normal',
      arrivalTime: new Date().toISOString(),
      estimatedWaitTime: 30,
      actualStartTime: '',
      status: 'Waiting',
      notes: ''
    })
    setShowAddQueueModal(false)
  }

  // Function to start treatment
  const startTreatment = (itemId: number) => {
    const updatedWaitingTimes = waitingTimes.map(item => 
      item.id === itemId ? { 
        ...item, 
        status: 'In Progress',
        actualStartTime: new Date().toISOString()
      } : item
    );
    
    setWaitingTimes(updatedWaitingTimes);
    
    // Update stats
    const total = updatedWaitingTimes.length;
    const average = total > 0 ? 
      Math.round(updatedWaitingTimes.reduce((sum, item) => sum + item.waitTime, 0) / total) : 0;
    const longest = total > 0 ? 
      Math.max(...updatedWaitingTimes.map(item => item.waitTime)) : 0;
    const shortest = total > 0 ? 
      Math.min(...updatedWaitingTimes.map(item => item.waitTime)) : 0;
    const onTime = updatedWaitingTimes.filter(item => !item.exceededEstimate).length;
    
    setStats({ total, average, longest, shortest, onTime })
  }

  // Function to complete treatment
  const completeTreatment = (itemId: number) => {
    const updatedWaitingTimes = waitingTimes.map(item => 
      item.id === itemId ? { 
        ...item, 
        status: 'Completed',
        actualEndTime: new Date().toISOString()
      } : item
    );
    
    setWaitingTimes(updatedWaitingTimes);
    
    // Update stats
    const total = updatedWaitingTimes.length;
    const average = total > 0 ? 
      Math.round(updatedWaitingTimes.reduce((sum, item) => sum + item.waitTime, 0) / total) : 0;
    const longest = total > 0 ? 
      Math.max(...updatedWaitingTimes.map(item => item.waitTime)) : 0;
    const shortest = total > 0 ? 
      Math.min(...updatedWaitingTimes.map(item => item.waitTime)) : 0;
    const onTime = updatedWaitingTimes.filter(item => !item.exceededEstimate).length;
    
    setStats({ total, average, longest, shortest, onTime })
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
            <h2 className="text-2xl font-bold text-slate-800">Waiting Time Management</h2>
            <p className="text-slate-600">Monitor and optimize patient waiting times across departments</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddQueueModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add to Queue
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Patients</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.average} min</p>
            <p className="text-sm text-blue-600">Avg. Wait Time</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.longest} min</p>
            <p className="text-sm text-amber-600">Longest Wait</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.shortest} min</p>
            <p className="text-sm text-emerald-600">Shortest Wait</p>
          </div>
          <div className="bg-teal-50 rounded-xl shadow p-4 text-center border-l-4 border-teal-500">
            <p className="text-2xl font-bold text-teal-700">{stats.onTime}%</p>
            <p className="text-sm text-teal-600">On-Time Rate</p>
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
                placeholder="Patient, department, or notes"
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
                {departments.map((department: string) => (
                  <option key={department} value={department}>{department}</option>
                ))}
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
                {priorities.map((priority: string) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
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
                <option value="waitTime">Actual Wait Time</option>
                <option value="estimatedWaitTime">Estimated Wait Time</option>
                <option value="patientName">Patient Name</option>
                <option value="department">Department</option>
                <option value="priority">Priority</option>
                <option value="arrivalTime">Arrival Time</option>
                <option value="urgency">Urgency</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedDepartment('')
                  setSelectedPriority('')
                  setSearchTerm('')
                  setSortBy('waitTime')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Waiting Time Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Real-Time Waiting Queue</h3>
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
            {sortedWaitingTimes.map((item) => (
              <div 
                key={item.id} 
                className={`border-2 rounded-xl p-4 transition-all duration-300 ${
                  item.status === 'Waiting' ? 'border-amber-200 bg-amber-50 hover:bg-amber-100' :
                  item.status === 'In Progress' ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' :
                  item.status === 'Completed' ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{item.patientName}</h4>
                    <p className="text-sm text-slate-600">{item.department}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(item.priority)}`}>
                      {item.priority}
                    </span>
                    <div className="mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Wait Time</p>
                    <p className={`text-sm font-medium ${
                      item.waitTime > item.estimatedWaitTime ? 'text-rose-600' : 'text-slate-800'
                    }`}>
                      {item.waitTime} min
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Est. Time</p>
                    <p className="text-sm font-medium text-slate-800">{item.estimatedWaitTime} min</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Arrival</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Urgency</p>
                    <p className="text-sm font-medium text-slate-800">{item.urgency}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Wait Progress</span>
                    <span className="text-sm font-bold text-slate-800 flex items-center">
                      {Math.min(100, Math.round((item.waitTime / Math.max(item.estimatedWaitTime, 1)) * 100))}%
                      {item.waitTime > item.estimatedWaitTime && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        item.waitTime > item.estimatedWaitTime ? 'bg-rose-500' : 
                        item.waitTime > item.estimatedWaitTime * 0.8 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.round((item.waitTime / Math.max(item.estimatedWaitTime, 1)) * 100))}%` }}
                    ></div>
                  </div>
                </div>
                
                {item.notes && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-500">Notes</p>
                    <p className="text-sm text-slate-700">{item.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between">
                  {item.status === 'Waiting' && (
                    <button 
                      className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                      onClick={() => startTreatment(item.id)}
                    >
                      Start Treatment
                    </button>
                  )}
                  {item.status === 'In Progress' && (
                    <button 
                      className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                      onClick={() => completeTreatment(item.id)}
                    >
                      Complete
                    </button>
                  )}
                  {(item.status === 'Waiting' || item.status === 'In Progress') && (
                    <div className="flex space-x-2">
                      <button className="text-slate-600 hover:text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-slate-600 hover:text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waiting Time Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Wait Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedWaitingTimes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{item.patientName}</div>
                        <div className="text-sm text-slate-500">Wait: {item.waitTime} min</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        item.waitTime > item.estimatedWaitTime ? 'text-rose-600' : 'text-slate-800'
                      }`}>
                        {item.waitTime} min
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.waitTime > item.estimatedWaitTime ? '+' : '-'}
                        {Math.abs(item.waitTime - item.estimatedWaitTime)} min
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.estimatedWaitTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyClass(item.urgency)}`}>
                        {item.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 max-w-xs">
                      <div className="truncate" title={item.notes}>
                        {item.notes}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {item.status === 'Waiting' && (
                          <button 
                            className="text-teal-600 hover:text-teal-900"
                            onClick={() => startTreatment(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L10 12.168V8a1 1 0 00-1-1H9.555z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                        {item.status === 'In Progress' && (
                          <button 
                            className="text-emerald-600 hover:text-emerald-900"
                            onClick={() => completeTreatment(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-rose-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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

        {/* Waiting Time Analytics */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Waiting Time Analytics</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-rose-200 bg-rose-50 rounded-lg p-4 hover:bg-rose-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-rose-800">Longest Waits</h4>
              </div>
              <p className="text-xl font-bold text-rose-700 mt-2">
                {waitingTimes.length > 0 ? 
                  `${Math.max(...waitingTimes.map(item => item.waitTime))} min` : '0 min'}
              </p>
              <p className="text-sm text-rose-600">
                {waitingTimes.length > 0 ? 
                  waitingTimes.filter(item => item.waitTime > item.estimatedWaitTime).length : 0} patients exceeded estimates
              </p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Best Performance</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">
                {waitingTimes.length > 0 ? 
                  `${Math.min(...waitingTimes.map(item => item.waitTime))} min` : '0 min'}
              </p>
              <p className="text-sm text-emerald-600">
                {stats.onTime}% patients within time estimates
              </p>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Avg. Wait by Dept</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">
                {departments.length > 0 ? 
                  `${Math.round(waitingTimes.reduce((sum, item) => sum + item.waitTime, 0) / departments.length)} min` : '0 min'}
              </p>
              <p className="text-sm text-blue-600">
                Across {departments.length} departments
              </p>
            </div>
          </div>
          
          {/* Department Performance */}
          <div className="mt-6">
            <h4 className="font-medium text-slate-800 mb-3">Department Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept) => {
                const deptPatients = waitingTimes.filter(item => item.department === dept);
                const avgWait = deptPatients.length > 0 ? 
                  Math.round(deptPatients.reduce((sum, item) => sum + item.waitTime, 0) / deptPatients.length) : 0;
                const exceededEstimates = deptPatients.filter(item => item.waitTime > item.estimatedWaitTime).length;
                
                return (
                  <div key={dept} className="border border-slate-200 bg-slate-50 rounded-lg p-3 hover:bg-slate-100 transition duration-300 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-slate-800">{dept}</h5>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        avgWait > 30 ? 'bg-rose-100 text-rose-800' : 
                        avgWait > 20 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {avgWait} min
                      </span>
                    </div>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Patients:</span>
                        <span className="font-medium text-slate-800">{deptPatients.length}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-slate-600">Exceeded:</span>
                        <span className="font-medium text-slate-800">{exceededEstimates}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-slate-600">On-Time:</span>
                        <span className="font-medium text-slate-800">
                          {deptPatients.length > 0 ? 
                            `${Math.round(((deptPatients.length - exceededEstimates) / deptPatients.length) * 100)}%` : '0%'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Add to Queue Modal */}
      {showAddQueueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add Patient to Queue</h3>
              <button 
                onClick={() => setShowAddQueueModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter patient name"
                    value={newQueueItem.patientName}
                    onChange={(e) => setNewQueueItem({...newQueueItem, patientName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newQueueItem.department}
                      onChange={(e) => setNewQueueItem({...newQueueItem, department: e.target.value})}
                    >
                      <option value="Emergency">Emergency</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Laboratory">Laboratory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newQueueItem.priority}
                      onChange={(e) => setNewQueueItem({...newQueueItem, priority: e.target.value})}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Wait Time (min)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter wait time"
                      value={newQueueItem.estimatedWaitTime}
                      onChange={(e) => setNewQueueItem({...newQueueItem, estimatedWaitTime: parseInt(e.target.value) || 30})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newQueueItem.status}
                      onChange={(e) => setNewQueueItem({...newQueueItem, status: e.target.value})}
                    >
                      <option value="Waiting">Waiting</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Special Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter special notes or conditions"
                    rows={3}
                    value={newQueueItem.notes}
                    onChange={(e) => setNewQueueItem({...newQueueItem, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddQueueModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddQueueItem}
              >
                Add to Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}