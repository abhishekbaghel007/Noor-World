import React, { useState, useEffect, useContext } from 'react'
import { BottomNav } from '@/ui/BottomNav'
import { TopBar } from '@/ui/TopBar'
import { ToastProvider, useToast } from '@/ui/Toast'
import { supabaseBrowser } from '@/lib/supabase-browser'

interface WorldShellProps {
  children: React.ReactNode
}

interface WorldShellContextType {
  tab: 'home' | 'play' | 'send'
  setTab: (tab: 'home' | 'play' | 'send') => void
  nightMode: boolean
  toggleNightMode: () => void
}

const WorldShellContext = React.createContext<WorldShellContextType | null>(null)

export function WorldShell({ children }: WorldShellProps) {
  const [tab, setTab] = useState<'home' | 'play' | 'send'>('home')
  const [nightMode, setNightMode] = useState<boolean>(false)
  const toast = useToast()

  // Check for saved preferences
  useEffect(() => {
    const savedTab = localStorage.getItem('world-tab') as 'home' | 'play' | 'send' | null
    if (savedTab) {
      setTab(savedTab)
    }
    
    const savedNightMode = localStorage.getItem('world-night-mode') === 'true'
    if (savedNightMode !== undefined) {
      setNightMode(savedNightMode)
    }
  }, [])

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('world-tab', tab)
  }, [tab])
  
  useEffect(() => {
    localStorage.setItem('world-night-mode', nightMode.toString())
  }, [nightMode])

  return (
    <WorldShellContext.Provider value={{ tab, setTab, nightMode, toggleNightMode: () => setNightMode(!nightMode) }}>
      <ToastProvider>
        <div className={'min-h-screen bg-' + (nightMode ? '#18231d' : '#fff9e9') + ' text-' + (nightMode ? '#f9f0df' : '#493c34') + ' transition-colors duration-300'}>
          <TopBar 
            onThemeToggle={() => setNightMode(!nightMode)} 
            title='Noor World'
            subtitle='her little corner of the internet'
          />
          <main className='flex-1 px-4 sm:px-6 lg:px-8 pb-12'>
            {children}
          </main>
          <BottomNav 
            activeTab={tab} 
            onTabChange={setTab} 
          />
        </div>
      </ToastProvider>
    </WorldShellContext.Provider>
  )
}

export function useWorldShell() {
  const context = React.useContext(WorldShellContext)
  if (!context) {
    throw new Error('useWorldShell must be used within a WorldShellProvider')
  }
  return context
}

export { WorldShellContext }

