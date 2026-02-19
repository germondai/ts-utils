import { describe, test, expect } from 'bun:test'
import {
  pick,
  omit,
  merge,
  flattenObject,
  unflattenObject,
  diff,
} from '../src/runtime/object'

// ---------------------------------------------------------------------------
// pick
// ---------------------------------------------------------------------------
describe('pick', () => {
  test('picks specified keys from an object', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  test('returns empty object when no keys are specified', () => {
    expect(pick({ a: 1, b: 2 }, [])).toEqual({})
  })

  test('ignores keys that do not exist on the source object', () => {
    const result = pick({ a: 1 } as Record<string, number>, ['a', 'z' as any])
    expect(result).toEqual({ a: 1 })
  })

  test('works with a single key', () => {
    expect(pick({ x: 10, y: 20 }, ['x'])).toEqual({ x: 10 })
  })

  test('preserves value types including nested objects', () => {
    const src = { a: [1, 2], b: { nested: true }, c: 'hello' }
    const result = pick(src, ['a', 'b'])
    expect(result).toEqual({ a: [1, 2], b: { nested: true } })
  })

  test('returns empty object when source is empty', () => {
    expect(pick({}, [])).toEqual({})
  })
})

// ---------------------------------------------------------------------------
// omit
// ---------------------------------------------------------------------------
describe('omit', () => {
  test('omits specified keys from an object', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
  })

  test('returns a shallow copy when no keys are omitted', () => {
    const src = { a: 1, b: 2 }
    const result = omit(src, [])
    expect(result).toEqual(src)
    expect(result).not.toBe(src) // must be a new reference
  })

  test('omits multiple keys', () => {
    expect(omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c'])).toEqual({
      b: 2,
      d: 4,
    })
  })

  test('handles keys that do not exist gracefully', () => {
    const result = omit({ a: 1 } as Record<string, number>, ['z' as any])
    expect(result).toEqual({ a: 1 })
  })

  test('returns empty object when all keys are omitted', () => {
    expect(omit({ a: 1, b: 2 }, ['a', 'b'])).toEqual({})
  })
})

// ---------------------------------------------------------------------------
// merge (deep merge)
// ---------------------------------------------------------------------------
describe('merge', () => {
  test('shallow merges two flat objects', () => {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('later values override earlier ones for the same key', () => {
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  test('deep merges nested objects', () => {
    expect(merge({ a: 1, b: { c: 2 } }, { b: { d: 3 } })).toEqual({
      a: 1,
      b: { c: 2, d: 3 },
    })
  })

  test('deep merges multiple levels', () => {
    const a = { x: { y: { z: 1, w: 2 } } }
    const b = { x: { y: { z: 10, v: 3 } } }
    expect(merge(a, b)).toEqual({ x: { y: { z: 10, w: 2, v: 3 } } })
  })

  test('merges more than two objects', () => {
    expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({
      a: 1,
      b: 2,
      c: 3,
    })
  })

  test('last object wins for conflicting keys across many objects', () => {
    expect(merge({ a: 1 }, { a: 2 }, { a: 3 })).toEqual({ a: 3 })
  })

  test('non-plain-object values overwrite rather than merge', () => {
    expect(merge({ a: { b: 1 } }, { a: [1, 2] as any })).toEqual({
      a: [1, 2],
    })
  })

  test('returns empty object when called with no arguments', () => {
    expect(merge()).toEqual({})
  })

  test('does not mutate the source objects', () => {
    const a = { x: { y: 1 } }
    const b = { x: { z: 2 } }
    merge(a, b)
    expect(a).toEqual({ x: { y: 1 } })
    expect(b).toEqual({ x: { z: 2 } })
  })
})

// ---------------------------------------------------------------------------
// flattenObject
// ---------------------------------------------------------------------------
describe('flattenObject', () => {
  test('flattens a nested object with dot-separated keys', () => {
    expect(flattenObject({ a: { b: 1, c: { d: 2 } } })).toEqual({
      'a.b': 1,
      'a.c.d': 2,
    })
  })

  test('returns the same shape for an already flat object', () => {
    expect(flattenObject({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('handles empty object', () => {
    expect(flattenObject({})).toEqual({})
  })

  test('preserves non-plain-object values (arrays, null)', () => {
    expect(flattenObject({ a: [1, 2], b: null as any })).toEqual({
      a: [1, 2],
      b: null,
    })
  })

  test('handles deeply nested structures', () => {
    expect(flattenObject({ a: { b: { c: { d: { e: 5 } } } } })).toEqual({
      'a.b.c.d.e': 5,
    })
  })

  test('supports a custom prefix', () => {
    expect(flattenObject({ x: 1 }, 'root')).toEqual({ 'root.x': 1 })
  })
})

// ---------------------------------------------------------------------------
// unflattenObject
// ---------------------------------------------------------------------------
describe('unflattenObject', () => {
  test('unflattens a dot-separated object into nested structure', () => {
    expect(unflattenObject({ 'a.b': 1, 'a.c.d': 2 })).toEqual({
      a: { b: 1, c: { d: 2 } },
    })
  })

  test('returns the same shape for a flat (no dots) object', () => {
    expect(unflattenObject({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('handles empty object', () => {
    expect(unflattenObject({})).toEqual({})
  })

  test('handles deeply nested keys', () => {
    expect(unflattenObject({ 'a.b.c.d.e': 5 })).toEqual({
      a: { b: { c: { d: { e: 5 } } } },
    })
  })

  test('is the inverse of flattenObject', () => {
    const original = { a: { b: 1, c: { d: 2 } }, e: 3 }
    expect(unflattenObject(flattenObject(original))).toEqual(original)
  })

  test('later keys overwrite earlier ones at the same path', () => {
    // When both "a.b" keys exist, the last one wins (JS object key semantics)
    const input: Record<string, number> = {}
    input['a.b'] = 1
    input['a.b'] = 2
    expect(unflattenObject(input)).toEqual({ a: { b: 2 } })
  })
})

// ---------------------------------------------------------------------------
// diff
// ---------------------------------------------------------------------------
describe('diff', () => {
  test('returns differing values from the second object', () => {
    expect(diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 } as any)).toEqual({
      b: 3,
      c: 4,
    })
  })

  test('returns empty object when objects are identical', () => {
    expect(diff({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({})
  })

  test('detects keys only in the first object (value becomes undefined)', () => {
    const result = diff({ a: 1, b: 2 } as any, { a: 1 } as any)
    expect(result).toEqual({ b: undefined })
  })

  test('detects keys only in the second object', () => {
    const result = diff({ a: 1 } as any, { a: 1, b: 2 } as any)
    expect(result).toEqual({ b: 2 })
  })

  test('returns empty object for two empty objects', () => {
    expect(diff({}, {})).toEqual({})
  })

  test('deep compares nested objects with equal values', () => {
    const a = { x: { nested: true } }
    const b = { x: { nested: true } }
    expect(diff(a, b)).toEqual({})
  })

  test('detects type changes for the same key', () => {
    expect(diff({ a: '1' } as any, { a: 1 } as any)).toEqual({ a: 1 })
  })

  test('recursively diffs nested objects', () => {
    const a = { a: 1, b: { c: 2, d: 3 } }
    const b = { a: 1, b: { c: 5, d: 3 } }
    expect(diff(a, b)).toEqual({ b: { c: 5 } })
  })

  test('handles deeply nested differences', () => {
    const a = { x: { y: { z: 1, w: 2 } } }
    const b = { x: { y: { z: 1, w: 9 } } }
    expect(diff(a, b)).toEqual({ x: { y: { w: 9 } } })
  })

  test('returns entire array when arrays differ', () => {
    const a = { tags: [1, 2] }
    const b = { tags: [1, 3] }
    expect(diff(a, b)).toEqual({ tags: [1, 3] })
  })

  test('returns empty when arrays are deeply equal', () => {
    const a = { tags: [1, 2, 3] }
    const b = { tags: [1, 2, 3] }
    expect(diff(a, b)).toEqual({})
  })

  test('handles mixed nested changes and additions', () => {
    const a = { a: 1, b: { c: 2 } }
    const b = { a: 1, b: { c: 2, d: 4 } } as any
    expect(diff(a, b)).toEqual({ b: { d: 4 } })
  })
})
