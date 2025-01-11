import { Metadata } from 'next';
import PlaylistDrawer from '@/components/drawer/playlist';
import SettingDrawer from '@/components/drawer/setting';
import Menu from '@/components/menu';
import OptionModal from '@/components/modal';
import Player from '@/components/player';
import { JotaiHydrator } from '@/components/provider';
import { getTranslation } from '@/libs/locale';
import { getMediaData } from '@/libs/playlist';
import { SearchParams } from '@/types';

type HomeProps = {
  params: {
    locale: string;
  };
  searchParams: SearchParams;
};

export async function generateMetadata({
  params: { locale },
  searchParams,
}: HomeProps): Promise<Metadata> {
  const t = await getTranslation(locale);
  const { mediaIndex, mediaList } = await getMediaData(
    searchParams.p,
    searchParams.c,
    searchParams.m,
    searchParams.s,
    !!searchParams.f
  );
  return {
    title: mediaIndex
      ? `${mediaList[mediaIndex]?.title} - ${t['Ambient Media Player']}`
      : t['Ambient Media Player'],
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { playlistName, categoryName, mediaIndex, playlist, mediaList } = await getMediaData(
    searchParams.p,
    searchParams.c,
    searchParams.m,
    searchParams.f
  );

  return (
    <JotaiHydrator
      playlistName={playlistName}
      categoryName={categoryName}
      mediaIndex={mediaIndex}
      playlist={playlist}
      mediaList={mediaList}
      seed={searchParams.s}
    >
      <Player />
      <Menu />
      <PlaylistDrawer />
      <SettingDrawer />
      <OptionModal />
    </JotaiHydrator>
  );
}
