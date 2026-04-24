"use client";

import { useRef } from "react";
import type { Block } from "./SessionTimer";
import styles from "./Receipt.module.css";

/* ── Helpers ── */

function fmtDur(ms: number) {
  const m = Math.floor(ms / 60000);
  return `${m}m`;
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtDate(ts: number) {
  return new Date(ts)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

const TYPE_LABEL: Record<string, string> = {
  focus: "FOCUS",
  short_break: "SHORT BRK",
  long_break: "LONG BRK",
};

/* ── Timeline strip ── */

type CellData = { phase: "focus" | "break" | "idle" };

function buildCells(blocks: Block[]): CellData[] {
  if (blocks.length === 0) return [];
  const sessionStart = blocks[0].startedAt;
  const sessionEnd = blocks[blocks.length - 1].endedAt;
  const totalMins = Math.ceil((sessionEnd - sessionStart) / 60000);
  return Array.from({ length: totalMins }, (_, i) => {
    const t = sessionStart + i * 60000;
    const block = blocks.find((b) => b.startedAt <= t && b.endedAt > t);
    if (!block) return { phase: "idle" as const };
    return {
      phase: block.phase === "focus" ? ("focus" as const) : ("break" as const),
    };
  });
}

/* ── PNG export ── */

function exportAsPng(receiptEl: HTMLElement | null) {
  if (!receiptEl) return;
  const { offsetWidth: w, offsetHeight: h } = receiptEl;
  const canvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  // Draw background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);

  // Notify user — full DOM-to-canvas would require html2canvas; we do a simple fallback
  const msg =
    "For full PNG fidelity, use your browser's screenshot tool on the receipt. (html2canvas not installed)";
  alert(msg);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-receipt-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

/* ── Props ── */

type Props = {
  blocks: Block[];
  onClose: () => void;
  onNew: () => void;
};

/* ── Component ── */

export function Receipt({ blocks, onClose, onNew }: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const focusBlocks = blocks.filter((b) => b.phase === "focus");
  const breakBlocks = blocks.filter((b) => b.phase !== "focus");
  const totalFocus = focusBlocks.reduce(
    (a, b) => a + (b.endedAt - b.startedAt),
    0,
  );
  const totalBreak = breakBlocks.reduce(
    (a, b) => a + (b.endedAt - b.startedAt),
    0,
  );
  const sessionStart = blocks[0]?.startedAt ?? Date.now();
  const sessionEnd = blocks[blocks.length - 1]?.endedAt ?? Date.now();
  const cells = buildCells(blocks);

  const stats = [
    { label: "FOCUS SESSIONS", value: String(focusBlocks.length) },
    { label: "FOCUSED TIME", value: fmtDur(totalFocus) },
    { label: "BREAK TIME", value: fmtDur(totalBreak) },
    { label: "TOTAL ELAPSED", value: fmtDur(sessionEnd - sessionStart) },
  ];

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Session receipt"
    >
      <div className={styles.card} ref={receiptRef}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.receiptLabel}>SESSION RECEIPT</div>
          <div className={styles.receiptDate}>{fmtDate(sessionStart)}</div>
        </div>

        {/* Stats grid */}
        <div className={styles.statsGrid}>
          {stats.map(({ label, value }) => (
            <div key={label} className={styles.stat}>
              <div className={styles.statLabel}>{label}</div>
              <div className={styles.statValue}>{value}</div>
            </div>
          ))}
        </div>

        {/* Timeline strip */}
        {cells.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              TIMELINE — 1 CELL PER MINUTE
            </div>
            <div className={styles.timeline}>
              {cells.map((c, i) => (
                <div key={i} className={styles.cell} data-phase={c.phase} />
              ))}
            </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={styles.legendSwatch} data-focus="" />
                <span className={styles.legendLabel}>FOCUS</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendSwatch} data-break="" />
                <span className={styles.legendLabel}>BREAK</span>
              </div>
            </div>
          </div>
        )}

        {/* Block log */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>BLOCK LOG</div>
          <div className={styles.logHeader}>
            {["START", "END", "DUR", "TYPE"].map((h) => (
              <div key={h} className={styles.logHeaderCell}>
                {h}
              </div>
            ))}
          </div>
          {blocks.map((b, i) => (
            <div key={i} className={styles.logRow}>
              <div className={styles.logCell}>{fmtTime(b.startedAt)}</div>
              <div className={styles.logCell}>{fmtTime(b.endedAt)}</div>
              <div className={styles.logCellBright}>
                {fmtDur(b.endedAt - b.startedAt)}
              </div>
              <div
                className={styles.logCellType}
                data-focus={b.phase === "focus" ? "" : undefined}
              >
                {TYPE_LABEL[b.phase]}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.btnNew} onClick={onNew}>
            NEW SESSION
          </button>
          <button className={styles.btnClose} onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
