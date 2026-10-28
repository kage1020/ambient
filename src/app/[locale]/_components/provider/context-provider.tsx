"use client"

import { CarouselContext } from "@/hooks/use-carousel"
import { MediaListContext } from "@/hooks/use-current-media"
import { DrawerContext } from "@/hooks/use-drawer"
import { ModalContext } from "@/hooks/use-modal"
import { PlayerContext } from "@/hooks/use-player"
import { setStorageItem, useStorageItem } from "@/hooks/use-storage-item"
import { defaultPlaylistOption } from "@/libs/const"
import { useTheme } from "@/libs/next-themes"
import type { Media, PlaylistOption } from "@/libs/playlist"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type ReactPlayer from "react-player"

const optionsStorageKey = "ambient.options"
const playlistsStorageKey = "ambient.playlists"

function mergeStoredOptions(
  playlistOption: PlaylistOption,
  storedOptionsString: string | null
): PlaylistOption {
  const storedOptions = storedOptionsString
    ? ((JSON.parse(storedOptionsString) as PlaylistOption) ?? {})
    : {}
  return { ...defaultPlaylistOption, ...playlistOption, ...storedOptions }
}

type ProviderProps = {
  playlistOption: PlaylistOption
  mediaList: Media[]
  children: React.ReactNode
}

export function ContextProvider({
  playlistOption,
  mediaList,
  children,
}: ProviderProps) {
  const playerRef = useRef<ReactPlayer>(null)
  const [playing, setPlaying] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [carouselOpen, setCarouselOpen] = useState(true)
  const [display, setDisplay] = useState<"normal" | "expanded">("normal")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setTheme } = useTheme()
  const storedOptionsString = useStorageItem(optionsStorageKey)
  const storedPlaylistsString = useStorageItem(playlistsStorageKey)

  const options = useMemo(
    () => mergeStoredOptions(playlistOption, storedOptionsString),
    [playlistOption, storedOptionsString]
  )
  const remotePlaylists = useMemo(
    () =>
      storedPlaylistsString
        ? ((JSON.parse(storedPlaylistsString) as string[]) ?? [])
        : [],
    [storedPlaylistsString]
  )

  const setOptions = useCallback(
    (option: Partial<PlaylistOption>) => {
      setStorageItem(
        optionsStorageKey,
        JSON.stringify({
          ...mergeStoredOptions(
            playlistOption,
            localStorage.getItem(optionsStorageKey)
          ),
          ...option,
        })
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
    [playlistOption, router, searchParams, setTheme]
  )

  const setRemotePlaylists = useCallback((playlists: string[]) => {
    const filteredPlaylists = playlists.filter((p) => p.startsWith("http"))
    setStorageItem(playlistsStorageKey, JSON.stringify(filteredPlaylists))
  }, [])

  useEffect(() => {
    // Apply options restored from localStorage to the theme and URL
    const storedOptionsString = localStorage.getItem(optionsStorageKey)
    if (storedOptionsString) {
      const storedOptions = mergeStoredOptions(
        playlistOption,
        storedOptionsString
      )
      setTheme(storedOptions.dark ? "dark" : "light")
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set("shuffle", storedOptions.shuffle ? "true" : "false")
      setStorageItem(optionsStorageKey, JSON.stringify(storedOptions))
      if (searchParams.toString() !== newSearchParams.toString()) {
        router.push(`?${newSearchParams.toString()}`)
      }
    }

    if (!localStorage.getItem(playlistsStorageKey)) {
      setStorageItem(playlistsStorageKey, JSON.stringify([]))
    }
  }, [playlistOption, router, searchParams, setTheme])

  return (
    <MediaListContext value={mediaList}>
      <PlayerContext
        value={{
          playerRef,
          options,
          playing,
          remotePlaylists,
          display,
          setOptions,
          setPlaying,
          setRemotePlaylists,
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
    </MediaListContext>
  )
}
