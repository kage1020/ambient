'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { showMessage } from '@/components/notice';
import usePlayer from '@/hooks/use-player';
import { cn } from '@/libs/tw';
import { LanguageTranslation } from '@/types';

type VideoPlayerProps = {
  t: LanguageTranslation;
  url: string;
};

export default function VideoPlayer({ t, url }: VideoPlayerProps) {
  const { playerState, playlistState, play, playAt, playNext, pause } = usePlayer();
  const [mounted, setMounted] = useState(false);

  const onReady = () => {
    const isAutoplay = playlistState.options.autoplay ?? false;
    const isPlaylistReady = playlistState.items.length > 0;
    if (isAutoplay && isPlaylistReady) play();
  };

  const onEnded = () => {
    if (playlistState.options.loop) playAt(playlistState.index);
    else playNext();
  };

  const onError = () => {
    pause();
    showMessage(t['No media available.'], 'error');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        'flex justify-center border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-150 ease-out max-w-2xl border',
        playerState.playing && 'w-max h-max',
        !playerState.playing && 'w-full'
      )}
    >
      {mounted && url !== '#' && (
        <ReactPlayer
          url={url}
          playing={playerState.playing}
          config={{
            youtube: {
              playerVars: {
                autoplay: playlistState.options.autoplay ? 1 : 0,
                controls: 1,
                fs: 0,
                cc_load_policy: 0,
                rel: 0,
              },
            },
          }}
          onReady={onReady}
          onEnded={onEnded}
          onError={onError}
          onPause={pause}
        />
      )}
    </div>
  );
}
