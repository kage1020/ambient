import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
// import { defaultAvailableLocales, defaultLocale } from '@/libs/i18n';
import { searchParamsSchema, toSearchParams } from '@/libs/params';

const defaultLocale = 'en';
const defaultAvailableLocales = ['en', 'ja'];

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|manifest.webmanifest|icon.svg|sw.js).*)',
  ],
  // runtime: 'nodejs',
};

async function detectLocale(acceptLanguage: string, pathname: string) {
  // const availableLocales = await getAvailableLocales();
  const pathnameLocale = pathname.match(/^\/([a-z]{2})?/)?.[1];
  if (pathnameLocale && defaultAvailableLocales.includes(pathnameLocale)) return pathnameLocale;

  return (
    new Negotiator({ headers: { 'accept-language': acceptLanguage } }).language(
      defaultAvailableLocales
    ) ?? defaultLocale
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const parsedSearchParams = searchParamsSchema.parse(Object.fromEntries(searchParams.entries()));
  const acceptLanguage = request.headers.get('Accept-Language');
  const locale = await detectLocale(acceptLanguage ?? '', pathname);

  const headers = new Headers(request.headers);
  headers.set('X-Pathname', pathname);
  headers.set('X-Search-Params', toSearchParams(parsedSearchParams).toString());
  headers.set('X-Locale', locale);

  if (
    defaultAvailableLocales.includes(locale) &&
    `/${locale}` === pathname &&
    searchParams.get('seed') !== null &&
    searchParams.get('shuffle') !== null
  ) {
    return NextResponse.next({ headers });
  }
  if (!parsedSearchParams.seed) parsedSearchParams.seed = new Date().getTime();
  if (!parsedSearchParams.shuffle) parsedSearchParams.shuffle = false;
  request.nextUrl.pathname = `/${locale}`;
  request.nextUrl.search = toSearchParams(parsedSearchParams).toString();

  return NextResponse.redirect(request.nextUrl, { headers });
}
