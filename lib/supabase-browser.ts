'use client'

import { createBrowserClient } from '@supabase/ssr'

let _browser: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowser() {
  if (_browser) return _browser
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase env vars')
  }
  _browser = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  return _browser
}
