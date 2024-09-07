import { Suspense } from 'react';
import { getLocale, getTranslation } from '@/libs/locale';
import { cn } from '@/libs/tw';
import { getMediaData } from '@/libs/playlist';
import { filterText, getYoutubeURL } from '@/libs/format';
import { getSearchParams } from '@/libs/params';
import Carousel from './carousel';
import WatchOrigin from './watch-origin';
import VideoPlayer from './video-player';
import MediaCaption from './caption';

export default async function Player() {
  const locale = await getLocale();
  const searchParams = await getSearchParams();
  const t = await getTranslation(locale);
  const { playlist, currentMedia } = await getMediaData(
    searchParams.p,
    searchParams.c,
    searchParams.m,
    !!searchParams.f
  );
  const caption =
    currentMedia && playlist?.options.caption
      ? filterText(currentMedia, playlist.options.caption)
      : '';
  const url = currentMedia?.videoid ? getYoutubeURL(currentMedia.videoid) : '#';

  return (
    <div
      className={cn(
        'flex flex-col items-center max-w-full w-full h-full mt-0 mx-auto mb-16 z-10 overflow-y-auto overflow-x-hidden',
        playlist?.options.background && 'bg-no-repeat bg-bottom bg-cover'
      )}
      style={{
        backgroundImage: playlist?.options.background && `url(${playlist.options.background})`,
      }}
    >
      <Carousel />
      <figure className='w-full flex flex-col items-center gap-1 mt-4 mb-16'>
        <Suspense>
          <MediaCaption caption={caption} />
          <VideoPlayer url={url} t={t} />
        </Suspense>
        <div className='my-4 transition-all duration-150 ease-out'>
          <WatchOrigin url={url} />
        </div>
      </figure>
    </div>
  );
}
