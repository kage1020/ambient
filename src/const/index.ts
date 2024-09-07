export const defaultLocale = 'en' as const;

export const allCategory = 'all' as const;

export const defaultFormat = '%title% - %artist%';

export const defaultOption = {
  autoplay: false,
  controls: true,
  loop: false,
  random: false,
  shuffle: false,
  seek: false,
  volume: 100,
  fader: false,
  dark: false,
  background: '',
  caption: defaultFormat,
  playlist: '',
  fs: false,
  cc: false,
  rel: false,
};

export const isLocal = !Boolean(process.env.NEXT_PUBLIC_PROD);
