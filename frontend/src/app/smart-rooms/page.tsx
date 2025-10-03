'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import SmartRoomControls from '../../components/SmartRoomControls'

export default function SmartRooms() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('controls')

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
          <h2 className="text-2xl font-bold text-slate-800">Smart Room Management</h2>
          <p className="text-slate-600">Control and monitor smart devices in guest rooms</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'controls'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('controls')}
            >
              Device Controls
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'automation'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('automation')}
            >
              Automation Rules
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Energy Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'controls' && (
          <SmartRoomControls />
        )}

        {activeTab === 'automation' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Automation Rules</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Active Rules</h4>
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
                        <p className="text-sm font-medium text-slate-800">Welcome Lighting</p>
                        <p className="text-sm text-slate-600">Turn on lights to 50% brightness when guest enters room</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="welcomeLighting" id="welcomeLighting" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="welcomeLighting" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
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
                        <p className="text-sm font-medium text-slate-800">Energy Saving</p>
                        <p className="text-sm text-slate-600">Turn off all devices 30 minutes after guest leaves</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="energySaving" id="energySaving" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="energySaving" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
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
                        <p className="text-sm font-medium text-slate-800">Temperature Comfort</p>
                        <p className="text-sm text-slate-600">Adjust temperature to 22°C when guest is in room</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="tempComfort" id="tempComfort" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="tempComfort" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Create New Rule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Rule Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        placeholder="Enter rule name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Trigger</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select trigger</option>
                        <option>Guest enters room</option>
                        <option>Guest leaves room</option>
                        <option>Time of day</option>
                        <option>Temperature change</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Action</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select action</option>
                        <option>Turn on device</option>
                        <option>Turn off device</option>
                        <option>Adjust brightness</option>
                        <option>Set temperature</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Target Device</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select device</option>
                        <option>All lights</option>
                        <option>Main light</option>
                        <option>Thermostat</option>
                        <option>TV</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                      Create Rule
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Rule Templates</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Energy Optimizer</p>
                      <p className="text-xs text-slate-600 mt-1">Automatically adjust lighting and temperature based on occupancy</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Evening Welcome</p>
                      <p className="text-xs text-slate-600 mt-1">Create a relaxing atmosphere with warm lighting and soft music</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Morning Routine</p>
                      <p className="text-xs text-slate-600 mt-1">Gradually brighten lights and adjust temperature for natural wake-up</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Sleep Mode</p>
                      <p className="text-xs text-slate-600 mt-1">Dim lights and set optimal sleeping temperature</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Integration Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Lighting System</p>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">HVAC System</p>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Entertainment System</p>
                        <p className="text-xs text-slate-600">Partially Connected</p>
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
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Energy Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Energy Consumption Overview</h4>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="mt-2 text-slate-600">Energy consumption chart would appear here</p>
                      <p className="text-sm text-slate-500">Visualization requires charting library integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Device Efficiency</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Lighting System</span>
                        <span className="text-sm font-medium text-slate-700">87% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">HVAC System</span>
                        <span className="text-sm font-medium text-slate-700">76% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Entertainment System</span>
                        <span className="text-sm font-medium text-slate-700">92% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Energy Savings</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">This Month</p>
                        <p className="text-xs text-slate-600">Compared to last month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">12% ↓</p>
                        <p className="text-xs text-slate-600">1,240 kWh saved</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">This Year</p>
                        <p className="text-xs text-slate-600">Compared to last year</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">8% ↓</p>
                        <p className="text-xs text-slate-600">15,600 kWh saved</p>
                      </div>
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
                      <span className="ml-2 text-sm text-slate-700">Upgrade HVAC system for better efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Install occupancy sensors in all rooms</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Implement smart thermostats for better temperature control</span>
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