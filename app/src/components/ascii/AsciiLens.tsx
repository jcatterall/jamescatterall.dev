"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { AsciiSidebar } from "./AsciiSidebar"
import { AsciiCanvas, type AsciiCanvasHandle } from "./AsciiCanvas"
import styles from "./AsciiLens.module.css"

/* ── Types ── */

export type PageState = "idle" | "requesting" | "live" | "denied" | "error" | "upload"

export type CharSetId = "classic" | "blocks" | "braille" | "digits" | "binary"

export const CHAR_SETS: Record<CharSetId, string> = {
  classic: " .:-=+*#%@",
  blocks:  " ░▒▓█",
  braille: " ⠁⠃⠇⠏⠟⠿⣿",
  digits:  " 1234567890",
  binary:  " 01",
}

export type Settings = {
  cols: number
  charSetId: CharSetId
  colorMode: boolean
  invert: boolean
  mirror: boolean
}

/* ── Permission / Idle screen ── */

function IdleScreen({
  state,
  onAllow,
  onUpload,
}: {
  state: PageState
  onAllow: () => void
  onUpload: () => void
}) {
  if (state === "denied") {
    return (
      <div className={styles.idleScreen}>
        <div className={styles.idleDotGrid} />
        <div className={styles.idleContent}>
          <div className={styles.idleIcon}>
            <div className={styles.idleIconLens} />
            <div className={styles.idleIconDot} />
          </div>
          <div className={styles.idleHeading}>CAMERA ACCESS DENIED</div>
          <p className={styles.idleBody}>
            Permission was denied. Allow camera access in your browser settings and reload the page.
          </p>
          <button className={styles.idleBtnSecondary} onClick={onUpload}>
            USE IMAGE INSTEAD
          </button>
        </div>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className={styles.idleScreen}>
        <div className={styles.idleDotGrid} />
        <div className={styles.idleContent}>
          <div className={styles.idleIcon}>
            <div className={styles.idleIconLens} />
            <div className={styles.idleIconDot} style={{ background: "var(--nd-warning)" }} />
          </div>
          <div className={styles.idleHeading}>NO CAMERA FOUND</div>
          <p className={styles.idleBody}>
            No video input device was detected. Try uploading a static image instead.
          </p>
          <button className={styles.idleBtnSecondary} onClick={onUpload}>
            USE IMAGE INSTEAD
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.idleScreen}>
      <div className={styles.idleDotGrid} />
      <div className={styles.idleContent}>
        <div className={styles.idleCamera}>
          <div className={styles.idleCameraLens}>
            <div className={styles.idleCameraInner} />
          </div>
          <div className={styles.idleCameraShutter} />
          <div className={styles.idleCameraRec} />
        </div>
        <div className={styles.idleHeading}>CAMERA ACCESS REQUIRED</div>
        <p className={styles.idleBody}>
          ASCII Lens uses your webcam to render a live ASCII art feed. No data leaves your browser.
        </p>
        <div className={styles.idleActions}>
          <button className={styles.idleBtnPrimary} onClick={onAllow}>
            ENABLE CAMERA
          </button>
          <button className={styles.idleBtnSecondary} onClick={onUpload}>
            USE IMAGE INSTEAD
          </button>
        </div>
        <div className={styles.idleFootnote}>
          HTTPS REQUIRED · NO SERVER · NO STORAGE
        </div>
      </div>
    </div>
  )
}

/* ── Upload drop zone ── */

function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith("image/")) onFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div className={styles.uploadZone}>
      <div
        className={styles.uploadDrop}
        data-dragging={dragging ? "" : undefined}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <span className={styles.uploadArrow} data-dragging={dragging ? "" : undefined}>↑</span>
        <span className={styles.uploadLabel}>
          {dragging ? "DROP TO PROCESS" : "DRAG & DROP IMAGE"}
        </span>
        <span className={styles.uploadHint}>or click to browse — PNG, JPG, WebP</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

/* ── Main component ── */

export function AsciiLens() {
  const [pageState, setPageState] = useState<PageState>("idle")
  const [settings, setSettings] = useState<Settings>({
    cols: 80,
    charSetId: "classic",
    colorMode: false,
    invert: false,
    mirror: true,
  })
  const canvasRef = useRef<AsciiCanvasHandle>(null)

  const handleAllow = useCallback(() => {
    setPageState("requesting")
  }, [])

  useEffect(() => {
    if (pageState === "requesting") {
      canvasRef.current?.startWebcam()
    }
  }, [pageState])

  // Auto-start if permission was already granted in a previous session
  useEffect(() => {
    if (typeof navigator.permissions === "undefined") return
    navigator.permissions.query({ name: "camera" as PermissionName }).then((status) => {
      if (status.state === "granted") setPageState("requesting")
    }).catch(() => { /* API not supported */ })
  }, [])

  const handleUpload = useCallback(() => {
    setPageState("upload")
  }, [])

  const handleFile = useCallback((file: File) => {
    setPageState("live")
    canvasRef.current?.loadImage(file)
  }, [])

  const handleStateChange = useCallback((s: PageState) => {
    setPageState(s)
  }, [])

  const handleStop = useCallback(() => {
    canvasRef.current?.stopWebcam()
    setPageState("idle")
  }, [])

  const handleExport = useCallback(() => {
    canvasRef.current?.exportSvg()
  }, [])

  const isLive = pageState === "live"

  return (
    <div className={styles.layout}>
      <AsciiSidebar
        settings={settings}
        onSettingsChange={setSettings}
        pageState={pageState}
        onAllow={handleAllow}
        onStop={handleStop}
        onUpload={handleUpload}
        onExport={handleExport}
      />

      <div className={styles.main}>
        {(pageState === "idle" || pageState === "requesting" || pageState === "denied" || pageState === "error") && (
          <IdleScreen state={pageState} onAllow={handleAllow} onUpload={handleUpload} />
        )}
        {pageState === "upload" && (
          <UploadZone onFile={handleFile} />
        )}
        <AsciiCanvas
          ref={canvasRef}
          settings={settings}
          active={isLive}
          onStateChange={handleStateChange}
          style={{ display: isLive ? undefined : "none" }}
        />
      </div>
    </div>
  )
}
