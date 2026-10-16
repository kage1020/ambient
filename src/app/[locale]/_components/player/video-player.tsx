"use client"

import { useCarousel } from "@/hooks/use-carousel"
import { useDrawer } from "@/hooks/use-drawer"
import { useHydrated } from "@/hooks/use-hydrated"
import { usePageParams } from "@/hooks/use-page-params"
import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import ReactPlayer from "react-player"
import { NoticeType, showMessage } from "../notice"
import { MediaCaption } from "./caption"

type VideoPlayerProps = {
  url: string
  mediaCount: number
  caption: string
}

export function VideoPlayer({ url, mediaCount, caption }: VideoPlayerProps) {
  const { options, playing, playerRef, display, setPlaying, playAt, playNext } =
    usePlayer()
  const { settingsOpen, playlistOpen } = useDrawer()
  const { carouselOpen } = useCarousel()
  const hydrated = useHydrated()
  const t = useTranslation()
  const { parsedSearchParams } = usePageParams()

  const onReady = () => {
    if (options.autoplay && !playing) {
      setPlaying(true)
    }
  }

  const onPlay = () => {
    setPlaying(true)
  }

  const onPause = () => {
    setPlaying(false)
  }

  const onEnded = () => {
    if (parsedSearchParams.mediaIndex === null) return

    if (options.loop) playAt(parsedSearchParams.mediaIndex)
    else playNext(parsedSearchParams.mediaIndex, mediaCount)
  }

  const onError = () => {
    showMessage(t["Failed to load the video."], NoticeType.ERROR)
    setPlaying(false)
  }

  return (
    <figure
      className={cn(
        "w-full flex flex-col items-center gap-1",
        display === "expanded" && carouselOpen && "h-[65%]",
        display === "expanded" && !carouselOpen && "h-[85%]"
      )}
    >
      <MediaCaption caption={caption} />
      <div
        data-testid="video-frame"
        className={cn(
          "w-full flex justify-center rounded-lg overflow-hidden transition-all duration-150 ease-out border",
          playing
            ? "border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            : "border-transparent dark:border-transparent dark:bg-transparent dark:text-transparent",
          display === "normal" ? "aspect-video max-w-2xl" : "flex-1 min-h-0",
          // Drawers sit beside the player only on desktop; elsewhere they overlay it
          display === "expanded" &&
            playlistOpen &&
            settingsOpen &&
            "desktop:w-[calc(100%-40rem)]",
          display === "expanded" &&
            playlistOpen &&
            !settingsOpen &&
            "desktop:w-[calc(100%-20rem)] desktop:translate-x-[10rem]",
          display === "expanded" &&
            !playlistOpen &&
            settingsOpen &&
            "desktop:w-[calc(100%-20rem)] desktop:-translate-x-[10rem]"
        )}
      >
        {hydrated && url !== "#" && (
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            volume={(options.volume ?? 100) / 100}
            stopOnUnmount={false}
            loop={options.loop}
            config={{
              youtube: {
                playerVars: {
                  autoplay: options.autoplay ? 1 : 0,
                  controls: 1,
                  fs: options.fs ? 1 : 0,
                  cc_load_policy: 0,
                  rel: 0,
                },
              },
            }}
            onClickPreview={(e) => console.log("onClickPreview", e)}
            onDuration={(duration) => console.log("onDuration", duration)}
            onEnded={onEnded}
            onError={onError}
            onPause={onPause}
            onPlay={onPlay}
            onReady={onReady}
            onSeek={(seconds) => console.log("onSeek", seconds)}
            onStart={() => console.log("onStart")}
          />
        )}
      </div>
    </figure>
  )
}
