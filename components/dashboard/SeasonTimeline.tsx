'use client'

import { Race, UserRace } from '@/lib/types'
import { formatMonth, daysUntil, itraColor } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  userRaces: (UserRace & { race: Race })[]
}

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

export default function SeasonTimeline({ userRaces }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const racesByMonth: Record<number, (UserRace & { race: Race })[]> = {}
  userRaces.forEach((ur) => {
    const month = new Date(ur.race.date).getMonth()
    if (!racesByMonth[month]) racesByMonth[month] = []
    racesByMonth[month].push(ur)
  })

  const currentMonth = new Date().getMonth()

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '16px 20px',
      }}
    >
      <div
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 16,
        }}
      >
        Timeline saison 2025
      </div>

      <div style={{ position: 'relative' }}>
        {/* Base line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            background: 'var(--border)',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Month markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {MONTHS.map((month, idx) => {
            const monthRaces = racesByMonth[idx] || []
            const isPast = idx < currentMonth
            const isCurrent = idx === currentMonth
            const hasRace = monthRaces.length > 0
            const topRace = monthRaces[0]
            const size = hasRace ? (topRace.race.distance_km > 100 ? 20 : topRace.race.distance_km > 50 ? 16 : 12) : 8

            return (
              <div key={month} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: isCurrent ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.55rem', marginBottom: 6 }}>
                  {month}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  {hasRace ? (
                    <div
                      onMouseEnter={() => setHovered(topRace.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        background: itraColor(topRace.race.itra_points),
                        border: '2px solid var(--bg-primary)',
                        cursor: 'pointer',
                        boxShadow: hovered === topRace.id ? `0 0 10px ${itraColor(topRace.race.itra_points)}80` : 'none',
                        transition: 'all 0.15s',
                        position: 'relative',
                      }}
                    >
                      {/* Tooltip */}
                      {hovered === topRace.id && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '140%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            borderRadius: 6,
                            padding: '6px 10px',
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                          }}
                        >
                          <div style={{ color: 'var(--text-primary)', fontSize: '0.7rem', fontWeight: 600 }}>
                            {topRace.race.name}
                          </div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: 2 }}>
                            {topRace.race.distance_km}km · {topRace.race.elevation_m.toLocaleString('fr-FR')}m D+
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: isPast ? '#333' : isCurrent ? 'var(--accent-green)' : '#2a2a2a',
                        border: isCurrent ? '2px solid var(--accent-green)' : '1px solid #333',
                      }}
                    />
                  )}
                </div>
                {hasRace && (
                  <div style={{ color: itraColor(topRace.race.itra_points), fontSize: '0.45rem', marginTop: 3, maxWidth: 40, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {topRace.race.name.split(' ')[0]}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
