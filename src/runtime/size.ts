/**
 * Converts a file size in bytes into a human-readable string with appropriate units.
 *
 * The function supports sizes in Bytes, KB, MB, GB, TB, and PB.
 *
 * @param bytes - The file size in bytes.
 * @param decimals - The number of decimal places to round to (default is 2).
 * @returns A string representing the file size (e.g., "1.23 MB").
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return `${size} ${sizes[i]}`
}

/**
 * Converts a human-readable size string into its equivalent size in bytes.
 *
 * @param size - The size string to convert. It should be in the format of a number
 * followed by a unit (e.g., "10 KB", "5.5 MB", "1 GB"). Supported units are:
 * - B (bytes)
 * - KB (kilobytes)
 * - MB (megabytes)
 * - GB (gigabytes)
 * - TB (terabytes)
 *
 * @returns The size in bytes as a number, or `undefined` if the input format is invalid
 * or the value is negative.
 *
 * @example
 * ```typescript
 * toBytes("10 KB") // Returns 10240
 * toBytes("5.5 MB") // Returns 5767168
 * toBytes("1 GB") // Returns 1073741824
 * toBytes("invalid") // Returns undefined
 * ```
 */
export const toBytes = (size: string): number | undefined => {
  const match = size.trim().match(/^(\d+\.?\d*)\s*(B|KB|MB|GB|TB)$/i)
  if (!match) return // Invalid size format

  const value = Number(match[1])
  const unit = match[2]?.toUpperCase() as 'B' | 'KB' | 'MB' | 'GB' | 'TB'
  if (isNaN(value) || value < 0) return // Invalid size value

  switch (unit) {
    case 'B':
      return value
    case 'KB':
      return value * 1024
    case 'MB':
      return value * 1024 * 1024
    case 'GB':
      return value * 1024 * 1024 * 1024
    case 'TB':
      return value * 1024 * 1024 * 1024 * 1024
    default:
      return // Unsupported unit
  }
}
