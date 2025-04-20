"use client"

import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { Label } from "flowbite-react"

export function RandomToggle() {
  const { options, setOptions } = usePlayer()
  const t = useTranslation()

  return (
    <div className="p-4">
      <Label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={options.random}
          className="sr-only peer"
          onChange={() => setOptions({ random: !options.random })}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {t["Randomly play"]}
        </span>
      </Label>
    </div>
  )
}
