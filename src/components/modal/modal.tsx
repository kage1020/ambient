'use client';

import { Accordion, CustomFlowbiteTheme, Modal as FlowbiteModal } from 'flowbite-react';
import { CloseIcon } from '@/components/icons';
import MediaManagementForm from '@/components/modal/media-management';
import useLocale from '@/hooks/use-locale';
import useModal from '@/hooks/use-modal';
import packageJson from '../../../package.json';
import PlaylistManagementForm from './playlist-management';

const version = packageJson.version;

const accordionTheme = {
  title: {
    base: 'flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 first:rounded-t-lg last:rounded-b-lg dark:text-white',
    flush: {
      off: 'hover:bg-gray-100 focus-visible:ring-4 focus-visible:ring-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-800',
    },
  },
} satisfies CustomFlowbiteTheme['accordion'];

type ModalProps = {
  locale: string;
};

export default function Modal({ locale }: ModalProps) {
  const { t } = useLocale(locale);
  const isLocal = process.env.NEXT_PUBLIC_ENV === undefined;
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <FlowbiteModal dismissible show={isModalOpen} onClose={() => setModalOpen(false)}>
      <div className='relative w-full max-w-2xl max-h-full shadow'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{t['Options']}</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => setModalOpen(false)}
            >
              <CloseIcon />
              <span className='sr-only'>{t['Close options']}</span>
            </button>
          </div>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title theme={accordionTheme.title}>
                <span>{t['Media Management']}</span>
              </Accordion.Title>
              <Accordion.Content>
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
                    <MediaManagementForm locale={locale} />
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title theme={accordionTheme.title}>
                {t['Playlist Management']}
              </Accordion.Title>
              <Accordion.Content>
                <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-y-auto'>
                  <PlaylistManagementForm locale={locale} />
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title theme={accordionTheme.title}>{t['Report an issue']}</Accordion.Title>
              <Accordion.Content>
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
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title theme={accordionTheme.title}>{t['About Ambient']}</Accordion.Title>
              <Accordion.Content>
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
                    Permission is hereby granted, free of charge, to any person obtaining a copy of
                    this software and associated documentation files (the &quot;Software&quot;), to
                    deal in the Software without restriction, including without limitation the
                    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is furnished
                    to do so, subject to the following conditions:
                    <br />
                    <br />
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                    <br />
                    <br />
                    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
                    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
                    EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                    THE SOFTWARE.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
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
    </FlowbiteModal>
  );
}
