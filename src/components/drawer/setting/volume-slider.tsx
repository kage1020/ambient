'use client';

import { Label } from 'flowbite-react';
import usePlayer from '@/hooks/use-player';
import { getFlags } from '@/libs/flags';
import { LanguageTranslation } from '@/types';
import { cn } from '@/libs/tw';

type VolumeSliderProps = {
  t: LanguageTranslation;
};

export default function VolumeSlider({ t }: VolumeSliderProps) {
  const { playlistState, setOption } = usePlayer();
  const flags = getFlags();

  return (
    <div className='p-4'>
      <Label
        htmlFor='default-volume'
        className={cn(
          'flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white',
          !flags.volume && 'opacity-50'
        )}
      >
        {t['Default volume:']}
        <span id='default-volume-value' className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'>
          {playlistState.options.volume}
        </span>
      </Label>
      <input
        id='default-volume'
        type='range'
        min='0'
        max='100'
        value={playlistState.options.volume}
        step='1'
        className={cn(
          'w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-600',
          flags.volume ? 'cursor-pointer' : 'cursor-default'
        )}
        onChange={(e) => setOption({ volume: Number(e.target.value) })}
        disabled={!flags.volume} // TODO: Implement this feature
      />
    </div>
  );
}
