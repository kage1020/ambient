'use client';

import { Tooltip } from 'flowbite-react';
import { useDrawer } from '@/hooks/use-drawer';
import { useTranslation } from '@/hooks/use-translation';
import { Playlist as PlaylistIcon } from '../icons';

export function PlaylistButton() {
  const t = useTranslation();
  const { playlistOpen, setPlaylistOpen } = useDrawer();

  return (
    <Tooltip
      content={t['Playlist']}
      theme={{
        target: 'rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        className='px-5 w-full h-full rounded-l-full inline-flex flex-col items-center justify-center'
        onClick={() => setPlaylistOpen(!playlistOpen)}
      >
        <PlaylistIcon className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Playlist']}</span>
      </button>
    </Tooltip>
  );
}
