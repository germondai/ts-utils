import { describe, test, expect } from 'bun:test'
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toTitleCase,
  toSentenceCase,
  toConstantCase,
  toggleCase,
  capitalize,
  truncate,
  slugify,
  stripTags,
  escapeHTML,
  unescapeHTML,
} from '../src/runtime/convertor'

describe('toCamelCase', () => {
  test('converts space-separated words', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld')
  })

  test('converts snake_case', () => {
    expect(toCamelCase('my_var_name')).toBe('myVarName')
  })

  test('preserves existing camelCase', () => {
    expect(toCamelCase('myVariableName')).toBe('myVariableName')
  })

  test('converts kebab-case', () => {
    expect(toCamelCase('my-var-name')).toBe('myVarName')
  })

  test('converts PascalCase to camelCase', () => {
    expect(toCamelCase('HelloWorld')).toBe('helloWorld')
  })

  test('handles single word', () => {
    expect(toCamelCase('hello')).toBe('hello')
  })

  test('handles empty string', () => {
    expect(toCamelCase('')).toBe('')
  })

  test('handles uppercase acronyms', () => {
    expect(toCamelCase('HTMLParser')).toBe('htmlParser')
  })
})

describe('toPascalCase', () => {
  test('converts space-separated words', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld')
  })

  test('converts camelCase to PascalCase', () => {
    expect(toPascalCase('myVariableName')).toBe('MyVariableName')
  })

  test('converts snake_case', () => {
    expect(toPascalCase('my_var_name')).toBe('MyVarName')
  })

  test('converts kebab-case', () => {
    expect(toPascalCase('my-var-name')).toBe('MyVarName')
  })

  test('handles single word', () => {
    expect(toPascalCase('hello')).toBe('Hello')
  })

  test('handles empty string', () => {
    expect(toPascalCase('')).toBe('')
  })
})

describe('toSnakeCase', () => {
  test('converts space-separated words', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world')
  })

  test('converts camelCase', () => {
    expect(toSnakeCase('myVariableName')).toBe('my_variable_name')
  })

  test('converts PascalCase', () => {
    expect(toSnakeCase('HelloWorld')).toBe('hello_world')
  })

  test('converts uppercase acronyms', () => {
    expect(toSnakeCase('HTMLParser')).toBe('html_parser')
  })

  test('converts kebab-case', () => {
    expect(toSnakeCase('my-var-name')).toBe('my_var_name')
  })

  test('handles single word', () => {
    expect(toSnakeCase('hello')).toBe('hello')
  })

  test('handles empty string', () => {
    expect(toSnakeCase('')).toBe('')
  })
})

describe('toKebabCase', () => {
  test('converts space-separated words', () => {
    expect(toKebabCase('hello world')).toBe('hello-world')
  })

  test('converts camelCase', () => {
    expect(toKebabCase('myVariableName')).toBe('my-variable-name')
  })

  test('converts PascalCase', () => {
    expect(toKebabCase('HelloWorld')).toBe('hello-world')
  })

  test('converts snake_case', () => {
    expect(toKebabCase('my_var_name')).toBe('my-var-name')
  })

  test('handles single word', () => {
    expect(toKebabCase('hello')).toBe('hello')
  })

  test('handles empty string', () => {
    expect(toKebabCase('')).toBe('')
  })
})

describe('toTitleCase', () => {
  test('converts lowercase words', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
  })

  test('converts uppercase words', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
  })

  test('converts mixed case', () => {
    expect(toTitleCase('hELLO wORLD')).toBe('Hello World')
  })

  test('handles single word', () => {
    expect(toTitleCase('hello')).toBe('Hello')
  })

  test('handles multiple spaces', () => {
    expect(toTitleCase('hello   world')).toBe('Hello World')
  })
})

describe('toSentenceCase', () => {
  test('capitalizes first letter and lowercases the rest', () => {
    expect(toSentenceCase('hello world')).toBe('Hello world')
  })

  test('lowercases uppercase input', () => {
    expect(toSentenceCase('HELLO WORLD')).toBe('Hello world')
  })

  test('handles single character', () => {
    expect(toSentenceCase('h')).toBe('H')
  })

  test('handles empty string', () => {
    expect(toSentenceCase('')).toBe('')
  })
})

describe('toConstantCase', () => {
  test('converts space-separated words', () => {
    expect(toConstantCase('hello world')).toBe('HELLO_WORLD')
  })

  test('converts camelCase', () => {
    expect(toConstantCase('myVariableName')).toBe('MY_VARIABLE_NAME')
  })

  test('converts kebab-case', () => {
    expect(toConstantCase('my-var-name')).toBe('MY_VAR_NAME')
  })

  test('handles single word', () => {
    expect(toConstantCase('hello')).toBe('HELLO')
  })

  test('handles empty string', () => {
    expect(toConstantCase('')).toBe('')
  })
})

describe('toggleCase', () => {
  test('toggles case of each character', () => {
    expect(toggleCase('Hello')).toBe('hELLO')
  })

  test('toggles all uppercase to lowercase', () => {
    expect(toggleCase('ABC')).toBe('abc')
  })

  test('toggles all lowercase to uppercase', () => {
    expect(toggleCase('abc')).toBe('ABC')
  })

  test('preserves non-letter characters', () => {
    expect(toggleCase('Hello World 123!')).toBe('hELLO wORLD 123!')
  })

  test('handles empty string', () => {
    expect(toggleCase('')).toBe('')
  })
})

describe('capitalize', () => {
  test('capitalizes first letter and lowercases rest', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  test('handles all uppercase', () => {
    expect(capitalize('HELLO')).toBe('Hello')
  })

  test('handles single character', () => {
    expect(capitalize('h')).toBe('H')
  })

  test('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })

  test('handles already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })
})

describe('truncate', () => {
  test('does not truncate short strings', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  test('truncates long strings without ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello')
  })

  test('truncates long strings with ellipsis', () => {
    expect(truncate('hello world', 8, true)).toBe('hello...')
  })

  test('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  test('handles maxLength of 0', () => {
    expect(truncate('hello', 0)).toBe('')
  })

  test('handles empty string', () => {
    expect(truncate('', 5)).toBe('')
  })
})

describe('slugify', () => {
  test('converts basic string to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  test('removes accented characters', () => {
    expect(slugify('cafe latte')).toBe('cafe-latte')
  })

  test('removes special characters', () => {
    expect(slugify('Hello! @World#')).toBe('hello-world')
  })

  test('collapses multiple hyphens', () => {
    expect(slugify('hello---world')).toBe('hello-world')
  })

  test('trims leading and trailing hyphens', () => {
    expect(slugify('  hello world  ')).toBe('hello-world')
  })

  test('respects max length', () => {
    const result = slugify('a very long title that should be truncated', 10)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  test('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})

describe('stripTags', () => {
  test('removes HTML tags', () => {
    expect(stripTags('<p>Hello</p>')).toBe('Hello')
  })

  test('removes nested tags', () => {
    expect(stripTags('<div><p>Hello</p></div>')).toBe('Hello')
  })

  test('removes self-closing tags', () => {
    expect(stripTags('Hello<br/>World')).toBe('HelloWorld')
  })

  test('handles string without tags', () => {
    expect(stripTags('Hello World')).toBe('Hello World')
  })

  test('removes tags with attributes', () => {
    expect(stripTags('<a href="url">Link</a>')).toBe('Link')
  })
})

describe('escapeHTML', () => {
  test('escapes ampersand', () => {
    expect(escapeHTML('a & b')).toBe('a &amp; b')
  })

  test('escapes angle brackets', () => {
    expect(escapeHTML('<div>')).toBe('&lt;div&gt;')
  })

  test('escapes double quotes', () => {
    expect(escapeHTML('"hello"')).toBe('&quot;hello&quot;')
  })

  test('escapes single quotes', () => {
    expect(escapeHTML("it's")).toBe('it&#039;s')
  })

  test('escapes all special characters together', () => {
    expect(escapeHTML('<a href="url">&</a>')).toBe(
      '&lt;a href=&quot;url&quot;&gt;&amp;&lt;/a&gt;',
    )
  })

  test('does not modify safe strings', () => {
    expect(escapeHTML('hello world')).toBe('hello world')
  })
})

describe('unescapeHTML', () => {
  test('unescapes ampersand', () => {
    expect(unescapeHTML('a &amp; b')).toBe('a & b')
  })

  test('unescapes angle brackets', () => {
    expect(unescapeHTML('&lt;div&gt;')).toBe('<div>')
  })

  test('unescapes double quotes', () => {
    expect(unescapeHTML('&quot;hello&quot;')).toBe('"hello"')
  })

  test('unescapes single quotes', () => {
    expect(unescapeHTML('it&#039;s')).toBe("it's")
  })

  test('is the inverse of escapeHTML', () => {
    const original = '<a href="url">&</a>'
    expect(unescapeHTML(escapeHTML(original))).toBe(original)
  })

  test('does not modify plain strings', () => {
    expect(unescapeHTML('hello world')).toBe('hello world')
  })
})
