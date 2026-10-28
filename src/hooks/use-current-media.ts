"use client"

import { getMedia, parseMediaIndex } from "@/libs/media"
import type { Media } from "@/libs/playlist"
import { useSearchParams } from "next/navigation"
import { createContext, useContext } from "react"

export const MediaListContext = createContext<Media[]>([])

// Reads the URL because switching media updates it without a server render
export function useCurrentMedia() {
  const mediaList = useContext(MediaListContext)
  const searchParams = useSearchParams()
  const mediaIndex = parseMediaIndex(searchParams.get("mediaIndex"))

  return { mediaList, mediaIndex, media: getMedia(mediaList, mediaIndex) }
}
