import { describe, test, expect } from 'bun:test'
import { formatBytes, toBytes } from '../src/runtime/size'

describe('formatBytes', () => {
  test('returns "0 Bytes" for 0', () => {
    expect(formatBytes(0)).toBe('0 Bytes')
  })

  test('formats bytes correctly', () => {
    expect(formatBytes(500)).toBe('500 Bytes')
    expect(formatBytes(1)).toBe('1 Bytes')
  })

  test('formats kilobytes correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1536)).toBe('1.5 KB')
  })

  test('formats megabytes correctly', () => {
    expect(formatBytes(1048576)).toBe('1 MB')
    expect(formatBytes(1572864)).toBe('1.5 MB')
  })

  test('formats gigabytes correctly', () => {
    expect(formatBytes(1073741824)).toBe('1 GB')
  })

  test('formats terabytes correctly', () => {
    expect(formatBytes(1099511627776)).toBe('1 TB')
  })

  test('formats petabytes correctly', () => {
    expect(formatBytes(1125899906842624)).toBe('1 PB')
  })

  test('respects custom decimals parameter', () => {
    expect(formatBytes(1536, 0)).toBe('2 KB')
    expect(formatBytes(1536, 1)).toBe('1.5 KB')
    expect(formatBytes(1536, 3)).toBe('1.5 KB')
    expect(formatBytes(123456789, 0)).toBe('118 MB')
    expect(formatBytes(123456789, 1)).toBe('117.7 MB')
    expect(formatBytes(123456789, 3)).toBe('117.738 MB')
  })

  test('treats negative decimals as 0', () => {
    expect(formatBytes(1536, -1)).toBe('2 KB')
  })
})

describe('toBytes', () => {
  test('converts bytes string', () => {
    expect(toBytes('100 B')).toBe(100)
    expect(toBytes('0 B')).toBe(0)
  })

  test('converts kilobytes string', () => {
    expect(toBytes('10 KB')).toBe(10240)
    expect(toBytes('1 KB')).toBe(1024)
  })

  test('converts megabytes string', () => {
    expect(toBytes('5.5 MB')).toBe(5767168)
    expect(toBytes('1 MB')).toBe(1048576)
  })

  test('converts gigabytes string', () => {
    expect(toBytes('1 GB')).toBe(1073741824)
    expect(toBytes('2.5 GB')).toBe(2684354560)
  })

  test('converts terabytes string', () => {
    expect(toBytes('1 TB')).toBe(1099511627776)
  })

  test('returns undefined for invalid format', () => {
    expect(toBytes('invalid')).toBeUndefined()
    expect(toBytes('')).toBeUndefined()
    expect(toBytes('abc MB')).toBeUndefined()
    expect(toBytes('10 XB')).toBeUndefined()
  })

  test('is case-insensitive for units', () => {
    expect(toBytes('10 kb')).toBe(10240)
    expect(toBytes('5 mb')).toBe(5242880)
    expect(toBytes('1 gb')).toBe(1073741824)
  })

  test('handles whitespace around the input', () => {
    expect(toBytes('  10 KB  ')).toBe(10240)
  })
})
