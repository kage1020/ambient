import { Close, Setting } from '@/components/icons';
import { getLocale, getTranslation, loadLanguageFiles } from '@/libs/locale';
import { SettingsDrawer as Drawer, DrawerHeader } from '@/components/drawer';
import { getSearchParams } from '@/libs/params';
import { getMediaData } from '@/libs/playlist';
import PlaylistSelect from './playlist-select';
import CategorySelect from './category-select';
import LoopToggle from './loop-toggle';
import RandomToggle from './random-toggle';
import ShuffleToggle from './shuffle-toggle';
import SeekToggle from './seek-toggle';
import VolumeSlider from './volume-slider';
import FaderToggle from './fader-toggle';
import DarkModeToggle from './dark-mode-toggle';
import LanguageSelect from './language-select';

export default async function SettingsDrawer() {
  const locale = await getLocale();
  const t = await getTranslation(locale);
  const searchParams = await getSearchParams();
  const { playlists, categories } = await getMediaData(searchParams.p);
  const languages = await loadLanguageFiles();
  const translations = await Promise.all(languages.map((lang) => getTranslation(lang)));

  return (
    <Drawer
      id='drawer-settings'
      className='border-l border-gray-200 dark:border-gray-600 shadow dark:shadow-md p-0'
    >
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
          <Setting className='w-5 h-5 mr-2.5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0' />
        }
        closeIcon={
          <>
            <Close className='w-3 h-3' />
            <span className='sr-only'>{t['Close Playlist']}</span>
          </>
        }
      />
      <div className='w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-120px)]'>
        <PlaylistSelect t={t} playlists={playlists} />
        <CategorySelect t={t} categories={categories} />
        <LoopToggle t={t} />
        <RandomToggle t={t} />
        <ShuffleToggle t={t} />
        <SeekToggle t={t} />
        <VolumeSlider t={t} />
        <FaderToggle t={t} />
        <DarkModeToggle t={t} />
        <LanguageSelect
          t={t}
          locale={locale}
          languages={translations.map((lang, i) => ({
            code: languages[i].slice(5, 7),
            name: lang['$language'],
          }))}
        />
      </div>
    </Drawer>
  );
}
