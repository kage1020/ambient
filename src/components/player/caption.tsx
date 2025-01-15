'use client';

import { useState } from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/libs/tw';

type MediaCaptionProps = {
  caption: string;
};

export default function MediaCaption({ caption }: MediaCaptionProps) {
  const { windowSize } = useMediaQuery();
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  return (
    <figcaption className='text-gray-900 text-lg font-normal dark:text-white max-w-full flex justify-center items-center gap-2 mb-2 whitespace-nowrap overflow-hidden w-[inherit] desktop:max-w-[640px]'>
      {Array.from({
        length: marqueeWidth > windowSize.width || marqueeWidth > 640 ? 5 : 1,
      }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (i === 0 && el) setMarqueeWidth(el.clientWidth);
          }}
          className={cn(
            marqueeWidth > windowSize.width || marqueeWidth > 640
              ? 'animate-marquee flex-shrink-0'
              : ''
          )}
          style={
            {
              '--duration': Math.floor(marqueeWidth / 32) + 's',
            } as React.CSSProperties
          }
          dangerouslySetInnerHTML={{
            __html: caption,
          }}
          aria-hidden={i > 0}
        ></div>
      ))}
    </figcaption>
  );
}
