'use client';

import { useContext, useState } from 'react';
import { cn } from '@/libs/tw';
import useLocale from '@/hooks/use-locale';
import { ModalContext } from '@/providers/modal';
import packageJson from '../../package.json';

// TODO: Dynamically import the version number
const version = packageJson.version;

type ModalProps = {
  locale: string;
};

export default function Modal({ locale }: ModalProps) {
  const { t } = useLocale(locale);
  const isLocal = process.env.NODE_ENV !== 'production';
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const [collapseState, setCollapseState] = useState({
    media: false,
    playlist: false,
    issue: false,
    about: false,
  });

  return (
    <div
      id='modal-options'
      data-modal-backdrop='static'
      tabIndex={-1}
      aria-hidden='true'
      aria-modal={isModalOpen}
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all items-center justify-center',
        isModalOpen ? 'flex' : 'hidden'
      )}
    >
      <div className='relative w-full max-w-2xl max-h-full shadow'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{t['Options']}</h3>
            <button
              id='btn-close-options'
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='modal-options'
              onClick={() => setModalOpen(false)}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>{t['Close options']}</span>
            </button>
          </div>
          <div className='p-0 space-y-0'>
            <div id='collapse-menu' data-accordion='collapse'>
              <h2 id='collapse-item-heading-media'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  data-accordion-target='#collapse-item-body-media'
                  aria-expanded={collapseState.media}
                  aria-controls='collapse-item-body-media'
                  onClick={() =>
                    setCollapseState((prev) => ({
                      ...prev,
                      media: !prev.media,
                    }))
                  }
                >
                  <span>{t['Media Management']}</span>
                  <svg
                    data-accordion-icon
                    className='w-3 h-3 rotate-180 shrink-0'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='collapse-item-body-media'
                className='hidden'
                aria-labelledby='collapse-item-heading-media'
              >
                <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-y-auto'>
                  <p className='mb-4 text-gray-500 dark:text-gray-400'>
                    {t['Add media to the currently active playlist.']}
                    {
                      t[
                        'Media you add is lost when you switch playlists or end your application session.'
                      ]
                    }
                    {
                      t[
                        'If you want the additional media to be permanent, you will need to download the playlist after adding the media.'
                      ]
                    }
                  </p>
                  <div className='mb-2 text-gray-500 dark:text-gray-400'>
                    <form name='mediaManagement'>
                      <ul
                        id='media-management-field-media-type'
                        className='mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                      >
                        <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
                          <div className='flex items-center pl-3'>
                            <input
                              id='media-type-youtube'
                              type='radio'
                              defaultValue='youtube'
                              name='media_type'
                              defaultChecked
                              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
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
                              defaultValue='local'
                              name='media_type'
                              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                              disabled={!isLocal}
                            />
                            <label
                              htmlFor='media-type-local'
                              className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300<?php if ( !is_local() ): ?> opacity-50<?php endif; ?>'
                            >
                              {t['Local Media']}
                            </label>
                          </div>
                        </li>
                      </ul>
                      <div id='media-management-field-media-url' className='mb-4'>
                        <label
                          id='youtube-url-label'
                          htmlFor='youtube-url'
                          className='block mb-2 px-1 text-sm font-medium normal-text'
                        >
                          <span
                            className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                            data-tooltip-target='tooltip-youtube-url'
                          >
                            {t['YouTube URL']}
                          </span>
                          <div
                            id='tooltip-youtube-url'
                            role='tooltip'
                            className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                          >
                            {t['Required']}
                            <div className='tooltip-arrow' data-popper-arrow></div>
                          </div>
                          <span
                            id='note-error-youtube-url'
                            className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                          >
                            {t['Invalid URL']}
                          </span>
                          <span
                            id='note-success-youtube-url'
                            className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                          >
                            <svg
                              className='w-3 h-3 text-green-800 dark:text-green-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 16 12'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M1 5.917 5.724 10.5 15 1.5'
                              />
                            </svg>
                          </span>
                        </label>
                        <div className='flex'>
                          <span
                            id='youtube-url-prefix'
                            className='inline-flex items-center px-3 text-sm bg-gray-200 dark:bg-gray-600 border border-r-0 rounded-l-md normal-prefix'
                          >
                            https://
                          </span>
                          <input
                            id='youtube-url'
                            type='text'
                            name='youtube_url'
                            // _className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            className='rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5 normal-input'
                            placeholder='www.youtube.com/watch?v=......'
                            data-validate='false'
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                          {t['Copy and paste full text of the YouTube video URL includes schema.']}
                        </p>
                        <input
                          id='youtube-videoid'
                          type='hidden'
                          name='youtube_videoid'
                          defaultValue=''
                        />
                      </div>
                      <div id='media-management-field-media-files' className='hidden mb-4'>
                        <label
                          id='local-media-file-label'
                          htmlFor='local-media-file'
                          className='block mb-2 text-sm font-medium normal-text'
                        >
                          <span className='relative inline-flex flex-nowrap items-center gap-0.5'>
                            {t['Local Media File']}
                          </span>
                          <span
                            id='note-error-local-media-file'
                            className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                            data-default-message={t['Invalid file path']}
                          >
                            {t['Invalid file path']}
                          </span>
                          <span
                            id='note-success-local-media-file'
                            className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                          >
                            <svg
                              className='w-3 h-3 text-green-800 dark:text-green-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 16 12'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M1 5.917 5.724 10.5 15 1.5'
                              />
                            </svg>
                          </span>
                        </label>
                        <input
                          id='local-media-file'
                          type='file'
                          name='local_media_file'
                          accept='audio/*,video/*'
                          // directory="<?= MEDIA_DIR ?>"
                          className='block w-full text-sm border rounded-lg cursor-pointer focus:outline-none normal-input'
                        />
                        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                          {
                            t[
                              'Only media files that are relatively accessible from the Ambient media directory are valid.'
                            ]
                          }
                        </p>
                        <input
                          id='local-media-filepath'
                          type='hidden'
                          name='media_filepath'
                          defaultValue=''
                        />
                      </div>
                      <div id='media-management-field-meta' className='mb-4'>
                        <div className='mb-4'>
                          <label
                            id='media-category-label'
                            htmlFor='media-category'
                            className='block mb-2 text-sm font-medium normal-text'
                          >
                            <span
                              className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                              data-tooltip-target='tooltip-media-category'
                            >
                              {t['Category']}
                            </span>
                            <div
                              id='tooltip-media-category'
                              role='tooltip'
                              className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                            >
                              {t['Required']}
                              <div className='tooltip-arrow' data-popper-arrow></div>
                            </div>
                            <span
                              id='note-error-media-category'
                              className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                            >
                              {t['Choose category is required']}
                            </span>
                            <span
                              id='note-success-media-category'
                              className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                            >
                              <svg
                                className='w-3 h-3 text-green-800 dark:text-green-300'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 16 12'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M1 5.917 5.724 10.5 15 1.5'
                                />
                              </svg>
                            </span>
                          </label>
                          <select
                            id='media-category'
                            name='category'
                            className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                            data-placeholder={t['Choose a playlist category']}
                            required
                            data-validate='false'
                            defaultValue={t['Choose a playlist category']}
                          >
                            <option value=''>{t['Choose a playlist category']}</option>
                          </select>
                        </div>
                        <div className='mb-4'>
                          <label
                            id='media-title-label'
                            htmlFor='media-title'
                            className='block mb-2 text-sm font-medium normal-text'
                          >
                            <span
                              className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                              data-tooltip-target='tooltip-media-title'
                            >
                              {t['Title']}
                            </span>
                            <div
                              id='tooltip-media-title'
                              role='tooltip'
                              className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                            >
                              {t['Required']}
                              <div className='tooltip-arrow' data-popper-arrow></div>
                            </div>
                            <span
                              id='note-error-media-title'
                              className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                            >
                              {t['Media title is required']}
                            </span>
                            <span
                              id='note-success-media-title'
                              className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                            >
                              <svg
                                className='w-3 h-3 text-green-800 dark:text-green-300'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 16 12'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M1 5.917 5.724 10.5 15 1.5'
                                />
                              </svg>
                            </span>
                          </label>
                          <input
                            id='media-title'
                            type='text'
                            name='title'
                            className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                            placeholder={t['Displayed media title']}
                            required
                            data-validate='false'
                          />
                        </div>
                        <div className='mb-4'>
                          <label
                            id='media-artist-label'
                            htmlFor='media-artist'
                            className='block mb-2 text-sm font-medium normal-text'
                          >
                            {t['Artist']}
                          </label>
                          <input
                            id='media-artist'
                            type='text'
                            name='artist'
                            className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                            placeholder={t['Displayed artist name']}
                          />
                        </div>
                        <div className='mb-4'>
                          <label
                            id='media-desc-label'
                            htmlFor='media-desc'
                            className='block mb-2 text-sm font-medium normal-text'
                          >
                            {t['Description']}
                          </label>
                          <input
                            id='media-desc'
                            type='text'
                            name='desc'
                            className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                            placeholder={t['Subtitle or description of media']}
                          />
                        </div>
                        <div className='mb-4'>
                          <label
                            id='media-volume-label'
                            htmlFor='media-volume'
                            className='flex justify-between mb-2 text-sm font-medium normal-text'
                          >
                            {t['Default playback volume']}
                            <span
                              id='default-media-volume'
                              className='ml-2 px-1 text-yellow-500 dark:text-yellow-400'
                            >
                              100
                            </span>
                          </label>
                          <input
                            id='media-volume'
                            type='range'
                            name='volume'
                            defaultValue='100'
                            min='0'
                            max='100'
                            step='1'
                            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600'
                          />
                        </div>
                        <div className='grid gap-4 mb-4 md:grid-cols-2'>
                          <div>
                            <label
                              id='seek-start-label'
                              htmlFor='seek-start'
                              className='block mb-2 text-sm font-medium normal-text'
                            >
                              {t['Seek start']}
                              <span
                                id='note-error-seek-start'
                                className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                              >
                                {t['Invalid format']}
                              </span>
                              <span
                                id='note-success-seek-start'
                                className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                              >
                                <svg
                                  className='w-3 h-3 text-green-800 dark:text-green-300'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 16 12'
                                >
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 5.917 5.724 10.5 15 1.5'
                                  />
                                </svg>
                              </span>
                            </label>
                            <input
                              id='seek-start'
                              type='text'
                              name='start'
                              className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                              placeholder={t['Integer of seconds or H:MM:SS format']}
                            />
                          </div>
                          <div>
                            <label
                              id='seek-end-label'
                              htmlFor='seek-end'
                              className='block mb-2 text-sm font-medium normal-text'
                            >
                              {t['Seek end']}
                              <span
                                id='note-error-seek-end'
                                className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                              >
                                {t['Invalid format']}
                              </span>
                              <span
                                id='note-success-seek-end'
                                className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                              >
                                <svg
                                  className='w-3 h-3 text-green-800 dark:text-green-300'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 16 12'
                                >
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 5.917 5.724 10.5 15 1.5'
                                  />
                                </svg>
                              </span>
                            </label>
                            <input
                              id='seek-end'
                              type='text'
                              name='end'
                              className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                              placeholder={t['Integer of seconds or H:MM:SS format']}
                            />
                          </div>
                        </div>
                        <div className='grid gap-4 mb-4 md:grid-cols-2'>
                          <div>
                            <label
                              id='fadein-seconds-label'
                              htmlFor='fadein-seconds'
                              className='block mb-2 text-sm font-medium normal-text opacity-50'
                            >
                              {t['Fade-in seconds']}
                              <span
                                id='note-error-fadein-seconds'
                                className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                              >
                                {t['Invalid format']}
                              </span>
                              <span
                                id='note-success-fadein-seconds'
                                className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                              >
                                <svg
                                  className='w-3 h-3 text-green-800 dark:text-green-300'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 16 12'
                                >
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 5.917 5.724 10.5 15 1.5'
                                  />
                                </svg>
                              </span>
                            </label>
                            <input
                              id='fadein-seconds'
                              type='text'
                              name='fadein'
                              className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                              placeholder={t['Integer of seconds']}
                              pattern='^[0-9]+$'
                              disabled
                            />
                            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
                              {t['Set seconds fade-in from start of playback.']}
                            </p>
                          </div>
                          <div>
                            <label
                              id='fadeout-seconds-label'
                              htmlFor='fadeout-seconds'
                              className='block mb-2 text-sm font-medium normal-text opacity-50'
                            >
                              {t['Fade-out seconds']}
                              <span
                                id='note-error-fadeout-seconds'
                                className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                              >
                                {t['Invalid format']}
                              </span>
                              <span
                                id='note-success-fadeout-seconds'
                                className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                              >
                                <svg
                                  className='w-3 h-3 text-green-800 dark:text-green-300'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 16 12'
                                >
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 5.917 5.724 10.5 15 1.5'
                                  />
                                </svg>
                              </span>
                            </label>
                            <input
                              id='fadeout-seconds'
                              type='text'
                              name='fadeout'
                              className='border text-sm rounded-lg block w-full p-2.5 normal-input'
                              placeholder={t['Integer of seconds']}
                              pattern='^[0-9]+$'
                              disabled
                            />
                            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300 opacity-50'>
                              {t['Set seconds fade-out to end of playback.']}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='mt-2 mb-0 pt-4 text-gray-500 dark:text-gray-400 _border-dotted _border-t _border-gray-200 _dark:border-gray-300 text-right'>
                        <button
                          id='btn-add-media'
                          type='button'
                          name='add_media'
                          className='text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                          data-message-success={
                            t['Media has been added to your specified playlist.']
                          }
                          data-message-failure={t['Failed to add media to the specified playlist.']}
                          disabled
                        >
                          {t['Add New Media']}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <h2 id='collapse-item-heading-playlist'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  data-accordion-target='#collapse-item-body-playlist'
                  aria-expanded={collapseState.playlist}
                  aria-controls='collapse-item-body-playlist'
                  onClick={() =>
                    setCollapseState((prev) => ({
                      ...prev,
                      playlist: !prev.playlist,
                    }))
                  }
                >
                  <span>{t['Playlist Management']}</span>
                  <svg
                    data-accordion-icon
                    className='w-3 h-3 rotate-180 shrink-0'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='collapse-item-body-playlist'
                className='hidden'
                aria-labelledby='collapse-item-heading-playlist'
              >
                <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-y-auto'>
                  <form name='playlistManagement'>
                    <p className='hidden mb-2 text-gray-500 dark:text-gray-400'>
                      {t['This section provides various tools to manage your playlists.']}
                      <br />
                    </p>
                    <div className='mb-2 text-gray-500 dark:text-gray-400'>
                      <div id='playlist-management-field-symbolic-link' className='mb-4'>
                        <h3 className='text-base font-semibold mb-2 -mx-5 px-5 <?php if ( is_local() ): ?>lead-text<?php else: ?>lead-text-muted<?php endif; ?>'>
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
                          className='block mb-2 text-sm font-medium <?php if ( is_local() ): ?>normal-text<?php else: ?>muted-text<?php endif; ?>'
                        >
                          <span
                            className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                            data-tooltip-target={isLocal ? 'tooltip-local-media-directory' : ''}
                          >
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
                          <span
                            id='note-error-local-media-directory'
                            className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                          >
                            {t['This path is required']}
                          </span>
                          <span
                            id='note-success-local-media-directory'
                            className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                          >
                            <svg
                              className='w-3 h-3 text-green-800 dark:text-green-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 16 12'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M1 5.917 5.724 10.5 15 1.5'
                              />
                            </svg>
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
                            className='block mb-2 text-sm font-medium <?php if ( is_local() ): ?>normal-text<?php else: ?>muted-text<?php endif; ?>'
                          >
                            <span
                              className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                              data-tooltip-target={isLocal ? 'tooltip-symlink-name' : ''}
                            >
                              {t['Symbolic Link Name']}
                            </span>
                            {isLocal && (
                              <div
                                id='tooltip-symlink-name'
                                role='tooltip'
                                className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                              >
                                {t['Required']}
                                <div className='tooltip-arrow' data-popper-arrow></div>
                              </div>
                            )}
                            <span
                              id='note-error-symlink-name'
                              className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                            >
                              {t['This name is required']}
                            </span>
                            <span
                              id='note-success-symlink-name'
                              className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                            >
                              <svg
                                className='w-3 h-3 text-green-800 dark:text-green-300'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 16 12'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M1 5.917 5.724 10.5 15 1.5'
                                />
                              </svg>
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
                          <button
                            id='btn-create-symlink'
                            type='button'
                            name='create_symlink'
                            className='text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            data-message-success={t['Symbolic link created successfully.']}
                            data-message-failure={t['Failed to create symbolic link.']}
                            disabled
                          >
                            {t['Create Symbolic Link']}
                          </button>
                        </div>
                      </div>
                      <div id='playlist-management-field-category' className='mb-8'>
                        <h3 className='text-base font-semibold mb-2 -mx-5 px-5 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950'>
                          {t['Add New Category']}
                        </h3>
                        <p className='mb-2 text-gray-500 dark:text-gray-400'>
                          {t['Adds a new category to the currently active playlist.']}
                        </p>
                        <div className='grid gap-4 mb-4 md:grid-cols-2'>
                          <div>
                            <label
                              id='category-name-label'
                              htmlFor='category-name'
                              className='block mb-2 text-sm font-medium normal-text'
                            >
                              <span
                                className='relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
                                data-tooltip-target='tooltip-category-name'
                              >
                                {t['Category Name']}
                              </span>
                              <div
                                id='tooltip-category-name'
                                role='tooltip'
                                className='absolute z-10 invisible inline-block px-2 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-red-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-500'
                              >
                                {t['Required']}
                                <div className='tooltip-arrow' data-popper-arrow></div>
                              </div>
                              <span
                                id='note-error-category-name'
                                className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
                              >
                                {t['This name is required']}
                              </span>
                              <span
                                id='note-success-category-name'
                                className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'
                              >
                                <svg
                                  className='w-3 h-3 text-green-800 dark:text-green-300'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 16 12'
                                >
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 5.917 5.724 10.5 15 1.5'
                                  />
                                </svg>
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
                            <button
                              id='btn-create-category'
                              type='button'
                              name='create_category'
                              className='text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                              data-message-success={t['New category added successfully.']}
                              data-message-failure={t['Failed to add new category.']}
                              disabled
                            >
                              {t['Add Category']}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div id='playlist-management-field-download' className='mb-4'>
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
                              aria-describedby='helper-seek-format'
                              type='checkbox'
                              name='seek_format'
                              defaultValue='1'
                              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                          </div>
                          <div className='ms-2 text-sm'>
                            <label
                              htmlFor='seek-format'
                              className='font-medium text-gray-900 dark:text-gray-300'
                            >
                              {t['Output seek time in media data in HH:MM:SS format.']}
                            </label>
                            <p
                              id='helper-seek-format'
                              className='text-xs font-normal text-gray-500 dark:text-gray-400'
                            >
                              {
                                t[
                                  'If this option is not enabled, it will be output as an integer number of seconds.'
                                ]
                              }
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-end items-end'>
                          <button
                            id='btn-download-playlist'
                            type='button'
                            name='download_playlist'
                            className='text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            data-message-success={t['Playlist downloaded successfully.']}
                            data-message-failure={t['Failed to download playlist.']}
                            disabled
                          >
                            {t['Download Playlist']}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className='hidden p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
                      role='alert'
                    >
                      <span className='font-medium'>
                        Sorry, this is currently under development.
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <h2 id='collapse-item-heading-issue'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  data-accordion-target='#collapse-item-body-issue'
                  aria-expanded={collapseState.issue}
                  aria-controls='collapse-item-body-issue'
                  onClick={() => {
                    setCollapseState((prevState) => ({
                      ...prevState,
                      issue: !prevState.issue,
                    }));
                  }}
                >
                  <span>{t['Report an issue']}</span>
                  <svg
                    data-accordion-icon
                    className='w-3 h-3 rotate-180 shrink-0'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='collapse-item-body-issue'
                className='hidden'
                aria-labelledby='collapse-item-heading-issue'
              >
                <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-y-auto'>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    {t['Ambient development code is managed in a github repository.']}
                    {t['To report bugs or problems, please raise an issue on github.']}
                    {
                      t[
                        'Before reporting a problem, please check to see if a similar issue has already been submitted.'
                      ]
                    }
                  </p>
                  <p className='text-gray-500 dark:text-gray-400'>
                    <a
                      href='https://github.com/ka215/ambient/issues'
                      target='_blank'
                      className='text-blue-600 dark:text-blue-500 hover:underline'
                    >
                      {t['Check out and submit issues.']}
                    </a>
                  </p>
                </div>
              </div>
              <h2 id='collapse-item-heading-about'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  data-accordion-target='#collapse-item-body-about'
                  aria-expanded={collapseState.about}
                  aria-controls='collapse-item-body-about'
                  onClick={() => {
                    setCollapseState((prevState) => ({
                      ...prevState,
                      about: !prevState.about,
                    }));
                  }}
                >
                  <span>{t['About Ambient']}</span>
                  <svg
                    data-accordion-icon
                    className='w-3 h-3 rotate-180 shrink-0'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='collapse-item-body-about'
                className='hidden'
                aria-labelledby='collapse-item-heading-about'
              >
                <div className='p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-y-auto'>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    {
                      t[
                        'Ambient is an open-source media player that allows you to seamlessly mix and play media published on YouTube and media stored on a host computer, such as a local PC.'
                      ]
                    }
                    {
                      t[
                        "Additionally, since Ambient is designed as a web application, anyone can use it by accessing the application's pages with a common web browser."
                      ]
                    }
                    {
                      t[
                        'However, if you want to use Ambient on your local PC, you will need to prepare a PHP execution environment and launch your application onto that environment.'
                      ]
                    }
                  </p>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    {t['Learn more about the technology Ambient uses below:']}
                  </p>
                  <ul className='mb-2 pl-5 text-gray-500 list-disc dark:text-gray-400'>
                    <li>
                      <a
                        href='https://developers.google.com/youtube/iframe_api_reference'
                        target='_blank'
                        rel='nofollow'
                        className='text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        {t['YouTube IFrame Player API']}
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://tailwindcss.com/'
                        target='_blank'
                        rel='nofollow'
                        className='text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        {t['tailwindcss']}
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://flowbite.com/'
                        target='_blank'
                        rel='nofollow'
                        className='text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        {t['Flowbite']}
                      </a>
                    </li>
                  </ul>
                  <p className='mb-2 text-right text-gray-500 dark:text-gray-400'>
                    {t['Version:']} {version} {isLocal ? 'user' : 'cloud'} setup
                  </p>
                  <p className='mt-4 mb-2 pt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-400'>
                    MIT License
                    <br />
                    <br />
                    Copyright &copy; 2023 ka2&lt;MAGIC METHODS&gt;
                    <br />
                    <br />
                    Permission is hereby granted, free of charge, to any person obtaining a copy{' '}
                    <wbr />
                    of this software and associated documentation files (the &quot;Software&quot;),
                    to deal <wbr />
                    in the Software without restriction, including without limitation the rights{' '}
                    <wbr />
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell{' '}
                    <wbr />
                    copies of the Software, and to permit persons to whom the Software is <wbr />
                    furnished to do so, subject to the following conditions:
                    <br />
                    <br />
                    The above copyright notice and this permission notice shall be included in
                    <wbr />
                    all copies or substantial portions of the Software.
                    <br />
                    <br />
                    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
                    EXPRESS OR <wbr />
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, <wbr />
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE{' '}
                    <wbr />
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER <wbr />
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,{' '}
                    <wbr />
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN{' '}
                    <wbr />
                    THE SOFTWARE.
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              &copy; 2023 Ambient. Produced by{' '}
              <a href='https://ka2.org/' target='_blank' className='hover:underline'>
                MAGIC METHODS
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
