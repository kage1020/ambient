'use client';

import { useAtom } from 'jotai';
import { playlistDrawerAtom, settingDrawerAtom } from '@/atoms/drawer';

export default function useDrawer() {
  const [settingsDrawerState, setSettingsDrawerState] = useAtom(settingDrawerAtom);
  const [playlistDrawerState, setPlaylistDrawerState] = useAtom(playlistDrawerAtom);

  return {
    settingsDrawerState,
    setSettingsDrawerState,
    playlistDrawerState,
    setPlaylistDrawerState,
  };
}
