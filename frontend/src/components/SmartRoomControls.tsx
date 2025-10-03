'use client'

import React, { useState } from 'react'

interface SmartRoomDevice {
  id: number
  roomId: string
  roomNumber: string
  deviceType: string
  deviceName: string
  status: boolean
  value?: number // For devices with variable values (temperature, brightness)
  lastUpdated: string
}

const SmartRoomControls: React.FC = () => {
  const [devices, setDevices] = useState<SmartRoomDevice[]>([
    {
      id: 1,
      roomId: '101',
      roomNumber: '101',
      deviceType: 'lighting',
      deviceName: 'Main Light',
      status: true,
      value: 80,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 2,
      roomId: '101',
      roomNumber: '101',
      deviceType: 'temperature',
      deviceName: 'Thermostat',
      status: true,
      value: 22,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 3,
      roomId: '101',
      roomNumber: '101',
      deviceType: 'entertainment',
      deviceName: 'TV',
      status: false,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 4,
      roomId: '102',
      roomNumber: '102',
      deviceType: 'lighting',
      deviceName: 'Main Light',
      status: false,
      value: 30,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 5,
      roomId: '102',
      roomNumber: '102',
      deviceType: 'temperature',
      deviceName: 'Thermostat',
      status: true,
      value: 20,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 6,
      roomId: '201',
      roomNumber: '201',
      deviceType: 'lighting',
      deviceName: 'Main Light',
      status: true,
      value: 100,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 7,
      roomId: '201',
      roomNumber: '201',
      deviceType: 'temperature',
      deviceName: 'Thermostat',
      status: true,
      value: 23,
      lastUpdated: '2023-09-15T14:30:00Z'
    },
    {
      id: 8,
      roomId: '201',
      roomNumber: '201',
      deviceType: 'entertainment',
      deviceName: 'TV',
      status: true,
      lastUpdated: '2023-09-15T14:30:00Z'
    }
  ])
  
  const [selectedRoom, setSelectedRoom] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get unique rooms
  const rooms = Array.from(new Set(devices.map(device => device.roomNumber))).sort()

  // Filter devices based on selected room and search term
  const filteredDevices = devices.filter(device => {
    const matchesRoom = selectedRoom === 'all' || device.roomNumber === selectedRoom
    const matchesSearch = device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          device.roomNumber.includes(searchTerm)
    return matchesRoom && matchesSearch
  })

  // Group devices by room
  const devicesByRoom: Record<string, SmartRoomDevice[]> = {}
  filteredDevices.forEach(device => {
    if (!devicesByRoom[device.roomNumber]) {
      devicesByRoom[device.roomNumber] = []
    }
    devicesByRoom[device.roomNumber].push(device)
  })

  const toggleDevice = (deviceId: number) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            status: !device.status,
            lastUpdated: new Date().toISOString()
          } 
        : device
    ))
  }

  const updateDeviceValue = (deviceId: number, value: number) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            value,
            lastUpdated: new Date().toISOString()
          } 
        : device
    ))
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'lighting':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'temperature':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'entertainment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Smart Room Controls</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
              placeholder="Search rooms or devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room} value={room}>Room {room}</option>
            ))}
          </select>
        </div>
      </div>
      
      {Object.keys(devicesByRoom).length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No devices found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(devicesByRoom).map(([roomNumber, roomDevices]) => (
            <div key={roomNumber} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-800">Room {roomNumber}</h3>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  {roomDevices.filter(d => d.status).length}/{roomDevices.length} Active
                </span>
              </div>
              
              <div className="space-y-4">
                {roomDevices.map(device => (
                  <div key={device.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{device.deviceName}</div>
                        <div className="text-xs text-slate-500">
                          Updated: {new Date(device.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {device.deviceType === 'lighting' && device.value !== undefined && (
                        <div className="mr-3 w-24">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={device.value}
                            onChange={(e) => updateDeviceValue(device.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-xs text-slate-500 text-center">{device.value}%</div>
                        </div>
                      )}
                      
                      {device.deviceType === 'temperature' && device.value !== undefined && (
                        <div className="mr-3 w-24">
                          <input
                            type="range"
                            min="16"
                            max="30"
                            value={device.value}
                            onChange={(e) => updateDeviceValue(device.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-xs text-slate-500 text-center">{device.value}°C</div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => toggleDevice(device.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          device.status ? 'bg-teal-500' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            device.status ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* System Status */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">System Status</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
            Connected: {devices.filter(d => d.status).length} devices
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
            Offline: {devices.filter(d => !d.status).length} devices
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Last Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SmartRoomControls