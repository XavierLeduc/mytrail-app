'use client'

export const dynamic = 'force-dynamic'

import { useState, useMemo } from 'react'
import { seedRaces } from '@/data/races'
import { Race } from '@/lib/types'
import ExplorerFilters, { Filters } from '@/components/explorer/ExplorerFilters'
import RaceList from '@/components/explorer/RaceList'
import lazyLoad from 'next/dynamic'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

const RaceMap = lazyLoad(() => import('@/components/explorer/RaceMap'), { ssr: false })

const countries = [...new Set(seedRaces.map(r => r.country))].sort()

const defaultFilters: Filters = {
  search: '',
  country: 'Tous',
  minDist: 0,
  maxDist: 9999,
  minElev: 0,
  maxElev: 99999,
  itraMin: 0,
}

export default function ExplorerPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return seedRaces.filter(race => {
      if (filters.search && !race.name.toLowerCase().includes(filters.search.toLowerCase()) && !race.location.toLowerCase().includes(filters.search.toLowerCase())) return false
      if (filters.country !== 'Tous' && race.country !== filters.country) return false
      if (race.distance_km < filters.minDist || race.distance_km > filters.maxDist) return false
      if (filters.itraMin > 0 && (!race.itra_points || race.itra_points < filters.itraMin)) return false
      return true
    })
  }, [filters])

  const handleSelect = (race: Race) => setSelectedId(race.id === selectedId ? null : race.id)

  const handleAdd = async (race: Race) => {
    setSaving(race.id)
    const supabase = getSupabaseBrowser()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(null); return }

    // Upsert race into global races table first (seed data uses string IDs)
    await supabase.from('races').upsert({
      id: undefined, // let DB generate
      name: race.name,
      slug: race.slug,
      distance_km: race.distance_km,
      elevation_m: race.elevation_m,
      date: race.date,
      location: race.location,
      country: race.country,
      region: race.region,
      itra_points: race.itra_points,
      registration_url: race.registration_url,
      latitude: race.latitude,
      longitude: race.longitude,
      source: race.source,
      description: race.description ?? null,
    }, { onConflict: 'slug', ignoreDuplicates: true })

    // Get the race UUID from DB
    const { data: dbRace } = await supabase
      .from('races')
      .select('id')
      .eq('slug', race.slug)
      .single()

    if (!dbRace) { setSaving(null); return }

    // Add to user's races
    const { error } = await supabase.from('user_races').upsert({
      user_id: user.id,
      race_id: dbRace.id,
      status: 'interested',
    }, { onConflict: 'user_id,race_id', ignoreDuplicates: true })

    if (!error) setAddedIds(prev => new Set([...prev, race.id]))
    setSaving(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
          Explorer
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {filtered.length} courses en Europe
        </span>
      </div>

      <ExplorerFilters filters={filters} onChange={setFilters} countries={countries} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
          <RaceList
            races={filtered}
            selectedId={selectedId}
            addedIds={addedIds}
            savingId={saving}
            onSelect={handleSelect}
            onAdd={handleAdd}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <RaceMap races={filtered} selectedId={selectedId} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  )
}
