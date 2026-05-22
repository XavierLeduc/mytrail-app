import { NextRequest, NextResponse } from 'next/server'
import { exchangeStravaCode } from '@/lib/strava'
import { createSupabaseServer } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings?error=strava_denied', req.url))
  }

  try {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/login', req.url))

    const tokens = await exchangeStravaCode(code)

    const { error: upsertError } = await supabase.from('integrations').upsert({
      user_id: user.id,
      provider: 'strava',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(tokens.expires_at * 1000).toISOString(),
    }, { onConflict: 'user_id,provider' })

    if (upsertError) {
      console.error('Strava upsert error:', upsertError)
      return NextResponse.redirect(new URL(`/settings?error=${encodeURIComponent(upsertError.message)}`, req.url))
    }

    return NextResponse.redirect(new URL('/settings?success=strava', req.url))
  } catch (err) {
    console.error('Strava callback error:', err)
    return NextResponse.redirect(new URL('/settings?error=strava_failed', req.url))
  }
}
