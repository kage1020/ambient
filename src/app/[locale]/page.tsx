import { type PageParams, parsePageParams } from '@/libs/params';
import { getMediaList, getPlaylist } from '@/libs/playlist';
import { Menu } from './_components/menu';
import { Player } from './_components/player';
import { PlaylistDrawer } from './_components/drawer/playlist';
import { SettingsDrawer } from './_components/drawer/settings';
import { OptionModal } from './_components/modal';

export default async function Home({ searchParams }: PageParams) {
  const { parsedSearchParams } = await parsePageParams({ searchParams });

  const playlist = parsedSearchParams.playlist
    ? await getPlaylist(parsedSearchParams.playlist)
    : null;
  const mediaList = playlist
    ? await getMediaList(
        playlist,
        parsedSearchParams.category,
        parsedSearchParams.shuffle,
        parsedSearchParams.seed
      )
    : [];

  return (
    <>
      <Player playlist={playlist} mediaList={mediaList} />
      <Menu playlist={playlist} mediaList={mediaList} />
      <PlaylistDrawer mediaList={mediaList} />
      <SettingsDrawer />
      <OptionModal />
    </>
  );
}
