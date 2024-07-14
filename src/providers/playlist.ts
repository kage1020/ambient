import { Media } from '@/libs/playlist';
import { createContext } from 'react';
import { PlayerState } from 'react-youtube';

export const PLAYER_STATE = {
  BUFFERING: 3,
  ENDED: 0,
  PAUSED: 2,
  PLAYING: 1,
  UNSTARTED: -1,
  VIDEO_CUED: 5,
};

type PlaylistContextType = {
  playlistName: string;
  playlist: Media[];
  mediaIndex: number;
  playerState: PlayerState;
  selectPlaylist: (name: string) => void;
  setMediaIndex: (index: number) => void;
  setPlayerState: (state: number) => void;
};

export const PlaylistContext = createContext<PlaylistContextType>({
  playlistName: '',
  playlist: [],
  mediaIndex: 0,
  playerState: PLAYER_STATE.UNSTARTED,
  selectPlaylist: () => {},
  setMediaIndex: () => {},
  setPlayerState: () => {},
});
