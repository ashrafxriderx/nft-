import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFT Terminal - No-Code NFT Launchpad on Monad",
  description:
    "The all-in-one NFT launchpad on Monad for creators, influencers, and artists. Launch fast, grow smart — mint, gate, analyze, and scale on Monad.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
