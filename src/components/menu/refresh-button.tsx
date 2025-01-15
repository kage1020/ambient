'use client';

import { Tooltip } from 'flowbite-react';
import { Refresh } from '@/components/icons';
import { LanguageTranslation } from '@/types';

type RefreshButtonProps = {
  t: LanguageTranslation;
};

export default function RefreshButton({ t }: RefreshButtonProps) {
  return (
    <Tooltip
      content={t['Refresh']}
      theme={{
        target: 'hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        className='inline-flex flex-col items-center justify-center px-5 w-full h-full'
        onClick={() => window.location.reload()}
      >
        <Refresh className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Refresh']}</span>
      </button>
    </Tooltip>
  );
}
