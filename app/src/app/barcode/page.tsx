import { Suspense } from "react"
import BarcodeLoading from "./loading"
import BarcodePageClient from "./BarcodePageClient"
import { PageNav } from "@/components/PageNav"
import styles from "./page.module.css"

export const metadata = {
  title: "Barcode Studio",
  description: "Generate artistic EAN-13 barcodes and export as SVG.",
}

export default function BarcodePage() {
  return (
    <main className={styles.page}>
      <PageNav slug="barcode" label="Barcode Studio" />
      <Suspense fallback={<BarcodeLoading />}>
        <BarcodePageClient />
      </Suspense>
    </main>
  )
}
