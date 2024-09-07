export type LanguageTranslation = {
  $language: string;
  'Ambient Media Player': string;
  'Get choose your playlist you want to play from the settings menu.': string;
  Notify: string;
  Dismiss: string;
  'Previous Item': string;
  'Next Item': string;
  'Watch on YouTube': string;
  Playlist: string;
  Refresh: string;
  Play: string;
  Pause: string;
  Settings: string;
  Options: string;
  'Close Playlist': string;
  'No media available.': string;
  'Close Settings': string;
  'Current Playlist': string;
  'Choose a playlist': string;
  'Target Category': string;
  'All categories': string;
  'Loop play of one media': string;
  'Randomly play': string;
  'Shuffle play': string;
  'Seek and play': string;
  'Default volume:': string;
  'Pseudo fader': string;
  'Dark mode': string;
  Language: string;
  Default: string;
  'Close options': string;
  'Media Management': string;
  'Add media to the currently active playlist.': string;
  'Media you add is lost when you switch playlists or end your application session.': string;
  'If you want the additional media to be permanent, you will need to download the playlist after adding the media.': string;
  'YouTube Media': string;
  'Local Media': string;
  'YouTube URL': string;
  Required: string;
  'Invalid URL': string;
  'Copy and paste full text of the YouTube video URL includes schema.': string;
  'Local Media File': string;
  'Invalid file path': string;
  'File not found in media directory.': string;
  'Only media files that are relatively accessible from the Ambient media directory are valid.': string;
  Category: string;
  'Choose category is required': string;
  'Choose a playlist category': string;
  Title: string;
  'Media title is required': string;
  'Displayed media title': string;
  Artist: string;
  'Displayed artist name': string;
  Description: string;
  'Subtitle or description of media': string;
  'Default playback volume': string;
  'Seek start': string;
  'Invalid format': string;
  'Integer of seconds or H:MM:SS format': string;
  'Seek end': string;
  'Fade-in seconds': string;
  'Integer of seconds': string;
  'Set seconds fade-in from start of playback.': string;
  'Fade-out seconds': string;
  'Set seconds fade-out to end of playback.': string;
  'Add New Media': string;
  'Media has been added to your specified playlist.': string;
  'Failed to add media to the specified playlist.': string;
  'Playlist Management': string;
  'Create Symbolic Link': string;
  'Create a symbolic link of the folder containing the media files on your host computer into media directory in the Ambient.': string;
  'This section provides various tools to manage your playlists.': string;
  'Local Media Folder Path': string;
  'This path is required': string;
  'Enter the full path to the media folder on the host computer that you want to link to.': string;
  'Symbolic Link Name': string;
  'This name is required': string;
  'Please fill any strings': string;
  'This feature cannot be performed on remote hosts.': string;
  'The path to link to does not exist.': string;
  'A link with the same name already exists.': string;
  'The command to make symbolic link is not available in the current environment.': string;
  'Symbolic link created successfully.': string;
  'Failed to create symbolic link.': string;
  'Add New Category': string;
  'Adds a new category to the currently active playlist.': string;
  'Category Name': string;
  'New category added successfully.': string;
  'Failed to add new category.': string;
  'Add Category': string;
  'Download Playlist': string;
  'Download the currently active playlist in JSON format.': string;
  'Output seek time in media data in HH:MM:SS format.': string;
  'If this option is not enabled, it will be output as an integer number of seconds.': string;
  'Playlist downloaded successfully.': string;
  'Failed to download playlist.': string;
  'Report an issue': string;
  'Ambient development code is managed in a github repository.': string;
  'To report bugs or problems, please raise an issue on github.': string;
  'Before reporting a problem, please check to see if a similar issue has already been submitted.': string;
  'Check out and submit issues.': string;
  'About Ambient': string;
  'Ambient is an open-source media player that allows you to seamlessly mix and play media published on YouTube and media stored on a host computer, such as a local PC.': string;
  "Additionally, since Ambient is designed as a web application, anyone can use it by accessing the application's pages with a common web browser.": string;
  'However, if you want to use Ambient on your local PC, you will need to prepare a PHP execution environment and launch your application onto that environment.': string;
  'Learn more about the technology Ambient uses below:': string;
  'YouTube IFrame Player API': string;
  tailwindcss: string;
  Flowbite: string;
  'Version:': string;
};

export type MediaWithoutId = {
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

export type Media = MediaWithoutId & {
  mediaId: string;
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

export type PlaylistWithoutId = Omit<Record<string, MediaWithoutId[]>, 'options'> & {
  options: PlaylistOption;
};

export type Playlist = Omit<Record<string, Media[]>, 'options'> & {
  options: PlaylistOption;
};

export type SearchParams = {
  p?: string; // playlist name
  c?: string; // category name
  m?: string; // media index
  s: string; // random seed
  f?: string; // shuffle flag
};

export type FeatureFlag = {
  seek: boolean;
  fader: boolean;
  volume: boolean;
};
