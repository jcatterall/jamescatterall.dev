"use client";

import dynamic from "next/dynamic";
import BarcodeLoading from "./loading";

const BarcodeGenerator = dynamic(
  () =>
    import("@/components/barcode/BarcodeGenerator").then(
      (m) => m.BarcodeGenerator,
    ),
  { ssr: false, loading: () => <BarcodeLoading /> },
);

export default function BarcodePageClient() {
  return <BarcodeGenerator />;
}
