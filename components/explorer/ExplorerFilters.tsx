'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

export interface Filters {
  search: string
  country: string
  minDist: number
  maxDist: number
  minElev: number
  maxElev: number
  itraMin: number
}

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  countries: string[]
}

const COUNTRIES_ALL = 'Tous'

export default function ExplorerFilters({ filters, onChange, countries }: Props) {
  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        <Search size={14} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Rechercher une course..."
          value={filters.search}
          onChange={e => set({ search: e.target.value })}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
          }}
        />
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <SlidersHorizontal size={13} color="var(--text-muted)" />

        {/* Country */}
        <select
          value={filters.country}
          onChange={e => set({ country: e.target.value })}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '4px 8px',
            color: filters.country !== COUNTRIES_ALL ? 'var(--accent-green)' : 'var(--text-muted)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value={COUNTRIES_ALL}>Tous les pays</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Distance chips */}
        {[
          { label: '< 50km', min: 0, max: 50 },
          { label: '50–100km', min: 50, max: 100 },
          { label: '100km+', min: 100, max: 9999 },
        ].map(({ label, min, max }) => {
          const active = filters.minDist === min && filters.maxDist === max
          return (
            <button
              key={label}
              onClick={() => set(active ? { minDist: 0, maxDist: 9999 } : { minDist: min, maxDist: max })}
              style={{
                background: active ? 'var(--accent-green)' : 'var(--bg-surface)',
                border: `1px solid ${active ? 'var(--accent-green)' : 'var(--border)'}`,
                borderRadius: 6,
                padding: '4px 10px',
                color: active ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: active ? 600 : 400,
              }}
            >
              {label}
            </button>
          )
        })}

        {/* ITRA */}
        {[3, 4, 5, 6].map(pts => {
          const active = filters.itraMin === pts
          return (
            <button
              key={pts}
              onClick={() => set({ itraMin: active ? 0 : pts })}
              style={{
                background: active ? 'var(--accent-gold)' : 'var(--bg-surface)',
                border: `1px solid ${active ? 'var(--accent-gold)' : 'var(--border)'}`,
                borderRadius: 6,
                padding: '4px 8px',
                color: active ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontWeight: active ? 700 : 400,
              }}
            >
              ITRA {pts}+
            </button>
          )
        })}
      </div>
    </div>
  )
}
