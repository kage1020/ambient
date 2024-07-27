'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';

export const VolumeInput = forwardRef<
  HTMLInputElement,
  { locale: string; value: number } & UseFormRegisterReturn
>(({ locale, value, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div className='mb-4'>
      <label
        htmlFor='media-volume'
        className='flex justify-between mb-2 text-sm font-medium normal-text'
      >
        {t['Default playback volume']}
        <span id='default-media-volume' className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'>
          {value}
        </span>
      </label>
      <input
        id='media-volume'
        type='range'
        defaultValue='100'
        min='0'
        max='100'
        step='1'
        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600'
        {...props}
        ref={ref}
      />
    </div>
  );
});
