import { describe, test, expect } from 'bun:test'
import { formatTime, formatDuration, toSeconds } from '../src/runtime/time'

describe('formatTime', () => {
  test('formats seconds only (< 1 minute)', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(5)).toBe('0:05')
    expect(formatTime(30)).toBe('0:30')
    expect(formatTime(59)).toBe('0:59')
  })

  test('formats minutes and seconds', () => {
    expect(formatTime(60)).toBe('1:00')
    expect(formatTime(61)).toBe('1:01')
    expect(formatTime(125)).toBe('2:05')
    expect(formatTime(600)).toBe('10:00')
    expect(formatTime(3599)).toBe('59:59')
  })

  test('formats hours, minutes, and seconds', () => {
    expect(formatTime(3600)).toBe('1:00:00')
    expect(formatTime(3661)).toBe('1:01:01')
    expect(formatTime(7200)).toBe('2:00:00')
    expect(formatTime(7384)).toBe('2:03:04')
    expect(formatTime(86399)).toBe('23:59:59')
  })
})

describe('formatDuration', () => {
  test('formats as seconds when < 1 minute', () => {
    expect(formatDuration(0)).toBe('0s')
    expect(formatDuration(500)).toBe('0s')
    expect(formatDuration(1000)).toBe('1s')
    expect(formatDuration(5000)).toBe('5s')
    expect(formatDuration(59000)).toBe('59s')
  })

  test('formats as minutes and seconds when < 1 hour', () => {
    expect(formatDuration(60000)).toBe('1m 0s')
    expect(formatDuration(90000)).toBe('1m 30s')
    expect(formatDuration(150000)).toBe('2m 30s')
    expect(formatDuration(3599000)).toBe('59m 59s')
  })

  test('formats as hours and minutes when < 1 day', () => {
    expect(formatDuration(3600000)).toBe('1h 0m')
    expect(formatDuration(8100000)).toBe('2h 15m')
    expect(formatDuration(86399000)).toBe('23h 59m')
  })

  test('formats as days and hours when >= 1 day', () => {
    expect(formatDuration(86400000)).toBe('1d 0h')
    expect(formatDuration(90000000)).toBe('1d 1h')
    expect(formatDuration(172800000)).toBe('2d 0h')
    expect(formatDuration(180000000)).toBe('2d 2h')
  })
})

describe('toSeconds', () => {
  test('parses direct seconds', () => {
    expect(toSeconds('0')).toBe(0)
    expect(toSeconds('2947')).toBe(2947)
    expect(toSeconds('60')).toBe(60)
  })

  test('parses MM:SS format', () => {
    expect(toSeconds('1:30')).toBe(90)
    expect(toSeconds('0:45')).toBe(45)
    expect(toSeconds('10:00')).toBe(600)
    expect(toSeconds('59:59')).toBe(3599)
  })

  test('parses HH:MM:SS format', () => {
    expect(toSeconds('1:00:00')).toBe(3600)
    expect(toSeconds('1:01:01')).toBe(3661)
    expect(toSeconds('2:15:30')).toBe(8130)
    expect(toSeconds('0:05:30')).toBe(330)
  })

  test('parses "Xh Ym Zs" format', () => {
    expect(toSeconds('2h 15m 30s')).toBe(8130)
    expect(toSeconds('1h 0m 0s')).toBe(3600)
    expect(toSeconds('0h 5m 30s')).toBe(330)
  })

  test('parses partial "Xh Ym Zs" format', () => {
    expect(toSeconds('2h')).toBe(7200)
    expect(toSeconds('30m')).toBe(1800)
    expect(toSeconds('45s')).toBe(45)
    expect(toSeconds('1h 30s')).toBe(3630)
    expect(toSeconds('2h 15m')).toBe(8100)
    expect(toSeconds('5m 10s')).toBe(310)
  })

  test('returns undefined for invalid input', () => {
    expect(toSeconds('')).toBeUndefined()
    expect(toSeconds('invalid')).toBeUndefined()
    expect(toSeconds('abc:def')).toBeUndefined()
    expect(toSeconds('1:2:3:4')).toBeUndefined()
  })

  test('handles whitespace', () => {
    expect(toSeconds('  2947  ')).toBe(2947)
    expect(toSeconds('  1:30  ')).toBe(90)
  })
})
