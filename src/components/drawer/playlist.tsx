'use client';

import { useContext } from 'react';
import Image from 'next/image';
import useLocale from '@/hooks/use-locale';
import { getYoutubeThumbnailURL } from '@/libs/format';
import { cn } from '@/libs/tw';
import { DrawerPlaylistContext } from '@/providers/drawer';
import { PlaylistContext } from '@/providers/playlist';

type DrawerPlaylistProps = {
  locale: string;
};

export default function DrawerPlaylist({ locale }: DrawerPlaylistProps) {
  const { t } = useLocale(locale);
  const { isPlaylistOpen, setPlaylistOpen } = useContext(DrawerPlaylistContext);
  const { mediaList, mediaIndex, setMediaIndex } = useContext(PlaylistContext);

  return (
    <div
      id='drawer-playlist'
      className={cn(
        'fixed top-0 left-0 z-50 h-screen overflow-y-auto transition-transform bg-white border-r border-gray-200 w-80 dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow dark:shadow-md',
        isPlaylistOpen ? 'translate-x-0' : '-translate-x-full'
      )}
      tabIndex={-1}
      aria-labelledby='drawer-playlist-label'
    >
      <div className='p-4 fixed top-0 left-0 z-auto w-80 h-14 flex flex-nowrap justify-between items-center bg-white border-r border-b dark:bg-gray-800 dark:border-gray-600'>
        <h5
          id='drawer-playlist-label'
          className='inline-flex items-center text-base font-semibold text-gray-500 dark:text-white text-rotate-0'
        >
          <svg
            className='w-5 h-5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0'
            aria-hidden='true'
            aria-label='play-list'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 16'
          >
            <path d='M14.316.051A1 1 0 0 0 13 1v8.473A4.49 4.49 0 0 0 11 9c-2.206 0-4 1.525-4 3.4s1.794 3.4 4 3.4 4-1.526 4-3.4a2.945 2.945 0 0 0-.067-.566c.041-.107.064-.22.067-.334V2.763A2.974 2.974 0 0 1 16 5a1 1 0 0 0 2 0C18 1.322 14.467.1 14.316.051ZM10 3H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Z' />
            <path d='M10 7H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Zm-5 4H1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2Z' />
          </svg>
          <span className='ml-2 text-rotate-0'>{t['Playlist']}</span>
        </h5>
        <button
          type='button'
          id='btn-close-playlist'
          data-drawer-hide='drawer-playlist'
          aria-controls='drawer-playlist'
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
          onClick={() => setPlaylistOpen(false)}
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>{t['Close Playlist']}</span>
        </button>
      </div>
      <div
        id='playlist-list-group'
        className='w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-136px)]'
      >
        {mediaList.length > 0 &&
          mediaList.map((media, i) => (
            <button
              key={media.mediaId}
              aria-current={mediaList[mediaIndex].mediaId === media.mediaId}
              className={
                mediaList[mediaIndex].mediaId === media.mediaId
                  ? 'flex items-center gap-2 w-full px-4 py-2 text-white bg-blue-500 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600'
                  : 'flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
              }
              data-playlist-item={media.mediaId}
              onClick={() => setMediaIndex(i)}
            >
              <Image
                src={getYoutubeThumbnailURL(media.videoid) || '/no-media-thumb.svg'}
                alt={media.title}
                className='block h-8 w-8 rounded object-cover'
                width={32}
                height={32}
              />
              <div className='flex flex-col overflow-hidden text-left'>
                <span className='text--playlist-title whitespace-nowrap overflow-ellipsis overflow-hidden'>
                  {media.title}
                </span>
                {media.artist && (
                  <span className='text--playlist-artist whitespace-nowrap overflow-ellipsis overflow-hidden'>
                    {media.artist}
                  </span>
                )}
              </div>
            </button>
          ))}
        {mediaList.length === 0 && (
          <div
            id='no-media'
            className='flex w-full h-full justify-center items-center text-base text-gray-500'
          >
            {t['No media available.']}
          </div>
        )}
      </div>
    </div>
  );
}
