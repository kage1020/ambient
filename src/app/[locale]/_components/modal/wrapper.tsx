"use client"

import { useModal } from "@/hooks/use-modal"
import { Modal as FbModal, ModalProps } from "flowbite-react"

export function Modal({ children, ...props }: ModalProps) {
  const { modalOpen, setModalOpen } = useModal()

  return (
    <FbModal
      {...props}
      show={modalOpen}
      onClose={() => setModalOpen(false)}
      dismissible
    >
      {children}
    </FbModal>
  )
}
