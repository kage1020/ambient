import DrawerPlaylist from '@/components/drawer/playlist';
import DrawerSettings from '@/components/drawer/settings';
import Menu from '@/components/menu';
import Player from '@/components/player';
import Providers from '@/providers';
import Modal from '@/components/modal';

type HomeProps = {
  params: {
    locale: string;
  };
};

export default function Home({ params: { locale } }: HomeProps) {
  return (
    <Providers>
      <Player locale={locale} />
      <Menu locale={locale} />
      <DrawerPlaylist locale={locale} />
      <DrawerSettings locale={locale} />
      <Modal locale={locale} />
    </Providers>
  );
}
