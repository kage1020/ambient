import { useContext, useRef } from 'react';
import { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { getOption } from '@/libs/playlist';
import { PlaylistContext } from '@/providers/playlist';

export default function usePlayer() {
  const { setMediaIndex, mediaIndex, playlist } = useContext(PlaylistContext);
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const playPrevious = () => {
    const isRandom = Boolean(getOption('random'));
    if (isRandom && playlist.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        if (randomIndex !== mediaIndex) {
          setMediaIndex(randomIndex);
          break;
        }
      }
      return;
    }
    setMediaIndex(mediaIndex - 1);
  };

  const playNext = () => {
    const isRandom = Boolean(getOption('random'));
    if (isRandom && playlist.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        if (randomIndex !== mediaIndex) {
          setMediaIndex(randomIndex);
          break;
        }
      }
      return;
    }
    setMediaIndex(mediaIndex + 1);
  };

  const onPlayerReady = (e: YouTubeEvent) => {
    youtubePlayerRef.current = e.target;
  };

  const onPlay = (e?: YouTubeEvent<number>) => {
    if (youtubePlayerRef.current) youtubePlayerRef.current.playVideo();
    else if (videoPlayerRef.current) videoPlayerRef.current.play();
  };

  const onPause = (e?: YouTubeEvent<number>) => {
    if (youtubePlayerRef.current) youtubePlayerRef.current.pauseVideo();
    else if (videoPlayerRef.current) videoPlayerRef.current.pause();
  };

  return {
    youtubePlayerRef,
    videoPlayerRef,
    playPrevious,
    playNext,
    onPlayerReady,
    onPlay,
    onPause,
  };
}
