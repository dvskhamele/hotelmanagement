'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function ESignPanel() {
  const [esignRequests, setEsignRequests] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, pending: 0, signed: 0, expired: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showEsignModal, setShowEsignModal] = useState(false)
  const [selectedEsign, setSelectedEsign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchEsignRequests()
    }
  }, [])

  const fetchEsignRequests = async () => {
    try {
      setLoading(true);
      
      // Mock data for e-sign requests
      const mockEsignRequests = [
        { id: 1, clientName: 'Rajesh Kumar', clientEmail: 'rajesh@example.com', documentTitle: 'Advisory Agreement', status: 'Signed', createdDate: '2023-09-25', expiryDate: '2023-10-25', signedDate: '2023-09-26', documentType: 'Advisory Agreement', clientPhone: '+91 9876543210', notes: 'Agreement signed successfully' },
        { id: 2, clientName: 'Priya Sharma', clientEmail: 'priya@example.com', clientPhone: '+91 9876543211', documentTitle: 'Risk Disclosure', status: 'Pending', createdDate: '2023-09-20', expiryDate: '2023-10-20', signedDate: null, documentType: 'Risk Disclosure', notes: 'Awaiting client signature' },
        { id: 3, clientName: 'Amit Patel', clientEmail: 'amit@example.com', clientPhone: '+91 9876543212', documentTitle: 'Power of Attorney', status: 'Expired', createdDate: '2023-08-15', expiryDate: '2023-09-15', signedDate: null, documentType: 'Power of Attorney', notes: 'Request expired, needs renewal' },
        { id: 4, clientName: 'Sneha Reddy', clientEmail: 'sneha@example.com', clientPhone: '+91 9876543213', documentTitle: 'Investment Advisory Terms', status: 'Signed', createdDate: '2023-09-24', expiryDate: '2023-10-24', signedDate: '2023-09-25', documentType: 'Advisory Terms', notes: 'Signed with amendments' },
        { id: 5, clientName: 'Vikram Singh', clientEmail: 'vikram@example.com', clientPhone: '+91 9876543214', documentTitle: 'Fee Agreement', status: 'Pending', createdDate: '2023-09-22', expiryDate: '2023-10-22', signedDate: null, documentType: 'Fee Agreement', notes: 'Sent for signature' },
      ];
      
      setEsignRequests(mockEsignRequests);
      
      // Calculate stats
      const total = mockEsignRequests.length;
      const pending = mockEsignRequests.filter(e => e.status === 'Pending').length;
      const signed = mockEsignRequests.filter(e => e.status === 'Signed').length;
      const expired = mockEsignRequests.filter(e => e.status === 'Expired').length;
      
      setStats({ total, pending, signed, expired });
    } catch (err) {
      console.error('Error fetching e-sign requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Signed':
        return 'bg-emerald-100 text-emerald-800'
      case 'Expired':
        return 'bg-rose-100 text-rose-800'
      case 'Rejected':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter e-sign requests based on selected status and search term
  const filteredEsignRequests = esignRequests.filter(request => {
    const statusMatch = selectedStatus ? request.status === selectedStatus : true
    const searchMatch = searchTerm 
      ? request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        request.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.documentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    : true
    return statusMatch && searchMatch
  })

  // Sort e-sign requests
  const sortedEsignRequests = [...filteredEsignRequests].sort((a, b) => {
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

  const openEsignDetails = (esign: any) => {
    setSelectedEsign(esign)
    setShowEsignModal(true)
  }

  const updateEsignStatus = (id: number, status: string) => {
    setEsignRequests(esignRequests.map(esign => 
      esign.id === id ? { ...esign, status } : esign
    ))
    
    // Recalculate stats
    const pending = esignRequests.filter(e => e.status === 'Pending').length;
    const signed = esignRequests.filter(e => e.status === 'Signed').length;
    const expired = esignRequests.filter(e => e.status === 'Expired').length;
    
    setStats({ 
      total: esignRequests.length, 
      pending, 
      signed, 
      expired 
    })
    
    // Close modal
    setShowEsignModal(false)
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
            <h2 className="text-2xl font-bold text-slate-800">E-Sign Management Panel</h2>
            <p className="text-slate-600">Manage client e-sign requests and compliance documents</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Requests</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
            <p className="text-sm text-amber-600">Pending</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.signed}</p>
            <p className="text-sm text-emerald-600">Signed</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.expired}</p>
            <p className="text-sm text-rose-600">Expired</p>
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
                placeholder="Client name, email, or document"
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
                <option value="Pending">Pending</option>
                <option value="Signed">Signed</option>
                <option value="Expired">Expired</option>
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
                <option value="clientName">Client Name</option>
                <option value="documentTitle">Document Title</option>
                <option value="status">Status</option>
                <option value="createdDate">Created Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
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

        {/* E-Sign Requests Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedEsignRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{request.clientName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{request.clientName}</div>
                          <div className="text-sm text-slate-500">{request.clientEmail}</div>
                          <div className="text-sm text-slate-500">{request.clientPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.documentTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {request.documentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(request.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(request.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <button 
                        className="text-teal-600 hover:text-teal-900 font-medium mr-3"
                        onClick={() => openEsignDetails(request)}
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

      {/* E-Sign Details Modal */}
      {showEsignModal && selectedEsign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">E-Sign Request Details</h3>
              <button 
                onClick={() => setShowEsignModal(false)}
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
                      <p className="font-medium">{selectedEsign.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{selectedEsign.clientEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium">{selectedEsign.clientPhone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Document Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Document Title</p>
                      <p className="font-medium">{selectedEsign.documentTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Document Type</p>
                      <p className="font-medium">{selectedEsign.documentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <p className={`font-medium ${getStatusClass(selectedEsign.status)}`}>
                        {selectedEsign.status}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Dates</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Created Date</p>
                      <p className="font-medium">{new Date(selectedEsign.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Expiry Date</p>
                      <p className="font-medium">{new Date(selectedEsign.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Signed Date</p>
                      <p className="font-medium">
                        {selectedEsign.signedDate ? new Date(selectedEsign.signedDate).toLocaleDateString() : 'Not signed yet'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Notes</h4>
                  <div>
                    <p className="font-medium">{selectedEsign.notes}</p>
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
                  <p className="text-xs text-slate-400 mt-1">Document ID: {selectedEsign.id}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedEsign.status === 'Signed' 
                    ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                disabled={selectedEsign.status === 'Signed'}
                onClick={() => updateEsignStatus(selectedEsign.id, 'Signed')}
              >
                Approve/Sign
              </button>
              <button 
                className={`px-4 py-2 font-medium rounded-lg ${
                  selectedEsign.status === 'Expired' 
                    ? 'bg-rose-100 text-rose-800 cursor-not-allowed' 
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
                disabled={selectedEsign.status === 'Expired'}
                onClick={() => updateEsignStatus(selectedEsign.id, 'Expired')}
              >
                Expire Request
              </button>
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowEsignModal(false)}
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