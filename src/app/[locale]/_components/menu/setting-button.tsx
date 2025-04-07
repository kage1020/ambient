'use client';

import { Tooltip } from 'flowbite-react';
import { useDrawer } from '@/hooks/use-drawer';
import { useTranslation } from '@/hooks/use-translation';
import { Setting as SettingIcon } from '../icons';

export function SettingButton() {
  const { settingsOpen, setSettingsOpen } = useDrawer();
  const t = useTranslation();

  return (
    <Tooltip
      content={t['Settings']}
      theme={{
        target: 'hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        className='px-5 w-full h-full rounded-l-full inline-flex flex-col items-center justify-center'
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <SettingIcon className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Settings']}</span>
      </button>
    </Tooltip>
  );
}
