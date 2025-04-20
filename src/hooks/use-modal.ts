"use client"

import { createContext, useContext } from "react"

export const ModalContext = createContext<{
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}>({
  modalOpen: false,
  setModalOpen: () => {},
})

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
