"use client";

import { useMemo, useState } from "react";
import { type ColorId, getColorHex } from "@/lib/barcode/colors";
import {
  encodeEan13,
  encodeForPreview,
  getDisplayDigits,
} from "@/lib/barcode/encode";
import { type ShapeId } from "@/lib/barcode/shapes";
import { generateSvg } from "@/lib/barcode/svg";
import { BarcodeSidebar } from "./BarcodeSidebar";
import { BarcodePreview } from "./BarcodePreview";

import styles from "./BarcodeGenerator.module.css";

const DEFAULT_VALUE = "";
const DEFAULT_SHAPE: ShapeId = "tree";
const DEFAULT_COLOR: ColorId = "black";

export function BarcodeGenerator() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [shape, setShape] = useState<ShapeId>(DEFAULT_SHAPE);
  const [color, setColor] = useState<ColorId>(DEFAULT_COLOR);

  const encoded = useMemo(() => encodeEan13(value), [value]);
  const previewEncoded = useMemo(() => encodeForPreview(value), [value]);

  const handleDownload = () => {
    if (!encoded) return;
    const svg = generateSvg(
      encoded,
      shape,
      getColorHex(color),
      getDisplayDigits(value),
    );
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${value.replace(/\D/g, "")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.layout}>
      <BarcodeSidebar
        value={value}
        onValueChange={setValue}
        shape={shape}
        onShapeChange={setShape}
        color={color}
        onColorChange={setColor}
        canDownload={!!encoded}
        onDownload={handleDownload}
      />
      <div className={styles.preview}>
        <BarcodePreview
          encoded={previewEncoded}
          shape={shape}
          color={getColorHex(color)}
          rawValue={value}
        />
      </div>
    </div>
  );
}
