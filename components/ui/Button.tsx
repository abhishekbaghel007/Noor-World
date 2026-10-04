import React from 'react'

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }: { 
  children: React.ReactNode 
  onClick?: () => void
  variant?: 'primary' | 'soft' | 'text' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}) {
  const baseClass = 'rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClass = variant === 'primary' ? 'bg-ink text-white hover:bg-ink/90' : variant === 'soft' ? 'bg-paper border border-line hover:bg-paper/80' : variant === 'text' ? 'text-muted hover:text-ink' : 'bg-paper border border-line hover:bg-paper/80'
  const sizeClass = size === 'sm' ? 'px-3 py-1 text-sm' : size === 'md' ? 'px-4 py-2 text-base' : 'px-6 py-3 text-lg'
  
  return (
    <button 
      className={baseClass + ' ' + variantClass + ' ' + sizeClass + ' ' + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
