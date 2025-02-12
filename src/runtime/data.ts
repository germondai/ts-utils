/**
 * Creates a deep clone of the given data using JSON serialization.
 *
 * **Note:** This method does not support cloning functions, dates, or undefined values.
 *
 * @param data - The data to clone.
 * @returns A deep copy of the data.
 */
export const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))
