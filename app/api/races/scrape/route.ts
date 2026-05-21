import { NextRequest, NextResponse } from 'next/server'
import { scrapeAll, upsertRaces } from '@/lib/scraper'

// Vercel Cron: runs daily at 3am UTC
// vercel.json: {"crons": [{"path": "/api/races/scrape", "schedule": "0 3 * * *"}]}

export async function GET(req: NextRequest) {
  // Protect the cron endpoint
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const races = await scrapeAll()
  const result = await upsertRaces(races)

  return NextResponse.json({
    ok: true,
    scraped: races.length,
    ...result,
  })
}
