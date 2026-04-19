"use client"

import { useRef, useLayoutEffect } from "react"
import { artBarsHtml, scanBarsHtml, TOTAL_WIDTH, VIEWBOX_HEIGHT } from "@/lib/barcode/svg"
import { getDisplayDigits } from "@/lib/barcode/encode"
import { SHAPES, type ShapeId } from "@/lib/barcode/shapes"

import styles from "./BarcodePreview.module.css"

type BarcodePreviewProps = {
  encoded: string
  shape: ShapeId
  color: string
  rawValue: string
}

export function BarcodePreview({ encoded, shape, color, rawValue }: BarcodePreviewProps) {
  const artRef = useRef<SVGGElement>(null)
  const scanRef = useRef<SVGGElement>(null)
  const clipRef = useRef<SVGClipPathElement>(null)
  const digits = getDisplayDigits(rawValue)

  // Surgically update only the bar rects when encoded or color changes —
  // no full SVG replacement means no repaint flash
  useLayoutEffect(() => {
    if (artRef.current) artRef.current.innerHTML = artBarsHtml(encoded, color)
    if (scanRef.current) scanRef.current.innerHTML = scanBarsHtml(encoded, color)
  }, [encoded, color])

  // Update the clip shape only when the shape selection changes
  useLayoutEffect(() => {
    if (clipRef.current) clipRef.current.innerHTML = SHAPES[shape]
  }, [shape])

  return (
    <div className={styles.wrapper}>
      <div className={styles.svgContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${TOTAL_WIDTH} ${VIEWBOX_HEIGHT}`}
        >
          <defs>
            <clipPath id="sc" ref={clipRef} />
          </defs>
          <g clipPath={shape !== "classic" ? "url(#sc)" : undefined} ref={artRef} />
          <g ref={scanRef} />
        </svg>
      </div>
      <div className={styles.digits}>
        {digits.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  )
}
