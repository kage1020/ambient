'use client';

import { createContext, useContext } from 'react';
import type { ParsedPageParams } from '@/libs/params';

export const PageParamsContext = createContext<ParsedPageParams | null>(null);

export function usePageParams() {
  const context = useContext(PageParamsContext);
  if (context === null) {
    throw new Error('usePageParams must be used within a PageParamsProvider');
  }
  return context;
}
