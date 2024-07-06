import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // console.log("Token:", token); // Add logging to check token
  // console.log("URL Pathname:", url.pathname); // Add logging to check URL pathname

  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    console.log("Redirecting to /dashboard because user is authenticated");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log("Redirecting to /sign-in because user is not authenticated");
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
