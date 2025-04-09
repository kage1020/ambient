import { getTranslation } from '@/libs/i18n';
import { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslation();
  return {
    background_color: '#ffffff',
    categories: ['entertainment', 'music'],
    description:
      t['Ambient is a media player that runs on a web browser using YouTube IFrame Player API.'],
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    name: t['Ambient Media Player'],
    start_url: '/',
    theme_color: '#ffffff',
  };
}
