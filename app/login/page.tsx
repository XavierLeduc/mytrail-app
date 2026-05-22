'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const envMissing = !supabaseUrl || !supabaseKey

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  if (envMissing) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#1a0f0f', border: '1px solid #e74c3c', borderRadius: 12, padding: 24, maxWidth: 480, width: '100%' }}>
          <h2 style={{ color: '#e74c3c', margin: '0 0 12px', fontSize: '1rem' }}>⚠️ Variables Supabase manquantes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 16px' }}>
            Les variables d'environnement ne sont pas présentes dans le build.
            Vérifie dans <strong style={{ color: 'var(--text-primary)' }}>Vercel → Settings → Environment Variables</strong> que ces deux variables existent bien :
          </p>
          <div style={{ background: 'var(--bg-card)', borderRadius: 8, padding: 12, fontFamily: 'monospace', fontSize: '0.8rem' }}>
            <div style={{ color: supabaseUrl ? 'var(--accent-green)' : '#e74c3c', marginBottom: 4 }}>
              {supabaseUrl ? '✓' : '✗'} NEXT_PUBLIC_SUPABASE_URL
            </div>
            <div style={{ color: supabaseKey ? 'var(--accent-green)' : '#e74c3c' }}>
              {supabaseKey ? '✓' : '✗'} NEXT_PUBLIC_SUPABASE_ANON_KEY
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 12 }}>
            Après avoir ajouté les variables, redéploie depuis Vercel → Deployments → Redeploy.
          </p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const supabase = getSupabaseBrowser()

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/')
      router.refresh()
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Vérifie ton email pour confirmer ton compte.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380, padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, var(--bg-surface), var(--accent-green))',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              margin: '0 auto 12px',
            }}
          >
            🌲
          </div>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
            MyTrail
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>
            Planifie ta saison trail
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '24px',
          }}
        >
          {/* Mode toggle */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              borderRadius: 8,
              padding: 3,
              marginBottom: 20,
            }}
          >
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess('') }}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  borderRadius: 6,
                  border: 'none',
                  background: mode === m ? 'var(--bg-elevated)' : 'transparent',
                  color: mode === m ? 'var(--accent-green)' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: mode === m ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {m === 'login' ? 'Connexion' : 'Créer un compte'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', marginBottom: 4 }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', marginBottom: 4 }}>
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: 0 }}>{error}</p>
            )}
            {success && (
              <p style={{ color: 'var(--accent-green)', fontSize: '0.78rem', margin: 0 }}>{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--accent-green)',
                border: 'none',
                borderRadius: 8,
                padding: '11px',
                color: 'var(--bg-primary)',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginTop: 4,
              }}
            >
              {loading ? '...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
