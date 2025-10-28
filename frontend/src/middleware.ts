import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Vercel handles API routes directly, so no proxy is needed
export function middleware(request: NextRequest) {
  // For all requests, continue normally
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}