'use client';

import { createContext, useContext } from 'react';
import type { Translation } from '@/libs/i18n';

export const TranslationContext = createContext<Translation | null>(null);

export function useTranslation(): Translation {
  const context = useContext(TranslationContext);
  if (context === null) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
