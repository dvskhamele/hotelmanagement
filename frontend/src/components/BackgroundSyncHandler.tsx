'use client'

import React, { useEffect } from 'react'
import { usePWA } from '../context/PWAContext'

const BackgroundSyncHandler: React.FC = () => {
  const { isReady } = usePWA()

  useEffect(() => {
    if (!isReady) return

    // Register background sync when service worker is ready
    const registerBackgroundSync = async () => {
      if ('serviceWorker' in navigator && 'sync' in window) {
        try {
          // Type assertion to avoid TypeScript error
          const swRegistration: any = await navigator.serviceWorker.ready
          await swRegistration.sync.register('sync-dashboard-data')
          console.log('[PWA] Background sync registered')
        } catch (error) {
          console.error('[PWA] Background sync registration failed:', error)
        }
      }
    }

    registerBackgroundSync()

    // Set up periodic sync if supported
    const setupPeriodicSync = async () => {
      if ('serviceWorker' in navigator && 'periodicSync' in window) {
        try {
          const swRegistration: any = await navigator.serviceWorker.ready
          const status = await (navigator as any).permissions.query({ name: 'periodic-background-sync' })
          
          if (status.state === 'granted') {
            await swRegistration.periodicSync.register('update-dashboard', {
              minInterval: 24 * 60 * 60 * 1000 // 24 hours
            })
            console.log('[PWA] Periodic sync registered')
          }
        } catch (error) {
          console.error('[PWA] Periodic sync registration failed:', error)
        }
      }
    }

    setupPeriodicSync()
  }, [isReady])

  return null
}

export default BackgroundSyncHandler