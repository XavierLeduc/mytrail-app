import { NextRequest, NextResponse } from 'next/server'
import { exchangeGarminCode } from '@/lib/garmin'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings?error=garmin_denied', req.url))
  }

  try {
    const tokens = await exchangeGarminCode(code)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/login', req.url))

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

    await supabase.from('integrations').upsert({
      user_id: user.id,
      provider: 'garmin',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
    }, { onConflict: 'user_id,provider' })

    return NextResponse.redirect(new URL('/settings?success=garmin', req.url))
  } catch {
    return NextResponse.redirect(new URL('/settings?error=garmin_failed', req.url))
  }
}
