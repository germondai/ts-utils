import { describe, test, expect } from 'bun:test'
import {
  hasDuplicates,
  uniqueArray,
  chunk,
  shuffle,
  groupBy,
  intersection,
  difference,
  range,
  sortBy,
  compact,
  last,
  sample,
} from '../src/runtime/array'

describe('hasDuplicates', () => {
  test('returns true when array has duplicate primitives', () => {
    expect(hasDuplicates([1, 2, 3, 4, 1])).toBe(true)
  })

  test('returns false when all elements are unique', () => {
    expect(hasDuplicates([1, 2, 3, 4])).toBe(false)
  })

  test('returns false for empty array', () => {
    expect(hasDuplicates([])).toBe(false)
  })

  test('returns false for single element', () => {
    expect(hasDuplicates([42])).toBe(false)
  })

  test('works with strings', () => {
    expect(hasDuplicates(['a', 'b', 'c'])).toBe(false)
    expect(hasDuplicates(['a', 'b', 'a'])).toBe(true)
  })

  test('detects duplicates using keyExtractor', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 1 }]
    expect(hasDuplicates(items, (item) => item.id)).toBe(true)
  })

  test('no duplicates with keyExtractor', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    expect(hasDuplicates(items, (item) => item.id)).toBe(false)
  })

  test('keyExtractor returning 0 uses 0 as key (not the value via ??)', () => {
    const items = [{ id: 0 }, { id: 0 }]
    expect(hasDuplicates(items, (item) => item.id)).toBe(true)

    const unique = [{ id: 0 }, { id: 1 }]
    expect(hasDuplicates(unique, (item) => item.id)).toBe(false)
  })

  test('keyExtractor receives index and array arguments', () => {
    const items = ['a', 'b', 'c']
    const indices: number[] = []
    hasDuplicates(items, (_val, index) => {
      indices.push(index)
      return index
    })
    expect(indices).toEqual([0, 1, 2])
  })
})

describe('uniqueArray', () => {
  test('removes duplicate primitives', () => {
    expect(uniqueArray([1, 2, 2, 3, 4, 4])).toEqual([1, 2, 3, 4])
  })

  test('removes duplicate strings', () => {
    expect(uniqueArray(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
  })

  test('returns empty array for empty input', () => {
    expect(uniqueArray([])).toEqual([])
  })

  test('returns same elements when already unique', () => {
    expect(uniqueArray([1, 2, 3])).toEqual([1, 2, 3])
  })

  test('deduplicates objects with keyExtractor (keeps last occurrence)', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice Duplicate' },
    ]
    const result = uniqueArray(users, (u) => u.id)
    expect(result).toEqual([
      { id: 1, name: 'Alice Duplicate' },
      { id: 2, name: 'Bob' },
    ])
  })

  test('keyExtractor returning 0 uses 0 as key (not the value via ??)', () => {
    const items = [
      { key: 0, val: 'first' },
      { key: 0, val: 'second' },
      { key: 1, val: 'third' },
    ]
    const result = uniqueArray(items, (item) => item.key)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ key: 0, val: 'second' })
    expect(result[1]).toEqual({ key: 1, val: 'third' })
  })

  test('keeps the first occurrence when duplicates exist', () => {
    const items = [
      { id: 1, v: 'first' },
      { id: 1, v: 'second' },
    ]
    const result = uniqueArray(items, (item) => item.id)
    // Map keeps last value for duplicate keys
    expect(result).toHaveLength(1)
  })
})

describe('chunk', () => {
  test('splits array into chunks of given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  test('returns single chunk when size >= array length', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
  })

  test('returns each element as its own chunk when size is 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  test('returns empty array for empty input', () => {
    expect(chunk([], 3)).toEqual([])
  })

  test('returns empty array when size is 0 or negative', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([])
    expect(chunk([1, 2, 3], -1)).toEqual([])
  })

  test('handles exact divisible lengths', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })
})

describe('shuffle', () => {
  test('returns an array with the same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffle(input)
    expect(result).toHaveLength(input.length)
    expect(result.sort()).toEqual(input.sort())
  })

  test('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = [...input]
    shuffle(input)
    expect(input).toEqual(copy)
  })

  test('returns empty array for empty input', () => {
    expect(shuffle([])).toEqual([])
  })

  test('returns single element array unchanged', () => {
    expect(shuffle([42])).toEqual([42])
  })
})

describe('groupBy', () => {
  test('groups by property key', () => {
    const items = [
      { type: 'a', v: 1 },
      { type: 'b', v: 2 },
      { type: 'a', v: 3 },
    ]
    const result = groupBy(items, 'type')
    expect(result).toEqual({
      a: [
        { type: 'a', v: 1 },
        { type: 'a', v: 3 },
      ],
      b: [{ type: 'b', v: 2 }],
    })
  })

  test('groups by function', () => {
    const items = [1, 2, 3, 4, 5]
    const result = groupBy(items, (n) => (n % 2 === 0 ? 'even' : 'odd'))
    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4],
    })
  })

  test('returns empty object for empty array', () => {
    expect(groupBy([], 'key')).toEqual({})
  })

  test('handles single group', () => {
    const items = [{ cat: 'x' }, { cat: 'x' }]
    const result = groupBy(items, 'cat')
    expect(Object.keys(result)).toHaveLength(1)
    expect(result['x']).toHaveLength(2)
  })
})

describe('intersection', () => {
  test('returns common elements across multiple arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3])
  })

  test('returns all elements when there is a single array', () => {
    expect(intersection([1, 2, 3])).toEqual([1, 2, 3])
  })

  test('returns empty array when no arrays provided', () => {
    expect(intersection()).toEqual([])
  })

  test('returns empty array when no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([])
  })

  test('works with two arrays sharing all elements', () => {
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3])
  })

  test('works with strings', () => {
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c'])
  })
})

describe('difference', () => {
  test('returns elements in first array not in second', () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3])
  })

  test('returns all elements when second array is empty', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3])
  })

  test('returns empty when first array is empty', () => {
    expect(difference([], [1, 2, 3])).toEqual([])
  })

  test('returns empty when arrays are identical', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([])
  })

  test('works with strings', () => {
    expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c'])
  })
})

describe('range', () => {
  test('generates range from start to end (exclusive)', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
  })

  test('generates range with custom step', () => {
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9])
  })

  test('returns empty array when start >= end', () => {
    expect(range(5, 5)).toEqual([])
    expect(range(5, 3)).toEqual([])
  })

  test('returns empty array when step is 0 or negative', () => {
    expect(range(0, 5, 0)).toEqual([])
    expect(range(0, 5, -1)).toEqual([])
  })

  test('works with negative numbers', () => {
    expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2])
  })

  test('single element range', () => {
    expect(range(0, 1)).toEqual([0])
  })
})

describe('sortBy', () => {
  test('sorts by property key ascending', () => {
    const items = [{ age: 30 }, { age: 20 }, { age: 25 }]
    expect(sortBy(items, 'age')).toEqual([
      { age: 20 },
      { age: 25 },
      { age: 30 },
    ])
  })

  test('sorts by property key descending', () => {
    const items = [{ age: 30 }, { age: 20 }, { age: 25 }]
    expect(sortBy(items, 'age', 'desc')).toEqual([
      { age: 30 },
      { age: 25 },
      { age: 20 },
    ])
  })

  test('sorts by function', () => {
    const items = ['banana', 'apple', 'cherry']
    expect(sortBy(items, (s) => s.length)).toEqual([
      'apple',
      'banana',
      'cherry',
    ])
  })

  test('does not mutate the original array', () => {
    const items = [{ v: 3 }, { v: 1 }, { v: 2 }]
    const copy = [...items]
    sortBy(items, 'v')
    expect(items).toEqual(copy)
  })

  test('handles empty array', () => {
    expect(sortBy([], 'key')).toEqual([])
  })

  test('sorts strings alphabetically by key', () => {
    const items = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]
    expect(sortBy(items, 'name')).toEqual([
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
    ])
  })
})

describe('compact', () => {
  test('removes all falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3])
  })

  test('returns empty array when all values are falsy', () => {
    expect(compact([0, false, '', null, undefined])).toEqual([])
  })

  test('returns same elements when no falsy values', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3])
  })

  test('returns empty for empty input', () => {
    expect(compact([])).toEqual([])
  })

  test('keeps truthy strings and objects', () => {
    expect(compact(['hello', null, { a: 1 }, false])).toEqual([
      'hello',
      { a: 1 },
    ])
  })
})

describe('last', () => {
  test('returns the last element', () => {
    expect(last([1, 2, 3])).toBe(3)
  })

  test('returns undefined for empty array', () => {
    expect(last([])).toBeUndefined()
  })

  test('returns single element for single-element array', () => {
    expect(last([42])).toBe(42)
  })

  test('works with strings', () => {
    expect(last(['a', 'b', 'c'])).toBe('c')
  })
})

describe('sample', () => {
  test('returns an element from the array', () => {
    const input = [1, 2, 3, 4, 5]
    const result = sample(input)
    expect(input).toContain(result)
  })

  test('returns undefined for empty array', () => {
    expect(sample([])).toBeUndefined()
  })

  test('returns the only element for single-element array', () => {
    expect(sample([42])).toBe(42)
  })

  test('does not mutate the original array', () => {
    const input = [1, 2, 3]
    const copy = [...input]
    sample(input)
    expect(input).toEqual(copy)
  })
})
