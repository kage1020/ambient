import Link from 'next/link';
import { getLocale, getTranslation } from '@/libs/locale';
import Collapse from './collapse';
import { Modal, ModalHeader } from './modal';

export default async function OptionModal() {
  const locale = await getLocale();
  const t = await getTranslation(locale);

  return (
    <Modal
      theme={{
        root: {
          base: 'fixed inset-x-0 top-0 z-50 w-full h-screen p-4 overflow-y-auto overflow-x-hidden md:inset-0 max-h-full transition-all',
        },
        content: {
          base: 'relative w-full max-w-2xl max-h-full shadow',
          inner: 'relative bg-white rounded-lg shadow dark:bg-gray-700',
        },
      }}
    >
      <ModalHeader
        theme={{
          base: 'flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600',
          title: 'text-xl font-semibold text-gray-900 dark:text-white',
          close: {
            base: 'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white',
          },
        }}
      >
        {t['Options']}
      </ModalHeader>
      <div className='p-0 space-y-0'>
        <Collapse />
      </div>
      <div className='flex justify-center items-center p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          &copy; 2023 Ambient. Produced by{' '}
          <Link href='https://ka2.org/' target='_blank' className='hover:underline'>
            MAGIC METHODS
          </Link>
          , modified by{' '}
          <Link href='https://kage1020.com/' target='_blank' className='hover:underline'>
            kage1020
          </Link>
          .
        </span>
      </div>
    </Modal>
  );
}
