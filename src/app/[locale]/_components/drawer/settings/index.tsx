import { getAvailableLocales, getTranslation } from '@/libs/i18n';
import { getPageParams } from '@/libs/params';
import { getCategories, getPlaylist, getPlaylistFileNames } from '@/libs/playlist';
import { Setting as SettingIcon, Close as CloseIcon } from '../../icons';
import { SettingsDrawer as Drawer, DrawerHeader } from '../index';
import { CategorySelect } from './category-select';
import { DarkModeToggle } from './darkmode-toggle';
import { FaderToggle } from './fader-toggle';
import { LanguageSelect } from './language-select';
import { LoopToggle } from './loop-toggle';
import { PlaylistSelect } from './playlist-select';
import { RandomToggle } from './random-toggle';
import { SeekToggle } from './seek-toggle';
import { ShuffleToggle } from './shuffle-toggle';
import { VolumeSlider } from './volume-slider';

export async function SettingsDrawer() {
  const { params, searchParams } = await getPageParams();
  const t = await getTranslation(params.locale);
  const playlistNames = await getPlaylistFileNames();
  const playlist = searchParams.playlist ? await getPlaylist(searchParams.playlist) : null;
  const categories = playlist ? await getCategories(playlist) : [];
  const locales = await getAvailableLocales();
  const languages = await Promise.all(
    locales.map(async (locale) => {
      const t = await getTranslation(locale);
      return {
        code: locale,
        name: t['$language'],
      };
    })
  );

  return (
    <Drawer className='border-l border-gray-200 dark:border-gray-600 shadow dark:shadow-md p-0'>
      <DrawerHeader
        className='p-4 fixed top-0 right-0 z-auto w-80 h-14 flex flex-nowrap justify-between items-center bg-white border-r border-b dark:bg-gray-800 dark:border-gray-600'
        title={<span className='ml-2 text-rotate-0'>{t['Settings']}</span>}
        theme={{
          inner: {
            titleText:
              'inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400',
          },
        }}
        titleIcon={
          <SettingIcon className='w-5 h-5 mr-2.5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0' />
        }
        closeIcon={
          <>
            <CloseIcon className='w-3 h-3' />
            <span className='sr-only'>{t['Close Playlist']}</span>
          </>
        }
      />
      <div className='w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-120px)]'>
        <PlaylistSelect
          selectedPlaylistName={searchParams.playlist}
          playlistNames={playlistNames}
        />
        <CategorySelect selectedCategoryName={searchParams.category} categories={categories} />
        <LoopToggle />
        <RandomToggle />
        <ShuffleToggle />
        <SeekToggle />
        <VolumeSlider />
        <FaderToggle />
        <DarkModeToggle />
        <LanguageSelect languages={languages} />
      </div>
    </Drawer>
  );
}
