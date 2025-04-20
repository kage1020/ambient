"use client"

import { usePlayer } from "@/hooks/use-player"
import { useTranslation } from "@/hooks/use-translation"
import { Label, Select } from "flowbite-react"

type CategorySelectProps = {
  selectedCategoryName: string | null
  categories: string[]
}

export function CategorySelect({
  selectedCategoryName,
  categories,
}: CategorySelectProps) {
  const { selectCategory } = usePlayer()
  const t = useTranslation()

  return (
    <div className="p-4">
      <Label htmlFor="target-category" className="block mb-2">
        {t["Target Category"]}
      </Label>
      <Select
        id="target-category"
        theme={{
          field: {
            select: {
              base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
              colors: {
                gray: "focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              },
            },
          },
        }}
        value={selectedCategoryName || t["All categories"]}
        onChange={(e) => selectCategory(e.target.value)}
      >
        <option value="all">{t["All categories"]}</option>
        {categories
          .filter((v) => v !== "all")
          .map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
      </Select>
    </div>
  )
}
