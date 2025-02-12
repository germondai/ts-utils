/**
 * Waits for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the delay.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
