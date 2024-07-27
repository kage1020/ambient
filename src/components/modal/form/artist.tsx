'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';

export const ArtistInput = forwardRef<HTMLInputElement, { locale: string } & UseFormRegisterReturn>(
  ({ locale, ...props }, ref) => {
    const { t } = useLocale(locale);

    return (
      <div className='mb-4'>
        <label htmlFor='media-artist' className='block mb-2 text-sm font-medium normal-text'>
          {t['Artist']}
        </label>
        <input
          id='media-artist'
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 normal-input'
          placeholder={t['Displayed artist name']}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);
