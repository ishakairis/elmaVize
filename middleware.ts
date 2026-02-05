import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { auth } from './src/lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Handle admin routes protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check authentication for other admin pages
    const session = await auth();
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check if user has admin role
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // Handle internationalization for non-admin routes
  return intlMiddleware(request);
}

export const config = {
  // Match admin routes and internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*', '/admin/:path*'],
};



