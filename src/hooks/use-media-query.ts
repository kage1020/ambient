import { useSyncExternalStore } from "react"

function subscribe(onResize: () => void) {
  window.addEventListener("resize", onResize)
  return () => window.removeEventListener("resize", onResize)
}

export default function useMediaQuery() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 0
  )
  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0
  )

  return {
    isMd: width >= 640,
    isLg: width >= 1282,
    windowSize: { width, height },
  }
}
