import { describe, test, expect } from 'bun:test'
import { debounce, throttle, once, noop } from '../src/runtime/function'

describe('debounce', () => {
  test('delays execution until after the specified ms', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    expect(callCount).toBe(0)

    await new Promise((r) => setTimeout(r, 80))
    expect(callCount).toBe(1)
  })

  test('resets the timer on subsequent calls', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    await new Promise((r) => setTimeout(r, 30))
    debounced() // reset the timer
    await new Promise((r) => setTimeout(r, 30))
    expect(callCount).toBe(0) // still hasn't fired

    await new Promise((r) => setTimeout(r, 40))
    expect(callCount).toBe(1) // now it fires
  })

  test('only fires once for rapid successive calls', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    for (let i = 0; i < 10; i++) {
      debounced()
    }

    await new Promise((r) => setTimeout(r, 80))
    expect(callCount).toBe(1)
  })

  test('passes arguments to the underlying function', async () => {
    let received: number[] = []
    const debounced = debounce((...args: number[]) => {
      received = args
    }, 50)

    debounced(1, 2, 3)
    await new Promise((r) => setTimeout(r, 80))
    expect(received).toEqual([1, 2, 3])
  })

  test('cancel prevents pending execution', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    debounced.cancel()

    await new Promise((r) => setTimeout(r, 80))
    expect(callCount).toBe(0)
  })

  test('cancel can be called multiple times safely', () => {
    const debounced = debounce(() => {}, 50)
    expect(() => {
      debounced.cancel()
      debounced.cancel()
    }).not.toThrow()
  })
})

describe('throttle', () => {
  test('executes immediately on first call', () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 100)

    throttled()
    expect(callCount).toBe(1)
  })

  test('suppresses calls within the throttle interval', () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 100)

    throttled() // executes immediately
    throttled() // suppressed, schedules trailing
    throttled() // suppressed, already scheduled
    expect(callCount).toBe(1)
  })

  test('allows execution after the throttle interval', async () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 50)

    throttled()
    expect(callCount).toBe(1)

    await new Promise((r) => setTimeout(r, 70))
    throttled()
    expect(callCount).toBe(2) // 1 immediate + 1 new immediate after interval
  })

  test('schedules a trailing call for suppressed invocations', async () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 50)

    throttled() // immediate
    throttled() // schedules trailing
    expect(callCount).toBe(1)

    await new Promise((r) => setTimeout(r, 80))
    expect(callCount).toBe(2) // trailing call fired
  })

  test('passes arguments to the underlying function', async () => {
    let received: string | undefined
    const throttled = throttle((val: string) => {
      received = val
    }, 50)

    throttled('hello')
    expect(received).toBe('hello')
  })

  test('cancel prevents pending trailing execution', async () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 50)

    throttled() // immediate
    throttled() // schedules trailing
    throttled.cancel()

    await new Promise((r) => setTimeout(r, 80))
    expect(callCount).toBe(1) // only the immediate call
  })

  test('cancel can be called when no timer is pending', () => {
    const throttled = throttle(() => {}, 50)
    expect(() => throttled.cancel()).not.toThrow()
  })
})

describe('once', () => {
  test('calls the function only once', () => {
    let callCount = 0
    const fn = once(() => {
      callCount++
      return 'result'
    })

    fn()
    fn()
    fn()
    expect(callCount).toBe(1)
  })

  test('returns the result of the first call on subsequent calls', () => {
    const fn = once(() => 42)

    expect(fn()).toBe(42)
    expect(fn()).toBe(42)
    expect(fn()).toBe(42)
  })

  test('passes arguments to the underlying function on first call', () => {
    let received: number[] = []
    const fn = once((...args: number[]) => {
      received = args
      return args
    })

    fn(1, 2, 3)
    fn(4, 5, 6) // ignored
    expect(received).toEqual([1, 2, 3])
  })

  test('returns undefined if the original function returns undefined', () => {
    const fn = once(() => undefined)
    expect(fn()).toBeUndefined()
    expect(fn()).toBeUndefined()
  })

  test('works with functions that return falsy values', () => {
    const fnNull = once(() => null)
    expect(fnNull()).toBeNull()
    expect(fnNull()).toBeNull()

    const fnZero = once(() => 0)
    expect(fnZero()).toBe(0)
    expect(fnZero()).toBe(0)

    const fnEmpty = once(() => '')
    expect(fnEmpty()).toBe('')
    expect(fnEmpty()).toBe('')
  })
})

describe('noop', () => {
  test('returns undefined', () => {
    expect(noop()).toBeUndefined()
  })

  test('is a function', () => {
    expect(typeof noop).toBe('function')
  })

  test('does not throw', () => {
    expect(() => noop()).not.toThrow()
  })
})
