import { isLocal } from "@/libs/const"
import { cache } from "react"
import "server-only"
import { Random } from "./random"

// Leaves room for rendering within the serverless function's 10-second limit
const remotePlaylistTimeout = 5_000

export type Media = {
  mediaId: string
  title: string
  file?: string
  videoid?: string
  desc?: string
  artist?: string
  image?: string
  volume?: number
  start?: number
  end?: number
  fadein?: number
  fadeout?: number
  fs?: boolean // fullscreen
  cc?: boolean // closed caption
  [key: string]: string | number | boolean | undefined
}

export type PlaylistOption = {
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  random?: boolean
  shuffle?: boolean
  seek?: boolean
  volume?: number
  fader?: boolean
  dark?: boolean
  background?: string
  caption?: string
  playlist?: string
  fs?: boolean // fullscreen
  cc?: boolean // closed caption
}

export type Playlist = Record<string, Media[]> & { options: PlaylistOption }

export async function getPlaylistFileNames(url?: string) {
  if (!isLocal) return [] // In vercel, we don't have access to the file system

  const fs = await import("node:fs/promises")
  const localFiles = (
    await fs.readdir(
      `${process.cwd()}${isLocal ? "/src" : ""}/assets/playlists`
    )
  ).filter((file) => file.endsWith(".json"))

  if (!url) return localFiles

  return [...localFiles, url.split("/").pop() ?? ""].filter((file) =>
    file.endsWith(".json")
  )
}

// A fetch with an abort signal is not deduplicated, so one render shares the result here
export const getPlaylist = cache(async (nameOrUrl: string) => {
  if (nameOrUrl.startsWith("http")) {
    const res = await fetch(nameOrUrl, {
      signal: AbortSignal.timeout(remotePlaylistTimeout),
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch playlist ${nameOrUrl}: ${res.status}`)
    }
    return (await res.json()) as Playlist
  }

  const fs = await import("node:fs/promises")
  const content = await fs.readFile(
    `${process.cwd()}${isLocal ? "/src" : ""}/assets/playlists/${nameOrUrl}`,
    "utf-8"
  )
  return JSON.parse(content) as Playlist
})

export async function getCategories(playlist: Playlist) {
  return ["all", ...Object.keys(playlist).filter((key) => key !== "options")]
}

export async function getMediaList(
  playlist: Playlist,
  categoryName: string | null,
  shuffle?: boolean,
  seed?: number
) {
  if (!categoryName || categoryName === "all") {
    const mediaItems = Object.values(playlist)
      .filter((v) => Array.isArray(v))
      .flat()
    const random = new Random(seed || 42)
    return shuffle
      ? (await shuffleMedia(mediaItems, seed)).map((m) => ({
          ...m,
          mediaId: random.next().toString(16),
        }))
      : mediaItems.map((m) => ({ ...m, mediaId: random.next().toString(16) }))
  }

  const categories = await getCategories(playlist)

  const mediaItems = categories.includes(categoryName)
    ? playlist[categoryName]
    : []
  const random = new Random(seed || 42)
  return shuffle
    ? (await shuffleMedia(mediaItems, seed)).map((m) => ({
        ...m,
        mediaId: random.next().toString(16),
      }))
    : mediaItems.map((m) => ({ ...m, mediaId: random.next().toString(16) }))
}

export async function shuffleMedia(mediaItems: Media[], seed?: number) {
  const random = new Random(seed || 42)
  return mediaItems
    .map((m) => ({ ...m, r: random.next() }))
    .sort((a, b) => a.r - b.r)
    .map((m) => ({ ...m, r: undefined })) as Media[]
}
