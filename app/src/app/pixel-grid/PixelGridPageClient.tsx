"use client";

import dynamic from "next/dynamic";
import PixelGridLoading from "./loading";

const PixelGridEditor = dynamic(
  () =>
    import("@/components/pixel-grid/PixelGridEditor").then(
      (m) => m.PixelGridEditor,
    ),
  { ssr: false, loading: () => <PixelGridLoading /> },
);

export default function PixelGridPageClient() {
  return <PixelGridEditor />;
}
