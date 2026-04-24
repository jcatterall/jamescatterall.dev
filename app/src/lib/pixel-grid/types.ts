export type Tool =
  | "pencil"
  | "eraser"
  | "fill"
  | "eyedropper"
  | "line"
  | "rect";

export type GridSize = 16 | 32 | 64;

export type PixelGridState = {
  gridSize: GridSize;
  frames: Uint8Array[];
  activeFrame: number;
  palette: string[];
  activePaletteIndex: number;
  tool: Tool;
  playing: boolean;
  fps: number;
  undoStack: Uint8Array[][];
  redoStack: Uint8Array[][];
};
