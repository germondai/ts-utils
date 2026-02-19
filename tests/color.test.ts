import { describe, test, expect } from 'bun:test'
import { hexToRgb, rgbToHex, lighten, darken } from '../src/runtime/color'

// ---------------------------------------------------------------------------
// hexToRgb
// ---------------------------------------------------------------------------
describe('hexToRgb', () => {
  describe('6-digit hex', () => {
    test('converts standard 6-digit hex to RGB', () => {
      expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 })
    })

    test('converts black', () => {
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    test('converts white', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
    })

    test('works without the leading hash', () => {
      expect(hexToRgb('ff5733')).toEqual({ r: 255, g: 87, b: 51 })
    })

    test('handles uppercase hex letters', () => {
      expect(hexToRgb('#FF5733')).toEqual({ r: 255, g: 87, b: 51 })
    })

    test('converts a mid-range color', () => {
      expect(hexToRgb('#808080')).toEqual({ r: 128, g: 128, b: 128 })
    })
  })

  describe('3-digit hex', () => {
    test('expands 3-digit shorthand correctly', () => {
      expect(hexToRgb('#f53')).toEqual({ r: 255, g: 85, b: 51 })
    })

    test('converts shorthand black', () => {
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    test('converts shorthand white', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
    })

    test('works without the leading hash', () => {
      expect(hexToRgb('abc')).toEqual({ r: 170, g: 187, b: 204 })
    })
  })

  describe('invalid input', () => {
    test('returns null for too-short hex string', () => {
      expect(hexToRgb('#ab')).toBeNull()
    })

    test('returns null for too-long hex string', () => {
      expect(hexToRgb('#1234567')).toBeNull()
    })

    test('returns null for 4-digit hex', () => {
      expect(hexToRgb('#abcd')).toBeNull()
    })

    test('returns null for 5-digit hex', () => {
      expect(hexToRgb('#abcde')).toBeNull()
    })

    test('returns null for empty string', () => {
      expect(hexToRgb('')).toBeNull()
    })

    test('returns null for non-hex characters in 6-digit string', () => {
      expect(hexToRgb('#gggggg')).toBeNull()
    })

    test('returns null for non-hex characters in 3-digit string', () => {
      expect(hexToRgb('#ggg')).toBeNull()
    })
  })
})

// ---------------------------------------------------------------------------
// rgbToHex
// ---------------------------------------------------------------------------
describe('rgbToHex', () => {
  test('converts RGB to hex', () => {
    expect(rgbToHex(255, 87, 51)).toBe('#ff5733')
  })

  test('converts black', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })

  test('converts white', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
  })

  test('pads single-digit hex values with a leading zero', () => {
    expect(rgbToHex(0, 0, 15)).toBe('#00000f')
  })

  test('clamps values above 255 to 255', () => {
    expect(rgbToHex(300, 300, 300)).toBe('#ffffff')
  })

  test('clamps values below 0 to 0', () => {
    expect(rgbToHex(-10, -20, -30)).toBe('#000000')
  })

  test('rounds fractional values', () => {
    expect(rgbToHex(127.6, 0, 0)).toBe('#800000')
  })

  test('is the inverse of hexToRgb for standard values', () => {
    const hex = '#1a2b3c'
    const rgb = hexToRgb(hex)!
    expect(rgbToHex(rgb.r, rgb.g, rgb.b)).toBe(hex)
  })
})

// ---------------------------------------------------------------------------
// lighten
// ---------------------------------------------------------------------------
describe('lighten', () => {
  test('lightens black by 50% to mid-gray', () => {
    expect(lighten('#000000', 0.5)).toBe('#808080')
  })

  test('lightening by 0 returns the same color', () => {
    expect(lighten('#ff5733', 0)).toBe('#ff5733')
  })

  test('lightening by 1 returns white', () => {
    expect(lighten('#ff5733', 1)).toBe('#ffffff')
  })

  test('lightening white stays white regardless of amount', () => {
    expect(lighten('#ffffff', 0.5)).toBe('#ffffff')
  })

  test('lightens a mid-range color', () => {
    // #808080 lightened by 0.5 => each channel: 128 + (127 * 0.5) = 191.5 => rounded 192 => c0
    expect(lighten('#808080', 0.5)).toBe('#c0c0c0')
  })

  test('returns original hex string for invalid input', () => {
    expect(lighten('not-a-color', 0.5)).toBe('not-a-color')
  })
})

// ---------------------------------------------------------------------------
// darken
// ---------------------------------------------------------------------------
describe('darken', () => {
  test('darkens white by 50% to mid-gray', () => {
    expect(darken('#ffffff', 0.5)).toBe('#808080')
  })

  test('darkening by 0 returns the same color', () => {
    expect(darken('#ff5733', 0)).toBe('#ff5733')
  })

  test('darkening by 1 returns black', () => {
    expect(darken('#ff5733', 1)).toBe('#000000')
  })

  test('darkening black stays black regardless of amount', () => {
    expect(darken('#000000', 0.5)).toBe('#000000')
  })

  test('darkens a mid-range color', () => {
    // #808080 darkened by 0.5 => each channel: 128 * 0.5 = 64 => 40
    expect(darken('#808080', 0.5)).toBe('#404040')
  })

  test('returns original hex string for invalid input', () => {
    expect(darken('invalid', 0.5)).toBe('invalid')
  })

  test('darken then lighten produces predictable result', () => {
    // darken #804020 by 0.5: r=128*0.5=64, g=64*0.5=32, b=32*0.5=16 → #402010
    const darkened = darken('#804020', 0.5)
    expect(darkened).toBe('#402010')
    // lighten #402010 by 0.5: r=64+(255-64)*0.5=160, g=32+(255-32)*0.5=144, b=16+(255-16)*0.5=136 → #a09088
    const restored = lighten(darkened, 0.5)
    expect(restored).toBe('#a09088')
  })
})
