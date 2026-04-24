import { Suspense } from "react"
import AsciiLoading from "./loading"
import AsciiLensPageClient from "./AsciiLensPageClient"
import styles from "./page.module.css"

export const metadata = {
  title: "ASCII Lens",
  description:
    "Real-time webcam-to-ASCII art renderer. Runs entirely in the browser. Export as SVG.",
}

export default function AsciiPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={<AsciiLoading />}>
        <AsciiLensPageClient />
      </Suspense>
    </main>
  )
}
