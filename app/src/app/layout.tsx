import type { Metadata } from "next"
import { Doto, Space_Grotesk, Space_Mono } from "next/font/google"
import { Terminal } from "@/components/terminal/Terminal"
import "./globals.css"

const doto = Doto({ variable: "--font-doto", subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] })
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "James Catterall — Developer",
  description: "Personal portfolio of James Catterall, software developer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${doto.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <Terminal />
      </body>
    </html>
  )
}
