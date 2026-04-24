const L_CODE = [
  "0001101", "0011001", "0010011", "0111101", "0100011",
  "0110001", "0101111", "0111011", "0110111", "0001011",
]

const G_CODE = [
  "0100111", "0110011", "0011011", "0100001", "0011101",
  "0111001", "0000101", "0010001", "0001001", "0010111",
]

const R_CODE = [
  "1110010", "1100110", "1101100", "1000010", "1011100",
  "1001110", "1010000", "1000100", "1001000", "1110100",
]

// Each row = which encoding (L or G) to use for the 6 left digits, keyed by first digit
const PARITY = [
  "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
  "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL",
]

const computeCheckDigit = (digits: number[]): number => {
  const sum = digits
    .slice(0, 12)
    .reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0)
  return (10 - (sum % 10)) % 10
}

const buildBars = (all: number[], parity: string): string => {
  const left = all.slice(1, 7).map((d, i) => (parity[i] === "L" ? L_CODE[d] : G_CODE[d])).join("")
  const right = all.slice(7).map((d) => R_CODE[d]).join("")
  return `101${left}01010${right}101`
}

export const encodeEan13 = (value: string): string | null => {
  const raw = value.replace(/\D/g, "")
  if (raw.length < 12 || raw.length > 13) return null

  const digits = raw.slice(0, 12).split("").map(Number)
  const check = computeCheckDigit(digits)

  if (raw.length === 13 && Number(raw[12]) !== check) return null

  const all = [...digits, check]
  return buildBars(all, PARITY[all[0]])
}

// Always returns a valid encoding by right-padding partial input with zeros
export const encodeForPreview = (value: string): string => {
  const raw = value.replace(/\D/g, "").slice(0, 12).padEnd(12, "0")
  const digits = raw.split("").map(Number)
  const check = computeCheckDigit(digits)
  const all = [...digits, check]
  return buildBars(all, PARITY[all[0]])
}

export const getDisplayDigits = (value: string): string[] => {
  const raw = value.replace(/\D/g, "").slice(0, 12).padEnd(12, "0")
  const digits = raw.split("").map(Number)
  const check = computeCheckDigit(digits)
  return [...raw.split(""), String(check)]
}
