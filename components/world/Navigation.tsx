import React from 'react'

interface NavigationProps {
  items: Array<{ 
    label: string 
    icon?: string 
    onClick: () => void 
    disabled?: boolean 
  }>
  className?: string
}

export function Navigation({ items, className = '' }: NavigationProps) {
  return (
    <div className={'flex flex-wrap gap-2 mb-6' + className}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          disabled={item.disabled}
          className={
            'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200' +
            (item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-paper/80')
          }
        >
          {item.icon && <span className='mr-1'>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  )
}
