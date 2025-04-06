import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { Toaster } from 'sonner';
import { defaultPlaylistOption } from '@/libs/const';
import { getTranslation } from '@/libs/i18n';
import { parsePageParams, type PageParams } from '@/libs/params';
import { getPlaylist } from '@/libs/playlist';
import { Provider } from './_components/provider';
import './globals.css';

const mplus = localFont({
  src: './fonts/mplus-1p-regular.woff',
  display: 'swap',
  variable: '--font-mplus',
});

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslation(locale);

  return {
    title: t['Ambient Media Player'],
    description:
      t['Ambient is a media player that runs on a web browser using YouTube IFrame Player API.'],
  };
}

type AppLayoutProps = PageParams & {
  children: React.ReactNode;
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const header = await headers();
  const searchParams = new URLSearchParams(header.get('X-Search-Params') ?? '');
  const { parsedParams, parsedSearchParams } = await parsePageParams({ params, searchParams });
  const t = await getTranslation(parsedParams.locale);
  const playlist = parsedSearchParams.playlist
    ? await getPlaylist(parsedSearchParams.playlist)
    : null;

  return (
    <html lang={parsedParams.locale} className={mplus.variable} suppressHydrationWarning>
      <head>
        <link rel='preload' href='https://www.youtube.com/player_api' as='script' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='antialiased w-screen h-screen bg-white dark:bg-gray-800 overflow-hidden transition-all'>
        <Provider
          t={t}
          pageParams={{ parsedParams, parsedSearchParams }}
          playlistOption={playlist?.options ?? defaultPlaylistOption}
        >
          <Toaster className='w-full' position='top-center' toastOptions={{ unstyled: true }} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
