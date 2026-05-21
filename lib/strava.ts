const STRAVA_BASE = 'https://www.strava.com/api/v3'

export function getStravaAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/strava/callback`,
    response_type: 'code',
    scope: 'activity:read_all',
  })
  return `https://www.strava.com/oauth/authorize?${params}`
}

export async function exchangeStravaCode(code: string): Promise<{
  access_token: string
  refresh_token: string
  expires_at: number
  athlete: { id: number; firstname: string }
}> {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  })
  if (!res.ok) throw new Error('Failed to exchange Strava code')
  return res.json()
}

export async function refreshStravaToken(refreshToken: string): Promise<{
  access_token: string
  refresh_token: string
  expires_at: number
}> {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
  if (!res.ok) throw new Error('Failed to refresh Strava token')
  return res.json()
}

export async function fetchStravaActivities(
  accessToken: string,
  page = 1,
  perPage = 100
): Promise<StravaActivity[]> {
  const res = await fetch(
    `${STRAVA_BASE}/athlete/activities?page=${page}&per_page=${perPage}&type=TrailRun`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error('Failed to fetch Strava activities')
  return res.json()
}

export interface StravaActivity {
  id: number
  name: string
  distance: number
  total_elevation_gain: number
  moving_time: number
  start_date: string
  type: string
  sport_type: string
}
