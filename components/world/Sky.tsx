import React, { useEffect, useState } from 'react'
import { getTimeOfDay } from '../../lib/utils'

interface SkyProps {
  className?: string
}

export function Sky({ className = '' }: SkyProps) {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning')

  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay())
    }
    
    // Update every minute to catch time of day changes
    const interval = setInterval(updateTimeOfDay, 60 * 1000)
    updateTimeOfDay() // Initial call
    
    return () => clearInterval(interval)
  }, [])

  // Define sky colors for each time of day
  const skyStyles = {
    morning: {
      background: 'linear-gradient(to bottom, #fff9e9, #f0e6d2)',
      sunMoon: '☀️',
      sunMoonClass: 'text-yellow-400'
    },
    afternoon: {
      background: 'linear-gradient(to bottom, #fff9e9, #e8f4fd)',
      sunMoon: '☀️',
      sunMoonClass: 'text-yellow-300'
    },
    evening: {
      background: 'linear-gradient(to bottom, #fff9e9, #fdefcf)',
      sunMoon: '🌅',
      sunMoonClass: 'text-orange-400'
    },
    night: {
      background: 'linear-gradient(to bottom, #18231d, #0f1a15)',
      sunMoon: '🌙',
      sunMoonClass: 'text-yellow-200'
    }
  }[timeOfDay]

  return (
    <div className={'fixed inset-0 z-0 pointer-events-none' + className} style={{ background: skyStyles.background }}>
      {/* Clouds will be added separately */}
      {/* Stars and fireflies for night */}
      {timeOfDay === 'night' && (
        <>
          {/* Stars */}
          <div className='absolute inset-0'>
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className={'absolute ' + Math.random() * 100 + '% ' + Math.random() * 100 + '% text-xs text-white/50'}
                style={{
                  animationDelay: Math.random() * 5 + 's',
                  animationDuration: Math.random() * 3 + 2 + 's'
                }}
              >
                ✨
              </div>
            ))}
          </div>
          
          {/* Fireflies */}
          <div className='absolute inset-0'>
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className={'absolute ' + Math.random() * 100 + '% ' + Math.random() * 100 + '% text-xs'}
                style={{
                  animation: 'firefly ' + (Math.random() * 3 + 2) + 's ease-in-out infinite',
                  animationDelay: Math.random() * 5 + 's'
                }}
              >
                <span className='text-yellow-300'>🟡</span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Sun/Moon */}
      <div className={'absolute top-4 right-4 text-5xl ' + skyStyles.sunMoonClass + ' transition-opacity duration-300'}>
        {skyStyles.sunMoon}
      </div>
    </div>
  )
}
