const GARMIN_AUTH_BASE = 'https://connect.garmin.com/oauth-service'
const GARMIN_API_BASE = 'https://apis.garmin.com/wellness-api/rest'

export function getGarminAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.GARMIN_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/garmin/callback`,
    response_type: 'code',
    scope: 'ACTIVITY_EXPORT',
  })
  return `${GARMIN_AUTH_BASE}/authorize?${params}`
}

export async function exchangeGarminCode(code: string): Promise<{
  access_token: string
  refresh_token: string
  expires_in: number
}> {
  const res = await fetch(`${GARMIN_AUTH_BASE}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.GARMIN_CLIENT_ID}:${process.env.GARMIN_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/garmin/callback`,
    }),
  })
  if (!res.ok) throw new Error('Failed to exchange Garmin code')
  return res.json()
}

export async function fetchGarminActivities(
  accessToken: string,
  uploadStartTimeInSeconds: number
): Promise<GarminActivity[]> {
  const res = await fetch(
    `${GARMIN_API_BASE}/activities?uploadStartTimeInSeconds=${uploadStartTimeInSeconds}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error('Failed to fetch Garmin activities')
  const data = await res.json()
  return data.activityFiles ?? []
}

export interface GarminActivity {
  activityId: string
  activityName: string
  distanceInMeters: number
  totalElevationGainInMeters: number
  durationInSeconds: number
  startTimeInSeconds: number
  activityType: { typeKey: string }
}
