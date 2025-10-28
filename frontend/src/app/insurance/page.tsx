'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Insurance() {
  const [policies, setPolicies] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [sortBy, setSortBy] = useState('patientName')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, claims: 0, pending: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)
  const [newPolicy, setNewPolicy] = useState({
    patientName: '',
    patientId: '',
    policyNumber: '',
    provider: 'National Health Insurance',
    planType: 'Basic',
    coverageAmount: 0,
    deductible: 0,
    copay: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
    status: 'Active',
    premium: 0,
    billingCycle: 'Monthly'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchPolicies()
    }
  }, [])

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital insurance management
      const mockPolicies = [
        { id: 1, patientName: 'John Smith', patientId: 'P001', policyNumber: 'NHIC123456', provider: 'National Health Insurance', planType: 'Comprehensive', coverageAmount: 500000, deductible: 1000, copay: 20, startDate: '2023-01-01', endDate: '2023-12-31', status: 'Active', premium: 250, billingCycle: 'Monthly', claimsFiled: 3, claimsPaid: 2, outstandingBalance: 0 },
        { id: 2, patientName: 'Mary Johnson', patientId: 'P002', policyNumber: 'ABC789012', provider: 'ABC Healthcare Insurance', planType: 'Basic', coverageAmount: 100000, deductible: 2500, copay: 30, startDate: '2023-03-15', endDate: '2024-03-14', status: 'Active', premium: 150, billingCycle: 'Monthly', claimsFiled: 1, claimsPaid: 1, outstandingBalance: 0 },
        { id: 3, patientName: 'Robert Williams', patientId: 'P003', policyNumber: 'XYZ345678', provider: 'XYZ Medical Coverage', planType: 'Premium', coverageAmount: 1000000, deductible: 500, copay: 10, startDate: '2022-11-01', endDate: '2023-10-31', status: 'Expired', premium: 400, billingCycle: 'Monthly', claimsFiled: 5, claimsPaid: 4, outstandingBalance: 1200 },
        { id: 4, patientName: 'Patricia Davis', patientId: 'P004', policyNumber: 'DEF567890', provider: 'DEF Family Health', planType: 'Family', coverageAmount: 750000, deductible: 1500, copay: 25, startDate: '2023-06-01', endDate: '2024-05-31', status: 'Active', premium: 300, billingCycle: 'Monthly', claimsFiled: 2, claimsPaid: 1, outstandingBalance: 850 },
        { id: 5, patientName: 'James Wilson', patientId: 'P005', policyNumber: 'GHI234567', provider: 'GHI Senior Care', planType: 'Senior', coverageAmount: 300000, deductible: 2000, copay: 15, startDate: '2023-02-01', endDate: '2024-01-31', status: 'Active', premium: 200, billingCycle: 'Monthly', claimsFiled: 4, claimsPaid: 3, outstandingBalance: 0 },
        { id: 6, patientName: 'Sarah Miller', patientId: 'P006', policyNumber: 'JKL890123', provider: 'JKL Wellness Plus', planType: 'Wellness', coverageAmount: 250000, deductible: 1800, copay: 20, startDate: '2023-04-01', endDate: '2024-03-31', status: 'Active', premium: 180, billingCycle: 'Monthly', claimsFiled: 1, claimsPaid: 1, outstandingBalance: 0 },
        { id: 7, patientName: 'Michael Brown', patientId: 'P007', policyNumber: 'MNO456789', provider: 'MNO Critical Care', planType: 'Critical', coverageAmount: 2000000, deductible: 0, copay: 0, startDate: '2023-01-15', endDate: '2024-01-14', status: 'Active', premium: 600, billingCycle: 'Monthly', claimsFiled: 2, claimsPaid: 2, outstandingBalance: 0 },
        { id: 8, patientName: 'Jennifer Wilson', patientId: 'P008', policyNumber: 'PQR123456', provider: 'PQR Maternity Care', planType: 'Maternity', coverageAmount: 150000, deductible: 1200, copay: 15, startDate: '2023-05-01', endDate: '2024-04-30', status: 'Active', premium: 120, billingCycle: 'Monthly', claimsFiled: 3, claimsPaid: 2, outstandingBalance: 0 },
        { id: 9, patientName: 'David Taylor', patientId: 'P009', policyNumber: 'STU789012', provider: 'STU Dental Plus', planType: 'Dental', coverageAmount: 50000, deductible: 100, copay: 10, startDate: '2023-03-01', endDate: '2024-02-29', status: 'Active', premium: 80, billingCycle: 'Monthly', claimsFiled: 2, claimsPaid: 2, outstandingBalance: 0 },
        { id: 10, patientName: 'Lisa Anderson', patientId: 'P010', policyNumber: 'VWX345678', provider: 'VWX Vision Care', planType: 'Vision', coverageAmount: 25000, deductible: 50, copay: 5, startDate: '2023-07-01', endDate: '2024-06-30', status: 'Active', premium: 50, billingCycle: 'Monthly', claimsFiled: 1, claimsPaid: 1, outstandingBalance: 0 }
      ];
      
      setPolicies(mockPolicies);
      
      // Calculate stats
      const total = mockPolicies.length;
      const active = mockPolicies.filter(p => p.status === 'Active').length;
      const expired = mockPolicies.filter(p => p.status === 'Expired').length;
      const claims = mockPolicies.reduce((sum, p) => sum + p.claimsFiled, 0);
      const pending = mockPolicies.reduce((sum, p) => sum + p.claimsFiled - p.claimsPaid, 0);
      
      setStats({ total, active, expired, claims, pending });
    } catch (err) {
      console.error('Error fetching policies:', err);
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

  // Filter policies based on selected status, provider, and search term
  const filteredPolicies = policies.filter(policy => {
    const statusMatch = selectedStatus ? policy.status === selectedStatus : true
    const providerMatch = selectedProvider ? policy.provider === selectedProvider : true
    const searchMatch = searchTerm 
      ? policy.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.patientId.includes(searchTerm)
      : true
    return statusMatch && providerMatch && searchMatch
  })

  // Sort policies
  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique providers for filter
  const providers = Array.from(new Set(policies.map(p => p.provider)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddPolicy = () => {
    const newId = policies.length > 0 ? Math.max(...policies.map(p => p.id)) + 1 : 1
    const policyToAdd = {
      ...newPolicy,
      id: newId,
      claimsFiled: 0,
      claimsPaid: 0,
      outstandingBalance: 0
    }
    
    setPolicies([...policies, policyToAdd])
    
    // Update stats
    const total = policies.length + 1;
    const active = newPolicy.status === 'Active' ? stats.active + 1 : stats.active;
    const expired = newPolicy.status === 'Expired' ? stats.expired + 1 : stats.expired;
    const claims = stats.claims;
    const pending = stats.pending;
    
    setStats({ total, active, expired, claims, pending })
    
    // Reset form and close modal
    setNewPolicy({
      patientName: '',
      patientId: '',
      policyNumber: '',
      provider: 'National Health Insurance',
      planType: 'Basic',
      coverageAmount: 0,
      deductible: 0,
      copay: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      status: 'Active',
      premium: 0,
      billingCycle: 'Monthly'
    })
    setShowAddPolicyModal(false)
  }

  const openClaimModal = (policy: any) => {
    setSelectedPolicy(policy)
    setShowClaimModal(true)
  }

  // Function to calculate days until expiration
  const getDaysUntilExpiration = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
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
            <h2 className="text-2xl font-bold text-slate-800">Insurance Management System</h2>
            <p className="text-slate-600">Manage patient insurance policies, claims, and coverage verification</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddPolicyModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Policy
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Policies</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.expired}</p>
            <p className="text-sm text-rose-600">Expired</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.claims}</p>
            <p className="text-sm text-blue-600">Claims Filed</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
            <p className="text-sm text-amber-600">Pending Claims</p>
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
                placeholder="Patient, policy, or ID"
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
              <label htmlFor="providerFilter" className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
              <select
                id="providerFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="">All Providers</option>
                {providers.map((provider: string) => (
                  <option key={provider} value={provider}>{provider}</option>
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
                <option value="patientName">Patient Name</option>
                <option value="policyNumber">Policy Number</option>
                <option value="provider">Provider</option>
                <option value="planType">Plan Type</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedProvider('')
                  setSearchTerm('')
                  setSortBy('patientName')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Policy Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Insurance Policies</h3>
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
            {sortedPolicies.map((policy) => (
              <div 
                key={policy.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{policy.patientName}</h4>
                    <p className="text-sm text-slate-600">ID: {policy.patientId}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Policy</p>
                    <p className="text-sm font-medium text-slate-800">{policy.policyNumber}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Provider</p>
                    <p className="text-sm font-medium text-slate-800 truncate">{policy.provider}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Plan</p>
                    <p className="text-sm font-medium text-slate-800">{policy.planType}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Coverage</p>
                    <p className="text-sm font-medium text-slate-800">₹{policy.coverageAmount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Period</span>
                  </div>
                  <div className="text-sm font-medium text-slate-800 mt-1">
                    {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
                  </div>
                  {policy.status === 'Active' && (
                    <div className="text-xs text-slate-500 mt-1">
                      Expires in {getDaysUntilExpiration(policy.endDate)} days
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Financials</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Premium</p>
                      <p className="text-sm font-medium text-slate-800">₹{policy.premium}</p>
                      <p className="text-xs text-slate-500">{policy.billingCycle}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Deductible</p>
                      <p className="text-sm font-medium text-slate-800">₹{policy.deductible}</p>
                      <p className="text-xs text-slate-500">Copay ₹{policy.copay}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Claims</p>
                      <p className="text-sm font-medium text-slate-800">{policy.claimsPaid}/{policy.claimsFiled}</p>
                      <p className="text-xs text-slate-500">Paid</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openClaimModal(policy)}
                  >
                    File Claim
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="text-slate-600 hover:text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 3a1 1 0 012 0v1H7V3zm4 10a1 1 0 11-2 0 1 1 0 012 0zm-3-7a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Policy Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Coverage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Financials</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Claims</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{policy.patientName}</div>
                        <div className="text-sm text-slate-500">ID: {policy.patientId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Policy: {policy.policyNumber}</div>
                        <div>Provider: {policy.provider}</div>
                        <div>Plan: {policy.planType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{policy.coverageAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>{new Date(policy.startDate).toLocaleDateString()}</div>
                        <div>{new Date(policy.endDate).toLocaleDateString()}</div>
                        {policy.status === 'Active' && (
                          <div className="text-xs text-slate-500 mt-1">
                            Expires in {getDaysUntilExpiration(policy.endDate)} days
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Premium: ₹{policy.premium}/{policy.billingCycle.substring(0, 1)}</div>
                        <div>Deductible: ₹{policy.deductible}</div>
                        <div>Copay: ₹{policy.copay}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        <div>Filed: {policy.claimsFiled}</div>
                        <div>Paid: {policy.claimsPaid}</div>
                        <div>Balance: ₹{policy.outstandingBalance}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={policy.status}
                          onChange={(e) => {
                            // Update status in mock data
                            const updatedPolicies = policies.map(p => 
                              p.id === policy.id ? { ...p, status: e.target.value } : p
                            );
                            setPolicies(updatedPolicies);
                            
                            // Update stats
                            const active = updatedPolicies.filter(p => p.status === 'Active').length;
                            const expired = updatedPolicies.filter(p => p.status === 'Expired').length;
                            setStats({ ...stats, active, expired });
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Expired">Expired</option>
                          <option value="Pending">Pending</option>
                        </select>
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openClaimModal(policy)}
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

        {/* Insurance Analytics */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Insurance Analytics</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Top Provider</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">National Health Insurance</p>
              <p className="text-sm text-blue-600">42% of policies</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Avg. Coverage</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">₹485,000</p>
              <p className="text-sm text-emerald-600">Per policy</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Claim Success</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">92%</p>
              <p className="text-sm text-amber-600">Payment rate</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Policy Modal */}
      {showAddPolicyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Insurance Policy</h3>
              <button 
                onClick={() => setShowAddPolicyModal(false)}
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
                      value={newPolicy.patientName}
                      onChange={(e) => setNewPolicy({...newPolicy, patientName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter patient ID"
                      value={newPolicy.patientId}
                      onChange={(e) => setNewPolicy({...newPolicy, patientId: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter policy number"
                    value={newPolicy.policyNumber}
                    onChange={(e) => setNewPolicy({...newPolicy, policyNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newPolicy.provider}
                      onChange={(e) => setNewPolicy({...newPolicy, provider: e.target.value})}
                    >
                      <option value="National Health Insurance">National Health Insurance</option>
                      <option value="ABC Healthcare Insurance">ABC Healthcare Insurance</option>
                      <option value="XYZ Medical Coverage">XYZ Medical Coverage</option>
                      <option value="DEF Family Health">DEF Family Health</option>
                      <option value="GHI Senior Care">GHI Senior Care</option>
                      <option value="JKL Wellness Plus">JKL Wellness Plus</option>
                      <option value="MNO Critical Care">MNO Critical Care</option>
                      <option value="PQR Maternity Care">PQR Maternity Care</option>
                      <option value="STU Dental Plus">STU Dental Plus</option>
                      <option value="VWX Vision Care">VWX Vision Care</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Plan Type</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newPolicy.planType}
                      onChange={(e) => setNewPolicy({...newPolicy, planType: e.target.value})}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Premium">Premium</option>
                      <option value="Family">Family</option>
                      <option value="Senior">Senior</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Critical">Critical</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Dental">Dental</option>
                      <option value="Vision">Vision</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Coverage Amount (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter coverage amount"
                      value={newPolicy.coverageAmount}
                      onChange={(e) => setNewPolicy({...newPolicy, coverageAmount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Deductible (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter deductible"
                      value={newPolicy.deductible}
                      onChange={(e) => setNewPolicy({...newPolicy, deductible: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Copay (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter copay"
                      value={newPolicy.copay}
                      onChange={(e) => setNewPolicy({...newPolicy, copay: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Premium (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter premium"
                      value={newPolicy.premium}
                      onChange={(e) => setNewPolicy({...newPolicy, premium: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newPolicy.startDate}
                      onChange={(e) => setNewPolicy({...newPolicy, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newPolicy.endDate}
                      onChange={(e) => setNewPolicy({...newPolicy, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Billing Cycle</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newPolicy.billingCycle}
                    onChange={(e) => setNewPolicy({...newPolicy, billingCycle: e.target.value})}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newPolicy.status}
                    onChange={(e) => setNewPolicy({...newPolicy, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddPolicyModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddPolicy}
              >
                Add Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Claim Modal */}
      {showClaimModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">File Insurance Claim</h3>
              <button 
                onClick={() => setShowClaimModal(false)}
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
                  <h4 className="font-bold text-slate-800">{selectedPolicy.patientName}</h4>
                  <p className="text-sm text-slate-600">{selectedPolicy.policyNumber} - {selectedPolicy.provider}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Claim Amount (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter claim amount"
                      defaultValue={selectedPolicy.coverageAmount > 0 ? Math.min(50000, selectedPolicy.coverageAmount) : 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Deductible Applied</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={`₹${selectedPolicy.deductible}`}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Copay Required</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={`₹${selectedPolicy.copay}`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Describe the medical service"
                    rows={3}
                    defaultValue="General medical consultation and examination"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Service</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Reimbursement</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={`₹${selectedPolicy.coverageAmount > 0 ? Math.min(50000, selectedPolicy.coverageAmount) - selectedPolicy.deductible - selectedPolicy.copay : 0}`}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowClaimModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => setShowClaimModal(false)}
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}