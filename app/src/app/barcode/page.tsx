import { Suspense } from "react"
import BarcodeLoading from "./loading"
import BarcodePageClient from "./BarcodePageClient"
import styles from "./page.module.css"

export const metadata = {
  title: "Barcode Studio",
  description: "Generate artistic EAN-13 barcodes and export as SVG.",
}

export default function BarcodePage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>Barcode Studio</h1>
        <p className={styles.subtitle}>
          Generate artistic EAN-13 barcodes and export them as SVG.
        </p>
      </section>

      <Suspense fallback={<BarcodeLoading />}>
        <BarcodePageClient />
      </Suspense>
    </main>
  )
}
