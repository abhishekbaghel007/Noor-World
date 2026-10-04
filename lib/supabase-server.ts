// ─── Supabase Server Client ───

import { createClient } from '@supabase/supabase-js'

// Create a Supabase client for server-side use (service role)
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(url, serviceRoleKey)
}


// Get a singleton instance
let supabaseServerClient: ReturnType<typeof createSupabaseServerClient> | null = null

export function getSupabaseServerClient() {
  if (!supabaseServerClient) {
    supabaseServerClient = createSupabaseServerClient()
  }
  return supabaseServerClient
}


// Re-export the browser client for convenience
export { supabaseBrowser } from './supabase-browser'
