import React from 'react'

interface TopBarProps {
  className?: string
  onThemeToggle?: () => void
  title?: string
  subtitle?: string
  showBrand?: boolean
}

export function TopBar({ 
  className = '', 
  onThemeToggle, 
  title = 'Noor World', 
  subtitle = 'her little corner of the internet',
  showBrand = true
}: TopBarProps) {
  return (
    <div className={'flex items-center justify-between border-b border-line pb-4' + className}>
      {showBrand && (
        <div className='flex items-center gap-3'>
          <span className='text-3xl'>🌻</span>
          <div>
            <p className='font-semibold'>{title}</p>
            <p className='text-xs text-muted'>{subtitle}</p>
          </div>
        </div>
      )}
      <div className='flex items-center gap-2'>
        <button 
          className='bg-paper border border-line rounded-full p-2 hover:bg-paper/80'
          onClick={onThemeToggle}
          aria-label='Toggle theme'
        >
          {/* This will be replaced by sun/moon based on theme */}
          <span className='text-xl'>🌙</span>
        </button>
      </div>
    </div>
  )
}
