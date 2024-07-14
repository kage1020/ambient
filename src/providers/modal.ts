import { createContext } from 'react';

export const ModalContext = createContext({
  isModalOpen: false,
  setModalOpen: (isOpen: boolean) => {},
});

export const ModalProvider = ModalContext.Provider;
