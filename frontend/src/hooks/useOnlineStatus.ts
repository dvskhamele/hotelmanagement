'use client'

import { useState, useEffect } from 'react'

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline }
}

export default useOnlineStatus