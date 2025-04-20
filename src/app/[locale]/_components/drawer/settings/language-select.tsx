"use client"

import { usePageParams } from "@/hooks/use-page-params"
import { useTranslation } from "@/hooks/use-translation"
import { Label } from "flowbite-react"
import { useRouter, useSearchParams } from "next/navigation"

type LanguageSelectProps = {
  languages: {
    code: string
    name: string
  }[]
}

export function LanguageSelect({ languages }: LanguageSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslation()
  const { parsedParams } = usePageParams()

  const changeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = searchParams ?? new URLSearchParams()
    router.push(`/${e.target.value}?${params.toString()}`)
  }

  return (
    <div className="p-4">
      <Label
        htmlFor="language"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {t["Language"]}
      </Label>
      <select
        id="language"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled={languages.length === 1}
        value={parsedParams.locale}
        onChange={changeLocale}
      >
        {languages.map((lang, index) => (
          <option key={index} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
