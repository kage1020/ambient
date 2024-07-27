'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from './label';

export const FadeInInput = forwardRef<HTMLInputElement, { locale: string } & UseFormRegisterReturn>(
  ({ locale, ...props }, ref) => {
    const { t } = useLocale(locale);

    return (
      <div>
        <Label htmlFor='fadein-seconds' errorText={t['Invalid format']}>
          {t['Fade-in seconds']}
        </Label>
        <input
          id='fadein-seconds'
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 normal-input'
          placeholder={t['Integer of seconds']}
          pattern='^[0-9]+$'
          {...props}
          ref={ref}
        />
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
          {t['Set seconds fade-in from start of playback.']}
        </p>
      </div>
    );
  }
);

export const FadeOutInput = forwardRef<
  HTMLInputElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div>
      <Label htmlFor='fadeout-seconds' errorText={t['Invalid format']}>
        {t['Fade-out seconds']}
      </Label>
      <input
        id='fadeout-seconds'
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        placeholder={t['Integer of seconds']}
        pattern='^[0-9]+$'
        {...props}
        ref={ref}
      />
      <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
        {t['Set seconds fade-out to end of playback.']}
      </p>
    </div>
  );
});
