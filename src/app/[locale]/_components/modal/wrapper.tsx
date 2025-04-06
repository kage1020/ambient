'use client';

import { Modal as FbModal, ModalProps } from 'flowbite-react';
import { useModal } from '@/hooks/use-modal';

export function Modal({ children, ...props }: ModalProps) {
  const { modalOpen, setModalOpen } = useModal();

  return (
    <FbModal {...props} show={modalOpen} onClose={() => setModalOpen(false)} dismissible>
      {children}
    </FbModal>
  );
}
