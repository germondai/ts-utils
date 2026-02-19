import { describe, test, expect } from 'bun:test'
import { clone, isEqual } from '../src/runtime/data'

describe('clone', () => {
  test('clones primitive string', () => {
    expect(clone('hello')).toBe('hello')
  })

  test('clones primitive number', () => {
    expect(clone(42)).toBe(42)
  })

  test('clones primitive boolean', () => {
    expect(clone(true)).toBe(true)
  })

  test('clones null', () => {
    expect(clone(null)).toBe(null)
  })

  test('clones a flat object', () => {
    const obj = { a: 1, b: 'two', c: true }
    const cloned = clone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
  })

  test('clones a nested object deeply', () => {
    const obj = { a: { b: { c: 3 } } }
    const cloned = clone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned.a).not.toBe(obj.a)
    expect(cloned.a.b).not.toBe(obj.a.b)
  })

  test('clones an array', () => {
    const arr = [1, 2, [3, 4]]
    const cloned = clone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[2]).not.toBe(arr[2])
  })

  test('mutations to clone do not affect original', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = clone(obj)
    cloned.b.c = 999
    expect(obj.b.c).toBe(2)
  })

  test('clones object with arrays', () => {
    const obj = { items: [1, 2, 3], meta: { count: 3 } }
    const cloned = clone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned.items).not.toBe(obj.items)
    expect(cloned.meta).not.toBe(obj.meta)
  })

  test('clones Date objects', () => {
    const date = new Date('2025-01-01')
    const cloned = clone(date)
    expect(cloned).toEqual(date)
    expect(cloned).not.toBe(date)
  })
})

describe('isEqual', () => {
  test('compares equal primitive numbers', () => {
    expect(isEqual(1, 1)).toBe(true)
  })

  test('compares unequal primitive numbers', () => {
    expect(isEqual(1, 2)).toBe(false)
  })

  test('compares equal strings', () => {
    expect(isEqual('hello', 'hello')).toBe(true)
  })

  test('compares unequal strings', () => {
    expect(isEqual('hello', 'world')).toBe(false)
  })

  test('compares booleans', () => {
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(true, false)).toBe(false)
  })

  test('compares null values', () => {
    expect(isEqual(null, null)).toBe(true)
  })

  test('compares null with non-null', () => {
    expect(isEqual(null, 1)).toBe(false)
    expect(isEqual(1, null)).toBe(false)
  })

  test('compares undefined values', () => {
    expect(isEqual(undefined, undefined)).toBe(true)
  })

  test('compares null with undefined', () => {
    expect(isEqual(null, undefined)).toBe(false)
  })

  test('compares equal flat objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
  })

  test('compares unequal flat objects', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  test('compares objects with different keys', () => {
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  test('compares objects with different number of keys', () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  test('compares deeply nested objects', () => {
    const a = { x: { y: { z: 1 } } }
    const b = { x: { y: { z: 1 } } }
    expect(isEqual(a, b)).toBe(true)
  })

  test('compares unequal deeply nested objects', () => {
    const a = { x: { y: { z: 1 } } }
    const b = { x: { y: { z: 2 } } }
    expect(isEqual(a, b)).toBe(false)
  })

  test('compares equal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  test('compares unequal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  test('compares arrays of different lengths', () => {
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  test('compares nested arrays', () => {
    expect(isEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true)
  })

  test('compares arrays with objects', () => {
    expect(isEqual([{ a: 1 }], [{ a: 1 }])).toBe(true)
    expect(isEqual([{ a: 1 }], [{ a: 2 }])).toBe(false)
  })

  test('handles circular references without stack overflow', () => {
    const a: any = { x: 1 }
    a.self = a
    const b: any = { x: 1 }
    b.self = b
    expect(() => isEqual(a, b)).not.toThrow()
  })

  test('circular references with different structures return false', () => {
    const a: any = { x: 1 }
    a.self = a
    const b: any = { x: 2 }
    b.self = b
    expect(isEqual(a, b)).toBe(false)
  })
})
