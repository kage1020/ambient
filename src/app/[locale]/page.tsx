import DrawerPlaylist from '@/components/drawer/playlist';
import DrawerSettings from '@/components/drawer/settings';
import Menu from '@/components/menu';
import Modal from '@/components/modal';
import Player from '@/components/player';
import { getAllPlaylists, getCategories, getMediaList, Media } from '@/libs/playlist';
import AmbientProviders from '@/providers';

type HomeProps = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: HomeProps) {
  const playlists = await getAllPlaylists();
  const allCategoryItems = await await Promise.all(
    playlists.map(async (item) => await getCategories(item))
  );
  const allCategories = playlists.reduce(
    (acc, item, index) => ({ ...acc, [item]: allCategoryItems[index] }),
    {}
  ) as { [key: string]: string[] };
  const allMediaListItems = await Promise.all(
    Object.entries(allCategories).map(
      async ([playlist, categories]: [string, string[]]) =>
        await Promise.all(
          categories.map(async (category) => await getMediaList(playlist, category))
        )
    )
  );
  const allMediaLists = Object.entries(allCategories).reduce(
    (acc, [playlist, categories], index) => ({
      ...acc,
      [playlist]: categories.reduce(
        (acc, category, i) => ({ ...acc, [category]: allMediaListItems[index][i] }),
        { all: allMediaListItems[index].flat(1) as Media[] }
      ),
    }),
    {}
  ) as { [key: string]: { [key: string]: Media[] } };

  return (
    <AmbientProviders
      playlists={playlists}
      allCategories={allCategories}
      allMediaLists={allMediaLists}
    >
      <Player locale={locale} />
      <Menu locale={locale} />
      <DrawerPlaylist locale={locale} />
      <DrawerSettings locale={locale} />
      <Modal locale={locale} />
    </AmbientProviders>
  );
}
