"use client"

import { clsx } from "clsx"
import { COLORS, type ColorId } from "@/lib/barcode/colors"
import styles from "./ColorSelector.module.css"

type ColorSelectorProps = {
  value: ColorId
  onChange: (color: ColorId) => void
}

export function ColorSelector({ value, onChange }: ColorSelectorProps) {
  return (
    <div className={styles.grid}>
      {COLORS.map((color) => (
        <button
          key={color.id}
          onClick={() => onChange(color.id)}
          className={clsx(styles.swatch, value === color.id && styles.active)}
          title={color.label}
          aria-label={color.label}
          style={{ "--swatch-color": color.hex } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
