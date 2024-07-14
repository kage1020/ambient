import { createContext } from 'react';

export const DrawerPlaylistContext = createContext({
  isPlaylistOpen: true,
  setPlaylistOpen: (isOpen: boolean) => {},
});

export const DrawerSettingsContext = createContext({
  isSettingsOpen: true,
  setSettingsOpen: (isOpen: boolean) => {},
});
