'use client';

import { Tooltip } from 'flowbite-react';
import { usePlayer } from '@/hooks/use-player';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/libs/tw';
import { Play as PlayIcon } from '../icons';

type PlayButtonProps = {
  disabled: boolean;
};

export function PlayButton({ disabled }: PlayButtonProps) {
  const { playing, setPlaying } = usePlayer();
  const t = useTranslation();

  return (
    <Tooltip content={t['Play']}>
      <button
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 disabled:pointer-events-none disabled:bg-gray-300 dark:disabled:bg-gray-500',
          playing && 'hidden'
        )}
        onClick={() => setPlaying(true)}
        disabled={playing || disabled}
      >
        <PlayIcon className='w-4 h-4 text-white' />
        <span className='sr-only'>{t['Play']}</span>
      </button>
    </Tooltip>
  );
}
