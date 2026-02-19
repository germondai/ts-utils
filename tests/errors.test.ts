import { describe, test, expect } from 'bun:test'
import { catchError } from '../src/runtime/errors'

describe('catchError', () => {
  test('returns data and ok: true on success', async () => {
    const result = await catchError(() => Promise.resolve(42))
    expect(result.ok).toBe(true)
    expect(result.data).toBe(42)
    expect(result.error).toBeUndefined()
  })

  test('returns complex data on success', async () => {
    const payload = { id: 1, name: 'test' }
    const result = await catchError(() => Promise.resolve(payload))
    expect(result.ok).toBe(true)
    expect(result.data).toEqual(payload)
  })

  test('catches any error when errorsToCatch is not provided', async () => {
    const result = await catchError(() => Promise.reject(new Error('fail')))
    expect(result.ok).toBe(false)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error!.message).toBe('fail')
    expect(result.data).toBeUndefined()
  })

  test('catches a TypeError when it is in errorsToCatch', async () => {
    const result = await catchError(
      () => Promise.reject(new TypeError('type error')),
      [TypeError],
    )
    expect(result.ok).toBe(false)
    expect(result.error).toBeInstanceOf(TypeError)
    expect(result.error!.message).toBe('type error')
  })

  test('catches error matching one of multiple specified types', async () => {
    const result = await catchError(
      () => Promise.reject(new RangeError('out of range')),
      [TypeError, RangeError],
    )
    expect(result.ok).toBe(false)
    expect(result.error).toBeInstanceOf(RangeError)
  })

  test('rethrows errors not in errorsToCatch', async () => {
    expect(
      catchError(
        () => Promise.reject(new RangeError('range error')),
        [TypeError],
      ),
    ).rejects.toThrow(RangeError)
  })

  test('rethrows errors when none of the specified types match', async () => {
    expect(
      catchError(
        () => Promise.reject(new SyntaxError('syntax')),
        [TypeError, RangeError],
      ),
    ).rejects.toThrow(SyntaxError)
  })

  test('catches subclass errors matched by parent class', async () => {
    const result = await catchError(
      () => Promise.reject(new TypeError('sub')),
      [Error],
    )
    expect(result.ok).toBe(false)
    expect(result.error).toBeInstanceOf(TypeError)
  })

  test('handles async functions that resolve after delay', async () => {
    const result = await catchError(async () => {
      await new Promise((r) => setTimeout(r, 10))
      return 'delayed'
    })
    expect(result.ok).toBe(true)
    expect(result.data).toBe('delayed')
  })

  test('handles async functions that reject after delay', async () => {
    const result = await catchError(async () => {
      await new Promise((r) => setTimeout(r, 10))
      throw new Error('delayed error')
    })
    expect(result.ok).toBe(false)
    expect(result.error!.message).toBe('delayed error')
  })
})
