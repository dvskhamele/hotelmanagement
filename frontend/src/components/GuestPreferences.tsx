'use client'

import React, { useState } from 'react'

interface GuestPreference {
  id: number
  guestId: number
  guestName: string
  preferenceType: string
  preferenceValue: string
  notes: string
  lastStay: string
}

const GuestPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<GuestPreference[]>([
    {
      id: 1,
      guestId: 1001,
      guestName: 'John Smith',
      preferenceType: 'Room Preference',
      preferenceValue: 'High floor, away from elevator',
      notes: 'Prefers quiet environment',
      lastStay: '2023-09-15'
    },
    {
      id: 2,
      guestId: 1002,
      guestName: 'Sarah Johnson',
      preferenceType: 'Amenity Preference',
      preferenceValue: 'Extra towels, preferred pillow type: memory foam',
      notes: 'Allergic to down pillows',
      lastStay: '2023-09-10'
    },
    {
      id: 3,
      guestId: 1003,
      guestName: 'Michael Brown',
      preferenceType: 'Dining Preference',
      preferenceValue: 'Vegetarian options, no nuts',
      notes: 'Severe nut allergy',
      lastStay: '2023-09-05'
    },
    {
      id: 4,
      guestId: 1004,
      guestName: 'Emily Davis',
      preferenceType: 'Temperature Preference',
      preferenceValue: 'Cooler room (65°F)',
      notes: 'Requests extra blankets despite cool temperature',
      lastStay: '2023-08-28'
    },
    {
      id: 5,
      guestId: 1005,
      guestName: 'Robert Wilson',
      preferenceType: 'Entertainment Preference',
      preferenceValue: 'Premier sports channels, HDMI cable',
      notes: 'Business traveler, often has presentations',
      lastStay: '2023-08-20'
    }
  ])
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPreference, setNewPreference] = useState({
    guestName: '',
    preferenceType: 'Room Preference',
    preferenceValue: '',
    notes: ''
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Filter preferences based on search term and filter type
  const filteredPreferences = preferences.filter(preference => {
    const matchesSearch = preference.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          preference.preferenceValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          preference.notes.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || preference.preferenceType === filterType
    
    return matchesSearch && matchesFilter
  })

  const handleAddPreference = () => {
    const newId = preferences.length > 0 ? Math.max(...preferences.map(p => p.id)) + 1 : 1
    const preferenceToAdd = {
      ...newPreference,
      id: newId,
      guestId: Math.floor(Math.random() * 10000) + 1000,
      lastStay: new Date().toISOString().split('T')[0]
    }
    
    setPreferences([...preferences, preferenceToAdd as GuestPreference])
    
    // Reset form and close modal
    setNewPreference({
      guestName: '',
      preferenceType: 'Room Preference',
      preferenceValue: '',
      notes: ''
    })
    setShowAddModal(false)
  }

  const getPreferenceIcon = (type: string) => {
    switch (type) {
      case 'Room Preference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )
      case 'Amenity Preference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        )
      case 'Dining Preference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
        )
      case 'Temperature Preference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.049l1.715-5.349L11 6.477V5h2a1 1 0 110 2H9a1 1 0 01-1-1V3a1 1 0 011-1h1zm-6 8a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 11.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 019 21a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.049l1.715-5.349L5 12.477V11a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Guest Preferences</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
              placeholder="Search preferences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Room Preference">Room Preference</option>
            <option value="Amenity Preference">Amenity Preference</option>
            <option value="Dining Preference">Dining Preference</option>
            <option value="Temperature Preference">Temperature Preference</option>
          </select>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Preference
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preference Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preference Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Stay</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredPreferences.map((preference) => (
              <tr key={preference.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{preference.guestName.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{preference.guestName}</div>
                      <div className="text-sm text-slate-500">ID: {preference.guestId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center mr-2">
                      {getPreferenceIcon(preference.preferenceType)}
                    </div>
                    <span className="text-sm font-medium text-slate-900">{preference.preferenceType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{preference.preferenceValue}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">{preference.notes}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {preference.lastStay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPreferences.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No preferences found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      {/* Add Preference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add Guest Preference</h3>
              <button 
                onClick={() => setShowAddModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Guest Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter guest name"
                    value={newPreference.guestName}
                    onChange={(e) => setNewPreference({...newPreference, guestName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preference Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newPreference.preferenceType}
                    onChange={(e) => setNewPreference({...newPreference, preferenceType: e.target.value})}
                  >
                    <option value="Room Preference">Room Preference</option>
                    <option value="Amenity Preference">Amenity Preference</option>
                    <option value="Dining Preference">Dining Preference</option>
                    <option value="Temperature Preference">Temperature Preference</option>
                    <option value="Entertainment Preference">Entertainment Preference</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preference Details</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter preference details"
                    rows={3}
                    value={newPreference.preferenceValue}
                    onChange={(e) => setNewPreference({...newPreference, preferenceValue: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Additional notes (allergies, special requirements, etc.)"
                    rows={2}
                    value={newPreference.notes}
                    onChange={(e) => setNewPreference({...newPreference, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddPreference}
              >
                Add Preference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestPreferences