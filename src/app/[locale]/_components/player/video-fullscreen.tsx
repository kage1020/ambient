'use client';

import { usePlayer } from '@/hooks/use-player';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/libs/tw';

type VideoFullscreenButtonProps = {
  hidden?: boolean;
};

export function VideoFullscreenButton({ hidden }: VideoFullscreenButtonProps) {
  const { setFullscreen } = usePlayer();
  const t = useTranslation();

  return (
    <button
      className={cn(
        'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-opacity duration-500 ease-in-out',
        hidden ? 'hidden' : 'block'
      )}
      onClick={setFullscreen}
    >
      {t['Fullscreen']}
    </button>
  );
}
