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
