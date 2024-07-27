'use client';

import { useForm } from 'react-hook-form';
import { MediaManagementYouTube, MediaManagementYouTubeSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useMessage from '@/hooks/use-message';
import { Label } from './label';
import useLocale from '@/hooks/use-locale';
import { CategorySelect } from './category-select';
import { MediaTitleInput } from './media-title';
import { ArtistInput } from './artist';
import { DescriptionInput } from './description';
import { VolumeInput } from './volume';
import { SeekEndInput, SeekStartInput } from './seek';
import { FadeInInput, FadeOutInput } from './fade';
import { Button } from 'flowbite-react';

type YoutubeMediaManagementFormProps = {
  locale: string;
};

export default function YoutubeMediaManagementForm({ locale }: YoutubeMediaManagementFormProps) {
  const { register, handleSubmit, watch } = useForm<MediaManagementYouTube>({
    resolver: zodResolver(MediaManagementYouTubeSchema),
  });
  const { showMessage } = useMessage();
  const { t } = useLocale(locale);

  const onSubmit = (data: MediaManagementYouTube) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Label htmlFor='youtube-url' errorText={t['Invalid URL']}>
          {t['YouTube URL']}
        </Label>
        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm bg-gray-200 dark:bg-gray-600 border border-r-0 rounded-l-md normal-prefix'>
            https://
          </span>
          <input
            id='youtube-url'
            type='text'
            className='rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5 normal-input'
            placeholder='www.youtube.com/watch?v=......'
          />
        </div>
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
          {t['Copy and paste full text of the YouTube video URL includes schema.']}
        </p>
      </div>
      <div className='mb-4'>
        <CategorySelect locale={locale} {...register('category')} />
        <MediaTitleInput locale={locale} {...register('title')} />
        <ArtistInput locale={locale} {...register('artist')} />
        <DescriptionInput locale={locale} {...register('description')} />
        <VolumeInput locale={locale} value={watch('volume')} {...register('volume')} />
        <div className='grid gap-4 mb-4 md:grid-cols-2'>
          <SeekStartInput locale={locale} {...register('start')} />
          <SeekEndInput locale={locale} {...register('end')} />
        </div>
        <div className='grid gap-4 mb-4 md:grid-cols-2'>
          <FadeInInput locale={locale} {...register('fadeIn')} />
          <FadeOutInput locale={locale} {...register('fadeOut')} />
        </div>
      </div>
      <div className='mt-2 mb-0 pt-4 text-gray-500 dark:text-gray-400'>
        <Button className='ml-auto mr-0' type='submit' color='blue'>
          {t['Add New Media']}
        </Button>
      </div>
    </form>
  );
}
