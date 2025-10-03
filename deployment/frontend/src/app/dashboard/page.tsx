'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import apiService from '../../utils/apiService'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    pendingRequests: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    revenueToday: 0,
    occupancyRate: 0,
    staffActive: 0,
    maintenanceRequests: 0,
    avgResponseTime: 0,
    guestSatisfaction: 0
  })
  const [activity, setActivity] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [performance, setPerformance] = useState({
    housekeeping: 92,
    maintenance: 87,
    foodService: 95
  })
  const [timeRange, setTimeRange] = useState('7d') // For charts

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Mock user data for prototype
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
      setIsLoggedIn(true)
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsData = await apiService.getDashboardStats()
      setStats(statsData.stats)
      
      // Fetch recent activity
      const activityData = await apiService.getDashboardActivity()
      setActivity(activityData.activity)
      
      // Fetch rooms for preview
      const roomsData = await apiService.getDashboardRooms()
      setRooms(roomsData.rooms)
      
      // Fetch requests for preview
      const requestsData = await apiService.getDashboardRequests()
      setRequests(requestsData.requests)
      
      // Fetch performance data
      const performanceData = await apiService.getDashboardPerformance()
      setPerformance(performanceData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to mock data if API fails
      setStats({
        pendingRequests: 12,
        occupiedRooms: 65,
        availableRooms: 35,
        revenueToday: 12500,
        occupancyRate: 65,
        staffActive: 24,
        maintenanceRequests: 8,
        avgResponseTime: 32,
        guestSatisfaction: 94
      })
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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityColor = (type: string, status: string) => {
    if (type === 'request') {
      if (status === 'COMPLETED') return 'border-l-4 border-emerald-500'
      return 'border-l-4 border-blue-500'
    } else if (type === 'room') {
      return 'border-l-4 border-amber-500'
    } else {
      return 'border-l-4 border-indigo-500'
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

  // Function to generate chart data for occupancy
  const generateOccupancyData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        occupancy: Math.floor(Math.random() * 30) + 60 // Random between 60-90%
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

  const occupancyData = generateOccupancyData()
  const revenueData = generateRevenueData()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Hotel Operations Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Admin User', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            fetchDashboardData()
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input"
                placeholder="Enter your email"
                defaultValue="admin@hotelops.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Good morning, {user?.name}</h1>
              <p className="text-slate-600">Here's what's happening with your hotel today.</p>
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
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pendingRequests}</p>
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

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Occupancy Rate</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.occupancyRate}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card">
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
              <span className="text-xs text-emerald-500">↑ 12% from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-indigo-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Staff</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.staffActive}</p>
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
          {/* Occupancy Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Occupancy Trend</h2>
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
            <div className="h-64 flex items-end space-x-2 mt-8">
              {occupancyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">{data.occupancy}%</div>
                  <div 
                    className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg hover:from-teal-600 hover:to-teal-500 transition-all duration-300"
                    style={{ height: `${data.occupancy * 0.8}%` }}
                  ></div>
                  <div className="text-xs text-slate-500 mt-1">{data.date}</div>
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
            <div className="h-64 flex items-end space-x-2 mt-8">
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">₹{(data.revenue / 1000).toFixed(1)}k</div>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300"
                    style={{ height: `${(data.revenue / 15000) * 80}%` }}
                  ></div>
                  <div className="text-xs text-slate-500 mt-1">{data.date}</div>
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
              <Link href="/requests" className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-4 px-4 rounded-xl text-center hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-sm font-medium">View Requests</span>
              </Link>
              <Link href="/rooms" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-4 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">Manage Rooms</span>
              </Link>
              <Link href="/analytics" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-4 px-4 rounded-xl text-center hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">View Analytics</span>
              </Link>
              <Link href="/departments" className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-4 px-4 rounded-xl text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Departments</span>
              </Link>
            </div>

            {/* Department Performance */}
            <h3 className="text-lg font-medium text-slate-800 mt-6 mb-4">Department Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Housekeeping</span>
                  <span className="text-sm font-medium text-slate-700">{performance.housekeeping}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${performance.housekeeping}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Maintenance</span>
                  <span className="text-sm font-medium text-slate-700">{performance.maintenance}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${performance.maintenance}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Food & Beverage</span>
                  <span className="text-sm font-medium text-slate-700">{performance.foodService}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${performance.foodService}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View All</button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {activity.map((item: any) => (
                <div key={item.id} className={`${getActivityColor(item.type, item.status)} pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{item.title}</h3>
                    <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Recent Requests */}
            <h3 className="text-lg font-medium text-slate-800 mt-6 mb-4">Recent Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {requests.map((request: any) => (
                    <tr key={request.id} className="hover:bg-slate-50 transition-all duration-300 animate-fade-in">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-800">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{request.guestName.charAt(0)}</span>
                          </div>
                          <div className="ml-2">{request.guestName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{request.roomNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{request.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{request.department}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
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
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-rose-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Maintenance Requests</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.maintenanceRequests}</p>
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

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 card">
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

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Guest Satisfaction</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.guestSatisfaction}%</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 2% from last week</span>
            </div>
          </div>
        </div>

        {/* Room Status Overview */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Room Status Overview</h2>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View All Rooms</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4 text-center hover:bg-emerald-100 transition duration-300 cursor-pointer animate-pulse-slow">
              <p className="text-2xl font-bold text-emerald-700">{stats.availableRooms}</p>
              <p className="text-sm text-emerald-600">Clean Rooms</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center hover:bg-amber-100 transition duration-300 cursor-pointer animate-pulse-slow">
              <p className="text-2xl font-bold text-amber-700">{stats.occupiedRooms}</p>
              <p className="text-sm text-amber-600">Dirty Rooms</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition duration-300 cursor-pointer animate-pulse-slow">
              <p className="text-2xl font-bold text-blue-700">8</p>
              <p className="text-sm text-blue-600">Inspected</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 text-center hover:bg-rose-100 transition duration-300 cursor-pointer animate-pulse-slow">
              <p className="text-2xl font-bold text-rose-700">2</p>
              <p className="text-sm text-rose-600">Out of Order</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}