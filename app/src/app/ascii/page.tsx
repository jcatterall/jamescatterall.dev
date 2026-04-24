import { Suspense } from "react"
import AsciiLoading from "./loading"
import AsciiLensPageClient from "./AsciiLensPageClient"
import { PageNav } from "@/components/PageNav"
import styles from "./page.module.css"

export const metadata = {
  title: "ASCII Lens",
  description:
    "Real-time webcam-to-ASCII art renderer. Runs entirely in the browser. Export as SVG.",
}

export default function AsciiPage() {
  return (
    <main className={styles.page}>
      <PageNav slug="ascii-lens" label="ASCII Lens" />
      <Suspense fallback={<AsciiLoading />}>
        <AsciiLensPageClient />
      </Suspense>
    </main>
  )
}
