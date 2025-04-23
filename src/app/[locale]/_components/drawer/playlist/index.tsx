import { getYoutubeThumbnailURL } from "@/libs/format"
import { getTranslation } from "@/libs/i18n"
import { getPageParams } from "@/libs/params"
import type { Media } from "@/libs/playlist"
import { cn } from "@/libs/tw"
import Image from "next/image"
import { PlaylistDrawer as Drawer, DrawerHeader } from ".."
import noMedia from "../../../../../assets/images/no-media-placeholder.svg"
import { Close as CloseIcon, Playlist as PlaylistIcon } from "../../icons"
import { MediaItem } from "./media-item"

type PlaylistDrawerProps = {
  mediaList: Media[]
}

export async function PlaylistDrawer({ mediaList }: PlaylistDrawerProps) {
  const t = await getTranslation()
  const { searchParams } = await getPageParams()

  return (
    <Drawer className="border-r border-gray-200 dark:border-gray-600 shadow dark:shadow-md p-0">
      <DrawerHeader
        className="p-4 fixed top-0 left-0 z-auto w-80 h-14 flex flex-nowrap justify-between items-center bg-white border-r border-b dark:bg-gray-800 dark:border-gray-600"
        title={<span className="ml-2 text-rotate-0">{t["Playlist"]}</span>}
        theme={{
          inner: {
            titleText:
              "inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
          },
        }}
        titleIcon={
          <PlaylistIcon className="w-5 h-5 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 text-rotate-0" />
        }
        closeIcon={
          <>
            <CloseIcon className="w-3 h-3" />
            <span className="sr-only">{t["Close Playlist"]}</span>
          </>
        }
      />
      <div className="w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-120px)]">
        {mediaList.length === 0 && (
          <div className="flex w-full h-full justify-center items-center text-base text-gray-500">
            {t["No media available."]}
          </div>
        )}
        {mediaList.map((item, index) => (
          <MediaItem
            key={item.mediaId}
            index={index}
            mediaIndex={searchParams.mediaIndex}
          >
            <div className="w-8 h-8">
              {item.image && (
                <Image
                  src={`/images/${item.image}`}
                  alt=""
                  className="block rounded object-cover"
                  width={32}
                  height={32}
                  unoptimized
                />
              )}
              {item.videoid && (
                <Image
                  src={getYoutubeThumbnailURL(item.videoid) || noMedia}
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
                  index === searchParams.mediaIndex && "text-white"
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "text-xs text-amber-900 rotate-0.03 hover:text-amber-50 dark:text-amber-500 overflow-ellipsis whitespace-nowrap overflow-hidden",
                  index === searchParams.mediaIndex && "text-amber-200"
                )}
              >
                {item.artist}
              </span>
            </div>
          </MediaItem>
        ))}
      </div>
    </Drawer>
  )
}
