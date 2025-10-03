'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Beds() {
  const [beds, setBeds] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [sortBy, setSortBy] = useState('ward')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0, maintenance: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddBedModal, setShowAddBedModal] = useState(false)
  const [newBed, setNewBed] = useState({
    bedNumber: '',
    ward: 'General',
    status: 'Available',
    patientName: '',
    roomNumber: '',
    lastUpdated: new Date().toISOString()
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchBeds()
    }
  }, [])

  const fetchBeds = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital bed management
      const mockBeds = [
        { id: 1, bedNumber: 'B101', roomNumber: '201', ward: 'General', status: 'Occupied', patientName: 'John Smith', lastUpdated: new Date().toISOString() },
        { id: 2, bedNumber: 'B102', roomNumber: '201', ward: 'General', status: 'Available', patientName: '', lastUpdated: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, bedNumber: 'B103', roomNumber: '202', ward: 'ICU', status: 'Occupied', patientName: 'Mary Johnson', lastUpdated: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, bedNumber: 'B104', roomNumber: '203', ward: 'Surgery', status: 'Maintenance', patientName: '', lastUpdated: new Date(Date.now() - 10800000).toISOString() },
        { id: 5, bedNumber: 'B105', roomNumber: '301', ward: 'Cardiology', status: 'Occupied', patientName: 'Robert Williams', lastUpdated: new Date().toISOString() },
        { id: 6, bedNumber: 'B106', roomNumber: '302', ward: 'Pediatrics', status: 'Available', patientName: '', lastUpdated: new Date(Date.now() - 3600000).toISOString() },
        { id: 7, bedNumber: 'B107', roomNumber: '303', ward: 'Orthopedics', status: 'Occupied', patientName: 'Patricia Davis', lastUpdated: new Date().toISOString() },
        { id: 8, bedNumber: 'B108', roomNumber: '304', ward: 'Emergency', status: 'Available', patientName: '', lastUpdated: new Date(Date.now() - 3600000).toISOString() },
        { id: 9, bedNumber: 'B109', roomNumber: '401', ward: 'ICU', status: 'Occupied', patientName: 'James Wilson', lastUpdated: new Date(Date.now() - 7200000).toISOString() },
        { id: 10, bedNumber: 'B110', roomNumber: '402', ward: 'General', status: 'Available', patientName: '', lastUpdated: new Date().toISOString() },
        { id: 11, bedNumber: 'B111', roomNumber: '501', ward: 'Surgery', status: 'Maintenance', patientName: '', lastUpdated: new Date(Date.now() - 10800000).toISOString() },
        { id: 12, bedNumber: 'B112', roomNumber: '502', ward: 'Cardiology', status: 'Occupied', patientName: 'Sarah Miller', lastUpdated: new Date().toISOString() }
      ];
      
      setBeds(mockBeds);
      
      // Calculate stats
      const total = mockBeds.length;
      const occupied = mockBeds.filter(b => b.status === 'Occupied').length;
      const available = mockBeds.filter(b => b.status === 'Available').length;
      const maintenance = mockBeds.filter(b => b.status === 'Maintenance').length;
      
      setStats({ total, occupied, available, maintenance });
    } catch (err) {
      console.error('Error fetching beds:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBedStatus = async (bedId: number, newStatus: string, patientName: string = '') => {
    try {
      // Update local state
      setBeds(beds.map((bed: any) => 
        bed.id === bedId ? { ...bed, status: newStatus, patientName: newStatus === 'Occupied' ? patientName : '', lastUpdated: new Date().toISOString() } : bed
      ));
      
      // Update stats
      const updatedBeds = beds.map((bed: any) => 
        bed.id === bedId ? { ...bed, status: newStatus, patientName: newStatus === 'Occupied' ? patientName : '' } : bed
      );
      
      const occupied = updatedBeds.filter((b: any) => b.status === 'Occupied').length;
      const available = updatedBeds.filter((b: any) => b.status === 'Available').length;
      const maintenance = updatedBeds.filter((b: any) => b.status === 'Maintenance').length;
      setStats({ total: updatedBeds.length, occupied, available, maintenance });
    } catch (error) {
      console.error('Error updating bed status:', error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Occupied':
        return 'bg-blue-100 text-blue-800'
      case 'Available':
        return 'bg-emerald-100 text-emerald-800'
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Occupied':
        return 'Occupied'
      case 'Available':
        return 'Available'
      case 'Maintenance':
        return 'Under Maintenance'
      default:
        return status
    }
  }

  // Filter beds based on selected status, ward, and search term
  const filteredBeds = beds.filter(bed => {
    const statusMatch = selectedStatus ? bed.status === selectedStatus : true
    const wardMatch = selectedWard ? bed.ward === selectedWard : true
    const searchMatch = searchTerm 
      ? bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
        bed.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && wardMatch && searchMatch
  })

  // Sort beds
  const sortedBeds = [...filteredBeds].sort((a, b) => {
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

  const handleAddBed = () => {
    const newId = beds.length > 0 ? Math.max(...beds.map(b => b.id)) + 1 : 1
    const bedToAdd = {
      ...newBed,
      id: newId,
      lastUpdated: new Date().toISOString()
    }
    
    setBeds([...beds, bedToAdd])
    
    // Update stats
    const total = beds.length + 1;
    const occupied = newBed.status === 'Occupied' ? stats.occupied + 1 : stats.occupied;
    const available = newBed.status === 'Available' ? stats.available + 1 : stats.available;
    const maintenance = newBed.status === 'Maintenance' ? stats.maintenance + 1 : stats.maintenance;
    
    setStats({ total, occupied, available, maintenance })
    
    // Reset form and close modal
    setNewBed({
      bedNumber: '',
      ward: 'General',
      status: 'Available',
      patientName: '',
      roomNumber: '',
      lastUpdated: new Date().toISOString()
    })
    setShowAddBedModal(false)
  }

  // Function to get bed status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Occupied':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.243L15.657 12z" />
          </svg>
        )
      case 'Available':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'Maintenance':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
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
            <h2 className="text-2xl font-bold text-slate-800">Bed Management System</h2>
            <p className="text-slate-600">Manage hospital bed assignments and availability</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddBedModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Bed
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Beds</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.occupied}</p>
            <p className="text-sm text-blue-600">Occupied</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.available}</p>
            <p className="text-sm text-emerald-600">Available</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.maintenance}</p>
            <p className="text-sm text-amber-600">Under Maintenance</p>
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
                placeholder="Bed number, room, or patient"
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
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Under Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="wardFilter" className="block text-sm font-medium text-slate-700 mb-1">Ward</label>
              <select
                id="wardFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                <option value="">All Wards</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Orthopedics">Orthopedics</option>
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
                <option value="ward">Ward</option>
                <option value="roomNumber">Room Number</option>
                <option value="bedNumber">Bed Number</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedWard('')
                  setSearchTerm('')
                  setSortBy('ward')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bed Grid Visualization - Ward Floor Plan */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Ward Floor Plan</h3>
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
          
          {/* Ward Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['General', 'ICU', 'Surgery', 'Cardiology', 'Pediatrics', 'Emergency', 'Orthopedics'].map((ward) => (
              <button
                key={ward}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedWard === ward || selectedWard === ''
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setSelectedWard(selectedWard === ward ? '' : ward)}
              >
                {ward}
              </button>
            ))}
          </div>
          
          {/* Floor Plan Visualization */}
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 relative">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-slate-700">Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
                <span className="text-sm text-slate-700">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                <span className="text-sm text-slate-700">Maintenance</span>
              </div>
            </div>
            
            {/* Interactive Floor Plan */}
            <div className="relative">
              {/* Each Ward */}
              {(!selectedWard || selectedWard === 'General') && (
                <div className={`mb-8 ${selectedWard && selectedWard !== 'General' ? 'opacity-50' : ''}`}>
                  <h4 className="text-md font-medium text-slate-800 mb-3">General Ward</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedBeds
                      .filter((bed) => bed.ward === 'General')
                      .map((bed) => (
                        <div
                          key={bed.id}
                          className={`rounded-xl p-3 border-2 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 ${
                            bed.status === 'Occupied'
                              ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                              : bed.status === 'Available'
                              ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                          }`}
                          onClick={() => updateBedStatus(bed.id, bed.status === 'Occupied' ? 'Available' : 'Occupied', bed.patientName)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800">Bed {bed.bedNumber}</h4>
                              <p className="text-sm text-slate-600">Room {bed.roomNumber}</p>
                            </div>
                            <div
                              className={`p-1 rounded-full ${
                                bed.status === 'Occupied'
                                  ? 'bg-blue-100'
                                  : bed.status === 'Available'
                                  ? 'bg-emerald-100'
                                  : 'bg-amber-100'
                              }`}
                            >
                              {getStatusIcon(bed.status)}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusClass(bed.status)}`}
                            >
                              {getStatusText(bed.status)}
                            </span>
                          </div>
                          {bed.patientName && (
                            <div className="mt-2 text-xs">
                              <div className="font-medium text-slate-700 truncate">{bed.patientName}</div>
                            </div>
                          )}
                          <div className="mt-2 text-xs text-slate-500">
                            {bed.status === 'Occupied' ? 'Click to release' : 'Click to assign'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* ICU Ward */}
              {(!selectedWard || selectedWard === 'ICU') && (
                <div className={`mb-8 ${selectedWard && selectedWard !== 'ICU' ? 'opacity-50' : ''}`}>
                  <h4 className="text-md font-medium text-slate-800 mb-3">ICU Ward</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedBeds
                      .filter((bed) => bed.ward === 'ICU')
                      .map((bed) => (
                        <div
                          key={bed.id}
                          className={`rounded-xl p-3 border-2 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 ${
                            bed.status === 'Occupied'
                              ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                              : bed.status === 'Available'
                              ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                          }`}
                          onClick={() => updateBedStatus(bed.id, bed.status === 'Occupied' ? 'Available' : 'Occupied', bed.patientName)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800">Bed {bed.bedNumber}</h4>
                              <p className="text-sm text-slate-600">Room {bed.roomNumber}</p>
                            </div>
                            <div
                              className={`p-1 rounded-full ${
                                bed.status === 'Occupied'
                                  ? 'bg-blue-100'
                                  : bed.status === 'Available'
                                  ? 'bg-emerald-100'
                                  : 'bg-amber-100'
                              }`}
                            >
                              {getStatusIcon(bed.status)}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusClass(bed.status)}`}
                            >
                              {getStatusText(bed.status)}
                            </span>
                          </div>
                          {bed.patientName && (
                            <div className="mt-2 text-xs">
                              <div className="font-medium text-slate-700 truncate">{bed.patientName}</div>
                            </div>
                          )}
                          <div className="mt-2 text-xs text-slate-500">
                            {bed.status === 'Occupied' ? 'Click to release' : 'Click to assign'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Surgery Ward */}
              {(!selectedWard || selectedWard === 'Surgery') && (
                <div className={`mb-8 ${selectedWard && selectedWard !== 'Surgery' ? 'opacity-50' : ''}`}>
                  <h4 className="text-md font-medium text-slate-800 mb-3">Surgery Ward</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedBeds
                      .filter((bed) => bed.ward === 'Surgery')
                      .map((bed) => (
                        <div
                          key={bed.id}
                          className={`rounded-xl p-3 border-2 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 ${
                            bed.status === 'Occupied'
                              ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                              : bed.status === 'Available'
                              ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                          }`}
                          onClick={() => updateBedStatus(bed.id, bed.status === 'Occupied' ? 'Available' : 'Occupied', bed.patientName)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800">Bed {bed.bedNumber}</h4>
                              <p className="text-sm text-slate-600">Room {bed.roomNumber}</p>
                            </div>
                            <div
                              className={`p-1 rounded-full ${
                                bed.status === 'Occupied'
                                  ? 'bg-blue-100'
                                  : bed.status === 'Available'
                                  ? 'bg-emerald-100'
                                  : 'bg-amber-100'
                              }`}
                            >
                              {getStatusIcon(bed.status)}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusClass(bed.status)}`}
                            >
                              {getStatusText(bed.status)}
                            </span>
                          </div>
                          {bed.patientName && (
                            <div className="mt-2 text-xs">
                              <div className="font-medium text-slate-700 truncate">{bed.patientName}</div>
                            </div>
                          )}
                          <div className="mt-2 text-xs text-slate-500">
                            {bed.status === 'Occupied' ? 'Click to release' : 'Click to assign'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Cardiology Ward */}
              {(!selectedWard || selectedWard === 'Cardiology') && (
                <div className={`${selectedWard && selectedWard !== 'Cardiology' ? 'opacity-50' : ''}`}>
                  <h4 className="text-md font-medium text-slate-800 mb-3">Cardiology Ward</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedBeds
                      .filter((bed) => bed.ward === 'Cardiology')
                      .map((bed) => (
                        <div
                          key={bed.id}
                          className={`rounded-xl p-3 border-2 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 ${
                            bed.status === 'Occupied'
                              ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                              : bed.status === 'Available'
                              ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                          }`}
                          onClick={() => updateBedStatus(bed.id, bed.status === 'Occupied' ? 'Available' : 'Occupied', bed.patientName)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800">Bed {bed.bedNumber}</h4>
                              <p className="text-sm text-slate-600">Room {bed.roomNumber}</p>
                            </div>
                            <div
                              className={`p-1 rounded-full ${
                                bed.status === 'Occupied'
                                  ? 'bg-blue-100'
                                  : bed.status === 'Available'
                                  ? 'bg-emerald-100'
                                  : 'bg-amber-100'
                              }`}
                            >
                              {getStatusIcon(bed.status)}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusClass(bed.status)}`}
                            >
                              {getStatusText(bed.status)}
                            </span>
                          </div>
                          {bed.patientName && (
                            <div className="mt-2 text-xs">
                              <div className="font-medium text-slate-700 truncate">{bed.patientName}</div>
                            </div>
                          )}
                          <div className="mt-2 text-xs text-slate-500">
                            {bed.status === 'Occupied' ? 'Click to release' : 'Click to assign'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bed Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedBeds.map((bed) => (
                  <tr key={bed.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{bed.bedNumber}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">Bed {bed.bedNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {bed.ward}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {bed.roomNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(bed.status)}`}>
                        {getStatusText(bed.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {bed.patientName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(bed.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={bed.status}
                          onChange={(e) => {
                            // Allow manual status update
                            updateBedStatus(bed.id, e.target.value, bed.patientName);
                          }}
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Under Maintenance</option>
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

      {/* Add Bed Modal */}
      {showAddBedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Bed</h3>
              <button 
                onClick={() => setShowAddBedModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bed Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter bed number"
                    value={newBed.bedNumber}
                    onChange={(e) => setNewBed({...newBed, bedNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ward</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newBed.ward}
                    onChange={(e) => setNewBed({...newBed, ward: e.target.value})}
                  >
                    <option value="General">General</option>
                    <option value="ICU">ICU</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter room number"
                    value={newBed.roomNumber}
                    onChange={(e) => setNewBed({...newBed, roomNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newBed.status}
                    onChange={(e) => setNewBed({...newBed, status: e.target.value})}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Under Maintenance</option>
                  </select>
                </div>
                {newBed.status === 'Occupied' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter patient name"
                      value={newBed.patientName}
                      onChange={(e) => setNewBed({...newBed, patientName: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddBedModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddBed}
              >
                Add Bed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}