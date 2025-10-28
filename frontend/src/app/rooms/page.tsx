'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import apiService from '../../utils/apiService'

export default function Rooms() {
  const [rooms, setRooms] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [sortBy, setSortBy] = useState('number')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ occupied: 0, available: 0, clean: 0, discharged: 0, maintenance: 0, total: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [showEditRoomModal, setShowEditRoomModal] = useState(false)
  const [newRoom, setNewRoom] = useState({
    number: '',
    floor: 1,
    type: 'General Ward',
    status: 'available',
    numberOfBeds: 1
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchRooms()
    }
  }, [])

    const fetchRooms = async () => {
    try {
      setLoading(true);
      const roomData = await apiService.getRooms();
      setRooms(roomData.rooms);
      
      // Calculate stats
      const occupied = roomData.rooms.filter((r: any) => r.status === 'occupied').length;
      const available = roomData.rooms.filter((r: any) => r.status === 'available').length;
      const clean = roomData.rooms.filter((r: any) => r.status === 'clean').length;
      const discharged = roomData.rooms.filter((r: any) => r.status === 'discharged').length;
      const maintenance = roomData.rooms.filter((r: any) => r.status === 'maintenance').length;
      setStats({ occupied, available, clean, discharged, maintenance, total: roomData.rooms.length });
      setError('');
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('This is a Demo version - In the real version, you will get actual data from the backend');
      
      // Use mock data if API fails - Enhanced with bed information
      const mockRooms = [
        { 
          id: 1, 
          number: '101', 
          floor: 1, 
          type: 'General Ward', 
          status: 'occupied', 
          updatedAt: new Date().toISOString(),
          beds: [
            { id: 1, bedNumber: 'B001', patientName: 'John Smith', status: 'occupied' },
            { id: 2, bedNumber: 'B002', patientName: 'Robert Johnson', status: 'occupied' }
          ]
        },
        { 
          id: 2, 
          number: '102', 
          floor: 1, 
          type: 'General Ward', 
          status: 'available', 
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          beds: [
            { id: 3, bedNumber: 'B003', patientName: '', status: 'available' },
            { id: 4, bedNumber: 'B004', patientName: '', status: 'available' }
          ]
        },
        { 
          id: 3, 
          number: '103', 
          floor: 1, 
          type: 'Private Room', 
          status: 'clean', 
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
          beds: [
            { id: 5, bedNumber: 'B005', patientName: '', status: 'available' }
          ]
        },
        { 
          id: 4, 
          number: '104', 
          floor: 1, 
          type: 'ICU', 
          status: 'maintenance', 
          updatedAt: new Date(Date.now() - 10800000).toISOString(),
          beds: [
            { id: 6, bedNumber: 'B006', patientName: '', status: 'maintenance' }
          ]
        },
        { 
          id: 5, 
          number: '201', 
          floor: 2, 
          type: 'General Ward', 
          status: 'occupied', 
          updatedAt: new Date().toISOString(),
          beds: [
            { id: 7, bedNumber: 'B007', patientName: 'Mary Williams', status: 'occupied' },
            { id: 8, bedNumber: 'B008', patientName: 'David Brown', status: 'occupied' }
          ]
        },
        { 
          id: 6, 
          number: '202', 
          floor: 2, 
          type: 'General Ward', 
          status: 'occupied', 
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          beds: [
            { id: 9, bedNumber: 'B009', patientName: 'Patricia Davis', status: 'occupied' },
            { id: 10, bedNumber: 'B010', patientName: 'James Wilson', status: 'occupied' }
          ]
        },
        { 
          id: 7, 
          number: '203', 
          floor: 2, 
          type: 'Private Room', 
          status: 'occupied', 
          updatedAt: new Date().toISOString(),
          beds: [
            { id: 11, bedNumber: 'B011', patientName: 'Sarah Miller', status: 'occupied' }
          ]
        },
        { 
          id: 8, 
          number: '204', 
          floor: 2, 
          type: 'Semi-Private', 
          status: 'discharged', 
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          beds: [
            { id: 12, bedNumber: 'B012', patientName: 'Michael Taylor', status: 'discharged' },
            { id: 13, bedNumber: 'B013', patientName: 'Emily Anderson', status: 'discharged' }
          ]
        },
        { 
          id: 9, 
          number: '301', 
          floor: 3, 
          type: 'General Ward', 
          status: 'available', 
          updatedAt: new Date().toISOString(),
          beds: [
            { id: 14, bedNumber: 'B014', patientName: '', status: 'available' },
            { id: 15, bedNumber: 'B015', patientName: '', status: 'available' }
          ]
        },
        { 
          id: 10, 
          number: '302', 
          floor: 3, 
          type: 'General Ward', 
          status: 'occupied', 
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          beds: [
            { id: 16, bedNumber: 'B016', patientName: 'Christopher Moore', status: 'occupied' },
            { id: 17, bedNumber: 'B017', patientName: 'Jennifer Martin', status: 'occupied' }
          ]
        },
        { 
          id: 11, 
          number: '303', 
          floor: 3, 
          type: 'Private Room', 
          status: 'clean', 
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
          beds: [
            { id: 18, bedNumber: 'B018', patientName: '', status: 'available' }
          ]
        },
        { 
          id: 12, 
          number: '304', 
          floor: 3, 
          type: 'Maternity Ward', 
          status: 'available', 
          updatedAt: new Date().toISOString(),
          beds: [
            { id: 19, bedNumber: 'B019', patientName: '', status: 'available' },
            { id: 20, bedNumber: 'B020', patientName: '', status: 'available' }
          ]
        }
      ];
      
      setRooms(mockRooms);
      
      // Calculate stats based on beds instead of rooms
      let occupied = 0, available = 0, clean = 0, discharged = 0, maintenance = 0;
      for (const room of mockRooms) {
        for (const bed of room.beds) {
          switch (bed.status) {
            case 'occupied':
              occupied++;
              break;
            case 'available':
              available++;
              break;
            case 'clean':
              clean++;
              break;
            case 'discharged':
              discharged++;
              break;
            case 'maintenance':
              maintenance++;
              break;
          }
        }
      }
      setStats({ occupied, available, clean, discharged, maintenance, total: occupied + available + clean + discharged + maintenance });
    } finally {
      setLoading(false);
    }
  };

  const updateRoomStatus = async (roomId: number, newStatus: string) => {
    try {
      await apiService.updateRoomStatus(roomId, newStatus);
      
      // Update local state
      setRooms(rooms.map((room: any) => 
        room.id === roomId ? { ...room, status: newStatus, updatedAt: new Date().toISOString() } : room
      ));
      
      // Update stats
      const updatedRooms = rooms.map((room: any) => 
        room.id === roomId ? { ...room, status: newStatus } : room
      );
      
      const occupied = updatedRooms.filter((r: any) => r.status === 'occupied').length;
      const available = updatedRooms.filter((r: any) => r.status === 'available').length;
      const clean = updatedRooms.filter((r: any) => r.status === 'clean').length;
      const discharged = updatedRooms.filter((r: any) => r.status === 'discharged').length;
      const maintenance = updatedRooms.filter((r: any) => r.status === 'maintenance').length;
      setStats({ occupied, available, clean, discharged, maintenance, total: updatedRooms.length });
      
      // Show success message
      setError('This is a Demo version - Changes saved successfully in localStorage');
    } catch (error) {
      console.error('Error updating room status:', error);
      setError('This is a Demo version - In the real version, you will get actual data from the backend');
      
      // Update local state even if API fails (for demo purposes)
      setRooms(rooms.map((room: any) => 
        room.id === roomId ? { ...room, status: newStatus, updatedAt: new Date().toISOString() } : room
      ));
      
      // Update stats
      const updatedRooms = rooms.map((room: any) => 
        room.id === roomId ? { ...room, status: newStatus } : room
      );
      
      const occupied = updatedRooms.filter((r: any) => r.status === 'occupied').length;
      const available = updatedRooms.filter((r: any) => r.status === 'available').length;
      const clean = updatedRooms.filter((r: any) => r.status === 'clean').length;
      const discharged = updatedRooms.filter((r: any) => r.status === 'discharged').length;
      const maintenance = updatedRooms.filter((r: any) => r.status === 'maintenance').length;
      setStats({ occupied, available, clean, discharged, maintenance, total: updatedRooms.length });
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-100 text-blue-800'
      case 'available':
        return 'bg-emerald-100 text-emerald-800'
      case 'clean':
        return 'bg-teal-100 text-teal-800'
      case 'discharged':
        return 'bg-amber-100 text-amber-800'
      case 'maintenance':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'Occupied'
      case 'available':
        return 'Available'
      case 'clean':
        return 'Clean'
      case 'discharged':
        return 'Discharged'
      case 'maintenance':
        return 'Under Maintenance'
      default:
        return status
    }
  }

  // Filter rooms based on selected status, floor, and search term
  const filteredRooms = rooms.filter(room => {
    const statusMatch = selectedStatus ? room.status === selectedStatus : true
    const floorMatch = selectedFloor ? room.floor.toString() === selectedFloor : true
    const searchMatch = searchTerm 
      ? room.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && floorMatch && searchMatch
  })

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
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

  const handleAddRoom = () => {
    // In a real app, you would call the API to add a room
    // For now, we'll just add to the local state
    const newId = rooms.length > 0 ? Math.max(...rooms.map((r: any) => r.id)) + 1 : 1
    const newNumberOfBeds = newRoom.numberOfBeds || 1;
    
    // Create bed data for the room
    const newBeds = [];
    for (let i = 0; i < newNumberOfBeds; i++) {
      newBeds.push({
        id: Math.max(0, ...(rooms.flatMap((r: any) => r.beds || []).map((b: any) => b.id))) + i + 1,
        bedNumber: `${newRoom.number}B${i + 1}`,
        patientName: newRoom.status === 'occupied' ? `Patient in Room ${newRoom.number}` : '',
        status: newRoom.status
      });
    }
    
    const roomToAdd = {
      ...newRoom,
      id: newId,
      updatedAt: new Date().toISOString(),
      beds: newBeds
    };
    
    setRooms([...rooms, roomToAdd]);
    
    // Update stats based on the new beds
    const occupied = newRoom.status === 'occupied' ? stats.occupied + newNumberOfBeds : stats.occupied;
    const available = newRoom.status === 'available' ? stats.available + newNumberOfBeds : stats.available;
    const clean = newRoom.status === 'clean' ? stats.clean + newNumberOfBeds : stats.clean;
    const discharged = newRoom.status === 'discharged' ? stats.discharged + newNumberOfBeds : stats.discharged;
    const maintenance = newRoom.status === 'maintenance' ? stats.maintenance + newNumberOfBeds : stats.maintenance;
    setStats({ 
      occupied, 
      available, 
      clean, 
      discharged, 
      maintenance, 
      total: stats.total + newNumberOfBeds 
    });
    
    // Reset form and close modal
    setNewRoom({
      number: '',
      floor: 1,
      type: 'General Ward',
      status: 'available',
      numberOfBeds: 1
    });
    setShowAddRoomModal(false);
  }

  // Function to get room status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.243L15.657 12z" />
          </svg>
        )
      case 'available':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'clean':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'discharged':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'maintenance':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
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
            <h2 className="text-2xl font-bold text-slate-800">Patient Room Management</h2>
            <p className="text-slate-600">Manage patient room statuses and cleaning tasks</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddRoomModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Room
          </button>
        </div>

        {error && (
          <div className="bg-amber-50 text-amber-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Rooms</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.occupied}</p>
            <p className="text-sm text-blue-600">Occupied</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.available}</p>
            <p className="text-sm text-emerald-600">Available</p>
          </div>
          <div className="bg-teal-50 rounded-xl shadow p-4 text-center border-l-4 border-teal-500">
            <p className="text-2xl font-bold text-teal-700">{stats.clean}</p>
            <p className="text-sm text-teal-600">Clean</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.discharged}</p>
            <p className="text-sm text-amber-600">Discharged</p>
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
                placeholder="Room number or type"
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
                <option value="occupied">Occupied</option>
                <option value="available">Available</option>
                <option value="clean">Clean</option>
                <option value="discharged">Discharged</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="floorFilter" className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
              <select
                id="floorFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <option value="">All Floors</option>
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
                <option value="4">Floor 4</option>
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
                <option value="number">Room Number</option>
                <option value="floor">Floor</option>
                <option value="type">Type</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedFloor('')
                  setSearchTerm('')
                  setSortBy('number')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bed-wise Room Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Bed-wise Room Map</h3>
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
          
          {/* Room Map Visualization with Bed Details */}
          <div className="mb-6">
            {/* Floor Selector */}
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3].map((floor) => (
                <button
                  key={floor}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedFloor === floor.toString() || selectedFloor === ''
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => setSelectedFloor(selectedFloor === floor.toString() ? '' : floor.toString())}
                >
                  Floor {floor}
                </button>
              ))}
            </div>
            
            {/* Interactive Floor Plan with Beds */}
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
                  <div className="w-4 h-4 bg-teal-500 rounded mr-2"></div>
                  <span className="text-sm text-slate-700">Clean</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                  <span className="text-sm text-slate-700">Discharged</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-rose-500 rounded mr-2"></div>
                  <span className="text-sm text-slate-700">Maintenance</span>
                </div>
              </div>
              
              {/* Floor Plan Visualization with Beds */}
              <div className="relative">
                {/* Floor 1 */}
                {(!selectedFloor || selectedFloor === '1') && (
                  <div className={`mb-8 ${selectedFloor && selectedFloor !== '1' ? 'opacity-50' : ''}`}>
                    <h4 className="text-md font-medium text-slate-800 mb-3">Floor 1</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {sortedRooms
                        .filter((room) => room.floor === 1)
                        .map((room) => (
                          <div key={room.id}>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-semibold text-slate-800">Room {room.number} ({room.type})</h5>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(room.status)}`}>
                                {getStatusText(room.status)} Room
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 ml-4">
                              {room.beds && room.beds.map((bed: any) => (
                                <div
                                  key={bed.id}
                                  className={`rounded-lg p-2 border-2 transition-all duration-300 hover:shadow-md cursor-pointer ${
                                    bed.status === 'occupied'
                                      ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                                      : bed.status === 'available'
                                      ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                                      : bed.status === 'clean'
                                      ? 'border-teal-200 bg-teal-50 hover:bg-teal-100'
                                      : bed.status === 'discharged'
                                      ? 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                                      : 'border-rose-200 bg-rose-50 hover:bg-rose-100'
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <h6 className="font-medium text-slate-800">Bed {bed.bedNumber}</h6>
                                    <div
                                      className={`p-1 rounded-full ${
                                        bed.status === 'occupied'
                                          ? 'bg-blue-100'
                                          : bed.status === 'available'
                                          ? 'bg-emerald-100'
                                          : bed.status === 'clean'
                                          ? 'bg-teal-100'
                                          : bed.status === 'discharged'
                                          ? 'bg-amber-100'
                                          : 'bg-rose-100'
                                      }`}
                                    >
                                      {getStatusIcon(bed.status)}
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <span
                                      className={`px-1 py-0.5 text-xs rounded-full ${getStatusClass(bed.status)}`}
                                    >
                                      {getStatusText(bed.status)}
                                    </span>
                                  </div>
                                  {bed.patientName && (
                                    <div className="mt-1 text-xs truncate">
                                      <div className="font-medium text-slate-700">{bed.patientName}</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Floor 2 */}
                {(!selectedFloor || selectedFloor === '2') && (
                  <div className={`mb-8 ${selectedFloor && selectedFloor !== '2' ? 'opacity-50' : ''}`}>
                    <h4 className="text-md font-medium text-slate-800 mb-3">Floor 2</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {sortedRooms
                        .filter((room) => room.floor === 2)
                        .map((room) => (
                          <div key={room.id}>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-semibold text-slate-800">Room {room.number} ({room.type})</h5>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(room.status)}`}>
                                {getStatusText(room.status)} Room
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 ml-4">
                              {room.beds && room.beds.map((bed: any) => (
                                <div
                                  key={bed.id}
                                  className={`rounded-lg p-2 border-2 transition-all duration-300 hover:shadow-md cursor-pointer ${
                                    bed.status === 'occupied'
                                      ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                                      : bed.status === 'available'
                                      ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                                      : bed.status === 'clean'
                                      ? 'border-teal-200 bg-teal-50 hover:bg-teal-100'
                                      : bed.status === 'discharged'
                                      ? 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                                      : 'border-rose-200 bg-rose-50 hover:bg-rose-100'
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <h6 className="font-medium text-slate-800">Bed {bed.bedNumber}</h6>
                                    <div
                                      className={`p-1 rounded-full ${
                                        bed.status === 'occupied'
                                          ? 'bg-blue-100'
                                          : bed.status === 'available'
                                          ? 'bg-emerald-100'
                                          : bed.status === 'clean'
                                          ? 'bg-teal-100'
                                          : bed.status === 'discharged'
                                          ? 'bg-amber-100'
                                          : 'bg-rose-100'
                                      }`}
                                    >
                                      {getStatusIcon(bed.status)}
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <span
                                      className={`px-1 py-0.5 text-xs rounded-full ${getStatusClass(bed.status)}`}
                                    >
                                      {getStatusText(bed.status)}
                                    </span>
                                  </div>
                                  {bed.patientName && (
                                    <div className="mt-1 text-xs truncate">
                                      <div className="font-medium text-slate-700">{bed.patientName}</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Floor 3 */}
                {(!selectedFloor || selectedFloor === '3') && (
                  <div className={`${selectedFloor && selectedFloor !== '3' ? 'opacity-50' : ''}`}>
                    <h4 className="text-md font-medium text-slate-800 mb-3">Floor 3</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {sortedRooms
                        .filter((room) => room.floor === 3)
                        .map((room) => (
                          <div key={room.id}>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-semibold text-slate-800">Room {room.number} ({room.type})</h5>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(room.status)}`}>
                                {getStatusText(room.status)} Room
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 ml-4">
                              {room.beds && room.beds.map((bed: any) => (
                                <div
                                  key={bed.id}
                                  className={`rounded-lg p-2 border-2 transition-all duration-300 hover:shadow-md cursor-pointer ${
                                    bed.status === 'occupied'
                                      ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                                      : bed.status === 'available'
                                      ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                                      : bed.status === 'clean'
                                      ? 'border-teal-200 bg-teal-50 hover:bg-teal-100'
                                      : bed.status === 'discharged'
                                      ? 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                                      : 'border-rose-200 bg-rose-50 hover:bg-rose-100'
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <h6 className="font-medium text-slate-800">Bed {bed.bedNumber}</h6>
                                    <div
                                      className={`p-1 rounded-full ${
                                        bed.status === 'occupied'
                                          ? 'bg-blue-100'
                                          : bed.status === 'available'
                                          ? 'bg-emerald-100'
                                          : bed.status === 'clean'
                                          ? 'bg-teal-100'
                                          : bed.status === 'discharged'
                                          ? 'bg-amber-100'
                                          : 'bg-rose-100'
                                      }`}
                                    >
                                      {getStatusIcon(bed.status)}
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <span
                                      className={`px-1 py-0.5 text-xs rounded-full ${getStatusClass(bed.status)}`}
                                    >
                                      {getStatusText(bed.status)}
                                    </span>
                                  </div>
                                  {bed.patientName && (
                                    <div className="mt-1 text-xs truncate">
                                      <div className="font-medium text-slate-700">{bed.patientName}</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bed-wise Room Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bed Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bed Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedRooms.flatMap((room: any) => 
                  (room.beds || []).map((bed: any) => (
                    <tr 
                      key={bed.id} 
                      className="hover:bg-slate-50 transition-all duration-300"
                    >
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
                        {room.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        Floor {room.floor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(bed.status)}`}>
                          {getStatusText(bed.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {bed.patientName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                            value={bed.status}
                            onChange={(e) => {
                              // For demo, we'll update the bed status in the room's bed array
                              const updatedRooms = rooms.map((r: any) => {
                                if (r.id === room.id) {
                                  return {
                                    ...r,
                                    beds: r.beds.map((b: any) => 
                                      b.id === bed.id ? { ...b, status: e.target.value } : b
                                    )
                                  };
                                }
                                return r;
                              });
                              setRooms(updatedRooms);
                              
                              // Update stats
                              let occupied = 0, available = 0, clean = 0, discharged = 0, maintenance = 0;
                              for (const r of updatedRooms) {
                                for (const b of r.beds) {
                                  switch (b.status) {
                                    case 'occupied':
                                      occupied++;
                                      break;
                                    case 'available':
                                      available++;
                                      break;
                                    case 'clean':
                                      clean++;
                                      break;
                                    case 'discharged':
                                      discharged++;
                                      break;
                                    case 'maintenance':
                                      maintenance++;
                                      break;
                                  }
                                }
                              }
                              setStats({ occupied, available, clean, discharged, maintenance, total: occupied + available + clean + discharged + maintenance });
                            }}
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="clean">Clean</option>
                            <option value="discharged">Discharged</option>
                            <option value="maintenance">Under Maintenance</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Room</h3>
              <button 
                onClick={() => setShowAddRoomModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter room number"
                    value={newRoom.number}
                    onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({...newRoom, floor: parseInt(e.target.value)})}
                  >
                    <option value={1}>Floor 1</option>
                    <option value={2}>Floor 2</option>
                    <option value={3}>Floor 3</option>
                    <option value={4}>Floor 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                  >
                    <option value="General Ward">General Ward</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Semi-Private">Semi-Private</option>
                    <option value="ICU">ICU</option>
                    <option value="Maternity Ward">Maternity Ward</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of Beds</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newRoom.numberOfBeds || 1}
                    onChange={(e) => setNewRoom({...newRoom, numberOfBeds: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} bed{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({...newRoom, status: e.target.value})}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="clean">Clean</option>
                    <option value="discharged">Discharged</option>
                    <option value="maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddRoomModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddRoom}
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}