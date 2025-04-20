"use client"

import { useCarousel } from "@/hooks/use-carousel"
import { getYoutubeThumbnailURL } from "@/libs/format"
import type { Media } from "@/libs/playlist"
import Image from "next/image"
import noImage from "../../../../assets/images/ambient-placeholder.svg"
import { NextButton } from "./next-button"
import { PrevButton } from "./prev-button"

type ThumbnailProps = {
  media: Media | null
  mediaCount: number
  disabled: boolean
}

export function Thumbnail({ media, mediaCount, disabled }: ThumbnailProps) {
  const { carouselOpen } = useCarousel()

  if (!carouselOpen) return null

  return (
    <>
      <PrevButton mediaCount={mediaCount} disabled={disabled} />
      <div className="relative h-56 max-w-sm w-96 overflow-hidden rounded-lg md:h-64">
        <div className="duration-700 ease-in-out relative h-full">
          <Image
            src={
              media?.videoid ? getYoutubeThumbnailURL(media.videoid) : noImage
            }
            className="block"
            alt={media?.title || "No media available"}
            fill
          />
        </div>
      </div>
      <NextButton mediaCount={mediaCount} disabled={disabled} />
    </>
  )
}
