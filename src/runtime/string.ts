/**
 * Reverses a string.
 *
 * @param str - The string to reverse.
 * @returns The reversed string.
 *
 * @example
 * reverse("hello") // "olleh"
 */
export const reverse = (str: string): string => [...str].reverse().join('')

/**
 * Counts the number of occurrences of a substring in a string.
 *
 * @param str - The string to search in.
 * @param search - The substring to search for.
 * @returns The number of occurrences.
 *
 * @example
 * countOccurrences("hello world hello", "hello") // 2
 */
export const countOccurrences = (str: string, search: string): number => {
  if (search === '') return 0
  let count = 0
  let pos = 0
  while ((pos = str.indexOf(search, pos)) !== -1) {
    count++
    pos += search.length
  }
  return count
}

/**
 * Pads a string to the specified length with the given character.
 *
 * @param str - The string to pad.
 * @param length - The desired length.
 * @param char - The character to pad with (default: ' ').
 * @param direction - The padding direction: 'left', 'right', or 'both' (default: 'left').
 * @returns The padded string.
 *
 * @example
 * pad("5", 3, "0") // "005"
 * pad("hi", 6, " ", "both") // "  hi  "
 */
export const pad = (
  str: string,
  length: number,
  char: string = ' ',
  direction: 'left' | 'right' | 'both' = 'left',
): string => {
  if (str.length >= length) return str
  const padChar = char[0] || ' '
  switch (direction) {
    case 'right':
      return str.padEnd(length, padChar)
    case 'both': {
      const total = length - str.length
      const left = Math.floor(total / 2)
      const right = total - left
      return padChar.repeat(left) + str + padChar.repeat(right)
    }
    default:
      return str.padStart(length, padChar)
  }
}

/**
 * Masks a string, showing only the last N characters.
 *
 * @param str - The string to mask.
 * @param visibleCount - The number of characters to leave visible at the end (default: 4).
 * @param maskChar - The character to use for masking (default: '*').
 * @returns The masked string.
 *
 * @example
 * mask("1234567890") // "******7890"
 * mask("secret", 2, "#") // "####et"
 */
export const mask = (
  str: string,
  visibleCount: number = 4,
  maskChar: string = '*',
): string => {
  if (str.length <= visibleCount) return str
  const masked = maskChar[0].repeat(str.length - visibleCount)
  return masked + str.slice(-visibleCount)
}

/**
 * Extracts initials from a name.
 *
 * @param name - The full name.
 * @returns The uppercase initials.
 *
 * @example
 * initials("John Doe") // "JD"
 * initials("Alice Bob Charlie") // "ABC"
 */
export const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

/**
 * Counts the number of words in a string.
 *
 * @param str - The string to count words in.
 * @returns The number of words.
 *
 * @example
 * wordCount("Hello world") // 2
 */
export const wordCount = (str: string): number => {
  const words = str.trim().split(/\s+/).filter(Boolean)
  return str.trim() === '' ? 0 : words.length
}

/**
 * Checks if a string is empty or contains only whitespace.
 *
 * @param str - The string to check.
 * @returns True if the string is blank.
 *
 * @example
 * isBlank("") // true
 * isBlank("  ") // true
 * isBlank("hello") // false
 */
export const isBlank = (str: string): boolean => str.trim() === ''
