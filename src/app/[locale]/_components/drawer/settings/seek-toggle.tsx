"use client"

import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/libs/tw"
import { Label } from "flowbite-react"

// TODO: Implement this feature
export function SeekToggle() {
  const { options, setOptions } = usePlayer()
  const t = useTranslation()

  return (
    <div className="p-4">
      <Label
        className={cn(
          "relative inline-flex items-center",
          false ? "cursor-pointer" : "cursor-default"
        )}
      >
        <input
          type="checkbox"
          checked={options.seek && false}
          className="sr-only peer"
          onChange={() => setOptions({ seek: !options.seek })}
          disabled
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span
          className={cn(
            "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300",
            !false && "opacity-50"
          )}
        >
          {t["Seek and play"]}
        </span>
      </Label>
    </div>
  )
}
