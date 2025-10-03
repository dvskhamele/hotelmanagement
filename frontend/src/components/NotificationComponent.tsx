'use client'

import React, { useState, useEffect } from 'react'
import { Bell, X, Check } from 'lucide-react'
import apiService from '../utils/apiService'

interface User {
  name: string;
  role: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationComponentProps {
  user: User | null;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New Request', message: 'John Doe requested extra towels in room 205', type: 'new_request', isRead: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Room Status', message: 'Room 302 has been marked as clean', type: 'room_status', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, title: 'Request Update', message: 'Jane Smith\'s breakfast order is in progress', type: 'request_status', isRead: true, createdAt: new Date(Date.now() - 7200000).toISOString() }
  ])
  const [unreadCount, setUnreadCount] = useState(2)
  const [isOpen, setIsOpen] = useState(false)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
    setUnreadCount(unreadCount - 1)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    setUnreadCount(0)
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
    if (notifications.find(n => n.id === id && !n.isRead)) {
      setUnreadCount(unreadCount - 1)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'room_status':
        return '🛏️'
      case 'request_status':
        return '📋'
      case 'new_request':
        return '🆕'
      default:
        return '🔔'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <span className="text-lg mr-2">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-green-500"
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationComponent