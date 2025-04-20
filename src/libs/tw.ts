import clsx, { type ClassValue } from "clsx"
import { FlowbiteTheme, getTheme } from "flowbite-react"
import { twMerge } from "tailwind-merge"

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

function isObject<T>(item: T): item is T & object {
  return (
    item !== null && typeof item === "object" && item.constructor === Object
  )
}

function cloneDeep<T>(source: T): T {
  if (!isObject(source)) {
    return source
  }
  const output = {} as { [K in keyof T]: T[K] }
  for (const key in source) {
    output[key] = cloneDeep(source[key])
  }
  return output
}

function mergeDeep<T, S>(target: T, source: S): T {
  if (isObject(source) && Object.keys(source).length === 0) {
    return cloneDeep({ ...target, ...source })
  }
  const output = { ...target, ...source } as Record<string, unknown>
  if (isObject(source) && isObject(target)) {
    for (const key in source) {
      if (
        isObject(source[key]) &&
        key in target &&
        isObject(target[key as unknown as keyof T])
      ) {
        output[key] = mergeDeep(target[key as unknown as keyof T], source[key])
      } else {
        output[key] = isObject(source[key])
          ? cloneDeep(source[key])
          : cn(
              target[key as unknown as keyof T] as string,
              source[key] as string
            )
      }
    }
  }
  return output as T
}

export function theme<T extends keyof FlowbiteTheme>(
  component: T,
  defaultTheme: DeepPartial<FlowbiteTheme[T]>
): FlowbiteTheme[T] {
  return mergeDeep(getTheme()[component], defaultTheme)
}
