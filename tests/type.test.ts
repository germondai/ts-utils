import { describe, test, expect } from 'bun:test'
import {
  isPrimitive,
  isObject,
  isArray,
  isEmpty,
  isJSON,
  isFunction,
  isDate,
  isNumber,
  isString,
  isBoolean,
  isNil,
  isRegExp,
} from '../src/runtime/type'

describe('isPrimitive', () => {
  test('returns true for primitive values', () => {
    expect(isPrimitive('hello')).toBe(true)
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(BigInt(9))).toBe(true)
    expect(isPrimitive(Symbol('s'))).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
  })

  test('returns false for non-primitive values', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(/regex/)).toBe(false)
  })
})

describe('isObject', () => {
  test('returns true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  test('returns false for non-plain objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })

  test('returns false for class instances', () => {
    class Foo {}
    expect(isObject(new Foo())).toBe(false)
  })
})

describe('isArray', () => {
  test('returns true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(new Array(3))).toBe(true)
  })

  test('returns false for non-arrays', () => {
    expect(isArray({})).toBe(false)
    expect(isArray('hello')).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(42)).toBe(false)
  })
})

describe('isEmpty', () => {
  test('returns true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  test('returns false for non-empty values', () => {
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  test('returns false for non-empty primitives and other types', () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(42)).toBe(false)
  })
})

describe('isJSON', () => {
  test('returns true for valid JSON strings', () => {
    expect(isJSON('{"name": "John"}')).toBe(true)
    expect(isJSON('[]')).toBe(true)
    expect(isJSON('"hello"')).toBe(true)
    expect(isJSON('123')).toBe(true)
    expect(isJSON('null')).toBe(true)
    expect(isJSON('true')).toBe(true)
  })

  test('returns false for invalid JSON strings', () => {
    expect(isJSON('{invalid}')).toBe(false)
    expect(isJSON("{'key': 'value'}")).toBe(false)
    expect(isJSON('undefined')).toBe(false)
    expect(isJSON('')).toBe(false)
  })

  test('returns false for non-string values', () => {
    expect(isJSON(42 as any)).toBe(false)
    expect(isJSON(null as any)).toBe(false)
  })
})

describe('isFunction', () => {
  test('returns true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
    expect(isFunction(class Foo {})).toBe(true)
  })

  test('returns false for non-functions', () => {
    expect(isFunction(42)).toBe(false)
    expect(isFunction('hello')).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction({})).toBe(false)
  })
})

describe('isDate', () => {
  test('returns true for valid Date instances', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2024-01-01'))).toBe(true)
  })

  test('returns false for invalid Date instances', () => {
    expect(isDate(new Date('invalid'))).toBe(false)
  })

  test('returns false for non-Date values', () => {
    expect(isDate('2024-01-01')).toBe(false)
    expect(isDate(Date.now())).toBe(false)
    expect(isDate(null)).toBe(false)
  })
})

describe('isNumber', () => {
  test('returns true for valid numbers', () => {
    expect(isNumber(42)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
  })

  test('returns false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })

  test('returns false for non-number values', () => {
    expect(isNumber('42')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(true)).toBe(false)
  })
})

describe('isString', () => {
  test('returns true for strings', () => {
    expect(isString('hello')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(`template`)).toBe(true)
  })

  test('returns false for non-strings', () => {
    expect(isString(42)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString([])).toBe(false)
  })
})

describe('isBoolean', () => {
  test('returns true for booleans', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  test('returns false for non-booleans', () => {
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
  })
})

describe('isNil', () => {
  test('returns true for null and undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  test('returns false for non-nil values', () => {
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil({})).toBe(false)
  })
})

describe('isRegExp', () => {
  test('returns true for RegExp instances', () => {
    expect(isRegExp(/test/)).toBe(true)
    expect(isRegExp(new RegExp('test'))).toBe(true)
    expect(isRegExp(/^hello$/i)).toBe(true)
  })

  test('returns false for non-RegExp values', () => {
    expect(isRegExp('/test/')).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp(42)).toBe(false)
  })
})
