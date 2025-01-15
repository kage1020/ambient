import { Close, Playlist } from '@/components/icons';
import { PlaylistDrawer as Drawer, DrawerHeader } from '@/components/drawer';
import { getLocale, getTranslation } from '@/libs/locale';
import PlaylistGroup from './group';

export default async function PlaylistDrawer() {
  const locale = await getLocale();
  const t = await getTranslation(locale);

  return (
    <Drawer className='border-r border-gray-200 dark:border-gray-600 shadow dark:shadow-md p-0'>
      <DrawerHeader
        className='p-4 fixed top-0 left-0 z-auto w-80 h-14 flex flex-nowrap justify-between items-center bg-white border-r border-b dark:bg-gray-800 dark:border-gray-600'
        title={<span className='ml-2 text-rotate-0'>{t['Playlist']}</span>}
        theme={{
          inner: {
            titleText:
              'inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400',
          },
        }}
        titleIcon={
          <Playlist className='w-5 h-5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0' />
        }
        closeIcon={
          <>
            <Close className='w-3 h-3' />
            <span className='sr-only'>{t['Close Playlist']}</span>
          </>
        }
      />
      <PlaylistGroup />
    </Drawer>
  );
}
