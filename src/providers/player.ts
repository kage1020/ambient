import { createContext, MutableRefObject } from 'react';
import ReactPlayer from 'react-player';

type PlayerContextType = {
  playerRef: MutableRefObject<ReactPlayer | null>;
  playing: boolean;
  setPlaying: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export const PlayerContext = createContext<PlayerContextType>({
  playerRef: { current: null },
  playing: false,
  setPlaying: () => {},
});
