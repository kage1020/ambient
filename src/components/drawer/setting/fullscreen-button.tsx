'use client';

import { Button } from 'flowbite-react';
import usePlayer from '@/hooks/use-player';
import { LanguageTranslation } from '@/types';

type FullscreenToggleProps = {
  t: LanguageTranslation;
};

export default function FullscreenToggle({ t }: FullscreenToggleProps) {
  const { toggleFullscreen } = usePlayer();

  return (
    <div className='p-4'>
      <Button onClick={toggleFullscreen} color='gray' className='dark:text-white'>
        {t['Fullscreen']}
      </Button>
    </div>
  );
}
