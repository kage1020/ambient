import type { Metadata } from 'next';
import local from 'next/font/local';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import './ambient.css';

const mplus = local({
  src: '../../../public/fonts/mplus-1p-regular.woff',
  display: 'swap',
  variable: '--font-mplus',
});

export const metadata: Metadata = {
  title: 'Ambient Media Player',
  description:
    'Ambient is a media player that runs on a web browser using YouTube IFrame Player API.',
};

type RootLayoutProps = {
  params: {
    locale: string;
  };
  children: React.ReactNode;
};

export default function RootLayout({ params: { locale }, children }: RootLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${mplus.variable} font-sans antialiased w-screen h-screen bg-white dark:bg-gray-800`}
      >
        <Toaster position='top-center' toastOptions={{ unstyled: true }} />
        <ThemeProvider defaultTheme='system' storageKey='ambient.dark' attribute='class'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
