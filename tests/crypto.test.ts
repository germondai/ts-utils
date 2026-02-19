import { describe, test, expect } from 'bun:test'
import { generateId, hash } from '../src/runtime/crypto'

describe('generateId', () => {
  test('returns a string of default length 16', () => {
    const id = generateId()
    expect(id).toBeString()
    expect(id.length).toBe(16)
  })

  test('returns a string of the specified length', () => {
    expect(generateId(8).length).toBe(8)
    expect(generateId(1).length).toBe(1)
    expect(generateId(64).length).toBe(64)
  })

  test('returns an empty string when length is 0', () => {
    expect(generateId(0)).toBe('')
  })

  test('contains only alphanumeric characters', () => {
    const id = generateId(200)
    expect(id).toMatch(/^[A-Za-z0-9]+$/)
  })

  test('generates unique IDs across multiple calls', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })

  test('different lengths produce different-length results', () => {
    const short = generateId(4)
    const long = generateId(32)
    expect(short.length).not.toBe(long.length)
  })
})

describe('hash', () => {
  test('returns a number', () => {
    expect(typeof hash('hello')).toBe('number')
  })

  test('is deterministic (same input produces same output)', () => {
    expect(hash('hello')).toBe(hash('hello'))
    expect(hash('')).toBe(hash(''))
    expect(hash('test string 123')).toBe(hash('test string 123'))
  })

  test('different strings produce different hashes', () => {
    expect(hash('hello')).not.toBe(hash('world'))
    expect(hash('abc')).not.toBe(hash('cba'))
    expect(hash('a')).not.toBe(hash('b'))
  })

  test('returns a non-negative integer (unsigned 32-bit)', () => {
    const values = ['hello', 'world', '', 'foo', 'a very long string indeed']
    for (const v of values) {
      const h = hash(v)
      expect(h).toBeGreaterThanOrEqual(0)
      expect(h).toBeLessThanOrEqual(0xffffffff)
      expect(Number.isInteger(h)).toBe(true)
    }
  })

  test('handles empty string', () => {
    const h = hash('')
    expect(typeof h).toBe('number')
    expect(h).toBe(5381) // djb2 initial value with no iterations
  })

  test('handles special characters', () => {
    const h1 = hash('!@#$%^&*()')
    const h2 = hash('hello world!')
    expect(typeof h1).toBe('number')
    expect(typeof h2).toBe('number')
    expect(h1).not.toBe(h2)
  })
})
