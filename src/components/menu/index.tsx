import { getLocale, getTranslation } from '@/libs/locale';
import { getMediaData } from '@/libs/playlist';
import { getSearchParams } from '@/libs/params';
import { cn } from '@/libs/tw';
import PlaylistButton from './playlist-button';
import RefreshButton from './refresh-button';
import PlayButton from './play-button';
import PauseButton from './pause-button';
import SettingButton from './setting-button';
import OptionsButton from './options-button';

export default async function Menu() {
  const locale = await getLocale();
  const t = await getTranslation(locale);
  const searchParams = await getSearchParams();
  const { playlist } = await getMediaData(searchParams.p);

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
        <PlaylistButton t={t} />
        <RefreshButton t={t} />
        <div className='flex items-center justify-center'>
          <PlayButton t={t} />
          <PauseButton t={t} />
        </div>
        <SettingButton t={t} />
        <OptionsButton t={t} />
      </div>
    </div>
  );
}
