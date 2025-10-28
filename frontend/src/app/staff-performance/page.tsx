'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function StaffPerformanceDashboard() {
  const [user, setUser] = useState<any>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [staffData, setStaffData] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [sortBy, setSortBy] = useState('performance')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype
    const mockStaff = [
      {
        id: 1,
        name: 'Alice Johnson',
        department: 'Housekeeping',
        position: 'Supervisor',
        performanceScore: 92,
        tasksCompleted: 42,
        avgResponseTime: 28,
        onTimeRate: 95,
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        status: 'Active'
      },
      {
        id: 2,
        name: 'Bob Smith',
        department: 'Housekeeping',
        position: 'Staff',
        performanceScore: 87,
        tasksCompleted: 38,
        avgResponseTime: 32,
        onTimeRate: 88,
        lastActive: new Date(Date.now() - 7200000).toISOString(),
        status: 'Active'
      },
      {
        id: 3,
        name: 'Carol Davis',
        department: 'Housekeeping',
        position: 'Staff',
        performanceScore: 95,
        tasksCompleted: 45,
        avgResponseTime: 25,
        onTimeRate: 98,
        lastActive: new Date(Date.now() - 10800000).toISOString(),
        status: 'Offline'
      },
      {
        id: 4,
        name: 'David Wilson',
        department: 'Maintenance',
        position: 'Supervisor',
        performanceScore: 88,
        tasksCompleted: 18,
        avgResponseTime: 65,
        onTimeRate: 85,
        lastActive: new Date(Date.now() - 14400000).toISOString(),
        status: 'Active'
      },
      {
        id: 5,
        name: 'Eva Brown',
        department: 'Maintenance',
        position: 'Staff',
        performanceScore: 82,
        tasksCompleted: 16,
        avgResponseTime: 72,
        onTimeRate: 80,
        lastActive: new Date(Date.now() - 18000000).toISOString(),
        status: 'Break'
      },
      {
        id: 6,
        name: 'Frank Miller',
        department: 'Food & Beverage',
        position: 'Manager',
        performanceScore: 96,
        tasksCompleted: 31,
        avgResponseTime: 18,
        onTimeRate: 99,
        lastActive: new Date(Date.now() - 21600000).toISOString(),
        status: 'Active'
      },
      {
        id: 7,
        name: 'Grace Lee',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 91,
        tasksCompleted: 29,
        avgResponseTime: 22,
        onTimeRate: 94,
        lastActive: new Date(Date.now() - 25200000).toISOString(),
        status: 'Active'
      },
      {
        id: 8,
        name: 'Henry Taylor',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 89,
        tasksCompleted: 27,
        avgResponseTime: 25,
        onTimeRate: 92,
        lastActive: new Date(Date.now() - 28800000).toISOString(),
        status: 'Active'
      },
      {
        id: 9,
        name: 'Ivy Chen',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 93,
        tasksCompleted: 30,
        avgResponseTime: 20,
        onTimeRate: 96,
        lastActive: new Date(Date.now() - 32400000).toISOString(),
        status: 'Offline'
      }
    ]
    
    setStaffData(mockStaff)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 80) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  // Filter and sort staff data
  const filteredStaff = staffData.filter(staff => {
    if (selectedDepartment === 'all') return true
    return staff.department === selectedDepartment
  })

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortBy === 'performance') return b.performanceScore - a.performanceScore
    if (sortBy === 'tasks') return b.tasksCompleted - a.tasksCompleted
    if (sortBy === 'response') return a.avgResponseTime - b.avgResponseTime
    return a.name.localeCompare(b.name)
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(staffData.map((staff: any) => staff.department)))

  // Calculate department performance
  const departmentPerformance = departments.map(dept => {
    const deptStaff = staffData.filter(staff => staff.department === dept)
    const avgPerformance = deptStaff.reduce((sum, staff) => sum + staff.performanceScore, 0) / deptStaff.length
    const avgResponseTime = deptStaff.reduce((sum, staff) => sum + staff.avgResponseTime, 0) / deptStaff.length
    const onTimeRate = deptStaff.reduce((sum, staff) => sum + staff.onTimeRate, 0) / deptStaff.length
    return {
      department: dept,
      staffCount: deptStaff.length,
      avgPerformance: Math.round(avgPerformance),
      avgResponseTime: Math.round(avgResponseTime),
      onTimeRate: Math.round(onTimeRate)
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Staff Performance Dashboard</h2>
            <p className="text-slate-600">Monitor and improve team performance</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1d">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md">
              Export Report
            </button>
          </div>
        </div>

        {/* Department Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{dept.department}</h3>
                <span className="text-sm font-medium text-slate-500">{dept.staffCount} staff</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Performance</span>
                    <span className="text-sm font-medium text-slate-700">{dept.avgPerformance}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        dept.avgPerformance >= 90 ? 'bg-emerald-500' :
                        dept.avgPerformance >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${dept.avgPerformance}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Avg. Response Time</span>
                    <span className="text-sm font-medium text-slate-700">{dept.avgResponseTime} min</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        dept.avgResponseTime <= 20 ? 'bg-emerald-500' :
                        dept.avgResponseTime <= 30 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, (dept.avgResponseTime / 60) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">On-Time Rate</span>
                    <span className="text-sm font-medium text-slate-700">{dept.onTimeRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        dept.onTimeRate >= 95 ? 'bg-emerald-500' :
                        dept.onTimeRate >= 90 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${dept.onTimeRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Performance Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="departmentFilter" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select
                  id="departmentFilter"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                <select
                  id="sortBy"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="performance">Performance Score</option>
                  <option value="tasks">Tasks Completed</option>
                  <option value="response">Avg. Response Time</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <button 
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition duration-300"
              onClick={() => {
                setSelectedDepartment('all')
                setSortBy('performance')
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Staff Performance Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tasks Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">On-Time Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Active</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedStaff.map((staff, index) => (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{staff.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{staff.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {staff.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {staff.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-slate-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${getPerformanceColor(staff.performanceScore)}`}
                            style={{ width: `${staff.performanceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{staff.performanceScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {staff.tasksCompleted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {staff.avgResponseTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {staff.onTimeRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(staff.status)}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(staff.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Performance Insights</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Analytics</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Top Performer</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-blue-700 mt-2">Carol Davis</p>
              <p className="text-sm text-blue-600">95% performance score</p>
              <p className="text-xs text-blue-500 mt-2">Housekeeping Department</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Improvement Opportunity</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-amber-700 mt-2">Maintenance Team</p>
              <p className="text-sm text-amber-600">Avg. response time: 68 min</p>
              <p className="text-xs text-amber-500 mt-2">Target: Under 45 min</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Recognition</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-emerald-700 mt-2">Food & Beverage</p>
              <p className="text-sm text-emerald-600">93% avg. performance</p>
              <p className="text-xs text-emerald-500 mt-2">Consider team recognition</p>
            </div>
          </div>
        </div>

        {/* Coaching & Development */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Coaching & Development</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View All Programs</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:border-teal-300 transition duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-teal-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h4 className="font-medium text-slate-800">Leadership Program</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Develop supervisory skills for high-performing staff</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">4 modules</span>
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Recommended</span>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-amber-300 transition duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-slate-800">Technical Skills</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Advanced training for specialized roles</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">6 modules</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">In Progress</span>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-slate-800">Customer Service</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Enhance guest interaction skills</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">3 modules</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">New</span>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-slate-800">Certification Prep</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Industry-standard certifications</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">8 modules</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}