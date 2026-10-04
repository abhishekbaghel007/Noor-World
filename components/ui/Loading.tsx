import React from 'react'

interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'flower'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  count?: number // for skeleton
}

export function Loading({ 
  variant = 'spinner', 
  className = '', 
  size = 'md',
  count = 3
}: LoadingProps) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }[size]
  
  return (
    <div className={className}>
      {variant === 'spinner' && (
        <div className={'animate-spin ' + sizeClass + ' border-2 border-white border-t-transparent rounded-full'}>
        </div>
      )}
      {variant === 'dots' && (
        <div className='flex space-x-2'>
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={'h-2 w-2 bg-ink rounded-full animate-bounce ' + (i === 2 ? 'delay-100' : i === 3 ? 'delay-200' : '')}
            />
          ))}
        </div>
      )}
      {variant === 'flower' && (
        <div className='flex items-center justify-center'>
          <div className='relative h-8 w-8'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i} 
                className={'absolute inset-0 bg-yellow-400 rounded-full opacity-75 animate-pulse'}
              />
            ))}
          </div>
        </div>
      )}
      {variant === 'skeleton' && (
        <div className='space-y-3'>
          {[...Array(count)].map((_, i) => (
            <div 
              key={i} 
              className={'h-2 w-3/4 bg-paper/50 rounded animate-pulse'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
