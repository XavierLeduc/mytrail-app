import { Activity } from '@/lib/types'
import { TrendingUp, Zap, Flag } from 'lucide-react'

interface Stats {
  kmThisMonth: number
  elevationThisMonth: number
  racesPlanned: number
  racesCompleted: number
}

interface Props {
  stats: Stats
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  trend?: string
}) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Icon size={13} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
      </div>
      <div style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: 4 }}>{sub}</div>
      {trend && (
        <div style={{ color: 'var(--accent-green)', fontSize: '0.6rem', marginTop: 2 }}>{trend}</div>
      )}
    </div>
  )
}

export default function StatsRow({ stats }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
      <StatCard
        icon={Zap}
        label="Distance · Ce mois"
        value={`${stats.kmThisMonth} km`}
        sub="depuis Strava"
        trend="↑ Connecte Strava pour sync"
      />
      <StatCard
        icon={TrendingUp}
        label="Dénivelé · Ce mois"
        value={`${stats.elevationThisMonth.toLocaleString('fr-FR')} m`}
        sub="D+ cumulé"
      />
      <StatCard
        icon={Flag}
        label="Courses 2025"
        value={`${stats.racesPlanned}`}
        sub={`${stats.racesCompleted} terminée${stats.racesCompleted > 1 ? 's' : ''} · ${stats.racesPlanned - stats.racesCompleted} à venir`}
      />
    </div>
  )
}
