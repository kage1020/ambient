"use client"

import { CarouselContext } from "@/hooks/use-carousel"
import { DrawerContext } from "@/hooks/use-drawer"
import { ModalContext } from "@/hooks/use-modal"
import { PageParamsContext } from "@/hooks/use-page-params"
import { PlayerContext } from "@/hooks/use-player"
import { TranslationContext } from "@/hooks/use-translation"
import { defaultPlaylistOption } from "@/libs/const"
import type { Translation } from "@/libs/i18n"
import { useTheme } from "@/libs/next-themes"
import type { ParsedPageParams } from "@/libs/params"
import type { PlaylistOption } from "@/libs/playlist"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import type ReactPlayer from "react-player"

type ProviderProps = {
  t: Translation
  playlistOption: PlaylistOption
  pageParams: ParsedPageParams
  children: React.ReactNode
}

export function ContextProvider({
  t,
  playlistOption,
  pageParams,
  children,
}: ProviderProps) {
  const playerRef = useRef<ReactPlayer>(null)
  const [playing, setPlaying] = useState(false)
  const [options, setAllOptions] = useState<PlaylistOption>({
    ...defaultPlaylistOption,
    ...playlistOption,
  })
  const [playlistOpen, setPlaylistOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [remotePlaylists, setRemotePlaylists] = useState<string[]>([])
  const [display, setDisplay] = useState<"normal" | "expanded">("normal")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setTheme } = useTheme()

  const setOptions = useCallback(
    (option: Partial<PlaylistOption>) => {
      setAllOptions((prev) => ({ ...prev, ...option }))
      localStorage.setItem(
        "ambient.options",
        JSON.stringify({ ...options, ...option })
      )

      if (Object.keys(option).includes("shuffle")) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set("shuffle", option.shuffle ? "true" : "false")
        router.push(`?${newSearchParams.toString()}`)
      }

      if (Object.keys(option).includes("dark")) {
        setTheme(option.dark ? "dark" : "light")
      }
    },
    [options, router, searchParams, setTheme]
  )

  const setRemotePlaylistsWithStorage = useCallback((playlists: string[]) => {
    const filteredPlaylists = playlists.filter((p) => p.startsWith("http"))
    setRemotePlaylists(filteredPlaylists)
    localStorage.setItem("ambient.playlists", JSON.stringify(filteredPlaylists))
  }, [])

  useEffect(() => {
    // Restore options from localStorage
    const storedOptionsString = localStorage.getItem("ambient.options")
    if (storedOptionsString) {
      const storedOptions =
        (JSON.parse(storedOptionsString) as PlaylistOption) ?? {}
      setAllOptions((prev) => ({ ...prev, ...storedOptions }))
      setTheme(storedOptions.dark ? "dark" : "light")
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set("shuffle", storedOptions.shuffle ? "true" : "false")
      localStorage.setItem(
        "ambient.options",
        JSON.stringify({
          ...defaultPlaylistOption,
          ...playlistOption,
          ...storedOptions,
        })
      )
      if (searchParams.toString() !== newSearchParams.toString()) {
        router.push(`?${newSearchParams.toString()}`)
      }
    }

    // Restore remote playlists from localStorage
    const storedPlaylistsString = localStorage.getItem("ambient.playlists")
    if (storedPlaylistsString) {
      const storedPlaylists =
        (JSON.parse(storedPlaylistsString) as string[]) ?? []
      setRemotePlaylists(storedPlaylists)
    } else {
      localStorage.setItem("ambient.playlists", JSON.stringify([]))
    }
  }, [playlistOption, router, searchParams, setTheme])

  return (
    <TranslationContext value={t}>
      <PageParamsContext value={pageParams}>
        <PlayerContext
          value={{
            playerRef,
            options,
            playing,
            remotePlaylists,
            display,
            setOptions,
            setPlaying,
            setRemotePlaylists: setRemotePlaylistsWithStorage,
            setDisplay,
          }}
        >
          <DrawerContext
            value={{
              playlistOpen,
              setPlaylistOpen,
              settingsOpen,
              setSettingsOpen,
            }}
          >
            <ModalContext value={{ modalOpen, setModalOpen }}>
              <CarouselContext value={{ carouselOpen, setCarouselOpen }}>
                {children}
              </CarouselContext>
            </ModalContext>
          </DrawerContext>
        </PlayerContext>
      </PageParamsContext>
    </TranslationContext>
  )
}
