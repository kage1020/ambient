import { defaultPlaylistOption } from '@/libs/const';
import { getTranslation } from '@/libs/i18n';
import { type PageParams, parsePageParams } from '@/libs/params';
import { getMediaList, getPlaylist } from '@/libs/playlist';
import { Menu } from './_components/menu';
import { Player } from './_components/player';
import { PlaylistDrawer } from './_components/drawer/playlist';
import { SettingsDrawer } from './_components/drawer/settings';
import { OptionModal } from './_components/modal';
import { Provider } from './_components/provider';

export default async function Home({ params, searchParams }: PageParams) {
  const { parsedParams, parsedSearchParams } = await parsePageParams({ params, searchParams });
  const t = await getTranslation(parsedParams.locale);

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
    <Provider
      t={t}
      pageParams={{ parsedParams, parsedSearchParams }}
      playlistOption={playlist?.options ?? defaultPlaylistOption}
    >
      <Player playlist={playlist} mediaList={mediaList} />
      <Menu playlist={playlist} mediaList={mediaList} />
      <PlaylistDrawer mediaList={mediaList} />
      <SettingsDrawer />
      <OptionModal />
    </Provider>
  );
}
