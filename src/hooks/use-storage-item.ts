import { useSyncExternalStore } from "react"

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setStorageItem(key: string, value: string) {
  localStorage.setItem(key, value)
  for (const listener of listeners) listener()
}

export function useStorageItem(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null
  )
}
