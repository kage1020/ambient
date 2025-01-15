import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/const';

function validateLocale(pathname: string) {
  const locale = pathname.split('/')[1];
  // TODO: country name to country code
  return /^[a-z]{2}$/.test(locale);
}

function addSeed(searchParams: URLSearchParams) {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set('s', new Date().getTime().toString());
  return newParams;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const acceptLanguage = request.headers.get('Accept-Language');
  const candidateLocale =
    acceptLanguage?.split(',').map((l) => l.split(';')[0])[0] || defaultLocale;
  const seed = searchParams.get('s');
  const isLocaleValid = validateLocale(pathname);
  const newParams = seed ? searchParams : addSeed(searchParams);

  const headers = new Headers(request.headers);
  headers.set('X-Pathname', pathname);
  headers.set('X-Search-Params', newParams.toString());

  if (isLocaleValid && seed) return NextResponse.next({ headers });

  request.nextUrl.pathname = isLocaleValid ? pathname : `/${candidateLocale}`;
  request.nextUrl.search = newParams.toString();
  return NextResponse.redirect(request.nextUrl);
}
