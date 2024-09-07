import local from 'next/font/local';
import { Toaster } from 'sonner';
import Provider from '@/components/provider';
import { Metadata } from 'next';
import './globals.css';

const mplus = local({
  src: '../../../public/fonts/mplus-1p-regular.woff',
  display: 'swap',
  variable: '--font-mplus',
});

type RootLayoutProps = {
  params: {
    locale: string;
  };
  children: React.ReactNode;
};

export const metadata: Metadata = {
  description:
    'Ambient is a media player that runs on a web browser using YouTube IFrame Player API.',
};

export default async function RootLayout({ params: { locale }, children }: RootLayoutProps) {
  return (
    <html lang={locale} className='overflow-hidden' suppressHydrationWarning>
      <body
        className={`${mplus.variable} font-sans rotate-0.03 antialiased w-screen h-screen bg-white dark:bg-gray-800 overflow-hidden`}
      >
        <Provider>
          <Toaster position='top-center' toastOptions={{ unstyled: true }} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
