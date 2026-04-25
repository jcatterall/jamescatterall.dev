"use client"

import { type ColorId } from "@/lib/barcode/colors"
import { type ShapeId } from "@/lib/barcode/shapes"
import { Field, Input, SectionLabel, SectionPrompt } from "@/design-system"
import { SidebarShell } from "../SidebarShell"
import { ColorSelector } from "./ColorSelector"
import { ShapeSelector } from "./ShapeSelector"
import styles from "./BarcodeSidebar.module.css"

type Props = {
  value: string
  onValueChange: (v: string) => void
  shape: ShapeId
  onShapeChange: (s: ShapeId) => void
  color: ColorId
  onColorChange: (c: ColorId) => void
  canDownload: boolean
  onDownload: () => void
}

export function BarcodeSidebar({
  value,
  onValueChange,
  shape,
  onShapeChange,
  color,
  onColorChange,
  canDownload,
  onDownload,
}: Props) {
  return (
    <SidebarShell
      header={
        <>
          <SectionPrompt path="./barcode" />
          <div className={styles.title}>Barcode</div>
          <div className={styles.subtitle}>
            Generate artistic EAN-13 barcodes and export as SVG.
          </div>
        </>
      }
      footer={
        <>
          <button
            type="button"
            className={styles.exportBtn}
            onClick={onDownload}
            disabled={!canDownload}
          >
            ↓ DOWNLOAD SVG
          </button>
          <div className={styles.exportHint}>SVG · VECTOR FORMAT</div>
        </>
      }
    >
      <div className={styles.section}>
        <SectionLabel>NUMBER</SectionLabel>
        <Field label="" hint={`${value.length}/12`}>
          <Input
            id="barcode-input"
            value={value}
            onChange={(e) =>
              onValueChange(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            placeholder="12 digits"
            maxLength={12}
            inputMode="numeric"
          />
        </Field>
      </div>

      <div className={styles.section}>
        <SectionLabel>SHAPE</SectionLabel>
        <ShapeSelector value={shape} onChange={onShapeChange} />
      </div>

      <div className={styles.section}>
        <SectionLabel>COLOUR</SectionLabel>
        <ColorSelector value={color} onChange={onColorChange} />
      </div>
    </SidebarShell>
  )
}
