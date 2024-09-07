import { Suspense } from 'react';
import Image from 'next/image';
import { getLocale, getTranslation } from '@/libs/locale';
import { getMediaData } from '@/libs/playlist';
import { getSearchParams } from '@/libs/params';
import NextButton from './next-button';
import PrevButton from './prev-button';
import CarouselItem from './carousel-item';
import noImage from '../../../public/images/ambient-placeholder.svg';

export default async function Carousel() {
  const locale = await getLocale();
  const t = await getTranslation(locale);
  const searchParams = await getSearchParams();
  const { currentMedia } = await getMediaData(
    searchParams.p,
    searchParams.c,
    searchParams.m,
    !!searchParams.f
  );

  return (
    <div id='carousel-container' className='relative w-full mt-4 flex justify-center'>
      <PrevButton t={t} />
      <div
        id='carousel-wrapper'
        className='relative h-56 max-w-sm w-96 overflow-hidden rounded-lg md:h-64'
      >
        <Suspense
          fallback={
            <div id='carousel-item-1' className='duration-700 ease-in-out'>
              <Image
                src={noImage}
                className='absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                alt='No media available'
              />
            </div>
          }
        >
          <CarouselItem media={currentMedia} />
        </Suspense>
      </div>
      <NextButton t={t} />
    </div>
  );
}
