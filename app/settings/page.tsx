'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { CheckCircle, ExternalLink, RefreshCw } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function SettingsPage() {
  const [stravaConnected, setStravaConnected] = useState(false)
  const [garminConnected, setGarminConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [callbackError, setCallbackError] = useState('')
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

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

    // Load runner profile from user metadata
    const supabase2 = getSupabaseBrowser()
    supabase2.auth.getUser().then((res: { data: { user: { user_metadata: Record<string, string> } | null } }) => {
      const meta = res.data?.user?.user_metadata
      if (meta) {
        setFirstName(meta.runner_first_name ?? '')
        setLastName(meta.runner_last_name ?? '')
      }
    })

    // Check URL params after OAuth callback
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'strava') setStravaConnected(true)
    if (params.get('success') === 'garmin') setGarminConnected(true)
    const err = params.get('error')
    if (err) setCallbackError(decodeURIComponent(err))
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

  const saveProfile = async () => {
    setSavingProfile(true)
    const supabase = getSupabaseBrowser()
    await supabase.auth.updateUser({
      data: { runner_first_name: firstName.trim().toUpperCase(), runner_last_name: lastName.trim().toUpperCase() }
    })
    setSavingProfile(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const seedCatalogue = async () => {
    setSeeding(true)
    setSeedResult(null)
    try {
      const res = await fetch('/api/races/seed', { method: 'POST' })
      const data = await res.json()
      setSeedResult(`✓ ${data.inserted} courses importées en base${data.errors > 0 ? ` (${data.errors} erreurs)` : ''}`)
    } catch {
      setSeedResult('Erreur lors de l\'import')
    }
    setSeeding(false)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 32 }}>
        Paramètres
      </h1>

      {callbackError && (
        <div style={{ background: '#1a0f0f', border: '1px solid #e74c3c', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#e74c3c', fontSize: '0.82rem' }}>
          ⚠️ Erreur lors de la connexion : <code style={{ fontSize: '0.78rem' }}>{callbackError}</code>
        </div>
      )}

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

      {/* Profil coureur */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Profil coureur
        </p>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: 12 }}>
            Ton nom tel qu'il apparaît sur LiveTrail et ITRA — utilisé pour trouver tes résultats automatiquement.
          </p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={firstName} onChange={e => setFirstName(e.target.value)}
              placeholder="Prénom (ex: XAVIER)"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 12px', color: 'var(--text-primary)', fontSize: '0.8rem', width: 160 }}
            />
            <input
              value={lastName} onChange={e => setLastName(e.target.value)}
              placeholder="Nom (ex: LEDUC)"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 12px', color: 'var(--text-primary)', fontSize: '0.8rem', width: 160 }}
            />
            <button
              onClick={saveProfile} disabled={savingProfile || (!firstName && !lastName)}
              style={{ background: profileSaved ? 'var(--accent-green)' : 'var(--bg-surface)', border: `1px solid ${profileSaved ? 'var(--accent-green)' : 'var(--border)'}`, borderRadius: 6, padding: '7px 14px', color: profileSaved ? 'var(--bg-primary)' : 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: profileSaved ? 600 : 400 }}
            >
              {profileSaved ? '✓ Sauvegardé' : savingProfile ? '…' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </section>

      {/* Catalogue de courses */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Catalogue de courses
        </p>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, background: 'var(--accent-green)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-primary)', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>⛰</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Importer le catalogue</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>
              {seedResult ?? '110 courses européennes prêtes à importer en base'}
            </div>
          </div>
          <button
            onClick={seedCatalogue}
            disabled={seeding}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 12px', color: 'var(--accent-green)', fontSize: '0.75rem', cursor: seeding ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 4, opacity: seeding ? 0.6 : 1 }}
          >
            <RefreshCw size={11} style={{ animation: seeding ? 'spin 1s linear infinite' : 'none' }} />
            {seeding ? 'Import…' : 'Importer'}
          </button>
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
