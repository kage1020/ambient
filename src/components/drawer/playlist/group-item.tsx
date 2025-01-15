'use client';

import { useEffect } from 'react';
import usePlayer from '@/hooks/use-player';
import { cn } from '@/libs/tw';
import { scrollIntoView } from '@/libs/utils';

type PlaylistGroupItemProps = {
  children: React.ReactNode;
  index: number;
  initialIndex?: number;
};

export default function PlaylistGroupItem({
  index,
  initialIndex,
  children,
}: PlaylistGroupItemProps) {
  const { playlistState: state, playAt, itemRef } = usePlayer();
  const stateIndex = initialIndex ?? state.index;

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    scrollIntoView(itemRef.current);
    playAt(index);
  };

  useEffect(() => {
    if (index === stateIndex) {
      scrollIntoView(itemRef.current);
    }
  }, [index, itemRef, stateIndex]);

  return (
    <button
      ref={index === stateIndex ? itemRef : null}
      className={cn(
        'flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:border-gray-600',
        index !== stateIndex &&
          'hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white',
        index === stateIndex && 'text-white bg-blue-500 dark:bg-gray-800'
      )}
      onClick={(e) => handlePlay(e, index)}
    >
      {children}
    </button>
  );
}
