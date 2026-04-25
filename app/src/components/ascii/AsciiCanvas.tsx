"use client"

import {
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import type { Settings, PageState, CharSetId } from "./AsciiLens"
import { CHAR_SETS } from "./AsciiLens"
import styles from "./AsciiCanvas.module.css"

/* ── Public handle type ── */

export type AsciiCanvasHandle = {
  startWebcam: () => void
  stopWebcam: () => void
  loadImage: (file: File) => void
  exportSvg: (frame?: FrameSnapshot) => void
}

/* ── Internal types ── */

type FrameSnapshot = {
  imageData: ImageData
  cols: number
  rows: number
  charW: number
  charH: number
  fontSize: number
  charSetId: CharSetId
  colorMode: boolean
  invert: boolean
}

const luma = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255

/* ── Component ── */

type Props = {
  settings: Settings
  active: boolean
  onStateChange: (s: PageState) => void
  style?: React.CSSProperties
}

export const AsciiCanvas = forwardRef<AsciiCanvasHandle, Props>(function AsciiCanvas(
  { settings, active, onStateChange, style },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const preRef       = useRef<HTMLPreElement>(null)
  const offRef       = useRef<HTMLCanvasElement | null>(null)
  const snapRef      = useRef<HTMLCanvasElement | null>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const rafRef       = useRef<number | null>(null)
  const streamRef    = useRef<MediaStream | null>(null)
  const imageRef     = useRef<HTMLImageElement | null>(null)
  const settingsRef  = useRef(settings)
  const lastFrameRef = useRef<FrameSnapshot | null>(null)
  const frameHistory = useRef<{ id: number; bitmap: ImageBitmap; snap: FrameSnapshot }[]>([])
  const tickCount    = useRef(0)

  const [, setHistoryTick] = useState(0)

  /* Keep settingsRef in sync so the rAF closure always reads latest values */
  useEffect(() => { settingsRef.current = settings }, [settings])

  /* ── Core render loop ── */

  const renderLoop = useCallback(() => {
    const pre   = preRef.current
    const off   = offRef.current
    const snap  = snapRef.current
    const video = videoRef.current
    if (!pre || !off) return

    const offCtx = off.getContext("2d")
    if (!offCtx) return

    const container = containerRef.current
    const W = container?.clientWidth  ?? 800
    const H = container?.clientHeight ?? 600

    const { cols, charSetId, colorMode, invert, mirror } = settingsRef.current
    const chars  = CHAR_SETS[charSetId] ?? CHAR_SETS.classic
    const len    = chars.length
    const charW  = Math.max(1, Math.floor(W / cols))
    const charH  = Math.max(1, Math.floor(charW * 1.8))
    const rows   = Math.max(1, Math.floor(H / charH))
    const fontSize = charW * 0.9

    /* Check source is ready */
    const source = imageRef.current ?? video
    if (source === video) {
      if (!video || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(renderLoop)
        return
      }
    }
    if (!source) {
      rafRef.current = requestAnimationFrame(renderLoop)
      return
    }

    off.width  = cols
    off.height = rows
    offCtx.drawImage(source as CanvasImageSource, 0, 0, cols, rows)
    const imageData = offCtx.getImageData(0, 0, cols, rows)

    const snapData: FrameSnapshot = {
      imageData,
      cols,
      rows,
      charW,
      charH,
      fontSize,
      charSetId,
      colorMode,
      invert,
    }
    lastFrameRef.current = snapData

    pre.style.fontSize  = `${fontSize}px`
    pre.style.lineHeight = `${charH / fontSize}`

    /* ── Render to <pre> ── */
    const { data } = imageData

    if (colorMode) {
      const parts: string[] = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const srcCol = mirror ? cols - 1 - col : col
          const i = (row * cols + srcCol) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          let lum = luma(r, g, b)
          if (invert) lum = 1 - lum
          const ch = chars[Math.min(len - 1, Math.floor(lum * len))]
          if (!ch || ch === " ") {
            parts.push(" ")
          } else {
            parts.push(`<span style="color:rgb(${r},${g},${b})">${ch}</span>`)
          }
        }
        parts.push("\n")
      }
      pre.innerHTML = parts.join("")
    } else {
      const lines: string[] = []
      for (let row = 0; row < rows; row++) {
        let line = ""
        for (let col = 0; col < cols; col++) {
          const srcCol = mirror ? cols - 1 - col : col
          const i = (row * cols + srcCol) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          let lum = luma(r, g, b)
          if (invert) lum = 1 - lum
          line += chars[Math.min(len - 1, Math.floor(lum * len))]
        }
        lines.push(line)
      }
      pre.textContent = lines.join("\n")
    }

    /* ── Snapshot every 30 ticks → filmstrip canvas ── */
    tickCount.current++
    if (tickCount.current % 30 === 0 && snap) {
      const snapCtx = snap.getContext("2d")
      if (snapCtx) {
        snap.width  = cols * charW
        snap.height = rows * charH
        snapCtx.fillStyle = "#0a0a0a"
        snapCtx.fillRect(0, 0, snap.width, snap.height)
        snapCtx.font = `${fontSize}px 'Space Mono', monospace`
        snapCtx.textBaseline = "top"
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const srcCol = mirror ? cols - 1 - col : col
            const i = (row * cols + srcCol) * 4
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            let lum = luma(r, g, b)
            if (invert) lum = 1 - lum
            const ch = chars[Math.min(len - 1, Math.floor(lum * len))]
            if (!ch || ch === " ") continue
            snapCtx.fillStyle = colorMode ? `rgb(${r},${g},${b})` : "#e8e8e8"
            snapCtx.fillText(ch, col * charW, row * charH)
          }
        }
        createImageBitmap(snap).then((bitmap) => {
          const hist = frameHistory.current
          if (hist.length >= 10) {
            hist[0].bitmap.close()
            hist.shift()
          }
          const id = tickCount.current
          hist.push({ id, bitmap, snap: snapData })
          // Draw into each filmstrip cell immediately
          hist.forEach((entry, i) => {
            const cell = filmCellRefs.current[i]
            if (!cell) return
            const ctx = cell.getContext("2d")
            if (!ctx) return
            ctx.clearRect(0, 0, cell.width, cell.height)
            ctx.drawImage(entry.bitmap, 0, 0, cell.width, cell.height)
          })
          setHistoryTick((t) => t + 1)
        }).catch(() => { /* ignore */ })
      }
    }

    rafRef.current = requestAnimationFrame(renderLoop)
  }, [])

  /* ── Webcam lifecycle ── */

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const startLoop = useCallback(() => {
    stopLoop()
    rafRef.current = requestAnimationFrame(renderLoop)
  }, [renderLoop, stopLoop])

  const stopWebcam = useCallback(() => {
    stopLoop()
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => { t.stop() })
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [stopLoop])

  const startWebcam = useCallback(async () => {
    imageRef.current = null
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      streamRef.current = stream
      const video = videoRef.current
      if (!video) return
      video.srcObject = stream
      video.playsInline = true
      await video.play().catch(() => { /* autoplay policy */ })

      stream.getVideoTracks()[0].addEventListener("ended", () => {
        onStateChange("error")
        stopLoop()
      })

      onStateChange("live")
      startLoop()
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") onStateChange("denied")
        else onStateChange("error")
      } else {
        onStateChange("error")
      }
    }
  }, [onStateChange, startLoop, stopLoop])

  /* ── Image upload ── */

  const loadImage = useCallback((file: File) => {
    stopWebcam()
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        imageRef.current = img
        onStateChange("live")
        startLoop()
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [stopWebcam, onStateChange, startLoop])

  /* ── SVG export ── */

  const exportSvg = useCallback((override?: FrameSnapshot) => {
    const frame = override ?? lastFrameRef.current
    if (!frame) return
    const { imageData, cols, rows, charW, charH, fontSize, charSetId, colorMode, invert } = frame
    const chars = CHAR_SETS[charSetId] ?? CHAR_SETS.classic
    const len   = chars.length
    const { data } = imageData
    const parts: string[] = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * charW}" height="${rows * charH}" style="background:#0a0a0a">`,
      `<style>text{font-family:'Space Mono',monospace;font-size:${fontSize}px}</style>`,
    ]
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i  = (row * cols + col) * 4
        const r  = data[i]; const g = data[i + 1]; const b = data[i + 2]
        let lum  = luma(r, g, b)
        if (invert) lum = 1 - lum
        const ch = chars[Math.min(len - 1, Math.floor(lum * len))]
        if (!ch || ch === " ") continue
        const fill = colorMode ? `rgb(${r},${g},${b})` : "#e8e8e8"
        const esc  = ch.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        parts.push(`<text x="${col * charW}" y="${row * charH}" fill="${fill}" dominant-baseline="hanging">${esc}</text>`)
      }
    }
    parts.push("</svg>")
    const blob = new Blob([parts.join("")], { type: "image/svg+xml" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url
    a.download = `ascii-lens-${Date.now()}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  /* ── Expose handle ── */

  useImperativeHandle(ref, () => ({
    startWebcam,
    stopWebcam,
    loadImage,
    exportSvg,
  }), [startWebcam, stopWebcam, loadImage, exportSvg])

  /* ── Offscreen canvases (created once) ── */

  useEffect(() => {
    offRef.current  = document.createElement("canvas")
    snapRef.current = document.createElement("canvas")
  }, [])

  /* ── Visibility pause/resume ── */

  useEffect(() => {
    const onVisibility = () => {
      if (!active) return
      if (document.visibilityState === "hidden") stopLoop()
      else startLoop()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [active, startLoop, stopLoop])

  /* ── Cleanup on unmount ── */

  useEffect(() => {
    return () => {
      stopWebcam()
      frameHistory.current.forEach((f) => { f.bitmap.close() })
      frameHistory.current = []
    }
  }, [stopWebcam])

  const filmCellRefs = useRef<(HTMLCanvasElement | null)[]>([])

  const hist = frameHistory.current
  const showFilmstrip = hist.length > 0

  const { cols, charSetId } = settings

  return (
    <div className={styles.container} style={style}>
      <video ref={videoRef} className={styles.hiddenVideo} muted playsInline />

      <div ref={containerRef} className={styles.textWrap}>
        <pre ref={preRef} className={styles.text} aria-live="off" />
        <div className={styles.badge}>
          {cols}c · {charSetId.toUpperCase()}
        </div>
      </div>

      {showFilmstrip && (
        <div className={styles.filmstrip}>
          {hist.map((entry, i) => (
            <canvas
              key={entry.id}
              ref={(el) => { filmCellRefs.current[i] = el }}
              className={styles.filmCell}
              data-latest={i === hist.length - 1 ? "" : undefined}
              width={80}
              height={60}
              title={`Frame ${i + 1} — click to export as SVG`}
              onClick={() => exportSvg(entry.snap)}
            />
          ))}
        </div>
      )}

      <div className={styles.statusBar}>
        <span className={styles.statusItem}>COLS {cols}</span>
        <span className={styles.statusDivider}>·</span>
        <span className={styles.statusItem}>{charSetId.toUpperCase()}</span>
        {showFilmstrip && (
          <>
            <span className={styles.statusDivider}>·</span>
            <span className={styles.statusItem}>{hist.length} FRAMES CAPTURED</span>
          </>
        )}
        <span className={styles.statusSpacer} />
        <span className={styles.statusItem}>CLICK FILMSTRIP TO EXPORT</span>
      </div>
    </div>
  )
})
