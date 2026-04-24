"use client";

import type { PixelGridState, Tool, GridSize } from "@/lib/pixel-grid/types";
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
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbAccent}>&gt;</span>
          <span className={styles.breadcrumbPath}>./pixel-grid</span>
        </div>
        <div className={styles.title}>Pixel Grid</div>
        <div className={styles.desc}>Dot-matrix pixel art editor</div>
      </div>

      <div className={styles.body}>
        {/* Tools */}
        <section className={styles.section}>
          <span className={styles.label}>Tools</span>
          <div className={styles.toolList}>
            {TOOLS.map((t) => (
              <button
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
          <span className={styles.label}>Grid</span>
          <div className={styles.gridSizes}>
            {GRID_SIZES.map((s) => (
              <button
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
          <span className={styles.label}>Palette</span>
          <div className={styles.paletteGrid}>
            {palette.map((color, i) => (
              <button
                key={i}
                className={`${styles.swatch} ${activePaletteIndex === i ? styles.swatchActive : ""}`}
                style={{ background: color === "#000000" ? "#000" : color }}
                title={color}
                onClick={() => onPaletteIndexChange(i)}
                aria-label={`Select colour ${color}`}
              />
            ))}
          </div>
          <div className={styles.activeHex}>{palette[activePaletteIndex]}</div>
          <button className={styles.resetBtn} onClick={onResetPalette}>
            Clear frame
            <span className={styles.toolKey}>X</span>
          </button>
        </section>

        {/* History */}
        <section className={styles.section}>
          <span className={styles.label}>History</span>
          <div className={styles.historyRow}>
            <button
              className={styles.historyBtn}
              disabled={undoCount === 0}
              onClick={onUndo}
            >
              ↩ {undoCount}
            </button>
            <button
              className={styles.historyBtn}
              disabled={redoCount === 0}
              onClick={onRedo}
            >
              ↪ {redoCount}
            </button>
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.newBtn} ${confirmNew ? styles.newBtnConfirm : ""}`}
          onClick={onNewCanvas}
        >
          {confirmNew ? "Press again to clear" : "New canvas"}
        </button>
      </div>
    </aside>
  );
}
