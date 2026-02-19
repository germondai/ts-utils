/**
 * Creates a debounced version of a function that delays invoking the function
 * until after `ms` milliseconds have elapsed since the last time it was called.
 *
 * @param fn - The function to debounce.
 * @param ms - The debounce delay in milliseconds.
 * @returns The debounced function with a `cancel` method.
 *
 * @example
 * const debouncedSave = debounce(save, 300)
 * debouncedSave() // Only executes after 300ms of inactivity
 * debouncedSave.cancel() // Cancel pending execution
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
): T & { cancel(): void } => {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounced = ((...args: any[]) => {
    if (timer !== undefined) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T & { cancel(): void }

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  return debounced
}

/**
 * Creates a throttled version of a function that only invokes the function
 * at most once per `ms` milliseconds.
 *
 * @param fn - The function to throttle.
 * @param ms - The throttle interval in milliseconds.
 * @returns The throttled function with a `cancel` method.
 *
 * @example
 * const throttledScroll = throttle(onScroll, 100)
 * window.addEventListener('scroll', throttledScroll)
 * throttledScroll.cancel() // Cancel pending execution
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
): T & { cancel(): void } => {
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastRun = 0

  const throttled = ((...args: any[]) => {
    const now = Date.now()
    const remaining = ms - (now - lastRun)

    if (remaining <= 0) {
      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }
      lastRun = now
      fn(...args)
    } else if (timer === undefined) {
      timer = setTimeout(() => {
        lastRun = Date.now()
        timer = undefined
        fn(...args)
      }, remaining)
    }
  }) as T & { cancel(): void }

  throttled.cancel = () => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  return throttled
}

/**
 * Creates a function that can only be called once. Subsequent calls return
 * the result of the first invocation.
 *
 * @param fn - The function to restrict.
 * @returns A function that only executes once.
 *
 * @example
 * const initialize = once(() => console.log("init"))
 * initialize() // logs "init"
 * initialize() // does nothing
 */
export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false
  let result: ReturnType<T>

  return ((...args: any[]) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

/**
 * A no-operation function that does nothing.
 *
 * @example
 * const callback = options.onComplete || noop
 */
export const noop = (): void => {}
