import { describe, test, expect } from 'bun:test'
import {
  rand,
  percentage,
  clamp,
  formatNumber,
  sum,
  average,
  median,
  min,
  max,
  round,
} from '../src/runtime/math'

describe('rand', () => {
  test('returns an integer between n and m (inclusive)', () => {
    for (let i = 0; i < 100; i++) {
      const result = rand(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  test('defaults m to 0 when not provided', () => {
    for (let i = 0; i < 100; i++) {
      const result = rand(0)
      expect(result).toBe(0)
    }
  })

  test('works with negative ranges', () => {
    for (let i = 0; i < 100; i++) {
      const result = rand(-10, -1)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(-1)
    }
  })

  test('returns the same number when n equals m', () => {
    expect(rand(5, 5)).toBe(5)
  })

  test('works when m defaults to 0 and n is positive', () => {
    for (let i = 0; i < 50; i++) {
      const result = rand(5)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(5)
    }
  })
})

describe('percentage', () => {
  test('calculates basic percentages', () => {
    expect(percentage(50, 100)).toBe(50)
    expect(percentage(1, 4)).toBe(25)
    expect(percentage(3, 4)).toBe(75)
  })

  test('returns 0 when maxValue is 0', () => {
    expect(percentage(10, 0)).toBe(0)
    expect(percentage(0, 0)).toBe(0)
  })

  test('returns 100 when value equals maxValue', () => {
    expect(percentage(200, 200)).toBe(100)
  })

  test('handles values exceeding maxValue', () => {
    expect(percentage(150, 100)).toBe(150)
  })

  test('respects custom decimal places', () => {
    expect(percentage(1, 3, 0)).toBe(33)
    expect(percentage(1, 3, 2)).toBe(33.33)
    expect(percentage(1, 3, 4)).toBe(33.3333)
  })

  test('defaults to 2 decimal places', () => {
    expect(percentage(1, 3)).toBe(33.33)
  })
})

describe('clamp', () => {
  test('returns the number when within range', () => {
    expect(clamp(5, 1, 10)).toBe(5)
  })

  test('clamps to min when below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  test('clamps to max when above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  test('returns min when number equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0)
  })

  test('returns max when number equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10)
  })

  test('works with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(0, -10, -1)).toBe(-1)
    expect(clamp(-20, -10, -1)).toBe(-10)
  })
})

describe('formatNumber', () => {
  test('formats thousands with commas', () => {
    expect(formatNumber(1234)).toBe('1,234')
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(1000000000)).toBe('1,000,000,000')
  })

  test('does not add commas for numbers below 1000', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(999)).toBe('999')
    expect(formatNumber(100)).toBe('100')
  })

  test('handles negative numbers', () => {
    expect(formatNumber(-1234)).toBe('-1,234')
    expect(formatNumber(-1000000)).toBe('-1,000,000')
  })

  test('handles decimals', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56')
  })
})

describe('sum', () => {
  test('sums an array of numbers', () => {
    expect(sum([1, 2, 3])).toBe(6)
    expect(sum([10, 20, 30])).toBe(60)
  })

  test('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0)
  })

  test('handles negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6)
    expect(sum([1, -1, 2, -2])).toBe(0)
  })

  test('handles a single element', () => {
    expect(sum([42])).toBe(42)
  })

  test('handles decimals', () => {
    expect(sum([0.1, 0.2])).toBeCloseTo(0.3)
  })
})

describe('average', () => {
  test('calculates the average', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
    expect(average([10, 20])).toBe(15)
  })

  test('returns 0 for an empty array', () => {
    expect(average([])).toBe(0)
  })

  test('handles a single element', () => {
    expect(average([7])).toBe(7)
  })

  test('handles negative numbers', () => {
    expect(average([-4, 4])).toBe(0)
  })
})

describe('median', () => {
  test('returns the middle value for odd-length arrays', () => {
    expect(median([1, 2, 3])).toBe(2)
    expect(median([5, 1, 3])).toBe(3)
  })

  test('returns the average of two middle values for even-length arrays', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5)
    expect(median([10, 20, 30, 40])).toBe(25)
  })

  test('returns 0 for an empty array', () => {
    expect(median([])).toBe(0)
  })

  test('handles a single element', () => {
    expect(median([42])).toBe(42)
  })

  test('does not mutate the original array', () => {
    const arr = [3, 1, 2]
    median(arr)
    expect(arr).toEqual([3, 1, 2])
  })

  test('handles unsorted input', () => {
    expect(median([9, 1, 5, 3, 7])).toBe(5)
  })
})

describe('min', () => {
  test('returns the minimum value', () => {
    expect(min([3, 1, 4, 1, 5])).toBe(1)
    expect(min([10, -5, 3])).toBe(-5)
  })

  test('returns Infinity for an empty array', () => {
    expect(min([])).toBe(Infinity)
  })

  test('handles a single element', () => {
    expect(min([7])).toBe(7)
  })

  test('handles all equal values', () => {
    expect(min([3, 3, 3])).toBe(3)
  })
})

describe('max', () => {
  test('returns the maximum value', () => {
    expect(max([3, 1, 4, 1, 5])).toBe(5)
    expect(max([10, -5, 3])).toBe(10)
  })

  test('returns -Infinity for an empty array', () => {
    expect(max([])).toBe(-Infinity)
  })

  test('handles a single element', () => {
    expect(max([7])).toBe(7)
  })

  test('handles all equal values', () => {
    expect(max([3, 3, 3])).toBe(3)
  })
})

describe('round', () => {
  test('rounds to the nearest integer by default', () => {
    expect(round(1.5)).toBe(2)
    expect(round(1.4)).toBe(1)
    expect(round(2.5)).toBe(3)
  })

  test('rounds to specified decimal places', () => {
    expect(round(1.2345, 2)).toBe(1.23)
    expect(round(1.2355, 2)).toBe(1.24)
    expect(round(1.005, 2)).toBe(1)
  })

  test('handles 0 decimal places explicitly', () => {
    expect(round(3.7, 0)).toBe(4)
    expect(round(3.2, 0)).toBe(3)
  })

  test('handles negative numbers', () => {
    expect(round(-1.5)).toBe(-1)
    expect(round(-2.7, 1)).toBe(-2.7)
  })

  test('handles large decimal places', () => {
    expect(round(1.123456789, 5)).toBe(1.12346)
  })
})
