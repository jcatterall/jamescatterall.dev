"use client"

import type { PageState, Settings, CharSetId } from "./AsciiLens"
import { CHAR_SETS } from "./AsciiLens"
import styles from "./AsciiSidebar.module.css"

const CHAR_SET_OPTIONS: { id: CharSetId; label: string }[] = [
  { id: "classic", label: "CLASSIC" },
  { id: "blocks",  label: "BLOCKS"  },
  { id: "braille", label: "BRAILLE" },
  { id: "digits",  label: "DIGITS"  },
  { id: "binary",  label: "BINARY"  },
]

type Props = {
  settings: Settings
  onSettingsChange: (s: Settings) => void
  pageState: PageState
  onAllow: () => void
  onStop: () => void
  onUpload: () => void
  onExport: () => void
}

function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <div className={styles.toggleRow}>
      <span className={styles.toggleLabel}>{label}</span>
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={styles.toggle}
        data-checked={value ? "" : undefined}
        onClick={() => onChange(!value)}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  )
}

export function AsciiSidebar({
  settings,
  onSettingsChange,
  pageState,
  onAllow,
  onStop,
  onUpload,
  onExport,
}: Props) {
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    onSettingsChange({ ...settings, [k]: v })

  const isLive = pageState === "live"

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.prompt}>
          <span className={styles.promptCaret}>&gt;</span>
          <span className={styles.promptPath}>./ascii</span>
        </div>
        <div className={styles.title}>ASCII Lens</div>
        <div className={styles.subtitle}>
          Real-time webcam to ASCII art. Runs entirely in the browser.
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Source */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>SOURCE</span>
          <button
            className={styles.sourceBtn}
            data-active={isLive ? "" : undefined}
            data-stop={isLive ? "" : undefined}
            onClick={isLive ? onStop : onAllow}
          >
            <span
              className={styles.sourceDot}
              data-live={isLive ? "" : undefined}
            />
            {isLive ? "STOP WEBCAM" : "ENABLE WEBCAM"}
          </button>
          <button
            className={styles.sourceBtn}
            data-upload={pageState === "upload" ? "" : undefined}
            onClick={onUpload}
          >
            ↑ UPLOAD IMAGE
          </button>
        </div>

        {/* Resolution */}
        <div className={styles.section}>
          <div className={styles.sliderHeader}>
            <span className={styles.sectionLabel}>RESOLUTION</span>
            <span className={styles.sliderValue}>{settings.cols} cols</span>
          </div>
          <input
            type="range"
            className={styles.slider}
            min={40}
            max={200}
            step={4}
            value={settings.cols}
            onChange={(e) => set("cols", Number(e.target.value))}
          />
          <div className={styles.sliderTicks}>
            <span className={styles.sliderTick}>40</span>
            <span className={styles.sliderTick}>200</span>
          </div>
        </div>

        {/* Character set */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>CHARACTER SET</span>
          <div className={styles.charSetPills}>
            {CHAR_SET_OPTIONS.map((cs) => (
              <button
                key={cs.id}
                className={styles.charSetPill}
                data-active={settings.charSetId === cs.id ? "" : undefined}
                onClick={() => set("charSetId", cs.id)}
              >
                {cs.label}
              </button>
            ))}
          </div>
          <div className={styles.charPreview}>
            {CHAR_SETS[settings.charSetId]}
          </div>
        </div>

        {/* Mode toggles */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>MODE</span>
          <Toggle value={settings.colorMode} onChange={(v) => set("colorMode", v)} label="Colour" />
          <Toggle value={settings.invert}    onChange={(v) => set("invert", v)}    label="Invert"  />
          <Toggle value={settings.mirror}    onChange={(v) => set("mirror", v)}    label="Mirror"  />
        </div>
      </div>

      {/* Footer: export */}
      <div className={styles.footer}>
        <button className={styles.exportBtn} onClick={onExport}>
          ↓ EXPORT SVG
        </button>
        <div className={styles.exportHint}>SNAPSHOT · PRESERVES COLOUR MODE</div>
      </div>
    </aside>
  )
}
