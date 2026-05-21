'use client'

import { useState } from 'react'
import { seedRaces } from '@/data/races'
import { UserRace } from '@/lib/types'
import { formatDate, daysUntil, itraColor, countryFlag } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

const r5 = { ...seedRaces.find(r => r.id === '5')!, date: '2026-06-08' }
const r1 = { ...seedRaces.find(r => r.id === '1')!, date: '2026-08-25' }
const r7 = { ...seedRaces.find(r => r.id === '7')!, date: '2026-09-07' }

const mockUserRaces: UserRace[] = [
  { id: 'ur1', user_id: 'u1', race_id: '5', status: 'registered', notes: null, created_at: '2026-01-01', race: r5 },
  { id: 'ur2', user_id: 'u1', race_id: '1', status: 'registered', notes: null, created_at: '2026-01-01', race: r1 },
  { id: 'ur3', user_id: 'u1', race_id: '7', status: 'interested', notes: null, created_at: '2026-01-01', race: r7 },
]

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const MONTH_SHORT = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

export default function CalendarPage() {
  const [selectedRace, setSelectedRace] = useState<UserRace | null>(null)
  const year = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const racesByMonth: Record<number, UserRace[]> = {}
  mockUserRaces.forEach(ur => {
    const month = new Date(ur.race.date).getMonth()
    if (!racesByMonth[month]) racesByMonth[month] = []
    racesByMonth[month].push(ur)
  })

  return (
    <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Calendrier {year}
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {mockUserRaces.length} course{mockUserRaces.length > 1 ? 's' : ''} planifiée{mockUserRaces.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid 4x3 months */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {MONTHS.map((monthName, idx) => {
          const races = racesByMonth[idx] || []
          const isPast = idx < currentMonth
          const isCurrent = idx === currentMonth

          return (
            <div
              key={monthName}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${isCurrent ? 'var(--accent-green)' : 'var(--border)'}`,
                borderRadius: 10,
                padding: 14,
                minHeight: 120,
                opacity: isPast && races.length === 0 ? 0.4 : 1,
              }}
            >
              <div
                style={{
                  color: isCurrent ? 'var(--accent-green)' : isPast ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: isCurrent ? 700 : 500,
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {MONTH_SHORT[idx]}
                {isCurrent && <span style={{ marginLeft: 4, fontSize: '0.55rem', color: 'var(--accent-green)' }}>◉</span>}
              </div>

              {races.length === 0 ? (
                <div style={{ color: 'var(--border)', fontSize: '0.65rem', fontStyle: 'italic' }}>—</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {races.map(ur => (
                    <div
                      key={ur.id}
                      onClick={() => setSelectedRace(selectedRace?.id === ur.id ? null : ur)}
                      style={{
                        background: selectedRace?.id === ur.id ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                        borderLeft: `3px solid ${itraColor(ur.race.itra_points)}`,
                        borderRadius: '0 5px 5px 0',
                        padding: '5px 8px',
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                      }}
                    >
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.2 }}>
                        {ur.race.name.length > 20 ? ur.race.name.substring(0, 18) + '…' : ur.race.name}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: 2 }}>
                        {new Date(ur.race.date).getDate()} {MONTH_SHORT[idx]} · {ur.race.distance_km}km
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      {selectedRace && (
        <div
          style={{
            marginTop: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: itraColor(selectedRace.race.itra_points) }} />
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                  {selectedRace.race.name}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  {countryFlag(selectedRace.race.country)} {selectedRace.race.location}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  {formatDate(selectedRace.race.date)}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  {selectedRace.race.distance_km}km · {selectedRace.race.elevation_m.toLocaleString('fr-FR')}m D+
                </span>
                {selectedRace.race.itra_points && (
                  <span style={{ color: itraColor(selectedRace.race.itra_points), fontSize: '0.78rem', fontWeight: 600 }}>
                    ITRA {selectedRace.race.itra_points}
                  </span>
                )}
              </div>
              {selectedRace.race.description && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 10, maxWidth: 600, lineHeight: 1.5 }}>
                  {selectedRace.race.description}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              {daysUntil(selectedRace.race.date) > 0 && (
                <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 700 }}>
                  J−{daysUntil(selectedRace.race.date)}
                </span>
              )}
              {selectedRace.race.registration_url && (
                <a
                  href={selectedRace.race.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--accent-green)',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    border: '1px solid var(--accent-green)',
                    borderRadius: 6,
                    padding: '5px 10px',
                  }}
                >
                  <ExternalLink size={12} /> S'inscrire
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
