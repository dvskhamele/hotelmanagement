'use client'

import React, { useState, useEffect } from 'react'

interface EmergencyAlert {
  id: number
  type: string // Medical, Security, Fire, Other
  location: string
  floor: number
  description: string
  status: string // Active, Resolved, False Alarm
  reportedBy: string
  reportedAt: string
  assignedTo?: string
  resolvedAt?: string
  priority: string // Low, Medium, High, Critical
}

const EmergencyResponse: React.FC = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: 1,
      type: 'Medical',
      location: 'Room 205',
      floor: 2,
      description: 'Guest requires medical assistance',
      status: 'Active',
      reportedBy: 'Alice Johnson',
      reportedAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      priority: 'High'
    },
    {
      id: 2,
      type: 'Security',
      location: 'Lobby',
      floor: 1,
      description: 'Suspicious person reported',
      status: 'Resolved',
      reportedBy: 'Front Desk',
      reportedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      assignedTo: 'Security Team',
      resolvedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      priority: 'Medium'
    }
  ])
  
  const [showPanicButton, setShowPanicButton] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [newAlert, setNewAlert] = useState({
    type: 'Medical',
    location: '',
    floor: 1,
    description: '',
    priority: 'Medium'
  })
  
  const [activeAlerts, setActiveAlerts] = useState(0)
  const [securityTeamStatus, setSecurityTeamStatus] = useState('Available')

  // Count active alerts
  useEffect(() => {
    const active = alerts.filter(alert => alert.status === 'Active').length
    setActiveAlerts(active)
  }, [alerts])

  const handlePanicButton = () => {
    // In a real app, this would send an immediate alert to security
    const panicAlert: EmergencyAlert = {
      id: alerts.length > 0 ? Math.max(...alerts.map(a => a.id)) + 1 : 1,
      type: 'Security',
      location: 'Panic Button Activation',
      floor: 1, // Would be determined by user location
      description: 'Panic button activated - immediate assistance required',
      status: 'Active',
      reportedBy: 'Staff Member',
      reportedAt: new Date().toISOString(),
      priority: 'Critical'
    }
    
    setAlerts(prev => [panicAlert, ...prev])
    setShowPanicButton(false)
    
    // Hide panic button for 30 seconds after activation
    setTimeout(() => {
      setShowPanicButton(true)
    }, 30000)
  }

  const handleReportAlert = () => {
    const alertToAdd: EmergencyAlert = {
      ...newAlert,
      id: alerts.length > 0 ? Math.max(...alerts.map(a => a.id)) + 1 : 1,
      status: 'Active',
      reportedBy: 'Staff Member',
      reportedAt: new Date().toISOString()
    }
    
    setAlerts(prev => [alertToAdd, ...prev])
    
    // Reset form and close modal
    setNewAlert({
      type: 'Medical',
      location: '',
      floor: 1,
      description: '',
      priority: 'Medium'
    })
    setShowReportModal(false)
  }

  const resolveAlert = (alertId: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              status: 'Resolved',
              resolvedAt: new Date().toISOString()
            } 
          : alert
      )
    )
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Medical':
        return 'bg-red-100 text-red-800'
      case 'Security':
        return 'bg-amber-100 text-amber-800'
      case 'Fire':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800'
      case 'Medium':
        return 'bg-blue-100 text-blue-800'
      case 'High':
        return 'bg-amber-100 text-amber-800'
      case 'Critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-rose-100 text-rose-800'
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800'
      case 'False Alarm':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Emergency Response System</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <button 
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowReportModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Report Emergency
          </button>
        </div>
      </div>
      
      {/* Emergency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl shadow p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-red-700">{activeAlerts}</p>
              <p className="text-sm text-red-600">Active Alerts</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-xl shadow p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-700">{securityTeamStatus}</p>
              <p className="text-sm text-blue-600">Security Team</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-xl shadow p-4 border-l-4 border-amber-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-amber-700">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-amber-600">Current Time</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panic Button */}
      {showPanicButton && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-red-800">Emergency Panic Button</h3>
                <p className="text-sm text-red-700">Press in case of immediate danger</p>
              </div>
            </div>
            <button
              onClick={handlePanicButton}
              className="mt-3 md:mt-0 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              ACTIVATE EMERGENCY ALERT
            </button>
          </div>
        </div>
      )}
      
      {/* Active Alerts */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Active Emergency Alerts</h3>
        {alerts.filter(alert => alert.status === 'Active').length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">No active emergency alerts</h3>
            <p className="mt-1 text-sm text-slate-500">All emergencies have been resolved</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.filter(alert => alert.status === 'Active').map(alert => (
              <div key={alert.id} className="p-4 border border-red-200 rounded-xl bg-red-50">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getAlertTypeColor(alert.type)}`}>
                        {alert.type}
                      </span>
                      <span className={`ml-2 px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </div>
                    <h4 className="mt-2 text-lg font-medium text-slate-900">{alert.location} - Floor {alert.floor}</h4>
                    <p className="mt-1 text-slate-700">{alert.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      Reported by {alert.reportedBy}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(alert.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    Mark as Resolved
                  </button>
                  <button className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-lg hover:bg-amber-200 transition-colors">
                    Assign to Security
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Recent Alerts */}
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Recent Alerts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reported</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {alerts.map(alert => (
                <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getAlertTypeColor(alert.type)}`}>
                      {alert.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{alert.location}</div>
                    <div className="text-sm text-slate-500">Floor {alert.floor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{alert.description}</div>
                    <div className="text-sm text-slate-500">Reported by {alert.reportedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(alert.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {alert.status === 'Active' ? (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Report Emergency Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Report Emergency</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 bg-white"
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                  >
                    <option value="Medical">Medical Emergency</option>
                    <option value="Security">Security Incident</option>
                    <option value="Fire">Fire Emergency</option>
                    <option value="Other">Other Emergency</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 bg-white"
                      placeholder="Room number or area"
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 bg-white"
                      value={newAlert.floor}
                      onChange={(e) => setNewAlert({...newAlert, floor: parseInt(e.target.value)})}
                    >
                      <option value={1}>Floor 1</option>
                      <option value={2}>Floor 2</option>
                      <option value={3}>Floor 3</option>
                      <option value={4}>Floor 4</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 bg-white"
                    placeholder="Describe the emergency situation"
                    rows={3}
                    value={newAlert.description}
                    onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 bg-white"
                    value={newAlert.priority}
                    onChange={(e) => setNewAlert({...newAlert, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300"
                onClick={handleReportAlert}
              >
                Report Emergency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmergencyResponse