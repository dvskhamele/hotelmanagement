'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function KycPanel() {
  const [kycRequests, setKycRequests] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, validated: 0, registered: 0, pending: 0, onHold: 0, rejected: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showKycModal, setShowKycModal] = useState(false)
  const [selectedKyc, setSelectedKyc] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchKycRequests()
    }
  }, [])

  const fetchKycRequests = async () => {
    try {
      setLoading(true);
      
      // Mock data for KYC requests with SEBI-compliant statuses
      const mockKycRequests = [
        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 9876543210', status: 'Validated', documentType: 'PAN Card', documentNumber: 'ABCDE1234F', submittedDate: '2023-09-25', expiryDate: '2024-09-25', verificationDate: '2023-09-26', notes: 'Validated through CVL KRA', kycSources: ['CVL'], kycVerificationDate: '2023-09-26' },
        { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 9876543211', status: 'Registered', documentType: 'Aadhaar', documentNumber: '123456789012', submittedDate: '2023-09-20', expiryDate: '2024-09-20', verificationDate: '2023-09-21', notes: 'Registered with NSDL KRA', kycSources: ['NSDL'], kycVerificationDate: '2023-09-21' },
        { id: 3, name: 'Amit Patel', email: 'amit@example.com', phone: '+91 9876543212', status: 'On-Hold', documentType: 'PAN Card', documentNumber: 'LMNOP9876Q', submittedDate: '2023-09-27', expiryDate: '2024-09-27', verificationDate: null, notes: 'Flagged for additional verification', kycSources: ['CAMS'], kycVerificationDate: null },
        { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 9876543213', status: 'Validated', documentType: 'PAN Card', documentNumber: 'FGHIJ5678K', submittedDate: '2023-09-24', expiryDate: '2024-09-24', verificationDate: '2023-09-25', notes: 'Validated through multiple KRAs', kycSources: ['CVL', 'NSDL'], kycVerificationDate: '2023-09-25' },
        { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 9876543214', status: 'Rejected', documentType: 'PAN Card', documentNumber: 'QRSTU3456V', submittedDate: '2023-09-22', expiryDate: '2024-09-22', verificationDate: null, notes: 'Rejected by all KRAs', kycSources: [], kycVerificationDate: null },
        { id: 6, name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 9876543215', status: 'Pending', documentType: 'Aadhaar', documentNumber: '123456789013', submittedDate: '2023-09-28', expiryDate: '2024-09-28', verificationDate: null, notes: 'Awaiting KRA verification', kycSources: [], kycVerificationDate: null }
      ];
      
      setKycRequests(mockKycRequests);
      
      // Calculate stats with SEBI-compliant statuses
      const total = mockKycRequests.length;
      const validated = mockKycRequests.filter(k => k.status === 'Validated').length;
      const registered = mockKycRequests.filter(k => k.status === 'Registered').length;
      const pending = mockKycRequests.filter(k => k.status === 'Pending').length;
      const onHold = mockKycRequests.filter(k => k.status === 'On-Hold').length;
      const rejected = mockKycRequests.filter(k => k.status === 'Rejected').length;
      
      setStats({ total, validated, registered, pending, onHold, rejected });
    } catch (err) {
      console.error('Error fetching KYC requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Validated':
        return 'bg-emerald-100 text-emerald-800'
      case 'Registered':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'On-Hold':
        return 'bg-amber-100 text-amber-800'
      case 'Rejected':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter KYC requests based on selected status and search term
  const filteredKycRequests = kycRequests.filter(request => {
    const statusMatch = selectedStatus ? request.status === selectedStatus : true
    const searchMatch = searchTerm 
      ? request.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.documentNumber.includes(searchTerm)
    : true
    return statusMatch && searchMatch
  })

  // Sort KYC requests
  const sortedKycRequests = [...filteredKycRequests].sort((a, b) => {
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

  const openKycDetails = (kyc: any) => {
    setSelectedKyc(kyc)
    setShowKycModal(true)
  }

  const updateKycStatus = (id: number, status: string) => {
    setKycRequests(kycRequests.map(kyc => 
      kyc.id === id ? { ...kyc, status } : kyc
    ))
    
    // Recalculate stats with SEBI-compliant statuses
    const validated = kycRequests.filter(k => k.status === 'Validated').length;
    const registered = kycRequests.filter(k => k.status === 'Registered').length;
    const pending = kycRequests.filter(k => k.status === 'Pending').length;
    const onHold = kycRequests.filter(k => k.status === 'On-Hold').length;
    const rejected = kycRequests.filter(k => k.status === 'Rejected').length;
    
    setStats({ 
      total: kycRequests.length, 
      validated, 
      registered, 
      pending, 
      onHold, 
      rejected 
    })
    
    // Close modal
    setShowKycModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">KYC Verification Panel</h2>
            <p className="text-slate-600">Manage client KYC verification requests and compliance</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Requests</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.validated}</p>
            <p className="text-sm text-emerald-600">Validated</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.registered}</p>
            <p className="text-sm text-blue-600">Registered</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
            <p className="text-sm text-amber-600">Pending</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.onHold}</p>
            <p className="text-sm text-amber-600">On Hold</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.rejected}</p>
            <p className="text-sm text-rose-600">Rejected</p>
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
                placeholder="Name, email, or document"
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
                <option value="Validated">Validated</option>
                <option value="Registered">Registered</option>
                <option value="Pending">Pending</option>
                <option value="On-Hold">On Hold</option>
                <option value="Rejected">Rejected</option>
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
                <option value="documentType">Document Type</option>
                <option value="status">Status</option>
                <option value="submittedDate">Submitted Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
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

        {/* KYC Requests Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">KRA Sources</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedKycRequests.map((request) => (
                  <tr key={request.id} className={`hover:bg-slate-50 transition-all duration-300 ${request.status === 'On-Hold' ? 'bg-amber-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{request.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{request.name}</div>
                          <div className="text-sm text-slate-500">{request.email}</div>
                          <div className="text-sm text-slate-500">{request.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.documentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.documentNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.kycSources && request.kycSources.length > 0 ? request.kycSources.join(', ') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(request.submittedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <button 
                        className="text-teal-600 hover:text-teal-900 font-medium mr-3"
                        onClick={() => openKycDetails(request)}
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

      {/* KYC Details Modal */}
      {showKycModal && selectedKyc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">KYC Request Details</h3>
              <button 
                onClick={() => setShowKycModal(false)}
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
                      <p className="font-medium">{selectedKyc.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{selectedKyc.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium">{selectedKyc.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Document Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Document Type</p>
                      <p className="font-medium">{selectedKyc.documentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Document Number</p>
                      <p className="font-medium">{selectedKyc.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <p className={`font-medium ${getStatusClass(selectedKyc.status)}`}>
                        {selectedKyc.status}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">KRA Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">KRA Sources</p>
                      <p className="font-medium">
                        {selectedKyc.kycSources && selectedKyc.kycSources.length > 0 
                          ? selectedKyc.kycSources.join(', ') 
                          : 'Not verified through KRA'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">KRA Verification Date</p>
                      <p className="font-medium">
                        {selectedKyc.kycVerificationDate 
                          ? new Date(selectedKyc.kycVerificationDate).toLocaleDateString() 
                          : 'Pending KRA verification'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Dates</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Submitted Date</p>
                      <p className="font-medium">{new Date(selectedKyc.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Expiry Date</p>
                      <p className="font-medium">{new Date(selectedKyc.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Internal Verification Date</p>
                      <p className="font-medium">
                        {selectedKyc.verificationDate ? new Date(selectedKyc.verificationDate).toLocaleDateString() : 'Not verified yet'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-medium text-slate-700 mb-2">Notes</h4>
                  <div>
                    <p className="font-medium">{selectedKyc.notes}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-slate-700 mb-2">Document Preview</h4>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-slate-500">Document will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">Document ID: {selectedKyc.documentNumber}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedKyc.status === 'Validated' || selectedKyc.status === 'Registered'
                    ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                disabled={selectedKyc.status === 'Validated' || selectedKyc.status === 'Registered'}
                onClick={() => updateKycStatus(selectedKyc.id, 'Validated')}
              >
                Validate
              </button>
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedKyc.status === 'Rejected' 
                    ? 'bg-rose-100 text-rose-800 cursor-not-allowed' 
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
                disabled={selectedKyc.status === 'Rejected'}
                onClick={() => updateKycStatus(selectedKyc.id, 'Rejected')}
              >
                Reject
              </button>
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedKyc.status === 'On-Hold' 
                    ? 'bg-amber-100 text-amber-800 cursor-not-allowed' 
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
                disabled={selectedKyc.status === 'On-Hold'}
                onClick={() => updateKycStatus(selectedKyc.id, 'On-Hold')}
              >
                Hold
              </button>
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowKycModal(false)}
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