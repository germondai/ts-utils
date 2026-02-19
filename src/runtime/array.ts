/**
 * Determines whether an array contains duplicate values.
 *
 * @param array - The array to check for duplicates.
 * @param keyExtractor - Optional function to extract a key for comparison. If provided, duplicates are determined based on the extracted key.
 * @returns True if the array contains duplicates, false otherwise.
 *
 * @example
 * // Basic usage with primitive values
 * hasDuplicates([1, 2, 3, 4, 1]); // true
 * hasDuplicates(['a', 'b', 'c']); // false
 *
 * // Usage with objects and a key extractor
 * hasDuplicates([{ id: 1 }, { id: 2 }, { id: 1 }], (item) => item.id); // true
 */
export const hasDuplicates = <T>(
  array: T[],
  keyExtractor?: (value: T, index: number, array: T[]) => string | number,
): boolean =>
  new Set(
    array.map((value, index) => keyExtractor?.(value, index, array) ?? value),
  ).size < array.length

/**
 * Removes duplicates from an array based on a key function.
 *
 * @param array - The array to process.
 * @param keyExtractor - Function to generate a unique key for each item.
 * @returns A new array without duplicates.
 */
/**
 * Returns a new array containing only unique elements from the input array.
 * Uniqueness is determined based on the values returned by the `keyExtractor` function,
 * or by the elements themselves if no `keyExtractor` is provided.
 *
 * @typeParam T - The type of elements in the input array.
 * @param array - The input array from which to extract unique elements.
 * @param keyExtractor - An optional function that extracts a key from each element
 * to determine uniqueness. If not provided, the elements themselves are used.
 * The function receives the current element, its index, and the entire array as arguments.
 * @returns A new array containing only unique elements from the input array.
 *
 * @example
 * // Using default behavior (elements themselves determine uniqueness)
 * const numbers = [1, 2, 2, 3, 4, 4];
 * const uniqueNumbers = uniqueArray(numbers);
 * console.log(uniqueNumbers); // Output: [1, 2, 3, 4]
 *
 * @example
 * // Using a keyExtractor to determine uniqueness
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' },
 * ];
 * const uniqueUsers = uniqueArray(users, user => user.id);
 * console.log(uniqueUsers);
 * // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
export const uniqueArray = <T>(
  array: T[],
  keyExtractor?: (value: T, index: number, array: T[]) => string | number,
): T[] => [
  ...new Map(
    array.map((value, index, array) => [
      keyExtractor?.(value, index, array) ?? value,
      value,
    ]),
  ).values(),
]

/**
 * Splits an array into chunks of the specified size.
 *
 * @param array - The array to split.
 * @param size - The size of each chunk.
 * @returns An array of chunks.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) return []
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

/**
 * Returns a new array with elements shuffled using the Fisher-Yates algorithm.
 *
 * @param array - The array to shuffle.
 * @returns A new shuffled array.
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Groups array elements by a key or function.
 *
 * @param array - The array to group.
 * @param key - A property key or function to determine the group.
 * @returns An object with groups as keys and arrays of items as values.
 *
 * @example
 * groupBy([{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }], 'type')
 * // { a: [{ type: 'a', v: 1 }, { type: 'a', v: 3 }], b: [{ type: 'b', v: 2 }] }
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => string),
): Record<string, T[]> => {
  const getKey =
    typeof key === 'function' ? key : (item: T) => String(item[key])
  const result: Record<string, T[]> = {}
  for (const item of array) {
    const k = getKey(item)
    if (!result[k]) result[k] = []
    result[k].push(item)
  }
  return result
}

/**
 * Returns elements common to all provided arrays.
 *
 * @param arrays - The arrays to intersect.
 * @returns An array of common elements.
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
 */
export const intersection = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) return []
  return arrays.reduce((acc, arr) => acc.filter((item) => arr.includes(item)))
}

/**
 * Returns elements that are in the first array but not in the second.
 *
 * @param a - The source array.
 * @param b - The array of elements to exclude.
 * @returns A new array with elements from `a` not found in `b`.
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 */
export const difference = <T>(a: T[], b: T[]): T[] =>
  a.filter((item) => !b.includes(item))

/**
 * Generates an array of numbers in a given range.
 *
 * @param start - The start of the range.
 * @param end - The end of the range (exclusive).
 * @param step - The step between numbers (default: 1).
 * @returns An array of numbers.
 *
 * @example
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(0, 10, 3) // [0, 3, 6, 9]
 */
export const range = (
  start: number,
  end: number,
  step: number = 1,
): number[] => {
  if (step <= 0) return []
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

/**
 * Returns a new sorted array by a key or comparator function.
 *
 * @param array - The array to sort.
 * @param key - A property key or function returning a comparable value.
 * @param order - Sort order: 'asc' (default) or 'desc'.
 * @returns A new sorted array.
 *
 * @example
 * sortBy([{ age: 30 }, { age: 20 }], 'age') // [{ age: 20 }, { age: 30 }]
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => number | string),
  order: 'asc' | 'desc' = 'asc',
): T[] => {
  const getVal =
    typeof key === 'function' ? key : (item: T) => item[key] as number | string
  return [...array].sort((a, b) => {
    const va = getVal(a)
    const vb = getVal(b)
    const cmp = va < vb ? -1 : va > vb ? 1 : 0
    return order === 'desc' ? -cmp : cmp
  })
}

/**
 * Removes all falsy values from an array.
 *
 * @param array - The array to compact.
 * @returns A new array with falsy values removed.
 *
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined]) // [1, 2, 3]
 */
export const compact = <T>(
  array: (T | null | undefined | false | 0 | '')[],
): T[] => array.filter(Boolean) as T[]

/**
 * Returns the last element of an array.
 *
 * @param array - The array.
 * @returns The last element, or undefined if empty.
 *
 * @example
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 */
export const last = <T>(array: T[]): T | undefined => array[array.length - 1]

/**
 * Returns a random element from an array.
 *
 * @param array - The array.
 * @returns A random element, or undefined if empty.
 *
 * @example
 * sample([1, 2, 3]) // 2 (random)
 */
export const sample = <T>(array: T[]): T | undefined =>
  array.length === 0
    ? undefined
    : array[Math.floor(Math.random() * array.length)]
