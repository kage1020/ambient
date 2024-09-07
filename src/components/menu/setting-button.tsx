'use client';

import { Tooltip } from 'flowbite-react';
import { Setting } from '@/components/icons';
import useDrawer from '@/hooks/use-drawer';
import { LanguageTranslation } from '@/types';

type SettingButtonProps = {
  t: LanguageTranslation;
};

export default function SettingButton({ t }: SettingButtonProps) {
  const { settingsDrawerState, setSettingsDrawerState } = useDrawer();

  return (
    <Tooltip
      content={t['Settings']}
      theme={{
        target: 'hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        id='btn-settings'
        className='px-5 w-full h-full rounded-l-full inline-flex flex-col items-center justify-center'
        onClick={() => setSettingsDrawerState({ open: !settingsDrawerState.open })}
      >
        <Setting className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Settings']}</span>
      </button>
    </Tooltip>
  );
}
