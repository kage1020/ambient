import { useContext } from 'react';
import { PlaylistContext } from '@/providers/playlist';

export default function usePlaylist() {
  const {
    playlistName,
    categoryName,
    mediaList,
    mediaIndex,
    playlistOptions,
    playlists,
    categories,
    selectPlaylist,
    selectCategory,
    setMediaList,
    setMediaIndex,
    setPlaylistOptions,
    setDark,
  } = useContext(PlaylistContext);

  return {
    playlistName,
    categoryName,
    mediaList,
    mediaIndex,
    playlistOptions,
    playlists,
    categories,
    selectPlaylist,
    selectCategory,
    setMediaList,
    setMediaIndex,
    setPlaylistOptions,
    setDark,
  };
}
