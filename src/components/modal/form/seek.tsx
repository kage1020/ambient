'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from './label';

export const SeekStartInput = forwardRef<
  HTMLInputElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div>
      <Label htmlFor='seek-start' errorText={t['Invalid format']}>
        {t['Seek start']}
      </Label>
      <input
        id='seek-start'
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        placeholder={t['Integer of seconds or H:MM:SS format']}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export const SeekEndInput = forwardRef<
  HTMLInputElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div>
      <Label htmlFor='seek-end' errorText={t['Invalid format']}>
        {t['Seek end']}
      </Label>
      <input
        id='seek-end'
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        placeholder={t['Integer of seconds or H:MM:SS format']}
        {...props}
        ref={ref}
      />
    </div>
  );
});
