import { createContext } from 'react';
import { Media, PlaylistOption } from '@/libs/playlist';

type PlaylistContextType = {
  playlistName: string;
  categoryName: string;
  mediaList: Media[];
  mediaIndex: number;
  playlistOptions: PlaylistOption;
  playlists: string[];
  categories: string[];
  selectPlaylist: (name: string) => void;
  selectCategory: (name: string) => void;
  setMediaList: (list: Media[]) => void;
  setMediaIndex: (value: number | ((prevState: number) => number)) => void;
  setPlaylistOptions: (
    options: PlaylistOption | ((prevState: PlaylistOption) => PlaylistOption)
  ) => void;
  setDark: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export const PlaylistContext = createContext<PlaylistContextType>({
  playlistName: '',
  categoryName: '',
  mediaList: [],
  mediaIndex: 0,
  playlistOptions: {
    loop: false,
    random: false,
    shuffle: false,
    seek: false,
    volume: 100,
    fader: false,
  },
  playlists: [],
  categories: [],
  selectPlaylist: () => {},
  selectCategory: () => {},
  setMediaList: () => {},
  setMediaIndex: () => {},
  setPlaylistOptions: () => {},
  setDark: () => {},
});
