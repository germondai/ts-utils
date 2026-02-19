import { describe, test, expect } from 'bun:test'
import { sleep, retry, timeout } from '../src/runtime/promise'

describe('sleep', () => {
  test('resolves after the specified delay', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(40) // allow small timing variance
  })

  test('resolves with undefined', async () => {
    const result = await sleep(10)
    expect(result).toBeUndefined()
  })

  test('resolves with 0ms delay', async () => {
    const start = Date.now()
    await sleep(0)
    const elapsed = Date.now() - start
    expect(elapsed).toBeLessThan(50)
  })
})

describe('retry', () => {
  test('returns the result on first success', async () => {
    const result = await retry(() => Promise.resolve('ok'))
    expect(result).toBe('ok')
  })

  test('retries on failure and succeeds eventually', async () => {
    let attempts = 0
    const result = await retry(
      () => {
        attempts++
        if (attempts < 3) throw new Error('fail')
        return Promise.resolve('success')
      },
      { retries: 3, delay: 10 },
    )
    expect(result).toBe('success')
    expect(attempts).toBe(3)
  })

  test('throws after exhausting all retries', async () => {
    let attempts = 0
    await expect(
      retry(
        () => {
          attempts++
          return Promise.reject(new Error('always fails'))
        },
        { retries: 2, delay: 10 },
      ),
    ).rejects.toThrow('always fails')
    expect(attempts).toBe(3) // 1 initial + 2 retries
  })

  test('uses default options when none provided', async () => {
    let attempts = 0
    await expect(
      retry(
        () => {
          attempts++
          return Promise.reject(new Error('fail'))
        },
        { delay: 10 }, // override delay to speed up test, keep default retries=3
      ),
    ).rejects.toThrow('fail')
    expect(attempts).toBe(4) // 1 initial + 3 retries (default)
  })

  test('respects retries count of 0 (no retries)', async () => {
    let attempts = 0
    await expect(
      retry(
        () => {
          attempts++
          return Promise.reject(new Error('fail'))
        },
        { retries: 0 },
      ),
    ).rejects.toThrow('fail')
    expect(attempts).toBe(1)
  })

  test('applies exponential backoff when backoff is true', async () => {
    let attempts = 0
    const start = Date.now()

    await expect(
      retry(
        () => {
          attempts++
          return Promise.reject(new Error('fail'))
        },
        { retries: 2, delay: 20, backoff: true },
      ),
    ).rejects.toThrow('fail')

    const elapsed = Date.now() - start
    // With backoff: delay=20 (attempt 0), delay=40 (attempt 1) => total ~60ms
    expect(elapsed).toBeGreaterThanOrEqual(50)
    expect(attempts).toBe(3)
  })

  test('uses constant delay when backoff is false', async () => {
    let attempts = 0
    const start = Date.now()

    await expect(
      retry(
        () => {
          attempts++
          return Promise.reject(new Error('fail'))
        },
        { retries: 2, delay: 20, backoff: false },
      ),
    ).rejects.toThrow('fail')

    const elapsed = Date.now() - start
    // Without backoff: delay=20 + delay=20 => total ~40ms
    expect(elapsed).toBeGreaterThanOrEqual(30)
    expect(elapsed).toBeLessThan(100)
  })

  test('throws the last error when all retries fail', async () => {
    let count = 0
    await expect(
      retry(
        () => {
          count++
          return Promise.reject(new Error(`error-${count}`))
        },
        { retries: 2, delay: 10 },
      ),
    ).rejects.toThrow('error-3')
  })
})

describe('timeout', () => {
  test('resolves if the promise completes before the timeout', async () => {
    const result = await timeout(
      new Promise((resolve) => setTimeout(() => resolve('done'), 10)),
      100,
    )
    expect(result).toBe('done')
  })

  test('rejects if the promise takes longer than the timeout', async () => {
    await expect(
      timeout(
        new Promise((resolve) => setTimeout(() => resolve('slow'), 200)),
        30,
      ),
    ).rejects.toThrow('Timed out after 30ms')
  })

  test('uses custom error message when provided', async () => {
    await expect(
      timeout(
        new Promise((resolve) => setTimeout(() => resolve('slow'), 200)),
        30,
        'Custom timeout message',
      ),
    ).rejects.toThrow('Custom timeout message')
  })

  test('uses default error message when no custom message is provided', async () => {
    await expect(
      timeout(
        new Promise((resolve) => setTimeout(() => resolve('slow'), 200)),
        50,
      ),
    ).rejects.toThrow('Timed out after 50ms')
  })

  test('passes through the rejection of the original promise', async () => {
    await expect(
      timeout(
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('original error')), 10),
        ),
        200,
      ),
    ).rejects.toThrow('original error')
  })

  test('works with immediately resolving promises', async () => {
    const result = await timeout(Promise.resolve(42), 100)
    expect(result).toBe(42)
  })

  test('works with immediately rejecting promises', async () => {
    await expect(
      timeout(Promise.reject(new Error('instant fail')), 100),
    ).rejects.toThrow('instant fail')
  })
})
