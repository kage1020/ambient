'use client';

import { useEffect } from 'react';
import { Drawer as FbDrawer } from 'flowbite-react';
import useDrawer from '@/hooks/use-drawer';
import useMediaQuery from '@/hooks/use-media-query';
import type {
  DrawerHeaderProps as FbDrawerHeaderProps,
  DrawerProps as FbDrawerProps,
} from 'flowbite-react';

type DrawerHeaderProps = Omit<FbDrawerHeaderProps, 'title' | 'titleIcon' | 'closeIcon'> & {
  title: React.ReactNode;
  titleIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
};

export function DrawerHeader({ title, titleIcon, closeIcon, ...props }: DrawerHeaderProps) {
  return (
    <FbDrawer.Header
      title={title as string}
      titleIcon={(() => titleIcon) as unknown as React.FC<React.SVGProps<SVGSVGElement>>}
      closeIcon={(() => closeIcon) as unknown as React.FC<React.SVGProps<SVGSVGElement>>}
      {...props}
    />
  );
}

type DrawerProps = Omit<FbDrawerProps, 'open' | 'onClose'>;

export function PlaylistDrawer({ backdrop, ...props }: DrawerProps) {
  const { playlistDrawerState, setPlaylistDrawerState } = useDrawer();
  const { isLg } = useMediaQuery();

  useEffect(() => {
    setPlaylistDrawerState({ open: isLg });
  }, [isLg, setPlaylistDrawerState]);

  return (
    <FbDrawer
      open={playlistDrawerState.open}
      onClose={() => setPlaylistDrawerState({ open: false })}
      backdrop={backdrop || !isLg}
      {...props}
    />
  );
}

export function SettingsDrawer({ backdrop, ...props }: DrawerProps) {
  const { settingsDrawerState, setSettingsDrawerState } = useDrawer();
  const { isLg } = useMediaQuery();

  useEffect(() => {
    setSettingsDrawerState({ open: isLg });
  }, [isLg, setSettingsDrawerState]);

  return (
    <FbDrawer
      open={settingsDrawerState.open}
      onClose={() => setSettingsDrawerState({ open: false })}
      backdrop={backdrop || !isLg}
      tabIndex={-1}
      position='right'
      {...props}
    />
  );
}
