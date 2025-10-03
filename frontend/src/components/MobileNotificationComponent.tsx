'use client'

import React, { useState } from 'react'

interface User {
  name: string;
  role: string;
}

interface NotificationComponentProps {
  user: User | null;
}

const MobileNotificationComponent: React.FC<NotificationComponentProps> = ({ user }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New guest request',
      description: 'Emma Davis needs extra pillows in room 201',
      time: '2 min ago',
      read: false
    },
    {
      id: '2',
      title: 'Maintenance required',
      description: 'TV not working in room 305',
      time: '15 min ago',
      read: false
    },
    {
      id: '3',
      title: 'Housekeeping update',
      description: 'Room 104 has been cleaned and inspected',
      time: '1 hour ago',
      read: true
    }
  ])
  
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  return (
    <div className="relative">
      <button 
        className="p-1 rounded-full hover:bg-slate-200 transition relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50 border border-slate-200">
          <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200">
            <h3 className="text-sm font-medium text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-xs text-teal-600 hover:text-teal-800"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-center">
                <p className="text-sm text-slate-500">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-800">{notification.title}</h4>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{notification.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="px-4 py-2 text-center">
            <button className="text-xs text-teal-600 hover:text-teal-800">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNotificationComponent