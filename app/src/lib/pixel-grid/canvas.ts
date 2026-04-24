import { hexToRgb } from "./helpers";

type DrawGridOptions = {
  ctx: CanvasRenderingContext2D;
  frame: Uint8Array;
  gridSize: number;
  palette: string[];
  cellSize: number;
  hoverCell: { col: number; row: number } | null;
  tool: string;
  activePaletteIndex: number;
};

export function drawGrid({
  ctx,
  frame,
  gridSize,
  palette,
  cellSize,
  hoverCell,
  tool,
  activePaletteIndex,
}: DrawGridOptions): void {
  const gap = Math.max(1, cellSize * 0.12);
  const inner = cellSize - gap;
  const r = inner * 0.2;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const idx = row * gridSize + col;
      const palIdx = frame[idx];
      const x = col * cellSize + gap / 2;
      const y = row * cellSize + gap / 2;

      ctx.beginPath();
      ctx.roundRect(x, y, inner, inner, r);
      if (palIdx === 0) {
        ctx.fillStyle = "#1a1a1a";
      } else {
        ctx.fillStyle = palette[palIdx] ?? palette[1];
      }
      ctx.fill();
    }
  }

  if (hoverCell && tool !== "eyedropper") {
    const { col, row } = hoverCell;
    const x = col * cellSize + gap / 2;
    const y = row * cellSize + gap / 2;
    ctx.strokeStyle = palette[activePaletteIndex] ?? "#e8e8e8";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.roundRect(x, y, inner, inner, r);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export function drawPreview(
  ctx: CanvasRenderingContext2D,
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
): void {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const cellSize = W / gridSize;
  const gap = Math.max(0.5, cellSize * 0.08);
  const inner = cellSize - gap;
  const r = inner * 0.18;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const idx = row * gridSize + col;
      const palIdx = frame[idx];
      const x = col * cellSize + gap / 2;
      const y = row * cellSize + gap / 2;

      ctx.beginPath();
      ctx.roundRect(x, y, inner, inner, r);

      if (palIdx === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fill();
      } else {
        const [rr, gg, bb] = hexToRgb(palette[palIdx] ?? "#fff");
        ctx.fillStyle = `rgb(${Math.min(255, rr + 20)},${Math.min(255, gg + 20)},${Math.min(255, bb + 20)})`;
        ctx.shadowColor = palette[palIdx];
        ctx.shadowBlur = cellSize * 0.8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  // Scan lines
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  for (let y = 0; y < H; y += 2) {
    ctx.fillRect(0, y, W, 1);
  }

  // Curved glass vignette
  const grad = ctx.createRadialGradient(
    W / 2,
    H / 2,
    W * 0.28,
    W / 2,
    H / 2,
    W * 0.72,
  );
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.7, "rgba(0,0,0,0.05)");
  grad.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

export function drawThumb(
  ctx: CanvasRenderingContext2D,
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
): void {
  const W = ctx.canvas.width;
  const cellSize = W / gridSize;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, W);
  for (let i = 0; i < gridSize * gridSize; i++) {
    const palIdx = frame[i];
    if (palIdx === 0) continue;
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    ctx.fillStyle = palette[palIdx] ?? "#fff";
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }
}
