import {
  Accordion,
  AccordionPanel,
  AccordionTitleProps,
  AccordionTitle as FbAccordionTitle,
  AccordionContent as FbAccordionContent,
  AccordionContentProps,
} from 'flowbite-react';

function AccordionTitle({ children, ...props }: Omit<AccordionTitleProps, 'theme'>) {
  return (
    <FbAccordionTitle
      theme={{
        base: 'flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 first:rounded-t-lg last:rounded-b-lg',
        flush: {
          off: 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400',
          on: 'dark:text-gray-200',
        },
      }}
      {...props}
    >
      {children}
    </FbAccordionTitle>
  );
}

function AccordionContent({ children }: AccordionContentProps) {
  return (
    <FbAccordionContent
      theme={{
        base: 'p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900 overflow-y-auto max-h-[calc(100vh-420px)]',
      }}
    >
      {children}
    </FbAccordionContent>
  );
}

export { Accordion, AccordionPanel, AccordionTitle, AccordionContent };
