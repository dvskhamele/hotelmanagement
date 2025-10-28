'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, premium: 0, verified: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic',
    status: 'Active',
    kycStatus: 'Pending',
    investmentGoal: 'Growth',
    riskProfile: 'Moderate',
    advisor: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchClients()
    }
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true);
      
      // Mock data for client/CRM system
      const mockClients = [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+91 9876543210', plan: 'Premium', status: 'Active', kycStatus: 'Verified', investmentGoal: 'Wealth Creation', riskProfile: 'Aggressive', advisor: 'Dr. Alice Johnson', portfolioValue: '₹ 2,50,000', joinDate: '2023-09-25', expiryDate: '2024-09-25' },
        { id: 2, name: 'Mary Johnson', email: 'mary.j@example.com', phone: '+91 9876543211', plan: 'Basic', status: 'Inactive', kycStatus: 'Rejected', investmentGoal: 'Capital Preservation', riskProfile: 'Conservative', advisor: 'Dr. David Wilson', portfolioValue: '₹ 1,50,000', joinDate: '2023-09-20', expiryDate: '2023-12-20' },
        { id: 3, name: 'Robert Williams', email: 'robert.w@example.com', phone: '+91 9876543212', plan: 'VIP', status: 'Active', kycStatus: 'Verified', investmentGoal: 'Income Generation', riskProfile: 'Moderate', advisor: 'Dr. Eva Brown', portfolioValue: '₹ 5,00,000', joinDate: '2023-09-27', expiryDate: '2024-09-27' },
        { id: 4, name: 'Patricia Davis', email: 'patricia.d@example.com', phone: '+91 9876543213', plan: 'Premium', status: 'Active', kycStatus: 'Pending', investmentGoal: 'Tax Saving', riskProfile: 'Conservative', advisor: 'Dr. Grace Lee', portfolioValue: '₹ 1,80,000', joinDate: '2023-09-24', expiryDate: '2024-09-24' },
        { id: 5, name: 'James Wilson', email: 'james.w@example.com', phone: '+91 9876543214', plan: 'Basic', status: 'Active', kycStatus: 'Verified', investmentGoal: 'Long-term Growth', riskProfile: 'Aggressive', advisor: 'Dr. Henry Taylor', portfolioValue: '₹ 3,20,000', joinDate: '2023-09-22', expiryDate: '2024-09-22' },
        { id: 6, name: 'Sarah Miller', email: 'sarah.m@example.com', phone: '+91 9876543215', plan: 'Premium', status: 'Active', kycStatus: 'Verified', investmentGoal: 'Retirement Planning', riskProfile: 'Moderate', advisor: 'Dr. Alice Johnson', portfolioValue: '₹ 4,50,000', joinDate: '2023-09-26', expiryDate: '2024-09-26' },
        { id: 7, name: 'Michael Brown', email: 'michael.b@example.com', phone: '+91 9876543216', plan: 'VIP', status: 'Active', kycStatus: 'Verified', investmentGoal: 'Short-term Trading', riskProfile: 'Aggressive', advisor: 'Dr. Jack Roberts', portfolioValue: '₹ 8,00,000', joinDate: '2023-09-28', expiryDate: '2024-09-28' },
        { id: 8, name: 'Jennifer Wilson', email: 'jennifer.w@example.com', phone: '+91 9876543217', plan: 'Basic', status: 'Inactive', kycStatus: 'Pending', investmentGoal: 'Diversification', riskProfile: 'Moderate', advisor: 'Dr. Frank Miller', portfolioValue: '₹ 1,20,000', joinDate: '2023-09-23', expiryDate: '2023-12-23' }
      ];
      
      setClients(mockClients);
      
      // Calculate stats
      const total = mockClients.length;
      const active = mockClients.filter(c => c.status === 'Active').length;
      const inactive = mockClients.filter(c => c.status === 'Inactive').length;
      const premium = mockClients.filter(c => c.plan === 'Premium' || c.plan === 'VIP').length;
      const verified = mockClients.filter(c => c.kycStatus === 'Verified').length;
      
      setStats({ total, active, inactive, premium, verified });
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Inactive':
        return 'bg-rose-100 text-rose-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Suspended':
        return 'bg-red-100 text-red-800'
      case 'Verified':
        return 'bg-emerald-100 text-emerald-800'
      case 'Rejected':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Active':
        return 'Active'
      case 'Inactive':
        return 'Inactive'
      case 'Pending':
        return 'Pending'
      case 'Suspended':
        return 'Suspended'
      case 'Verified':
        return 'Verified'
      case 'Rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  const getPlanClass = (plan: string) => {
    switch (plan) {
      case 'Basic':
        return 'bg-blue-100 text-blue-800'
      case 'Premium':
        return 'bg-indigo-100 text-indigo-800'
      case 'VIP':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter clients based on selected status, plan, and search term
  const filteredClients = clients.filter(client => {
    const statusMatch = selectedStatus ? client.status === selectedStatus : true
    const planMatch = selectedPlan ? client.plan === selectedPlan : true
    const searchMatch = searchTerm 
      ? client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    : true
    return statusMatch && planMatch && searchMatch
  })

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
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

  const handleAddClient = () => {
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1
    const clientToAdd = {
      ...newClient,
      id: newId,
      joinDate: new Date().toISOString().split('T')[0],
      portfolioValue: '₹ 0'
    }
    
    setClients([...clients, clientToAdd])
    
    // Update stats
    const total = clients.length + 1;
    const active = newClient.status === 'Active' ? stats.active + 1 : stats.active;
    const inactive = newClient.status === 'Inactive' ? stats.inactive + 1 : stats.inactive;
    const premium = (newClient.plan === 'Premium' || newClient.plan === 'VIP') ? stats.premium + 1 : stats.premium;
    const verified = newClient.kycStatus === 'Verified' ? stats.verified + 1 : stats.verified;
    
    setStats({ total, active, inactive, premium, verified })
    
    // Reset form and close modal
    setNewClient({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      status: 'Active',
      kycStatus: 'Pending',
      investmentGoal: 'Growth',
      riskProfile: 'Moderate',
      advisor: ''
    })
    setShowAddClientModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">Client Management System</h2>
            <p className="text-slate-600">Manage client records, subscriptions, and portfolio tracking</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddClientModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Client
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Clients</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.premium}</p>
            <p className="text-sm text-blue-600">Premium+</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.verified}</p>
            <p className="text-sm text-amber-600">KYC Verified</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.inactive}</p>
            <p className="text-sm text-rose-600">Inactive</p>
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
                placeholder="Name, email, or phone"
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
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label htmlFor="planFilter" className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
              <select
                id="planFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
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
                <option value="name">Name</option>
                <option value="portfolioValue">Portfolio Value</option>
                <option value="plan">Plan</option>
                <option value="status">Status</option>
                <option value="joinDate">Join Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedPlan('')
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

        {/* Client Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Client Overview</h3>
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
            {sortedClients.map((client) => (
              <div 
                key={client.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">{client.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800">{client.name}</h4>
                      <p className="text-sm text-slate-600">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPlanClass(client.plan)}`}>
                      {client.plan}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full mt-1 ${getStatusClass(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Portfolio Value</p>
                    <p className="text-sm font-medium text-slate-800">{client.portfolioValue}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Risk Profile</p>
                    <p className="text-sm font-medium text-slate-800">{client.riskProfile}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">KYC Status</p>
                    <p className="text-sm font-medium text-slate-800">{client.kycStatus}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Advisor</p>
                    <p className="text-sm font-medium text-slate-800">{client.advisor}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Investment Goal</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mt-1">{client.investmentGoal}</p>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">KYC Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Portfolio Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Advisor</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{client.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{client.name}</div>
                          <div className="text-sm text-slate-500">{client.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanClass(client.plan)}`}>
                        {client.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(client.status)}`}>
                        {getStatusText(client.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(client.kycStatus)}`}>
                        {getStatusText(client.kycStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {client.portfolioValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(client.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {client.advisor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Client</h3>
              <button 
                onClick={() => setShowAddClientModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter client name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter phone number"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newClient.plan}
                      onChange={(e) => setNewClient({...newClient, plan: e.target.value})}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newClient.status}
                      onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">KYC Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newClient.kycStatus}
                    onChange={(e) => setNewClient({...newClient, kycStatus: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Investment Goal</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newClient.investmentGoal}
                      onChange={(e) => setNewClient({...newClient, investmentGoal: e.target.value})}
                    >
                      <option value="Growth">Growth</option>
                      <option value="Income">Income</option>
                      <option value="Capital Preservation">Capital Preservation</option>
                      <option value="Tax Saving">Tax Saving</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Risk Profile</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newClient.riskProfile}
                      onChange={(e) => setNewClient({...newClient, riskProfile: e.target.value})}
                    >
                      <option value="Conservative">Conservative</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Aggressive">Aggressive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Advisor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter advisor name"
                    value={newClient.advisor}
                    onChange={(e) => setNewClient({...newClient, advisor: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddClientModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddClient}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}