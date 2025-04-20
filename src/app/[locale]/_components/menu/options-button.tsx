"use client"

import { useModal } from "@/hooks/use-modal"
import { useTranslation } from "@/hooks/use-translation"
import { Tooltip } from "flowbite-react"
import { Options as OptionsIcon } from "../icons"

export function OptionsButton() {
  const { modalOpen, setModalOpen } = useModal()
  const t = useTranslation()

  return (
    <Tooltip
      content={t["Options"]}
      theme={{
        target: "rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group",
      }}
    >
      <button
        className="px-5 w-full h-full rounded-r-full inline-flex flex-col items-center justify-center"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <OptionsIcon className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="sr-only">{t["Options"]}</span>
      </button>
    </Tooltip>
  )
}
