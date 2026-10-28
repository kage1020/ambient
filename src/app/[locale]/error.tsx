"use client"

import { useTranslation } from "@/hooks/use-translation"
import { Alert as AlertIcon } from "./_components/icons"
import { actionButtonClassName } from "./_components/player/action-button"

type PageErrorProps = {
  error: unknown
  retry: () => void
}

export default function PageError({ retry }: PageErrorProps) {
  const t = useTranslation()

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 w-full h-full p-4 text-center"
    >
      <AlertIcon className="w-8 h-8 text-red-600 dark:text-red-500" />
      <p className="text-lg text-gray-900 dark:text-white">
        {t["Failed to load the page."]}
      </p>
      <button
        type="button"
        className={actionButtonClassName}
        onClick={() => retry()}
      >
        {t["Retry"]}
      </button>
    </div>
  )
}
