/**
 * Generates a random integer between n and m (inclusive).
 *
 * **Note:** Ensure that `m` is greater than or equal to `n`.
 *
 * @param n - The lower bound.
 * @param m - The upper bound (default is 0).
 * @returns A random integer between n and m.
 */
export const rand = (n: number, m: number = 0): number =>
  Math.floor(Math.random() * (m - n + 1)) + n

/**
 * Calculates the percentage of a number relative to a maximum number.
 *
 * @param value - The current value.
 * @param maxValue - The maximum possible value.
 * @param decimalPlaces - Number of decimal places to round to (default: 2).
 * @returns The calculated percentage, or 0 if maxValue is 0.
 */
export const percentage = (
  value: number,
  maxValue: number,
  decimalPlaces: number = 2,
): number => {
  if (maxValue === 0) return 0
  const percent = (value / maxValue) * 100
  return Number(percent.toFixed(decimalPlaces))
}

/**
 * Clamps a number within a specified range.
 *
 * @param num - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max)

/**
 * Formats a number with commas for thousands.
 *
 * @param num - The number to format.
 * @returns A string with formatted number (e.g., "1,234,567").
 */
export const formatNumber = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
