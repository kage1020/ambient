import playlistJson from '../../public/PlayList.json';

export type Media = {
  mediaId: string;
  title: string;
  file?: string;
  videoid?: string;
  desc?: string;
  artist?: string;
  image?: string;
  volume?: number;
  start?: number;
  end?: number;
  fadein?: number;
  fadeout?: number;
  fs?: boolean;
  cc?: boolean;
  [key: string]: any;
};

export type PlaylistOption = {
  autoplay?: boolean;
  controls?: boolean;
  random?: boolean;
  shuffle?: boolean;
  seek?: number;
  volume?: number;
  fader?: boolean;
  dark?: boolean;
  background?: string;
  caption?: string;
  playlist?: string;
  fs?: boolean;
  cc?: boolean;
  rel?: boolean;
};

export type Playlist = {
  options: PlaylistOption;
} & {
  [key: string]: Media[];
};

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

export function getPlaylistNames() {
  return Object.keys(playlistJson).filter((key) => key !== 'options');
}

export function getPlaylist(name: string): Media[] {
  return (playlistJson as unknown as Playlist)[
    name as Exclude<keyof typeof playlistJson, 'options'>
  ].map((media) => ({
    ...media,
    mediaId: media.videoid || media.title,
    image: media.image || getYoutubeThumbnailURL(media.videoid),
  }));
}

export function getOption(name: keyof PlaylistOption) {
  return (playlistJson as unknown as Playlist).options[name];
}

export function getCaptionFormat() {
  return (getOption('caption') as string | undefined) || '%artist% - %title%';
}

export function getExtension(file: string) {
  return file.split('.').pop();
}
