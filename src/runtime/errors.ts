/**
 * Wraps a promise and catches specified errors.
 *
 * Returns an object containing the resolved data or the caught error.
 * If the error is not one of the specified errors to catch, it is re-thrown.
 *
 * @template T - The type of data returned by the promise.
 * @template E - The error type(s) to catch.
 * @param promise - A function that returns a promise.
 * @param errorsToCatch - Optional array of error constructors to catch.
 * @returns A promise resolving to an object with either the data or an error.
 */
export const catchError = async <T, E extends new (message?: string) => Error>(
  promise: () => Promise<T>,
  errorsToCatch?: E[],
): Promise<
  | { data: T; ok: true; error?: never }
  | { data?: never; ok: false; error: InstanceType<E> }
> => {
  try {
    const data = await promise()
    return { data, ok: true }
  } catch (error: any) {
    if (
      errorsToCatch === undefined ||
      errorsToCatch.some((e) => error instanceof e)
    )
      return { error, ok: false }
    throw error
  }
}
