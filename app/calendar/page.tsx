'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useMemo } from 'react'
import { UserRace } from '@/lib/types'
import { formatDate, daysUntil, itraColor, countryFlag } from '@/lib/utils'
import { ExternalLink, AlertTriangle } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import Link from 'next/link'

const MONTH_SHORT = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

type Priority = 'A' | 'B' | 'C' | null
type Phase = 'base' | 'build' | 'peak' | 'taper' | 'race' | 'recovery'

function getPriority(notes: string | null): Priority {
  if (notes === 'A' || notes === 'B' || notes === 'C') return notes
  return null
}

const phaseConfig: Record<Phase, { bg: string; border: string; label: string; color: string }> = {
  base:     { bg: '#1a1a22', border: '#2a2a38', label: 'Base',    color: '#555577' },
  build:    { bg: '#0d1f35', border: '#1a3a5c', label: 'Build',   color: '#4a80b8' },
  peak:     { bg: '#2a1800', border: '#5c3000', label: 'Peak',    color: '#c07820' },
  taper:    { bg: '#0d2010', border: '#1a4020', label: 'Taper',   color: '#4a9f6a' },
  race:     { bg: '#0a2010', border: '#6fcf97', label: 'Course',  color: '#6fcf97' },
  recovery: { bg: '#2a0d0d', border: '#5c1a1a', label: 'Récup',   color: '#c04040' },
}

const priorityConfig = {
  A: { bg: '#3a2800', border: '#f2c94c', color: '#f2c94c', label: 'A-Race' },
  B: { bg: '#0d2010', border: '#6fcf97', color: '#6fcf97', label: 'Prépa' },
  C: { bg: '#1a1a22', border: '#555577', color: '#888899', label: 'Fun' },
}

function computePhases(userRaces: UserRace[], year: number): Phase[] {
  const phases: Phase[] = new Array(12).fill('base') as Phase[]

  const aRaces = userRaces
    .filter(ur => getPriority(ur.notes) === 'A' && new Date(ur.race.date).getFullYear() === year)
    .sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime())

  for (const ur of aRaces) {
    const m = new Date(ur.race.date).getMonth()
    phases[m] = 'race'
    if (m + 1 < 12) phases[m + 1] = 'recovery'
    if (m - 1 >= 0 && phases[m - 1] === 'base') phases[m - 1] = 'taper'
    if (m - 2 >= 0 && phases[m - 2] === 'base') phases[m - 2] = 'peak'
    if (m - 3 >= 0 && phases[m - 3] === 'base') phases[m - 3] = 'build'
    if (m - 4 >= 0 && phases[m - 4] === 'base') phases[m - 4] = 'build'
  }

  return phases
}

function detectConflicts(userRaces: UserRace[]): Set<string> {
  const significant = userRaces
    .filter(ur => getPriority(ur.notes) === 'A' || getPriority(ur.notes) === 'B')
    .sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime())

  const conflictIds = new Set<string>()
  for (let i = 0; i < significant.length - 1; i++) {
    const diff = (new Date(significant[i + 1].race.date).getTime() - new Date(significant[i].race.date).getTime()) / 86400000
    if (diff < 21) {
      conflictIds.add(significant[i].id)
      conflictIds.add(significant[i + 1].id)
    }
  }
  return conflictIds
}

export default function CalendarPage() {
  const [userRaces, setUserRaces] = useState<UserRace[]>([])
  const [selectedRace, setSelectedRace] = useState<UserRace | null>(null)
  const [loading, setLoading] = useState(true)
  const year = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data } = await supabase
        .from('user_races')
        .select('*, race:races(*)')
        .eq('user_id', user.id)
      setUserRaces((data ?? []) as UserRace[])
      setLoading(false)
    }
    load()
  }, [])

  const updatePriority = async (id: string, next: Priority) => {
    const supabase = getSupabaseBrowser()
    await supabase.from('user_races').update({ notes: next }).eq('id', id)
    setUserRaces(prev => prev.map(ur => ur.id === id ? { ...ur, notes: next } : ur))
    setSelectedRace(prev => prev?.id === id ? { ...prev, notes: next } : prev)
  }

  const cyclePriority = (id: string, current: Priority) => {
    const next: Priority = current === null ? 'A' : current === 'A' ? 'B' : current === 'B' ? 'C' : null
    updatePriority(id, next)
  }

  const phases = useMemo(() => computePhases(userRaces, year), [userRaces, year])
  const conflicts = useMemo(() => detectConflicts(userRaces), [userRaces])

  const racesByMonth: Record<number, UserRace[]> = {}
  userRaces.forEach(ur => {
    const month = new Date(ur.race.date).getMonth()
    if (!racesByMonth[month]) racesByMonth[month] = []
    racesByMonth[month].push(ur)
  })

  const hasAnyPriority = userRaces.some(ur => getPriority(ur.notes) !== null)
  const aRaces = userRaces.filter(ur => getPriority(ur.notes) === 'A').sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime())

  return (
    <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Calendrier {year}
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {userRaces.length} course{userRaces.length > 1 ? 's' : ''} planifiée{userRaces.length > 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>Chargement...</div>
      ) : (
        <>
          {/* Season Timeline Strip */}
          {userRaces.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Planification de saison
                </span>
                {!hasAnyPriority && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontStyle: 'italic' }}>
                    — clique sur une course pour définir sa priorité A/B/C
                  </span>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, borderRadius: 8, overflow: 'hidden' }}>
                {phases.map((phase, idx) => {
                  const cfg = phaseConfig[phase]
                  const isCurrent = idx === currentMonth
                  const monthRaces = racesByMonth[idx] || []
                  const hasArace = monthRaces.some(ur => getPriority(ur.notes) === 'A')
                  return (
                    <div
                      key={idx}
                      style={{
                        background: cfg.bg,
                        border: `1px solid ${isCurrent ? 'var(--accent-green)' : cfg.border}`,
                        borderRadius: 5,
                        padding: '6px 4px',
                        textAlign: 'center',
                        position: 'relative',
                      }}
                    >
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.5rem', marginBottom: 2 }}>{MONTH_SHORT[idx]}</div>
                      <div style={{ color: cfg.color, fontSize: '0.52rem', fontWeight: 600 }}>{cfg.label}</div>
                      {hasArace && (
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f2c94c', margin: '3px auto 0' }} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
                {(Object.entries(phaseConfig) as [Phase, typeof phaseConfig[Phase]][]).map(([phase, cfg]) => (
                  <div key={phase} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: cfg.bg, border: `1px solid ${cfg.border}` }} />
                    <span style={{ color: cfg.color, fontSize: '0.6rem' }}>{cfg.label}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f2c94c' }} />
                  <span style={{ color: '#f2c94c', fontSize: '0.6rem' }}>A-Race</span>
                </div>
              </div>

              {/* A-Race summary */}
              {aRaces.length > 0 && (
                <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid #3a2800', borderRadius: 8, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ color: '#f2c94c', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Objectifs</span>
                  {aRaces.map(ur => (
                    <span key={ur.id} style={{ color: 'var(--text-primary)', fontSize: '0.72rem' }}>
                      {ur.race.name.length > 25 ? ur.race.name.substring(0, 22) + '…' : ur.race.name}
                      <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>
                        {daysUntil(ur.race.date) > 0 ? `J−${daysUntil(ur.race.date)}` : 'passée'}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Month grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {MONTH_SHORT.map((monthName, idx) => {
              const races = racesByMonth[idx] || []
              const isPast = idx < currentMonth
              const isCurrent = idx === currentMonth
              const monthHasConflict = races.some(ur => conflicts.has(ur.id))

              return (
                <div
                  key={monthName}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${isCurrent ? 'var(--accent-green)' : monthHasConflict ? '#5c2a00' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: 14,
                    minHeight: 120,
                    opacity: isPast && races.length === 0 ? 0.4 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ color: isCurrent ? 'var(--accent-green)' : isPast ? 'var(--text-muted)' : 'var(--text-primary)', fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {monthName}
                      {isCurrent && <span style={{ marginLeft: 4, fontSize: '0.55rem', color: 'var(--accent-green)' }}>◉</span>}
                    </div>
                    {monthHasConflict && <AlertTriangle size={10} color="#e88020" />}
                  </div>

                  {races.length === 0 ? (
                    <div style={{ color: 'var(--border)', fontSize: '0.65rem', fontStyle: 'italic' }}>—</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {races.map(ur => {
                        const priority = getPriority(ur.notes)
                        const isConflict = conflicts.has(ur.id)
                        return (
                          <div key={ur.id} style={{ display: 'flex', alignItems: 'stretch', gap: 0, borderRadius: '0 5px 5px 0', overflow: 'hidden' }}>
                            {/* Priority badge — click to cycle */}
                            <button
                              onClick={(e) => { e.stopPropagation(); cyclePriority(ur.id, priority) }}
                              title={priority ? `Priorité ${priority} — cliquer pour changer` : 'Définir la priorité'}
                              style={{
                                width: 20,
                                flexShrink: 0,
                                background: priority ? priorityConfig[priority].bg : 'var(--bg-surface)',
                                border: 'none',
                                borderLeft: `3px solid ${priority ? priorityConfig[priority].border : itraColor(ur.race.itra_points)}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                color: priority ? priorityConfig[priority].color : 'transparent',
                                fontSize: '0.52rem',
                                fontWeight: 800,
                              }}
                            >
                              {priority ?? '·'}
                            </button>

                            {/* Race card */}
                            <div
                              onClick={() => setSelectedRace(selectedRace?.id === ur.id ? null : ur)}
                              style={{
                                flex: 1,
                                background: selectedRace?.id === ur.id ? 'var(--bg-elevated)' : isConflict ? '#2a1500' : 'var(--bg-surface)',
                                padding: '5px 8px',
                                cursor: 'pointer',
                                transition: 'background 0.1s',
                              }}
                            >
                              <div style={{ color: 'var(--text-primary)', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.2 }}>
                                {ur.race.name.length > 20 ? ur.race.name.substring(0, 18) + '…' : ur.race.name}
                              </div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: 2 }}>
                                {new Date(ur.race.date).getDate()} {monthName} · {ur.race.distance_km}km
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Detail panel */}
          {selectedRace && (() => {
            const priority = getPriority(selectedRace.notes)
            const isConflict = conflicts.has(selectedRace.id)
            const raceMonth = new Date(selectedRace.race.date).getMonth()
            const phase = phases[raceMonth]
            const phaseCfg = phaseConfig[phase]
            const days = daysUntil(selectedRace.race.date)

            return (
              <div style={{ marginTop: 20, background: 'var(--bg-card)', border: `1px solid ${isConflict ? '#5c2a00' : 'var(--border)'}`, borderRadius: 12, padding: '20px 24px' }}>
                {/* Conflict warning */}
                {isConflict && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#2a1200', border: '1px solid #5c2a00', borderRadius: 7, padding: '8px 12px', marginBottom: 14 }}>
                    <AlertTriangle size={13} color="#e88020" />
                    <span style={{ color: '#e88020', fontSize: '0.75rem' }}>
                      Conflit — moins de 3 semaines avec une autre course A ou B. Récupération insuffisante.
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: itraColor(selectedRace.race.itra_points), flexShrink: 0 }} />
                      <h2 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{selectedRace.race.name}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{countryFlag(selectedRace.race.country)} {selectedRace.race.location}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{formatDate(selectedRace.race.date)}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{selectedRace.race.distance_km}km · {selectedRace.race.elevation_m.toLocaleString('fr-FR')}m D+</span>
                      {selectedRace.race.itra_points && <span style={{ color: itraColor(selectedRace.race.itra_points), fontSize: '0.78rem', fontWeight: 600 }}>ITRA {selectedRace.race.itra_points}</span>}
                    </div>
                    {selectedRace.race.description && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 6, maxWidth: 600, lineHeight: 1.5 }}>{selectedRace.race.description}</p>
                    )}

                    {/* Phase + Priority info */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      <div style={{ background: phaseCfg.bg, border: `1px solid ${phaseCfg.border}`, borderRadius: 6, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ color: phaseCfg.color, fontSize: '0.7rem', fontWeight: 600 }}>Phase : {phaseCfg.label}</span>
                      </div>
                      {priority && (
                        <div style={{ background: priorityConfig[priority].bg, border: `1px solid ${priorityConfig[priority].border}`, borderRadius: 6, padding: '3px 10px' }}>
                          <span style={{ color: priorityConfig[priority].color, fontSize: '0.7rem', fontWeight: 600 }}>{priority}-Race — {priorityConfig[priority].label}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                    {days > 0 && <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 700 }}>J−{days}</span>}

                    {/* Priority picker */}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {(['A', 'B', 'C'] as const).map(p => (
                        <button
                          key={p}
                          onClick={() => updatePriority(selectedRace.id, priority === p ? null : p)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: `1px solid ${priority === p ? priorityConfig[p].border : 'var(--border)'}`,
                            background: priority === p ? priorityConfig[p].bg : 'var(--bg-surface)',
                            color: priority === p ? priorityConfig[p].color : 'var(--text-muted)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    {selectedRace.race.registration_url && (
                      <a href={selectedRace.race.registration_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-green)', fontSize: '0.78rem', textDecoration: 'none', border: '1px solid var(--accent-green)', borderRadius: 6, padding: '5px 10px' }}>
                        <ExternalLink size={12} /> S'inscrire
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}

          {userRaces.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>📅</div>
              <p>Aucune course dans ton calendrier</p>
              <Link href="/explorer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.85rem' }}>Explorer les courses →</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
