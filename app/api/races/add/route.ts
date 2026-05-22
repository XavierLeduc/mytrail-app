import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  // Auth check via user session
  const cookieStore = await cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Use service role to bypass RLS for global races table
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Upsert race
  const { data: race, error: raceErr } = await admin
    .from('races')
    .upsert(body.race, { onConflict: 'slug', ignoreDuplicates: false })
    .select('id')
    .single()

  if (raceErr || !race) {
    return NextResponse.json({ error: raceErr?.message ?? 'Failed to insert race' }, { status: 500 })
  }

  // Add to user_races (can use admin here too for simplicity)
  const { error: urErr } = await admin
    .from('user_races')
    .upsert({
      user_id: user.id,
      race_id: race.id,
      status: body.status ?? 'registered',
    }, { onConflict: 'user_id,race_id', ignoreDuplicates: true })

  if (urErr) {
    return NextResponse.json({ error: urErr.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, raceId: race.id })
}
