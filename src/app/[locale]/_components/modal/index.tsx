import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitleProps,
  AccordionTitle as FbAccordionTitle,
  ModalBody,
  ModalHeader,
} from 'flowbite-react';
import { isLocal } from '@/libs/const';
import { getTranslation } from '@/libs/i18n';
import { getPageParams } from '@/libs/params';
import { getCategories, getPlaylist } from '@/libs/playlist';
import { theme } from '@/libs/tw';
import { MediaManagementForm } from './media-management-form';
import { PlaylistManagementForm } from './playlist-management-form';
import { Modal } from './wrapper';
import packageInfo from '../../../../../package.json';

const AccordionTitle = ({ children, ...props }: AccordionTitleProps) => (
  <FbAccordionTitle
    theme={theme('accordion', { title: { flush: { off: 'focus:ring-0' } } }).title}
    {...props}
  >
    {children}
  </FbAccordionTitle>
);

export async function OptionModal() {
  const t = await getTranslation();
  const { searchParams } = await getPageParams();
  const playlist = searchParams.playlist ? await getPlaylist(searchParams.playlist) : null;
  const categories = playlist ? await getCategories(playlist) : [];

  return (
    <Modal>
      <ModalHeader>{t['Options']}</ModalHeader>
      <ModalBody className='p-0'>
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>{t['Media Management']}</AccordionTitle>
            <AccordionContent>
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
                <MediaManagementForm categories={categories} />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>{t['Playlist Management']}</AccordionTitle>
            <AccordionContent>
              <PlaylistManagementForm />
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>{t['Report an issue']}</AccordionTitle>
            <AccordionContent>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                {t['Ambient development code is managed in a github repository.']}
                {t['To report bugs or problems, please raise an issue on github.']}
                <br />
                {
                  t[
                    'Before reporting a problem, please check to see if a similar issue has already been submitted.'
                  ]
                }
              </p>
              <p className='text-gray-500 dark:text-gray-400'>
                <a
                  href='https://github.com/kage1020/ambient/issues'
                  target='_blank'
                  className='text-blue-600 dark:text-blue-500 hover:underline'
                >
                  {t['Check out and submit issues.']}
                </a>
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>{t['About Ambient']}</AccordionTitle>
            <AccordionContent>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                {
                  t[
                    'Ambient is an open-source media player that allows you to seamlessly mix and play media published on YouTube and media stored on a host computer, such as a local PC.'
                  ]
                }
                <br />
                {
                  t[
                    "Additionally, since Ambient is designed as a web application, anyone can use it by accessing the application's pages with a common web browser."
                  ]
                }
                <br />
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
                  <Link
                    href='https://developers.google.com/youtube/iframe_api_reference'
                    target='_blank'
                    rel='nofollow'
                    className='text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    {t['YouTube IFrame Player API']}
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://tailwindcss.com/'
                    target='_blank'
                    rel='nofollow'
                    className='text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    {t['tailwindcss']}
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://flowbite.com/'
                    target='_blank'
                    rel='nofollow'
                    className='text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    {t['Flowbite']}
                  </Link>
                </li>
              </ul>
              <p className='mb-2 text-right text-gray-500 dark:text-gray-400'>
                {t['Version:']} {packageInfo.version} {isLocal ? 'user' : 'cloud'}
              </p>
              <p className='mt-4 mb-2 pt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-400'>
                MIT License
                <br />
                <br />
                Copyright &copy; 2023 ka2&lt;MAGIC METHODS&gt;
                <br />
                <br />
                Permission is hereby granted, free of charge, to any person obtaining a copy <wbr />
                of this software and associated documentation files (the &quot;Software&quot;), to
                deal <wbr />
                in the Software without restriction, including without limitation the rights <wbr />
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell <wbr />
                copies of the Software, and to permit persons to whom the Software is <wbr />
                furnished to do so, subject to the following conditions:
                <br />
                <br />
                The above copyright notice and this permission notice shall be included in
                <wbr />
                all copies or substantial portions of the Software.
                <br />
                <br />
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR{' '}
                <wbr />
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, <wbr />
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE <wbr />
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER <wbr />
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,{' '}
                <wbr />
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN <wbr />
                THE SOFTWARE.
                <br />
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </ModalBody>
      <div className='flex justify-center items-center p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          &copy; 2023 Ambient. Produced by{' '}
          <Link href='https://ka2.org/' target='_blank' className='hover:underline'>
            MAGIC METHODS
          </Link>
          , modified by{' '}
          <Link href='https://kage1020.com/' target='_blank' className='hover:underline'>
            kage1020
          </Link>
          .
        </span>
      </div>
    </Modal>
  );
}
