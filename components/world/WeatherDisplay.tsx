import React, { useState, useEffect } from 'react'
import { fetchWeather } from '@/lib/weather'
import { Loading } from '@/ui/Loading'

interface WeatherDisplayProps {
  className?: string
  lat?: number
  lon?: number
}

export function WeatherDisplay({ 
  className = '', 
  lat, 
  lon 
}: WeatherDisplayProps) {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const latitude = lat ?? 51.5074 // Default to London coordinates
    const longitude = lon ?? -0.1278
    
    const loadWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(latitude, longitude)
        setWeather(data)
      } catch (err) {
        setError('Failed to load weather')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadWeather()
    
    // Update weather every 30 minutes
    const interval = setInterval(loadWeather, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [lat, lon])

  if (loading) {
    return (
      <div className={'p-2 rounded-lg bg-paper/50 backdrop-blur-sm border border-line' + className}>
        <div className='flex items-center space-x-2'>
          <Loading variant='spinner' size='sm' />
          <span className='text-sm'>Loading weather...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={'p-2 rounded-lg bg-red-50 border border-red-200' + className}>
        <div className='flex items-center space-x-2'>
          <span className='text-red-500'>⚠️</span>
          <span className='text-sm'>{error}</span>
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className={'p-2 rounded-lg bg-paper/50 backdrop-blur-sm border border-line' + className}>
        <div className='flex items-center space-x-2'>
          <span className='text-xs'>–</span>
          <span className='text-xs'>–°</span>
        </div>
      </div>
    )
  }

  const { current } = weather
  const condition = current.condition
  
  // Get weather emoji and color
  let emoji = '☁️'
  let color = '#a0aec0'
  if (condition === 'sunny') { emoji = '☀️'; color = '#f4c94b' }
  else if (condition === 'partly-cloudy') { emoji = '⛅'; color = '#f6ad55' }
  else if (condition === 'rainy') { emoji = '🌧️'; color = '#63b3ed' }
  else if (condition === 'snowy') { emoji = '❄️'; color = '#bee3f8' }
  else if (condition === 'stormy') { emoji = '⛈️'; color = '#fc8181' }
  else if (condition === 'clear') { emoji = '🌙'; color = '#fbd38d' }

  return (
    <div className={'p-2 rounded-lg bg-paper/50 backdrop-blur-sm border border-line' + className}>
      <div className='flex items-center space-x-2'>
        <span className={'text-2xl ' + color}>{emoji}</span>
        <div className='space-y-1'>
          <div className='flex items-baseline'>
            <span className='text-lg font-medium'>{Math.round(current.temperature)}°</span>
            <span className='text-xs text-muted ml-1'>feels like {Math.round(current.temperature)}°</span>
          </div>
          <p className='text-xs text-muted capitalize'>{condition}</p>
        </div>
      </div>
    </div>
  )
}
