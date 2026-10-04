// ─── Supabase Browser Client ───

import { createBrowserClient } from '@supabase/ssr'

// Create a Supabase client for browser use (public/anonymouse key only)
export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !anonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(url, anonKey)
}


// Get a singleton instance
let supabaseBrowserClient: ReturnType<typeof supabaseBrowser> | null = null

export function getSupabaseBrowserClient() {
  if (!supabaseBrowserClient) {
    supabaseBrowserClient = supabaseBrowser()
  }
  return supabaseBrowserClient
}
