"use client";

import type { PixelGridState, Tool, GridSize } from "@/lib/pixel-grid/types";
import { SectionLabel, SectionPrompt } from "@/design-system";
import { SidebarShell } from "../SidebarShell";
import styles from "./PixelGridSidebar.module.css";

const TOOLS: { id: Tool; label: string; key: string }[] = [
  { id: "pencil", label: "Pencil", key: "P" },
  { id: "eraser", label: "Eraser", key: "E" },
  { id: "fill", label: "Fill", key: "F" },
  { id: "eyedropper", label: "Eyedropper", key: "I" },
  { id: "line", label: "Line", key: "L" },
  { id: "rect", label: "Rectangle", key: "R" },
];

const GRID_SIZES: GridSize[] = [16, 32, 64];

type Props = {
  tool: PixelGridState["tool"];
  gridSize: PixelGridState["gridSize"];
  palette: PixelGridState["palette"];
  activePaletteIndex: PixelGridState["activePaletteIndex"];
  undoCount: number;
  redoCount: number;
  confirmNew: boolean;
  onToolChange: (t: Tool) => void;
  onGridSizeChange: (s: GridSize) => void;
  onPaletteIndexChange: (i: number) => void;
  onResetPalette: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onNewCanvas: () => void;
};

export function PixelGridSidebar({
  tool,
  gridSize,
  palette,
  activePaletteIndex,
  undoCount,
  redoCount,
  confirmNew,
  onToolChange,
  onGridSizeChange,
  onPaletteIndexChange,
  onResetPalette,
  onUndo,
  onRedo,
  onNewCanvas,
}: Props) {
  return (
    <SidebarShell
      width="var(--nd-sidebar-width-sm)"
      header={
        <>
          <SectionPrompt path="./pixel-grid" />
          <div className={styles.title}>Pixel Grid</div>
          <div className={styles.desc}>Dot-matrix pixel art editor</div>
        </>
      }
      footer={
        <button
          type="button"
          className={`${styles.newBtn} ${confirmNew ? styles.newBtnConfirm : ""}`}
          onClick={onNewCanvas}
        >
          {confirmNew ? "Press again to clear" : "New canvas"}
        </button>
      }
    >
      {/* Tools */}
      <section className={styles.section}>
        <SectionLabel>Tools</SectionLabel>
        <div className={styles.toolList}>
          {TOOLS.map((t) => (
            <button
              type="button"
              key={t.id}
              className={`${styles.toolBtn} ${tool === t.id ? styles.toolBtnActive : ""}`}
              onClick={() => onToolChange(t.id)}
            >
              <div className={styles.toolDot} />
              {t.label}
              <span className={styles.toolKey}>{t.key}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid size */}
      <section className={styles.section}>
        <SectionLabel>Grid</SectionLabel>
        <div className={styles.gridSizes}>
          {GRID_SIZES.map((s) => (
            <button
              type="button"
              key={s}
              className={`${styles.sizeBtn} ${gridSize === s ? styles.sizeBtnActive : ""}`}
              onClick={() => onGridSizeChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Palette */}
      <section className={styles.section}>
        <SectionLabel>Palette</SectionLabel>
        <div className={styles.paletteGrid}>
          {palette.map((color, i) => (
            <button
              type="button"
              key={color}
              className={`${styles.swatch} ${activePaletteIndex === i ? styles.swatchActive : ""}`}
              style={{ background: color === "#000000" ? "#000" : color }}
              title={color}
              onClick={() => onPaletteIndexChange(i)}
              aria-label={`Select colour ${color}`}
            />
          ))}
        </div>
        <div className={styles.activeHex}>{palette[activePaletteIndex]}</div>
        <button type="button" className={styles.resetBtn} onClick={onResetPalette}>
          Clear frame
          <span className={styles.toolKey}>X</span>
        </button>
      </section>

      {/* History */}
      <section className={styles.section}>
        <SectionLabel>History</SectionLabel>
        <div className={styles.historyRow}>
          <button
            type="button"
            className={styles.historyBtn}
            disabled={undoCount === 0}
            onClick={onUndo}
          >
            ↩ {undoCount}
          </button>
          <button
            type="button"
            className={styles.historyBtn}
            disabled={redoCount === 0}
            onClick={onRedo}
          >
            ↪ {redoCount}
          </button>
        </div>
      </section>
    </SidebarShell>
  );
}
