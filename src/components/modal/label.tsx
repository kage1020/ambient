'use client';

import { Tooltip } from 'flowbite-react';
import { Check } from '@/components/icons';
import { cn } from '@/libs/tw';
import { LanguageTranslation } from '@/types';

type LabelProps = JSX.IntrinsicElements['label'] & {
  t: LanguageTranslation;
  touched?: boolean;
  required?: boolean;
  error?: string;
};

export function Label({ t, touched, required = false, error, children, ...props }: LabelProps) {
  if (!required)
    return (
      <label {...props}>
        {children}
        {error && (
          <span className='bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
            {error}
          </span>
        )}
        {touched && !error && (
          <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'>
            <Check className='w-3 h-3 text-green-800 dark:text-green-300' />
          </span>
        )}
      </label>
    );

  return (
    <label {...props}>
      <Tooltip
        content={t['Required']}
        theme={{
          base: 'absolute z-10 inline-block rounded-lg px-2 py-2 text-xs font-normal shadow-sm text-white bg-red-600 dark:bg-red-500',
          target: cn(
            'w-fit',
            required &&
              'relative inline-flex flex-nowrap items-center gap-0.5 after:content-["*"] after:relative after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
          ),
          style: {
            dark: 'bg-red-500 text-white',
            light: 'bg-red-600 text-white',
            auto: 'bg-red-600 text-white dark:bg-red-500',
          },
          arrow: {
            style: {
              dark: 'bg-red-500',
              light: 'bg-red-600',
              auto: 'bg-red-600 dark:bg-red-500',
            },
          },
        }}
      >
        {children}
      </Tooltip>
      {error && (
        <span className='bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
          {error}
        </span>
      )}
      {touched && !error && (
        <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center'>
          <Check className='w-3 h-3 text-green-800 dark:text-green-300' />
        </span>
      )}
    </label>
  );
}
