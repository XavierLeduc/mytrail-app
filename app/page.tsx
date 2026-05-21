import NextRaceHero from '@/components/dashboard/NextRaceHero'
import StatsRow from '@/components/dashboard/StatsRow'
import SeasonTimeline from '@/components/dashboard/SeasonTimeline'
import { seedRaces } from '@/data/races'
import { UserRace } from '@/lib/types'
import Link from 'next/link'
import { daysUntil } from '@/lib/utils'

const r5 = { ...seedRaces.find(r => r.id === '5')!, date: '2026-06-08' }
const r1 = { ...seedRaces.find(r => r.id === '1')!, date: '2026-08-25' }
const r7 = { ...seedRaces.find(r => r.id === '7')!, date: '2026-09-07' }

const mockUserRaces: UserRace[] = [
  { id: 'ur1', user_id: 'u1', race_id: '5', status: 'registered', notes: null, created_at: '2026-01-01', race: r5 },
  { id: 'ur2', user_id: 'u1', race_id: '1', status: 'registered', notes: null, created_at: '2026-01-01', race: r1 },
  { id: 'ur3', user_id: 'u1', race_id: '7', status: 'interested', notes: null, created_at: '2026-01-01', race: r7 },
]

export default function DashboardPage() {
  const upcoming = mockUserRaces
    .filter(ur => daysUntil(ur.race.date) > 0)
    .sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime())

  const nextRace = upcoming[0]?.race ?? null

  const stats = {
    kmThisMonth: 0,
    elevationThisMonth: 0,
    racesPlanned: mockUserRaces.length,
    racesCompleted: mockUserRaces.filter(ur => ur.status === 'completed').length,
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
            Bonjour Xavier 👋
          </p>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            Ta saison {new Date().getFullYear()}
          </h1>
        </div>
        <Link
          href="/explorer"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--accent-green)',
            borderRadius: 8,
            padding: '8px 16px',
            color: 'var(--accent-green)',
            fontSize: '0.8rem',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          + Ajouter une course
        </Link>
      </div>

      <div style={{ marginBottom: 16 }}>
        <NextRaceHero race={nextRace} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <StatsRow stats={stats} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <SeasonTimeline userRaces={mockUserRaces as any} />
      </div>

      {upcoming.length > 1 && (
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Prochaines courses
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcoming.slice(1).map(ur => (
              <div
                key={ur.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: ur.status === 'registered' ? 'var(--accent-green)' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{ur.race.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 2 }}>
                    {ur.race.distance_km}km · {ur.race.location}
                  </div>
                </div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600 }}>
                  J−{daysUntil(ur.race.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
