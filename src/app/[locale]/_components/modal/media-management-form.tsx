'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/hooks/use-translation';
import { isLocal } from '@/libs/const';
import { cn } from '@/libs/tw';
import { Label } from './label';

const schema = z
  .object({
    type: z.enum(['youtube', 'local']),
    youtubeUrl: z.string().optional(),
    localPath: z.string().optional(),
    category: z.string(),
    mediaTitle: z.string(),
    artist: z.string().optional(),
    description: z.string().optional(),
    volume: z.number(),
    seekStart: z
      .string()
      .regex(/^([0-9]+|([0-9]+:)?[0-5]?[0-9]:[0-5]?[0-9])$/)
      .optional(),
    seekEnd: z
      .string()
      .regex(/^([0-9]+|([0-9]+:)?[0-5]?[0-9]:[0-5]?[0-9])$/)
      .optional(),
    fadeIn: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
    fadeOut: z
      .string()
      .regex(/^[0-9]+|$/)
      .optional(),
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('youtube'),
        youtubeUrl: z
          .string()
          .regex(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&[\w-]+=[\w-]+)*$/),
      }),
      z.object({
        type: z.literal('local'),
        localPath: z.string(),
      }),
    ])
  );

type MediaManagementValues = z.infer<typeof schema>;

type MediaManagementFormProps = {
  categories: string[];
};

export function MediaManagementForm({ categories }: MediaManagementFormProps) {
  const t = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm<MediaManagementValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'youtube',
      youtubeUrl: undefined,
      localPath: undefined,
      category: undefined,
      mediaTitle: undefined,
      artist: undefined,
      description: undefined,
      volume: 100,
      seekStart: undefined,
      seekEnd: undefined,
      fadeIn: undefined,
      fadeOut: undefined,
    },
  });
  const mediaType = useWatch({ control, name: 'type' });
  const youtubeUrl = useWatch({ control, name: 'youtubeUrl' });
  const localPath = useWatch({ control, name: 'localPath' });
  const category = useWatch({ control, name: 'category' });
  const mediaTitle = useWatch({ control, name: 'mediaTitle' });
  const artist = useWatch({ control, name: 'artist' });
  const description = useWatch({ control, name: 'description' });
  const volume = useWatch({ control, name: 'volume' });
  const seekStart = useWatch({ control, name: 'seekStart' });
  const seekEnd = useWatch({ control, name: 'seekEnd' });
  const fadeIn = useWatch({ control, name: 'fadeIn' });
  const fadeOut = useWatch({ control, name: 'fadeOut' });

  const onSubmit = (data: MediaManagementValues) => {
    console.log(data);
    alert('Not implemented yet!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className='mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
        <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
          <div className='flex items-center pl-3'>
            <input
              id='media-type-youtube'
              type='radio'
              value='youtube'
              checked={mediaType === 'youtube'}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              {...register('type')}
            />
            <label
              htmlFor='media-type-youtube'
              className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              {t['YouTube Media']}
            </label>
          </div>
        </li>
        <li className='w-full dark:border-gray-600'>
          <div className='flex items-center pl-3'>
            <input
              id='media-type-local'
              type='radio'
              value='local'
              checked={mediaType === 'local'}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              disabled={!isLocal}
              {...register('type')}
            />
            <label
              htmlFor='media-type-local'
              className={cn(
                'w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300',
                !isLocal && 'opacity-50'
              )}
            >
              {t['Local Media']}
            </label>
          </div>
        </li>
      </ul>
      {mediaType === 'youtube' && (
        <div id='media-management-field-media-url' className='mb-4'>
          <Label
            id='youtube-url-label'
            htmlFor='youtube-url'
            className={cn(
              'block mb-2 px-1 text-sm font-medium',
              !errors.youtubeUrl && 'text-gray-900 dark:text-white',
              errors.youtubeUrl && 'text-red-600 dark:text-red-400',
              !!youtubeUrl && !errors.youtubeUrl && 'text-green-500 dark:text-green-400'
            )}
            touched={!!youtubeUrl}
            required
            error={Boolean(errors.youtubeUrl?.message) ? t['Invalid URL'] : ''}
          >
            {t['YouTube URL']}
          </Label>
          <div className='flex'>
            <span
              id='youtube-url-prefix'
              className={cn(
                'inline-flex items-center px-3 text-sm bg-gray-200 dark:bg-gray-600 border border-r-0 rounded-l-md',
                !errors.youtubeUrl &&
                  'text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600',
                errors.youtubeUrl &&
                  'text-red-900 dark:text-red-500 border-red-500 dark:border-red-500',
                !!youtubeUrl &&
                  !errors.youtubeUrl &&
                  'text-green-900 dark:text-green-500 border-green-500 dark:border-green-500'
              )}
            >
              https://
            </span>
            <input
              id='youtube-url'
              type='text'
              className={cn(
                'rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5',
                !errors.youtubeUrl &&
                  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
                errors.youtubeUrl &&
                  'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
                !!youtubeUrl &&
                  !errors.youtubeUrl &&
                  'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
              )}
              placeholder='www.youtube.com/watch?v=......'
              {...register('youtubeUrl', { onBlur: () => trigger('youtubeUrl') })}
            />
          </div>
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
            {t['Copy and paste full text of the YouTube video URL includes schema.']}
          </p>
        </div>
      )}
      {mediaType === 'local' && (
        <div id='media-management-field-media-files' className='mb-4'>
          <Label
            id='local-media-file-label'
            htmlFor='local-media-file'
            className={cn(
              'block mb-2 text-sm font-medium',
              !errors.localPath && 'text-gray-900 dark:text-white',
              errors.localPath && 'text-red-600 dark:text-red-400',
              !!localPath && !errors.localPath && 'text-green-500 dark:text-green-400'
            )}
            touched={!!localPath}
            required
            error={Boolean(errors.localPath?.message) ? t['Invalid file path'] : ''}
          >
            {t['Local Media File']}
          </Label>
          <input
            id='local-media-file'
            type='file'
            accept='audio/*,video/*'
            className={cn(
              'block w-full text-sm border rounded-lg cursor-pointer focus:outline-none',
              !errors.localPath &&
                'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
              errors.localPath &&
                'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
              !errors.localPath &&
                !!localPath &&
                'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
            )}
            {...register('localPath', { onBlur: () => trigger('localPath') })}
          />
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
            {
              t[
                'Only media files that are relatively accessible from the Ambient media directory are valid.'
              ]
            }
          </p>
        </div>
      )}
      <div id='media-management-field-meta' className='mb-4'>
        <div className='mb-4'>
          <Label
            id='media-category-label'
            htmlFor='media-category'
            className={cn(
              'block mb-2 text-sm font-medium',
              !errors.category && 'text-gray-900 dark:text-white',
              errors.category && 'text-red-600 dark:text-red-400',
              !!category && !errors.category && 'text-green-500 dark:text-green-400'
            )}
            touched={!!category && category !== t['Choose a playlist category']}
            required
            error={Boolean(errors.category?.message) ? t['Choose category is required'] : ''}
          >
            {t['Category']}
          </Label>
          <select
            id='media-category'
            className={cn(
              'border text-sm rounded-lg block w-full p-2.5',
              !errors.category &&
                'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
              errors.category &&
                'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
              !errors.category &&
                !!category &&
                category !== t['Choose a playlist category'] &&
                'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
            )}
            required
            {...register('category', { onBlur: () => trigger('category') })}
          >
            <option disabled value={t['Choose a playlist category']}>
              {t['Choose a playlist category']}
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <Label
            id='media-title-label'
            htmlFor='media-title'
            className={cn(
              'block mb-2 text-sm font-medium',
              !errors.mediaTitle && 'text-gray-900 dark:text-white',
              errors.mediaTitle && 'text-red-600 dark:text-red-400',
              !!mediaTitle && !errors.mediaTitle && 'text-green-500 dark:text-green-400'
            )}
            touched={!!mediaTitle && mediaTitle !== t['Choose a playlist category']}
            required
            error={Boolean(errors.mediaTitle?.message) ? t['Media title is required'] : ''}
          >
            {t['Title']}
          </Label>
          <input
            id='media-title'
            type='text'
            className={cn(
              'border text-sm rounded-lg block w-full p-2.5',
              !errors.mediaTitle &&
                'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
              errors.mediaTitle &&
                'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
              !errors.mediaTitle &&
                !!mediaTitle &&
                'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
            )}
            placeholder={t['Displayed media title']}
            required
            {...register('mediaTitle', { onBlur: () => trigger('mediaTitle') })}
          />
        </div>
        <div className='mb-4'>
          <Label
            id='media-artist-label'
            htmlFor='media-artist'
            className={cn(
              'block mb-2 text-sm font-medium',
              !errors.artist && 'text-gray-900 dark:text-white',
              errors.artist && 'text-red-600 dark:text-red-400',
              !!artist && !errors.artist && 'text-green-500 dark:text-green-400'
            )}
          >
            {t['Artist']}
          </Label>
          <input
            id='media-artist'
            type='text'
            className={cn(
              'border text-sm rounded-lg block w-full p-2.5',
              !errors.artist &&
                'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
              errors.artist &&
                'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
              !errors.artist &&
                !!artist &&
                'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
            )}
            placeholder={t['Displayed artist name']}
            {...register('artist')}
          />
        </div>
        <div className='mb-4'>
          <Label
            id='media-desc-label'
            htmlFor='media-desc'
            className={cn(
              'block mb-2 text-sm font-medium',
              !errors.description && 'text-gray-900 dark:text-white',
              errors.description && 'text-red-600 dark:text-red-400',
              !!description && !errors.description && 'text-green-500 dark:text-green-400'
            )}
          >
            {t['Description']}
          </Label>
          <input
            id='media-desc'
            type='text'
            className={cn(
              'border text-sm rounded-lg block w-full p-2.5',
              !errors.description &&
                'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
              errors.description &&
                'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
              !errors.description &&
                !!description &&
                'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
            )}
            placeholder={'Subtitle or description of media'}
            {...register('description')}
          />
        </div>
        <div className='mb-4'>
          <Label
            id='media-volume-label'
            htmlFor='media-volume'
            className={cn(
              'flex justify-between mb-2 text-sm font-medium',
              !errors.volume && 'text-gray-900 dark:text-white',
              errors.volume && 'text-red-600 dark:text-red-400',
              !!volume && !errors.volume && 'text-green-500 dark:text-green-400'
            )}
          >
            {t['Default playback volume']}
            <span
              id='default-media-volume'
              className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'
            >
              {volume}
            </span>
          </Label>
          <input
            id='media-volume'
            type='range'
            min='0'
            max='100'
            step='1'
            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600'
            {...register('volume')}
          />
        </div>
        <div className='grid gap-4 mb-4 md:grid-cols-2'>
          <div>
            <Label
              id='seek-start-label'
              htmlFor='seek-start'
              className={cn(
                'block mb-2 text-sm font-medium',
                !errors.seekStart && 'text-gray-900 dark:text-white',
                errors.seekStart && 'text-red-600 dark:text-red-400',
                !!seekStart && !errors.seekStart && 'text-green-500 dark:text-green-400'
              )}
              error={Boolean(errors.seekStart?.message) ? t['Invalid format'] : ''}
            >
              {t['Seek start']}
            </Label>
            <input
              id='seek-start'
              type='text'
              className={cn(
                'border text-sm rounded-lg block w-full p-2.5',
                !errors.seekStart &&
                  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
                errors.seekStart &&
                  'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
                !errors.seekStart &&
                  !!seekStart &&
                  'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
              )}
              placeholder={t['Integer of seconds or H:MM:SS format']}
              {...register('seekStart', { onBlur: () => trigger('seekStart') })}
            />
          </div>
          <div>
            <Label
              id='seek-end-label'
              htmlFor='seek-end'
              className={cn(
                'block mb-2 text-sm font-medium',
                !errors.seekEnd && 'text-gray-900 dark:text-white',
                errors.seekEnd && 'text-red-600 dark:text-red-400',
                !!seekEnd && !errors.seekEnd && 'text-green-500 dark:text-green-400'
              )}
              error={Boolean(errors.seekEnd?.message) ? t['Invalid format'] : ''}
            >
              {t['Seek end']}
            </Label>
            <input
              id='seek-end'
              type='text'
              className={cn(
                'border text-sm rounded-lg block w-full p-2.5 text-gray-900 dark:text-white',
                !errors.seekEnd &&
                  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
                errors.seekEnd &&
                  'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
                !errors.seekEnd &&
                  !!seekEnd &&
                  'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
              )}
              placeholder={t['Integer of seconds or H:MM:SS format']}
              {...register('seekEnd')}
            />
          </div>
        </div>
        <div className='grid gap-4 mb-4 md:grid-cols-2'>
          <div>
            <Label
              id='fadein-seconds-label'
              htmlFor='fadein-seconds'
              className={cn(
                'block mb-2 text-sm font-medium',
                !errors.fadeIn && 'text-gray-900 dark:text-white',
                errors.fadeIn && 'text-red-600 dark:text-red-400',
                !!fadeIn && !errors.fadeIn && 'text-green-500 dark:text-green-400'
              )}
              error={Boolean(errors.fadeIn?.message) ? t['Invalid format'] : ''}
            >
              {t['Fade-in seconds']}
            </Label>
            <input
              id='fadein-seconds'
              type='text'
              className={cn(
                'border text-sm rounded-lg block w-full p-2.5 text-gray-900 dark:text-white',
                !errors.fadeIn &&
                  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
                errors.fadeIn &&
                  'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
                !errors.fadeIn &&
                  !!fadeIn &&
                  'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
              )}
              placeholder={t['Integer of seconds']}
              pattern='^[0-9]+$'
              disabled
              {...register('fadeIn', { onBlur: () => trigger('fadeIn') })}
            />
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
              {t['Set seconds fade-in from start of playback.']}
            </p>
          </div>
          <div>
            <Label
              id='fadeout-seconds-label'
              htmlFor='fadeout-seconds'
              className={cn(
                'block mb-2 text-sm font-medium',
                !errors.fadeOut && 'text-gray-900 dark:text-white',
                errors.fadeOut && 'text-red-600 dark:text-red-400',
                !!fadeOut && !errors.fadeOut && 'text-green-500 dark:text-green-400'
              )}
              error={Boolean(errors.fadeOut?.message) ? t['Invalid format'] : ''}
            >
              {t['Fade-out seconds']}
            </Label>
            <input
              id='fadeout-seconds'
              type='text'
              className={cn(
                'border text-sm rounded-lg block w-full p-2.5 text-gray-900 dark:text-white',
                !errors.fadeOut &&
                  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500',
                errors.fadeOut &&
                  'bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500',
                !errors.fadeOut &&
                  !!fadeOut &&
                  'bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500'
              )}
              placeholder={t['Integer of seconds']}
              pattern='^[0-9]+$'
              disabled
              {...register('fadeOut', { onBlur: () => trigger('fadeOut') })}
            />
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
              {t['Set seconds fade-out to end of playback.']}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-2 mb-0 pt-4 text-gray-500 dark:text-gray-400 text-right'>
        <button
          id='btn-add-media'
          className='text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:pointer-events-none disabled:bg-gray-300 dark:disabled:bg-gray-500'
          disabled={Object.keys(errors).length > 0}
        >
          {t['Add New Media']}
        </button>
      </div>
    </form>
  );
}
