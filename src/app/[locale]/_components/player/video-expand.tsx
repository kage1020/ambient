"use client"

import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import { actionButtonClassName } from "./action-button"

type VideoExpandButtonProps = {
  hidden?: boolean
}

export function VideoExpandButton({ hidden }: VideoExpandButtonProps) {
  const { display, setDisplay } = usePlayer()
  const t = useTranslation()

  return (
    <button
      className={cn(
        actionButtonClassName,
        hidden ? "hidden" : "block"
      )}
      onClick={() => setDisplay(display === "expanded" ? "normal" : "expanded")}
    >
      {display === "expanded" ? t["Collapse"] : t["Expand"]}
    </button>
  )
}
