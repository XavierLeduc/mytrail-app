'use client'

import { Race } from '@/lib/types'
import { formatDistance, formatElevation, formatDate, countryFlag, itraColor } from '@/lib/utils'
import { MapPin, Plus, Check } from 'lucide-react'

interface Props {
  races: Race[]
  selectedId: string | null
  addedIds: Set<string>
  savingId: string | null
  onSelect: (race: Race) => void
  onAdd: (race: Race) => void
}

export default function RaceList({ races, selectedId, addedIds, savingId, onSelect, onAdd }: Props) {
  if (races.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          padding: 32,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🔍</span>
        <p style={{ fontSize: '0.875rem' }}>Aucune course trouvée</p>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
      {races.map(race => {
        const isSelected = selectedId === race.id
        const isAdded = addedIds.has(race.id)
        const isSaving = savingId === race.id

        return (
          <div
            key={race.id}
            onClick={() => onSelect(race)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              borderLeft: `3px solid ${isSelected ? 'var(--accent-green)' : 'transparent'}`,
              background: isSelected ? 'var(--bg-elevated)' : 'transparent',
              transition: 'all 0.1s',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            {/* ITRA dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: itraColor(race.itra_points),
                flexShrink: 0,
                marginTop: 5,
              }}
            />

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {race.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 3,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <MapPin size={10} /> {countryFlag(race.country)} {race.location}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  {formatDistance(race.distance_km)} · {formatElevation(race.elevation_m)}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: 2 }}>
                {formatDate(race.date)}
                {race.itra_points && (
                  <span
                    style={{
                      marginLeft: 8,
                      color: itraColor(race.itra_points),
                      fontWeight: 600,
                    }}
                  >
                    ITRA {race.itra_points}
                  </span>
                )}
              </div>
            </div>

            {/* Add button */}
            <button
              onClick={e => { e.stopPropagation(); if (!isAdded && !isSaving) onAdd(race) }}
              disabled={isAdded || isSaving}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: `1px solid ${isAdded ? 'var(--accent-green)' : 'var(--border)'}`,
                background: isAdded ? 'var(--accent-green)' : 'var(--bg-surface)',
                color: isAdded ? 'var(--bg-primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAdded || isSaving ? 'default' : 'pointer',
                flexShrink: 0,
                opacity: isSaving ? 0.5 : 1,
              }}
            >
              {isSaving ? '…' : isAdded ? <Check size={13} /> : <Plus size={13} />}
            </button>
          </div>
        )
      })}
    </div>
  )
}
