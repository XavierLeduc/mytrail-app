import { formatDistance, formatDuration, formatElevation } from '@/lib/utils'
import { Zap, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock activities until Strava/Garmin is connected
const mockActivities = [
  { id: '1', name: 'Sortie matinale Belledonne', distance_m: 18500, elevation_m: 1200, duration_s: 7200, started_at: '2025-05-18T07:00:00', source: 'strava' as const },
  { id: '2', name: 'Trail Vercors long', distance_m: 32000, elevation_m: 2100, duration_s: 14400, started_at: '2025-05-15T06:30:00', source: 'strava' as const },
  { id: '3', name: 'Récup facile', distance_m: 10000, elevation_m: 350, duration_s: 3900, started_at: '2025-05-13T17:30:00', source: 'garmin' as const },
  { id: '4', name: 'Fractionné côtes', distance_m: 12000, elevation_m: 800, duration_s: 4800, started_at: '2025-05-11T08:00:00', source: 'strava' as const },
  { id: '5', name: 'Sortie longue Chartreuse', distance_m: 38000, elevation_m: 2800, duration_s: 18000, started_at: '2025-05-08T06:00:00', source: 'strava' as const },
]

const monthStats = {
  totalKm: Math.round(mockActivities.reduce((s, a) => s + a.distance_m, 0) / 1000),
  totalElev: mockActivities.reduce((s, a) => s + a.elevation_m, 0),
  totalDuration: mockActivities.reduce((s, a) => s + a.duration_s, 0),
  count: mockActivities.length,
}

export default function ActivitiesPage() {
  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Activités
        </h1>
        <Link
          href="/settings"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '7px 14px',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Zap size={13} /> Connecter Strava
        </Link>
      </div>

      {/* Monthly stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { icon: Zap, label: 'Sorties', value: monthStats.count.toString() },
          { icon: TrendingUp, label: 'Distance', value: `${monthStats.totalKm} km` },
          { icon: TrendingUp, label: 'D+', value: `${monthStats.totalElev.toLocaleString('fr-FR')} m` },
          { icon: Clock, label: 'Temps', value: formatDuration(monthStats.totalDuration) },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '12px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <Icon size={12} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
            </div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', fontWeight: 700 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Activity list */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          Ce mois — {mockActivities.length} sorties
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mockActivities.map(act => (
            <div
              key={act.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {/* Source badge */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: act.source === 'strava' ? '#fc4c02' : 'var(--accent-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                {act.source === 'strava' ? 'S' : 'G'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                  {act.name}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 3 }}>
                  {new Date(act.started_at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, textAlign: 'right' }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {formatDistance(act.distance_m / 1000)}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>distance</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {act.elevation_m.toLocaleString('fr-FR')} m
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>D+</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {formatDuration(act.duration_s)}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>durée</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
