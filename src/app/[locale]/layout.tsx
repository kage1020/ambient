import { getTranslation } from "@/libs/i18n"
import { type PageParams, parsePageParams } from "@/libs/params"
import localFont from "next/font/local"
import { TranslationProvider } from "./_components/provider/translation-provider"
import "./globals.css"

const mplus = localFont({
  src: "./fonts/mplus-1p-regular.woff",
  display: "swap",
  variable: "--font-mplus",
})

type AppLayoutProps = {
  children: React.ReactNode
  params: PageParams["params"]
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { parsedParams } = await parsePageParams({ params })
  // Provided here so the error boundary below the layout can translate too
  const t = await getTranslation(parsedParams.locale)

  return (
    <html
      lang={parsedParams.locale}
      className={mplus.variable}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="https://www.youtube.com/player_api"
          as="script"
        />
      </head>
      <body className="antialiased w-screen h-dvh pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-white dark:bg-gray-800 overflow-hidden transition-all">
        <TranslationProvider t={t}>{children}</TranslationProvider>
      </body>
    </html>
  )
}
