import { supabase } from './supabase'

interface ScrapedRace {
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
}

/**
 * Fetches races from the UTMB Index API (public endpoint).
 * Returns a normalized list of races to upsert into the DB.
 */
export async function scrapeUTMBIndex(): Promise<ScrapedRace[]> {
  try {
    const res = await fetch('https://utmb.world/api/races?limit=200&lang=fr', {
      headers: { 'Accept': 'application/json', 'User-Agent': 'MyTrail/1.0' },
      next: { revalidate: 0 },
    })
    if (!res.ok) return []
    const data = await res.json()
    const races: ScrapedRace[] = []

    for (const race of (data.races ?? [])) {
      if (!race.name || !race.date || !race.distance) continue
      races.push({
        name: race.name,
        slug: race.slug ?? race.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        distance_km: race.distance,
        elevation_m: race.elevation ?? 0,
        date: race.date,
        location: race.city ?? race.location ?? '',
        country: race.country ?? '',
        region: race.region ?? '',
        itra_points: race.itraPoints ?? null,
        registration_url: race.registrationUrl ?? null,
        latitude: race.lat ?? 0,
        longitude: race.lng ?? 0,
        source: 'utmb',
      })
    }
    return races
  } catch {
    return []
  }
}

/**
 * Upserts scraped races into the Supabase races table,
 * deduplicating by (slug).
 */
export async function upsertRaces(races: ScrapedRace[]): Promise<{ inserted: number; errors: number }> {
  if (races.length === 0) return { inserted: 0, errors: 0 }

  const { error } = await supabase
    .from('races')
    .upsert(races, { onConflict: 'slug', ignoreDuplicates: false })

  if (error) {
    console.error('Upsert error:', error.message)
    return { inserted: 0, errors: races.length }
  }

  return { inserted: races.length, errors: 0 }
}
