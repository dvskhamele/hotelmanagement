'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import OfflineIndicator from '../../components/OfflineIndicator'
import apiService from '../../utils/apiService'

export default function TelecallerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [prospects, setProspects] = useState([])
  const [stats, setStats] = useState({
    kycPending: 0,
    agreementPending: 0,
    paymentPending: 0,
    activeClients: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDispositionModal, setShowDispositionModal] = useState(false)
  const [selectedCall, setSelectedCall] = useState(null)
  const [selectedDisposition, setSelectedDisposition] = useState('')
  const [mobile, setMobile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/')
        return
      }

      // Mock user for prototype
      const mockUser = JSON.parse(localStorage.getItem('currentUser') || 
        JSON.stringify({ id: 2, email: 'onboarding@advisorx.com', role: 'ONBOARDING_AGENT', name: 'Onboarding Agent' }))
      
      setUser(mockUser)
      setIsLoggedIn(true)

      // Fetch data
      await fetchProspects()
      await fetchStats()
      
      setLoading(false)
    }

    // Check if mobile
    const checkMobile = () => {
      setMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    checkAuth()

    return () => window.removeEventListener('resize', checkMobile)
  }, [router])

  const fetchProspects = async () => {
    try {
      // For prototype, we'll use mock data
      const mockProspects = [
        {
          id: 1,
          prospectId: 'CLI123456789',
          fullName: 'Rahul Sharma',
          mobileNumber: '+91 9876543210',
          email: 'rahul@example.com',
          status: 'PROSPECT',
          notes: 'Interested in intraday calls',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          prospectId: 'CLI987654321',
          fullName: 'Priya Patel',
          mobileNumber: '+91 9123456789',
          email: 'priya@example.com',
          status: 'KYC_PENDING',
          notes: 'Called yesterday, will call again today',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          prospectId: 'CLI456789123',
          fullName: 'Amit Kumar',
          mobileNumber: '+91 8765432109',
          email: 'amit@example.com',
          status: 'AGREEMENT_PENDING',
          notes: 'KYC done, waiting for agreement',
          createdAt: new Date().toISOString()
        }
      ]
      setProspects(mockProspects)
    } catch (err) {
      setError('Failed to fetch prospects')
      console.error('Error fetching prospects:', err)
    }
  }

  const fetchStats = async () => {
    try {
      // For prototype, we'll use mock stats
      const mockStats = {
        kycPending: 8,
        agreementPending: 5,
        paymentPending: 3,
        activeClients: 24
      }
      setStats(mockStats)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const handleCallClick = async (prospect) => {
    try {
      // Simulate initiating a call
      const response = await apiService.initiateCall(prospect.id)
      
      // In a real implementation, this would connect to a telephony service
      alert(`Calling ${prospect.fullName} at ${prospect.mobileNumber}...`)
      
      // For prototype, we'll just show the disposition modal
      setSelectedCall({ prospectId: prospect.id })
    } catch (err) {
      console.error('Error initiating call:', err)
      alert('Error initiating call. Please try again.')
    }
  }

  const handleDispositionSubmit = async () => {
    if (!selectedDisposition) {
      alert('Please select a disposition')
      return
    }

    try {
      // For prototype, update the prospect status based on disposition
      const updatedProspects = prospects.map(prospect => {
        if (prospect.id === selectedCall.prospectId) {
          let newStatus = prospect.status
          if (selectedDisposition === 'INTERESTED') {
            newStatus = 'KYC_PENDING'
          } else if (selectedDisposition === 'NOT_INTERESTED') {
            newStatus = 'INACTIVE'
          } else if (selectedDisposition === 'FOLLOW_UP') {
            newStatus = 'PROSPECT'
          }
          return { ...prospect, status: newStatus }
        }
        return prospect
      })
      
      setProspects(updatedProspects)
      setShowDispositionModal(false)
      setSelectedDisposition('')
      setSelectedCall(null)
      
      // Refresh stats
      await fetchStats()
      
    } catch (err) {
      console.error('Error updating call disposition:', err)
      alert('Error updating call disposition')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PROSPECT': return 'bg-blue-100 text-blue-800'
      case 'KYC_PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'AGREEMENT_PENDING': return 'bg-orange-100 text-orange-800'
      case 'PAYMENT_PENDING': return 'bg-red-100 text-red-800'
      case 'ACTIVE_CLIENT': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">AdvisorX Login</h1>
          <p className="text-center text-slate-600">Please log in to continue</p>
          <div className="mt-6">
            <button 
              onClick={() => router.push('/')}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <OfflineIndicator />
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Telecaller Dashboard</h1>
              <p className="text-slate-600">Manage prospects and conduct onboarding calls</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Widgets - Section 1.2: Client Status Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Widget 1: KYC Pending (Yellow) */}
          <div 
            className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1"
            onClick={() => router.push('/clients?status=KYC_PENDING')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">KYC Pending</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.kycPending}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Prospects waiting for KYC</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
              <div className="text-xs">SEBI mandates that we must verify every client's identity and address before offering any services.</div>
              <div className="text-xs mt-1">This process is called KYC (Know Your Client) and is mandatory before any advisory services can be provided.</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-90"></div>
            </div>
          </div>

          {/* Widget 2: Agreement Pending (Orange) */}
          <div 
            className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-orange-500 card cursor-pointer transform hover:-translate-y-1"
            onClick={() => router.push('/clients?status=AGREEMENT_PENDING')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Agreement Pending</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.agreementPending}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Clients awaiting agreement</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
              <div className="text-xs">SEBI mandates that we must have a legally signed agreement with a client before charging any fees.</div>
              <div className="text-xs mt-1">This agreement includes the Most Important Terms and Conditions (MITC) which explains our services, fees, and that we do not offer guaranteed returns.</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-90"></div>
            </div>
          </div>

          {/* Widget 3: Payment Pending (Red) */}
          <div 
            className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-red-500 card cursor-pointer transform hover:-translate-y-1"
            onClick={() => router.push('/clients?status=PAYMENT_PENDING')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Payment Pending</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.paymentPending}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Pending subscription payments</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
              <div className="text-xs">SEBI rules state that fees must only be collected via banking channels (no cash) and must not exceed prescribed limits.</div>
              <div className="text-xs mt-1">Our system enforces this by using only approved payment gateways and pre-configured, compliant subscription plans.</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-90"></div>
            </div>
          </div>

          {/* Widget 4: Active Clients (Green) */}
          <div 
            className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-green-500 card cursor-pointer transform hover:-translate-y-1"
            onClick={() => router.push('/clients?status=ACTIVE_CLIENT')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.activeClients}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Currently subscribed clients</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
              <div className="text-xs">These clients have completed all mandatory compliance steps:</div>
              <div className="text-xs mt-1">✓ KYC verified, ✓ Agreement signed, ✓ Payment confirmed</div>
              <div className="text-xs mt-1">They are now compliant to receive advisory services.</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-90"></div>
            </div>
          </div>
        </div>

        {/* Section 1.1: Prospect & Calling Panel */}
        <div className="bg-white rounded-2xl shadow-md p-6 card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Today's Call List</h2>
            <button 
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              onClick={fetchProspects}
            >
              Refresh
            </button>
          </div>

          {/* Prospect List */}
          <div className="space-y-4">
            {prospects.map((prospect) => (
              <div key={prospect.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="bg-gradient-to-br from-teal-400 to-teal-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {prospect.fullName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{prospect.fullName}</h3>
                        <p className="text-sm text-slate-600">{prospect.mobileNumber}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(prospect.status)}`}>
                          {prospect.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    {prospect.notes && (
                      <p className="text-sm text-slate-600 mt-2">{prospect.notes}</p>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    {/* Call Button */}
                    <div className="relative group">
                      <button
                        onClick={() => handleCallClick(prospect)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Call
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
                        <div className="text-xs">Heads Up: All Calls Are Recorded for Your Protection!</div>
                        <div className="text-xs mt-1">To follow SEBI rules, this system automatically records all calls with clients and prospects. This is a mandatory step to keep a clear record of our conversations.</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-90"></div>
                      </div>
                    </div>
                    
                    {/* Start Onboarding Button - appears when prospect is interested */}
                    {prospect.status === 'KYC_PENDING' && (
                      <button
                        onClick={() => router.push(`/onboarding/${prospect.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Start Onboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {prospects.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>No prospects to call today</p>
              </div>
            )}
          </div>
        </div>

        {/* Call Disposition Modal */}
        {showDispositionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Call Disposition</h3>
              
              <div className="space-y-3 mb-6">
                {['INTERESTED', 'NOT_INTERESTED', 'FOLLOW_UP', 'WRONG_NUMBER'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="disposition"
                      value={option}
                      checked={selectedDisposition === option}
                      onChange={(e) => setSelectedDisposition(e.target.value)}
                      className="h-4 w-4 text-teal-600"
                    />
                    <span className="capitalize text-slate-700">{option.toLowerCase().replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDispositionModal(false)}
                  className="flex-1 bg-slate-200 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDispositionSubmit}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {mobile && <MobileNavigation />}
      
      {/* SEBI Compliance Info Banner for Mobile */}
      {mobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white text-xs p-2 z-50 md:hidden">
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            SEBI Compliant: All calls recorded • KYC verified • Agreements signed
          </div>
        </div>
      )}
    </div>
  )
}