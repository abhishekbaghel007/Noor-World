import React from 'react'

interface CardProps {
  children: React.ReactNode
  variant?: 'base' | 'interactive' | 'glass' | 'elevated'
  className?: string
  onClick?: () => void
}

export function Card({ children, variant = 'base', className = '', onClick }: CardProps) {
  const baseClass = 'rounded-3xl border border-line bg-paper'
  const variantClass = {
    base: '',
    interactive: 'hover:bg-paper/80 transition-colors duration-200 cursor-pointer',
    glass: 'bg-paper/80 backdrop-blur-sm border border-line/50',
    elevated: 'shadow-lg'
  }[variant]
  
  const classNames = baseClass + ' ' + variantClass + ' ' + className
  
  return (
    <div 
      className={classNames.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      {children}
    </div>
  )
}
