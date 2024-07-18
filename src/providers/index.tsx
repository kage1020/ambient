'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { getOptions, Media, PlaylistOption } from '@/libs/playlist';
import { DrawerPlaylistContext, DrawerSettingsContext } from '@/providers/drawer';
import { ModalContext } from '@/providers/modal';
import { PlaylistContext } from '@/providers/playlist';
import { PlayerContext } from '@/providers/player';
import { useTheme } from 'next-themes';

type ProvidersProps = {
  playlists: string[];
  allCategories: { [key: string]: string[] };
  allMediaLists: { [key: string]: { [key: string]: Media[] } };
  children: React.ReactNode;
};

export default function AmbientProviders({
  playlists,
  allCategories,
  allMediaLists,
  children,
}: ProvidersProps) {
  const [isPlaylistOpen, setPlaylistOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('all');
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [mediaIndex, _setMediaIndex] = useState<number>(0);
  const [playlistOptions, _setPlaylistOptions] = useState<PlaylistOption>({
    loop: false,
    random: false,
    shuffle: false,
    seek: false,
    volume: 100,
    fader: false,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const { theme, setTheme } = useTheme();

  const selectPlaylist = useCallback((name: string) => {
    localStorage.setItem('ambient.playlist', name);
    setPlaylistName(name);
  }, []);

  const selectCategory = useCallback((name: string) => {
    localStorage.setItem('ambient.category', name);
    setCategoryName(name);
  }, []);

  const setMediaIndex = useCallback(
    (value: number | ((prevState: number) => number)) => {
      if (typeof value === 'function') {
        _setMediaIndex(value(mediaIndex) % mediaList.length);
        return;
      }
      _setMediaIndex(value % mediaList.length);
    },
    [mediaIndex, mediaList.length]
  );

  const setPlaylistOptions = useCallback(
    (value: PlaylistOption | ((prevState: PlaylistOption) => PlaylistOption)) => {
      if (typeof value === 'function') {
        localStorage.setItem('ambient.options', JSON.stringify(value(playlistOptions)));
        _setPlaylistOptions(value(playlistOptions));
        setTheme(value(playlistOptions).dark ? 'dark' : 'light');
        return;
      }
      localStorage.setItem('ambient.options', JSON.stringify(value));
      _setPlaylistOptions(value);
      setTheme(value.dark ? 'dark' : 'light');
    },
    [playlistOptions, setTheme]
  );

  const setDark = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => {
      if (typeof value === 'function') {
        _setPlaylistOptions((prev) => ({ ...prev, dark: value(Boolean(playlistOptions.dark)) }));
        setTheme(value(Boolean(playlistOptions.dark)) ? 'dark' : 'light');
        return;
      }
      _setPlaylistOptions((prev) => ({ ...prev, dark: value }));
      setTheme(value ? 'dark' : 'light');
    },
    [playlistOptions.dark, setTheme]
  );

  const shuffleMediaList = useCallback(() => {
    return mediaList.sort(() => Math.random() - 0.5);
  }, [mediaList]);

  // initialize
  useEffect(() => {
    const name = localStorage.getItem('ambient.playlist');
    const category = localStorage.getItem('ambient.category');
    const options = localStorage.getItem('ambient.options');
    if (name) {
      setPlaylistName(name);
    }
    if (category) {
      setCategoryName(category);
    }
    if (options) {
      const value = JSON.parse(options);
      _setPlaylistOptions(value);
      setTheme(value.dark ? 'dark' : 'light');
    }
  }, [setTheme]);

  useEffect(() => {
    if (playlistName) {
      setCategories(allCategories[playlistName]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistName]);

  useEffect(() => {
    const setOptionsAsync = async () => {
      const options = await getOptions(playlistName);
      _setPlaylistOptions((prev) => ({ ...prev, ...options }));
      setTheme(options.dark ? 'dark' : 'light');
    };
    setOptionsAsync();
  }, [playlistName, setTheme]);

  useEffect(() => {
    const items = allMediaLists[playlistName]?.[categoryName] || [];
    setMediaList(playlistOptions.shuffle ? shuffleMediaList() : items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, playlistName, playlistOptions.shuffle, shuffleMediaList]);

  return (
    <DrawerPlaylistContext.Provider value={{ isPlaylistOpen, setPlaylistOpen }}>
      <DrawerSettingsContext.Provider value={{ isSettingsOpen, setSettingsOpen }}>
        <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
          <PlaylistContext.Provider
            value={{
              playlistName,
              categoryName,
              mediaList,
              mediaIndex,
              playlistOptions: { ...playlistOptions, dark: theme === 'dark' },
              playlists,
              categories,
              selectPlaylist,
              selectCategory,
              setMediaList,
              setMediaIndex,
              setPlaylistOptions,
              setDark,
            }}
          >
            <PlayerContext.Provider value={{ playerRef, playing, setPlaying }}>
              {children}
            </PlayerContext.Provider>
          </PlaylistContext.Provider>
        </ModalContext.Provider>
      </DrawerSettingsContext.Provider>
    </DrawerPlaylistContext.Provider>
  );
}
