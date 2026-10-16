"use client"

import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import { actionButtonClassName } from "./action-button"

type VideoFullscreenButtonProps = {
  hidden?: boolean
}

export function VideoFullscreenButton({ hidden }: VideoFullscreenButtonProps) {
  const { setFullscreen } = usePlayer()
  const t = useTranslation()

  return (
    <button
      className={cn(
        actionButtonClassName,
        hidden ? "hidden" : "block"
      )}
      onClick={setFullscreen}
    >
      {t["Fullscreen"]}
    </button>
  )
}
