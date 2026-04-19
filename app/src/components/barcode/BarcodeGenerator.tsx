"use client"

import { useState, useMemo } from "react"
import { toast } from "sonner"
import { Download } from "lucide-react"

import { encodeEan13, encodeForPreview } from "@/lib/barcode/encode"
import { generateSvg } from "@/lib/barcode/svg"
import { type ShapeId } from "@/lib/barcode/shapes"
import { type ColorId, getColorHex } from "@/lib/barcode/colors"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarcodePreview } from "./BarcodePreview"
import { ShapeSelector } from "./ShapeSelector"
import { ColorSelector } from "./ColorSelector"

import styles from "./BarcodeGenerator.module.css"

const DEFAULT_VALUE = "123456789012"
const DEFAULT_SHAPE: ShapeId = "tree"
const DEFAULT_COLOR: ColorId = "black"

export function BarcodeGenerator() {
  const [value, setValue] = useState(DEFAULT_VALUE)
  const [shape, setShape] = useState<ShapeId>(DEFAULT_SHAPE)
  const [color, setColor] = useState<ColorId>(DEFAULT_COLOR)

  const encoded = useMemo(() => encodeEan13(value), [value])
  const previewEncoded = useMemo(() => encodeForPreview(value), [value])
  const isValid = encoded !== null

  const handleDownload = () => {
    if (!encoded) {
      toast.error("Invalid barcode — check the digit count and check digit")
      return
    }
    try {
      const svg = generateSvg(encoded, shape, getColorHex(color))
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `barcode-${value.replace(/\D/g, "")}.svg`
      a.click()
      URL.revokeObjectURL(url)
      toast.success("SVG downloaded successfully")
    } catch {
      toast.error("Failed to generate SVG")
    }
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/\D/g, "").slice(0, 12))
  }

  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="barcode-input">
            Barcode number
          </label>
          <Input
            id="barcode-input"
            value={value}
            onChange={handleValueChange}
            placeholder="12 digits"
            maxLength={12}
            inputMode="numeric"
          />
          <p className={styles.hint}>{value.length}/12</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Shape</label>
          <ShapeSelector value={shape} onChange={setShape} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Colour</label>
          <ColorSelector value={color} onChange={setColor} />
        </div>

        <Button
          onClick={handleDownload}
          disabled={!isValid}
          className={styles.downloadBtn}
        >
          <Download />
          Download SVG
        </Button>
      </div>

      <div className={styles.preview}>
        <div className={styles.animatedPreview}>
          <BarcodePreview
            encoded={previewEncoded}
            shape={shape}
            color={getColorHex(color)}
            rawValue={value}
          />
        </div>
      </div>
    </div>
  )
}
