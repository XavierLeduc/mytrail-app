'use client'

import { useState } from 'react'
import { CheckCircle, Circle, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const [stravaConnected, setStravaConnected] = useState(false)
  const [garminConnected, setGarminConnected] = useState(false)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 32 }}>
        Paramètres
      </h1>

      {/* Profile */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Profil
        </p>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Prénom', value: 'Xavier', placeholder: 'Ton prénom' },
            { label: 'Email', value: 'xavierleduc62@gmail.com', placeholder: 'ton@email.com' },
          ].map(({ label, value, placeholder }) => (
            <div key={label}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: 4 }}>{label}</label>
              <input
                defaultValue={value}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 7,
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <button
            style={{
              alignSelf: 'flex-start',
              background: 'var(--bg-surface)',
              border: '1px solid var(--accent-green)',
              borderRadius: 7,
              padding: '7px 16px',
              color: 'var(--accent-green)',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Sauvegarder
          </button>
        </div>
      </section>

      {/* Integrations */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Connexions
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Strava */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, background: '#fc4c02', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>S</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Strava</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>
                {stravaConnected ? 'Synchronisation des activités trail active' : 'Importe tes activités trail automatiquement'}
              </div>
            </div>
            {stravaConnected ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="var(--accent-green)" />
                <button onClick={() => setStravaConnected(false)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Déconnecter
                </button>
              </div>
            ) : (
              <a
                href="/api/strava/auth"
                onClick={e => { e.preventDefault(); setStravaConnected(true) }}
                style={{ background: '#fc4c02', border: 'none', borderRadius: 7, padding: '7px 14px', color: 'white', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <ExternalLink size={12} /> Connecter
              </a>
            )}
          </div>

          {/* Garmin */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, background: 'var(--accent-teal)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>G</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Garmin Connect</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>
                {garminConnected ? 'Synchronisation des activités active' : 'Connecte ta montre Garmin pour importer tes sorties'}
              </div>
            </div>
            {garminConnected ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="var(--accent-green)" />
                <button onClick={() => setGarminConnected(false)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Déconnecter
                </button>
              </div>
            ) : (
              <a
                href="/api/garmin/auth"
                onClick={e => { e.preventDefault(); setGarminConnected(true) }}
                style={{ background: 'var(--accent-teal)', border: 'none', borderRadius: 7, padding: '7px 14px', color: 'white', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <ExternalLink size={12} /> Connecter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Préférences
        </p>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>Unités</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>Kilomètres ou miles</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['km', 'mi'].map(unit => (
                <button
                  key={unit}
                  style={{
                    background: unit === 'km' ? 'var(--accent-green)' : 'var(--bg-surface)',
                    border: `1px solid ${unit === 'km' ? 'var(--accent-green)' : 'var(--border)'}`,
                    borderRadius: 6,
                    padding: '5px 12px',
                    color: unit === 'km' ? 'var(--bg-primary)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: unit === 'km' ? 600 : 400,
                  }}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
