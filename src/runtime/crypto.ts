/**
 * Generates a random alphanumeric ID.
 *
 * @param length - The length of the ID (default: 16).
 * @returns A random alphanumeric string.
 *
 * @example
 * generateId() // "a3bF9kL2mN7xP1qR"
 * generateId(8) // "x4Hy9zKm"
 */
export const generateId = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generates a simple non-cryptographic hash of a string (djb2 algorithm).
 *
 * @param str - The string to hash.
 * @returns A numeric hash value.
 *
 * @example
 * hash("hello") // 261238937
 */
export const hash = (str: string): number => {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0
  }
  return h
}
