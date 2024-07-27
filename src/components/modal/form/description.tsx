'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';

export const DescriptionInput = forwardRef<
  HTMLInputElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div className='mb-4'>
      <label htmlFor='media-desc' className='block mb-2 text-sm font-medium normal-text'>
        {t['Description']}
      </label>
      <input
        id='media-desc'
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        placeholder={t['Subtitle or description of media']}
        {...props}
        ref={ref}
      />
    </div>
  );
});
