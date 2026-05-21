export const dynamic = 'force-dynamic'

import NextRaceHero from '@/components/dashboard/NextRaceHero'
import StatsRow from '@/components/dashboard/StatsRow'
import SeasonTimeline from '@/components/dashboard/SeasonTimeline'
import { createSupabaseServer } from '@/lib/supabase-server'
import { UserRace } from '@/lib/types'
import Link from 'next/link'
import { daysUntil } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const year = new Date().getFullYear()

  // Fetch user's races with race details
  const { data: userRaces } = await supabase
    .from('user_races')
    .select('*, race:races(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const races = (userRaces ?? []) as UserRace[]

  // Upcoming races sorted by date
  const upcoming = races
    .filter(ur => daysUntil(ur.race.date) > 0)
    .sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime())

  const nextRace = upcoming[0]?.race ?? null

  // Monthly stats from activities
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const { data: activities } = await supabase
    .from('activities')
    .select('distance_m, elevation_m')
    .eq('user_id', user.id)
    .gte('started_at', monthStart)

  const kmThisMonth = Math.round((activities ?? []).reduce((s, a) => s + a.distance_m, 0) / 1000)
  const elevThisMonth = (activities ?? []).reduce((s, a) => s + a.elevation_m, 0)

  const stats = {
    kmThisMonth,
    elevationThisMonth: elevThisMonth,
    racesPlanned: races.length,
    racesCompleted: races.filter(ur => ur.status === 'completed').length,
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
            Bonjour 👋
          </p>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            Ta saison {year}
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
        <SeasonTimeline userRaces={races as any} />
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
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ur.status === 'registered' ? 'var(--accent-green)' : 'var(--text-muted)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{ur.race.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 2 }}>{ur.race.distance_km}km · {ur.race.location}</div>
                </div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600 }}>
                  J−{daysUntil(ur.race.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {races.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏔️</div>
          <p style={{ marginBottom: 12 }}>Aucune course planifiée pour l'instant</p>
          <Link href="/explorer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.875rem' }}>
            Explorer les courses →
          </Link>
        </div>
      )}
    </div>
  )
}
