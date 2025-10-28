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
  const [stats, setStats] = useState({ clean: 0, dirty: 0, inspected: 0, outOfOrder: 0, total: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [newRoom, setNewRoom] = useState({
    number: '',
    floor: 1,
    type: 'Standard',
    status: 'CLEAN'
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
      setLoading(true)
      const roomData = await apiService.getRooms()
      setRooms(roomData.rooms)
      
      // Calculate stats
      const clean = roomData.rooms.filter((r: any) => r.status === 'CLEAN').length
      const dirty = roomData.rooms.filter((r: any) => r.status === 'DIRTY').length
      const inspected = roomData.rooms.filter((r: any) => r.status === 'INSPECTED').length
      const outOfOrder = roomData.rooms.filter((r: any) => r.status === 'OUT_OF_ORDER').length
      setStats({ clean, dirty, inspected, outOfOrder, total: roomData.rooms.length })
      setError('')
    } catch (err) {
      console.error('Error fetching rooms:', err)
      setError('Failed to load rooms. Using mock data.')
      // Use mock data if API fails
      const mockRooms = [
        { id: 1, number: '101', floor: 1, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 2, number: '102', floor: 1, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, number: '103', floor: 1, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, number: '104', floor: 1, type: 'Suite', status: 'OUT_OF_ORDER', updatedAt: new Date(Date.now() - 10800000).toISOString() },
        { id: 5, number: '201', floor: 2, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 6, number: '202', floor: 2, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 7, number: '203', floor: 2, type: 'Deluxe', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 8, number: '204', floor: 2, type: 'Suite', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 9, number: '301', floor: 3, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 10, number: '302', floor: 3, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 11, number: '303', floor: 3, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 12, number: '304', floor: 3, type: 'Suite', status: 'CLEAN', updatedAt: new Date().toISOString() }
      ]
      
      setRooms(mockRooms)
      
      // Calculate stats
      const clean = mockRooms.filter((r: any) => r.status === 'CLEAN').length
      const dirty = mockRooms.filter((r: any) => r.status === 'DIRTY').length
      const inspected = mockRooms.filter((r: any) => r.status === 'INSPECTED').length
      const outOfOrder = mockRooms.filter((r: any) => r.status === 'OUT_OF_ORDER').length
      setStats({ clean, dirty, inspected, outOfOrder, total: mockRooms.length })
    } finally {
      setLoading(false)
    }
  }

  const updateRoomStatus = async (roomId: number, newStatus: string) => {
    try {
      await apiService.updateRoomStatus(roomId, newStatus)
      // Update local state
      setRooms(rooms.map(room => 
        room.id === roomId ? { ...room, status: newStatus, updatedAt: new Date().toISOString() } : room
      ))
      
      // Refresh stats
      const clean = rooms.filter(r => r.status === 'CLEAN' || (r.id === roomId && newStatus === 'CLEAN')).length
      const dirty = rooms.filter(r => r.status === 'DIRTY' || (r.id === roomId && newStatus === 'DIRTY')).length
      const inspected = rooms.filter(r => r.status === 'INSPECTED' || (r.id === roomId && newStatus === 'INSPECTED')).length
      const outOfOrder = rooms.filter(r => r.status === 'OUT_OF_ORDER' || (r.id === roomId && newStatus === 'OUT_OF_ORDER')).length
      setStats({ clean, dirty, inspected, outOfOrder, total: stats.total })
    } catch (error) {
      console.error('Error updating room status:', error)
      alert('Failed to update room status')
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'bg-emerald-100 text-emerald-800'
      case 'DIRTY':
        return 'bg-amber-100 text-amber-800'
      case 'INSPECTED':
        return 'bg-blue-100 text-blue-800'
      case 'OUT_OF_ORDER':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'Clean'
      case 'DIRTY':
        return 'Dirty'
      case 'INSPECTED':
        return 'Inspected'
      case 'OUT_OF_ORDER':
        return 'Out of Order'
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
    const roomToAdd = {
      ...newRoom,
      id: newId,
      updatedAt: new Date().toISOString()
    }
    
    setRooms([...rooms, roomToAdd])
    
    // Update stats
    const clean = newRoom.status === 'CLEAN' ? stats.clean + 1 : stats.clean
    const dirty = newRoom.status === 'DIRTY' ? stats.dirty + 1 : stats.dirty
    const inspected = newRoom.status === 'INSPECTED' ? stats.inspected + 1 : stats.inspected
    const outOfOrder = newRoom.status === 'OUT_OF_ORDER' ? stats.outOfOrder + 1 : stats.outOfOrder
    setStats({ clean, dirty, inspected, outOfOrder, total: stats.total + 1 })
    
    // Reset form and close modal
    setNewRoom({
      number: '',
      floor: 1,
      type: 'Standard',
      status: 'CLEAN'
    })
    setShowAddRoomModal(false)
  }

  // Function to get room status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'DIRTY':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'INSPECTED':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        )
      case 'OUT_OF_ORDER':
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
            <h2 className="text-2xl font-bold text-slate-800">Room Management</h2>
            <p className="text-slate-600">Manage room statuses and housekeeping tasks</p>
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
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Rooms</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.clean}</p>
            <p className="text-sm text-emerald-600">Clean</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.dirty}</p>
            <p className="text-sm text-amber-600">Dirty</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.inspected}</p>
            <p className="text-sm text-blue-600">Inspected</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Room number or type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="CLEAN">Clean</option>
                <option value="DIRTY">Dirty</option>
                <option value="INSPECTED">Inspected</option>
                <option value="OUT_OF_ORDER">Out of Order</option>
              </select>
            </div>
            <div>
              <label htmlFor="floorFilter" className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
              <select
                id="floorFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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

        {/* Room Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Room Visualization</h3>
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
          
          {/* Room Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedRooms.map((room: any) => (
              <div 
                key={room.id} 
                className={`rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-md ${room.status === 'CLEAN' ? 'border-emerald-200 bg-emerald-50' : room.status === 'DIRTY' ? 'border-amber-200 bg-amber-50' : room.status === 'INSPECTED' ? 'border-blue-200 bg-blue-50' : 'border-rose-200 bg-rose-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">Room {room.number}</h4>
                    <p className="text-sm text-slate-600">{room.type}</p>
                  </div>
                  <div className={`p-1 rounded-full ${room.status === 'CLEAN' ? 'bg-emerald-100' : room.status === 'DIRTY' ? 'bg-amber-100' : room.status === 'INSPECTED' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                    {getStatusIcon(room.status)}
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(room.status)}`}>
                    {getStatusText(room.status)}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <select
                    className="text-xs px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={room.status}
                    onChange={(e) => updateRoomStatus(room.id, e.target.value)}
                  >
                    <option value="CLEAN">Clean</option>
                    <option value="DIRTY">Dirty</option>
                    <option value="INSPECTED">Inspected</option>
                    <option value="OUT_OF_ORDER">Out of Order</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedRooms.map((room: any) => (
                  <tr key={room.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{room.number}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{room.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      Floor {room.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {room.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(room.status)}`}>
                        {getStatusText(room.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {room.updatedAt ? new Date(room.updatedAt).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          value={room.status}
                          onChange={(e) => updateRoomStatus(room.id, e.target.value)}
                        >
                          <option value="CLEAN">Clean</option>
                          <option value="DIRTY">Dirty</option>
                          <option value="INSPECTED">Inspected</option>
                          <option value="OUT_OF_ORDER">Out of Order</option>
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter room number"
                    value={newRoom.number}
                    onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({...newRoom, status: e.target.value})}
                  >
                    <option value="CLEAN">Clean</option>
                    <option value="DIRTY">Dirty</option>
                    <option value="INSPECTED">Inspected</option>
                    <option value="OUT_OF_ORDER">Out of Order</option>
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