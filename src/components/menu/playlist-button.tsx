'use client';

import { Tooltip } from 'flowbite-react';
import { Playlist } from '@/components/icons';
import useDrawer from '@/hooks/use-drawer';
import { LanguageTranslation } from '@/types';

type PlaylistButtonProps = {
  t: LanguageTranslation;
};

export default function PlaylistButton({ t }: PlaylistButtonProps) {
  const { playlistDrawerState, setPlaylistDrawerState } = useDrawer();

  return (
    <Tooltip
      content={t['Playlist']}
      theme={{
        target: 'rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        className='px-5 w-full h-full rounded-l-full inline-flex flex-col items-center justify-center'
        onClick={() => setPlaylistDrawerState({ open: !playlistDrawerState.open })}
      >
        <Playlist className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Playlist']}</span>
      </button>
    </Tooltip>
  );
}
