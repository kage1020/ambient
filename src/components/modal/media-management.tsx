'use client';

import { useState } from 'react';
import useLocale from '@/hooks/use-locale';
import { cn } from '@/libs/tw';
import YoutubeMediaManagementForm from './form/youtube';
import LocalMediaManagementForm from './form/local';

type MediaManagementFormProps = {
  locale: string;
};

export default function MediaManagementForm({ locale }: MediaManagementFormProps) {
  const { t } = useLocale(locale);
  const isLocal = process.env.NEXT_PUBLIC_ENV === undefined;
  const [mediaType, setMediaType] = useState('youtube');

  return (
    <>
      <ul className='mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
        <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
          <div className='flex items-center pl-3'>
            <label
              htmlFor='media-type-youtube'
              className='w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              <input
                id='media-type-youtube'
                type='radio'
                name='media_type'
                checked={mediaType === 'youtube'}
                className='w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                onChange={(e) => setMediaType('youtube')}
                disabled={!isLocal}
              />
              {t['YouTube Media']}
            </label>
          </div>
        </li>
        <li className='w-full dark:border-gray-600'>
          <div className='flex items-center pl-3'>
            <label
              htmlFor='media-type-local'
              className={cn(
                'w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300',
                !isLocal && 'opacity-50'
              )}
            >
              <input
                id='media-type-local'
                type='radio'
                name='media_type'
                checked={mediaType === 'local'}
                className='w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                disabled={!isLocal}
                onChange={(e) => setMediaType('local')}
              />
              {t['Local Media']}
            </label>
          </div>
        </li>
      </ul>
      {mediaType === 'youtube' && <YoutubeMediaManagementForm locale={locale} />}
      {mediaType === 'local' && <LocalMediaManagementForm locale={locale} />}
    </>
  );
}
