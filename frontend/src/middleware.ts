// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Skip authentication check for the /login route to avoid infinite redirect loop
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // Get the jwt_token cookie
  const jwtToken = req.cookies.get('jwt_token');
  
  // If jwt_token is missing, redirect to /login
  if (!jwtToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request if jwt_token exists
  return NextResponse.next();
}

// Specify that the middleware should run on all routes
export const config = {
  matcher: '/', // This applies to all routes
};
