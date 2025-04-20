"use client"

import { usePageParams } from "@/hooks/use-page-params"
import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { Next as NextIcon } from "../icons"

type NextButtonProps = {
  mediaCount: number
  disabled: boolean
}

export function NextButton({ disabled, mediaCount }: NextButtonProps) {
  const { playNext } = usePlayer()
  const t = useTranslation()
  const { parsedSearchParams } = usePageParams()

  return (
    <button
      type="button"
      className="relative top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none disabled:cursor-default"
      onClick={() =>
        parsedSearchParams.mediaIndex !== null &&
        playNext(parsedSearchParams.mediaIndex, mediaCount)
      }
      disabled={disabled || parsedSearchParams.mediaIndex === null}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-200/50 dark:group-hover:bg-blue-400 group-focus:outline-none group-disabled:group-hover:bg-gray-100 group-disabled:dark:group-hover:bg-gray-700">
        <NextIcon className="w-4 h-4 text-gray-400 dark:text-gray-300 group-disabled:text-gray-300 group-disabled:dark:text-gray-500" />
        <span className="sr-only">{t["Next Item"]}</span>
      </span>
    </button>
  )
}
