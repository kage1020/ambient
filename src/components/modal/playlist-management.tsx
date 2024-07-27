'use client';

import useLocale from '@/hooks/use-locale';
import { cn } from '@/libs/tw';
import { useForm } from 'react-hook-form';
import { SymbolicLink, SymbolicLinkSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import { CheckIcon } from '../icons';

type PlaylistManagementFormProps = {
  locale: string;
};

export default function PlaylistManagementForm({ locale }: PlaylistManagementFormProps) {
  const { t } = useLocale(locale);
  const isLocal = process.env.NEXT_PUBLIC_ENV === undefined;
  const { register, handleSubmit } = useForm<SymbolicLink>({
    resolver: zodResolver(SymbolicLinkSchema),
  });

  const onSubmit = (data: SymbolicLink) => {
    console.log(data);
  };

  const addCategory = () => {};

  const downloadPlaylist = () => {};

  return (
    <form>
      <p className='hidden mb-2 text-gray-500 dark:text-gray-400'>
        {t['This section provides various tools to manage your playlists.']}
        <br />
      </p>
      <div className='mb-2 text-gray-500 dark:text-gray-400'>
        <div id='playlist-management-field-symbolic-link' className='mb-4'>
          <h3
            className={cn(
              'text-base font-semibold mb-2 -mx-5 px-5',
              isLocal ? 'lead-text' : 'lead-text-muted'
            )}
          >
            {t['Create Symbolic Link']}
          </h3>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            {
              t[
                'Create a symbolic link of the folder containing the media files on your host computer into media directory in the Ambient.'
              ]
            }
          </p>
          <label
            id='local-media-directory-label'
            htmlFor='local-media-directory'
            className={cn('block mb-2 text-sm font-medium', isLocal ? 'normal-text' : 'muted-text')}
          >
            <span className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'>
              {t['Local Media Folder Path']}
            </span>
            {isLocal && (
              <div
                id='tooltip-local-media-directory'
                role='tooltip'
                className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
              >
                {t['Required']}
                <div className='tooltip-arrow' data-popper-arrow></div>
              </div>
            )}
            <span className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
              {t['This path is required']}
            </span>
            <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'>
              <CheckIcon />
            </span>
          </label>
          <input
            id='local-media-directory'
            type='text'
            name='local_media_dir'
            className='block w-full text-sm border rounded-lg cursor-pointer focus:outline-none normal-input'
            placeholder='C:/Users/Username/Media/FavoriteFolder'
            required
            disabled={!isLocal}
          />
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
            {
              t[
                'Enter the full path to the media folder on the host computer that you want to link to.'
              ]
            }
          </p>
        </div>
        <div className='grid gap-4 mb-8 md:grid-cols-2'>
          <div>
            <label
              id='symlink-name-label'
              htmlFor='symlink-name'
              className={cn(
                'block mb-2 text-sm font-medium',
                isLocal ? 'normal-text' : 'muted-text'
              )}
            >
              <span
                className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                data-tooltip-target={isLocal ? 'tooltip-symlink-name' : ''}
              >
                {t['Symbolic Link Name']}
              </span>
              {isLocal && (
                <div
                  role='tooltip'
                  className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                >
                  {t['Required']}
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
              )}
              <span className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
                {t['This name is required']}
              </span>
              <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'>
                <CheckIcon />
              </span>
            </label>
            <input
              id='symlink-name'
              type='text'
              name='symlink_name'
              className='border text-sm rounded-lg block w-full p-2.5 normal-input'
              placeholder={t['Please fill any strings']}
              required
              disabled={!isLocal}
            />
          </div>
          <div className='flex justify-end items-end'>
            <Button>{t['Create Symbolic Link']}</Button>
          </div>
        </div>
        <div className='mb-8'>
          <h3 className='text-base font-semibold mb-2 -mx-5 px-5 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950'>
            {t['Add New Category']}
          </h3>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            {t['Adds a new category to the currently active playlist.']}
          </p>
          <div className='grid gap-4 mb-4 md:grid-cols-2'>
            <div>
              <label htmlFor='category-name' className='block mb-2 text-sm font-medium normal-text'>
                <span className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'>
                  {t['Category Name']}
                </span>
                <div
                  role='tooltip'
                  className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                >
                  {t['Required']}
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
                <span className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
                  {t['This name is required']}
                </span>
                <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'>
                  <CheckIcon />
                </span>
              </label>
              <input
                id='category-name'
                type='text'
                name='category_name'
                className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                placeholder={t['Please fill any strings']}
                required
              />
            </div>
            <div className='flex justify-end items-end'>
              <Button>{t['Add Category']}</Button>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <h3 className='text-base font-semibold mb-2 -mx-5 px-5 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950'>
            {t['Download Playlist']}
          </h3>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            {t['Download the currently active playlist in JSON format.']}
          </p>
          <div className='flex mb-4'>
            <div className='flex items-center h-5'>
              <input
                id='seek-format'
                type='checkbox'
                name='seek_format'
                defaultValue='1'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </div>
            <div className='ms-2 text-sm'>
              <label htmlFor='seek-format' className='font-medium text-gray-900 dark:text-gray-300'>
                {t['Output seek time in media data in HH:MM:SS format.']}
              </label>
              <p className='text-xs font-normal text-gray-500 dark:text-gray-400'>
                {
                  t[
                    'If this option is not enabled, it will be output as an integer number of seconds.'
                  ]
                }
              </p>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <Button>{t['Download Playlist']}</Button>
          </div>
        </div>
      </div>
      <div
        className='hidden p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
        role='alert'
      >
        <span className='font-medium'>Sorry, this is currently under development.</span>
      </div>
    </form>
  );
}
