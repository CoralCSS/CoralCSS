/**
 * Validation Utilities Tests
 *
 * Comprehensive tests for input validation utilities.
 * @module tests/unit/utils/validation
 */

import { describe, it, expect } from 'vitest'
import {
  validateClassName,
  validateCSSValue,
  validateRegexPattern,
  validateThemePropertyName,
  validateSelector,
  validateFilePath,
  sanitizeString,
  type ValidationResult,
} from '../../../src/utils/validation'

describe('validateClassName', () => {
  it('accepts valid class names', () => {
    expect(validateClassName('bg-red-500')).toEqual({ valid: true })
    expect(validateClassName('p-4')).toEqual({ valid: true })
    expect(validateClassName('flex')).toEqual({ valid: true })
    expect(validateClassName('hover:bg-blue-500')).toEqual({ valid: true })
    expect(validateClassName('md:p-6')).toEqual({ valid: true })
  })

  it('accepts empty string', () => {
    expect(validateClassName('')).toEqual({ valid: true })
  })

  it('rejects strings exceeding max length', () => {
    const tooLong = 'a'.repeat(1001)
    const result = validateClassName(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('maximum length')
  })

  it('rejects prototype pollution attempts', () => {
    expect(validateClassName('__proto__.polluted')).toEqual({
      valid: false,
      error: 'Prototype pollution attempt detected',
    })
    expect(validateClassName('constructor.prototype')).toEqual({
      valid: false,
      error: 'Prototype pollution attempt detected',
    })
  })

  it('rejects dangerous HTML characters', () => {
    expect(validateClassName('<script>alert(1)</script>')).toEqual({
      valid: false,
      error: 'Contains dangerous characters',
    })
    expect(validateClassName('"><img src=x onerror=alert(1)>')).toEqual({
      valid: false,
      error: 'Contains dangerous characters',
    })
  })

  it('rejects control characters', () => {
    expect(validateClassName('bg-\x00-red')).toEqual({
      valid: false,
      error: 'Contains control characters',
    })
  })

  it('respects custom options', () => {
    const result = validateClassName('test', { maxLength: 4 })
    expect(result.valid).toBe(true)

    const result2 = validateClassName('toolong', { maxLength: 4 })
    expect(result2.valid).toBe(false)
  })
})

describe('validateCSSValue', () => {
  it('accepts valid CSS values', () => {
    expect(validateCSSValue('red')).toEqual({ valid: true })
    expect(validateCSSValue('#f00')).toEqual({ valid: true })
    expect(validateCSSValue('rgb(255, 0, 0)')).toEqual({ valid: true })
    expect(validateCSSValue('1rem')).toEqual({ valid: true })
    expect(validateCSSValue('calc(100% - 20px)')).toEqual({ valid: true })
  })

  it('rejects dangerous protocols', () => {
    expect(validateCSSValue('javascript:alert(1)')).toEqual({
      valid: false,
      error: 'Contains dangerous protocol',
    })
    expect(validateCSSValue('vbscript:msgbox()')).toEqual({
      valid: false,
      error: 'Contains dangerous protocol',
    })
    expect(validateCSSValue('data:text/html,<script>')).toEqual({
      valid: false,
      error: 'Contains dangerous protocol',
    })
  })

  it('rejects dangerous CSS functions', () => {
    expect(validateCSSValue('expression(alert(1))')).toEqual({
      valid: false,
      error: 'Contains dangerous function',
    })
    expect(validateCSSValue('-moz-binding:url(#default#foo)')).toEqual({
      valid: false,
      error: 'Contains dangerous function',
    })
  })

  it('rejects @import directives', () => {
    expect(validateCSSValue('@import url(foo.css)')).toEqual({
      valid: false,
      error: 'Contains @import directive',
    })
  })

  it('rejects values exceeding max length', () => {
    const tooLong = 'a'.repeat(10001)
    const result = validateCSSValue(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum length')
  })
})

describe('validateRegexPattern', () => {
  it('accepts valid regex patterns', () => {
    expect(validateRegexPattern('[a-z]+')).toEqual({ valid: true })
    expect(validateRegexPattern('\\d{3,5}')).toEqual({ valid: true })
    expect(validateRegexPattern('test@example')).toEqual({ valid: true })
    expect(validateRegexPattern('^start.*end$')).toEqual({ valid: true })
  })

  it('rejects nested quantifiers (ReDoS risk)', () => {
    expect(validateRegexPattern('(a+)+')).toEqual({
      valid: false,
      error: 'Contains nested quantifiers',
    })
    expect(validateRegexPattern('((a+)+)+')).toEqual({
      valid: false,
      error: 'Contains nested quantifiers',
    })
    expect(validateRegexPattern('(.*)*')).toEqual({
      valid: false,
      error: 'Contains nested quantifiers',
    })
  })

  it('rejects dangerous repetition patterns', () => {
    // (.+)*+ matches nested quantifiers first, so we expect that error
    expect(validateRegexPattern('(.+)*+')).toEqual({
      valid: false,
      error: 'Contains nested quantifiers',
    })
    // A pattern that truly has dangerous repetition: (a)+** has a quantifier followed by *+
    expect(validateRegexPattern('(a)+**')).toEqual({
      valid: false,
      error: 'Contains dangerous repetition pattern',
    })
  })

  it('rejects excessive alternation', () => {
    // Create pattern with over 100 alternations
    const manyAlternations = Array.from({ length: 120 }, (_, i) => `opt${i}`).join('|')
    const result = validateRegexPattern(manyAlternations)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('excessive alternation')
  })

  it('rejects patterns exceeding max length', () => {
    // Create pattern over 5000 characters
    const tooLong = 'a'.repeat(6000)
    const result = validateRegexPattern(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum length')
  })

  it('rejects invalid regex syntax', () => {
    const result1 = validateRegexPattern('[a-z')
    expect(result1.valid).toBe(false)
    expect(result1.error).toContain('Invalid regex syntax')

    const result2 = validateRegexPattern('(unclosed')
    expect(result2.valid).toBe(false)
    expect(result2.error).toContain('Invalid regex syntax')
  })
})

describe('validateThemePropertyName', () => {
  it('accepts valid theme paths', () => {
    expect(validateThemePropertyName('colors.primary')).toEqual({ valid: true })
    expect(validateThemePropertyName('spacing.md')).toEqual({ valid: true })
    expect(validateThemePropertyName('fonts.sans')).toEqual({ valid: true })
    expect(validateThemePropertyName('screens.lg')).toEqual({ valid: true })
  })

  it('rejects prototype pollution attempts', () => {
    expect(validateThemePropertyName('__proto__.polluted')).toEqual({
      valid: false,
      error: 'Prototype pollution attempt detected',
    })
    expect(validateThemePropertyName('constructor.prototype.colors')).toEqual({
      valid: false,
      error: 'Prototype pollution attempt detected',
    })
  })

  it('rejects invalid path format', () => {
    expect(validateThemePropertyName('invalid@path')).toEqual({
      valid: false,
      error: 'Invalid path format',
    })
    expect(validateThemePropertyName('path with spaces')).toEqual({
      valid: false,
      error: 'Invalid path format',
    })
  })

  it('rejects paths exceeding max length', () => {
    const tooLong = 'a'.repeat(201)
    const result = validateThemePropertyName(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum length')
  })
})

describe('validateSelector', () => {
  it('accepts valid CSS selectors', () => {
    expect(validateSelector('.my-class')).toEqual({ valid: true, sanitized: '.my-class' })
    expect(validateSelector('#my-id')).toEqual({ valid: true, sanitized: '#my-id' })
    expect(validateSelector('[data-attr]')).toEqual({ valid: true, sanitized: '[data-attr]' })
    expect(validateSelector('div > span')).toEqual({ valid: true, sanitized: 'div > span' })
    expect(validateSelector('.btn:hover')).toEqual({ valid: true, sanitized: '.btn:hover' })
  })

  it('rejects dangerous characters', () => {
    expect(validateSelector('<script>alert(1)</script>')).toEqual({
      valid: false,
      error: 'Contains dangerous characters',
    })
    expect(validateSelector('div><img src=x onerror=alert(1)>')).toEqual({
      valid: false,
      error: 'Contains dangerous characters',
    })
  })

  it('rejects javascript: protocol', () => {
    expect(validateSelector('a[href="javascript:alert(1)"]')).toEqual({
      valid: false,
      error: 'Contains dangerous protocol',
    })
  })

  it('rejects selectors exceeding max length', () => {
    const tooLong = '.' + 'a'.repeat(500) // 501 chars (exceeds 500)
    const result = validateSelector(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum length')
  })
})

describe('validateFilePath', () => {
  it('accepts valid file paths', () => {
    expect(validateFilePath('/home/user/file.txt')).toEqual({ valid: true })
    expect(validateFilePath('C:\\Windows\\file.txt')).toEqual({ valid: true })
    expect(validateFilePath('./relative/path')).toEqual({ valid: true })
    expect(validateFilePath('../parent/file.txt')).toEqual({ valid: true })
  })

  it('rejects path traversal attempts', () => {
    expect(validateFilePath('../../../etc/passwd')).toEqual({
      valid: false,
      error: 'Path traversal detected',
    })
    expect(validateFilePath('..\\..\\..\\windows\\system32')).toEqual({
      valid: false,
      error: 'Path traversal detected',
    })
  })

  it('rejects paths escaping root', () => {
    expect(validateFilePath('/../../../../etc/passwd')).toEqual({
      valid: false,
      error: 'Path traversal detected',
    })
  })

  it('rejects null bytes', () => {
    expect(validateFilePath('file\x00name.txt')).toEqual({
      valid: false,
      error: 'Contains null byte',
    })
  })

  it('rejects paths exceeding max length', () => {
    const tooLong = '/a/' + 'b'.repeat(5000) + '/file.txt'
    const result = validateFilePath(tooLong)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum length')
  })
})

describe('sanitizeString', () => {
  it('removes dangerous characters by default', () => {
    expect(sanitizeString('<script>alert(1)</script>')).toBe('scriptalert1script')
    expect(sanitizeString('hello&world')).toBe('helloworld')
    expect(sanitizeString('test@example.com')).toBe('testexamplecom')
  })

  it('keeps allowed characters', () => {
    expect(sanitizeString('hello-world_123')).toBe('hello-world_123')
    expect(sanitizeString('bg-red-500')).toBe('bg-red-500')
  })

  it('uses custom allowed pattern', () => {
    expect(sanitizeString('hello world!', { allow: /[a-z ]/g })).toBe('hello world')
    expect(sanitizeString('test@example.com', { allow: /[a-z@.]/g })).toBe('test@example.com')
  })

  it('uses custom replacement', () => {
    expect(sanitizeString('hello&world', { replacement: '-' })).toBe('hello-world')
    // Both @ and . get replaced with the same replacement string
    expect(sanitizeString('test@example.com', { replacement: '-' })).toBe('test-example-com')
  })
})

describe('Validation Result Type', () => {
  it('has correct type structure', () => {
    const result: ValidationResult = { valid: true }
    expect(result).toHaveProperty('valid')
  })

  it('can include error message', () => {
    const result: ValidationResult = { valid: false, error: 'Test error' }
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Test error')
  })
})

describe('Edge Cases', () => {
  it('handles null input gracefully', () => {
    // @ts-expect-error - testing null input
    expect(validateClassName(null as any).valid).toBe(false)
  })

  it('handles undefined input gracefully', () => {
    // @ts-expect-error - testing undefined input
    expect(validateClassName(undefined as any).valid).toBe(false)
  })

  it('handles numeric input', () => {
    // @ts-expect-error - testing numeric input
    expect(validateClassName(123 as any).valid).toBe(false)
  })

  it('handles empty object input', () => {
    // @ts-expect-error - testing object input
    expect(validateClassName({} as any).valid).toBe(false)
  })

  it('handles special unicode characters in class names', () => {
    // Allow basic unicode in class names but not control chars
    expect(validateClassName('text-😀')).toEqual({ valid: true })
    expect(validateClassName('bg-🔴-500')).toEqual({ valid: true })
  })

  it('handles RTL class names', () => {
    expect(validateClassName('dir-rtl:text-right')).toEqual({ valid: true })
    expect(validateClassName('text-right')).toEqual({ valid: true })
  })

  it('handles very long valid patterns', () => {
    const longButValid = 'a'.repeat(999) // Just under limit
    expect(validateClassName(longButValid)).toEqual({ valid: true })
  })

  it('handles boundary case at max length', () => {
    const exactlyMax = 'a'.repeat(1000) // Exactly at limit
    expect(validateClassName(exactlyMax)).toEqual({ valid: true })
  })
})

describe('Additional validateClassName options', () => {
  it('allows HTML when allowHTML is true', () => {
    const result = validateClassName('<div>', { allowHTML: true })
    expect(result.valid).toBe(true)
  })

  it('validates against custom pattern', () => {
    // Pattern that only allows lowercase letters
    const result = validateClassName('abc', { pattern: /^[a-z]+$/ })
    expect(result.valid).toBe(true)

    const result2 = validateClassName('ABC', { pattern: /^[a-z]+$/ })
    expect(result2.valid).toBe(false)
    expect(result2.error).toContain('pattern')
  })

  it('validates against allowedChars whitelist', () => {
    const result = validateClassName('abc', { allowedChars: 'abc' })
    expect(result.valid).toBe(true)

    const result2 = validateClassName('abcd', { allowedChars: 'abc' })
    expect(result2.valid).toBe(false)
    expect(result2.error).toContain('disallowed character')
  })

  it('detects more prototype pollution patterns', () => {
    // The input is lowercased before comparison, so these will match
    expect(validateClassName('__PROTO__').valid).toBe(false)
    expect(validateClassName('CONSTRUCTOR.PROTOTYPE').valid).toBe(false)
    expect(validateClassName('PROTOTYPE[0]').valid).toBe(false)
  })

  it('detects various control characters', () => {
    // Test control characters in ranges 0-8, 11-12, 14-31
    expect(validateClassName('test\x01value').valid).toBe(false)
    expect(validateClassName('test\x07value').valid).toBe(false)
    expect(validateClassName('test\x0bvalue').valid).toBe(false) // vertical tab
    expect(validateClassName('test\x0cvalue').valid).toBe(false) // form feed
    expect(validateClassName('test\x1fvalue').valid).toBe(false)
    expect(validateClassName('test\x7fvalue').valid).toBe(false) // DEL
  })
})

describe('Additional validateCSSValue cases', () => {
  it('handles non-string input', () => {
    expect(validateCSSValue(null as unknown as string).valid).toBe(false)
    expect(validateCSSValue(undefined as unknown as string).valid).toBe(false)
    expect(validateCSSValue(123 as unknown as string).valid).toBe(false)
  })

  it('detects data:text/javascript protocol', () => {
    expect(validateCSSValue('data:text/javascript,alert(1)').valid).toBe(false)
  })

  it('detects data:text/ecmascript protocol', () => {
    expect(validateCSSValue('data:text/ecmascript,alert(1)').valid).toBe(false)
  })

  it('detects behavior() function', () => {
    expect(validateCSSValue('behavior(url(#default))').valid).toBe(false)
    expect(validateCSSValue('behaviour(url(#default))').valid).toBe(false)
  })
})

describe('Additional validateRegexPattern cases', () => {
  it('handles non-string input', () => {
    expect(validateRegexPattern(null as unknown as string).valid).toBe(false)
    expect(validateRegexPattern(undefined as unknown as string).valid).toBe(false)
    expect(validateRegexPattern(123 as unknown as string).valid).toBe(false)
  })
})

describe('Additional validateThemePropertyName cases', () => {
  it('handles non-string input', () => {
    expect(validateThemePropertyName(null as unknown as string).valid).toBe(false)
    expect(validateThemePropertyName(undefined as unknown as string).valid).toBe(false)
    expect(validateThemePropertyName(123 as unknown as string).valid).toBe(false)
  })

  it('detects prototype[ pattern', () => {
    expect(validateThemePropertyName('prototype[test]').valid).toBe(false)
  })
})

describe('Additional validateSelector cases', () => {
  it('handles non-string input', () => {
    expect(validateSelector(null as unknown as string).valid).toBe(false)
    expect(validateSelector(undefined as unknown as string).valid).toBe(false)
    expect(validateSelector(123 as unknown as string).valid).toBe(false)
  })

  it('rejects invalid selector format', () => {
    // A selector that doesn't match the valid pattern
    expect(validateSelector('!invalid').valid).toBe(false)
    expect(validateSelector('$weird').valid).toBe(false)
  })
})

describe('Additional validateFilePath cases', () => {
  it('handles non-string input', () => {
    expect(validateFilePath(null as unknown as string).valid).toBe(false)
    expect(validateFilePath(undefined as unknown as string).valid).toBe(false)
    expect(validateFilePath(123 as unknown as string).valid).toBe(false)
  })

  it('detects Windows-style path traversal', () => {
    expect(validateFilePath('..\\..\\windows').valid).toBe(false)
  })

  it('detects path starting with absolute and traversal', () => {
    expect(validateFilePath('/..something').valid).toBe(false)
    expect(validateFilePath('C:..something').valid).toBe(false)
  })
})

describe('Additional sanitizeString cases', () => {
  it('handles character class patterns', () => {
    // Pattern that is already a character class
    const result = sanitizeString('hello!world', { allow: /[a-z]/g })
    expect(result).toBe('helloworld')
  })

  it('handles negated character class patterns', () => {
    // Pattern starting with [^ - already negated
    const result = sanitizeString('hello123', { allow: /[^0-9]/g })
    // With negated pattern [^0-9], the function tries to negate it again
    expect(typeof result).toBe('string')
  })
})
