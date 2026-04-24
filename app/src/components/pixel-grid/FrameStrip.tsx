"use client";

import { useRef, useState } from "react";
import { FrameThumb } from "./FrameThumb";
import { cloneFrames } from "@/lib/pixel-grid/helpers";
import type { PixelGridState } from "@/lib/pixel-grid/types";
import styles from "./FrameStrip.module.css";

type Props = {
  frames: PixelGridState["frames"];
  activeFrame: number;
  gridSize: number;
  palette: string[];
  onActivate: (index: number) => void;
  onDelete: (index: number) => void;
  onDuplicate: (index: number) => void;
  onAddEmpty: () => void;
  onReorder: (from: number, to: number) => void;
};

export function FrameStrip({
  frames,
  activeFrame,
  gridSize,
  palette,
  onActivate,
  onDelete,
  onDuplicate,
  onAddEmpty,
  onReorder,
}: Props) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);

  return (
    <div className={styles.strip}>
      <span className={styles.label}>Frames</span>

      {frames.map((frame, i) => (
        <FrameThumb
          key={i}
          frame={frame}
          gridSize={gridSize}
          palette={palette}
          active={i === activeFrame}
          index={i}
          onClick={() => onActivate(i)}
          onDelete={() => onDelete(i)}
          onDuplicate={frames.length < 16 ? () => onDuplicate(i) : null}
          draggable
          onDragStart={() => setDragFrom(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragFrom !== null && dragFrom !== i) {
              onReorder(dragFrom, i);
            }
            setDragFrom(null);
          }}
        />
      ))}

      {frames.length < 16 && (
        <button
          className={styles.addBtn}
          onClick={onAddEmpty}
          aria-label="New empty frame"
          title="New empty frame"
        >
          +
        </button>
      )}

      <span className={styles.count}>{frames.length} / 16 FRAMES</span>
    </div>
  );
}
