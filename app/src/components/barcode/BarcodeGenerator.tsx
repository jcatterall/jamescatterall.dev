"use client";

import { useState, useMemo } from "react";
import { Download } from "lucide-react";

import {
  encodeEan13,
  encodeForPreview,
  getDisplayDigits,
} from "@/lib/barcode/encode";
import { generateSvg } from "@/lib/barcode/svg";
import { type ShapeId } from "@/lib/barcode/shapes";
import { type ColorId, getColorHex } from "@/lib/barcode/colors";

import { Button, Field, Input } from "@/design-system";
import { BarcodePreview } from "./BarcodePreview";
import { ShapeSelector } from "./ShapeSelector";
import { ColorSelector } from "./ColorSelector";

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
      <div className={styles.controls}>
        <Field label="Barcode number" hint={`${value.length}/12`}>
          <Input
            id="barcode-input"
            value={value}
            onChange={(e) =>
              setValue(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            placeholder="12 digits"
            maxLength={12}
            inputMode="numeric"
          />
        </Field>

        <Field label="Shape">
          <ShapeSelector value={shape} onChange={setShape} />
        </Field>

        <Field label="Colour">
          <ColorSelector value={color} onChange={setColor} />
        </Field>

        <Button
          onClick={handleDownload}
          disabled={!encoded}
          className={styles.downloadBtn}
        >
          <Download />
          Download SVG
        </Button>
      </div>

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
