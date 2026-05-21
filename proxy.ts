import { NextResponse, type NextRequest } from 'next/server'

// Auth is handled per-page via createSupabaseServer() + redirect()
// The proxy only refreshes the session cookie so it stays valid
export async function proxy(request: NextRequest) {
  return NextResponse.next({ request })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
