// ─── Utility Functions ───

// classnames utility - combines class names conditionally
export function cn(...classes: any[]): string {
  return classes.filter(Boolean).join(' ')
}

// debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  // In a real implementation, this would use useState and useEffect
  // For now, we return the value directly (client-side implementation)
  return value
}

// localStorage hook
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // In a real implementation, this would use useState and useEffect
  // For now, we return the initial value and a setter
  const setter = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }
  return [initialValue, setter]
}

// onClickOutside hook
export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void): void {
  // In a real implementation, this would use useEffect
}

// truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// format date
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// time ago
export function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years ago'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months ago'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days ago'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + ' hours ago'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + ' minutes ago'
  }
  return Math.floor(seconds) + ' seconds ago'
}

// get time of day
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 20) return 'evening'
  return 'night'
}

// shuffle array
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// weighted random
export function weightedRandom<T>(items: { item: T; weight: number }[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight
  for (const { item, weight } of items) {
    if (random < weight) return item
    random -= weight
  }
  return items[items.length - 1].item
}

// pick random
export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// random integer
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
