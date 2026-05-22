export type RaceStatus = 'interested' | 'registered' | 'completed'

export interface Race {
  id: string
  name: string
  slug: string
  distance_km: number
  elevation_m: number
  date: string
  location: string
  country: string
  region: string
  itra_points: number | null
  registration_url: string | null
  latitude: number
  longitude: number
  source: string
  description?: string
  created_at: string
}

export interface RaceResult {
  ft?: number  // finish time in seconds
  or?: number  // overall rank
  tf?: number  // total finishers
  cr?: number  // category rank
  ct?: number  // category total
}

export interface UserRace {
  id: string
  user_id: string
  race_id: string
  status: RaceStatus
  notes: string | null
  created_at: string
  race: Race
}

export interface Activity {
  id: string
  user_id: string
  source: 'strava' | 'garmin'
  external_id: string
  name: string
  distance_m: number
  elevation_m: number
  duration_s: number
  started_at: string
  avg_hr?: number
}

export interface Integration {
  id: string
  user_id: string
  provider: 'strava' | 'garmin'
  access_token: string
  refresh_token: string
  expires_at: string
}
