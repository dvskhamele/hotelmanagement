'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import OfflineIndicator from '../../components/OfflineIndicator'
import apiService from '../../utils/apiService'
import MobileDashboard from './page-mobile'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    pendingKycRequests: 0,
    activeClients: 0,
    premiumSubscribers: 0,
    revenueToday: 0,
    subscriptionRate: 0,
    advisorsActive: 0,
    pendingSignals: 0,
    avgResponseTime: 0,
    clientSatisfaction: 0
  })
  const [activity, setActivity] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [performance, setPerformance] = useState({
    researchQuality: 92,
    signalAccuracy: 87,
    clientService: 95
  })
  const [timeRange, setTimeRange] = useState('7d') // For charts
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    // For prototype, always allow access and mock login
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    setIsLoggedIn(true)
    fetchDashboardData()
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsData = await apiService.getDashboardStats()
      setStats(statsData.stats as any)
      
      // Fetch recent activity
      const activityData = await apiService.getDashboardActivity()
      setActivity(activityData.activity)
      
      // Fetch clients for preview
      const clientsData = await (apiService as any).getDashboardClients()
      setClients(clientsData.clients)
      
      // Fetch requests for preview
      const requestsData = await apiService.getDashboardRequests()
      setRequests(requestsData.requests)
      
      // Fetch performance data
      const performanceData = await apiService.getDashboardPerformance()
      setPerformance(performanceData as any)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'bg-emerald-100 text-emerald-800'
      case 'DIRTY':
        return 'bg-amber-100 text-amber-800'
      case 'INSPECTED':
        return 'bg-blue-100 text-blue-800'
      case 'OUT_OF_ORDER':
        return 'bg-rose-100 text-rose-800'
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'VERIFIED':
        return 'bg-emerald-100 text-emerald-800'
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800'
      case 'EXPIRED':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityColor = (type: string, status: string) => {
    if (type === 'request') {
      if (status === 'COMPLETED') return 'border-l-4 border-emerald-500'
      return 'border-l-4 border-blue-500'
    } else if (type === 'client') {
      return 'border-l-4 border-amber-500'
    } else if (type === 'signal') {
      return 'border-l-4 border-indigo-500'
    } else {
      return 'border-l-4 border-emerald-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'VERIFIED':
        return 'bg-emerald-100 text-emerald-800'
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800'
      case 'EXPIRED':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDepartmentClass = (department: string) => {
    switch (department) {
      case 'RESEARCH':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLIANCE':
        return 'bg-amber-100 text-amber-800'
      case 'SUPPORT':
        return 'bg-emerald-100 text-emerald-800'
      case 'ADVISORY':
        return 'bg-rose-100 text-rose-800'
      case 'CLIENT_SUCCESS':
        return 'bg-indigo-100 text-indigo-800'
      case 'ADMINISTRATION':
        return 'bg-purple-100 text-purple-800'
      case 'TECHNICAL':
        return 'bg-cyan-100 text-cyan-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Function to generate chart data for client acquisition
  const generateClientAcquisitionData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        acquisition: Math.floor(Math.random() * 15) + 5 // Random between 5-20
      })
    }
    return data
  }

  // Function to generate chart data for revenue
  const generateRevenueData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: Math.floor(Math.random() * 5000) + 8000 // Random between 8000-13000
      })
    }
    return data
  }

  const clientAcquisitionData = generateClientAcquisitionData()
  const revenueData = generateRevenueData()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                      <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">AdvisorX Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Admin User', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            fetchDashboardData()
            // Redirect to dashboard after login
            router.push('/dashboard')
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your email"
                defaultValue="admin@advisorx.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your password"
                defaultValue="password123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Render mobile dashboard for small screens
  if (isMobile) {
    return <MobileDashboard />
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
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Good morning, {user?.name}</h1>
                <p className="text-slate-600">Here's what's happening with AdvisorX CRM today.</p>
                <div className="mt-3 text-xs text-slate-500 bg-blue-50 p-3 rounded border border-blue-200">
                  <div className="font-semibold text-blue-800">SEBI Compliance Overview:</div>
                  <div className="mt-1">This dashboard provides a quick overview of your SEBI-compliant operations. All activities are automatically logged to meet SEBI's audit requirements.</div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 transition focus-ring"
                  onClick={fetchDashboardData}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v7a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/requests')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending KYC Requests</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pendingKycRequests}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">+2 from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/clients')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.activeClients}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/revenue')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Revenue Today</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">₹{stats.revenueToday?.toLocaleString() || '0'}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ ₹1,200 from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/advisors')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Advisors</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.advisorsActive}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">4 on break</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Client Acquisition Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Client Acquisition</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {clientAcquisitionData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-teal-600 transition-colors">
                    {data.acquisition}
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300 group-hover:from-teal-500 group-hover:to-teal-700"
                    style={{ height: `${(data.acquisition / 25) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Revenue Trend</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-emerald-600 transition-colors">
                    ₹{(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t transition-all duration-300 group-hover:from-emerald-500 group-hover:to-emerald-700"
                    style={{ height: `${(data.revenue / 15000) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-4 px-4 rounded-xl text-center hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/requests')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-sm font-medium">View Requests</span>
              </div>
              <div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-4 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/clients')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Manage Clients</span>
              </div>
              <div 
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-4 px-4 rounded-xl text-center hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/analytics')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">View Analytics</span>
              </div>
              <div 
                className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-4 px-4 rounded-xl text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/advisors')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Advisors</span>
              </div>
              
              {/* New Quick Action Buttons */}
              <div 
                className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-4 px-4 rounded-xl text-center hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to create a new KYC request
                  alert('Creating new KYC request...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">New Request</span>
              </div>
              <div 
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white py-4 px-4 rounded-xl text-center hover:from-indigo-600 hover:to-indigo-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to assign advisor
                  alert('Assigning advisor...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium">Assign Advisor</span>
              </div>
              <div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-4 px-4 rounded-xl text-center hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to send signals
                  alert('Sending signals...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Send Signals</span>
              </div>
              <div 
                className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white py-4 px-4 rounded-xl text-center hover:from-cyan-600 hover:to-cyan-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to send notification
                  alert('Sending notification...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-medium">Notify Clients</span>
              </div>
            </div>

            {/* Performance Visualization */}
            <h3 className="text-lg font-medium text-slate-800 mt-6 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {/* Research Quality */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Research Quality</span>
                  <span className="text-sm font-medium text-slate-700">{performance.researchQuality}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 hover:bg-emerald-600"
                    style={{ width: `${performance.researchQuality}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Research Team</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              {/* Signal Accuracy */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Signal Accuracy</span>
                  <span className="text-sm font-medium text-slate-700">{performance.signalAccuracy}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 hover:bg-amber-600"
                    style={{ width: `${performance.signalAccuracy}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Trading Performance</span>
                  <span>Good</span>
                </div>
              </div>
              
              {/* Client Satisfaction */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Client Satisfaction</span>
                  <span className="text-sm font-medium text-slate-700">{performance.clientService}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 hover:bg-blue-600"
                    style={{ width: `${performance.clientService}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Client Success</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium cursor-pointer" onClick={() => router.push('/reports')}>
                View All
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {activity.map((item: any) => (
                <div 
                  key={item.id} 
                  className={`${getActivityColor(item.type, item.status)} pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in cursor-pointer`}
                  onClick={() => {
                    switch(item.type) {
                    case 'kycRequest':
                    case 'clientRequest':
                    case 'request':
                      router.push('/requests');
                      break;
                    case 'client':
                      router.push('/clients');
                      break;
                    case 'staff':
                    case 'employee':
                      router.push('/staff');
                      break;
                    case 'advisor':
                      router.push('/advisors');
                      break;
                    case 'signal':
                      router.push('/signals');
                      break;
                    case 'subscription':
                      router.push('/subscriptions');
                      break;
                    case 'payment':
                      router.push('/payments');
                      break;
                    default:
                      router.push('/reports');
                  }
                  }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{item.title}</h3>
                    <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Recent Client Requests */}
            <h3 
              className="text-lg font-medium text-slate-800 mt-6 mb-4 cursor-pointer hover:text-teal-600 transition-colors" 
              onClick={() => router.push('/requests')}
            >
              Recent KYC Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {requests.slice(0, 5).map((request: any) => (
                    <tr 
                      key={request.id} 
                      className="hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                      onClick={() => router.push(`/requests/${request.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{request.clientName?.charAt(0) || request.guestName.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{request.clientName || request.guestName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {request.documentType || 'KYC'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {request.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentClass(request.department)}`}>
                          {request.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityClass(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-rose-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/requests')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending KYC Requests</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pendingKycRequests}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-rose-500">3 urgent</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/analytics')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Response Time</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.avgResponseTime} min</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↓ 5 min from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/reports')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Client Satisfaction</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.clientSatisfaction}%</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10h-2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 2% from last week</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}