"use client"

import type { PageState, Settings, CharSetId } from "./AsciiLens"
import { CHAR_SETS } from "./AsciiLens"
import { SectionLabel, SectionPrompt } from "@/design-system"
import { SidebarShell } from "../SidebarShell"
import { Toggle } from "../Toggle"
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
    <SidebarShell
      header={
        <>
          <SectionPrompt path="./ascii" />
          <div className={styles.title}>ASCII Lens</div>
          <div className={styles.subtitle}>
            Real-time webcam to ASCII art. Runs entirely in the browser.
          </div>
        </>
      }
      footer={
        <>
          <button type="button" className={styles.exportBtn} onClick={onExport}>
            ↓ EXPORT SVG
          </button>
          <div className={styles.exportHint}>SNAPSHOT · PRESERVES COLOUR MODE</div>
        </>
      }
    >
      {/* Source */}
      <div className={styles.section}>
        <SectionLabel>SOURCE</SectionLabel>
        <button
          className={styles.sourceBtn}
          type="button"
          data-active={isLive ? "" : undefined}
          data-stop={isLive ? "" : undefined}
          onClick={isLive ? onStop : onAllow}
        >
          <span
            className={styles.sourceDot}
            data-live={isLive ? "" : undefined}
          />
          {isLive ? "STOP CAMERA" : "ENABLE CAMERA"}
        </button>
        <button
          className={styles.sourceBtn}
          type="button"
          data-upload={pageState === "upload" ? "" : undefined}
          onClick={onUpload}
        >
          ↑ UPLOAD IMAGE
        </button>
      </div>

      {/* Resolution */}
      <div className={styles.section}>
        <div className={styles.sliderHeader}>
          <SectionLabel>RESOLUTION</SectionLabel>
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
        <SectionLabel>CHARACTER SET</SectionLabel>
        <div className={styles.charSetPills}>
          {CHAR_SET_OPTIONS.map((cs) => (
            <button
              key={cs.id}
              type="button"
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
        <SectionLabel>MODE</SectionLabel>
        <Toggle value={settings.colorMode} onChange={(v) => set("colorMode", v)} label="Colour" />
        <Toggle value={settings.invert}    onChange={(v) => set("invert", v)}    label="Invert"  />
        <Toggle value={settings.mirror}    onChange={(v) => set("mirror", v)}    label="Mirror"  />
      </div>
    </SidebarShell>
  )
}
