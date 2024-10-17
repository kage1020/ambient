'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ThemeProvider, useTheme } from 'next-themes';
import { playerAtom } from '@/atoms/player';
import { playlistAtom } from '@/atoms/playlist';
import { defaultOption } from '@/const';
import usePlayer from '@/hooks/use-player';
import { Media, Playlist } from '@/types';

type JotaiHydratorProps = {
  playlistName?: string;
  categoryName?: string;
  mediaIndex?: number;
  playlist: Playlist | null;
  mediaList: Media[];
  seed?: string;
  children: React.ReactNode;
};

export function JotaiHydrator({
  playlistName,
  categoryName,
  mediaIndex,
  playlist,
  mediaList,
  seed,
  children,
}: JotaiHydratorProps) {
  const { theme, setTheme } = useTheme();
  const { setPlaylistState, setPlayerState } = usePlayer();
  const router = useRouter();
  const searchParams = useSearchParams();
  useHydrateAtoms([
    [
      playerAtom,
      {
        playing: false,
        duration: 0,
        volume: 1,
        options: { ...defaultOption, ...playlist?.options, dark: theme === 'dark' },
      },
    ],
    [
      playlistAtom,
      {
        name: playlistName ?? '',
        category: categoryName ?? '',
        index: mediaIndex ?? -1,
        items: mediaList,
      },
    ],
  ]);

  useEffect(() => {
    const newOptions = {
      ...defaultOption,
      ...playlist?.options,
      dark: theme === 'dark',
    };
    if (newOptions.shuffle && !searchParams.get('f')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('f', 'true');
      router.push(`?${newParams.toString()}`);
    }
  }, [
    categoryName,
    mediaIndex,
    mediaList,
    playlist?.options,
    playlistName,
    router,
    searchParams,
    seed,
    setPlayerState,
    setPlaylistState,
    setTheme,
    theme,
  ]);

  return children;
}

type ProviderProps = {
  children: React.ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <JotaiProvider>
      <ThemeProvider defaultTheme='system' storageKey='ambient.theme' attribute='class'>
        {children}
      </ThemeProvider>
    </JotaiProvider>
  );
}
