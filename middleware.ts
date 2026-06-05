import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    // 1. Check if user is logged in
    const isValidToken = token ? await verifyToken(token) : null;

    // 2. Protect /dashboard and /admin
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        // Exclude the login page itself from protection to avoid loops
        if (!pathname.startsWith('/admin/login') && !pathname.startsWith('/login')) {
            if (!isValidToken) {
                // Redirect to login if token is missing or invalid
                // Note: User requested redirect to /login
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    }

    // 3. Redirect logged-in users away from /login or /admin/login to /dashboard
    if (pathname === '/login' || pathname === '/admin/login') {
        if (isValidToken) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
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
};
