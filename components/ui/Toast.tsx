import React, { useState, useEffect, useRef } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'playful'
  duration?: number
  onClose?: () => void
}

interface ToastContextType {
  show: (message: string, type?: 'success' | 'error' | 'info' | 'playful', duration?: number) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'playful'; duration: number }>>([])

  const show = (message: string, type: 'success' | 'error' | 'info' | 'playful' = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type, duration }])
    
    // Auto dismiss after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
    
    return id
  }

  const dismiss = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  useEffect(() => {
    return () => {
      // Cleanup on unmount
    }
  }, [])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2'>
        {toasts.map((toast, index) => (
          <Toast 
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function Toast({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose
}: ToastProps) {
  let typeClass = 'bg-blue-100 text-blue-800 border-blue-200'
  if (type === 'success') {
    typeClass = 'bg-green-100 text-green-800 border-green-200'
  } else if (type === 'error') {
    typeClass = 'bg-red-100 text-red-800 border-red-200'
  } else if (type === 'playful') {
    typeClass = 'bg-pink-100 text-pink-800 border-pink-200'
  }
  
  const className = 'flex items-center w-56 rounded-xl border border-line px-4 py-3 ' + typeClass + ' text-sm font-medium shadow-lg'
  
  return (
    <div className={className}>
      <span className='flex-1'>{message}</span>
      <button 
        className='ml-2 text-muted hover:text-ink'
        onClick={onClose}
      >
        ×
      </button>
    </div>
  )
}
