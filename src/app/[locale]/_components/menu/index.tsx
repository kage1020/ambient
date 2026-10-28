import type { Playlist } from "@/libs/playlist"
import { cn } from "@/libs/tw"
import { OptionsButton } from "./options-button"
import { PauseButton } from "./pause-button"
import { PlayButton } from "./play-button"
import { PlaylistButton } from "./playlist-button"
import { RefreshButton } from "./refresh-button"
import { SettingButton } from "./setting-button"

type MenuProps = {
  playlist: Playlist | null
}

export function Menu({ playlist }: MenuProps) {
  return (
    <div
      data-testid="bottom-menu"
      className={cn(
        "fixed z-40 w-[calc(100%-2rem)] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 dark:bg-gray-700 dark:border-gray-600",
        playlist?.options.background &&
          "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),50%,rgba(255,255,255,1))]"
      )}
      style={{
        backgroundImage: playlist?.options.background
          ? `url(${playlist.options.background})`
          : undefined,
      }}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <PlaylistButton />
        <RefreshButton />
        <div className="flex items-center justify-center">
          <PlayButton />
          <PauseButton />
        </div>
        <SettingButton />
        <OptionsButton />
      </div>
    </div>
  )
}
