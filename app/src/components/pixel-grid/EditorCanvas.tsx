"use client";

import { useRef, forwardRef } from "react";
import styles from "./EditorCanvas.module.css";

type Props = {
  gridSize: number;
  tool: string;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

const CANVAS_SIZE = 600;

export const EditorCanvas = forwardRef<HTMLCanvasElement, Props>(
  function EditorCanvas(
    { tool, onMouseDown, onMouseMove, onMouseUp, onMouseLeave },
    ref,
  ) {
    const cursor =
      tool === "eyedropper"
        ? "crosshair"
        : tool === "fill"
          ? "cell"
          : "default";

    return (
      <div className={styles.wrap}>
        <canvas
          ref={ref}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className={styles.canvas}
          style={{ cursor }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        />
      </div>
    );
  },
);
