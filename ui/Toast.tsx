'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'

type ToastContextValue = { show: (message: string) => void }
const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const value = useMemo(() => ({ show: (next: string) => {
    setMessage(next)
    window.setTimeout(() => setMessage(''), 2200)
  }}), [])
  return <ToastContext.Provider value={value}>
    {children}
    {message && <div className='nw-toast' role='status'>{message}</div>}
  </ToastContext.Provider>
}

export function useToast() {
  const value = useContext(ToastContext)
  if (!value) throw new Error('useToast must be used within ToastProvider')
  return value
}
