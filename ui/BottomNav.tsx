'use client'

import React from 'react'

type Tab = 'home' | 'play' | 'send'
export function BottomNav({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  const items: Array<[Tab,string,string]> = [['home','🌻','home'],['play','🎮','play'],['send','💌','send']]
  return <nav className='nw-bottom-nav' aria-label='Main navigation'>
    {items.map(([tab, icon, label]) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => onTabChange(tab)}>
      <span>{icon}</span><small>{label}</small>
    </button>)}
  </nav>
}
