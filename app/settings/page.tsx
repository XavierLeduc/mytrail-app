'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { CheckCircle, ExternalLink, RefreshCw } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function SettingsPage() {
  const [stravaConnected, setStravaConnected] = useState(false)
  const [garminConnected, setGarminConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('integrations')
        .select('provider')
        .eq('user_id', user.id)
      const providers = (data ?? []).map((r: { provider: string }) => r.provider)
      setStravaConnected(providers.includes('strava'))
      setGarminConnected(providers.includes('garmin'))
      setLoading(false)
    }
    load()

    // Check URL params for success/error after OAuth callback
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'strava') setStravaConnected(true)
    if (params.get('success') === 'garmin') setGarminConnected(true)
  }, [])

  const disconnect = async (provider: 'strava' | 'garmin') => {
    const supabase = getSupabaseBrowser()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('integrations').delete().eq('user_id', user.id).eq('provider', provider)
    if (provider === 'strava') setStravaConnected(false)
    else setGarminConnected(false)
  }

  const syncStrava = async () => {
    await fetch('/api/strava/sync', { method: 'POST' })
    alert('Sync lancée — recharge la page Activités dans quelques secondes.')
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 32 }}>
        Paramètres
      </h1>

      {/* Connexions */}
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
                {stravaConnected ? '✓ Connecté — activités trail importées' : 'Importe tes activités trail automatiquement'}
              </div>
            </div>
            {loading ? null : stravaConnected ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={syncStrava}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', color: 'var(--accent-green)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <RefreshCw size={11} /> Sync
                </button>
                <button onClick={() => disconnect('strava')} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Déconnecter
                </button>
              </div>
            ) : (
              <a
                href="/api/strava/auth"
                style={{ background: '#fc4c02', borderRadius: 7, padding: '7px 14px', color: 'white', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
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
                {garminConnected ? '✓ Connecté' : 'Connecte ta montre Garmin pour importer tes sorties'}
              </div>
            </div>
            {loading ? null : garminConnected ? (
              <button onClick={() => disconnect('garmin')} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}>
                Déconnecter
              </button>
            ) : (
              <a
                href="/api/garmin/auth"
                style={{ background: 'var(--accent-teal)', borderRadius: 7, padding: '7px 14px', color: 'white', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <ExternalLink size={12} /> Connecter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Préférences */}
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
                <button key={unit} style={{ background: unit === 'km' ? 'var(--accent-green)' : 'var(--bg-surface)', border: `1px solid ${unit === 'km' ? 'var(--accent-green)' : 'var(--border)'}`, borderRadius: 6, padding: '5px 12px', color: unit === 'km' ? 'var(--bg-primary)' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: unit === 'km' ? 600 : 400 }}>
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
