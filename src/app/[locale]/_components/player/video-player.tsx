'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDrawer } from '@/hooks/use-drawer';
import { usePageParams } from '@/hooks/use-page-params';
import { usePlayer } from '@/hooks/use-player';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/libs/tw';
import { NoticeType, showMessage } from '../notice';
import { MediaCaption } from './caption';

type VideoPlayerProps = {
  url: string;
  mediaCount: number;
  caption: string;
};

export function VideoPlayer({ url, mediaCount, caption }: VideoPlayerProps) {
  const { options, playing, playerRef, display, setPlaying, playAt, playNext } = usePlayer();
  const { settingsOpen, playlistOpen } = useDrawer();
  const [mounted, setMounted] = useState(false);
  const t = useTranslation();
  const { parsedSearchParams } = usePageParams();

  const onReady = () => {
    if (options.autoplay && !playing) {
      setPlaying(true);
    }
  };

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onEnded = () => {
    if (parsedSearchParams.mediaIndex === null) return;

    if (options.loop) playAt(parsedSearchParams.mediaIndex);
    else playNext(parsedSearchParams.mediaIndex, mediaCount);
  };

  const onError = () => {
    showMessage(t['Failed to load the video.'], NoticeType.ERROR);
    setPlaying(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <figure
      className={cn(
        'w-full flex flex-col items-center gap-1 my-4',
        display === 'expanded' && 'h-[64vh]'
      )}
    >
      <MediaCaption caption={caption} />
      <div
        className={cn(
          'flex justify-center rounded-lg overflow-hidden transition-all duration-150 ease-out border',
          playing &&
            'w-max h-max border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600',
          !playing &&
            'w-full border-transparent dark:border-transparent dark:bg-transparent dark:text-transparent',
          display === 'normal'
            ? 'max-w-2xl'
            : 'w-[calc(100%-40rem)] h-[calc(56vw-4rem)] *:!w-full *:!h-full',
          display === 'expanded' &&
            playlistOpen &&
            !settingsOpen &&
            'w-[calc(100%-20rem)] translate-x-[10rem]',
          display === 'expanded' &&
            !playlistOpen &&
            settingsOpen &&
            'w-[calc(100%-20rem)] -translate-x-[10rem]',
          display === 'expanded' && !playlistOpen && !settingsOpen && 'w-full'
        )}
      >
        {mounted && url !== '#' && (
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            volume={(options.volume ?? 100) / 100}
            stopOnUnmount={false}
            loop={options.loop}
            config={{
              youtube: {
                playerVars: {
                  autoplay: options.autoplay ? 1 : 0,
                  controls: 1,
                  fs: options.fs ? 1 : 0,
                  cc_load_policy: 0,
                  rel: 0,
                },
              },
            }}
            onClickPreview={(e) => console.log('onClickPreview', e)}
            onDuration={(duration) => console.log('onDuration', duration)}
            onEnded={onEnded}
            onError={onError}
            onPause={onPause}
            onPlay={onPlay}
            onReady={onReady}
            onSeek={(seconds) => console.log('onSeek', seconds)}
            onStart={() => console.log('onStart')}
          />
        )}
      </div>
    </figure>
  );
}
