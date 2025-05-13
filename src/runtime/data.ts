/**
 * Creates a deep clone of the given data using JSON serialization.
 *
 * **Note:** This method does not support cloning functions, dates, or undefined values.
 *
 * @param data - The data to clone.
 * @returns A deep copy of the data.
 */
export const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

/**
 * Compares two values of the same type to determine if they are deeply equal.
 *
 * @typeParam T - The type of the values being compared.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are deeply equal, otherwise `false`.
 *
 * @remarks
 * - For primitive types, the function uses strict equality (`===`).
 * - For `null` or `undefined`, the function returns `false` if one value is nullish and the other is not.
 * - For arrays, the function checks if they have the same length and recursively compares their elements.
 * - For objects, the function checks if they have the same keys and recursively compares their corresponding values.
 * - The function does not handle circular references and may result in a stack overflow for deeply nested structures.
 */
const isEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false
  if (typeof a === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) if (!isEqual(a[i], b[i])) return false
      return true
    } else {
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)
      if (keysA.length !== keysB.length) return false
      for (const key of keysA)
        if (!keysB.includes(key) || !isEqual((a as any)[key], (b as any)[key]))
          return false
      return true
    }
  }
  return false
}
