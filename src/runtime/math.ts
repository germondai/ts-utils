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

/**
 * Sums an array of numbers.
 *
 * @param numbers - The numbers to sum.
 * @returns The sum, or 0 for an empty array.
 *
 * @example
 * sum([1, 2, 3]) // 6
 */
export const sum = (numbers: number[]): number =>
  numbers.reduce((acc, n) => acc + n, 0)

/**
 * Calculates the average of an array of numbers.
 *
 * @param numbers - The numbers to average.
 * @returns The average, or 0 for an empty array.
 *
 * @example
 * average([1, 2, 3, 4]) // 2.5
 */
export const average = (numbers: number[]): number =>
  numbers.length === 0 ? 0 : sum(numbers) / numbers.length

/**
 * Calculates the median of an array of numbers.
 *
 * @param numbers - The numbers to find the median of.
 * @returns The median, or 0 for an empty array.
 *
 * @example
 * median([1, 2, 3]) // 2
 * median([1, 2, 3, 4]) // 2.5
 */
export const median = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

/**
 * Returns the minimum value in an array of numbers.
 *
 * @param numbers - The numbers.
 * @returns The minimum value, or Infinity for an empty array.
 *
 * @example
 * min([3, 1, 4, 1, 5]) // 1
 */
export const min = (numbers: number[]): number =>
  numbers.length === 0 ? Infinity : Math.min(...numbers)

/**
 * Returns the maximum value in an array of numbers.
 *
 * @param numbers - The numbers.
 * @returns The maximum value, or -Infinity for an empty array.
 *
 * @example
 * max([3, 1, 4, 1, 5]) // 5
 */
export const max = (numbers: number[]): number =>
  numbers.length === 0 ? -Infinity : Math.max(...numbers)

/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param value - The number to round.
 * @param decimals - The number of decimal places (default: 0).
 * @returns The rounded number.
 *
 * @example
 * round(1.2345, 2) // 1.23
 * round(1.5) // 2
 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
