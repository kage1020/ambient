"use client"

import { createContext, useContext } from "react"

export const CarouselContext = createContext<{
  carouselOpen: boolean
  setCarouselOpen: (open: boolean) => void
}>({
  carouselOpen: false,
  setCarouselOpen: () => {},
})

export function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider")
  }
  return context
}
