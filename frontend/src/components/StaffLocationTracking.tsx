'use client'

import React, { useState, useEffect } from 'react'

interface StaffMember {
  id: number
  name: string
  department: string
  position: string
  status: string // Active, Break, Offline
  location: {
    floor: number
    zone: string
    lastUpdate: string
  }
  performance: number
  currentTask?: string
  taskProgress?: number
}

const StaffLocationTracking: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      department: 'Housekeeping',
      position: 'Supervisor',
      status: 'Active',
      location: {
        floor: 2,
        zone: 'East Wing',
        lastUpdate: new Date(Date.now() - 60000).toISOString() // 1 minute ago
      },
      performance: 96,
      currentTask: 'Inspecting room 205',
      taskProgress: 75
    },
    {
      id: 2,
      name: 'Bob Smith',
      department: 'Housekeeping',
      position: 'Staff',
      status: 'Active',
      location: {
        floor: 1,
        zone: 'West Wing',
        lastUpdate: new Date(Date.now() - 120000).toISOString() // 2 minutes ago
      },
      performance: 89,
      currentTask: 'Cleaning room 108',
      taskProgress: 40
    },
    {
      id: 3,
      name: 'Carol Davis',
      department: 'Housekeeping',
      position: 'Staff',
      status: 'Break',
      location: {
        floor: 1,
        zone: 'Staff Lounge',
        lastUpdate: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
      },
      performance: 94
    },
    {
      id: 4,
      name: 'David Wilson',
      department: 'Maintenance',
      position: 'Supervisor',
      status: 'Active',
      location: {
        floor: 3,
        zone: 'North Wing',
        lastUpdate: new Date(Date.now() - 180000).toISOString() // 3 minutes ago
      },
      performance: 91,
      currentTask: 'Fixing AC unit in room 302',
      taskProgress: 60
    },
    {
      id: 5,
      name: 'Eva Brown',
      department: 'Maintenance',
      position: 'Staff',
      status: 'Active',
      location: {
        floor: 2,
        zone: 'South Wing',
        lastUpdate: new Date(Date.now() - 90000).toISOString() // 1.5 minutes ago
      },
      performance: 87,
      currentTask: 'Replacing lightbulb in hallway',
      taskProgress: 100
    },
    {
      id: 6,
      name: 'Frank Miller',
      department: 'Food & Beverage',
      position: 'Manager',
      status: 'Active',
      location: {
        floor: 1,
        zone: 'Restaurant',
        lastUpdate: new Date(Date.now() - 240000).toISOString() // 4 minutes ago
      },
      performance: 95
    },
    {
      id: 7,
      name: 'Grace Lee',
      department: 'Food & Beverage',
      position: 'Staff',
      status: 'Offline',
      location: {
        floor: 1,
        zone: 'Kitchen',
        lastUpdate: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
      },
      performance: 88
    }
  ])
  
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get unique floors and departments
  const floors = Array.from(new Set(staff.map(member => member.location.floor))).sort()
  const departments = Array.from(new Set(staff.map(member => member.department)))

  // Filter staff based on selected floor, department, and search term
  const filteredStaff = staff.filter(member => {
    const floorMatch = selectedFloor === 'all' || member.location.floor === parseInt(selectedFloor)
    const departmentMatch = selectedDepartment === 'all' || member.department === selectedDepartment
    const searchMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        member.location.zone.toLowerCase().includes(searchTerm.toLowerCase())
    return floorMatch && departmentMatch && searchMatch
  })

  // Group staff by floor for visualization
  const staffByFloor: Record<number, StaffMember[]> = {}
  filteredStaff.forEach(member => {
    if (!staffByFloor[member.location.floor]) {
      staffByFloor[member.location.floor] = []
    }
    staffByFloor[member.location.floor].push(member)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Housekeeping':
        return 'bg-blue-100 text-blue-800'
      case 'Maintenance':
        return 'bg-purple-100 text-purple-800'
      case 'Food & Beverage':
        return 'bg-amber-100 text-amber-800'
      case 'Front Desk':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Simulate location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStaff(prevStaff => 
        prevStaff.map(member => {
          // Randomly update some staff locations for demo purposes
          if (Math.random() > 0.7) {
            const floors = [1, 2, 3]
            const zones = ['East Wing', 'West Wing', 'North Wing', 'South Wing', 'Staff Lounge', 'Restaurant', 'Kitchen']
            return {
              ...member,
              location: {
                ...member.location,
                floor: floors[Math.floor(Math.random() * floors.length)],
                zone: zones[Math.floor(Math.random() * zones.length)],
                lastUpdate: new Date().toISOString()
              }
            }
          }
          return member
        })
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Staff Location Tracking</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
              placeholder="Search staff or zones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
          >
            <option value="all">All Floors</option>
            {floors.map(floor => (
              <option key={floor} value={floor}>Floor {floor}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Floor Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Hotel Floor Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(staffByFloor).map(([floor, floorStaff]) => (
            <div key={floor} className="border border-slate-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-slate-800">Floor {floor}</h4>
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-800 rounded-full">
                  {floorStaff.length} staff
                </span>
              </div>
              <div className="space-y-3">
                {floorStaff.map(member => (
                  <div key={member.id} className="flex items-center p-2 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-medium">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-baseline">
                        <p className="text-sm font-medium text-slate-900 truncate">{member.name}</p>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{member.location.zone}</p>
                      {member.currentTask && (
                        <div className="mt-1">
                          <p className="text-xs text-slate-700 truncate">{member.currentTask}</p>
                          {member.taskProgress !== undefined && (
                            <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                              <div 
                                className="bg-teal-500 h-1 rounded-full" 
                                style={{ width: `${member.taskProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Staff List */}
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Staff Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredStaff.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">{member.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentColor(member.department)}`}>
                      {member.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">Floor {member.location.floor}</div>
                    <div className="text-sm text-slate-500">{member.location.zone}</div>
                    <div className="text-xs text-slate-400">
                      Updated: {new Date(member.location.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.currentTask ? (
                      <div>
                        <div className="text-sm text-slate-900">{member.currentTask}</div>
                        {member.taskProgress !== undefined && (
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-teal-500 h-1.5 rounded-full" 
                              style={{ width: `${member.taskProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">No current task</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-slate-900">{member.performance}%</div>
                      <div className="ml-2 w-16 bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 rounded-full" 
                          style={{ width: `${member.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* System Status */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">Tracking System Status</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
            Active: {staff.filter(s => s.status === 'Active').length} staff
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
            On Break: {staff.filter(s => s.status === 'Break').length} staff
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
            Offline: {staff.filter(s => s.status === 'Offline').length} staff
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Last Update: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StaffLocationTracking