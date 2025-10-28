'use client'

import { useState, useEffect } from 'react'

interface ServiceWorkerState {
  isReady: boolean
  isUpdated: boolean
  updateAvailable: boolean
  version: string | null
}

const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isReady: false,
    isUpdated: false,
    updateAvailable: false,
    version: null
  })
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      const registerServiceWorker = async () => {
        try {
          const swRegistration = await navigator.serviceWorker.register('/sw.js')
          setRegistration(swRegistration)
          console.log('[SW] Service worker registered:', swRegistration)
          
          // Set ready state
          setState(prev => ({ ...prev, isReady: true }))
          
          // Check current version
          try {
            const versionResponse = await fetch('/api/pwa/version')
            const versionData = await versionResponse.json()
            setState(prev => ({ ...prev, version: versionData.version }))
          } catch (error) {
            console.error('[SW] Failed to fetch version:', error)
          }
          
          // Listen for updates
          swRegistration.addEventListener('updatefound', () => {
            const newWorker = swRegistration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New update available
                  setState(prev => ({ ...prev, updateAvailable: true }))
                }
              })
            }
          })
          
          // Check for existing updates
          if (swRegistration.waiting) {
            setState(prev => ({ ...prev, updateAvailable: true }))
          }
        } catch (error) {
          console.error('[SW] Service worker registration failed:', error)
        }
      }
      
      // Enable background sync if supported
      const enableBackgroundSync = async () => {
        if ('serviceWorker' in navigator && 'sync' in window) {
          try {
            const swRegistration: any = await navigator.serviceWorker.ready
            await swRegistration.sync.register('sync-dashboard-data')
            console.log('[SW] Background sync registered')
          } catch (error) {
            console.error('[SW] Background sync registration failed:', error)
          }
        }
      }
      
      // Enable periodic background sync if supported
      const enablePeriodicSync = async () => {
        if ('serviceWorker' in navigator && 'periodicSync' in window) {
          try {
            const swRegistration: any = await navigator.serviceWorker.ready
            await swRegistration.periodicSync.register('update-dashboard', {
              minInterval: 24 * 60 * 60 * 1000 // 24 hours
            })
            console.log('[SW] Periodic sync registered')
          } catch (error) {
            console.error('[SW] Periodic sync registration failed:', error)
          }
        }
      }
      
      // Initialize service worker
      registerServiceWorker()
      enableBackgroundSync()
      enablePeriodicSync()
      
      // Listen for controller change
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          window.location.reload()
          refreshing = true
        }
      })
    }
  }, [])

  const updateServiceWorker = async () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  const sendPushNotification = async (title: string, options: any) => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const swRegistration = await navigator.serviceWorker.ready
        const subscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')
        })
        
        // Send subscription to your server
        await fetch('/api/notifications/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        })
        
        console.log('[SW] Push subscription successful')
      } catch (error) {
        console.error('[SW] Push subscription failed:', error)
      }
    }
  }

  // Helper function for VAPID key conversion
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  return {
    ...state,
    updateServiceWorker,
    sendPushNotification
  }
}

export default useServiceWorker