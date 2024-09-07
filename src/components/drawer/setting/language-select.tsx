'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { defaultLocale } from '@/const';
import { LanguageTranslation } from '@/types';

type LanguageSelectProps = {
  t: LanguageTranslation;
  locale: string;
  languages: {
    code: string;
    name: string;
  }[];
};

export default function LanguageSelect({ t, locale, languages }: LanguageSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}?${searchParams.toString()}`);
  };

  return (
    <div className='p-4'>
      <label
        htmlFor='language'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {t['Language']}
      </label>
      <select
        id='language'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        disabled={languages.length === 1}
        value={languages.find((lang) => lang.code === locale)?.code || defaultLocale}
        onChange={changeLocale}
      >
        {languages.map((lang, index) => (
          <option key={index} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
