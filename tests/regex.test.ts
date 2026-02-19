import { describe, test, expect } from 'bun:test'
import {
  isEmail,
  isUrl,
  isPhoneNumber,
  isHex,
  isHexColor,
  isIPv4,
  isIPv6,
  isMacAddress,
  isUUID,
  isCreditCard,
  isDomain,
  isPostalCode,
  isISODate,
  isBase64,
  isSlug,
} from '../src/runtime/regex'

describe('isEmail', () => {
  test('returns true for valid emails', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('user.name@domain.co')).toBe(true)
    expect(isEmail('user+tag@domain.org')).toBe(true)
  })

  test('returns false for invalid emails', () => {
    expect(isEmail('invalid-email')).toBe(false)
    expect(isEmail('@domain.com')).toBe(false)
    expect(isEmail('user@')).toBe(false)
    expect(isEmail('user @domain.com')).toBe(false)
    expect(isEmail('')).toBe(false)
  })
})

describe('isUrl', () => {
  test('returns true for valid URLs', () => {
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('http://example.com/path?q=1')).toBe(true)
    expect(isUrl('ftp://files.example.com')).toBe(true)
    expect(isUrl('https://sub.domain.co.uk/path')).toBe(true)
  })

  test('returns false for invalid URLs', () => {
    expect(isUrl('invalid-url')).toBe(false)
    expect(isUrl('example.com')).toBe(false)
    expect(isUrl('://missing-scheme.com')).toBe(false)
    expect(isUrl('')).toBe(false)
  })
})

describe('isPhoneNumber', () => {
  test('returns true for valid phone numbers', () => {
    expect(isPhoneNumber('+1 (555) 555-5555')).toBe(true)
    expect(isPhoneNumber('+44 20 7946 0958')).toBe(true)
    expect(isPhoneNumber('555-555-5555')).toBe(true)
    expect(isPhoneNumber('5555555555')).toBe(true)
  })

  test('returns false for invalid phone numbers', () => {
    expect(isPhoneNumber('abc')).toBe(false)
    expect(isPhoneNumber('')).toBe(false)
    expect(isPhoneNumber('12')).toBe(false)
  })
})

describe('isHex', () => {
  test('returns true for valid hex strings', () => {
    expect(isHex('1A3F')).toBe(true)
    expect(isHex('abcdef')).toBe(true)
    expect(isHex('0123456789ABCDEFabcdef')).toBe(true)
    expect(isHex('0')).toBe(true)
  })

  test('returns false for invalid hex strings', () => {
    expect(isHex('XYZ')).toBe(false)
    expect(isHex('0x1A3F')).toBe(false)
    expect(isHex('GHI')).toBe(false)
    expect(isHex('')).toBe(false)
    expect(isHex(' ')).toBe(false)
  })
})

describe('isHexColor', () => {
  test('returns true for valid hex colors', () => {
    expect(isHexColor('#ff5733')).toBe(true)
    expect(isHexColor('#FFF')).toBe(true)
    expect(isHexColor('#000000')).toBe(true)
    expect(isHexColor('#abc')).toBe(true)
  })

  test('returns false for invalid hex colors', () => {
    expect(isHexColor('ff5733')).toBe(false)
    expect(isHexColor('#ff57')).toBe(false)
    expect(isHexColor('#gggggg')).toBe(false)
    expect(isHexColor('rgb(255, 87, 51)')).toBe(false)
    expect(isHexColor('')).toBe(false)
  })
})

describe('isIPv4', () => {
  test('returns true for valid IPv4 addresses', () => {
    expect(isIPv4('192.168.1.1')).toBe(true)
    expect(isIPv4('0.0.0.0')).toBe(true)
    expect(isIPv4('255.255.255.255')).toBe(true)
    expect(isIPv4('10.0.0.1')).toBe(true)
  })

  test('returns false for invalid IPv4 addresses', () => {
    expect(isIPv4('999.999.999.999')).toBe(false)
    expect(isIPv4('256.1.1.1')).toBe(false)
    expect(isIPv4('1.2.3')).toBe(false)
    expect(isIPv4('1.2.3.4.5')).toBe(false)
    expect(isIPv4('abc.def.ghi.jkl')).toBe(false)
    expect(isIPv4('')).toBe(false)
  })
})

describe('isIPv6', () => {
  test('returns true for valid IPv6 addresses', () => {
    expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true)
    expect(isIPv6('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBe(true)
    expect(isIPv6('0000:0000:0000:0000:0000:0000:0000:0001')).toBe(true)
  })

  test('returns false for invalid IPv6 addresses', () => {
    expect(isIPv6('InvalidIPv6')).toBe(false)
    expect(isIPv6('192.168.1.1')).toBe(false)
    expect(isIPv6('2001:db8::1')).toBe(false) // abbreviated form not supported by this regex
    expect(isIPv6('')).toBe(false)
  })
})

describe('isMacAddress', () => {
  test('returns true for valid MAC addresses', () => {
    expect(isMacAddress('00:1A:2B:3C:4D:5E')).toBe(true)
    expect(isMacAddress('aa:bb:cc:dd:ee:ff')).toBe(true)
    expect(isMacAddress('00-1A-2B-3C-4D-5E')).toBe(true)
  })

  test('returns false for invalid MAC addresses', () => {
    expect(isMacAddress('invalid-mac')).toBe(false)
    expect(isMacAddress('00:1A:2B:3C:4D')).toBe(false)
    expect(isMacAddress('00:1A:2B:3C:4D:5E:FF')).toBe(false)
    expect(isMacAddress('GG:HH:II:JJ:KK:LL')).toBe(false)
    expect(isMacAddress('')).toBe(false)
  })
})

describe('isUUID', () => {
  test('returns true for valid UUIDs', () => {
    expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
    expect(isUUID('A550E840-E29B-41D4-A716-446655440000')).toBe(true)
  })

  test('returns false for invalid UUIDs', () => {
    expect(isUUID('invalid-uuid')).toBe(false)
    expect(isUUID('123e4567-e89b-12d3-a456')).toBe(false)
    expect(isUUID('123e4567e89b12d3a456426614174000')).toBe(false)
    expect(isUUID('')).toBe(false)
  })
})

describe('isCreditCard', () => {
  test('returns true for valid credit card numbers', () => {
    expect(isCreditCard('4111111111111111')).toBe(true) // Visa
    expect(isCreditCard('5500000000000004')).toBe(true) // Mastercard
    expect(isCreditCard('340000000000009')).toBe(true) // Amex
    expect(isCreditCard('6011000000000004')).toBe(true) // Discover
  })

  test('returns false for invalid credit card numbers', () => {
    expect(isCreditCard('1234567890123456')).toBe(false)
    expect(isCreditCard('411111111111111')).toBe(false) // too short for Visa
    expect(isCreditCard('abcdefghijklmnop')).toBe(false)
    expect(isCreditCard('')).toBe(false)
    expect(isCreditCard('4111 1111 1111 1111')).toBe(false) // spaces not stripped
  })
})

describe('isDomain', () => {
  test('returns true for valid domains', () => {
    expect(isDomain('example.com')).toBe(true)
    expect(isDomain('sub.example.co.uk')).toBe(true)
    expect(isDomain('my-site.org')).toBe(true)
    expect(isDomain('a.io')).toBe(true)
  })

  test('returns false for invalid domains', () => {
    expect(isDomain('https://example.com')).toBe(false)
    expect(isDomain('.com')).toBe(false)
    expect(isDomain('')).toBe(false)
  })
})

describe('isPostalCode', () => {
  test('returns true for valid postal codes', () => {
    expect(isPostalCode('12345')).toBe(true)
    expect(isPostalCode('12345-6789')).toBe(true)
    expect(isPostalCode('SW1A 1AA')).toBe(true)
    expect(isPostalCode('K1A 0B1')).toBe(true)
  })

  test('returns false for invalid postal codes', () => {
    expect(isPostalCode('')).toBe(false)
    expect(isPostalCode('ab')).toBe(false)
    expect(isPostalCode('12345678901')).toBe(false) // too long
    expect(isPostalCode('!@#$%')).toBe(false)
  })
})

describe('isISODate', () => {
  test('returns true for valid ISO dates', () => {
    expect(isISODate('2024-02-12')).toBe(true)
    expect(isISODate('2000-01-01')).toBe(true)
    expect(isISODate('1999-12-31')).toBe(true)
  })

  test('returns false for invalid ISO dates', () => {
    expect(isISODate('2024-13-01')).toBe(false)
    expect(isISODate('2024-00-01')).toBe(false)
    expect(isISODate('2024-01-32')).toBe(false)
    expect(isISODate('2024-01-00')).toBe(false)
    expect(isISODate('24-01-01')).toBe(false)
    expect(isISODate('2024/01/01')).toBe(false)
    expect(isISODate('')).toBe(false)
  })
})

describe('isBase64', () => {
  test('returns true for valid Base64 strings', () => {
    expect(isBase64('U29tZSB0ZXh0')).toBe(true)
    expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true)
    expect(isBase64('dGVzdA==')).toBe(true)
    expect(isBase64('YQ==')).toBe(true)
    expect(isBase64('')).toBe(true) // empty string matches the regex
  })

  test('returns false for invalid Base64 strings', () => {
    expect(isBase64('Invalid!')).toBe(false)
    expect(isBase64('abc')).toBe(false) // not a multiple of 4 without padding
    expect(isBase64('ab!d')).toBe(false)
    expect(isBase64('======')).toBe(false)
  })
})

describe('isSlug', () => {
  test('returns true for valid slugs', () => {
    expect(isSlug('valid-slug-123')).toBe(true)
    expect(isSlug('hello')).toBe(true)
    expect(isSlug('my-post')).toBe(true)
    expect(isSlug('123')).toBe(true)
    expect(isSlug('a-b-c')).toBe(true)
  })

  test('returns false for invalid slugs', () => {
    expect(isSlug('Invalid Slug!')).toBe(false)
    expect(isSlug('UPPERCASE')).toBe(false)
    expect(isSlug('-leading-dash')).toBe(false)
    expect(isSlug('trailing-dash-')).toBe(false)
    expect(isSlug('double--dash')).toBe(false)
    expect(isSlug('')).toBe(false)
  })
})
