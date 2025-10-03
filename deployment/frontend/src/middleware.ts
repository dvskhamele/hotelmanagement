import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Proxy API requests to the backend server
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Check if the request is for the API
  if (url.pathname.startsWith('/api')) {
    // Create the backend URL
    const backendUrl = new URL(url.pathname, 'http://localhost:3001')
    
    // Copy headers from the original request
    const headers = new Headers(request.headers)
    headers.set('host', 'localhost:3001')
    
    try {
      // Create a new request to the backend
      const backendRequest = new Request(backendUrl, {
        method: request.method,
        headers,
        body: request.body,
        redirect: 'manual',
      })
      
      // Forward the request to the backend
      const response = await fetch(backendRequest)
      
      // Create a new response with the backend response data
      const responseBody = await response.text()
      return new NextResponse(responseBody, {
        status: response.status,
        headers: response.headers,
      })
    } catch (error) {
      console.error('Proxy error:', error)
      // For prototype, return mock data if backend is not available
      return NextResponse.json({ 
        message: 'Using mock data for prototype',
        mock: true 
      }, { status: 200 })
    }
  }
  
  // For all other requests, continue normally
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/:path*',
  ],
}