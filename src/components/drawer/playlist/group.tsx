import { Suspense } from 'react';
import Image from 'next/image';
import { getYoutubeThumbnailURL } from '@/libs/format';
import { getSearchParams } from '@/libs/params';
import { getMediaData } from '@/libs/playlist';
import { cn } from '@/libs/tw';
import NoMediaGroup from './no-media';
import PlaylistGroupItem from './group-item';
import noMedia from '../../../../public/images/no-media-thumb.svg';

export default async function PlaylistGroup() {
  const searchParams = await getSearchParams();
  const { mediaList, mediaIndex } = await getMediaData(
    searchParams.p,
    searchParams.c,
    searchParams.m,
    !!searchParams.f
  );

  return (
    <div className='w-full mt-14 mb-16 overflow-y-auto text-sm font-normal text-gray-900 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-[calc(100vh-120px)]'>
      <Suspense fallback={<NoMediaGroup />}>
        {mediaList.length === 0 && <NoMediaGroup />}
        {mediaList.map((item, index) => (
          <PlaylistGroupItem key={item.mediaId} index={index} initialIndex={mediaIndex}>
            <div className='w-8 h-8'>
              {item.image && (
                <Image
                  src={`/images/${item.image}`}
                  alt=''
                  className='block rounded object-cover'
                  width={32}
                  height={32}
                />
              )}
              {item.videoid && (
                <Image
                  src={getYoutubeThumbnailURL(item.videoid) || noMedia}
                  alt=''
                  className='block rounded object-cover'
                  width={32}
                  height={32}
                />
              )}
            </div>
            <div className='flex-1 flex flex-col pointer-events-none text-left overflow-hidden'>
              <span
                className={cn(
                  'text-sm text-gray-900 rotate-0.03 hover:text-white dark:text-gray-100 overflow-ellipsis whitespace-nowrap overflow-hidden',
                  index === mediaIndex && 'text-white'
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  'text-xs text-amber-900 rotate-0.03 hover:text-amber-50 dark:text-amber-500 overflow-ellipsis whitespace-nowrap overflow-hidden',
                  index === mediaIndex && 'text-amber-200'
                )}
              >
                {item.artist}
              </span>
            </div>
          </PlaylistGroupItem>
        ))}
      </Suspense>
    </div>
  );
}
