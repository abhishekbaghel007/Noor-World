import React from 'react'

interface BottomNavProps {
  activeTab: 'home' | 'play' | 'send'
  onTabChange: (tab: 'home' | 'play' | 'send') => void
  className?: string
}

export function BottomNav({ activeTab, onTabChange, className = '' }: BottomNavProps) {
  const tabs = [
    { id: 'home', emoji: '🌻', label: 'Home' },
    { id: 'play', emoji: '🎮', label: 'Play' },
    { id: 'send', emoji: '💌', label: 'Send' }
  ]
  
  return (
    <nav className={'fixed left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-paper/80 backdrop-blur-sm border-t border-line p-2 space-x-4' + className}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as 'home' | 'play' | 'send')}
          className={
            'flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200' +
            (activeTab === tab.id ? 'bg-pink-100' : 'hover:bg-paper/80')
          }
          aria-label={tab.label}
        >
          <span className='text-2xl'>{tab.emoji}</span>
          <span className='text-xs mt-1'>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
