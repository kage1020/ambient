"use client"

import { useCarousel } from "@/hooks/use-carousel"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"

export function CarouselShowButton() {
  const { carouselOpen, setCarouselOpen } = useCarousel()
  const t = useTranslation()

  return (
    <button
      className={cn(
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-opacity duration-500 ease-in-out"
      )}
      onClick={() => setCarouselOpen(!carouselOpen)}
    >
      {carouselOpen ? t["Hide Thumbnail"] : t["Show Thumbnail"]}
    </button>
  )
}
