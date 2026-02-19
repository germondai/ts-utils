/**
 * Creates a new object with only the specified keys.
 *
 * @param obj - The source object.
 * @param keys - The keys to pick.
 * @returns A new object with only the specified keys.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) result[key] = obj[key]
  }
  return result
}

/**
 * Creates a new object without the specified keys.
 *
 * @param obj - The source object.
 * @param keys - The keys to omit.
 * @returns A new object without the specified keys.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) delete result[key]
  return result as Omit<T, K>
}

/**
 * Deep merges multiple objects together. Later values override earlier ones.
 *
 * @param objects - The objects to merge.
 * @returns The merged object.
 *
 * @example
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 } }) // { a: 1, b: { c: 2, d: 3 } }
 */
export const merge = <T extends Record<string, any>>(
  ...objects: Partial<T>[]
): T => {
  const isPlainObject = (val: unknown): val is Record<string, any> =>
    val !== null && typeof val === 'object' && val.constructor === Object

  const result = {} as any
  for (const obj of objects) {
    for (const key of Object.keys(obj as object)) {
      const val = (obj as any)[key]
      if (isPlainObject(val) && isPlainObject(result[key])) {
        result[key] = merge(result[key], val)
      } else {
        result[key] = val
      }
    }
  }
  return result
}

/**
 * Flattens a nested object into a single-level object with dot-separated keys.
 *
 * @param obj - The object to flatten.
 * @param prefix - The prefix for keys (used internally for recursion).
 * @returns A flat object.
 *
 * @example
 * flattenObject({ a: { b: 1, c: { d: 2 } } }) // { 'a.b': 1, 'a.c.d': 2 }
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = '',
): Record<string, any> => {
  const result: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val !== null && typeof val === 'object' && val.constructor === Object) {
      Object.assign(result, flattenObject(val, fullKey))
    } else {
      result[fullKey] = val
    }
  }
  return result
}

/**
 * Unflattens a dot-separated flat object into a nested object.
 *
 * @param obj - The flat object to unflatten.
 * @returns A nested object.
 *
 * @example
 * unflattenObject({ 'a.b': 1, 'a.c.d': 2 }) // { a: { b: 1, c: { d: 2 } } }
 */
export const unflattenObject = (
  obj: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    const parts = key.split('.')
    let current = result
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) current[parts[i]] = {}
      current = current[parts[i]]
    }
    current[parts[parts.length - 1]] = obj[key]
  }
  return result
}

const isPlainObj = (val: unknown): val is Record<string, any> =>
  val !== null && typeof val === 'object' && val.constructor === Object

const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((v, i) => deepEqual(v, b[i]))
  }

  if (isPlainObj(a) && isPlainObj(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((k) => keysB.includes(k) && deepEqual(a[k], b[k]))
  }

  return false
}

/**
 * Gets the deep differences between two objects.
 * Recursively compares nested objects and returns only the differing branches.
 * For arrays, if they differ the entire new array is returned.
 *
 * @param a - The first object.
 * @param b - The second object.
 * @returns An object with the differing values from `b`.
 *
 * @example
 * diff({ a: 1, b: { c: 2, d: 3 } }, { a: 1, b: { c: 5, d: 3 } })
 * // { b: { c: 5 } }
 *
 * diff({ tags: [1, 2] }, { tags: [1, 3] })
 * // { tags: [1, 3] }
 */
export const diff = <T extends Record<string, any>>(a: T, b: T): Partial<T> => {
  const result: Partial<T> = {}
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])

  for (const key of allKeys) {
    const valA = a[key]
    const valB = b[key]

    if (deepEqual(valA, valB)) continue

    if (isPlainObj(valA) && isPlainObj(valB)) {
      const nested = diff(valA, valB)
      if (Object.keys(nested).length > 0) {
        ;(result as any)[key] = nested
      }
    } else {
      ;(result as any)[key] = valB
    }
  }

  return result
}
