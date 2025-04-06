'use client';

import { Label } from 'flowbite-react';
import { usePlayer } from '@/hooks/use-player';
import { useTranslation } from '@/hooks/use-translation';

export function VolumeSlider() {
  const { options, setOptions } = usePlayer();
  const t = useTranslation();

  return (
    <div className='p-4'>
      <Label
        htmlFor='default-volume'
        className='flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {t['Default volume:']}
        <span id='default-volume-value' className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'>
          {options.volume}
        </span>
      </Label>
      <input
        id='default-volume'
        type='range'
        min='0'
        max='100'
        value={options.volume}
        step='1'
        className='w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-600'
        onChange={(e) => setOptions({ volume: Number(e.target.value) })}
      />
    </div>
  );
}
