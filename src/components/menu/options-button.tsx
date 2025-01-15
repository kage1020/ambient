'use client';

import { Tooltip } from 'flowbite-react';
import { Options } from '@/components/icons';
import useModal from '@/hooks/use-modal';
import { LanguageTranslation } from '@/types';

type OptionsButtonProps = {
  t: LanguageTranslation;
};

export default function OptionsButton({ t }: OptionsButtonProps) {
  const { modalState, setModalState } = useModal();

  return (
    <Tooltip
      content={t['Options']}
      theme={{
        target: 'rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group',
      }}
    >
      <button
        id='btn-options'
        className='px-5 w-full h-full rounded-r-full inline-flex flex-col items-center justify-center'
        onClick={() => setModalState({ open: !modalState.open })}
      >
        <Options className='w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
        <span className='sr-only'>{t['Options']}</span>
      </button>
    </Tooltip>
  );
}
