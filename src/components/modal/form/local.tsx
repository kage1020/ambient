'use client';

import { Button, FileInput } from 'flowbite-react';
import { Label } from './label';
import useLocale from '@/hooks/use-locale';
import { useForm } from 'react-hook-form';
import { MediaManagementLocal, MediaManagementLocalSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySelect } from './category-select';
import { MediaTitleInput } from './media-title';
import { ArtistInput } from './artist';
import { DescriptionInput } from './description';
import { VolumeInput } from './volume';
import { SeekEndInput, SeekStartInput } from './seek';
import { FadeInInput, FadeOutInput } from './fade';

type LocalMediaManagementFormProps = {
  locale: string;
};

export default function LocalMediaManagementForm({ locale }: LocalMediaManagementFormProps) {
  const { t } = useLocale(locale);
  const { register, handleSubmit, watch } = useForm<MediaManagementLocal>({
    resolver: zodResolver(MediaManagementLocalSchema),
  });

  const onSubmit = (data: MediaManagementLocal) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Label htmlFor='local-media-file' errorText={t['Invalid file path']}>
          {t['Local Media File']}
        </Label>
        <FileInput id='local-media-file' accept='audio/*,video/*' />
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
          {
            t[
              'Only media files that are relatively accessible from the Ambient media directory are valid.'
            ]
          }
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
