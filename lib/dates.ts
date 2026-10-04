// ─── Date Helpers ───

import { getTimeOfDay } from './utils'

// Check if a date is today's birthday
export function isBirthday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth()
}

// Format date for display
export function formatDisplayDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Check if two dates are the same day
export function isSameDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear()
}

// Days between two dates
export function daysSince(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const timeDiff = today.getTime() - date.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// Get time of day (re-export from utils)
export { getTimeOfDay } from './utils'
