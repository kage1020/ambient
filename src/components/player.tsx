'use client';

import { useRef } from 'react';
import ReactPlayer from 'react-player';
import Carousel from '@/components/carousel';
import useLocale from '@/hooks/use-locale';
import useMediaQuery from '@/hooks/use-media-query';
import useMessage from '@/hooks/use-message';
import usePlayer from '@/hooks/use-player';
import usePlaylist from '@/hooks/use-playlist';
import { formatMediaCaption, getYoutubeURL } from '@/libs/format';
import { cn } from '@/libs/tw';

type PlayerProps = {
  locale: string;
};

export default function Player({ locale }: PlayerProps) {
  const { t } = useLocale(locale);
  const { showMessage } = useMessage();
  const { playerRef, playing, setPlaying, playNext } = usePlayer();
  const { playlistOptions, mediaList, mediaIndex } = usePlaylist();
  const { windowSize } = useMediaQuery();
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex flex-col items-center max-w-full w-full h-full mt-0 mx-auto mb-16 z-10 overflow-y-auto overflow-x-hidden'>
      <Carousel locale={locale} />
      <figure className='w-full flex flex-col items-center gap-1 mt-4 mb-16 select-none'>
        <figcaption
          id='media-caption'
          className='text-gray-900 text-lg font-normal dark:text-white max-w-full flex justify-center items-center gap-2 mb-2 whitespace-nowrap overflow-hidden'
        >
          {mediaList.length > 0 &&
            Array.from({
              length:
                (marqueeRef.current?.clientWidth || 0) > windowSize.width ||
                (marqueeRef.current?.clientWidth || 0) > 640
                  ? 5
                  : 1,
            }).map((_, i) => (
              <div
                key={i}
                ref={i === 0 ? marqueeRef : null}
                className={cn(
                  (marqueeRef.current?.clientWidth || 0) > windowSize.width ||
                    (marqueeRef.current?.clientWidth || 0) > 640
                    ? 'animate-marquee flex-shrink-0'
                    : ''
                )}
                style={
                  {
                    '--duration': Math.floor((marqueeRef.current?.clientWidth || 0) / 32) + 's',
                  } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{
                  __html: formatMediaCaption(playlistOptions, mediaList[mediaIndex]),
                }}
                aria-hidden={i > 0}
              ></div>
            ))}
        </figcaption>
        <div
          id='embed-wrapper'
          className={cn(
            'flex justify-center border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0',
            mediaList[mediaIndex]?.videoid && 'w-max h-max opacity-100',
            mediaList[mediaIndex]?.file && 'max-w-2xl w-max h-max border-0 opacity-100'
          )}
        >
          {mediaList[mediaIndex]?.file ||
            (mediaList[mediaIndex]?.videoid && (
              <ReactPlayer
                ref={playerRef}
                url={getYoutubeURL(mediaList[mediaIndex]?.videoid)}
                playing={playing}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      fs: 0,
                      cc_load_policy: 0,
                      rel: 0,
                    },
                  },
                }}
                onReady={() => setPlaying(true)}
                onEnded={playNext}
                onError={(e) => showMessage(e, 'error', locale)}
              />
            ))}
        </div>
        <div
          id='optional-container'
          className={cn(
            'my-4 transition-all duration-150 ease-out',
            playing && mediaList[mediaIndex] ? 'opacity-100' : 'opacity-0'
          )}
        >
          <a
            id='btn-watch-origin'
            href={getYoutubeURL(mediaList[mediaIndex]?.videoid)}
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
