import { describe, test, expect } from 'bun:test'
import {
  getQueryParams,
  updateQueryParam,
  removeQueryParam,
  buildUrl,
} from '../src/runtime/url'

describe('getQueryParams', () => {
  test('parses multiple query parameters', () => {
    const params = getQueryParams('https://example.com/?search=test&page=2')
    expect(params).toEqual({ search: 'test', page: '2' })
  })

  test('returns empty object when no params exist', () => {
    const params = getQueryParams('https://example.com/')
    expect(params).toEqual({})
  })

  test('parses a single query parameter', () => {
    const params = getQueryParams('https://example.com/?q=hello')
    expect(params).toEqual({ q: 'hello' })
  })

  test('handles encoded values', () => {
    const params = getQueryParams(
      'https://example.com/?name=hello%20world&tag=a%26b',
    )
    expect(params).toEqual({ name: 'hello world', tag: 'a&b' })
  })

  test('handles empty value for a parameter', () => {
    const params = getQueryParams('https://example.com/?key=')
    expect(params).toEqual({ key: '' })
  })
})

describe('updateQueryParam', () => {
  test('updates an existing query parameter', () => {
    const result = updateQueryParam(
      'https://example.com/?search=test',
      'search',
      'new',
    )
    expect(result).toBe('https://example.com/?search=new')
  })

  test('adds a new query parameter if it does not exist', () => {
    const result = updateQueryParam('https://example.com/', 'page', '3')
    expect(result).toBe('https://example.com/?page=3')
  })

  test('preserves other existing query parameters', () => {
    const result = updateQueryParam('https://example.com/?a=1&b=2', 'a', '10')
    expect(result).toBe('https://example.com/?a=10&b=2')
  })

  test('handles setting a value to empty string', () => {
    const result = updateQueryParam('https://example.com/?key=value', 'key', '')
    expect(result).toBe('https://example.com/?key=')
  })
})

describe('removeQueryParam', () => {
  test('removes an existing query parameter', () => {
    const result = removeQueryParam(
      'https://example.com/?search=test',
      'search',
    )
    expect(result).toBe('https://example.com/')
  })

  test('preserves other parameters when removing one', () => {
    const result = removeQueryParam('https://example.com/?a=1&b=2&c=3', 'b')
    expect(result).toBe('https://example.com/?a=1&c=3')
  })

  test('returns the same URL if the parameter does not exist', () => {
    const result = removeQueryParam('https://example.com/?a=1', 'nonexistent')
    expect(result).toBe('https://example.com/?a=1')
  })

  test('returns clean URL when removing the only parameter', () => {
    const result = removeQueryParam('https://example.com/?only=one', 'only')
    expect(result).toBe('https://example.com/')
  })
})

describe('buildUrl', () => {
  test('builds URL with base only', () => {
    const result = buildUrl('https://example.com')
    expect(result).toBe('https://example.com/')
  })

  test('builds URL with path', () => {
    const result = buildUrl('https://example.com', '/api/v1/resource')
    expect(result).toBe('https://example.com/api/v1/resource')
  })

  test('normalizes path without leading slash', () => {
    const result = buildUrl('https://example.com', 'api/v1/resource')
    expect(result).toBe('https://example.com/api/v1/resource')
  })

  test('builds URL with query parameters', () => {
    const result = buildUrl('https://example.com', '/search', {
      q: 'test',
      page: 2,
    })
    expect(result).toBe('https://example.com/search?q=test&page=2')
  })

  test('builds URL with boolean query parameter', () => {
    const result = buildUrl('https://example.com', '/items', {
      active: true,
    })
    expect(result).toBe('https://example.com/items?active=true')
  })

  test('sets null query parameter values to empty string', () => {
    const result = buildUrl('https://example.com', '/path', {
      key: null,
    })
    expect(result).toBe('https://example.com/path?key=')
  })

  test('skips undefined query parameter values', () => {
    const result = buildUrl('https://example.com', '/path', {
      included: 'yes',
      skipped: undefined,
    })
    expect(result).toBe('https://example.com/path?included=yes')
  })

  test('builds URL with mixed param types including null and undefined', () => {
    const result = buildUrl('https://example.com', '/api', {
      name: 'test',
      count: 5,
      empty: null,
      missing: undefined,
      active: false,
    })
    expect(result).toBe(
      'https://example.com/api?name=test&count=5&empty=&active=false',
    )
  })

  test('builds URL with no path but with query parameters', () => {
    const result = buildUrl('https://example.com', undefined, { q: 'hello' })
    expect(result).toBe('https://example.com/?q=hello')
  })

  test('handles base URL with trailing slash and path', () => {
    const result = buildUrl('https://example.com/', '/api')
    expect(result).toBe('https://example.com/api')
  })
})
