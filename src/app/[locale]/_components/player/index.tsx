import { filterText, getYoutubeURL } from "@/libs/format"
import { getTranslation } from "@/libs/i18n"
import { getPageParams } from "@/libs/params"
import { getMedia, type Media, type Playlist } from "@/libs/playlist"
import { cn } from "@/libs/tw"
import Link from "next/link"
import { ExternalLink as ExternalLinkIcon } from "../icons"
import { CarouselShowButton } from "./carousel-show"
import { Thumbnail } from "./thumbnail"
import { VideoExpandButton } from "./video-expand"
import { VideoFullscreenButton } from "./video-fullscreen"
import { VideoPlayer } from "./video-player"

type PlayerProps = {
  playlist: Playlist | null
  mediaList: Media[]
}

export async function Player({ playlist, mediaList }: PlayerProps) {
  const pageParams = await getPageParams()
  const t = await getTranslation(pageParams.params.locale)
  const media = await getMedia(mediaList, pageParams.searchParams.mediaIndex)
  const url = media?.videoid ? getYoutubeURL(media.videoid) : "#"
  const caption =
    media && playlist?.options.caption
      ? filterText(media, playlist.options.caption)
      : ""

  return (
    <div
      className={cn(
        "flex flex-col items-center max-w-full w-full h-full mt-0 mx-auto mb-16 z-10 overflow-y-auto overflow-x-hidden",
        playlist?.options.background && "bg-no-repeat bg-bottom bg-cover"
      )}
      style={{
        backgroundImage:
          playlist?.options.background && `url(${playlist.options.background})`,
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
      <div className="my-4 transition-all duration-150 ease-out flex justify-center gap-2">
        <CarouselShowButton hidden={!Boolean(media?.mediaId)} />
        <VideoExpandButton hidden={!Boolean(media?.mediaId)} />
        <VideoFullscreenButton hidden={!Boolean(media?.mediaId)} />
        <Link
          href={url}
          target="_blank"
          className={cn(
            "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-opacity duration-500 ease-in-out",
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
