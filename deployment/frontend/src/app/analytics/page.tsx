'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Analytics() {
  const [user, setUser] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  // Generate mock data for charts
  const generateRevenueData = () => {
    const data = []
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 15000) + 5000, // Random between 5000-20000
        bookings: Math.floor(Math.random() * 30) + 10, // Random between 10-40
        occupancy: Math.floor(Math.random() * 40) + 60 // Random between 60-100%
      })
    }
    return data
  }

  const generateDepartmentData = () => {
    return [
      { department: 'Housekeeping', requests: 142, completion: 96 },
      { department: 'Maintenance', requests: 78, completion: 92 },
      { department: 'Food & Beverage', requests: 205, completion: 98 },
      { department: 'Front Desk', requests: 89, completion: 94 },
      { department: 'Concierge', requests: 64, completion: 90 }
    ]
  }

  const generateGuestSatisfactionData = () => {
    return [
      { category: 'Room Cleanliness', score: 94 },
      { category: 'Staff Friendliness', score: 92 },
      { category: 'Check-in Process', score: 89 },
      { category: 'Facilities', score: 91 },
      { category: 'Value for Money', score: 87 }
    ]
  }

  const revenueData = generateRevenueData()
  const departmentData = generateDepartmentData()
  const satisfactionData = generateGuestSatisfactionData()

  // Calculate totals
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0)
  const avgDailyRevenue = totalRevenue / revenueData.length
  const totalBookings = revenueData.reduce((sum, day) => sum + day.bookings, 0)
  const avgOccupancy = revenueData.reduce((sum, day) => sum + day.occupancy, 0) / revenueData.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h2>
            <p className="text-slate-600">Comprehensive insights into hotel performance</p>
          </div>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded text-sm ${timeRange === '7d' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setTimeRange('7d')}
            >
              7D
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${timeRange === '30d' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setTimeRange('30d')}
            >
              30D
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${timeRange === '90d' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setTimeRange('90d')}
            >
              90D
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-emerald-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 12% from previous period</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Daily Revenue</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹{avgDailyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 8% from previous period</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Bookings</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalBookings}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-rose-500">↓ 3% from previous period</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Occupancy</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{avgOccupancy.toFixed(1)}%</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 5% from previous period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${selectedMetric === 'revenue' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setSelectedMetric('revenue')}
                >
                  Revenue
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${selectedMetric === 'bookings' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setSelectedMetric('bookings')}
                >
                  Bookings
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${selectedMetric === 'occupancy' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setSelectedMetric('occupancy')}
                >
                  Occupancy
                </button>
              </div>
            </div>
            <div className="h-80 flex items-end space-x-2 mt-8">
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">
                    {selectedMetric === 'revenue' ? `₹${(data.revenue / 1000).toFixed(1)}k` : 
                     selectedMetric === 'bookings' ? data.bookings : 
                     `${data.occupancy}%`}
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg hover:from-teal-600 hover:to-teal-500 transition-all duration-300"
                    style={{ 
                      height: `${selectedMetric === 'revenue' ? (data.revenue / 20000) * 80 : 
                               selectedMetric === 'bookings' ? (data.bookings / 40) * 80 : 
                               (data.occupancy / 100) * 80}%` 
                    }}
                  ></div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Department Performance</h3>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Details</button>
            </div>
            <div className="space-y-4 mt-8">
              {departmentData.map((dept, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{dept.department}</span>
                    <span className="text-sm font-medium text-slate-700">{dept.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
                      style={{ width: `${dept.completion}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {dept.requests} requests
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Guest Satisfaction */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Guest Satisfaction</h3>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Survey</button>
            </div>
            <div className="space-y-4 mt-8">
              {satisfactionData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{item.category}</span>
                    <span className="text-sm font-medium text-slate-700">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Occupancy by Room Type */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Occupancy by Room Type</h3>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Details</button>
            </div>
            <div className="space-y-4 mt-8">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Standard Rooms</span>
                  <span className="text-sm font-medium text-slate-700">72%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: '72%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Deluxe Rooms</span>
                  <span className="text-sm font-medium text-slate-700">85%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Suites</span>
                  <span className="text-sm font-medium text-slate-700">92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    style={{ width: '92%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Performance Insights</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">Export Report</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Peak Performance</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">Friday-Sunday</p>
              <p className="text-sm text-blue-600">Highest occupancy and revenue</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Improvement Area</h4>
              </div>
              <p className="text-xl font-bold text-amber-700 mt-2">Check-in Process</p>
              <p className="text-sm text-amber-600">Satisfaction score: 89%</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Top Performer</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">Food & Beverage</p>
              <p className="text-sm text-emerald-600">98% completion rate</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}