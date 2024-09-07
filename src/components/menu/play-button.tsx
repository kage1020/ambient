'use client';

import { Tooltip } from 'flowbite-react';
import { Play } from '@/components/icons';
import usePlayer from '@/hooks/use-player';
import { cn } from '@/libs/tw';
import { LanguageTranslation } from '@/types';

type PlayButtonProps = {
  t: LanguageTranslation;
};

export default function PlayButton({ t }: PlayButtonProps) {
  const { playerState, playlistState, setPlayerState } = usePlayer();

  const handlePlay = () => {
    setPlayerState({
      ...playerState,
      playing: true,
    });
  };

  return (
    <Tooltip content={t['Play']}>
      <button
        id='btn-play'
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 disabled:pointer-events-none disabled:bg-gray-300 dark:disabled:bg-gray-500',
          playerState.playing && 'hidden'
        )}
        onClick={handlePlay}
        disabled={playerState.playing || playlistState.index === -1 || playerState.pending}
      >
        <Play className='w-4 h-4 text-white' />
        <span className='sr-only'>{t['Play']}</span>
      </button>
    </Tooltip>
  );
}
