import { NextRequest, NextResponse } from 'next/server'
import { exchangeStravaCode } from '@/lib/strava'
import { createSupabaseServer } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings?error=strava_denied', req.url))
  }

  try {
    // Read session from cookies — keeps user logged in
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/login', req.url))

    const tokens = await exchangeStravaCode(code)

    // Use service role to bypass RLS on integrations table
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await admin.from('integrations').upsert({
      user_id: user.id,
      provider: 'strava',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(tokens.expires_at * 1000).toISOString(),
    }, { onConflict: 'user_id,provider' })

    return NextResponse.redirect(new URL('/settings?success=strava', req.url))
  } catch (err) {
    console.error('Strava callback error:', err)
    return NextResponse.redirect(new URL('/settings?error=strava_failed', req.url))
  }
}
