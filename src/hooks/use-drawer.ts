'use client';

import { createContext, useContext } from 'react';

export const DrawerContext = createContext<{
  playlistOpen: boolean;
  settingsOpen: boolean;
  setPlaylistOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}>({
  playlistOpen: false,
  settingsOpen: false,
  setPlaylistOpen: () => {},
  setSettingsOpen: () => {},
});

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === null) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}
