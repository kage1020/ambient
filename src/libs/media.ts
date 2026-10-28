import type { Media } from "@/libs/playlist"

export function parseMediaIndex(value: string | null | undefined) {
  const parsed = Number.parseInt(value ?? "")
  return Number.isNaN(parsed) ? null : parsed
}

export function getMedia(mediaList: Media[], mediaIndex: number | null) {
  if (mediaIndex === null) return null
  return mediaList.at(mediaIndex) ?? null
}
