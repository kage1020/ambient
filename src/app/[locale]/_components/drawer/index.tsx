"use client"

import { useDrawer } from "@/hooks/use-drawer"
import useMediaQuery from "@/hooks/use-media-query"
import {
  Drawer as FbDrawer,
  type DrawerHeaderProps as FbDrawerHeaderProps,
  type DrawerProps as FbDrawerProps,
} from "flowbite-react"
import { useEffect } from "react"

type DrawerHeaderProps = Omit<
  FbDrawerHeaderProps,
  "title" | "titleIcon" | "closeIcon"
> & {
  title: React.ReactNode
  titleIcon?: React.ReactNode
  closeIcon?: React.ReactNode
}

export function DrawerHeader({
  title,
  titleIcon,
  closeIcon,
  ...props
}: DrawerHeaderProps) {
  return (
    <FbDrawer.Header
      title={title as string}
      titleIcon={() => titleIcon}
      closeIcon={() => closeIcon}
      {...props}
    />
  )
}

type DrawerProps = Omit<FbDrawerProps, "open" | "onClose">

export function PlaylistDrawer({ backdrop, ...props }: DrawerProps) {
  const { playlistOpen, setPlaylistOpen } = useDrawer()
  const { isLg } = useMediaQuery()

  useEffect(() => {
    setPlaylistOpen(isLg)
  }, [isLg, setPlaylistOpen])

  return (
    <FbDrawer
      open={playlistOpen}
      onClose={() => setPlaylistOpen(false)}
      backdrop={backdrop || !isLg}
      {...props}
    />
  )
}

export function SettingsDrawer({ backdrop, ...props }: DrawerProps) {
  const { settingsOpen, setSettingsOpen } = useDrawer()
  const { isLg } = useMediaQuery()

  useEffect(() => {
    setSettingsOpen(isLg)
  }, [isLg, setSettingsOpen])

  return (
    <FbDrawer
      open={settingsOpen}
      onClose={() => setSettingsOpen(false)}
      backdrop={backdrop || !isLg}
      tabIndex={-1}
      position="right"
      {...props}
    />
  )
}
