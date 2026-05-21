'use client'

import { useEffect, useRef } from 'react'
import { Race } from '@/lib/types'
import { itraColor } from '@/lib/utils'

interface Props {
  races: Race[]
  selectedId: string | null
  onSelect: (race: Race) => void
}

export default function RaceMap({ races, selectedId, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map())

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || token === 'your-mapbox-token') {
      // Fallback: show placeholder map
      return
    }

    import('mapbox-gl').then(mapboxgl => {
      mapboxgl.default.accessToken = token

      const map = new mapboxgl.default.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [10, 47],
        zoom: 4,
      })

      mapInstanceRef.current = map

      map.on('load', () => {
        races.forEach(race => {
          const el = document.createElement('div')
          el.className = 'race-marker'
          el.style.cssText = `
            width: ${race.distance_km > 100 ? 18 : race.distance_km > 50 ? 14 : 10}px;
            height: ${race.distance_km > 100 ? 18 : race.distance_km > 50 ? 14 : 10}px;
            border-radius: 50%;
            background: ${itraColor(race.itra_points)};
            border: 2px solid #0f160f;
            cursor: pointer;
            transition: all 0.15s;
          `

          const marker = new mapboxgl.default.Marker(el)
            .setLngLat([race.longitude, race.latitude])
            .addTo(map)

          el.addEventListener('click', () => onSelect(race))
          markersRef.current.set(race.id, marker)
        })
      })
    })

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Fly to selected race
  useEffect(() => {
    if (!selectedId || !mapInstanceRef.current) return
    const race = races.find(r => r.id === selectedId)
    if (!race) return
    mapInstanceRef.current.flyTo({
      center: [race.longitude, race.latitude],
      zoom: 8,
      duration: 1000,
    })

    // Update marker styles
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement()
      el.style.opacity = id === selectedId ? '1' : '0.5'
      el.style.transform = id === selectedId ? 'scale(1.4)' : 'scale(1)'
    })
  }, [selectedId, races])

  const hasToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'your-mapbox-token'

  if (!hasToken) {
    return (
      <div
        style={{
          flex: 1,
          background: 'var(--bg-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 32,
          borderLeft: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
          Configure ton token Mapbox
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', maxWidth: 240 }}>
          Ajoute <code style={{ color: 'var(--accent-green)' }}>NEXT_PUBLIC_MAPBOX_TOKEN</code> dans ton fichier <code style={{ color: 'var(--accent-green)' }}>.env.local</code>
        </p>
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {races.map(race => (
              <div
                key={race.id}
                onClick={() => onSelect(race)}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '4px 0',
                  opacity: selectedId === race.id ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: itraColor(race.itra_points),
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: 'var(--text-primary)', fontSize: '0.75rem' }}>{race.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginLeft: 'auto' }}>
                  {race.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} style={{ flex: 1, borderLeft: '1px solid var(--border)' }} />
}
