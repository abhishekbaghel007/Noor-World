'use client'

import React from 'react'

export function TopBar({ onThemeToggle, title, subtitle }: { onThemeToggle: () => void; title: string; subtitle: string }) {
  return <header className='nw-topbar'>
    <div className='nw-brand'>
      <span className='nw-brand-mark'>🌻</span>
      <div><strong>{title}</strong><span>{subtitle}</span></div>
    </div>
    <button className='nw-icon-button' onClick={onThemeToggle} aria-label='Toggle theme'>☼</button>
  </header>
}
