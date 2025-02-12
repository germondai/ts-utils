/**
 * Parses the query parameters from a URL string into an object.
 *
 * @param urlString - The URL string to parse.
 * @returns An object where keys are query parameter names and values are query parameter values.
 *
 * @example
 * // returns { search: 'test', page: '2' }
 * getQueryParams('https://example.com/?search=test&page=2');
 */
export const getQueryParams = (urlString: string): Record<string, string> => {
  const url = new URL(urlString)
  const params: Record<string, string> = {}
  url.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

/**
 * Updates (or adds) a query parameter in a given URL string.
 *
 * @param urlString - The original URL string.
 * @param key - The query parameter key to update.
 * @param value - The new value for the query parameter.
 * @returns The updated URL string.
 *
 * @example
 * // returns 'https://example.com/?search=new'
 * updateQueryParam('https://example.com/?search=test', 'search', 'new');
 */
export const updateQueryParam = (
  urlString: string,
  key: string,
  value: string,
): string => {
  const url = new URL(urlString)
  url.searchParams.set(key, value)
  return url.toString()
}

/**
 * Removes a query parameter from a given URL string.
 *
 * @param urlString - The original URL string.
 * @param key - The query parameter key to remove.
 * @returns The updated URL string with the specified query parameter removed.
 *
 * @example
 * // returns 'https://example.com/'
 * removeQueryParam('https://example.com/?search=test', 'search');
 */
export const removeQueryParam = (urlString: string, key: string): string => {
  const url = new URL(urlString)
  url.searchParams.delete(key)
  return url.toString()
}

/**
 * Builds a URL from a base URL, an optional path, and optional query parameters.
 *
 * @param baseUrl - The base URL (e.g., "https://example.com").
 * @param path - Optional path to append to the base URL (e.g., "/api/v1/resource").
 * @param queryParams - Optional object representing query parameters, where keys are parameter names and values are parameter values.
 * @returns The constructed URL as a string.
 *
 * @example
 * // returns 'https://example.com/api/v1/resource?search=test&page=2'
 * buildUrl('https://example.com', '/api/v1/resource', { search: 'test', page: 2 });
 */
export const buildUrl = (
  baseUrl: string,
  path?: string,
  queryParams?: Record<string, string | number | boolean>,
): string => {
  const url = new URL(baseUrl)

  if (path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    url.pathname = `${url.pathname.replace(/\/$/, '')}${normalizedPath}`
  }

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}
