'use client';

import { useRouter } from 'next/navigation';
import { CustomFlowbiteTheme, Tooltip } from 'flowbite-react';
import { ClassValue } from 'clsx';
import {
  DotsIcon,
  PauseIcon,
  PlayIcon,
  PlaylistIcon,
  RefreshIcon,
  SettingIcon,
} from '@/components/icons';
import useLocale from '@/hooks/use-locale';
import { cn } from '@/libs/tw';
import useDrawer from '@/hooks/use-drawer';
import useModal from '@/hooks/use-modal';
import usePlaylist from '@/hooks/use-playlist';
import usePlayer from '@/hooks/use-player';

const theme = (...className: ClassValue[]) =>
  ({
    target: cn(
      'inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group',
      className
    ),
  } satisfies CustomFlowbiteTheme['tooltip']);

type MenuProps = {
  locale: string;
};

export default function Menu({ locale }: MenuProps) {
  const { t } = useLocale(locale);
  const router = useRouter();
  const { isPlaylistOpen, setPlaylistOpen, isSettingsOpen, setSettingsOpen } = useDrawer();
  const { isModalOpen, setModalOpen } = useModal();
  const { mediaList, mediaIndex, playlistOptions } = usePlaylist();
  const { playing, setPlaying } = usePlayer();

  return (
    <div
      id='menu-container'
      className='fixed z-30 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 bg-cover bg-bottom from-white/30 to-white bg-gradient-to-b dark:from-gray-700/30 dark:to-gray-700'
      style={{
        backgroundImage: `url(${playlistOptions.background})`,
      }}
    >
      <div className='grid h-full max-w-lg grid-cols-5 mx-auto'>
        <Tooltip content={t['Playlist']} theme={theme('rounded-l-full')}>
          <button
            className='w-full h-full inline-flex justify-center items-center'
            onClick={() => setPlaylistOpen(!isPlaylistOpen)}
          >
            <PlaylistIcon />
            <span className='sr-only'>{t['Playlist']}</span>
          </button>
        </Tooltip>
        <Tooltip content={t['Refresh']} theme={theme()}>
          <button
            className='w-full h-full inline-flex justify-center items-center'
            onClick={() => router.refresh()}
          >
            <RefreshIcon />
            <span className='sr-only'>{t['Refresh']}</span>
          </button>
        </Tooltip>
        <div className='flex items-center justify-center'>
          <Tooltip
            content={t['Play']}
            theme={theme(
              'flex-row w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800',
              !playing && 'hidden'
            )}
          >
            <button
              disabled={!mediaList[mediaIndex] && playing}
              onClick={() => setPlaying((prev) => !prev)}
            >
              <PlayIcon />
              <span className='sr-only'>{t['Play']}</span>
            </button>
          </Tooltip>
          <Tooltip
            content={t['Pause']}
            theme={theme(
              'flex-row w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800',
              playing && 'hidden'
            )}
          >
            <button
              disabled={!mediaList[mediaIndex] || !playing}
              onClick={() => setPlaying((prev) => !prev)}
            >
              <PauseIcon />
              <span className='sr-only'>{t['Pause']}</span>
            </button>
          </Tooltip>
        </div>
        <Tooltip content={t['Settings']} theme={theme()}>
          <button
            className='w-full h-full inline-flex justify-center items-center'
            onClick={() => setSettingsOpen(!isSettingsOpen)}
          >
            <SettingIcon />
            <span className='sr-only'>{t['Settings']}</span>
          </button>
        </Tooltip>
        <Tooltip content={t['Options']} theme={theme('rounded-r-full')}>
          <button
            className='w-full h-full inline-flex justify-center items-center'
            onClick={() => setModalOpen(!isModalOpen)}
          >
            <DotsIcon />
            <span className='sr-only'>{t['Options']}</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
