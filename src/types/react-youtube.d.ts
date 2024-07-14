import ReactYoutube from 'react-youtube';

declare module 'react-youtube' {
  enum PlayerState {
    BUFFERING = 3,
    ENDED = 0,
    PAUSED = 2,
    PLAYING = 1,
    UNSTARTED = -1,
    VIDEO_CUED = 5,
  }

  interface PlayerSize {
    width: number;
    height: number;
  }

  type EventType =
    | 'ready'
    | 'stateChange'
    | 'playbackQualityChange'
    | 'playbackRateChange'
    | 'error'
    | 'apiChange'
    | 'volumeChange';

  interface YouTubePlayer {
    videoTitle: string;
    addEventListener(event: string, listener: (event: CustomEvent) => void): Promise<void>;
    destroy(): Promise<void>;
    getAvailablePlaybackRates(): Promise<readonly number[]>;
    getAvailableQualityLevels(): Promise<readonly string[]>;
    getCurrentTime(): Promise<number>;
    getDuration(): Promise<number>;
    getIframe(): Promise<HTMLIFrameElement>;
    getOption(module: string, option: string): Promise<any>;
    getOptions(): Promise<string[]>;
    getOptions(module: string): Promise<object>;
    setOption(module: string, option: string, value: any): Promise<void>;
    setOptions(): Promise<void>;
    cuePlaylist(
      playlist: string | readonly string[],
      index?: number,
      startSeconds?: number,
      suggestedQuality?: string
    ): Promise<void>;
    cuePlaylist(playlist: {
      listType: string;
      list?: string | undefined;
      index?: number | undefined;
      startSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    loadPlaylist(
      playlist: string | readonly string[],
      index?: number,
      startSeconds?: number,
      suggestedQuality?: string
    ): Promise<void>;
    loadPlaylist(playlist: {
      listType: string;
      list?: string | undefined;
      index?: number | undefined;
      startSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    getPlaylist(): Promise<readonly string[]>;
    getPlaylistIndex(): Promise<number>;
    getPlaybackQuality(): Promise<string>;
    getPlaybackRate(): Promise<number>;
    getPlayerState(): Promise<PlayerState>;
    getVideoEmbedCode(): Promise<string>;
    getVideoLoadedFraction(): Promise<number>;
    getVideoUrl(): Promise<string>;
    getVolume(): Promise<number>;
    cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): Promise<void>;
    cueVideoById(video: {
      videoId: string;
      startSeconds?: number | undefined;
      endSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    cueVideoByUrl(
      mediaContentUrl: string,
      startSeconds?: number,
      suggestedQuality?: string
    ): Promise<void>;
    cueVideoByUrl(video: {
      mediaContentUrl: string;
      startSeconds?: number | undefined;
      endSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    loadVideoByUrl(
      mediaContentUrl: string,
      startSeconds?: number,
      suggestedQuality?: string
    ): Promise<void>;
    loadVideoByUrl(video: {
      mediaContentUrl: string;
      startSeconds?: number | undefined;
      endSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): Promise<void>;
    loadVideoById(video: {
      videoId: string;
      startSeconds?: number | undefined;
      endSeconds?: number | undefined;
      suggestedQuality?: string | undefined;
    }): Promise<void>;
    isMuted(): Promise<boolean>;
    mute(): Promise<void>;
    nextVideo(): Promise<void>;
    pauseVideo(): Promise<void>;
    playVideo(): Promise<void>;
    playVideoAt(index: number): Promise<void>;
    previousVideo(): Promise<void>;
    removeEventListener(event: string, listener: (event: CustomEvent) => void): Promise<void>;
    seekTo(seconds: number, allowSeekAhead: boolean): Promise<void>;
    setLoop(loopPlaylists: boolean): Promise<void>;
    setPlaybackQuality(suggestedQuality: string): Promise<void>;
    setPlaybackRate(suggestedRate: number): Promise<void>;
    setShuffle(shufflePlaylist: boolean): Promise<void>;
    getSize(): Promise<PlayerSize>;
    setSize(width: number, height: number): Promise<object>;
    setVolume(volume: number): Promise<void>;
    stopVideo(): Promise<void>;
    unMute(): Promise<void>;
    on(eventType: 'stateChange', listener: (event: CustomEvent & { data: number }) => void): void;
    on(eventType: EventType, listener: (event: CustomEvent) => void): void;
  }

  type YouTubeEvent<T = any> = {
    data: T;
    target: YouTubePlayer;
  };
}
