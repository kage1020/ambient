"use client"

import {
  type Attribute,
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
  useTheme as useNextThemes,
} from "next-themes"
import { useEffect } from "react"

export type Theme = "light" | "dark"

interface UseThemeProps {
  /** List of all available theme names */
  themes: Theme[]
  /** Forced theme name for the current page */
  forcedTheme?: Theme | undefined
  /** Update the theme */
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  /** Active theme name */
  theme: Theme
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: Theme | undefined
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: Theme | undefined
}

export function useTheme() {
  return useNextThemes() as UseThemeProps
}

function ThemeProvider({ children, storageKey, ...props }: ThemeProviderProps) {
  useEffect(() => {
    if (!storageKey) return
    const stored = localStorage.getItem(storageKey)
    if (!stored) localStorage.setItem(storageKey, "light")
  }, [storageKey])

  return (
    <NextThemeProvider
      storageKey={storageKey}
      enableSystem
      attribute="class"
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}

export { ThemeProvider, type Attribute, type ThemeProviderProps }
