// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('sb-access-token')?.value;

//   // Allow access to /login if not logged in
//   if (!token && request.nextUrl.pathname !== '/login') {
//     const loginUrl = new URL('/login', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If logged in but trying to access /login, redirect to dashboard
//   if (token && request.nextUrl.pathname === '/login') {
//     const dashboardUrl = new URL('/', request.url);
//     return NextResponse.redirect(dashboardUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'], 
//   // Protect all routes except static files and _next
// };
import { type NextRequest } from 'next/server'
import { updateSession } from '@/event-creator/src/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}