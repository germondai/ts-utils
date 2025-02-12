/**
 * Determines whether a value is a primitive.
 *
 * A primitive is defined here as one of:
 * string, number, boolean, bigint, symbol, undefined, or null.
 *
 * @param value - The value to check.
 * @returns True if the value is primitive, false otherwise.
 */
export const isPrimitive = (
  value: unknown,
): value is string | number | boolean | bigint | symbol | null | undefined =>
  value === null ||
  value === undefined ||
  (typeof value !== 'object' && typeof value !== 'function')

/**
 * Determines whether a value is a plain object.
 *
 * A plain object is an object whose constructor is Object.
 *
 * @param value - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && value.constructor === Object

/**
 * Determines whether a value is an array.
 *
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

/**
 * Checks if a value is empty.
 *
 * For arrays and strings, it checks if the length is 0.
 * For plain objects, it checks if there are no enumerable keys.
 *
 * @param value - The value to check.
 * @returns True if the value is empty, false otherwise.
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) return true
  if (isArray(value) || typeof value === 'string') return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}
