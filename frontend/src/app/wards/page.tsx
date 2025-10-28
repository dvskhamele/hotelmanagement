'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Wards() {
  const [wards, setWards] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0, avgOccupancy: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddWardModal, setShowAddWardModal] = useState(false)
  const [newWard, setNewWard] = useState({
    name: '',
    type: 'General',
    totalBeds: 0,
    occupiedBeds: 0,
    floor: 1,
    capacity: 0,
    headDoctor: '',
    contactNumber: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchWards()
    }
  }, [])

  const fetchWards = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital ward management
      const mockWards = [
        { id: 1, name: 'General Ward A', type: 'General', totalBeds: 20, occupiedBeds: 15, floor: 2, capacity: 20, headDoctor: 'Dr. Alice Johnson', contactNumber: '+1234567890', lastUpdated: new Date().toISOString() },
        { id: 2, name: 'General Ward B', type: 'General', totalBeds: 20, occupiedBeds: 8, floor: 2, capacity: 20, headDoctor: 'Dr. Michael Chen', contactNumber: '+1234567891', lastUpdated: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, name: 'ICU Unit 1', type: 'ICU', totalBeds: 10, occupiedBeds: 8, floor: 3, capacity: 10, headDoctor: 'Dr. Eva Brown', contactNumber: '+1234567892', lastUpdated: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, name: 'Surgery Ward', type: 'Surgery', totalBeds: 15, occupiedBeds: 12, floor: 4, capacity: 15, headDoctor: 'Dr. David Wilson', contactNumber: '+1234567893', lastUpdated: new Date(Date.now() - 10800000).toISOString() },
        { id: 5, name: 'Cardiology Ward', type: 'Cardiology', totalBeds: 18, occupiedBeds: 15, floor: 3, capacity: 18, headDoctor: 'Dr. Frank Miller', contactNumber: '+1234567894', lastUpdated: new Date().toISOString() },
        { id: 6, name: 'Pediatrics Ward', type: 'Pediatrics', totalBeds: 12, occupiedBeds: 7, floor: 2, capacity: 12, headDoctor: 'Dr. Grace Lee', contactNumber: '+1234567895', lastUpdated: new Date(Date.now() - 3600000).toISOString() },
        { id: 7, name: 'Orthopedics Ward', type: 'Orthopedics', totalBeds: 16, occupiedBeds: 14, floor: 4, capacity: 16, headDoctor: 'Dr. Henry Taylor', contactNumber: '+1234567896', lastUpdated: new Date().toISOString() },
        { id: 8, name: 'Emergency Ward', type: 'Emergency', totalBeds: 25, occupiedBeds: 20, floor: 1, capacity: 25, headDoctor: 'Dr. Jack Roberts', contactNumber: '+1234567897', lastUpdated: new Date(Date.now() - 7200000).toISOString() },
        { id: 9, name: 'Maternity Ward', type: 'Maternity', totalBeds: 14, occupiedBeds: 10, floor: 2, capacity: 14, headDoctor: 'Dr. Kate Williams', contactNumber: '+1234567898', lastUpdated: new Date().toISOString() },
        { id: 10, name: 'VIP Ward', type: 'VIP', totalBeds: 8, occupiedBeds: 6, floor: 5, capacity: 8, headDoctor: 'Dr. Alice Johnson', contactNumber: '+1234567899', lastUpdated: new Date(Date.now() - 3600000).toISOString() }
      ];
      
      setWards(mockWards);
      
      // Calculate stats
      const total = mockWards.length;
      const totalBeds = mockWards.reduce((sum, ward) => sum + ward.totalBeds, 0);
      const occupiedBeds = mockWards.reduce((sum, ward) => sum + ward.occupiedBeds, 0);
      const avgOccupancy = Math.round((occupiedBeds / totalBeds) * 100);
      
      setStats({ total, occupied: occupiedBeds, available: totalBeds - occupiedBeds, avgOccupancy });
    } catch (err) {
      console.error('Error fetching wards:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateWardStatus = async (wardId: number, newOccupancy: number) => {
    try {
      // Update local state
      setWards(wards.map((ward: any) => 
        ward.id === wardId ? { ...ward, occupiedBeds: newOccupancy, lastUpdated: new Date().toISOString() } : ward
      ));
      
      // Update stats
      const updatedWards = wards.map((ward: any) => 
        ward.id === wardId ? { ...ward, occupiedBeds: newOccupancy } : ward
      );
      
      const totalBeds = updatedWards.reduce((sum, ward) => sum + ward.totalBeds, 0);
      const occupiedBeds = updatedWards.reduce((sum, ward) => sum + ward.occupiedBeds, 0);
      const avgOccupancy = Math.round((occupiedBeds / totalBeds) * 100);
      
      setStats({ 
        total: updatedWards.length, 
        occupied: occupiedBeds, 
        available: totalBeds - occupiedBeds, 
        avgOccupancy 
      });
    } catch (error) {
      console.error('Error updating ward status:', error);
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'ICU':
        return 'bg-red-100 text-red-800'
      case 'Surgery':
        return 'bg-purple-100 text-purple-800'
      case 'Cardiology':
        return 'bg-pink-100 text-pink-800'
      case 'Emergency':
        return 'bg-orange-100 text-orange-800'
      case 'Pediatrics':
        return 'bg-blue-100 text-blue-800'
      case 'VIP':
        return 'bg-yellow-100 text-yellow-800'
      case 'General':
        return 'bg-teal-100 text-teal-800'
      case 'Maternity':
        return 'bg-emerald-100 text-emerald-800'
      case 'Orthopedics':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter wards based on selected type and search term
  const filteredWards = wards.filter(ward => {
    const typeMatch = selectedType ? ward.type === selectedType : true
    const searchMatch = searchTerm 
      ? ward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ward.headDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ward.contactNumber.includes(searchTerm)
      : true
    return typeMatch && searchMatch
  })

  // Sort wards
  const sortedWards = [...filteredWards].sort((a, b) => {
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

  const handleAddWard = () => {
    const newId = wards.length > 0 ? Math.max(...wards.map(w => w.id)) + 1 : 1
    const wardToAdd = {
      ...newWard,
      id: newId,
      lastUpdated: new Date().toISOString(),
      occupiedBeds: 0,
    }
    
    setWards([...wards, wardToAdd])
    
    // Update stats
    const total = wards.length + 1;
    const totalBeds = wards.reduce((sum, ward) => sum + ward.totalBeds, 0) + newWard.totalBeds;
    const occupiedBeds = wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0);
    const avgOccupancy = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
    
    setStats({ total, occupied: occupiedBeds, available: totalBeds - occupiedBeds, avgOccupancy })
    
    // Reset form and close modal
    setNewWard({
      name: '',
      type: 'General',
      totalBeds: 0,
      occupiedBeds: 0,
      floor: 1,
      capacity: 0,
      headDoctor: '',
      contactNumber: ''
    })
    setShowAddWardModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">Ward Management System</h2>
            <p className="text-slate-600">Manage hospital wards and bed allocation</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddWardModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Ward
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Wards</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.occupied}</p>
            <p className="text-sm text-blue-600">Occupied Beds</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.available}</p>
            <p className="text-sm text-emerald-600">Available Beds</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.avgOccupancy}%</p>
            <p className="text-sm text-amber-600">Avg. Occupancy</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Ward name, doctor, or contact"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-slate-700 mb-1">Ward Type</label>
              <select
                id="typeFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Maternity">Maternity</option>
                <option value="VIP">VIP</option>
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
                <option value="name">Ward Name</option>
                <option value="type">Ward Type</option>
                <option value="floor">Floor</option>
                <option value="occupiedBeds">Occupied Beds</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedType('')
                  setSearchTerm('')
                  setSortBy('name')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Ward Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Ward Overview</h3>
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
            {sortedWards.map((ward) => (
              <div 
                key={ward.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{ward.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeClass(ward.type)}`}>
                      {ward.type}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">Floor {ward.floor}</span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Total Beds</p>
                    <p className="text-sm font-medium text-slate-800">{ward.totalBeds}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Occupied</p>
                    <p className="text-sm font-medium text-slate-800">{ward.occupiedBeds}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Available</p>
                    <p className="text-sm font-medium text-slate-800">{ward.totalBeds - ward.occupiedBeds}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Occupancy</p>
                    <p className="text-sm font-medium text-slate-800">
                      {Math.round((ward.occupiedBeds / ward.totalBeds) * 100)}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Head Doctor</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mt-1">{ward.headDoctor}</p>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => {
                      // Show ward details modal
                      alert(`Ward details for ${ward.name}`);
                    }}
                  >
                    View Details
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      className="text-slate-600 hover:text-teal-600"
                      onClick={() => {
                        // Show edit ward modal
                        alert(`Edit ward: ${ward.name}`);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Bed Occupancy Visualization */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Beds Occupancy</span>
                    <span>{ward.occupiedBeds}/{ward.totalBeds}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        (ward.occupiedBeds / ward.totalBeds) > 0.8 ? 'bg-red-500' : 
                        (ward.occupiedBeds / ward.totalBeds) > 0.5 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(ward.occupiedBeds / ward.totalBeds) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ward Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Beds</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Occupancy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Head Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedWards.map((ward) => (
                  <tr key={ward.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{ward.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeClass(ward.type)}`}>
                        {ward.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      Floor {ward.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {ward.occupiedBeds}/{ward.totalBeds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (ward.occupiedBeds / ward.totalBeds) > 0.8 ? 'bg-red-500' : 
                              (ward.occupiedBeds / ward.totalBeds) > 0.5 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${(ward.occupiedBeds / ward.totalBeds) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {Math.round((ward.occupiedBeds / ward.totalBeds) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {ward.headDoctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {ward.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(ward.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ward Occupancy Summary */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Ward Occupancy Summary</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Highest Occupancy</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">Emergency Ward</p>
              <p className="text-sm text-blue-600">80% occupancy</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Lowest Occupancy</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">VIP Ward</p>
              <p className="text-sm text-emerald-600">75% occupancy</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Avg. Occupancy</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">{stats.avgOccupancy}%</p>
              <p className="text-sm text-amber-600">Across all wards</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Ward Modal */}
      {showAddWardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Ward</h3>
              <button 
                onClick={() => setShowAddWardModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ward Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter ward name"
                    value={newWard.name}
                    onChange={(e) => setNewWard({...newWard, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ward Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newWard.type}
                    onChange={(e) => setNewWard({...newWard, type: e.target.value})}
                  >
                    <option value="General">General</option>
                    <option value="ICU">ICU</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Maternity">Maternity</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newWard.floor}
                    onChange={(e) => setNewWard({...newWard, floor: parseInt(e.target.value)})}
                  >
                    <option value={1}>Floor 1</option>
                    <option value={2}>Floor 2</option>
                    <option value={3}>Floor 3</option>
                    <option value={4}>Floor 4</option>
                    <option value={5}>Floor 5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Beds</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter total number of beds"
                    value={newWard.totalBeds}
                    onChange={(e) => setNewWard({...newWard, totalBeds: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Head Doctor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter head doctor name"
                    value={newWard.headDoctor}
                    onChange={(e) => setNewWard({...newWard, headDoctor: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter contact number"
                    value={newWard.contactNumber}
                    onChange={(e) => setNewWard({...newWard, contactNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddWardModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddWard}
              >
                Add Ward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}