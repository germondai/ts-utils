/**
 * Waits for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the delay.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Retries a function up to a specified number of times with optional exponential backoff.
 *
 * @param fn - The async function to retry.
 * @param options - Retry options.
 * @param options.retries - The maximum number of retries (default: 3).
 * @param options.delay - The delay in milliseconds between retries (default: 1000).
 * @param options.backoff - Whether to use exponential backoff (default: false).
 * @returns The result of the function.
 *
 * @example
 * const data = await retry(() => fetch('/api/data'), { retries: 3, delay: 1000, backoff: true })
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  options?: { retries?: number; delay?: number; backoff?: boolean },
): Promise<T> => {
  const { retries = 3, delay = 1000, backoff = false } = options ?? {}
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt < retries) {
        const waitTime = backoff ? delay * Math.pow(2, attempt) : delay
        await sleep(waitTime)
      }
    }
  }

  throw lastError
}

/**
 * Wraps a promise with a timeout. Rejects if the promise doesn't resolve within the specified time.
 *
 * @param promise - The promise to wrap.
 * @param ms - The timeout in milliseconds.
 * @param message - Optional custom error message.
 * @returns The result of the promise.
 *
 * @example
 * const data = await timeout(fetch('/api/data'), 5000, 'Request timed out')
 */
export const timeout = <T>(
  promise: Promise<T>,
  ms: number,
  message?: string,
): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(message ?? `Timed out after ${ms}ms`)),
        ms,
      ),
    ),
  ])
