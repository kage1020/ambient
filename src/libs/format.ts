import { getCaptionFormat, Media } from '@/libs/playlist';

export function filterText(media: Media, format: string) {
  const patterns = format.match(/%(.+?)%/gi);
  if (!patterns) return format;

  return patterns.reduce(
    (acc, pattern) => acc.replace(pattern, media[pattern.slice(1, -1)]),
    format
  );
}

export function formatMediaCaption(media: Media) {
  const format = getCaptionFormat();
  return filterText(media, format);
}
