import { parsePageParams } from "@/libs/params"
import localFont from "next/font/local"
import { headers } from "next/headers"
import { Toaster } from "sonner"
import "./globals.css"

const mplus = localFont({
  src: "./fonts/mplus-1p-regular.woff",
  display: "swap",
  variable: "--font-mplus",
})

type AppLayoutProps = {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const headerList = await headers()
  const searchParams = new URLSearchParams(
    headerList.get("X-Search-Params") ?? ""
  )
  const { parsedParams } = await parsePageParams({ searchParams })

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased w-screen h-screen bg-white dark:bg-gray-800 overflow-hidden transition-all">
        <Toaster
          className="w-full"
          position="top-center"
          toastOptions={{ unstyled: true }}
        />
        {children}
      </body>
    </html>
  )
}
