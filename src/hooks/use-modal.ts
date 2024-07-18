import { useContext } from 'react';
import { ModalContext } from '@/providers/modal';

export default function useModal() {
  const { isModalOpen, setModalOpen } = useContext(ModalContext);

  return {
    isModalOpen,
    setModalOpen,
  };
}
