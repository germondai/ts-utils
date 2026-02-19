/**
 * Converts a hex color string to an RGB object.
 *
 * @param hex - The hex color string (e.g., "#ff5733" or "#f53").
 * @returns An RGB object, or null if the hex string is invalid.
 *
 * @example
 * hexToRgb("#ff5733") // { r: 255, g: 87, b: 51 }
 * hexToRgb("#f53") // { r: 255, g: 85, b: 51 }
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const cleaned = hex.replace(/^#/, '')
  let fullHex: string

  if (cleaned.length === 3) {
    fullHex = cleaned
      .split('')
      .map((c) => c + c)
      .join('')
  } else if (cleaned.length === 6) {
    fullHex = cleaned
  } else {
    return null
  }

  const num = parseInt(fullHex, 16)
  if (isNaN(num)) return null

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

/**
 * Converts RGB values to a hex color string.
 *
 * @param r - The red value (0-255).
 * @param g - The green value (0-255).
 * @param b - The blue value (0-255).
 * @returns The hex color string.
 *
 * @example
 * rgbToHex(255, 87, 51) // "#ff5733"
 */
export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' +
  [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')

/**
 * Lightens a hex color by a given percentage.
 *
 * @param hex - The hex color string.
 * @param amount - The amount to lighten (0-1, where 1 is white).
 * @returns The lightened hex color string.
 *
 * @example
 * lighten("#000000", 0.5) // "#808080"
 */
export const lighten = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return rgbToHex(
    rgb.r + (255 - rgb.r) * amount,
    rgb.g + (255 - rgb.g) * amount,
    rgb.b + (255 - rgb.b) * amount,
  )
}

/**
 * Darkens a hex color by a given percentage.
 *
 * @param hex - The hex color string.
 * @param amount - The amount to darken (0-1, where 1 is black).
 * @returns The darkened hex color string.
 *
 * @example
 * darken("#ffffff", 0.5) // "#808080"
 */
export const darken = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return rgbToHex(
    rgb.r * (1 - amount),
    rgb.g * (1 - amount),
    rgb.b * (1 - amount),
  )
}
