"use client"

import type { Translation } from "@/libs/i18n"
import { ThemeProvider } from "@/libs/next-themes"
import type { ParsedPageParams } from "@/libs/params"
import type { PlaylistOption } from "@/libs/playlist"
import { ContextProvider } from "./context-provider"

type ProviderProps = {
  t: Translation
  playlistOption: PlaylistOption
  pageParams: ParsedPageParams
  children: React.ReactNode
}

export function Provider({
  t,
  playlistOption,
  pageParams,
  children,
}: ProviderProps) {
  return (
    <ThemeProvider enableSystem attribute="class" storageKey="ambient.theme">
      <ContextProvider
        t={t}
        playlistOption={playlistOption}
        pageParams={pageParams}
      >
        {children}
      </ContextProvider>
    </ThemeProvider>
  )
}
