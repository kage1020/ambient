import { getTranslation } from "@/libs/i18n"
import type { Media } from "@/libs/playlist"
import { PlaylistDrawer as Drawer, DrawerHeader } from ".."
import { Close as CloseIcon, Playlist as PlaylistIcon } from "../../icons"
import { MediaItem } from "./media-item"

type PlaylistDrawerProps = {
  mediaList: Media[]
}

export async function PlaylistDrawer({ mediaList }: PlaylistDrawerProps) {
  const t = await getTranslation()

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
          <MediaItem key={item.mediaId} index={index} media={item} />
        ))}
      </div>
    </Drawer>
  )
}
