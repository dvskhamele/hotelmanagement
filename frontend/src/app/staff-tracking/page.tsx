'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import StaffLocationTracking from '../../components/StaffLocationTracking'

export default function StaffTracking() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('tracking')

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Staff Tracking</h2>
          <p className="text-slate-600">Real-time location tracking and task management</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tracking'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              Location Tracking
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignment'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('assignment')}
            >
              Task Assignment
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Performance Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'tracking' && (
          <StaffLocationTracking />
        )}

        {activeTab === 'assignment' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Task Assignment</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Assign New Task</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Task Type</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select task type</option>
                        <option>Room Cleaning</option>
                        <option>Maintenance Request</option>
                        <option>Guest Service</option>
                        <option>Inventory Restock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Medium</option>
                        <option>Low</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select location</option>
                        <option>Room 101</option>
                        <option>Room 102</option>
                        <option>Room 205</option>
                        <option>Restaurant</option>
                        <option>Reception</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Auto-assign based on location</option>
                        <option>Alice Johnson (Housekeeping)</option>
                        <option>Bob Smith (Housekeeping)</option>
                        <option>David Wilson (Maintenance)</option>
                        <option>Eva Brown (Maintenance)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Task Description</label>
                      <textarea
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        placeholder="Enter detailed task description"
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                      Assign Task
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Recent Task Assignments</h4>
                  <div className="space-y-4">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-slate-800">Clean Room 205</p>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">In Progress</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Assigned to Alice Johnson (Housekeeping)</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500">Assigned 15 min ago</span>
                        <div className="w-20 bg-slate-200 rounded-full h-1.5">
                          <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-slate-800">Fix Leaky Faucet - Room 108</p>
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">Completed</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Assigned to David Wilson (Maintenance)</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500">Completed 2 hours ago</span>
                      </div>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-slate-800">Restock Restaurant Linens</p>
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-800 rounded-full">Pending</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Assigned to Grace Lee (Food & Beverage)</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500">Assigned 5 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Smart Assignment</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Proximity-Based Assignment</p>
                        <p className="text-sm text-slate-600">Automatically assign tasks to nearest available staff</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Skill-Based Assignment</p>
                        <p className="text-sm text-slate-600">Match tasks with staff expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Workload Balancing</p>
                        <p className="text-sm text-slate-600">Distribute tasks evenly among staff</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Assignment Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Tasks Completed Today</span>
                        <span className="text-sm font-medium text-slate-700">42</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Avg. Assignment Time</span>
                        <span className="text-sm font-medium text-slate-700">2.3 min</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '77%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">On-Time Completion</span>
                        <span className="text-sm font-medium text-slate-700">92%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Department Performance</h4>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="mt-2 text-slate-600">Performance charts would appear here</p>
                      <p className="text-sm text-slate-500">Visualization requires charting library integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Individual Performance</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tasks Completed</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-medium">
                                A
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-slate-900">Alice Johnson</div>
                                <div className="text-xs text-slate-500">Housekeeping</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">18</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">22 min</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-slate-900">96%</div>
                              <div className="ml-2 w-16 bg-slate-200 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-medium">
                                B
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-slate-900">Bob Smith</div>
                                <div className="text-xs text-slate-500">Housekeeping</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">15</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">25 min</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-slate-900">89%</div>
                              <div className="ml-2 w-16 bg-slate-200 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-medium">
                                D
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-slate-900">David Wilson</div>
                                <div className="text-xs text-slate-500">Maintenance</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">12</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">35 min</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-slate-900">91%</div>
                              <div className="ml-2 w-16 bg-slate-200 rounded-full h-1.5">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '91%' }}></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Key Metrics</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">94%</div>
                      <div className="text-sm text-emerald-800">Avg. Performance</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">24 min</div>
                      <div className="text-sm text-blue-800">Avg. Task Time</div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="text-lg font-bold text-amber-600">89%</div>
                      <div className="text-sm text-amber-800">On-Time Completion</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Recommendations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Provide additional training to Bob Smith for faster task completion</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Consider redistributing maintenance tasks to reduce David's workload</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Implement a reward system for top performers like Alice Johnson</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}