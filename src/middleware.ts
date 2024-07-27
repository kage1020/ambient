import { NextRequest, NextResponse } from 'next/server';
import { AcceptableLocales } from '@/libs/assets';
import { getLocale } from '@/libs/locale';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = AcceptableLocales.some((locale) => pathname.includes(locale.code));

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale();
  request.nextUrl.pathname = `/${locale}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
