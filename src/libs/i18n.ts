import 'server-only';

import en from '../../assets/languages/lang-en.json';
import ja from '../../assets/languages/lang-ja.json';
import { headers } from 'next/headers';

export type Translation = typeof en;
export const defaultLocale = 'en';
export const defaultAvailableLocales = ['en', 'ja'];
const isLocal = process.env.NODE_ENV === 'development';

export async function getLanguageFileNames() {
  if (!isLocal) return ['lang-en.json', 'lang-ja.json'];

  const fs = await import('node:fs/promises');
  const files = await fs.readdir(`${process.cwd()}/assets/languages`);
  return files.filter((file) => file.endsWith('.json') && file.includes('-'));
}

export async function getAvailableLocales() {
  if (!isLocal) return defaultAvailableLocales;

  const files = await getLanguageFileNames();
  return files.map((file) => file.slice(5, 7));
}

export async function getTranslation(locale?: string): Promise<Translation> {
  if (locale === undefined) {
    const header = await headers();
    locale = header.get('X-Locale') || defaultLocale;
  }

  if (!isLocal) return locale === 'ja' ? ja : en;

  const files = await getLanguageFileNames();
  const file = files.find((f) => f.includes(locale));
  if (!file) return en;

  const fs = await import('node:fs/promises');
  const content = await fs.readFile(`${process.cwd()}/assets/languages/${file}`, 'utf-8');
  return JSON.parse(content) as Translation;
}
