'use client';

import { CheckIcon } from '@/components/icons';
import { cn } from '@/libs/tw';
import { CustomFlowbiteTheme, Tooltip } from 'flowbite-react';

type LabelProps = {
  htmlFor: string;
  errorText: string;
  children: React.ReactNode;
};

export function Label({ htmlFor, errorText, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className='block mb-2 text-sm font-medium normal-text group'>
      <span className='relative inline-flex flex-nowrap items-center gap-0.5'>{children}</span>
      <span className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 group-invalid:inline-flex'>
        {errorText}
      </span>
      <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hidden items-center group-valid:inline-flex'>
        <CheckIcon />
      </span>
    </label>
  );
}

const tooltipTheme = {
  style: {
    dark: 'bg-red-600 text-white dark:bg-red-500',
    light: 'bg-red-600 text-white',
    auto: 'bg-red-600 text-white dark:bg-red-500',
  },
  arrow: {
    style: {
      dark: 'bg-red-600 dark:bg-red-500',
      light: 'bg-white',
      auto: 'bg-white dark:bg-red-500',
    },
  },
} satisfies CustomFlowbiteTheme['tooltip'];

type TooltipLabelProps = {
  htmlFor: string;
  tooltipContent: string;
  errorText: string;
  required?: boolean;
  children: React.ReactNode;
};

export function TooltipLabel({
  htmlFor,
  tooltipContent,
  errorText,
  required,
  children,
}: TooltipLabelProps) {
  return (
    <label htmlFor={htmlFor} className='block mb-2 text-sm font-medium normal-text group'>
      <Tooltip content={tooltipContent} theme={tooltipTheme}>
        <span
          className={cn(
            required &&
              'relative inline-flex flex-nowrap items-center gap-0.5 after:relative after:content-["*"] after:text-red-600 after:text-lg after:font-normal after:top-0 after:dark:text-red-400'
          )}
        >
          {children}
        </span>
      </Tooltip>
      <span className='hidden bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 group-invalid:inline-flex'>
        {errorText}
      </span>
      <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hidden items-center group-valid:inline-flex'>
        <CheckIcon />
      </span>
    </label>
  );
}
