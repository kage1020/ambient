import 'server-only';
import fs from 'node:fs/promises';
import { LanguageTranslation } from '@/types';
import { headers } from 'next/headers';
import {} from 'next/navigation';

export async function loadLanguageFiles() {
  const files = (await fs.readdir(process.cwd() + '/public/languages')).filter(
    (file) => file.endsWith('.json') && file.includes('-')
  );
  return files;
}

export async function loadLanguageFile(filename: string) {
  const content = await fs.readFile(process.cwd() + '/public/languages/' + filename, 'utf-8');
  return JSON.parse(content) as LanguageTranslation;
}

export async function getTranslation(locale: string) {
  const files = await loadLanguageFiles();
  let file = files.find((f) => f.includes(locale));
  if (!file) file = files.find((f) => f.includes('en'))!;
  return await loadLanguageFile(file);
}

export async function isValidLocale(locale: string) {
  const files = await loadLanguageFiles();
  return files.some((f) => f.includes(locale));
}

export async function getLocale() {
  const pathname = headers().get('X-Pathname');
  if (!pathname) return 'en';
  return (await isValidLocale(pathname.slice(1))) ? pathname.slice(1, 3) : 'en';
}
