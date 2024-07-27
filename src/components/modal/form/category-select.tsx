'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import usePlaylist from '@/hooks/use-playlist';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TooltipLabel } from './label';

export const CategorySelect = forwardRef<
  HTMLSelectElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { categories } = usePlaylist();
  const { t } = useLocale(locale);

  return (
    <div className='mb-4'>
      <TooltipLabel
        htmlFor='media-category'
        tooltipContent={t['Choose category is required']}
        errorText={t['Choose category is required']}
        required
      >
        {t['Category']}
      </TooltipLabel>
      <select
        id='media-category'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        required
        value={t['Choose a playlist category']}
        {...props}
        ref={ref}
      >
        <option value={t['Choose a playlist category']} disabled>
          {t['Choose a playlist category']}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
});
