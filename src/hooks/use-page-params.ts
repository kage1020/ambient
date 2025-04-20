"use client"

import type { ParsedPageParams } from "@/libs/params"
import { createContext, useContext } from "react"

export const PageParamsContext = createContext<ParsedPageParams | null>(null)

export function usePageParams() {
  const context = useContext(PageParamsContext)
  if (context === null) {
    throw new Error("usePageParams must be used within a PageParamsProvider")
  }
  return context
}
