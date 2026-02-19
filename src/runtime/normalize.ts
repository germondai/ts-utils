export const normalize = <T>(value: T | null | undefined): T | null => {
  let normalized: T | null

  switch (typeof value) {
    case 'string':
      normalized = value === '' ? null : value
      break
    case 'number':
      normalized = isNaN(value) ? null : value
      break
    case 'boolean':
      normalized = value
      break
    case 'object':
      if (value === null || value === undefined) normalized = value ?? null
      else if (value instanceof Date)
        normalized = isNaN(value.getTime()) ? null : value
      else if (Array.isArray(value))
        normalized = value.length === 0 ? null : value
      else if (value instanceof Set)
        normalized = value.size === 0 ? null : value
      else if (value instanceof Map)
        normalized = value.size === 0 ? null : value
      else normalized = Object.keys(value).length === 0 ? null : value
      break
    default:
      normalized = value ?? null
  }

  return normalized
}
