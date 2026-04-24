"use client";

import { useRef, useEffect, useState } from "react";
import { drawPreview } from "@/lib/pixel-grid/canvas";
import type { PixelGridState } from "@/lib/pixel-grid/types";
import {
  exportPNG,
  exportSpriteSheet,
  exportSVG,
  exportAnimatedSVG,
  copyAsCSS,
} from "@/lib/pixel-grid/export";
import styles from "./PreviewPanel.module.css";

type Props = {
  frames: PixelGridState["frames"];
  activeFrame: number;
  gridSize: number;
  palette: string[];
  playing: boolean;
  fps: number;
  tool: string;
  activePaletteIndex: number;
  onPlayToggle: () => void;
  onFpsChange: (fps: number) => void;
};

export function PreviewPanel({
  frames,
  activeFrame,
  gridSize,
  palette,
  playing,
  fps,
  tool,
  activePaletteIndex,
  onPlayToggle,
  onFpsChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playFrameRef = useRef(activeFrame);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  // Static preview (not playing)
  useEffect(() => {
    if (playing) return;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const frame = frames[activeFrame];
    if (!frame) return;
    drawPreview(ctx, frame, gridSize, palette);
  }, [frames, activeFrame, gridSize, palette, playing]);

  // Animation playback
  useEffect(() => {
    if (!playing) return;
    if (!frames.length) return;
    playFrameRef.current = activeFrame;
    const interval = 1000 / fps;
    const id = setInterval(() => {
      playFrameRef.current = (playFrameRef.current + 1) % frames.length;
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      drawPreview(ctx, frames[playFrameRef.current], gridSize, palette);
    }, interval);
    return () => clearInterval(id);
  }, [playing, fps, frames, gridSize, palette]);

  const showMsg = (msg: string) => {
    setExportMsg(msg);
    setTimeout(() => setExportMsg(null), 2000);
  };

  const frame = frames[activeFrame];
  if (!frame) return <div className={styles.panel} />;

  const exportActions = [
    {
      label: "↓ PNG 1×",
      action: () =>
        exportPNG(frame, gridSize, palette, Math.floor(512 / gridSize)),
    },
    {
      label: "↓ PNG 8×",
      action: () => exportPNG(frame, gridSize, palette, 8),
    },
    {
      label: "↓ Sprite Sheet",
      action: () => exportSpriteSheet(frames, gridSize, palette, 8),
    },
    {
      label: "↓ SVG",
      action: () => exportSVG(frame, gridSize, palette),
    },
    {
      label: "↓ Animated SVG",
      action: () => exportAnimatedSVG(frames, gridSize, palette, fps),
    },
    {
      label: "⌥ Copy CSS",
      action: async () => {
        await copyAsCSS(frame, gridSize, palette);
        showMsg("CSS copied to clipboard");
      },
    },
  ];

  return (
    <div className={styles.panel}>
      {/* Preview canvas */}
      <section className={styles.section}>
        <span className={styles.label}>Preview</span>
        <div className={styles.previewWrap}>
          <canvas
            ref={canvasRef}
            width={240}
            height={240}
            className={styles.previewCanvas}
          />
        </div>

        {/* Playback */}
        <button
          className={`${styles.playBtn} ${playing ? styles.playBtnActive : ""}`}
          onClick={onPlayToggle}
        >
          {playing ? "■ Stop" : "▶ Play"}
        </button>
        <div className={styles.fpsRow}>
          <span className={styles.label}>FPS</span>
          <input
            type="range"
            min={1}
            max={24}
            value={fps}
            onChange={(e) => onFpsChange(Number(e.target.value))}
            className={styles.fpsSlider}
          />
          <span className={styles.fpsValue}>{fps}</span>
        </div>
      </section>

      {/* Export */}
      <section className={styles.section}>
        <span className={styles.label}>Export</span>
        <div className={styles.exportList}>
          {exportActions.map(({ label, action }) => (
            <button key={label} className={styles.exportBtn} onClick={action}>
              {label}
            </button>
          ))}
        </div>
        {exportMsg && <div className={styles.exportMsg}>{exportMsg}</div>}
      </section>

      {/* Status */}
      <section className={`${styles.section} ${styles.status}`}>
        {[
          { k: "GRID", v: `${gridSize}×${gridSize}` },
          { k: "TOOL", v: tool.toUpperCase() },
          { k: "COLOUR", v: palette[activePaletteIndex] },
          { k: "FRAME", v: `${activeFrame + 1} / ${frames.length}` },
        ].map(({ k, v }) => (
          <div key={k} className={styles.statusRow}>
            <span className={styles.statusKey}>{k}</span>
            <span className={styles.statusVal}>{v}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
