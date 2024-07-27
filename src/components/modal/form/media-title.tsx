'use client';

import { forwardRef } from 'react';
import useLocale from '@/hooks/use-locale';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TooltipLabel } from './label';

export const MediaTitleInput = forwardRef<
  HTMLInputElement,
  { locale: string } & UseFormRegisterReturn
>(({ locale, ...props }, ref) => {
  const { t } = useLocale(locale);

  return (
    <div className='mb-4'>
      <TooltipLabel
        htmlFor='media-title'
        tooltipContent={t['Media title is required']}
        errorText={t['Media title is required']}
        required
      >
        {t['Title']}
      </TooltipLabel>
      <input
        id='media-title'
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 normal-input'
        placeholder={t['Displayed media title']}
        required
        {...props}
        ref={ref}
      />
    </div>
  );
});
