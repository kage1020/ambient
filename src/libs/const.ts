import type { PlaylistOption } from "@/libs/playlist"

export const defaultLocale = "en" as const

export const allCategory = "all" as const

export const defaultFormat = "%title% - %artist%"

export const defaultPlaylistOption: PlaylistOption = {
  autoplay: true,
  controls: true,
  loop: false,
  random: false,
  shuffle: false,
  seek: false,
  volume: 100,
  fader: false,
  dark: false,
  background: "",
  caption: defaultFormat,
  playlist: "",
  fs: false,
  cc: false,
}

export const isLocal = process.env.NEXT_PUBLIC_PROD === undefined
