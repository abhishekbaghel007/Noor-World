import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'playful'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'primary', 
  className = '' 
}: BadgeProps) {
  const variantClass = {
    primary: 'bg-ink text-white',
    secondary: 'bg-paper text-ink',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    playful: 'bg-pink-100 text-pink-800'
  }[variant]
  
  return (
    <span className={'px-2 py-1 rounded-full text-xs font-medium ' + variantClass + ' ' + className}>
      {children}
    </span>
  )
}
