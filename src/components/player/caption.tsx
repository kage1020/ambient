'use client';

import { useRef } from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/libs/tw';

type MediaCaptionProps = {
  caption: string;
};

export default function MediaCaption({ caption }: MediaCaptionProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { windowSize } = useMediaQuery();

  return (
    <figcaption className='text-gray-900 text-lg font-normal dark:text-white max-w-full flex justify-center items-center gap-2 mb-2 whitespace-nowrap overflow-hidden w-[inherit] desktop:max-w-[640px]'>
      {Array.from({
        length:
          (marqueeRef.current?.clientWidth || 0) > windowSize.width ||
          (marqueeRef.current?.clientWidth || 0) > 640
            ? 5
            : 1,
      }).map((_, i) => (
        <div
          key={i}
          ref={i === 0 ? marqueeRef : null}
          className={cn(
            (marqueeRef.current?.clientWidth || 0) > windowSize.width ||
              (marqueeRef.current?.clientWidth || 0) > 640
              ? 'animate-marquee flex-shrink-0'
              : ''
          )}
          style={
            {
              '--duration': Math.floor((marqueeRef.current?.clientWidth || 0) / 32) + 's',
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
