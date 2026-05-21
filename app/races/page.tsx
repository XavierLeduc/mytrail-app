'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { UserRace, RaceStatus } from '@/lib/types'
import { formatDistance, formatElevation, formatDate, countryFlag, daysUntil, itraColor } from '@/lib/utils'
import { MapPin, ExternalLink, Trash2 } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import Link from 'next/link'

const STATUS_LABEL: Record<RaceStatus, string> = {
  interested: 'Intéressé',
  registered: 'Inscrit',
  completed: 'Terminée',
}

const STATUS_COLOR: Record<RaceStatus, string> = {
  interested: 'var(--text-muted)',
  registered: 'var(--accent-green)',
  completed: 'var(--accent-gold)',
}

export default function RacesPage() {
  const [userRaces, setUserRaces] = useState<UserRace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('user_races')
        .select('*, race:races(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setUserRaces((data ?? []) as UserRace[])
      setLoading(false)
    }
    load()
  }, [])

  const updateStatus = async (id: string, status: RaceStatus) => {
    setUserRaces(prev => prev.map(ur => ur.id === id ? { ...ur, status } : ur))
    await getSupabaseBrowser().from('user_races').update({ status }).eq('id', id)
  }

  const remove = async (id: string) => {
    setUserRaces(prev => prev.filter(ur => ur.id !== id))
    await getSupabaseBrowser().from('user_races').delete().eq('id', id)
  }

  const groups: Record<RaceStatus, UserRace[]> = {
    registered: userRaces.filter(ur => ur.status === 'registered').sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime()),
    interested: userRaces.filter(ur => ur.status === 'interested').sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime()),
    completed: userRaces.filter(ur => ur.status === 'completed').sort((a, b) => new Date(b.race.date).getTime() - new Date(a.race.date).getTime()),
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Mes courses
        </h1>
        <Link href="/explorer" style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-green)', borderRadius: 8, padding: '8px 16px', color: 'var(--accent-green)', fontSize: '0.8rem', textDecoration: 'none' }}>
          + Explorer
        </Link>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>Chargement...</div>
      )}

      {!loading && (['registered', 'interested', 'completed'] as RaceStatus[]).map(status => {
        const races = groups[status]
        if (races.length === 0) return null
        return (
          <div key={status} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[status] }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {STATUS_LABEL[status]} · {races.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {races.map(ur => {
                const days = daysUntil(ur.race.date)
                return (
                  <div key={ur.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{ur.race.name}</h3>
                          {ur.race.itra_points && <span style={{ color: itraColor(ur.race.itra_points), fontSize: '0.65rem', fontWeight: 700 }}>ITRA {ur.race.itra_points}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MapPin size={11} /> {countryFlag(ur.race.country)} {ur.race.location}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{formatDistance(ur.race.distance_km)} · {formatElevation(ur.race.elevation_m)}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{formatDate(ur.race.date)}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {days > 0 && <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 700 }}>J−{days}</span>}
                        {ur.race.registration_url && (
                          <a href={ur.race.registration_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', display: 'flex' }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button onClick={() => remove(ur.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 0 }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                      {(['interested', 'registered', 'completed'] as RaceStatus[]).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(ur.id, s)}
                          style={{
                            background: ur.status === s ? STATUS_COLOR[s] : 'var(--bg-surface)',
                            border: `1px solid ${ur.status === s ? STATUS_COLOR[s] : 'var(--border)'}`,
                            borderRadius: 5,
                            padding: '3px 10px',
                            color: ur.status === s ? 'var(--bg-primary)' : 'var(--text-muted)',
                            fontSize: '0.68rem',
                            cursor: 'pointer',
                            fontWeight: ur.status === s ? 600 : 400,
                          }}
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {!loading && userRaces.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏁</div>
          <p>Aucune course planifiée</p>
          <Link href="/explorer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.85rem' }}>Explorer les courses →</Link>
        </div>
      )}
    </div>
  )
}
