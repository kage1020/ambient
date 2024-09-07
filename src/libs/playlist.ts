import 'server-only';
import fs from 'node:fs/promises';
import { allCategory } from '@/const';
import { shuffleMedia } from '@/libs/utils';
import { Media, MediaWithoutId, Playlist, PlaylistWithoutId } from '@/types';

export async function loadPlaylistFiles() {
  const files = (await fs.readdir(process.cwd() + '/public/playlists')).filter((file) =>
    file.endsWith('.json')
  );
  return files;
}

export async function loadPlaylistFile(filename?: string) {
  if (!filename) return null;

  try {
    const exists = (await fs.lstat(process.cwd() + '/public/playlists/' + filename)).isFile();
    if (!exists) return null;
    return JSON.parse(
      await fs.readFile(process.cwd() + '/public/playlists/' + filename, 'utf-8')
    ) as PlaylistWithoutId;
  } catch (e) {
    console.error('error');
    return null;
  }
}

export async function addMediaId(mediaList: MediaWithoutId[]): Promise<Media[]> {
  return mediaList.map((media) => ({ ...media, mediaId: media.videoid || media.title }));
}

export async function getCategoriesByPlaylist(playlist: Playlist) {
  return Object.keys(playlist).filter((key) => key !== 'options');
}

export async function validateCategory(playlist: Playlist, categoryName?: string) {
  if (!categoryName) return false;
  return (await getCategoriesByPlaylist(playlist)).includes(categoryName);
}

export async function getMediaListByPlaylist(
  playlist: PlaylistWithoutId | null,
  category: string | typeof allCategory
) {
  if (!playlist) return [];
  if (category === allCategory) {
    const items = Object.keys(playlist)
      .filter((key) => key !== 'options')
      .map((key) => playlist[key])
      .flat();
    return addMediaId(items);
  }
  return addMediaId(playlist[category]);
}

export async function getMediaData(
  playlistName?: string,
  categoryName?: string,
  mediaIndex?: string,
  shuffle?: boolean
) {
  const playlist = await loadPlaylistFile(playlistName);
  const cName =
    playlist && (await validateCategory(playlist, categoryName)) ? categoryName : undefined;
  const mediaList = playlist && cName ? await getMediaListByPlaylist(playlist, cName) : [];
  const shuffledList = shuffle ? shuffleMedia(mediaList) : mediaList;
  const items = shuffle ? shuffledList : mediaList;

  return {
    playlistName: playlist && playlistName ? playlistName : undefined,
    playlist,
    playlists: await loadPlaylistFiles(),
    categoryName: cName,
    categories: playlist ? await getCategoriesByPlaylist(playlist) : [],
    mediaList: items,
    mediaIndex: mediaIndex ? parseInt(mediaIndex) : undefined,
    currentMedia: mediaIndex ? items[parseInt(mediaIndex)] : null,
  };
}
