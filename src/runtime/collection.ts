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
    array.map((value, index) => keyExtractor?.(value, index, array) || value),
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
      keyExtractor?.(value, index, array) || value,
      value,
    ]),
  ).values(),
]
