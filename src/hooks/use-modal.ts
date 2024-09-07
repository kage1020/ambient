'use client';

import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms/modal';

export default function useModal() {
  const [modalState, setModalState] = useAtom(modalAtom);

  return {
    modalState,
    setModalState,
  };
}
