'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import MobileLoading from '../../components/MobileLoading'
import OfflineIndicator from '../../components/OfflineIndicator'
import apiService from '../../utils/mobileApiService'
import '../../styles/mobile-dashboard.css'
import '../mobile-layout'

export default function MobileDashboard() {
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
  const [editingStat, setEditingStat] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  const router = useRouter()

  useEffect(() => {
    // For prototype, always allow access and mock login
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    setIsLoggedIn(true)
    fetchDashboardData()
  }, [router])

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

  const getStatusClass = (status: string) => {
    switch (status) {
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
      case 'HOUSEKEEPING':
        return 'bg-blue-100 text-blue-800'
      case 'MAINTENANCE':
        return 'bg-amber-100 text-amber-800'
      case 'CONCIERGE':
        return 'bg-emerald-100 text-emerald-800'
      case 'FOOD_SERVICE':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const startEditing = (statName: string, value: number) => {
    setEditingStat(statName)
    setEditValue(value)
  }

  const saveEdit = () => {
    if (editingStat) {
      setStats(prev => ({
        ...prev,
        [editingStat]: editValue
      }))
      setEditingStat(null)
    }
  }

  const cancelEdit = () => {
    setEditingStat(null)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Hotel Operations Login</h1>
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
                defaultValue="admin@hotelops.com"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-16">
      <OfflineIndicator />
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Good morning, {user?.name}</h1>
              <p className="text-slate-600 text-sm">Here's what's happening with your hotel today.</p>
            </div>
            <div className="mt-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">Last updated:</span>
                <span className="text-xs font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 transition focus-ring"
                  onClick={fetchDashboardData}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v7a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div 
            className="bg-white rounded-xl shadow p-4 border-l-4 border-amber-500 card cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
            onClick={() => startEditing('pendingRequests', stats.pendingRequests)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500">Pending Requests</p>
                {editingStat === 'pendingRequests' ? (
                  <div className="mt-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                      autoFocus
                    />
                    <div className="flex space-x-1 mt-1">
                      <button 
                        onClick={saveEdit}
                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="text-xs bg-slate-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stats.pendingRequests}</p>
                )}
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-slate-500">+2 from yesterday</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500 card cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
            onClick={() => startEditing('occupancyRate', stats.occupancyRate)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500">Occupancy Rate</p>
                {editingStat === 'occupancyRate' ? (
                  <div className="mt-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                      autoFocus
                    />
                    <div className="flex space-x-1 mt-1">
                      <button 
                        onClick={saveEdit}
                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="text-xs bg-slate-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stats.occupancyRate}%</p>
                )}
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl shadow p-4 border-l-4 border-emerald-500 card cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
            onClick={() => startEditing('revenueToday', stats.revenueToday)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500">Revenue Today</p>
                {editingStat === 'revenueToday' ? (
                  <div className="mt-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                      autoFocus
                    />
                    <div className="flex space-x-1 mt-1">
                      <button 
                        onClick={saveEdit}
                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="text-xs bg-slate-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-slate-800 mt-1">₹{stats.revenueToday?.toLocaleString() || '0'}</p>
                )}
              </div>
              <div className="bg-emerald-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-emerald-500">↑ 12% from yesterday</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl shadow p-4 border-l-4 border-indigo-500 card cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
            onClick={() => startEditing('staffActive', stats.staffActive)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500">Active Staff</p>
                {editingStat === 'staffActive' ? (
                  <div className="mt-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                      autoFocus
                    />
                    <div className="flex space-x-1 mt-1">
                      <button 
                        onClick={saveEdit}
                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="text-xs bg-slate-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stats.staffActive}</p>
                )}
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-slate-500">4 on break</span>
            </div>
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            <div 
              className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-3 px-2 rounded-lg text-center hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow transform hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => router.push('/requests')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs font-medium">Requests</span>
            </div>
            <div 
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 px-2 rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow transform hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => router.push('/rooms')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs font-medium">Rooms</span>
            </div>
            <div 
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-3 px-2 rounded-lg text-center hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow transform hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => router.push('/analytics')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs font-medium">Analytics</span>
            </div>
            <div 
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-3 px-2 rounded-lg text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow transform hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => router.push('/departments')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium">Depts</span>
            </div>
          </div>
        </div>

        {/* Daily Progress Visualization */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h3 className="text-lg font-medium text-slate-800 mb-3">Daily Progress</h3>
          <div className="space-y-3">
            {/* Housekeeping Progress */}
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Housekeeping</span>
                <span className="text-sm font-medium text-slate-700">65%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500 hover:bg-emerald-600"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>13/20 rooms</span>
                <span>Cleaned</span>
              </div>
            </div>
            
            {/* Maintenance Progress */}
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Maintenance</span>
                <span className="text-sm font-medium text-slate-700">40%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500 hover:bg-amber-600"
                  style={{ width: '40%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4/10 tasks</span>
                <span>Completed</span>
              </div>
            </div>
            
            {/* Requests Progress */}
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Guest Requests</span>
                <span className="text-sm font-medium text-slate-700">75%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500 hover:bg-blue-600"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>15/20 requests</span>
                <span>Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
            <button className="text-xs text-teal-600 hover:text-teal-800 font-medium cursor-pointer" onClick={() => router.push('/reports')}>
              View All
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {activity.slice(0, 5).map((item: any) => (
              <div 
                key={item.id} 
                className={`${getActivityColor(item.type, item.status)} pl-3 py-2 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-sm animate-fade-in cursor-pointer`}
                onClick={() => {
                  // Navigate to appropriate page based on activity type
                  switch(item.type) {
                    case 'request':
                      router.push('/requests');
                      break;
                    case 'room':
                      router.push('/rooms');
                      break;
                    case 'staff':
                      router.push('/staff');
                      break;
                    default:
                      router.push('/reports');
                  }
                }}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-slate-800 text-sm">{item.title}</h3>
                  <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 
            className="text-lg font-medium text-slate-800 mb-3 cursor-pointer hover:text-teal-600 transition-colors" 
            onClick={() => router.push('/requests')}
          >
            Recent Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {requests.slice(0, 3).map((request: any) => (
                  <tr 
                    key={request.id} 
                    className="hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                    onClick={() => router.push(`/requests/${request.id}`)}
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{request.guestName.charAt(0)}</span>
                        </div>
                        <div className="ml-2">
                          <div className="text-xs font-medium text-slate-900">{request.guestName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-slate-600">
                      Room {request.roomNumber}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-slate-600">
                      {request.title}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 text-xs leading-4 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <MobileNavigation />
    </div>
  )
}