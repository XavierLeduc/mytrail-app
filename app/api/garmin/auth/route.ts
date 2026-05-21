import { NextResponse } from 'next/server'
import { getGarminAuthUrl } from '@/lib/garmin'

export function GET() {
  const url = getGarminAuthUrl()
  return NextResponse.redirect(url)
}
