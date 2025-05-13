/**
 * Formats a duration in seconds into a human-readable time string.
 *
 * - If the duration is one hour or more: "H:MM:SS"
 * - If the duration is less than an hour but at least one minute: "M:SS"
 * - Otherwise: "0:SS"
 *
 * @param seconds - The total number of seconds.
 * @returns The formatted time string.
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const minutesStr = minutes.toString().padStart(2, '0')
  const secsStr = secs.toString().padStart(2, '0')

  if (hours > 0) return `${hours}:${minutesStr}:${secsStr}`
  if (minutes > 0) return `${minutes}:${secsStr}`
  return `0:${secsStr}`
}

/**
 * Converts milliseconds to a human-readable time format.
 *
 * @param ms - The number of milliseconds.
 * @returns A formatted string (e.g., "2h 15m 30s").
 */
export const formatDuration = (ms: number): string => {
  const sec = Math.floor(ms / 1000)
  const min = Math.floor(sec / 60)
  const hrs = Math.floor(min / 60)
  const days = Math.floor(hrs / 24)

  if (days > 0) return `${days}d ${hrs % 24}h`
  if (hrs > 0) return `${hrs}h ${min % 60}m`
  if (min > 0) return `${min}m ${sec % 60}s`
  return `${sec}s`
}

/**
 * Converts a time string into seconds.
 *
 * Supports various formats:
 * - Direct seconds (e.g., '2947')
 * - MM:SS or HH:MM:SS
 * - 'Xh Ym Zs' format (e.g., '2h 15m 30s')
 *
 * @param time - The time string to convert.
 * @returns The total number of seconds, or undefined if the format is invalid.
 */
export const toSeconds = (time: string): number | undefined => {
  time = time?.trim()
  if (!time) return // Time string cannot be empty

  // Handle direct seconds (e.g., '2947')
  if (/^\d+$/.test(time)) {
    const seconds = Number(time)
    if (isNaN(seconds)) return // Invalid seconds
    return seconds
  }

  // Handle MM:SS or HH:MM:SS
  if (time.includes(':')) {
    const parts = time.split(':').map(Number)
    if (parts.some(isNaN)) return // Invalid time format
    if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0)
    else if (parts.length === 3)
      return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0)
    return // Unsupported time format
  }

  // Handle 'Xh Ym Zs' format
  const match = time.match(/(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/i)
  if (!match || !match.some((v, i) => i > 0 && v !== undefined)) return // Invalid time format

  const hours = Number(match[1] || '0')
  const minutes = Number(match[2] || '0')
  const seconds = Number(match[3] || '0')

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return // Invalid time values

  return hours * 3600 + minutes * 60 + seconds
}
