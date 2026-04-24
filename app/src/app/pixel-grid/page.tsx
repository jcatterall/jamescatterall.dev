import { Suspense } from "react";
import PixelGridLoading from "./loading";
import PixelGridPageClient from "./PixelGridPageClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Pixel Grid",
  description:
    "Dot-matrix pixel art editor. 16×16–64×64 canvas, multi-frame animation, and a phosphor-glow preview panel. Export as PNG, SVG, or animated SVG.",
};

export default function PixelGridPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={<PixelGridLoading />}>
        <PixelGridPageClient />
      </Suspense>
    </main>
  );
}
