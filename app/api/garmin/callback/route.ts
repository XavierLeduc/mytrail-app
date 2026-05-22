import { NextRequest, NextResponse } from 'next/server'
import { exchangeGarminCode } from '@/lib/garmin'
import { createSupabaseServer } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings?error=garmin_denied', req.url))
  }

  try {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/login', req.url))

    const tokens = await exchangeGarminCode(code)
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await admin.from('integrations').upsert({
      user_id: user.id,
      provider: 'garmin',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
    }, { onConflict: 'user_id,provider' })

    return NextResponse.redirect(new URL('/settings?success=garmin', req.url))
  } catch (err) {
    console.error('Garmin callback error:', err)
    return NextResponse.redirect(new URL('/settings?error=garmin_failed', req.url))
  }
}
