import { describe, test, expect } from 'bun:test'
import {
  reverse,
  countOccurrences,
  pad,
  mask,
  initials,
  wordCount,
  isBlank,
} from '../src/runtime/string'

describe('reverse', () => {
  test('reverses a simple string', () => {
    expect(reverse('hello')).toBe('olleh')
  })

  test('returns empty string for empty input', () => {
    expect(reverse('')).toBe('')
  })

  test('handles single character', () => {
    expect(reverse('a')).toBe('a')
  })

  test('handles palindrome', () => {
    expect(reverse('racecar')).toBe('racecar')
  })

  test('handles string with spaces', () => {
    expect(reverse('hello world')).toBe('dlrow olleh')
  })

  test('handles unicode characters', () => {
    expect(reverse('abc')).toBe('cba')
  })
})

describe('countOccurrences', () => {
  test('counts multiple occurrences', () => {
    expect(countOccurrences('hello world hello', 'hello')).toBe(2)
  })

  test('returns 0 when substring not found', () => {
    expect(countOccurrences('hello world', 'xyz')).toBe(0)
  })

  test('returns 0 for empty search string', () => {
    expect(countOccurrences('hello', '')).toBe(0)
  })

  test('returns 0 for empty source string', () => {
    expect(countOccurrences('', 'hello')).toBe(0)
  })

  test('counts single character occurrences', () => {
    expect(countOccurrences('banana', 'a')).toBe(3)
  })

  test('does not count overlapping occurrences', () => {
    expect(countOccurrences('aaa', 'aa')).toBe(1)
  })

  test('handles exact match', () => {
    expect(countOccurrences('hello', 'hello')).toBe(1)
  })

  test('is case-sensitive', () => {
    expect(countOccurrences('Hello hello', 'hello')).toBe(1)
  })
})

describe('pad', () => {
  test('pads left by default', () => {
    expect(pad('5', 3, '0')).toBe('005')
  })

  test('pads right', () => {
    expect(pad('hi', 5, '.', 'right')).toBe('hi...')
  })

  test('pads both sides', () => {
    expect(pad('hi', 6, ' ', 'both')).toBe('  hi  ')
  })

  test('pads both sides with odd difference', () => {
    expect(pad('hi', 7, '-', 'both')).toBe('--hi---')
  })

  test('returns original string when already at target length', () => {
    expect(pad('hello', 5, '0')).toBe('hello')
  })

  test('returns original string when longer than target length', () => {
    expect(pad('hello world', 5, '0')).toBe('hello world')
  })

  test('uses space as default pad character', () => {
    expect(pad('hi', 4)).toBe('  hi')
  })

  test('uses only first character of multi-char pad string', () => {
    expect(pad('x', 3, 'ab')).toBe('aax')
  })

  test('handles empty string input', () => {
    expect(pad('', 3, '*')).toBe('***')
  })
})

describe('mask', () => {
  test('masks all but last 4 characters by default', () => {
    expect(mask('1234567890')).toBe('******7890')
  })

  test('masks with custom visible count', () => {
    expect(mask('secret', 2, '#')).toBe('####et')
  })

  test('returns original string when shorter than or equal to visible count', () => {
    expect(mask('hi', 4)).toBe('hi')
    expect(mask('test', 4)).toBe('test')
  })

  test('masks all but 1 character', () => {
    expect(mask('hello', 1)).toBe('****o')
  })

  test('handles single character visible', () => {
    expect(mask('ab', 1)).toBe('*b')
  })

  test('uses custom mask character', () => {
    expect(mask('password', 3, 'X')).toBe('XXXXXord')
  })

  test('masks empty string returns empty', () => {
    expect(mask('', 4)).toBe('')
  })
})

describe('initials', () => {
  test('extracts initials from two-word name', () => {
    expect(initials('John Doe')).toBe('JD')
  })

  test('extracts initials from three-word name', () => {
    expect(initials('Alice Bob Charlie')).toBe('ABC')
  })

  test('handles single word', () => {
    expect(initials('Alice')).toBe('A')
  })

  test('converts to uppercase', () => {
    expect(initials('john doe')).toBe('JD')
  })

  test('handles extra whitespace', () => {
    expect(initials('  John   Doe  ')).toBe('JD')
  })

  test('handles multiple spaces between words', () => {
    expect(initials('Jane    Mary    Smith')).toBe('JMS')
  })
})

describe('wordCount', () => {
  test('counts words in a simple sentence', () => {
    expect(wordCount('Hello world')).toBe(2)
  })

  test('returns 0 for empty string', () => {
    expect(wordCount('')).toBe(0)
  })

  test('returns 0 for whitespace-only string', () => {
    expect(wordCount('   ')).toBe(0)
  })

  test('counts single word', () => {
    expect(wordCount('hello')).toBe(1)
  })

  test('handles multiple spaces between words', () => {
    expect(wordCount('one   two   three')).toBe(3)
  })

  test('handles leading and trailing whitespace', () => {
    expect(wordCount('  hello world  ')).toBe(2)
  })

  test('handles tabs and newlines', () => {
    expect(wordCount('hello\tworld\nnew')).toBe(3)
  })
})

describe('isBlank', () => {
  test('returns true for empty string', () => {
    expect(isBlank('')).toBe(true)
  })

  test('returns true for whitespace-only string', () => {
    expect(isBlank('   ')).toBe(true)
  })

  test('returns true for tab-only string', () => {
    expect(isBlank('\t')).toBe(true)
  })

  test('returns true for newline-only string', () => {
    expect(isBlank('\n')).toBe(true)
  })

  test('returns true for mixed whitespace', () => {
    expect(isBlank(' \t\n ')).toBe(true)
  })

  test('returns false for non-blank string', () => {
    expect(isBlank('hello')).toBe(false)
  })

  test('returns false for string with leading/trailing spaces', () => {
    expect(isBlank(' hello ')).toBe(false)
  })

  test('returns false for single character', () => {
    expect(isBlank('a')).toBe(false)
  })
})
