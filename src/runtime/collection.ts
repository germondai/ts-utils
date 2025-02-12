/**
 * Checks if an array contains duplicate values.
 *
 * @param array - The array to check for duplicates.
 * @returns True if the array contains duplicates, false otherwise.
 *
 * @example
 * hasDuplicates([1, 2, 3, 4, 1]); // true
 * hasDuplicates(['a', 'b', 'c']); // false
 * hasDuplicates([{ id: 1 }, { id: 2 }, { id: 1 }], (item) => item.id); // true
 */
export const hasDuplicates = <T>(
  array: T[],
  keyExtractor?: (item: T) => unknown,
): boolean => {
  const seen = new Set()

  for (const item of array) {
    const key = keyExtractor ? keyExtractor(item) : item
    if (seen.has(key)) return true
    seen.add(key)
  }

  return false
}

/**
 * Removes duplicates from an array.
 *
 * @param array - The array to process.
 * @returns A new array without duplicates.
 */
export const uniqueArray = <T>(array: T[]): T[] => [...new Set(array)]
