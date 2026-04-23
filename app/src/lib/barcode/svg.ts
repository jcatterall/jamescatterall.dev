import { SHAPES, type ShapeId } from "./shapes"

const MODULE_WIDTH = 3
const HEIGHT = 430
const SCAN_Y = 370 // artistic zone: 0–370, scan zone: 370–430

export const TOTAL_WIDTH = 95 * MODULE_WIDTH
export const VIEWBOX_HEIGHT = HEIGHT

type Bar = { start: number; width: number }

const extractBars = (encoded: string): Bar[] => {
  const bars: Bar[] = []
  let i = 0
  while (i < encoded.length) {
    if (encoded[i] === "1") {
      let j = i
      while (j < encoded.length && encoded[j] === "1") j++
      bars.push({ start: i, width: j - i })
      i = j
    } else {
      i++
    }
  }
  return bars
}

const rect = (x: number, w: number, y: number, h: number, color: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`

// Exported for partial DOM updates in BarcodePreview
export const artBarsHtml = (encoded: string, color: string): string =>
  extractBars(encoded).map(b => rect(b.start * MODULE_WIDTH, b.width * MODULE_WIDTH, 0, SCAN_Y, color)).join("")

export const scanBarsHtml = (encoded: string, color: string): string =>
  extractBars(encoded).map(b => rect(b.start * MODULE_WIDTH, b.width * MODULE_WIDTH, SCAN_Y, HEIGHT - SCAN_Y, color)).join("")

const DIGIT_Y = HEIGHT + 20
const EXPORT_HEIGHT = HEIGHT + 36

const digitsSvg = (digits: string[], color: string): string => {
  const spacing = TOTAL_WIDTH / digits.length
  return digits
    .map((d, i) => {
      const x = spacing * i + spacing / 2
      return `<text x="${x}" y="${DIGIT_Y}" text-anchor="middle" font-family="monospace" font-size="14" fill="${color}">${d}</text>`
    })
    .join("")
}

// Full SVG string for file download
export const generateSvg = (encoded: string, shape: ShapeId, color: string, digits: string[]): string => {
  const vb = `0 0 ${TOTAL_WIDTH} ${EXPORT_HEIGHT}`
  const digitRow = digitsSvg(digits, color)
  if (shape === "classic") {
    const allBars = extractBars(encoded)
      .map(b => rect(b.start * MODULE_WIDTH, b.width * MODULE_WIDTH, 0, HEIGHT, color))
      .join("")
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${allBars}${digitRow}</svg>`
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">`,
    `<defs><clipPath id="sc">${SHAPES[shape]}</clipPath></defs>`,
    `<g clip-path="url(#sc)">${artBarsHtml(encoded, color)}</g>`,
    `<g>${scanBarsHtml(encoded, color)}</g>`,
    digitRow,
    `</svg>`,
  ].join("")
}
