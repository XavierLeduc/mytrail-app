'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { formatDistance, formatDuration } from '@/lib/utils'
import { Zap, TrendingUp, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { Activity } from '@/lib/types'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const supabase = getSupabaseBrowser()

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })
      .limit(50)
    setActivities((data ?? []) as Activity[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const syncStrava = async () => {
    setSyncing(true)
    await fetch('/api/strava/sync', { method: 'POST' })
    await load()
    setSyncing(false)
  }

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthActivities = activities.filter(a => new Date(a.started_at) >= monthStart)
  const totalKm = Math.round(monthActivities.reduce((s, a) => s + a.distance_m, 0) / 1000)
  const totalElev = monthActivities.reduce((s, a) => s + a.elevation_m, 0)
  const totalTime = monthActivities.reduce((s, a) => s + a.duration_s, 0)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Activités</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={syncStrava}
            disabled={syncing}
            style={{ background: '#fc4c02', border: 'none', borderRadius: 8, padding: '7px 14px', color: 'white', fontSize: '0.78rem', cursor: syncing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: syncing ? 0.7 : 1 }}
          >
            <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Sync...' : 'Sync Strava'}
          </button>
          <Link href="/settings" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 14px', color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={13} /> Connexions
          </Link>
        </div>
      </div>

      {/* Monthly stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { icon: Zap, label: 'Sorties', value: monthActivities.length.toString() },
          { icon: TrendingUp, label: 'Distance', value: `${totalKm} km` },
          { icon: TrendingUp, label: 'D+', value: `${totalElev.toLocaleString('fr-FR')} m` },
          { icon: Clock, label: 'Temps', value: totalTime > 0 ? formatDuration(totalTime) : '—' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <Icon size={12} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
            </div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', fontWeight: 700 }}>{value}</div>
          </div>
        ))}
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>Chargement...</div>}

      {!loading && activities.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚡</div>
          <p>Aucune activité importée</p>
          <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Connecte Strava ou Garmin dans les <Link href="/settings" style={{ color: 'var(--accent-green)' }}>paramètres</Link></p>
        </div>
      )}

      {!loading && activities.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activities.map(act => (
            <div key={act.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: act.source === 'strava' ? '#fc4c02' : 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                {act.source === 'strava' ? 'S' : 'G'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>{act.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 3 }}>
                  {new Date(act.started_at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, textAlign: 'right' }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{formatDistance(act.distance_m / 1000)}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>distance</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{act.elevation_m.toLocaleString('fr-FR')} m</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>D+</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{formatDuration(act.duration_s)}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>durée</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
