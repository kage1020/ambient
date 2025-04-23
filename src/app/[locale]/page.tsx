import { defaultPlaylistOption } from "@/libs/const"
import { getTranslation } from "@/libs/i18n"
import { getPageParams, type PageParams, parsePageParams } from "@/libs/params"
import { getMediaList, getPlaylist } from "@/libs/playlist"
import { Metadata, Viewport } from "next"
import { PlaylistDrawer } from "./_components/drawer/playlist"
import { SettingsDrawer } from "./_components/drawer/settings"
import { Menu } from "./_components/menu"
import { OptionModal } from "./_components/modal"
import { Player } from "./_components/player"
import { Provider } from "./_components/provider"

export async function generateMetadata(): Promise<Metadata> {
  const { params, searchParams } = await getPageParams()
  const t = await getTranslation(params.locale)
  const playlist = searchParams.playlist
    ? await getPlaylist(searchParams.playlist)
    : null
  const mediaList = playlist
    ? await getMediaList(
        playlist,
        searchParams.category,
        searchParams.shuffle,
        searchParams.seed
      )
    : []
  const media =
    searchParams.mediaIndex !== null ? mediaList[searchParams.mediaIndex] : null
  const title = `${media?.title ? `${media.title} - ` : ""}${
    t["Ambient Media Player"]
  }`

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8765"
    ),
    title: title,
    description:
      t[
        "Ambient is a media player that runs on a web browser using YouTube IFrame Player API."
      ],
    openGraph: {
      siteName: t["Ambient Media Player"],
      url: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8765"),
    },
    other: {
      "application-title": title,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
}

export default async function Home({ params, searchParams }: PageParams) {
  const { parsedParams, parsedSearchParams } = await parsePageParams({
    params,
    searchParams,
  })
  const t = await getTranslation(parsedParams.locale)

  const playlist = parsedSearchParams.playlist
    ? await getPlaylist(parsedSearchParams.playlist)
    : null
  const mediaList = playlist
    ? await getMediaList(
        playlist,
        parsedSearchParams.category,
        parsedSearchParams.shuffle,
        parsedSearchParams.seed
      )
    : []

  return (
    <Provider
      t={t}
      pageParams={{ parsedParams, parsedSearchParams }}
      playlistOption={playlist?.options ?? defaultPlaylistOption}
    >
      <Player playlist={playlist} mediaList={mediaList} />
      <Menu playlist={playlist} mediaList={mediaList} />
      <PlaylistDrawer mediaList={mediaList} />
      <SettingsDrawer />
      <OptionModal />
    </Provider>
  )
}
