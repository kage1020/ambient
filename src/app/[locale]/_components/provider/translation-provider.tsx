"use client"

import { TranslationContext } from "@/hooks/use-translation"
import type { Translation } from "@/libs/i18n"

type TranslationProviderProps = {
  t: Translation
  children: React.ReactNode
}

export function TranslationProvider({ t, children }: TranslationProviderProps) {
  return <TranslationContext value={t}>{children}</TranslationContext>
}
