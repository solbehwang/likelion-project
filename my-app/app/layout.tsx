import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { FavoritesProvider } from "./context/favorites-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BAPAGO - Restaurant Card View",
  description: "Restaurant profile page in card view",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}
