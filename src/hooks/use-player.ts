'use client';

import { createContext, useCallback, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type ReactPlayer from 'react-player';
import { defaultPlaylistOption } from '@/libs/const';
import type { PlaylistOption } from '@/libs/playlist';
import { Random } from '@/libs/random';

type PlayerContextType = {
  playerRef: React.RefObject<ReactPlayer | null> | null;
  options: PlaylistOption;
  playing: boolean;
  remotePlaylists: string[];
  display: 'normal' | 'expanded';
  setOptions: (option: Partial<PlaylistOption>) => void;
  setPlaying: (playing: boolean) => void;
  setRemotePlaylists: (playlists: string[]) => void;
  setDisplay: (display: 'normal' | 'expanded') => void;
};

export const PlayerContext = createContext<PlayerContextType>({
  playerRef: null,
  options: defaultPlaylistOption,
  playing: false,
  remotePlaylists: [],
  display: 'normal',
  setOptions: () => {},
  setPlaying: () => {},
  setRemotePlaylists: () => {},
  setDisplay: () => {},
});

export function usePlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }

  const playAt = useCallback(
    (index: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('mediaIndex', index.toString());
      router.push(`?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const playPrev = useCallback(
    (currentIndex: number, mediaCount: number) => {
      if (context.options.random) {
        const random = new Random(Number.parseInt(searchParams.get('seed') ?? '42'));
        playAt(random.next() % mediaCount);
      } else {
        playAt((currentIndex - 1 + mediaCount) % mediaCount);
      }
    },
    [context.options.random, playAt, searchParams]
  );

  const playNext = useCallback(
    (currentIndex: number, mediaCount: number) => {
      if (context.options.random) {
        const random = new Random(Number.parseInt(searchParams.get('seed') ?? '42'));
        playAt(random.next() % mediaCount);
      } else {
        playAt((currentIndex + 1) % mediaCount);
      }
    },
    [context.options.random, playAt, searchParams]
  );

  const selectPlaylist = useCallback(
    (name: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (name === '') {
        newSearchParams.delete('playlist');
      } else if (name.startsWith('http')) {
        const storedPlaylistsString = localStorage.getItem('ambient.playlists') ?? '[]';
        const storedPlaylists = JSON.parse(storedPlaylistsString) as string[];
        localStorage.setItem(
          'ambient.playlists',
          JSON.stringify([...new Set([...storedPlaylists, name]).values()])
        );
        newSearchParams.set('playlist', name);
      } else {
        newSearchParams.set('playlist', name);
      }
      newSearchParams.set('shuffle', 'false');
      newSearchParams.delete('category');
      newSearchParams.delete('mediaIndex');
      router.push(`?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const selectCategory = useCallback(
    (name: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('category', name);
      newSearchParams.delete('mediaIndex');
      router.push(`?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const setFullscreen = useCallback(() => {
    context.playerRef?.current?.getInternalPlayer().g.requestFullscreen();
  }, [context.playerRef]);

  return { ...context, playAt, playPrev, playNext, selectPlaylist, selectCategory, setFullscreen };
}
