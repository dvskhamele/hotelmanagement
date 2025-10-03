'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Ambulance() {
  const [ambulances, setAmbulances] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('vehicleNumber')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, available: 0, dispatched: 0, maintenance: 0, incidents: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddAmbulanceModal, setShowAddAmbulanceModal] = useState(false)
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const [selectedAmbulance, setSelectedAmbulance] = useState<any>(null)
  const [newAmbulance, setNewAmbulance] = useState({
    vehicleNumber: '',
    type: 'Basic Life Support',
    status: 'Available',
    driver: '',
    paramedic: '',
    equipment: [],
    lastServiceDate: new Date().toISOString().split('T')[0],
    nextServiceDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    mileage: 0,
    fuelLevel: 100,
    gpsTracking: true,
    emergencyEquipment: true,
    oxygenSupply: true,
    defibrillator: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchAmbulances()
    }
  }, [])

  const fetchAmbulances = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital ambulance management
      const mockAmbulances = [
        { id: 1, vehicleNumber: 'AMB-001', type: 'Advanced Life Support', status: 'Available', driver: 'John Smith', paramedic: 'Alice Johnson', equipment: ['Defibrillator', 'Oxygen', 'Ventilator', 'IV Pump'], lastServiceDate: '2023-08-15', nextServiceDate: '2023-11-15', mileage: 45200, fuelLevel: 85, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-20T14:30:00Z', dispatchCount: 12, responseTime: 8.5 },
        { id: 2, vehicleNumber: 'AMB-002', type: 'Basic Life Support', status: 'Dispatched', driver: 'Robert Williams', paramedic: 'Mary Johnson', equipment: ['Oxygen', 'Stretcher', 'BP Monitor', 'Pulse Oximeter'], lastServiceDate: '2023-09-01', nextServiceDate: '2023-12-01', mileage: 38700, fuelLevel: 92, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: false, lastDispatch: new Date().toISOString(), dispatchCount: 8, responseTime: 12.3 },
        { id: 3, vehicleNumber: 'AMB-003', type: 'Neonatal', status: 'Maintenance', driver: 'David Wilson', paramedic: 'Eva Brown', equipment: ['Incubator', 'Oxygen', 'Monitoring Equipment'], lastServiceDate: '2023-07-20', nextServiceDate: '2023-10-20', mileage: 52100, fuelLevel: 0, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-18T09:15:00Z', dispatchCount: 15, responseTime: 7.2 },
        { id: 4, vehicleNumber: 'AMB-004', type: 'Cardiac Care', status: 'Available', driver: 'Michael Chen', paramedic: 'Frank Miller', equipment: ['Defibrillator', 'ECG Monitor', 'Oxygen', 'Medication Kit'], lastServiceDate: '2023-08-30', nextServiceDate: '2023-11-30', mileage: 29800, fuelLevel: 78, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-19T16:45:00Z', dispatchCount: 6, responseTime: 9.8 },
        { id: 5, vehicleNumber: 'AMB-005', type: 'Trauma', status: 'Available', driver: 'James Wilson', paramedic: 'Grace Lee', equipment: ['Spinal Board', 'Cervical Collar', 'Splints', 'Oxygen'], lastServiceDate: '2023-09-10', nextServiceDate: '2023-12-10', mileage: 33500, fuelLevel: 95, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-21T11:20:00Z', dispatchCount: 9, responseTime: 10.5 },
        { id: 6, vehicleNumber: 'AMB-006', type: 'Basic Life Support', status: 'Dispatched', driver: 'Patricia Davis', paramedic: 'Henry Taylor', equipment: ['Oxygen', 'Stretcher', 'BP Monitor', 'Pulse Oximeter'], lastServiceDate: '2023-08-25', nextServiceDate: '2023-11-25', mileage: 41200, fuelLevel: 65, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: false, lastDispatch: new Date().toISOString(), dispatchCount: 11, responseTime: 11.7 },
        { id: 7, vehicleNumber: 'AMB-007', type: 'Advanced Life Support', status: 'Available', driver: 'Sarah Miller', paramedic: 'Jack Roberts', equipment: ['Defibrillator', 'Oxygen', 'Ventilator', 'IV Pump'], lastServiceDate: '2023-09-05', nextServiceDate: '2023-12-05', mileage: 27500, fuelLevel: 88, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-20T08:30:00Z', dispatchCount: 7, responseTime: 8.9 },
        { id: 8, vehicleNumber: 'AMB-008', type: 'Pediatric', status: 'Maintenance', driver: 'Jennifer Wilson', paramedic: 'Kate Williams', equipment: ['Pediatric Ventilator', 'Oxygen', 'Monitoring Equipment'], lastServiceDate: '2023-07-15', nextServiceDate: '2023-10-15', mileage: 48900, fuelLevel: 0, gpsTracking: true, emergencyEquipment: true, oxygenSupply: true, defibrillator: true, lastDispatch: '2023-09-17T13:45:00Z', dispatchCount: 14, responseTime: 7.6 }
      ];
      
      setAmbulances(mockAmbulances);
      
      // Calculate stats
      const total = mockAmbulances.length;
      const available = mockAmbulances.filter(a => a.status === 'Available').length;
      const dispatched = mockAmbulances.filter(a => a.status === 'Dispatched').length;
      const maintenance = mockAmbulances.filter(a => a.status === 'Maintenance').length;
      const incidents = mockAmbulances.reduce((sum, a) => sum + a.dispatchCount, 0);
      
      setStats({ total, available, dispatched, maintenance, incidents });
    } catch (err) {
      console.error('Error fetching ambulances:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800'
      case 'Dispatched':
        return 'bg-amber-100 text-amber-800'
      case 'Maintenance':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'Advanced Life Support':
        return 'bg-blue-100 text-blue-800'
      case 'Basic Life Support':
        return 'bg-teal-100 text-teal-800'
      case 'Neonatal':
        return 'bg-pink-100 text-pink-800'
      case 'Cardiac Care':
        return 'bg-red-100 text-red-800'
      case 'Trauma':
        return 'bg-amber-100 text-amber-800'
      case 'Pediatric':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter ambulances based on selected status, type, and search term
  const filteredAmbulances = ambulances.filter(ambulance => {
    const statusMatch = selectedStatus ? ambulance.status === selectedStatus : true
    const typeMatch = selectedType ? ambulance.type === selectedType : true
    const searchMatch = searchTerm 
      ? ambulance.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ambulance.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ambulance.paramedic.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && typeMatch && searchMatch
  })

  // Sort ambulances
  const sortedAmbulances = [...filteredAmbulances].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique types for filter
  const types = Array.from(new Set(ambulances.map(a => a.type)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddAmbulance = () => {
    const newId = ambulances.length > 0 ? Math.max(...ambulances.map(a => a.id)) + 1 : 1
    const ambulanceToAdd = {
      ...newAmbulance,
      id: newId,
      lastDispatch: new Date().toISOString(),
      dispatchCount: 0,
      responseTime: 0
    }
    
    setAmbulances([...ambulances, ambulanceToAdd])
    
    // Update stats
    const total = ambulances.length + 1;
    const available = newAmbulance.status === 'Available' ? stats.available + 1 : stats.available;
    const dispatched = newAmbulance.status === 'Dispatched' ? stats.dispatched + 1 : stats.dispatched;
    const maintenance = newAmbulance.status === 'Maintenance' ? stats.maintenance + 1 : stats.maintenance;
    const incidents = stats.incidents;
    
    setStats({ total, available, dispatched, maintenance, incidents })
    
    // Reset form and close modal
    setNewAmbulance({
      vehicleNumber: '',
      type: 'Basic Life Support',
      status: 'Available',
      driver: '',
      paramedic: '',
      equipment: [],
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      mileage: 0,
      fuelLevel: 100,
      gpsTracking: true,
      emergencyEquipment: true,
      oxygenSupply: true,
      defibrillator: true
    })
    setShowAddAmbulanceModal(false)
  }

  const openDispatchModal = (ambulance: any) => {
    setSelectedAmbulance(ambulance)
    setShowDispatchModal(true)
  }

  // Function to calculate days until service
  const getDaysUntilService = (nextServiceDate: string) => {
    const nextService = new Date(nextServiceDate);
    const today = new Date();
    const diffTime = nextService.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <h2 className="text-2xl font-bold text-slate-800">Ambulance Management System</h2>
            <p className="text-slate-600">Manage hospital ambulance fleet, dispatch operations, and emergency response</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddAmbulanceModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Ambulance
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Vehicles</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.available}</p>
            <p className="text-sm text-emerald-600">Available</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.dispatched}</p>
            <p className="text-sm text-amber-600">Dispatched</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.maintenance}</p>
            <p className="text-sm text-rose-600">In Maintenance</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.incidents}</p>
            <p className="text-sm text-blue-600">Total Incidents</p>
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
                placeholder="Vehicle, driver, or paramedic"
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
                <option value="Available">Available</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Maintenance">In Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                id="typeFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {types.map((type: string) => (
                  <option key={type} value={type}>{type}</option>
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
                <option value="vehicleNumber">Vehicle Number</option>
                <option value="type">Type</option>
                <option value="driver">Driver</option>
                <option value="paramedic">Paramedic</option>
                <option value="mileage">Mileage</option>
                <option value="fuelLevel">Fuel Level</option>
                <option value="lastServiceDate">Last Service</option>
                <option value="nextServiceDate">Next Service</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedType('')
                  setSearchTerm('')
                  setSortBy('vehicleNumber')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Ambulance Fleet Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Ambulance Fleet</h3>
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
            {sortedAmbulances.map((ambulance) => (
              <div 
                key={ambulance.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{ambulance.vehicleNumber}</h4>
                    <div className="flex space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeClass(ambulance.type)}`}>
                        {ambulance.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(ambulance.status)}`}>
                        {ambulance.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Driver</div>
                    <div className="font-medium text-slate-800">{ambulance.driver}</div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Paramedic</p>
                    <p className="text-sm font-medium text-slate-800">{ambulance.paramedic}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Mileage</p>
                    <p className="text-sm font-medium text-slate-800">{ambulance.mileage.toLocaleString()} km</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Fuel Level</p>
                    <p className="text-sm font-medium text-slate-800">{ambulance.fuelLevel}%</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Incidents</p>
                    <p className="text-sm font-medium text-slate-800">{ambulance.dispatchCount}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Fuel</span>
                    <span className="text-sm font-bold text-slate-800">{ambulance.fuelLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        ambulance.fuelLevel > 50 ? 'bg-emerald-500' : 
                        ambulance.fuelLevel > 25 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${ambulance.fuelLevel}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Service Due</span>
                    <span className={`text-sm font-bold ${
                      getDaysUntilService(ambulance.nextServiceDate) <= 7 ? 'text-rose-600' : 
                      getDaysUntilService(ambulance.nextServiceDate) <= 30 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {getDaysUntilService(ambulance.nextServiceDate)} days
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        getDaysUntilService(ambulance.nextServiceDate) <= 7 ? 'bg-rose-500' : 
                        getDaysUntilService(ambulance.nextServiceDate) <= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, (30 - getDaysUntilService(ambulance.nextServiceDate)) / 30 * 100))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Equipment</span>
                    <span className="text-sm text-slate-600">{ambulance.equipment.length} items</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ambulance.equipment.slice(0, 3).map((item: string, index: number) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                        {item}
                      </span>
                    ))}
                    {ambulance.equipment.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                        +{ambulance.equipment.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openDispatchModal(ambulance)}
                  >
                    Dispatch
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="text-slate-600 hover:text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambulance Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Personnel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Metrics</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedAmbulances.map((ambulance) => (
                  <tr key={ambulance.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{ambulance.vehicleNumber}</div>
                        <div className="text-sm text-slate-500">{ambulance.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Mileage: {ambulance.mileage.toLocaleString()} km</div>
                        <div>Fuel: {ambulance.fuelLevel}%</div>
                        <div>GPS: {ambulance.gpsTracking ? '✓' : '✗'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Driver: {ambulance.driver}</div>
                        <div>Paramedic: {ambulance.paramedic}</div>
                        <div>Incidents: {ambulance.dispatchCount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(ambulance.status)}`}>
                        {ambulance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Avg Response: {ambulance.responseTime.toFixed(1)} min</div>
                        <div>Last Dispatch: {new Date(ambulance.lastDispatch).toLocaleDateString()}</div>
                        <div>Tracking: {ambulance.gpsTracking ? 'Active' : 'Inactive'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Last: {new Date(ambulance.lastServiceDate).toLocaleDateString()}</div>
                        <div>Next: {new Date(ambulance.nextServiceDate).toLocaleDateString()}</div>
                        <div className={`font-medium ${
                          getDaysUntilService(ambulance.nextServiceDate) <= 7 ? 'text-rose-600' : 
                          getDaysUntilService(ambulance.nextServiceDate) <= 30 ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          Due in {getDaysUntilService(ambulance.nextServiceDate)} days
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Oxygen: {ambulance.oxygenSupply ? '✓' : '✗'}</div>
                        <div>Defibrillator: {ambulance.defibrillator ? '✓' : '✗'}</div>
                        <div>Emergency: {ambulance.emergencyEquipment ? '✓' : '✗'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={ambulance.status}
                          onChange={(e) => {
                            // Update status in mock data
                            const updatedAmbulances = ambulances.map(a => 
                              a.id === ambulance.id ? { ...a, status: e.target.value } : a
                            );
                            setAmbulances(updatedAmbulances);
                            
                            // Update stats
                            const available = updatedAmbulances.filter(a => a.status === 'Available').length;
                            const dispatched = updatedAmbulances.filter(a => a.status === 'Dispatched').length;
                            const maintenance = updatedAmbulances.filter(a => a.status === 'Maintenance').length;
                            setStats({ ...stats, available, dispatched, maintenance });
                          }}
                        >
                          <option value="Available">Available</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openDispatchModal(ambulance)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
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

        {/* Ambulance Operations Dashboard */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Ambulance Operations Dashboard</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Avg Response Time</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">
                {ambulances.length > 0 ? (ambulances.reduce((sum, a) => sum + a.responseTime, 0) / ambulances.length).toFixed(1) : '0'} min
              </p>
              <p className="text-sm text-blue-600">Target: &lt;10 min</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">On-Time Arrivals</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">
                {ambulances.length > 0 ? Math.round((ambulances.filter(a => a.responseTime <= 10).length / ambulances.length) * 100) : '0'}%
              </p>
              <p className="text-sm text-emerald-600">Within 10 minutes</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Dispatch Efficiency</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">
                {ambulances.length > 0 ? Math.round((stats.dispatched / stats.total) * 100) : '0'}%
              </p>
              <p className="text-sm text-amber-600">Active vehicles dispatched</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Ambulance Modal */}
      {showAddAmbulanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Ambulance</h3>
              <button 
                onClick={() => setShowAddAmbulanceModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter vehicle number"
                    value={newAmbulance.vehicleNumber}
                    onChange={(e) => setNewAmbulance({...newAmbulance, vehicleNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newAmbulance.type}
                      onChange={(e) => setNewAmbulance({...newAmbulance, type: e.target.value})}
                    >
                      <option value="Basic Life Support">Basic Life Support</option>
                      <option value="Advanced Life Support">Advanced Life Support</option>
                      <option value="Neonatal">Neonatal</option>
                      <option value="Cardiac Care">Cardiac Care</option>
                      <option value="Trauma">Trauma</option>
                      <option value="Pediatric">Pediatric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newAmbulance.status}
                      onChange={(e) => setNewAmbulance({...newAmbulance, status: e.target.value})}
                    >
                      <option value="Available">Available</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter driver name"
                      value={newAmbulance.driver}
                      onChange={(e) => setNewAmbulance({...newAmbulance, driver: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Paramedic</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter paramedic name"
                      value={newAmbulance.paramedic}
                      onChange={(e) => setNewAmbulance({...newAmbulance, paramedic: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mileage (km)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter mileage"
                      value={newAmbulance.mileage}
                      onChange={(e) => setNewAmbulance({...newAmbulance, mileage: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Level (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter fuel level"
                      value={newAmbulance.fuelLevel}
                      onChange={(e) => setNewAmbulance({...newAmbulance, fuelLevel: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Service Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newAmbulance.lastServiceDate}
                      onChange={(e) => setNewAmbulance({...newAmbulance, lastServiceDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Next Service Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newAmbulance.nextServiceDate}
                      onChange={(e) => setNewAmbulance({...newAmbulance, nextServiceDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Equipment</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        checked={newAmbulance.oxygenSupply}
                        onChange={(e) => setNewAmbulance({...newAmbulance, oxygenSupply: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-slate-700">Oxygen Supply</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        checked={newAmbulance.defibrillator}
                        onChange={(e) => setNewAmbulance({...newAmbulance, defibrillator: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-slate-700">Defibrillator</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        checked={newAmbulance.emergencyEquipment}
                        onChange={(e) => setNewAmbulance({...newAmbulance, emergencyEquipment: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-slate-700">Emergency Equipment</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        checked={newAmbulance.gpsTracking}
                        onChange={(e) => setNewAmbulance({...newAmbulance, gpsTracking: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-slate-700">GPS Tracking</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddAmbulanceModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddAmbulance}
              >
                Add Ambulance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Modal */}
      {showDispatchModal && selectedAmbulance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Dispatch Ambulance: {selectedAmbulance.vehicleNumber}</h3>
              <button 
                onClick={() => setShowDispatchModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedAmbulance.vehicleNumber}</h4>
                  <p className="text-sm text-slate-600">{selectedAmbulance.type} - {selectedAmbulance.status}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={selectedAmbulance.driver}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Paramedic</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={selectedAmbulance.paramedic}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter pickup address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter destination hospital"
                    defaultValue="SuperHealth Hospital"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nature of Emergency</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                      <option>Medical Emergency</option>
                      <option>Trauma/Accident</option>
                      <option>Cardiac Arrest</option>
                      <option>Stroke</option>
                      <option>Respiratory Distress</option>
                      <option>Childbirth</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority Level</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                      <option>Immediate</option>
                      <option>Urgent</option>
                      <option>Routine</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Any special instructions or patient conditions"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowDispatchModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => {
                  // Update ambulance status to Dispatched
                  const updatedAmbulances = ambulances.map(a => 
                    a.id === selectedAmbulance.id ? { 
                      ...a, 
                      status: 'Dispatched',
                      lastDispatch: new Date().toISOString(),
                      dispatchCount: a.dispatchCount + 1
                    } : a
                  );
                  setAmbulances(updatedAmbulances);
                  
                  // Update stats
                  const dispatched = updatedAmbulances.filter(a => a.status === 'Dispatched').length;
                  const available = updatedAmbulances.filter(a => a.status === 'Available').length;
                  setStats({ ...stats, dispatched, available });
                  
                  setShowDispatchModal(false);
                }}
              >
                Dispatch Ambulance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}