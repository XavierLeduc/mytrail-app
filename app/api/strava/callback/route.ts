import { NextRequest, NextResponse } from 'next/server'
import { exchangeStravaCode } from '@/lib/strava'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings?error=strava_denied', req.url))
  }

  try {
    const tokens = await exchangeStravaCode(code)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/login', req.url))

    // Upsert integration
    await supabase.from('integrations').upsert({
      user_id: user.id,
      provider: 'strava',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(tokens.expires_at * 1000).toISOString(),
    }, { onConflict: 'user_id,provider' })

    return NextResponse.redirect(new URL('/settings?success=strava', req.url))
  } catch {
    return NextResponse.redirect(new URL('/settings?error=strava_failed', req.url))
  }
}
