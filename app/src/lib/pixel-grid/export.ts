import { hexToRgb } from "./helpers";

export function exportPNG(
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
  scale: number,
): void {
  const cvs = document.createElement("canvas");
  cvs.width = gridSize * scale;
  cvs.height = gridSize * scale;
  const ctx = cvs.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  for (let i = 0; i < gridSize * gridSize; i++) {
    const palIdx = frame[i];
    if (palIdx === 0) continue;
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    ctx.fillStyle = palette[palIdx] ?? "#fff";
    ctx.fillRect(col * scale, row * scale, scale, scale);
  }
  cvs.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-grid-${scale}x.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export function exportSpriteSheet(
  frames: Uint8Array[],
  gridSize: number,
  palette: string[],
  scale: number,
): void {
  const cols = Math.ceil(Math.sqrt(frames.length));
  const rows = Math.ceil(frames.length / cols);
  const cvs = document.createElement("canvas");
  cvs.width = gridSize * scale * cols;
  cvs.height = gridSize * scale * rows;
  const ctx = cvs.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  frames.forEach((frame, fi) => {
    const ox = (fi % cols) * gridSize * scale;
    const oy = Math.floor(fi / cols) * gridSize * scale;
    for (let i = 0; i < gridSize * gridSize; i++) {
      const palIdx = frame[i];
      if (palIdx === 0) continue;
      const col = i % gridSize;
      const row = Math.floor(i / gridSize);
      ctx.fillStyle = palette[palIdx] ?? "#fff";
      ctx.fillRect(ox + col * scale, oy + row * scale, scale, scale);
    }
  });
  cvs.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-grid-sheet-${scale}x.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

function cellsToRects(
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
  cellPx: number,
): string {
  const rx = Math.round(cellPx * 0.18);
  const rects: string[] = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const palIdx = frame[i];
    if (palIdx === 0) continue;
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    const x = col * cellPx;
    const y = row * cellPx;
    const fill = palette[palIdx] ?? "#fff";
    rects.push(
      `  <rect x="${x}" y="${y}" width="${cellPx}" height="${cellPx}" rx="${rx}" ry="${rx}" fill="${fill}" />`,
    );
  }
  return rects.join("\n");
}

export function exportSVG(
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
): void {
  const cellPx = 8;
  const size = gridSize * cellPx;
  const body = cellsToRects(frame, gridSize, palette, cellPx);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n  <rect width="${size}" height="${size}" fill="#000" />\n${body}\n</svg>`;
  download(svg, "pixel-grid.svg", "image/svg+xml");
}

export function exportAnimatedSVG(
  frames: Uint8Array[],
  gridSize: number,
  palette: string[],
  fps: number,
): void {
  const cellPx = 8;
  const size = gridSize * cellPx;
  const frameDur = 1 / fps;
  const totalDur = frameDur * frames.length;

  const groups = frames
    .map((frame, i) => {
      const body = cellsToRects(frame, gridSize, palette, cellPx);
      const delay = i * frameDur;
      const keyTimes = `0;${(delay / totalDur).toFixed(4)};${((delay + frameDur) / totalDur).toFixed(4)};1`;
      const values =
        i === 0
          ? `visible;visible;hidden;hidden`
          : `hidden;visible;hidden;hidden`;
      return `  <g id="f${i}">\n${body}\n    <animate attributeName="visibility" values="${values}" keyTimes="${keyTimes}" dur="${totalDur}s" repeatCount="indefinite" />\n  </g>`;
    })
    .join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n  <rect width="${size}" height="${size}" fill="#000" />\n${groups}\n</svg>`;
  download(svg, "pixel-grid-animated.svg", "image/svg+xml");
}

export async function copyAsCSS(
  frame: Uint8Array,
  gridSize: number,
  palette: string[],
): Promise<void> {
  const shadows: string[] = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const palIdx = frame[i];
    if (palIdx === 0) continue;
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    shadows.push(`${col + 1}px ${row + 1}px 0 ${palette[palIdx]}`);
  }
  const css = `box-shadow: ${shadows.join(",\n  ")};`;
  await navigator.clipboard.writeText(css);
}

function download(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
