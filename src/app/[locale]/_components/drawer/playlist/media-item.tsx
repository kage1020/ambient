'use client';

import { useEffect, useRef } from 'react';
import { useDrawer } from '@/hooks/use-drawer';
import { usePlayer } from '@/hooks/use-player';
import { cn } from '@/libs/tw';
import { scrollIntoView } from '@/libs/utils';

type MediaItemProps = {
  children: React.ReactNode;
  index: number;
  mediaIndex: number | null;
};

export function MediaItem({ index, mediaIndex, children }: MediaItemProps) {
  const targetRef = useRef<HTMLButtonElement>(null);
  const { playAt } = usePlayer();
  const { playlistOpen } = useDrawer();

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    scrollIntoView(targetRef.current);
    playAt(index);
  };

  useEffect(() => {
    if (index === mediaIndex && playlistOpen) scrollIntoView(targetRef.current);
  }, [index, targetRef, mediaIndex, playlistOpen]);

  return (
    <button
      ref={targetRef}
      className={cn(
        'flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:border-gray-600',
        index !== mediaIndex &&
          'hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white',
        index === mediaIndex && 'text-white bg-blue-500 dark:bg-gray-800'
      )}
      onClick={(e) => handlePlay(e, index)}
    >
      {children}
    </button>
  );
}
