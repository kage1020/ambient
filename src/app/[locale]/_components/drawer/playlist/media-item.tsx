"use client"

import { useCurrentMedia } from "@/hooks/use-current-media"
import { useDrawer } from "@/hooks/use-drawer"
import { usePlayer } from "@/hooks/use-player"
import { getYoutubeThumbnailURL } from "@/libs/format"
import type { Media } from "@/libs/playlist"
import { cn } from "@/libs/tw"
import { scrollIntoView } from "@/libs/utils"
import Image from "next/image"
import { useEffect, useRef } from "react"
import noMedia from "../../../../../assets/images/no-media-placeholder.svg"

type MediaItemProps = {
  index: number
  media: Media
}

export function MediaItem({ index, media }: MediaItemProps) {
  const targetRef = useRef<HTMLButtonElement>(null)
  const { playAt } = usePlayer()
  const { playlistOpen } = useDrawer()
  const { mediaIndex } = useCurrentMedia()
  const current = index === mediaIndex

  const handlePlay = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault()
    e.stopPropagation()
    scrollIntoView(targetRef.current)
    playAt(index)
  }

  useEffect(() => {
    if (current && playlistOpen) scrollIntoView(targetRef.current)
  }, [current, playlistOpen])

  return (
    <button
      ref={targetRef}
      aria-current={current}
      className={cn(
        "flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:border-gray-600",
        !current &&
          "hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white",
        current && "text-white bg-blue-500 dark:bg-gray-800"
      )}
      onClick={(e) => handlePlay(e, index)}
    >
      <div className="w-8 h-8">
        {media.image && (
          <Image
            src={`/images/${media.image}`}
            alt=""
            className="block rounded object-cover"
            width={32}
            height={32}
            unoptimized
          />
        )}
        {media.videoid && (
          <Image
            src={getYoutubeThumbnailURL(media.videoid) || noMedia}
            alt=""
            className="block rounded object-cover"
            width={32}
            height={32}
            unoptimized
          />
        )}
      </div>
      <div className="flex-1 flex flex-col pointer-events-none text-left overflow-hidden">
        <span
          className={cn(
            "text-sm text-gray-900 rotate-0.03 hover:text-white dark:text-gray-100 overflow-ellipsis whitespace-nowrap overflow-hidden",
            current && "text-white"
          )}
        >
          {media.title}
        </span>
        <span
          className={cn(
            "text-xs text-amber-900 rotate-0.03 hover:text-amber-50 dark:text-amber-500 overflow-ellipsis whitespace-nowrap overflow-hidden",
            current && "text-amber-200"
          )}
        >
          {media.artist}
        </span>
      </div>
    </button>
  )
}
