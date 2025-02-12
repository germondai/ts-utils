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
