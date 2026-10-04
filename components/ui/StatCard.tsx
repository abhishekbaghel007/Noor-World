import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  emoji?: string
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'playful'
  className?: string
  trend?: {
    value: number | string
    label: string
  }
}

export function StatCard({ 
  title, 
  value, 
  emoji = '🌻', 
  variant = 'primary', 
  className = '',
  trend
}: StatCardProps) {
  const variantClass = {
    primary: 'bg-ink text-white',
    secondary: 'bg-paper text-ink',
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    playful: 'bg-pink-100 text-pink-800 border-pink-200'
  }[variant]
  
  return (
    <div className={'p-4 rounded-2xl border border-line ' + variantClass + ' ' + className}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='text-2xl'>{emoji}</span>
          <div>
            <p className='text-sm font-medium text-muted mb-1'>{title}</p>
            <p className={'text-2xl font-bold ' + (variant === 'primary' || variant === 'secondary' ? 'text-inherit' : '')}>
              {value}
            </p>
          </div>
        </div>
        {trend && (
          <div className='text-xs text-muted'>
            <p className='mb-1'>{trend.label}</p>
            <p className={'text-sm font-medium ' + (typeof trend.value === 'number' && trend.value > 0 ? 'text-green-600' : typeof trend.value === 'number' && trend.value < 0 ? 'text-red-600' : 'text-inherit')}>
              {trend.value}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
