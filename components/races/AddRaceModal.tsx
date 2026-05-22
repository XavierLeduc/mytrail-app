'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

interface Props {
  onClose: () => void
  onAdded: (raceName: string) => void
}

const COUNTRIES = ['France', 'Espagne', 'Italie', 'Suisse', 'Autriche', 'Portugal', 'Allemagne', 'Belgique', 'Pays-Bas', 'Autre']

export default function AddRaceModal({ onClose, onAdded }: Props) {
  const [form, setForm] = useState({
    name: '',
    date: '',
    distance_km: '',
    elevation_m: '',
    location: '',
    country: 'France',
    region: '',
    registration_url: '',
    itra_points: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${form.date}`

    // Use server API route — bypasses RLS for global races table
    const res = await fetch('/api/races/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        race: {
          name: form.name,
          slug,
          distance_km: parseFloat(form.distance_km),
          elevation_m: parseInt(form.elevation_m),
          date: form.date,
          location: form.location,
          country: form.country,
          region: form.region || form.country,
          itra_points: form.itra_points ? parseInt(form.itra_points) : null,
          registration_url: form.registration_url || null,
          latitude: 0,
          longitude: 0,
          source: 'manual',
          description: null,
        },
        status: 'registered',
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Erreur lors de la création')
      setLoading(false)
      return
    }

    onAdded(form.name)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 20,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '24px',
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
            Ajouter une course manuellement
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>Nom de la course *</label>
            <input
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ex: Grand Trail du Vercors"
              style={inputStyle}
            />
          </div>

          {/* Date + Distance */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Distance (km) *</label>
              <input
                required
                type="number"
                min="1"
                step="0.1"
                value={form.distance_km}
                onChange={e => set('distance_km', e.target.value)}
                placeholder="52"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Elevation + ITRA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Dénivelé D+ (m) *</label>
              <input
                required
                type="number"
                min="0"
                value={form.elevation_m}
                onChange={e => set('elevation_m', e.target.value)}
                placeholder="3200"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Points ITRA (1–6)</label>
              <input
                type="number"
                min="1"
                max="6"
                value={form.itra_points}
                onChange={e => set('itra_points', e.target.value)}
                placeholder="3"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Location + Country */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Lieu *</label>
              <input
                required
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="Grenoble"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Pays *</label>
              <select
                value={form.country}
                onChange={e => set('country', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Registration URL */}
          <div>
            <label style={labelStyle}>Lien d'inscription (optionnel)</label>
            <input
              type="url"
              value={form.registration_url}
              onChange={e => set('registration_url', e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: 0 }}>{error}</p>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 2, background: 'var(--accent-green)', border: 'none', borderRadius: 8, padding: '10px', color: 'var(--bg-primary)', fontSize: '0.85rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Plus size={15} />
              {loading ? 'Ajout...' : 'Ajouter à ma saison'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: '0.7rem',
  display: 'block',
  marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 7,
  padding: '8px 10px',
  color: 'var(--text-primary)',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
}
