"use client";

import { useEffect, useRef } from "react";
import { drawThumb } from "@/lib/pixel-grid/canvas";
import styles from "./FrameThumb.module.css";

type Props = {
  frame: Uint8Array;
  gridSize: number;
  palette: string[];
  active: boolean;
  index: number;
  onClick: () => void;
  onDelete: (() => void) | null;
  onDuplicate: (() => void) | null;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
};

export function FrameThumb({
  frame,
  gridSize,
  palette,
  active,
  index,
  onClick,
  onDelete,
  onDuplicate,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    drawThumb(ctx, frame, gridSize, palette);
  }, [frame, gridSize, palette]);

  return (
    <div
      className={`${styles.thumb} ${active ? styles.active : ""}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={styles.main}>
        <canvas
          ref={canvasRef}
          width={72}
          height={72}
          className={styles.canvas}
        />
        <div className={styles.footer}>
          <span className={styles.index}>{index + 1}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate?.();
          }}
          disabled={!onDuplicate}
          aria-label={`Duplicate frame ${index + 1}`}
          title="Duplicate after"
        >
          ⧉
        </button>
        <button
          className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          disabled={!onDelete}
          aria-label={`Delete frame ${index + 1}`}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
