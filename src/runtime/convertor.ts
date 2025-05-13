/**
 * Converts a string to camelCase.
 * Example: "hello world" → "helloWorld"
 * @param input The input string.
 * @returns The camelCase version of the input.
 */
export const toCamelCase = (input: string): string => {
  const words = input
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)

  return words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('')
}

/**
 * Converts a string to PascalCase.
 * Example: "hello world" → "HelloWorld"
 * @param input The input string.
 * @returns The PascalCase version of the input.
 */
export const toPascalCase = (input: string): string =>
  input
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

/**
 * Converts a string to snake_case.
 * Example: "hello world" → "hello_world"
 * @param input The input string.
 * @returns The snake_case version of the input.
 */
export const toSnakeCase = (input: string): string =>
  input
    .toLowerCase()
    .split(/[\s-]+/)
    .filter(Boolean)
    .join('_')

/**
 * Converts a string to kebab-case.
 * Example: "hello world" → "hello-world"
 * @param input The input string.
 * @returns The kebab-case version of the input.
 */
export const toKebabCase = (input: string): string =>
  input
    .toLowerCase()
    .split(/[\s_]+/)
    .filter(Boolean)
    .join('-')

/**
 * Converts a string to title case.
 * Example: "hello world" → "Hello World"
 * Splits the input by whitespace, lowercases it, then capitalizes each word.
 * @param input The input string.
 * @returns The title-cased string.
 */
export const toTitleCase = (input: string): string =>
  input
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/**
 * Converts a string to sentence case.
 * Example: "hello world" → "Hello world"
 * Lowercases the entire string then capitalizes only the first letter.
 * @param input The input string.
 * @returns The sentence-cased string.
 */
export const toSentenceCase = (input: string): string => {
  const lower = input.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

/**
 * Converts a string to constant case (screaming snake case).
 * Example: "hello world" → "HELLO_WORLD"
 * This builds on the snake_case conversion and then converts the result to uppercase.
 * @param input The input string.
 * @returns The constant-cased string.
 */
export const toConstantCase = (input: string): string =>
  toSnakeCase(input).toUpperCase()

/**
 * Toggles the case of each character in the string.
 * Example: "Hello" → "hELLO"
 * For each character, if it's uppercase it becomes lowercase, and vice versa.
 * @param input The input string.
 * @returns The string with toggled character cases.
 */
export const toggleCase = (input: string): string =>
  input
    .split('')
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase(),
    )
    .join('')

/**
 * Capitalizes the first character of a string and lowercases the remainder.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string =>
  str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : str

/**
 * Truncates a string to a maximum length.
 *
 * If the string exceeds the maximum length, it will be cut off.
 * Optionally, an ellipsis ("...") is appended.
 *
 * @param text - The text to truncate.
 * @param maxLength - The maximum allowed length.
 * @param ellipsis - Whether to append "..." if truncated (default is false).
 * @returns The truncated string.
 */
export const truncate = (
  text: string,
  maxLength: number,
  ellipsis: boolean = false,
): string => {
  if (text.length <= maxLength) return text
  return ellipsis
    ? text.slice(0, maxLength - 3) + '...'
    : text.slice(0, maxLength)
}

/**
 * Generates a URL-friendly slug from a given string.
 *
 * The function normalizes accented characters, converts the string to lowercase,
 * trims whitespace, replaces spaces with hyphens, removes invalid characters,
 * and limits the slug length.
 *
 * @param title - The input string to slugify.
 * @param length - Maximum length of the slug (default is 64).
 * @returns The slugified string.
 */
export const slugify = (title: string, length: number = 64): string =>
  title
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .slice(0, length)

/**
 * Strips HTML tags from a string.
 *
 * @param html - The HTML string.
 * @returns The string without HTML tags.
 */
export const stripTags = (html: string): string =>
  html.replace(/<\/?[^>]+(>|$)/g, '')

/**
 * Escapes special characters in a string to make it safe for inclusion in HTML.
 * Converts characters like `<`, `>`, `&`, `"`, and `'` into their HTML entity equivalents.
 *
 * @param str - The input string to escape.
 * @returns The HTML-escaped string.
 */
export const escapeHTML = (str: string): string => {
  const escapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }

  return str.replace(/[&<>"']/g, (char) => escapeMap[char] || char)
}

/**
 * Unescapes HTML entities in a string.
 * Converts HTML entities like `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#039;` back to their original characters.
 *
 * @param str - The input string to unescape.
 * @returns The unescaped string.
 */
export const unescapeHTML = (str: string): string => {
  const unescapeMap: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  }

  return str.replace(
    /&[a-zA-Z0-9#]+;/g,
    (entity) => unescapeMap[entity] || entity,
  )
}
