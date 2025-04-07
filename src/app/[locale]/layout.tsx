import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { Toaster } from 'sonner';
import { getTranslation } from '@/libs/i18n';
import { parsePageParams, type PageParams } from '@/libs/params';
import './globals.css';

const mplus = localFont({
  src: './fonts/mplus-1p-regular.woff',
  display: 'swap',
  variable: '--font-mplus',
});

type ParamsProps = {
  params: PageParams['params'];
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslation(locale);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8765'),
    title: t['Ambient Media Player'],
    description:
      t['Ambient is a media player that runs on a web browser using YouTube IFrame Player API.'],
    openGraph: {
      siteName: t['Ambient Media Player'],
      url: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8765'),
    },
  };
}

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const header = await headers();
  const searchParams = new URLSearchParams(header.get('X-Search-Params') ?? '');
  const { parsedParams } = await parsePageParams({ searchParams });

  return (
    <html lang={parsedParams.locale} className={mplus.variable} suppressHydrationWarning>
      <head>
        <link rel='preload' href='https://www.youtube.com/player_api' as='script' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='antialiased w-screen h-screen bg-white dark:bg-gray-800 overflow-hidden transition-all'>
        <Toaster className='w-full' position='top-center' toastOptions={{ unstyled: true }} />
        {children}
      </body>
    </html>
  );
}
