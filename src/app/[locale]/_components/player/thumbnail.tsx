'use client';

import Image from 'next/image';
import type { Media } from '@/libs/playlist';
import { getYoutubeThumbnailURL } from '@/libs/format';
import noImage from '../../../../../public/images/ambient-placeholder.svg';

type ThumbnailProps = {
  media: Media | null;
};

export function Thumbnail({ media }: ThumbnailProps) {
  return (
    <div className='duration-700 ease-in-out relative h-full'>
      <Image
        src={media?.videoid ? getYoutubeThumbnailURL(media.videoid) : noImage}
        className='block'
        alt={media?.title || 'No media available'}
        fill
      />
    </div>
  );
}
