"use client"

import { ThemeProvider } from "@/libs/next-themes"
import type { ParsedPageParams } from "@/libs/params"
import type { PlaylistOption } from "@/libs/playlist"
import { Toaster } from "sonner"
import { ContextProvider } from "./context-provider"

type ProviderProps = {
  playlistOption: PlaylistOption
  pageParams: ParsedPageParams
  children: React.ReactNode
}

export function Provider({
  playlistOption,
  pageParams,
  children,
}: ProviderProps) {
  return (
    <ThemeProvider enableSystem attribute="class" storageKey="ambient.theme">
      <ContextProvider
        playlistOption={playlistOption}
        pageParams={pageParams}
      >
        <Toaster
          className="w-full"
          position="top-center"
          toastOptions={{ unstyled: true }}
        />
        {children}
      </ContextProvider>
    </ThemeProvider>
  )
}
