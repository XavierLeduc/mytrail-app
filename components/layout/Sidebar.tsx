'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Map, Flag, Zap, Settings } from 'lucide-react'

const NAV = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/calendar', icon: Calendar, label: 'Calendrier' },
  { href: '/explorer', icon: Map, label: 'Explorer' },
  { href: '/races', icon: Flag, label: 'Mes courses' },
  { href: '/activities', icon: Zap, label: 'Activités' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: 56,
        minHeight: '100vh',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 0',
        gap: 4,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ marginBottom: 10, display: 'flex' }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, var(--bg-surface), var(--accent-green))',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
          }}
        >
          🌲
        </div>
      </Link>

      {/* Nav items */}
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            title={label}
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: active ? 'var(--bg-elevated)' : 'transparent',
              border: active ? '1px solid var(--accent-green)' : '1px solid transparent',
              color: active ? 'var(--accent-green)' : 'var(--text-muted)',
              transition: 'all 0.15s',
              textDecoration: 'none',
            }}
          >
            <Icon size={18} />
          </Link>
        )
      })}

      {/* Settings bottom */}
      <div style={{ marginTop: 'auto' }}>
        <Link
          href="/settings"
          title="Paramètres"
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: pathname === '/settings' ? '1px solid var(--accent-green)' : '1px solid transparent',
            color: pathname === '/settings' ? 'var(--accent-green)' : 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          <Settings size={18} />
        </Link>
        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            background: 'var(--bg-surface)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-green)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginTop: 8,
            cursor: 'pointer',
          }}
        >
          X
        </div>
      </div>
    </aside>
  )
}
