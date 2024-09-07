'use client';

import { Label } from 'flowbite-react';
import usePlayer from '@/hooks/use-player';
import { getFlags } from '@/libs/flags';
import { cn } from '@/libs/tw';
import { LanguageTranslation } from '@/types';

type FaderToggleProps = {
  t: LanguageTranslation;
};

export default function FaderToggle({ t }: FaderToggleProps) {
  const { playlistState, setOption } = usePlayer();
  const flags = getFlags();

  return (
    <div className='p-4'>
      <Label
        id='toggle-fader'
        className={cn(
          'relative inline-flex items-center',
          flags.fader ? 'cursor-pointer' : 'cursor-default'
        )}
      >
        <input
          type='checkbox'
          checked={playlistState.options.fader}
          className='sr-only peer'
          onChange={() => setOption({ fader: !playlistState.options.fader })}
          disabled={!flags.fader} // TODO: Implement this feature
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span
          className={cn(
            'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
            !flags.fader && 'opacity-50'
          )}
        >
          {t['Pseudo fader']}
        </span>
      </Label>
    </div>
  );
}
