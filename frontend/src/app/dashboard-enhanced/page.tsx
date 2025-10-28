'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function EnhancedDashboard() {
  const [stats, setStats] = useState<any>({})
  const [departments, setDepartments] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN', id: 1 } as any)
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Mock data for prototype
      const mockStats = {
        pendingRequests: 12,
        inProgressRequests: 8,
        completedRequests: 45,
        urgentRequests: 3,
        dirtyRooms: 15,
        cleanRooms: 35,
        inspectedRooms: 8,
        outOfOrderRooms: 2,
        activeStaff: 24,
        onBreakStaff: 4
      }
      
      const mockDepartments = [
        {
          id: 1,
          name: 'Housekeeping',
          description: 'Room cleaning and maintenance',
          head: 'Alice Johnson',
          staffCount: 8,
          pendingRequests: 5,
          inProgressRequests: 3,
          completedRequests: 12,
          performance: 92
        },
        {
          id: 2,
          name: 'Maintenance',
          description: 'Facility and equipment maintenance',
          head: 'Robert Wilson',
          staffCount: 5,
          pendingRequests: 3,
          inProgressRequests: 2,
          completedRequests: 8,
          performance: 87
        },
        {
          id: 3,
          name: 'Food & Beverage',
          description: 'Room service and dining',
          head: 'Emily Davis',
          staffCount: 12,
          pendingRequests: 7,
          inProgressRequests: 4,
          completedRequests: 22,
          performance: 95
        },
        {
          id: 4,
          name: 'Front Office',
          description: 'Guest services and check-in/check-out',
          head: 'Michael Brown',
          staffCount: 6,
          pendingRequests: 2,
          inProgressRequests: 1,
          completedRequests: 15,
          performance: 89
        }
      ]
      
      const mockActivity = [
        {
          id: 1,
          type: 'request',
          title: 'New guest request',
          description: 'John Doe - Extra towels (Room 205)',
          timestamp: new Date().toISOString(),
          status: 'PENDING'
        },
        {
          id: 2,
          type: 'room',
          title: 'Room status updated',
          description: 'Room 102 marked as DIRTY',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'DIRTY'
        },
        {
          id: 3,
          type: 'request',
          title: 'Request completed',
          description: 'Jane Smith - Leaky faucet (Room 108)',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'COMPLETED'
        },
        {
          id: 4,
          type: 'room',
          title: 'Room status updated',
          description: 'Room 201 marked as CLEAN',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          status: 'CLEAN'
        },
        {
          id: 5,
          type: 'request',
          title: 'Request assigned',
          description: 'Robert Johnson - Breakfast order (Room 302) assigned to Mike Thompson',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          status: 'IN_PROGRESS'
        }
      ]
      
      const mockTasks = [
        {
          id: 1,
          title: 'Clean Room 205',
          description: 'Standard cleaning for occupied room',
          department: 'Housekeeping',
          priority: 'HIGH',
          status: 'PENDING',
          assignedTo: 1,
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          roomNumber: '205'
        },
        {
          id: 2,
          title: 'Inspect Room 108',
          description: 'Final inspection before guest arrival',
          department: 'Housekeeping',
          priority: 'MEDIUM',
          status: 'IN_PROGRESS',
          assignedTo: 1,
          dueDate: new Date(Date.now() + 172800000).toISOString(), // In 2 days
          roomNumber: '108'
        },
        {
          id: 3,
          title: 'Replace towels in Room 302',
          description: 'Guest requested fresh towels',
          department: 'Housekeeping',
          priority: 'URGENT',
          status: 'PENDING',
          assignedTo: 1,
          dueDate: new Date(Date.now() + 3600000).toISOString(), // In 1 hour
          roomNumber: '302'
        }
      ]
      
      setStats(mockStats)
      setDepartments(mockDepartments)
      setActivity(mockActivity)
      setTasks(mockTasks)
      
      setError('')
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      // Mock update for prototype
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      
      // Show success message
      setError('Task status updated successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error updating task status:', error)
      setError('Failed to update task status')
    }
  }

  const assignTask = async (taskId: number, staffId: number) => {
    try {
      // Mock assignment for prototype
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, assignedTo: staffId } : task
      ))
      
      // Show success message
      setError('Task assigned successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error assigning task:', error)
      setError('Failed to assign task')
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )
      case 'room':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Enhanced Dashboard</h2>
          <p className="text-slate-600">Overview of hotel operations and department coordination</p>
        </div>

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${error.includes('Failed') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {error}
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Requests</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pendingRequests}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgressRequests}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed Today</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.completedRequests}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-rose-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600">Urgent Requests</p>
                <p className="text-3xl font-bold text-rose-600">{stats.urgentRequests}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Performance</h3>
            <div className="space-y-4">
              {departments.map((dept: any) => (
                <div key={dept.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-slate-800">{dept.name}</h4>
                    <span className="text-sm font-medium text-slate-600">{dept.performance}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                      style={{ width: `${dept.performance}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{dept.head}</span>
                    <span>{dept.staffCount} staff</span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-amber-600">{dept.pendingRequests} pending</span>
                    <span className="text-blue-600">{dept.inProgressRequests} in progress</span>
                    <span className="text-emerald-600">{dept.completedRequests} completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Tasks */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">My Tasks</h3>
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task: any) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-800">{task.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Room {task.roomNumber}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <select
                        className="text-xs px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 bg-white"
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                      <span className="text-xs text-slate-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No tasks assigned</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map((item: any) => (
              <div key={item.id} className="flex items-start p-4 border border-slate-200 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(item.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-800">{item.title}</h4>
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}