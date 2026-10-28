"use client"

import { useCurrentMedia } from "@/hooks/use-current-media"
import { useTranslation } from "@/hooks/use-translation"
import { filterText, formatDocumentTitle, getYoutubeURL } from "@/libs/format"
import { cn } from "@/libs/tw"
import Link from "next/link"
import { useEffect } from "react"
import { ExternalLink as ExternalLinkIcon } from "../icons"
import { actionButtonClassName } from "./action-button"
import { CarouselShowButton } from "./carousel-show"
import { Thumbnail } from "./thumbnail"
import { VideoExpandButton } from "./video-expand"
import { VideoFullscreenButton } from "./video-fullscreen"
import { VideoPlayer } from "./video-player"

type PlayerProps = {
  background?: string
  captionFormat?: string
}

export function Player({ background, captionFormat }: PlayerProps) {
  const t = useTranslation()
  const { mediaList, media } = useCurrentMedia()
  const url = media?.videoid ? getYoutubeURL(media.videoid) : "#"
  const caption = media && captionFormat ? filterText(media, captionFormat) : ""
  const title = formatDocumentTitle(media, t["Ambient Media Player"])

  useEffect(() => {
    // Switching media skips the server render that would update the metadata
    document.title = title
  }, [title])

  return (
    <div
      data-testid="viewer"
      className={cn(
        "flex flex-col items-center max-w-full w-full h-full mt-0 mx-auto pb-[calc(6rem+env(safe-area-inset-bottom))] z-10 overflow-y-auto overflow-x-hidden",
        background && "bg-no-repeat bg-bottom bg-cover"
      )}
      style={{
        backgroundImage: background && `url(${background})`,
      }}
    >
      <div className="relative w-full mt-4 flex justify-center">
        <Thumbnail
          media={media}
          mediaCount={mediaList.length}
          disabled={mediaList.length < 2}
        />
      </div>
      <VideoPlayer url={url} mediaCount={mediaList.length} caption={caption} />
      <div className="my-4 px-4 transition-all duration-150 ease-out flex flex-wrap justify-center gap-2">
        <CarouselShowButton hidden={!Boolean(media?.mediaId)} />
        <VideoExpandButton hidden={!Boolean(media?.mediaId)} />
        <VideoFullscreenButton hidden={!Boolean(media?.mediaId)} />
        <Link
          href={url}
          target="_blank"
          className={cn(
            actionButtonClassName,
            media?.videoid ? "block" : "hidden"
          )}
        >
          {t["Watch on YouTube"]}
          <ExternalLinkIcon className="inline-block -mt-0.5 ml-1 w-3 h-3 text-gray-800 dark:text-white" />
        </Link>
      </div>
    </div>
  )
}
