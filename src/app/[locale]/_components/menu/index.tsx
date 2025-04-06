import { getPageParams } from '@/libs/params';
import { getMedia, type Media, Playlist } from '@/libs/playlist';
import { cn } from '@/libs/tw';
import { PlaylistButton } from './playlist-button';
import { RefreshButton } from './refresh-button';
import { PlayButton } from './play-button';
import { PauseButton } from './pause-button';
import { SettingButton } from './setting-button';
import { OptionsButton } from './options-button';

type MenuProps = {
  playlist: Playlist | null;
  mediaList: Media[];
};

export async function Menu({ playlist, mediaList }: MenuProps) {
  const { searchParams } = await getPageParams();
  const media = await getMedia(mediaList, searchParams.mediaIndex);

  return (
    <div
      className={cn(
        'fixed z-40 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600',
        playlist?.options.background &&
          'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),50%,rgba(255,255,255,1))]'
      )}
      style={{
        backgroundImage: playlist?.options.background
          ? `url(${playlist.options.background})`
          : undefined,
      }}
    >
      <div className='grid h-full max-w-lg grid-cols-5 mx-auto'>
        <PlaylistButton />
        <RefreshButton />
        <div className='flex items-center justify-center'>
          <PlayButton disabled={!media} />
          <PauseButton />
        </div>
        <SettingButton />
        <OptionsButton />
      </div>
    </div>
  );
}
