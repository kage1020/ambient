import { Media, PlaylistOption } from '@/libs/playlist';

export function filterText(media: Media, format: string) {
  const patterns = format.match(/%(.+?)%/gi);
  if (!patterns) return format;

  return patterns.reduce(
    (acc, pattern) => acc.replace(pattern, media[pattern.slice(1, -1)]),
    format
  );
}

export function getCaptionFormat(playlistOptions: PlaylistOption) {
  return playlistOptions.caption || '%artist% - %title%';
}

export function formatMediaCaption(playlistOptions: PlaylistOption, media: Media) {
  const format = getCaptionFormat(playlistOptions);
  return filterText(media, format);
}

export function getYoutubeURL(videoid: string | undefined) {
  if (!videoid) {
    return '#';
  }
  return `https://www.youtube.com/watch?v=${videoid}`;
}

export function getYoutubeThumbnailURL(videoid: string | undefined) {
  if (!videoid) {
    return '#';
  }
  return `https://img.youtube.com/vi/${videoid}/hqdefault.jpg`;
}
