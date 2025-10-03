'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import useServiceWorker from '../hooks/useServiceWorker'

interface PWAContextType {
  isReady: boolean
  isUpdated: boolean
  updateAvailable: boolean
  version: string | null
  updateServiceWorker: () => Promise<void>
  sendPushNotification: (title: string, options: any) => Promise<void>
}

const PWAContext = createContext<PWAContextType | undefined>(undefined)

export const PWAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const sw = useServiceWorker()
  
  return (
    <PWAContext.Provider value={sw}>
      {children}
    </PWAContext.Provider>
  )
}

export const usePWA = () => {
  const context = useContext(PWAContext)
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider')
  }
  return context
}