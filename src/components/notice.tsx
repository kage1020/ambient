import useLocale from '@/hooks/use-locale';
import { cn } from '@/libs/tw';
import { toast } from 'sonner';

type NoticeProps = {
  message: string;
  type: 'default' | 'info' | 'warning' | 'error' | 'success';
  locale: string;
  id: string | number;
};

export default function Notice({ message, type, locale, id }: NoticeProps) {
  const { t } = useLocale(locale);
  return (
    <div
      id='alert-notification'
      className={cn(
        'flex items-center p-4 my-4 mx-auto z-30 text-sm border rounded-lg dark:bg-gray-800 shadow-md transition-opacity duration-1000 delay-2000 ease-out',
        type === 'default' &&
          'text-gray-800 bg-gray-50 border-gray-300 dark:text-gray-400 dark:border-gray-800',
        type === 'info' &&
          'text-blue-800 bg-blue-50 border-blue-300 dark:text-blue-400 dark:border-blue-800',
        type === 'warning' &&
          'text-yellow-800 bg-yellow-50 border-yellow-300 dark:text-yellow-400 dark:border-yellow-800',
        type === 'error' &&
          'text-red-800 bg-red-50 border-red-300 dark:text-red-400 dark:border-red-800',
        type === 'success' &&
          'text-green-800 bg-green-50 border-green-300 dark:text-green-400 dark:border-green-800'
      )}
      role='alert'
    >
      <svg
        className='flex-shrink-0 inline w-4 h-4 mr-3'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
      </svg>
      <span className='sr-only'>{t['Notify']}</span>
      <div id='alert-message' className='text-sm font-medium'>
        <span className='font-medium'>{message}</span>
      </div>
      <button
        id='btn-alert-dismiss'
        type='button'
        className={cn(
          'rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700',
          type === 'default' &&
            'bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:text-gray-400',
          type === 'info' &&
            'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:text-blue-400',
          type === 'warning' &&
            'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:text-yellow-400',
          type === 'error' &&
            'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:text-red-400',
          type === 'success' &&
            'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:text-green-400'
        )}
        data-dismiss-target='#alert-notification'
        aria-label={t['Dismiss']}
        onClick={() => toast.dismiss(id)}
      >
        <span className='sr-only'>{t['Dismiss']}</span>
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
      </button>
    </div>
  );
}
