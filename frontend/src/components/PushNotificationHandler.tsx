'use client'

import React, { useEffect } from 'react'
import { usePWA } from '../context/PWAContext'

const PushNotificationHandler: React.FC = () => {
  const { sendPushNotification } = usePWA()

  useEffect(() => {
    // Request notification permission when component mounts
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted')
          // Subscribe to push notifications
          sendPushNotification('Welcome to HotelOps!', {
            body: 'You will now receive important notifications',
            icon: '/icons/icon-192x192.png'
          })
        }
      })
    }
  }, [sendPushNotification])

  return null
}

export default PushNotificationHandler