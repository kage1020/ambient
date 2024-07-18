'use server';

import 'server-only';
import fs from 'node:fs/promises';
import { getYoutubeThumbnailURL } from '@/libs/format';

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
  loop?: boolean;
  random?: boolean;
  shuffle?: boolean;
  seek?: boolean;
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
  [category: string]: Media[] | PlaylistOption;
};

const defaultPlaylist: Playlist = {
  options: {
    autoplay: true,
    controls: true,
    loop: false,
    random: false,
    shuffle: false,
    seek: false,
    volume: 100,
    fader: false,
    dark: false,
    background: '#000',
    caption: '%artist% - %title%',
    playlist: 'default',
    fs: false,
    cc: false,
    rel: false,
  },
  category: [] as Media[],
};

export async function getAllPlaylists() {
  if (process.env.NODE_ENV === 'development')
    return (await fs.readdir(process.cwd() + '/public/playlists')).filter((file) =>
      file.endsWith('.json')
    );
  else
    return (await fs.readdir(process.cwd() + '/playlists')).filter((file) =>
      file.endsWith('.json')
    );
}

export async function getPlaylist(filename: string) {
  const files = await getAllPlaylists();
  const file = files.find((file) => file === filename);
  if (!file) return defaultPlaylist;
  if (process.env.NODE_ENV === 'development')
    return JSON.parse(
      await fs.readFile(process.cwd() + '/public/playlists/' + file, 'utf-8')
    ) as Playlist;
  else
    return JSON.parse(await fs.readFile(process.cwd() + '/playlists/' + file, 'utf-8')) as Playlist;
}

export async function getCategories(filename: string) {
  const playlist = await getPlaylist(filename);
  return Object.keys(playlist).filter((key) => key !== 'options');
}

export async function getMediaList(filename: string, category: string, shuffle?: boolean) {
  const playlist = await getPlaylist(filename);

  if (category === 'all') {
    const items = (
      Object.keys(playlist)
        .filter((key) => key !== 'options')
        .map((key) => playlist[key])
        .flat() as Omit<Media, 'mediaId'>[]
    ).map((media) => ({
      ...media,
      mediaId: media.videoid || media.title,
      image: media.image || getYoutubeThumbnailURL(media.videoid),
    })) as Media[];
    if (shuffle) return items.sort(() => Math.random() - 0.5);
    return items;
  }

  const items = ((playlist[category] || []) as Omit<Media, 'mediaId'>[]).map((media) => ({
    ...media,
    mediaId: media.videoid || media.title,
    image: media.image || getYoutubeThumbnailURL(media.videoid),
  })) as Media[];
  if (shuffle) return items.sort(() => Math.random() - 0.5);
  return items;
}

export async function getOptions(filename: string) {
  const playlist = await getPlaylist(filename);
  return { ...defaultPlaylist.options, ...playlist.options };
}

export async function getOption(filename: string, name: keyof PlaylistOption) {
  const playlist = await getPlaylist(filename);
  return playlist.options[name];
}
