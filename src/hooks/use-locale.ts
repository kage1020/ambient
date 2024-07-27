import { useRouter } from 'next/navigation';
import enUS from '../../public/languages/lang-en.json';
import jaJP from '../../public/languages/lang-ja.json';

// TODO: dynamically import the locale file
export default function useLocale(locale: string) {
  const router = useRouter();
  const t = locale === 'ja' ? jaJP : enUS;

  const changeLocale = (locale: string) => {
    router.push(`/${locale}`);
  };

  return { t, changeLocale };
}

export type Locale = ReturnType<typeof useLocale>;
