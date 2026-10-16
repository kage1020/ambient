"use client"

import { useCarousel } from "@/hooks/use-carousel"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import { actionButtonClassName } from "./action-button"

type CarouselShowButtonProps = {
  hidden: boolean
}

export function CarouselShowButton({ hidden }: CarouselShowButtonProps) {
  const { carouselOpen, setCarouselOpen } = useCarousel()
  const t = useTranslation()

  return (
    <button
      className={cn(
        actionButtonClassName,
        hidden ? "hidden" : "block"
      )}
      onClick={() => setCarouselOpen(!carouselOpen)}
    >
      {carouselOpen ? t["Hide Thumbnail"] : t["Show Thumbnail"]}
    </button>
  )
}
