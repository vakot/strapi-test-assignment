import { AUTH_PAGES, PUBLIC_PAGES } from '@constants/routes'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  // Redirect logged-in users away from auth pages
  if (token && AUTH_PAGES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect logged-out users away from non-public pages
  if (!token && !PUBLIC_PAGES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
