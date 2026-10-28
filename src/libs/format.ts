import type { Media } from "@/libs/playlist"

export function getYoutubeURL(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function getYoutubeThumbnailURL(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function formatDocumentTitle(media: Media | null, appName: string) {
  return media?.title ? `${media.title} - ${appName}` : appName
}

export function filterText(media: Media, format: string) {
  const patterns = format.match(/%(.+?)%/gi)
  if (!patterns) return media.title

  const text = patterns.reduce(
    (acc, pattern) =>
      acc.replaceAll(
        pattern,
        (media[pattern.slice(1, -1) as keyof Media] as string) || ""
      ),
    format
  )
  return text
    .trim()
    .replace(/^[-_‐–−—ー]?(.*)[-_‐–−—ー]?$/, "$1")
    .trim()
}
