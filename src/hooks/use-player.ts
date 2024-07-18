import { useCallback, useContext } from 'react';
import { PlaylistContext } from '@/providers/playlist';
import { PlayerContext } from '@/providers/player';

export default function usePlayer() {
  const { mediaList, mediaIndex, playlistOptions, setMediaIndex } = useContext(PlaylistContext);
  const { playerRef, playing, setPlaying } = useContext(PlayerContext);

  const playPrevious = useCallback(() => {
    if (playlistOptions.random && mediaList.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * mediaList.length);
        if (randomIndex !== mediaIndex) {
          setMediaIndex(randomIndex);
          break;
        }
      }
      return;
    }
    setMediaIndex((p) => p - 1);
  }, [mediaIndex, mediaList.length, playlistOptions.random, setMediaIndex]);

  const playNext = useCallback(() => {
    if (playlistOptions.random && mediaList.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * mediaList.length);
        if (randomIndex !== mediaIndex) {
          setMediaIndex(randomIndex);
          break;
        }
      }
      return;
    } else {
      setMediaIndex((p) => p + 1);
    }
  }, [mediaIndex, mediaList.length, playlistOptions.random, setMediaIndex]);

  return {
    playerRef,
    playing,
    setPlaying,
    playPrevious,
    playNext,
  };
}
