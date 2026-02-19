import { describe, test, expect } from 'bun:test'
import { normalize } from '../src/runtime/normalize'

describe('normalize', () => {
  describe('strings', () => {
    test('returns non-empty string as-is', () => {
      expect(normalize('hello')).toBe('hello')
    })

    test('returns null for empty string', () => {
      expect(normalize('')).toBe(null)
    })

    test('preserves whitespace-only string', () => {
      expect(normalize('  ')).toBe('  ')
    })
  })

  describe('numbers', () => {
    test('returns valid number as-is', () => {
      expect(normalize(42)).toBe(42)
    })

    test('returns zero as-is', () => {
      expect(normalize(0)).toBe(0)
    })

    test('returns negative number as-is', () => {
      expect(normalize(-5)).toBe(-5)
    })

    test('returns null for NaN', () => {
      expect(normalize(NaN)).toBe(null)
    })

    test('preserves Infinity', () => {
      expect(normalize(Infinity)).toBe(Infinity)
    })
  })

  describe('booleans', () => {
    test('returns true as-is', () => {
      expect(normalize(true)).toBe(true)
    })

    test('returns false as-is', () => {
      expect(normalize(false)).toBe(false)
    })
  })

  describe('null and undefined', () => {
    test('returns null for null', () => {
      expect(normalize(null)).toBe(null)
    })

    test('returns null for undefined', () => {
      expect(normalize(undefined)).toBe(null)
    })
  })

  describe('Date', () => {
    test('returns valid Date as-is', () => {
      const date = new Date('2025-01-01')
      expect(normalize(date)).toBe(date)
    })

    test('returns null for invalid Date', () => {
      expect(normalize(new Date('invalid'))).toBe(null)
    })
  })

  describe('arrays', () => {
    test('returns non-empty array as-is', () => {
      const arr = [1, 2, 3]
      expect(normalize(arr)).toBe(arr)
    })

    test('returns null for empty array', () => {
      expect(normalize([])).toBe(null)
    })

    test('preserves array with falsy values', () => {
      const arr = [0, false, null]
      expect(normalize(arr)).toBe(arr)
    })
  })

  describe('Sets', () => {
    test('returns non-empty Set as-is', () => {
      const set = new Set([1, 2, 3])
      expect(normalize(set)).toBe(set)
    })

    test('returns null for empty Set', () => {
      expect(normalize(new Set())).toBe(null)
    })
  })

  describe('Maps', () => {
    test('returns non-empty Map as-is', () => {
      const map = new Map([['a', 1]])
      expect(normalize(map)).toBe(map)
    })

    test('returns null for empty Map', () => {
      expect(normalize(new Map())).toBe(null)
    })
  })

  describe('objects', () => {
    test('returns non-empty object as-is', () => {
      const obj = { a: 1 }
      expect(normalize(obj)).toBe(obj)
    })

    test('returns null for empty object', () => {
      expect(normalize({})).toBe(null)
    })

    test('preserves object with falsy values', () => {
      const obj = { a: 0, b: false, c: null }
      expect(normalize(obj)).toBe(obj)
    })
  })
})
