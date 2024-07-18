import { headers } from 'next/headers';
import { AcceptableLocales } from '@/libs/assets';
import enUS from '../../public/languages/lang-en.json';
import jaJP from '../../public/languages/lang-ja.json';

export function getLocale() {
  const acceptLanguage = headers().get('accept-language');
  if (!acceptLanguage) return 'en';
  const candidate = acceptLanguage.split(',').map((l) => l.split(';')[0])[0];
  return (
    AcceptableLocales.some((locale) => locale.code === candidate) ? candidate : 'en'
  ) as (typeof AcceptableLocales)[number]['code'];
}

// TODO: dynamically import the locale file
export function getLocaleText() {
  const locale = getLocale();

  switch (locale) {
    case 'ja':
      return { locale, t: jaJP };
    default:
      return { locale, t: enUS };
  }
}
