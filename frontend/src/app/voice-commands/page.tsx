'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import VoiceCommand from '../../components/VoiceCommand'

export default function VoiceCommands() {
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<any[]>([])
  const [notifications, setNotifications] = useState<string[]>([])

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

  const handleVoiceCommand = (command: string) => {
    // Add notification
    const newNotification = `Voice command received: "${command}"`
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
    
    // Parse command and create request
    parseVoiceCommand(command)
  }

  const parseVoiceCommand = (command: string) => {
    // Simple parsing logic for demonstration
    // In a real app, this would be much more sophisticated
    const lowerCommand = command.toLowerCase()
    
    let title = ''
    let roomNumber = ''
    let department = ''
    
    // Extract room number
    const roomMatch = lowerCommand.match(/room\s+(\d+)/)
    if (roomMatch) {
      roomNumber = roomMatch[1]
    }
    
    // Determine department and title based on keywords
    if (lowerCommand.includes('towel') || lowerCommand.includes('linen')) {
      department = 'Housekeeping'
      title = 'Extra towels/linens needed'
    } else if (lowerCommand.includes('leak') || lowerCommand.includes('faucet') || 
               lowerCommand.includes('ac') || lowerCommand.includes('air') ||
               lowerCommand.includes('temperature') || lowerCommand.includes('hot water')) {
      department = 'Maintenance'
      title = 'Maintenance request'
    } else if (lowerCommand.includes('checkout') || lowerCommand.includes('check out')) {
      department = 'Front Desk'
      title = 'Late checkout request'
    } else if (lowerCommand.includes('food') || lowerCommand.includes('meal') || 
               lowerCommand.includes('breakfast') || lowerCommand.includes('lunch') ||
               lowerCommand.includes('dinner') || lowerCommand.includes('room service')) {
      department = 'Food & Beverage'
      title = 'Food service request'
    } else {
      department = 'Front Desk'
      title = 'General guest request'
    }
    
    // Create request
    const newRequest = {
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
      guestName: 'Voice Command Guest',
      roomNumber,
      title,
      department,
      priority: 'MEDIUM',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      description: command
    }
    
    setRequests(prev => [newRequest, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Voice Commands</h2>
          <p className="text-slate-600">Hands-free request logging for hotel staff</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VoiceCommand onCommand={handleVoiceCommand} />
            
            <div className="mt-6 bg-white rounded-2xl shadow-md p-6 card">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Voice Requests</h3>
              {requests.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-slate-900">No voice requests yet</h3>
                  <p className="mt-1 text-sm text-slate-500">Use the microphone to log requests hands-free</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest & Room</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {requests.map((request) => (
                        <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{request.guestName}</div>
                            <div className="text-sm text-slate-500">Room {request.roomNumber}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-900">{request.title}</div>
                            <div className="text-sm text-slate-500">{request.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                              {request.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 card mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Notifications</h3>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-slate-900">No notifications</h3>
                  <p className="mt-1 text-sm text-slate-500">Voice commands will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                          <p className="text-sm text-blue-800">{notification}</p>
                          <p className="text-xs text-blue-600 mt-1">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6 card">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Voice Command Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-slate-700">Speak clearly and at a moderate pace</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-slate-700">Include room numbers when possible</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-slate-700">Use specific keywords like "towels", "maintenance", "checkout"</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-slate-700">Works best in quiet environments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}