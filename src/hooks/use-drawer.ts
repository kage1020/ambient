import { useContext } from 'react';
import { DrawerPlaylistContext, DrawerSettingsContext } from '@/providers/drawer';

export default function useDrawer() {
  const { isPlaylistOpen, setPlaylistOpen } = useContext(DrawerPlaylistContext);
  const { isSettingsOpen, setSettingsOpen } = useContext(DrawerSettingsContext);

  return {
    isPlaylistOpen,
    setPlaylistOpen,
    isSettingsOpen,
    setSettingsOpen,
  };
}
