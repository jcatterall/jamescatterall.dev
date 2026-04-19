export const COLORS = [
  { id: "black",       label: "Black",            hex: "#000000" },
  { id: "cobalt",      label: "Cobalt",            hex: "#0047AB" },
  { id: "radioactive", label: "Radioactive Green", hex: "#39FF14" },
  { id: "purple",      label: "Royal Purple",      hex: "#7851A9" },
  { id: "orange",      label: "Burnt Orange",      hex: "#CC5500" },
] as const

export type ColorId = typeof COLORS[number]["id"]

export const getColorHex = (id: ColorId): string =>
  COLORS.find((c) => c.id === id)!.hex
