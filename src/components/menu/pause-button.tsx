'use client';

import { Tooltip } from 'flowbite-react';
import { Pause } from '@/components/icons';
import usePlayer from '@/hooks/use-player';
import { cn } from '@/libs/tw';
import { LanguageTranslation } from '@/types';

type PauseButtonProps = {
  t: LanguageTranslation;
};

export default function PauseButton({ t }: PauseButtonProps) {
  const { playerState, playlistState, setPlayerState } = usePlayer();

  const handlePause = () => {
    setPlayerState({
      ...playerState,
      playing: false,
    });
  };

  return (
    <Tooltip content={t['Pause']}>
      <button
        id='btn-pause'
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 disabled:pointer-events-none disabled:bg-gray-300 dark:disabled:bg-gray-500',
          !playerState.playing && 'hidden'
        )}
        onClick={handlePause}
        disabled={!playerState.playing || playlistState.index === -1 || playerState.pending}
      >
        <Pause className='w-4 h-4 text-white' />
        <span className='sr-only'>{t['Pause']}</span>
      </button>
    </Tooltip>
  );
}
