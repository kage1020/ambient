'use client';

import { Modal as FbModal } from 'flowbite-react';
import useModal from '@/hooks/use-modal';
import type { ModalHeaderProps, ModalProps } from 'flowbite-react';

export function ModalHeader(props: ModalHeaderProps) {
  return <FbModal.Header {...props} />;
}

export function Modal({ children, ...props }: ModalProps) {
  const { modalState, setModalState } = useModal();

  return (
    <FbModal
      dismissible
      show={modalState.open}
      onClose={() => setModalState({ open: false })}
      {...props}
    >
      {children}
    </FbModal>
  );
}
