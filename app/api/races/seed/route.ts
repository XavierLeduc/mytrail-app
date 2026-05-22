import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { seedRaces } from '@/data/races'

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const rows = seedRaces.map(r => ({
    name: r.name,
    slug: r.slug,
    distance_km: r.distance_km,
    elevation_m: r.elevation_m,
    date: r.date,
    location: r.location,
    country: r.country,
    region: r.region,
    itra_points: r.itra_points,
    registration_url: r.registration_url,
    latitude: r.latitude,
    longitude: r.longitude,
    source: r.source,
    description: r.description ?? null,
  }))

  let inserted = 0
  let errors = 0
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50)
    const { error } = await supabase
      .from('races')
      .upsert(batch, { onConflict: 'slug', ignoreDuplicates: false })
    if (error) { errors += batch.length; console.error('Seed upsert error:', error.message) }
    else inserted += batch.length
  }

  return NextResponse.json({ ok: true, total: rows.length, inserted, errors })
}
