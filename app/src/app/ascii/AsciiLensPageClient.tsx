"use client"

import dynamic from "next/dynamic"
import AsciiLoading from "./loading"

const AsciiLens = dynamic(
  () => import("@/components/ascii/AsciiLens").then((m) => m.AsciiLens),
  { ssr: false, loading: () => <AsciiLoading /> },
)

export default function AsciiLensPageClient() {
  return <AsciiLens />
}
