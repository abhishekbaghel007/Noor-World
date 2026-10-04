import React from 'react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
  className?: string
}

export function Avatar({ 
  src, 
  alt = '', 
  size = 'md', 
  name, 
  className = '' 
}: AvatarProps) {
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }[size]
  
  return (
    <div className={className}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className={'rounded-full ' + sizeClass + ' object-cover border-2 border-line'}
        />
      ) : (
        <div className={'flex items-center justify-center ' + sizeClass + ' bg-ink text-white rounded-full font-medium'}>
          {name ? name.charAt(0).toUpperCase() : '?'}
        </div>
      )}
    </div>
  )
}
