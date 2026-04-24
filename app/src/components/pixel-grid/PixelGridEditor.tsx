"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { PixelGridState, Tool, GridSize } from "@/lib/pixel-grid/types";
import {
  cloneFrame,
  cloneFrames,
  floodFill,
  linePoints,
  makeFrame,
  scaleFrame,
  SYSTEM_PALETTE,
} from "@/lib/pixel-grid/helpers";
import {
  loadState,
  saveState,
  makeDefault,
  LS_KEY,
  pushUndo,
} from "@/lib/pixel-grid/persistence";
import { drawGrid } from "@/lib/pixel-grid/canvas";

import { EditorCanvas } from "./EditorCanvas";
import { PixelGridSidebar } from "./PixelGridSidebar";
import { PreviewPanel } from "./PreviewPanel";
import { FrameStrip } from "./FrameStrip";
import { KeyboardLegend } from "./KeyboardLegend";
import { Modal } from "@/design-system";
import styles from "./PixelGridEditor.module.css";

const CANVAS_SIZE = 600;

export function PixelGridEditor() {
  const [st, setStRaw] = useState<PixelGridState>(
    () => loadState() ?? makeDefault(),
  );
  const [hoverCell, setHoverCell] = useState<{
    col: number;
    row: number;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{
    col: number;
    row: number;
    idx: number;
  } | null>(null);
  const [previewFrame, setPreviewFrame] = useState<Uint8Array | null>(null);
  const [confirmNew, setConfirmNew] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [scaleModal, setScaleModal] = useState<GridSize | null>(null);
  const confirmNewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editorRef = useRef<HTMLCanvasElement>(null);

  const setSt = useCallback((fn: (prev: PixelGridState) => PixelGridState) => {
    setStRaw((prev) => {
      const next = fn(prev);
      saveState(next);
      return next;
    });
  }, []);

  // Draw editor grid
  useEffect(() => {
    if (!editorRef.current) return;
    const ctx = editorRef.current.getContext("2d");
    if (!ctx) return;
    const frame = previewFrame ?? st.frames[st.activeFrame];
    if (!frame) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;
    }
    const cellSize = CANVAS_SIZE / st.gridSize;
    drawGrid({
      ctx,
      frame,
      gridSize: st.gridSize,
      palette: st.palette,
      cellSize,
      hoverCell,
      tool: st.tool,
      activePaletteIndex: st.activePaletteIndex,
    });
  }, [
    st.frames,
    st.activeFrame,
    st.gridSize,
    st.palette,
    st.activePaletteIndex,
    hoverCell,
    st.tool,
    previewFrame,
  ]);

  // Cell from mouse event
  const cellFromEvent = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = editorRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;
      const cellSize = canvas.width / st.gridSize;
      const col = Math.floor(px / cellSize);
      const row = Math.floor(py / cellSize);
      if (col < 0 || col >= st.gridSize || row < 0 || row >= st.gridSize)
        return null;
      return { col, row, idx: row * st.gridSize + col };
    },
    [st.gridSize],
  );

  const applyUndo = useCallback(() => {
    setSt((prev) => {
      if (!prev.undoStack.length) return prev;
      const snap = prev.undoStack[prev.undoStack.length - 1];
      return {
        ...prev,
        frames: cloneFrames(snap),
        undoStack: prev.undoStack.slice(0, -1),
        redoStack: [...prev.redoStack, cloneFrames(prev.frames)],
      };
    });
  }, [setSt]);

  const applyRedo = useCallback(() => {
    setSt((prev) => {
      if (!prev.redoStack.length) return prev;
      const snap = prev.redoStack[prev.redoStack.length - 1];
      return {
        ...prev,
        frames: cloneFrames(snap),
        redoStack: prev.redoStack.slice(0, -1),
        undoStack: [...prev.undoStack, cloneFrames(prev.frames)],
      };
    });
  }, [setSt]);

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        applyUndo();
        return;
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        ((e.shiftKey && (e.key === "z" || e.key === "Z")) ||
          e.key === "y" ||
          e.key === "Y")
      ) {
        e.preventDefault();
        applyRedo();
        return;
      }

      const toolMap: Record<string, Tool> = {
        p: "pencil",
        P: "pencil",
        e: "eraser",
        E: "eraser",
        f: "fill",
        F: "fill",
        i: "eyedropper",
        I: "eyedropper",
        l: "line",
        L: "line",
        r: "rect",
        R: "rect",
      };
      if (toolMap[e.key]) {
        setSt((prev) => ({ ...prev, tool: toolMap[e.key] }));
        return;
      }

      if (e.key === "?") {
        setShowLegend((v) => !v);
        return;
      }

      if (e.key === "[") {
        setSt((prev) => ({
          ...prev,
          activePaletteIndex: Math.max(0, prev.activePaletteIndex - 1),
        }));
      }
      if (e.key === "]") {
        setSt((prev) => ({
          ...prev,
          activePaletteIndex: Math.min(
            prev.palette.length - 1,
            prev.activePaletteIndex + 1,
          ),
        }));
      }
      if (e.key === ",") {
        setSt((prev) => ({
          ...prev,
          activeFrame: Math.max(0, prev.activeFrame - 1),
        }));
      }
      if (e.key === ".") {
        setSt((prev) => ({
          ...prev,
          activeFrame: Math.min(prev.frames.length - 1, prev.activeFrame + 1),
        }));
      }
      if (e.key === "x" || e.key === "X") {
        setSt((prev) => {
          const frames = [...prev.frames];
          frames[prev.activeFrame] = makeFrame(prev.gridSize);
          return { ...prev, frames };
        });
      }
      if ((e.key === "n" || e.key === "N") && !e.ctrlKey && !e.metaKey) {
        setSt((prev) => {
          if (prev.frames.length >= 16) return prev;
          return {
            ...prev,
            frames: [...prev.frames, makeFrame(prev.gridSize)],
            activeFrame: prev.frames.length,
          };
        });
      }
      if ((e.key === "d" || e.key === "D") && !e.ctrlKey && !e.metaKey) {
        setSt((prev) => {
          if (prev.frames.length >= 16) return prev;
          const frames = [...prev.frames];
          frames.splice(
            prev.activeFrame + 1,
            0,
            cloneFrame(prev.frames[prev.activeFrame]),
          );
          return {
            ...prev,
            frames,
            activeFrame: prev.activeFrame + 1,
          };
        });
      }
      if (e.key === "Delete") {
        setSt((prev) => {
          const frames = prev.frames.filter((_, i) => i !== prev.activeFrame);
          return {
            ...prev,
            frames,
            activeFrame: Math.max(
              0,
              Math.min(prev.activeFrame, frames.length - 1),
            ),
            undoStack: [],
            redoStack: [],
          };
        });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [applyUndo, applyRedo, setSt]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const cell = cellFromEvent(e);
      if (!cell) return;
      setDragging(true);
      setDragStart(cell);

      const frame = st.frames[st.activeFrame];
      if (!frame) return;

      if (st.tool === "pencil" || st.tool === "eraser") {
        const palIdx = st.tool === "eraser" ? 0 : st.activePaletteIndex;
        setSt((prev) => {
          const next = cloneFrame(prev.frames[prev.activeFrame]);
          next[cell.idx] = palIdx;
          const frames = cloneFrames(prev.frames);
          frames[prev.activeFrame] = next;
          return { ...prev, frames, ...pushUndo(prev) };
        });
      } else if (st.tool === "fill") {
        const target = frame[cell.idx];
        const nextFrame = floodFill(
          frame,
          st.gridSize,
          cell.idx,
          target,
          st.activePaletteIndex,
        );
        setSt((prev) => {
          const frames = cloneFrames(prev.frames);
          frames[prev.activeFrame] = nextFrame;
          return { ...prev, frames, ...pushUndo(prev) };
        });
      } else if (st.tool === "eyedropper") {
        const palIdx = frame[cell.idx];
        setSt((prev) => ({
          ...prev,
          activePaletteIndex: palIdx,
          tool: "pencil",
        }));
      }
    },
    [cellFromEvent, st, setSt],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const cell = cellFromEvent(e);
      setHoverCell(cell);
      if (!dragging || !cell || !dragStart) return;

      const frame = st.frames[st.activeFrame];
      if (!frame) return;

      if (st.tool === "pencil" || st.tool === "eraser") {
        const palIdx = st.tool === "eraser" ? 0 : st.activePaletteIndex;
        setSt((prev) => {
          const frames = cloneFrames(prev.frames);
          const next = cloneFrame(frames[prev.activeFrame]);
          next[cell.idx] = palIdx;
          frames[prev.activeFrame] = next;
          return { ...prev, frames };
        });
      } else if (st.tool === "line") {
        const pts = linePoints(
          dragStart.col,
          dragStart.row,
          cell.col,
          cell.row,
        );
        const preview = cloneFrame(frame);
        pts.forEach(([c, r]) => {
          preview[r * st.gridSize + c] = st.activePaletteIndex;
        });
        setPreviewFrame(preview);
      } else if (st.tool === "rect") {
        const minC = Math.min(dragStart.col, cell.col);
        const maxC = Math.max(dragStart.col, cell.col);
        const minR = Math.min(dragStart.row, cell.row);
        const maxR = Math.max(dragStart.row, cell.row);
        const preview = cloneFrame(frame);
        for (let c = minC; c <= maxC; c++) {
          preview[minR * st.gridSize + c] = st.activePaletteIndex;
          preview[maxR * st.gridSize + c] = st.activePaletteIndex;
        }
        for (let r = minR; r <= maxR; r++) {
          preview[r * st.gridSize + minC] = st.activePaletteIndex;
          preview[r * st.gridSize + maxC] = st.activePaletteIndex;
        }
        setPreviewFrame(preview);
      }
    },
    [cellFromEvent, dragging, dragStart, st, setSt],
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setDragStart(null);

    if (previewFrame) {
      setSt((prev) => {
        const frames = cloneFrames(prev.frames);
        frames[prev.activeFrame] = previewFrame;
        return { ...prev, frames, ...pushUndo(prev) };
      });
      setPreviewFrame(null);
    }
  }, [previewFrame, setSt]);

  const handleMouseLeave = useCallback(() => {
    setHoverCell(null);
    if (dragging) {
      handleMouseUp();
    }
  }, [dragging, handleMouseUp]);

  // Grid size change with scale
  const handleGridSizeChange = useCallback(
    (newSize: GridSize) => {
      if (newSize === st.gridSize) return;
      const hasContent = st.frames.some((f) => f.some((v) => v !== 0));
      if (hasContent) {
        setScaleModal(newSize);
        return;
      }
      setSt((prev) => ({
        ...prev,
        gridSize: newSize,
        frames: prev.frames.map((f) =>
          scaleFrame(f, prev.gridSize, newSize, prev.palette),
        ),
        activeFrame: 0,
        undoStack: [],
        redoStack: [],
      }));
    },
    [st.gridSize, st.frames, setSt],
  );

  const confirmScaleChange = useCallback(() => {
    if (!scaleModal) return;
    const newSize = scaleModal;
    setScaleModal(null);
    setSt((prev) => ({
      ...prev,
      gridSize: newSize,
      frames: prev.frames.map((f) =>
        scaleFrame(f, prev.gridSize, newSize, prev.palette),
      ),
      activeFrame: 0,
      undoStack: [],
      redoStack: [],
    }));
  }, [scaleModal, setSt]);

  const handleNewCanvas = useCallback(() => {
    if (!confirmNew) {
      setConfirmNew(true);
      confirmNewTimer.current = setTimeout(() => setConfirmNew(false), 2000);
      return;
    }
    if (confirmNewTimer.current) clearTimeout(confirmNewTimer.current);
    setConfirmNew(false);
    localStorage.removeItem(LS_KEY);
    setStRaw(makeDefault());
  }, [confirmNew]);

  const handleAddFrame = useCallback(() => {
    setSt((prev) => ({
      ...prev,
      frames: [...prev.frames, cloneFrame(prev.frames[prev.activeFrame])],
      activeFrame: prev.frames.length,
    }));
  }, [setSt]);

  const handleAddEmptyFrame = useCallback(() => {
    setSt((prev) => ({
      ...prev,
      frames: [...prev.frames, makeFrame(prev.gridSize)],
      activeFrame: prev.frames.length,
    }));
  }, [setSt]);

  const handleDeleteFrame = useCallback(
    (index: number) => {
      setSt((prev) => {
        const frames = prev.frames.filter((_, i) => i !== index);
        return {
          ...prev,
          frames,
          activeFrame: Math.max(
            0,
            Math.min(prev.activeFrame, frames.length - 1),
          ),
          undoStack: [],
          redoStack: [],
        };
      });
    },
    [setSt],
  );

  const handleDuplicateFrame = useCallback(
    (index: number) => {
      setSt((prev) => {
        if (prev.frames.length >= 16) return prev;
        const frames = [...prev.frames];
        frames.splice(index + 1, 0, cloneFrame(prev.frames[index]));
        return { ...prev, frames, activeFrame: index + 1 };
      });
    },
    [setSt],
  );

  const handleReorderFrames = useCallback(
    (from: number, to: number) => {
      setSt((prev) => {
        const frames = [...prev.frames];
        const [moved] = frames.splice(from, 1);
        frames.splice(to, 0, moved);
        const activeFrame =
          prev.activeFrame === from
            ? to
            : prev.activeFrame === to
              ? from
              : prev.activeFrame;
        return { ...prev, frames, activeFrame };
      });
    },
    [setSt],
  );

  return (
    <>
      <div className={styles.editor}>
        {/* Left sidebar */}
        <PixelGridSidebar
          tool={st.tool}
          gridSize={st.gridSize}
          palette={st.palette}
          activePaletteIndex={st.activePaletteIndex}
          undoCount={st.undoStack.length}
          redoCount={st.redoStack.length}
          confirmNew={confirmNew}
          onToolChange={(t) => setSt((prev) => ({ ...prev, tool: t }))}
          onGridSizeChange={handleGridSizeChange}
          onPaletteIndexChange={(i) =>
            setSt((prev) => ({ ...prev, activePaletteIndex: i }))
          }
          onResetPalette={() =>
            setSt((prev) => {
              const frames = [...prev.frames];
              frames[prev.activeFrame] = makeFrame(prev.gridSize);
              return { ...prev, frames };
            })
          }
          onUndo={applyUndo}
          onRedo={applyRedo}
          onNewCanvas={handleNewCanvas}
        />

        {/* Center: canvas + frame strip + legend */}
        <div className={styles.center}>
          <EditorCanvas
            ref={editorRef}
            gridSize={st.gridSize}
            tool={st.tool}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
          <FrameStrip
            frames={st.frames}
            activeFrame={st.activeFrame}
            gridSize={st.gridSize}
            palette={st.palette}
            onActivate={(i) => setSt((prev) => ({ ...prev, activeFrame: i }))}
            onDelete={handleDeleteFrame}
            onDuplicate={handleDuplicateFrame}
            onAddEmpty={handleAddEmptyFrame}
            onReorder={handleReorderFrames}
          />
          <KeyboardLegend
            open={showLegend}
            onToggle={() => setShowLegend((v) => !v)}
          />
        </div>

        {/* Right panel: preview + export + status */}
        <PreviewPanel
          frames={st.frames}
          activeFrame={st.activeFrame}
          gridSize={st.gridSize}
          palette={st.palette}
          playing={st.playing}
          fps={st.fps}
          tool={st.tool}
          activePaletteIndex={st.activePaletteIndex}
          onPlayToggle={() =>
            setSt((prev) => ({ ...prev, playing: !prev.playing }))
          }
          onFpsChange={(fps) => setSt((prev) => ({ ...prev, fps }))}
        />
      </div>
      <Modal
        open={scaleModal !== null}
        title={`Change grid to ${scaleModal}×${scaleModal}?`}
        subtitle="Your existing art will be scaled to fit the new size. This cannot be undone."
        confirmLabel="Change grid"
        cancelLabel="Cancel"
        onConfirm={confirmScaleChange}
        onCancel={() => setScaleModal(null)}
      />
    </>
  );
}
