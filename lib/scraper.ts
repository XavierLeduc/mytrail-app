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

function makeSlug(name: string, date: string): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-')}-${date}`
}

/**
 * ITRA Race Calendar API — biggest trail running database
 * https://itra.run
 */
export async function scrapeITRA(): Promise<ScrapedRace[]> {
  try {
    // ITRA has a public search endpoint used by their website
    const res = await fetch(
      'https://itra.run/api/Race/GetRaces?pageIndex=0&pageSize=500&continentId=3', // Europe
      { headers: { 'Accept': 'application/json', 'User-Agent': 'MyTrail/1.0' }, next: { revalidate: 0 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    const races: ScrapedRace[] = []

    for (const r of (data.races ?? data.items ?? data ?? [])) {
      if (!r.name || !r.date || !r.distance) continue
      races.push({
        name: r.name,
        slug: makeSlug(r.name, r.date?.substring(0, 10) ?? ''),
        distance_km: r.distance ?? r.distanceKm ?? 0,
        elevation_m: r.positiveElevation ?? r.elevation ?? 0,
        date: r.date?.substring(0, 10) ?? '',
        location: r.city ?? r.location ?? '',
        country: r.country ?? r.countryName ?? '',
        region: r.region ?? '',
        itra_points: r.itraPoints ?? r.points ?? null,
        registration_url: r.website ?? r.registrationUrl ?? null,
        latitude: r.latitude ?? r.lat ?? 0,
        longitude: r.longitude ?? r.lng ?? 0,
        source: 'itra',
      })
    }
    return races
  } catch {
    return []
  }
}

/**
 * UTMB Index — courses du réseau UTMB World Series
 */
export async function scrapeUTMBIndex(): Promise<ScrapedRace[]> {
  try {
    const res = await fetch('https://utmb.world/api/races?limit=500&lang=fr', {
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
        slug: makeSlug(race.name, race.date?.substring(0, 10) ?? ''),
        distance_km: race.distance,
        elevation_m: race.elevation ?? 0,
        date: race.date?.substring(0, 10) ?? '',
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
 * LiveTrail — plateforme française, centaines de courses
 * https://livetrail.net
 */
export async function scrapeLiveTrail(): Promise<ScrapedRace[]> {
  try {
    // LiveTrail exposes a JSON endpoint for their race list
    const res = await fetch('https://livetrail.net/api/races', {
      headers: { 'Accept': 'application/json', 'User-Agent': 'MyTrail/1.0' },
      next: { revalidate: 0 },
    })
    if (!res.ok) return []
    const data = await res.json()
    const races: ScrapedRace[] = []

    for (const r of (Array.isArray(data) ? data : data.races ?? [])) {
      if (!r.name || !r.date) continue
      races.push({
        name: r.name,
        slug: makeSlug(r.name, r.date?.substring(0, 10) ?? ''),
        distance_km: r.distance ?? r.dist ?? 0,
        elevation_m: r.elevation ?? r.dplus ?? 0,
        date: r.date?.substring(0, 10) ?? '',
        location: r.city ?? r.lieu ?? '',
        country: r.country ?? 'France',
        region: r.region ?? '',
        itra_points: r.itra ?? null,
        registration_url: r.url ?? r.website ?? null,
        latitude: r.lat ?? 0,
        longitude: r.lng ?? 0,
        source: 'livetrail',
      })
    }
    return races
  } catch {
    return []
  }
}

/**
 * Run all scrapers and combine results.
 * Called by /api/races/scrape (Vercel Cron daily).
 */
export async function scrapeAll(): Promise<ScrapedRace[]> {
  const [itra, utmb, livetrail] = await Promise.allSettled([
    scrapeITRA(),
    scrapeUTMBIndex(),
    scrapeLiveTrail(),
  ])

  const all: ScrapedRace[] = []
  if (itra.status === 'fulfilled') all.push(...itra.value)
  if (utmb.status === 'fulfilled') all.push(...utmb.value)
  if (livetrail.status === 'fulfilled') all.push(...livetrail.value)

  // Deduplicate by slug
  const seen = new Set<string>()
  return all.filter(r => {
    if (!r.slug || !r.date || seen.has(r.slug)) return false
    seen.add(r.slug)
    return true
  })
}

/**
 * Upserts scraped races into the Supabase races table.
 */
export async function upsertRaces(races: ScrapedRace[]): Promise<{ inserted: number; errors: number }> {
  if (races.length === 0) return { inserted: 0, errors: 0 }

  // Batch by 100 to avoid payload limits
  let inserted = 0
  let errors = 0
  for (let i = 0; i < races.length; i += 100) {
    const batch = races.slice(i, i + 100)
    const { error } = await supabase
      .from('races')
      .upsert(batch, { onConflict: 'slug', ignoreDuplicates: false })
    if (error) { errors += batch.length; console.error('Upsert error:', error.message) }
    else inserted += batch.length
  }
  return { inserted, errors }
}
