"use client"

import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import { Alert, getTheme } from "flowbite-react"
import { HiX as CloseIcon } from "react-icons/hi"
import { toast } from "sonner"
import { Alert as AlertIcon } from "./icons"

export enum NoticeType {
  INFO = "blue",
  ERROR = "red",
  SUCCESS = "green",
  WARNING = "yellow",
  DEFAULT = "gray",
}

type NoticeProps = {
  id: string | number
  message: string
  type: NoticeType
}

export function Notice({ id, message, type }: NoticeProps) {
  const t = useTranslation()
  const theme = getTheme().alert

  return (
    <Alert
      className="shadow-md transition-opacity duration-1000 delay-2000 ease-out space-x-3 flex-row items-center"
      color={type}
      icon={({ className, ...params }) => (
        <AlertIcon className={cn(className, "w-4 h-4")} {...params} />
      )}
      // Default dismiss button has hardcoded aria-label, so we re-implement it
      additionalContent={
        <button
          aria-label={t["Dismiss"]}
          className={cn(theme.closeButton.base, theme.closeButton.color[type])}
          onClick={() => toast.dismiss(id)}
          type="button"
        >
          <CloseIcon aria-hidden className={theme.closeButton.icon} />
        </button>
      }
    >
      <span className="sr-only">{t["Notify"]}</span>
      <span className="font-medium">{message}</span>
    </Alert>
  )
}

export function showMessage(message: string, type: NoticeType) {
  toast.custom((id) => <Notice id={id} message={message} type={type} />, {
    duration: 1000000,
  })
}
