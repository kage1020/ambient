'use client';

import useLocale from '@/hooks/use-locale';
import usePlaylist from '@/hooks/use-playlist';
import useDrawer from '@/hooks/use-drawer';
import { AcceptableLocales } from '@/libs/assets';
import { cn } from '@/libs/tw';

type DrawerSettingsProps = {
  locale: string;
};

export default function DrawerSettings({ locale }: DrawerSettingsProps) {
  const { t, changeLocale } = useLocale(locale);
  const {
    playlistName,
    categoryName,
    playlistOptions,
    playlists,
    categories,
    selectPlaylist,
    selectCategory,
    setPlaylistOptions,
    setDark,
  } = usePlaylist();
  const { isSettingsOpen, setSettingsOpen } = useDrawer();

  return (
    <div
      id='drawer-settings'
      className={cn(
        'fixed top-0 right-0 z-50 h-screen overflow-y-auto transition-transform bg-white border-l border-gray-200 w-80 dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow dark:shadow-md',
        isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      tabIndex={-1}
      aria-labelledby='drawer-settings-label'
    >
      <div className='p-4 fixed top-0 right-0 z-auto w-80 h-14 flex flex-nowrap justify-between items-center bg-white border-r border-b dark:bg-gray-800 dark:border-gray-600'>
        <h5
          id='drawer-settings-label'
          className='inline-flex items-center text-base font-semibold text-gray-500 dark:text-white text-rotate-0'
        >
          <svg
            className='w-5 h-5 mr-2.5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0'
            aria-hidden='true'
            aria-label='settings'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2'
            />
          </svg>
          <span className='ml-2 text-rotate-0'>{t['Settings']}</span>
        </h5>
        <button
          type='button'
          id='btn-close-settings'
          data-drawer-hide='drawer-settings'
          aria-controls='drawer-settings'
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
          onClick={() => setSettingsOpen(false)}
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>{t['Close Settings']}</span>
        </button>
      </div>
      <div className='w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-136px)]'>
        <div className='p-4'>
          <label
            htmlFor='current-playlist'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {t['Current Playlist']}
          </label>
          <select
            id='current-playlist'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={playlistName || t['Choose a playlist']}
            onChange={(e) => selectPlaylist(e.target.value)}
          >
            <option disabled>{t['Choose a playlist']}</option>
            {playlists.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className='p-4'>
          <label
            htmlFor='target-category'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {t['Target Category']}
          </label>
          <select
            id='target-category'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={categoryName || t['All categories']}
            onChange={(e) => selectCategory(e.target.value)}
          >
            <option id='all-category' value='all'>
              {t['All categories']}
            </option>
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className='p-4'>
          <label id='toggle-loop' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={playlistOptions.loop}
              className='sr-only peer'
              onChange={() => setPlaylistOptions((prev) => ({ ...prev, loop: !prev.loop }))}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Loop play of one media']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label id='toggle-randomly' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={playlistOptions.random}
              className='sr-only peer'
              onChange={() => setPlaylistOptions((prev) => ({ ...prev, random: !prev.random }))}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Randomly play']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label id='toggle-shuffle' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={playlistOptions.shuffle}
              className='sr-only peer'
              onChange={() => setPlaylistOptions((prev) => ({ ...prev, shuffle: !prev.shuffle }))}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Shuffle play']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label id='toggle-seekplay' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={playlistOptions.seek}
              className='sr-only peer'
              onChange={() => setPlaylistOptions((prev) => ({ ...prev, seek: !prev.seek }))}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Seek and play']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label
            htmlFor='default-volume'
            className='flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {t['Default volume:']}
            <span
              id='default-volume-value'
              className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'
            >
              {playlistOptions.volume}
            </span>
          </label>
          <input
            id='default-volume'
            type='range'
            min='0'
            max='100'
            value={playlistOptions.volume}
            step='1'
            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600'
            onChange={(e) =>
              setPlaylistOptions((prev) => ({ ...prev, volume: Number(e.target.value) }))
            }
          />
        </div>
        <div className='p-4'>
          <label id='toggle-fader' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={playlistOptions.fader}
              className='sr-only peer'
              onChange={() => setPlaylistOptions((prev) => ({ ...prev, fader: !prev.fader }))}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Pseudo fader']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label id='toggle-darkmode' className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              className='sr-only peer'
              checked={playlistOptions.dark}
              onChange={() => setDark((prev) => !prev)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {t['Dark mode']}
            </span>
          </label>
        </div>
        <div className='p-4'>
          <label
            htmlFor='language'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {t['Language']}
          </label>
          <select
            id='language'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            disabled={AcceptableLocales.length <= 1}
            value={AcceptableLocales.find((v) => v.code === locale)?.code || t['$language']}
            onChange={(e) => changeLocale(e.target.value)}
          >
            {AcceptableLocales.length <= 1 && (
              <option id='default-language' value='' disabled>
                {t['Default']}
              </option>
            )}
            {AcceptableLocales.length > 1 &&
              AcceptableLocales.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.label}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
