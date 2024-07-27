'use client';

import Image from 'next/image';
import { NextIcon, PreviousIcon } from '@/components/icons';
import useLocale from '@/hooks/use-locale';
import usePlayer from '@/hooks/use-player';
import usePlaylist from '@/hooks/use-playlist';
import placeholder from '../../public/images/ambient-placeholder.svg';
import { cn } from '@/libs/tw';

type CarouselProps = {
  locale: string;
};

export default function Carousel({ locale }: CarouselProps) {
  const { t } = useLocale(locale);
  const { mediaList, mediaIndex, playlistOptions } = usePlaylist();
  const { playPrevious, playNext } = usePlayer();

  return (
    <div className='relative w-full mt-4 flex justify-center' data-carousel='static'>
      <button
        className='relative top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-prev
        disabled={mediaList.length <= 1}
        onClick={playPrevious}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-200/50 group-disabled:bg-gray-100 dark:group-hover:bg-blue-400 group-disabled:dark:bg-gray-700 group-focus:outline-none'>
          <PreviousIcon />
          <span className='sr-only'>{t['Previous Item']}</span>
        </span>
      </button>
      <div
        id='carousel-wrapper'
        className='relative h-56 max-w-sm w-96 overflow-hidden rounded-lg md:h-64'
      >
        {mediaList.length > 0 && (
          <div
            key={mediaList[mediaIndex].mediaId}
            id='carousel-item-1'
            className='duration-700 ease-in-out'
            data-carousel-item='active'
          >
            <Image
              src={mediaList[mediaIndex].image || placeholder}
              className={cn(
                'absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-100',
                playlistOptions.dark && 'opacity-70'
              )}
              alt={mediaList[mediaIndex].title || 'NO IMAGE'}
              height={224}
              width={400}
            />
          </div>
        )}
        {mediaList.length === 0 && (
          <>
            <div id='carousel-item-1' className='duration-700 ease-in-out' data-carousel-item>
              <Image
                src={placeholder}
                className={cn(
                  'absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-100',
                  playlistOptions.dark && 'opacity-70'
                )}
                alt='NO IMAGE'
              />
            </div>
            <div id='carousel-item-2' className='duration-700 ease-in-out' data-carousel-item>
              <Image
                src={placeholder}
                className={cn(
                  'absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-100',
                  playlistOptions.dark && 'opacity-70'
                )}
                alt='NO IMAGE'
              />
            </div>
          </>
        )}
      </div>
      <button
        type='button'
        className='relative top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-next
        disabled={mediaList.length <= 1}
        onClick={playNext}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-200/50 group-disabled:bg-gray-100 dark:group-hover:bg-blue-400 group-disabled:dark:bg-gray-700 group-focus:outline-none'>
          <NextIcon />
          <span className='sr-only'>{t['Next Item']}</span>
        </span>
      </button>
    </div>
  );
}
