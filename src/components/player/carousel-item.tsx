'use client';

import Image from 'next/image';
import { getYoutubeThumbnailURL } from '@/libs/format';
import { Media } from '@/types';
import noImage from '../../../public/images/ambient-placeholder.svg';

type CarouselItemProps = {
  media: Media | null;
};

export default function CarouselItem({ media }: CarouselItemProps) {
  return (
    <div id='carousel-item-1' className='duration-700 ease-in-out relative h-full'>
      <Image
        src={media?.videoid ? getYoutubeThumbnailURL(media.videoid) : noImage}
        className='block'
        alt={media?.title || 'No media available'}
        fill
      />
    </div>
  );
}
