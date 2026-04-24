import type { GridSize } from "./types";

// Index 0 = transparent / off state
export const SYSTEM_PALETTE: string[] = [
  "#000000", // 0  — black
  "#ffffff", // 1  — white
  "#999999", // 2  — mid grey
  "#e8d5b0", // 3  — warm parchment
  "#c9956a", // 4  — burnt sienna
  "#8b3a3a", // 5  — deep crimson
  "#d4547a", // 6  — raspberry
  "#e8a030", // 7  — golden amber
  "#4a7c59", // 8  — forest green
  "#7ec8a0", // 9  — seafoam
  "#2d6a8f", // 10 — ocean blue
  "#7ab3d4", // 11 — steel blue
  "#5c4a8f", // 12 — deep violet
  "#b09fd4", // 13 — dusty lavender
  "#3d3d2e", // 14 — dark olive
  "#c8d4a0", // 15 — sage green
];

export const makeFrame = (n: number): Uint8Array => new Uint8Array(n * n);

export const cloneFrame = (f: Uint8Array): Uint8Array => new Uint8Array(f);

export const cloneFrames = (fs: Uint8Array[]): Uint8Array[] =>
  fs.map(cloneFrame);

export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function colorDistance(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
): number {
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}

export function nearestPaletteIndex(
  r: number,
  g: number,
  b: number,
  palette: string[],
): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 1; i < palette.length; i++) {
    const [pr, pg, pb] = hexToRgb(palette[i]);
    const d = colorDistance(r, g, b, pr, pg, pb);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

export function scaleFrame(
  frame: Uint8Array,
  oldSize: GridSize,
  newSize: GridSize,
  palette: string[],
): Uint8Array {
  const next = makeFrame(newSize);
  if (newSize > oldSize) {
    // Scale up — each old cell maps to a block of new cells
    const factor = newSize / oldSize;
    for (let row = 0; row < oldSize; row++) {
      for (let col = 0; col < oldSize; col++) {
        const palIdx = frame[row * oldSize + col];
        for (let dr = 0; dr < factor; dr++) {
          for (let dc = 0; dc < factor; dc++) {
            next[(row * factor + dr) * newSize + (col * factor + dc)] = palIdx;
          }
        }
      }
    }
  } else {
    // Scale down — average block of old cells into one new cell
    const factor = oldSize / newSize;
    for (let row = 0; row < newSize; row++) {
      for (let col = 0; col < newSize; col++) {
        let rSum = 0,
          gSum = 0,
          bSum = 0,
          count = 0;
        let hasContent = false;
        for (let dr = 0; dr < factor; dr++) {
          for (let dc = 0; dc < factor; dc++) {
            const palIdx =
              frame[(row * factor + dr) * oldSize + (col * factor + dc)];
            if (palIdx !== 0) {
              const [pr, pg, pb] = hexToRgb(palette[palIdx]);
              rSum += pr;
              gSum += pg;
              bSum += pb;
              count++;
              hasContent = true;
            }
          }
        }
        if (hasContent) {
          next[row * newSize + col] = nearestPaletteIndex(
            Math.round(rSum / count),
            Math.round(gSum / count),
            Math.round(bSum / count),
            palette,
          );
        }
      }
    }
  }
  return next;
}

export function floodFill(
  frame: Uint8Array,
  gridSize: number,
  startIdx: number,
  targetIdx: number,
  fillIdx: number,
): Uint8Array {
  if (targetIdx === fillIdx) return frame;
  const next = cloneFrame(frame);
  const stack = [startIdx];
  const visited = new Uint8Array(gridSize * gridSize);
  while (stack.length) {
    const idx = stack.pop()!;
    if (idx < 0 || idx >= gridSize * gridSize) continue;
    if (visited[idx] || next[idx] !== targetIdx) continue;
    visited[idx] = 1;
    next[idx] = fillIdx;
    const col = idx % gridSize;
    const row = Math.floor(idx / gridSize);
    if (col > 0) stack.push(idx - 1);
    if (col < gridSize - 1) stack.push(idx + 1);
    if (row > 0) stack.push(idx - gridSize);
    if (row < gridSize - 1) stack.push(idx + gridSize);
  }
  return next;
}

export function linePoints(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): [number, number][] {
  const pts: [number, number][] = [];
  let dx = Math.abs(x1 - x0),
    sx = x0 < x1 ? 1 : -1;
  let dy = -Math.abs(y1 - y0),
    sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    pts.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
  return pts;
}
