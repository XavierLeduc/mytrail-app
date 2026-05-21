'use client'

import { useState, useMemo } from 'react'
import { seedRaces } from '@/data/races'
import { Race } from '@/lib/types'
import ExplorerFilters, { Filters } from '@/components/explorer/ExplorerFilters'
import RaceList from '@/components/explorer/RaceList'
import dynamic from 'next/dynamic'

const RaceMap = dynamic(() => import('@/components/explorer/RaceMap'), { ssr: false })

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

  const handleAdd = (race: Race) => {
    setAddedIds(prev => new Set([...prev, race.id]))
    // TODO: insert into Supabase user_races when auth is set up
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Page header */}
      <div
        style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
        }}
      >
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
          Explorer
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {filtered.length} courses en Europe
        </span>
      </div>

      {/* Filters */}
      <ExplorerFilters filters={filters} onChange={setFilters} countries={countries} />

      {/* Split view */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: list */}
        <div
          style={{
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          <RaceList
            races={filtered}
            selectedId={selectedId}
            addedIds={addedIds}
            onSelect={handleSelect}
            onAdd={handleAdd}
          />
        </div>

        {/* Right: map */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <RaceMap races={filtered} selectedId={selectedId} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  )
}
