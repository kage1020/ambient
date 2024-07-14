'use client';

import { useEffect, useState } from 'react';
import { PlayerState } from 'react-youtube';
import { getPlaylist, Media } from '@/libs/playlist';
import { DrawerPlaylistContext, DrawerSettingsContext } from '@/providers/drawer';
import { ModalContext } from '@/providers/modal';
import { PlaylistContext, PLAYER_STATE } from '@/providers/playlist';
import { DarkContext } from './dark';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [isPlaylistOpen, setPlaylistOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlist, setPlaylist] = useState<Media[]>([]);
  const [mediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PlayerState>(PLAYER_STATE.UNSTARTED);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const name = localStorage.getItem('ambient.playlist');
    if (name) {
      setPlaylistName(name);
      setPlaylist(getPlaylist(name));
    }
    const dark = localStorage.getItem('ambient.dark');
    if (dark) {
      setIsDark(dark === 'true');
    }
  }, []);

  const selectPlaylist = (name: string) => {
    localStorage.setItem('ambient.playlist', name);
    setPlaylistName(name);
    setPlaylist(getPlaylist(name));
  };

  const setMediaIndex = (index: number) => {
    setCurrentMediaIndex(index % playlist.length);
  };

  const setDark = (dark: boolean) => {
    setIsDark(dark);
    localStorage.setItem('ambient.dark', String(dark));
    document.documentElement.classList.toggle('dark', dark);
  };

  return (
    <DrawerPlaylistContext.Provider value={{ isPlaylistOpen, setPlaylistOpen }}>
      <DrawerSettingsContext.Provider value={{ isSettingsOpen, setSettingsOpen }}>
        <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
          <PlaylistContext.Provider
            value={{
              playlistName,
              playlist: playlist,
              mediaIndex,
              playerState,
              selectPlaylist,
              setMediaIndex,
              setPlayerState,
            }}
          >
            <DarkContext.Provider value={{ isDark, setDark }}>{children}</DarkContext.Provider>
          </PlaylistContext.Provider>
        </ModalContext.Provider>
      </DrawerSettingsContext.Provider>
    </DrawerPlaylistContext.Provider>
  );
}
