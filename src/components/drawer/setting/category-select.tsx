'use client';

import { Label, Select } from 'flowbite-react';
import usePlayer from '@/hooks/use-player';
import { LanguageTranslation } from '@/types';

type CategorySelectProps = {
  t: LanguageTranslation;
  categories: string[];
};

export default function CategorySelect({ t, categories }: CategorySelectProps) {
  const { selectCategory, playlistState } = usePlayer();

  return (
    <div className='p-4'>
      <Label htmlFor='target-category' className='block mb-2'>
        {t['Target Category']}
      </Label>
      <Select
        id='target-category'
        theme={{
          field: {
            select: {
              base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
              colors: {
                gray: 'focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              },
            },
          },
        }}
        value={playlistState.category || t['All categories']}
        onChange={(e) => selectCategory(e.target.value)}
      >
        <option disabled>{t['All categories']}</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </Select>
    </div>
  );
}
