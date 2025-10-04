'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, premium: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSubModal, setShowSubModal] = useState(false)
  const [selectedSub, setSelectedSub] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchSubscriptions()
    }
  }, [])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Mock data for subscriptions
      const mockSubscriptions = [
        { id: 1, clientName: 'Rajesh Kumar', clientEmail: 'rajesh@example.com', plan: 'Premium', status: 'Active', startDate: '2023-09-25', expiryDate: '2024-09-25', amount: '₹ 25,000', paymentStatus: 'Paid', advisor: 'Dr. Suresh Sharma', renewalReminder: false, notes: 'Premium subscription with all features' },
        { id: 2, clientName: 'Priya Sharma', clientEmail: 'priya@example.com', plan: 'Basic', status: 'Expired', startDate: '2023-01-15', expiryDate: '2023-07-15', amount: '₹ 10,000', paymentStatus: 'Paid', advisor: 'Dr. Amita Verma', renewalReminder: true, notes: 'Renewal notice sent' },
        { id: 3, clientName: 'Amit Patel', clientEmail: 'amit@example.com', plan: 'VIP', status: 'Active', startDate: '2023-09-27', expiryDate: '2024-09-27', amount: '₹ 50,000', paymentStatus: 'Paid', advisor: 'Dr. Rajesh Nair', renewalReminder: false, notes: 'VIP client with dedicated advisor' },
        { id: 4, clientName: 'Sneha Reddy', clientEmail: 'sneha@example.com', plan: 'Premium', status: 'Active', startDate: '2023-09-24', expiryDate: '2024-09-24', amount: '₹ 25,000', paymentStatus: 'Pending', advisor: 'Dr. Vikram Singh', renewalReminder: false, notes: 'Payment pending' },
        { id: 5, clientName: 'Vikram Singh', clientEmail: 'vikram@example.com', plan: 'Basic', status: 'Active', startDate: '2023-09-22', expiryDate: '2024-09-22', amount: '₹ 10,000', paymentStatus: 'Paid', advisor: 'Dr. Pooja Desai', renewalReminder: false, notes: 'Basic plan for stock advisory' },
        { id: 6, clientName: 'Anjali Gupta', clientEmail: 'anjali@example.com', plan: 'Premium', status: 'Expired', startDate: '2023-02-10', expiryDate: '2023-08-10', amount: '₹ 25,000', paymentStatus: 'Paid', advisor: 'Dr. Suresh Sharma', renewalReminder: true, notes: 'Expiring soon, renewal needed' },
      ];
      
      setSubscriptions(mockSubscriptions);
      
      // Calculate stats
      const total = mockSubscriptions.length;
      const active = mockSubscriptions.filter(s => s.status === 'Active').length;
      const expired = mockSubscriptions.filter(s => s.status === 'Expired').length;
      const premium = mockSubscriptions.filter(s => s.plan === 'Premium' || s.plan === 'VIP').length;
      
      setStats({ total, active, expired, premium });
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Expired':
        return 'bg-rose-100 text-rose-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  const getPaymentStatusClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Failed':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter subscriptions based on selected status, plan and search term
  const filteredSubscriptions = subscriptions.filter(sub => {
    const statusMatch = selectedStatus ? sub.status === selectedStatus : true
    const planMatch = selectedPlan ? sub.plan === selectedPlan : true
    const searchMatch = searchTerm 
      ? sub.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sub.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
    : true
    return statusMatch && planMatch && searchMatch
  })

  // Sort subscriptions
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
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

  const openSubDetails = (sub: any) => {
    setSelectedSub(sub)
    setShowSubModal(true)
  }

  const updateSubStatus = (id: number, status: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    ))
    
    // Recalculate stats
    const active = subscriptions.filter(s => s.status === 'Active').length;
    const expired = subscriptions.filter(s => s.status === 'Expired').length;
    const premium = subscriptions.filter(s => s.plan === 'Premium' || s.plan === 'VIP').length;
    
    setStats({ 
      total: subscriptions.length, 
      active, 
      expired, 
      premium 
    })
    
    // Close modal
    setShowSubModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">Subscription Management</h2>
            <p className="text-slate-600">Manage client subscriptions and payment status</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Subscriptions</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.expired}</p>
            <p className="text-sm text-rose-600">Expired</p>
          </div>
          <div className="bg-purple-50 rounded-xl shadow p-4 text-center border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-700">{stats.premium}</p>
            <p className="text-sm text-purple-600">Premium+</p>
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
                placeholder="Client name, email, or plan"
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
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
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
                <option value="clientName">Client Name</option>
                <option value="plan">Plan</option>
                <option value="status">Status</option>
                <option value="startDate">Start Date</option>
                <option value="expiryDate">Expiry Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedPlan('')
                  setSearchTerm('')
                  setSortBy('clientName')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedSubscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{sub.clientName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{sub.clientName}</div>
                          <div className="text-sm text-slate-500">{sub.clientEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanClass(sub.plan)}`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(sub.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(sub.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {sub.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(sub.status)}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusClass(sub.paymentStatus)}`}>
                        {sub.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <button 
                        className="text-teal-600 hover:text-teal-900 font-medium mr-3"
                        onClick={() => openSubDetails(sub)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Subscription Details Modal */}
      {showSubModal && selectedSub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Subscription Details</h3>
              <button 
                onClick={() => setShowSubModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Client Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Name</p>
                      <p className="font-medium">{selectedSub.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{selectedSub.clientEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Assigned Advisor</p>
                      <p className="font-medium">{selectedSub.advisor}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Subscription Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Plan</p>
                      <p className={`font-medium ${getPlanClass(selectedSub.plan)}`}>
                        {selectedSub.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <p className={`font-medium ${getStatusClass(selectedSub.status)}`}>
                        {selectedSub.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Payment Status</p>
                      <p className={`font-medium ${getPaymentStatusClass(selectedSub.paymentStatus)}`}>
                        {selectedSub.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Dates & Pricing</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Start Date</p>
                      <p className="font-medium">{new Date(selectedSub.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Expiry Date</p>
                      <p className="font-medium">{new Date(selectedSub.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Amount</p>
                      <p className="font-medium">{selectedSub.amount}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Additional Info</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Renewal Reminder</p>
                      <p className="font-medium">{selectedSub.renewalReminder ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Notes</p>
                      <p className="font-medium">{selectedSub.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-slate-700 mb-2">Plan Details</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  {selectedSub.plan === 'Basic' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Basic stock advisory</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Monthly market reports</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Basic portfolio tracking</span>
                      </li>
                    </ul>
                  )}
                  {selectedSub.plan === 'Premium' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced stock advisory</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Weekly market reports</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced portfolio tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Priority customer support</span>
                      </li>
                    </ul>
                  )}
                  {selectedSub.plan === 'VIP' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Premium stock advisory</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Daily market reports</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced portfolio tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Dedicated relationship manager</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Exclusive market insights</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedSub.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                disabled={selectedSub.status === 'Active'}
                onClick={() => updateSubStatus(selectedSub.id, 'Active')}
              >
                Activate
              </button>
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedSub.status === 'Expired' 
                    ? 'bg-rose-100 text-rose-800 cursor-not-allowed' 
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
                disabled={selectedSub.status === 'Expired'}
                onClick={() => updateSubStatus(selectedSub.id, 'Expired')}
              >
                Expire
              </button>
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowSubModal(false)}
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