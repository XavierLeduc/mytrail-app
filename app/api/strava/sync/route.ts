import { NextRequest, NextResponse } from 'next/server'
import { fetchStravaActivities, refreshStravaToken } from '@/lib/strava'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: integration } = await supabase
    .from('integrations')
    .select()
    .eq('user_id', user.id)
    .eq('provider', 'strava')
    .single()

  if (!integration) return NextResponse.json({ error: 'Strava not connected' }, { status: 400 })

  // Refresh token if expired
  let accessToken = integration.access_token
  if (new Date(integration.expires_at) < new Date()) {
    const refreshed = await refreshStravaToken(integration.refresh_token)
    accessToken = refreshed.access_token
    await supabase.from('integrations').update({
      access_token: refreshed.access_token,
      refresh_token: refreshed.refresh_token,
      expires_at: new Date(refreshed.expires_at * 1000).toISOString(),
    }).eq('user_id', user.id).eq('provider', 'strava')
  }

  const activities = await fetchStravaActivities(accessToken)

  const trail = activities.filter(a =>
    ['TrailRun', 'Run'].includes(a.sport_type ?? a.type)
  )

  if (trail.length > 0) {
    await supabase.from('activities').upsert(
      trail.map(a => ({
        user_id: user.id,
        source: 'strava',
        external_id: a.id.toString(),
        name: a.name,
        distance_m: Math.round(a.distance),
        elevation_m: Math.round(a.total_elevation_gain),
        duration_s: a.moving_time,
        started_at: a.start_date,
        raw_data: a as unknown as Record<string, unknown>,
      })),
      { onConflict: 'user_id,source,external_id' }
    )
  }

  return NextResponse.json({ synced: trail.length })
}
