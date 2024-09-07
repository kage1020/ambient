'use client';

import { useCallback, useRef, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { useTheme } from 'next-themes';
import { playerAtom } from '@/atoms/player';
import { playlistAtom } from '@/atoms/playlist';
import { PlaylistOption } from '@/types';

export default function usePlayer() {
  const [playerState, setPlayerState] = useAtom(playerAtom);
  const [playlistState, setPlaylistState] = useAtom(playlistAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [pending, startTransition] = useTransition();
  const itemRef = useRef<HTMLButtonElement | null>(null);

  const selectPlaylist = useCallback(
    (playlistName: string) => {
      startTransition(() => {
        setPlaylistState({ ...playlistState, name: playlistName });
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('p', playlistName);
        newParams.delete('c');
        newParams.delete('m');
        router.push(`?${newParams.toString()}`);
      });
    },
    [playlistState, router, searchParams, setPlaylistState]
  );

  const selectCategory = useCallback(
    (categoryName: string) => {
      startTransition(() => {
        setPlaylistState({ ...playlistState, category: categoryName });
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('c', categoryName);
        router.push(`?${newParams.toString()}`);
      });
    },
    [playlistState, router, searchParams, setPlaylistState]
  );

  const setOption = useCallback(
    (option: Partial<PlaylistOption>) => {
      setPlaylistState({ ...playlistState, options: { ...playlistState.options, ...option } });
      localStorage.setItem(
        'ambient.options',
        JSON.stringify({ ...playlistState.options, ...option })
      );
      if (option.dark !== undefined) {
        setTheme(option.dark ? 'dark' : 'light');
      }
      if (option.shuffle !== undefined) {
        const newParams = new URLSearchParams(searchParams.toString());
        if (option.shuffle) newParams.set('f', 'true');
        else newParams.delete('f');
        router.push(`?${newParams.toString()}`);
      }
    },
    [playlistState, router, searchParams, setPlaylistState, setTheme]
  );

  const playAt = useCallback(
    (index: number) => {
      startTransition(() => {
        setPlaylistState({ ...playlistState, index });
        setPlayerState({ ...playerState, playing: true });
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('m', index.toString());
        router.push(`?${newParams.toString()}`);
      });
    },
    [playerState, playlistState, router, searchParams, setPlayerState, setPlaylistState]
  );

  const playRandom = useCallback(() => {
    while (true) {
      const randomIndex = Math.floor(Math.random() * playlistState.items.length);
      if (randomIndex !== playlistState.index) {
        playAt(randomIndex);
        break;
      }
    }
  }, [playAt, playlistState.index, playlistState.items.length]);

  const playNext = useCallback(() => {
    if (playlistState.options.random && playlistState.items.length > 1) {
      playRandom();
      return;
    }
    const index = (playlistState.index + 1) % playlistState.items.length || 0;
    playAt(index);
  }, [
    playAt,
    playRandom,
    playlistState.index,
    playlistState.items.length,
    playlistState.options.random,
  ]);

  const playPrev = useCallback(() => {
    if (playlistState.options.random && playlistState.items.length > 1) {
      playRandom();
      return;
    }
    const index =
      (playlistState.index - 1 + playlistState.items.length) % playlistState.items.length || 0;
    playAt(index);
  }, [
    playAt,
    playRandom,
    playlistState.index,
    playlistState.items.length,
    playlistState.options.random,
  ]);

  const play = useCallback(() => {
    const mediaIndex = playlistState.index;
    if (mediaIndex === -1) playAt(0);
    else playAt(mediaIndex);
  }, [playAt, playlistState.index]);

  const pause = useCallback(() => {
    setPlayerState({ ...playerState, playing: false });
  }, [playerState, setPlayerState]);

  return {
    itemRef,
    pending,
    playerState,
    setPlayerState,
    playlistState,
    setPlaylistState,
    selectPlaylist,
    selectCategory,
    setOption,
    playAt,
    playNext,
    playPrev,
    play,
    pause,
  };
}
