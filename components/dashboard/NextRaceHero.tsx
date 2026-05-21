import { daysUntil, formatDate, formatDistance, formatElevation, countryFlag } from '@/lib/utils'
import { Race } from '@/lib/types'
import { MapPin, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Props {
  race: Race | null
}

export default function NextRaceHero({ race }: Props) {
  if (!race) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px dashed var(--border)',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          minHeight: 140,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🏁</span>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Aucune course planifiée</p>
        <Link
          href="/explorer"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--accent-green)',
            borderRadius: 8,
            padding: '6px 14px',
            color: 'var(--accent-green)',
            fontSize: '0.8rem',
            textDecoration: 'none',
            marginTop: 4,
          }}
        >
          Trouver une course →
        </Link>
      </div>
    )
  }

  const days = daysUntil(race.date)
  const isPast = days < 0
  const progress = isPast ? 100 : Math.max(0, Math.min(100, Math.round((1 - days / 180) * 100)))

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
        border: '1px solid #3a7a3a',
        borderRadius: 12,
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background emoji watermark */}
      <div
        style={{
          position: 'absolute',
          right: -16,
          top: -16,
          fontSize: '6rem',
          opacity: 0.06,
          userSelect: 'none',
        }}
      >
        ⛰️
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {isPast ? 'Dernière course' : 'Prochaine course'}
        </span>
        {race.itra_points && (
          <span
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              padding: '2px 8px',
              color: 'var(--accent-gold)',
              fontSize: '0.65rem',
              fontWeight: 700,
            }}
          >
            ITRA {race.itra_points}
          </span>
        )}
      </div>

      {/* Race name */}
      <h2
        style={{
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          fontWeight: 700,
          margin: '4px 0 8px',
        }}
      >
        {race.name}
      </h2>

      {/* Meta */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={12} /> {countryFlag(race.country)} {race.location}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Calendar size={12} /> {formatDate(race.date)}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={12} /> {formatDistance(race.distance_km)} · {formatElevation(race.elevation_m)}
        </span>
      </div>

      {/* Countdown + Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            color: isPast ? 'var(--text-muted)' : 'var(--accent-gold)',
            fontSize: '1rem',
            fontWeight: 700,
            minWidth: 52,
          }}
        >
          {isPast ? 'Terminée' : `J−${days}`}
        </span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--text-muted)',
              fontSize: '0.6rem',
              marginBottom: 4,
            }}
          >
            <span>Préparation</span>
            <span>{progress}%</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 3, height: 5 }}>
            <div
              style={{
                background: 'linear-gradient(90deg, var(--accent-green), var(--accent-gold))',
                width: `${progress}%`,
                height: 5,
                borderRadius: 3,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
