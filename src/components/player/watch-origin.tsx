import Link from 'next/link';
import { ExternalLink } from '@/components/icons';
import { cn } from '@/libs/tw';
import { getMediaData } from '@/libs/playlist';
import { getSearchParams } from '@/libs/params';
import { getLocale, getTranslation } from '@/libs/locale';

type WatchOriginProps = {
  url: string;
};

export default async function WatchOrigin({ url }: WatchOriginProps) {
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
    <Link
      href={url}
      target='_blank'
      className={cn(
        'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-opacity duration-500 ease-in-out',
        currentMedia?.videoid ? 'block' : 'hidden'
      )}
    >
      {t['Watch on YouTube']}
      <ExternalLink className='inline-block -mt-0.5 ml-1 w-3 h-3 text-gray-800 dark:text-white' />
    </Link>
  );
}
