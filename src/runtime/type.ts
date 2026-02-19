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

/**
 * Determines whether a value is valid JSON.
 *
 * This function checks if a value can be parsed as JSON.
 *
 * @param value - The value to check.
 * @returns True if the value is valid JSON, false otherwise.
 *
 * @example
 * isJson('{"name": "John"}'); // true
 * isJson('{invalid}'); // false
 *
 */
export const isJSON = (value: string): boolean => {
  if (typeof value !== 'string') return false
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

/**
 * Checks if a value is a function.
 *
 * @param value - The value to check.
 * @returns True if the value is a function.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

/**
 * Checks if a value is a valid Date instance.
 *
 * @param value - The value to check.
 * @returns True if the value is a valid Date.
 */
export const isDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime())

/**
 * Checks if a value is a number (and not NaN).
 *
 * @param value - The value to check.
 * @returns True if the value is a finite number.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value)

/**
 * Checks if a value is a string.
 *
 * @param value - The value to check.
 * @returns True if the value is a string.
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string'

/**
 * Checks if a value is a boolean.
 *
 * @param value - The value to check.
 * @returns True if the value is a boolean.
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

/**
 * Checks if a value is null or undefined.
 *
 * @param value - The value to check.
 * @returns True if the value is null or undefined.
 */
export const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined

/**
 * Checks if a value is a RegExp instance.
 *
 * @param value - The value to check.
 * @returns True if the value is a RegExp.
 */
export const isRegExp = (value: unknown): value is RegExp =>
  value instanceof RegExp
