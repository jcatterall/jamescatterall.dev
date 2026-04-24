import type { PixelGridState } from "./types";
import { SYSTEM_PALETTE, makeFrame, cloneFrames } from "./helpers";

export const LS_KEY = "pixelgrid-v1";

export function makeDefault(): PixelGridState {
  return {
    gridSize: 16,
    frames: [makeFrame(16)],
    activeFrame: 0,
    palette: [...SYSTEM_PALETTE],
    activePaletteIndex: 1,
    tool: "pencil",
    playing: false,
    fps: 8,
    undoStack: [],
    redoStack: [],
  };
}

export function loadState(): PixelGridState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    parsed.frames = parsed.frames.map((f: number[]) => new Uint8Array(f));
    parsed.undoStack = (parsed.undoStack ?? []).map((snap: number[][]) =>
      snap.map((f) => new Uint8Array(f)),
    );
    parsed.redoStack = (parsed.redoStack ?? []).map((snap: number[][]) =>
      snap.map((f) => new Uint8Array(f)),
    );
    return parsed as PixelGridState;
  } catch {
    return null;
  }
}

export function saveState(st: PixelGridState): void {
  try {
    const serialisable = {
      ...st,
      frames: st.frames.map((f) => Array.from(f)),
      undoStack: st.undoStack
        .slice(-50)
        .map((snap) => snap.map((f) => Array.from(f))),
      redoStack: st.redoStack
        .slice(-50)
        .map((snap) => snap.map((f) => Array.from(f))),
    };
    localStorage.setItem(LS_KEY, JSON.stringify(serialisable));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function pushUndo(
  st: PixelGridState,
): Pick<PixelGridState, "undoStack" | "redoStack"> {
  return {
    undoStack: [...st.undoStack.slice(-49), cloneFrames(st.frames)],
    redoStack: [],
  };
}
