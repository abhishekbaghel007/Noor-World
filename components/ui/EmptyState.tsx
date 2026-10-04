import React from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  emoji?: string
  actionText?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  emoji = '🌻', 
  actionText, 
  onAction, 
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={'text-center py-12' + className}>
      <div className='inline-block mb-4'>
        <span className='text-6xl'>{emoji}</span>
      </div>
      <h3 className='text-2xl font-bold text-ink mb-2'>
        {title}
      </h3>
      {description && (
        <p className='text-lg text-muted mb-6'>
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button 
          className='bg-ink text-white px-6 py-2 rounded-xl hover:bg-ink/90'
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}
