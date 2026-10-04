// ─── Weather Helpers ───

export type WeatherCondition =
  | 'sunny'
  | 'cloudy'
  | 'partly-cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'clear'
  | 'foggy';

// Map Open-Meteo weather codes to our conditions
// Based on WMO weather interpretation codes (WW)
export function mapWeatherCode(code: number): WeatherCondition {
  if (code === 0) return 'clear'
  if ([1, 2, 3].includes(code)) return 'partly-cloudy'
  if ([45, 48].includes(code)) return 'foggy'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy'
  if ([95, 96, 99].includes(code)) return 'stormy'
  return 'cloudy' // default fallback
}

// Get emoji for weather condition
export function weatherEmoji(condition: WeatherCondition): string {
  switch (condition) {
    case 'sunny': return '☀️'
    case 'cloudy': return '☁️'
    case 'partly-cloudy': return '⛅'
    case 'rainy': return '🌧️'
    case 'snowy': return '❄️'
    case 'stormy': return '⛈️'
    case 'clear': return '🌙'
    case 'foggy': return '🌫️'
    default: return '☁️'
  }
}

// Get description for weather condition
export function weatherDescription(condition: WeatherCondition): string {
  switch (condition) {
    case 'sunny': return 'Sunny'
    case 'cloudy': return 'Cloudy'
    case 'partly-cloudy': return 'Partly cloudy'
    case 'rainy': return 'Rainy'
    case 'snowy': return 'Snowy'
    case 'stormy': return 'Stormy'
    case 'clear': return 'Clear'
    case 'foggy': return 'Foggy'
    default: return 'Cloudy'
  }
}

// Get color for weather condition (for UI)
export function weatherColor(condition: WeatherCondition): string {
  switch (condition) {
    case 'sunny': return '#f4c94b' // yellow
    case 'cloudy': return '#a0aec0' // gray
    case 'partly-cloudy': return '#f6ad55' // orange
    case 'rainy': return '#63b3ed' // blue
    case 'snowy': return '#bee3f8' // light blue
    case 'stormy': return '#fc8181' // red
    case 'clear': return '#fbd38d' // light yellow
    case 'foggy': return '#9ca3af' // gray-400
    default: return '#a0aec0'
  }
}

// Get suggested mood based on weather
export function weatherMood(condition: WeatherCondition): 'just-because' | 'happy' | 'laugh' | 'hug' | 'difficult' | 'no-reason' {
  switch (condition) {
    case 'sunny': return 'happy'
    case 'cloudy': return 'just-because'
    case 'partly-cloudy': return 'just-because'
    case 'rainy': return 'difficult'
    case 'snowy': return 'just-because'
    case 'stormy': return 'difficult'
    case 'clear': return 'just-because'
    case 'foggy': return 'just-because'
    default: return 'just-because'
  }
}

// Fetch weather from Open-Meteo (free API, no key needed)
export async function fetchWeather(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto'
    )
    if (!response.ok) throw new Error('Failed to fetch weather')
    const data = await response.json()
    return {
      current: {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
        condition: mapWeatherCode(data.current_weather.weathercode)
      },
      daily: data.daily ? data.daily.map((item: any, index: number) => ({
        date: data.daily.time[index],
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weathercode: data.daily.weathercode[index],
        condition: mapWeatherCode(data.daily.weathercode[index])
      })) : []
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    // Return fallback data
    return {
      current: {
        temperature: 20,
        windspeed: 5,
        weathercode: 0
      }
    }
  }
}

// Get user's current location
export function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        reject(error)
      }
    )
  });
}

// Re-export from utils for convenience
export { formatDisplayDate } from './dates'

