"use client"

import { ThemeProvider } from "@/libs/next-themes"
import type { Media, PlaylistOption } from "@/libs/playlist"
import { Toaster } from "sonner"
import { ContextProvider } from "./context-provider"

type ProviderProps = {
  playlistOption: PlaylistOption
  mediaList: Media[]
  children: React.ReactNode
}

export function Provider({
  playlistOption,
  mediaList,
  children,
}: ProviderProps) {
  return (
    <ThemeProvider enableSystem attribute="class" storageKey="ambient.theme">
      <ContextProvider
        playlistOption={playlistOption}
        mediaList={mediaList}
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
