import React from 'react'
import { WorldShellContext } from '@/components/world/WorldShell'
import { Section } from '@/ui/Section'
import { Button } from '@/ui/Button'

export default function PlayPage() {
  const { tab, setTab } = React.useContext(WorldShellContext) ?? { tab: 'home', setTab: () => {} }
  
  return (
    <div className='min-h-screen bg-cream text-ink'>
      <Section 
        eyebrow='playground'
        title='Important nonsense.'
        subtitle='Games, quizzes, polls and friend challenges live here.'
      />
      <div className='mt-8'>
        <Button 
          variant='soft' 
          onClick={() => setTab('home')}
          className='mr-4'
        >
          ← Back to Home
        </Button>
        <Button 
          variant='primary' 
          onClick={() => setTab('play')}
        >
          Go to Send →
        </Button>
      </div>
    </div>
  )
}

