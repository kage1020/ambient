'use client';

import { Next } from '@/components/icons';
import usePlayer from '@/hooks/use-player';
import { LanguageTranslation } from '@/types';

type NextButtonProps = {
  t: LanguageTranslation;
};

export default function NextButton({ t }: NextButtonProps) {
  const { playNext, playlistState } = usePlayer();

  return (
    <button
      id='data-carousel-next'
      type='button'
      className='relative top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none disabled:cursor-default'
      onClick={playNext}
      disabled={playlistState.items.length === 0}
    >
      <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-200/50 dark:group-hover:bg-blue-400 group-focus:outline-none group-disabled:group-hover:bg-gray-100 group-disabled:dark:group-hover:bg-gray-700'>
        <Next className='w-4 h-4 text-gray-400 dark:text-gray-300 group-disabled:text-gray-300 group-disabled:dark:text-gray-500' />
        <span className='sr-only'>{t['Next Item']}</span>
      </span>
    </button>
  );
}
