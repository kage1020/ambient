'use client';

import { useEffect } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider, useTheme } from 'next-themes';
import { defaultOption } from '@/const';
import usePlayer from '@/hooks/use-player';
import { Media, Playlist } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const { theme } = useTheme();
  const { setPlaylistState } = usePlayer();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const localOptions = localStorage?.getItem('ambient.options');
    const newState = {
      name: playlistName ?? '',
      category: categoryName ?? '',
      index: mediaIndex ?? -1,
      items: mediaList,
      options: {
        ...defaultOption,
        ...playlist?.options,
        ...JSON.parse(localOptions ?? '{}'),
        dark: theme === 'dark',
      },
    };
    setPlaylistState(newState);
    if (newState.options.shuffle && !searchParams.get('f')) {
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
    setPlaylistState,
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
