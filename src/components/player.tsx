'use client';

import YouTube, { YouTubeEvent } from 'react-youtube';
import Carousel from '@/components/carousel';
import useLocale from '@/hooks/use-locale';
import useMessage from '@/hooks/use-message';
import { formatMediaCaption } from '@/libs/format';
import { cn } from '@/libs/tw';
import { getExtension, getOption, getYoutubeURL } from '@/libs/playlist';
import usePlayer from '@/hooks/use-player';
import { useContext } from 'react';
import { PlaylistContext } from '@/providers/playlist';

type PlayerProps = {
  locale: string;
};

export default function Player({ locale }: PlayerProps) {
  const { t } = useLocale(locale);
  const { showMessage } = useMessage();
  const { playlist, mediaIndex, playerState, setPlayerState } = useContext(PlaylistContext);
  const { youtubePlayerRef, videoPlayerRef, onPlayerReady, onPlay, onPause } = usePlayer();

  const onPlayerStateChange = (e: YouTubeEvent<number>) => {
    setPlayerState(e.data);
  };

  const onPlayerError = (e: YouTubeEvent<number>) => {
    console.error(e);
    showMessage('Something went wrong!', 'error', locale);
  };

  return (
    <div className='flex flex-col items-center max-w-full w-full h-full mt-0 mx-auto mb-16 z-10 overflow-y-auto overflow-x-hidden'>
      <Carousel locale={locale} />
      <figure className='w-full flex flex-col items-center gap-1 mt-4 mb-16 select-none'>
        <figcaption
          id='media-caption'
          className='text-gray-900 text-lg font-normal dark:text-white w-md flex justify-center items-center mb-2 whitespace-nowrap overflow-hidden'
        >
          <div className='animate-marquee md:animate-none'>
            {playlist.length > 0 && formatMediaCaption(playlist[mediaIndex])}
          </div>
          <div className='animate-marquee2 md:animate-none md:hidden' aria-hidden='true'>
            {playlist.length > 0 && formatMediaCaption(playlist[mediaIndex])}
          </div>
        </figcaption>
        <div
          id='embed-wrapper'
          className={cn(
            'flex justify-center border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0',
            playlist[mediaIndex]?.videoid && 'w-max h-max opacity-100',
            playlist[mediaIndex]?.file && 'max-w-2xl w-max h-max border-0 opacity-100'
          )}
        >
          {playlist[mediaIndex]?.videoid && (
            <YouTube
              ref={youtubePlayerRef}
              videoId={playlist[mediaIndex].videoid}
              opts={{
                playerVars: {
                  autoplay: getOption('autoplay') ?? 1,
                  controls: getOption('controls') ?? 1,
                  fs: getOption('fs') ?? 0,
                  cc_load_policy: getOption('cc') ?? 0,
                  rel: getOption('rel') ?? 0,
                  start: (getOption('seek') && playlist[mediaIndex].start) ?? undefined,
                  end: (getOption('seek') && playlist[mediaIndex].end) ?? undefined,
                },
              }}
              onReady={onPlayerReady}
              onPlay={onPlay}
              onPause={onPause}
              onStateChange={onPlayerStateChange}
              onError={onPlayerError}
            />
          )}
          {playlist[mediaIndex]?.file && (
            <video
              ref={videoPlayerRef}
              src={playlist[mediaIndex].file}
              controls={Boolean(getOption('controls'))}
              controlsList='nodownload'
              autoPlay={Boolean(getOption('autoplay'))}
              onEnded={() => {}}
            >
              <source
                src={playlist[mediaIndex].file}
                type={`audio/${getExtension(playlist[mediaIndex].file)}`}
              />
            </video>
          )}
        </div>
        <div
          id='optional-container'
          className={cn(
            'my-4 transition-all duration-150 ease-out opacity-0',
            playerState >= 0 && playerState < 3 ? 'opacity-100' : 'opacity-0 hidden'
          )}
        >
          <a
            id='btn-watch-origin'
            href={getYoutubeURL(playlist[mediaIndex]?.videoid)}
            target='_blank'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-opacity duration-500 ease-in-out'
          >
            {t['Watch on YouTube']}
            <svg
              className='inline-block -mt-0.5 w-3 h-3 text-gray-800 dark:text-white'
              aria-hidden='true'
              aria-label='external-link'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 18'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'
              />
            </svg>
          </a>
        </div>
      </figure>
    </div>
  );
}
