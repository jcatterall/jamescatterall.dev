"use client"

import { clsx } from "clsx"
import { SHAPE_META, type ShapeId } from "@/lib/barcode/shapes"
import styles from "./ShapeSelector.module.css"

type ShapeSelectorProps = {
  value: ShapeId
  onChange: (shape: ShapeId) => void
}

export function ShapeSelector({ value, onChange }: ShapeSelectorProps) {
  return (
    <div className={styles.grid}>
      {SHAPE_META.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onChange(shape.id)}
          className={clsx(styles.chip, value === shape.id && styles.active)}
          title={shape.description}
        >
          {shape.label}
        </button>
      ))}
    </div>
  )
}
