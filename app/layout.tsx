import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'MyTrail — Planifie ta saison trail',
  description: 'Découvre et planifie tes courses trail en Europe',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              marginLeft: 56,
              background: 'var(--bg-primary)',
              minHeight: '100vh',
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
