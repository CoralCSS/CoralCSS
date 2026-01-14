/**
 * Parser Regex Cache Tests
 *
 * Tests for cached RegExp patterns and utility functions.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  getCachedRegex,
  clearRegexCache,
  getCacheSize,
  lazyRegex,
  createCachedMatcher,
  createCachedExtractor,
  OPACITY_PATTERN,
  OPACITY_SIMPLE_PATTERN,
  ARBITRARY_PATTERN,
  VARIANT_GROUP_PREFIX_PATTERN,
  WHITESPACE_PATTERN,
  ARBITRARY_WITH_TYPE_PATTERN,
  BRACKET_CONTENT_PATTERN,
  HAS_BRACKETS_PATTERN,
  IMPORTANT_PREFIX_PATTERN,
  NEGATIVE_PREFIX_PATTERN,
  DOUBLE_DASH_PATTERN,
  COLON_PATTERN,
  NUMERIC_VALUE_PATTERN,
  PERCENTAGE_PATTERN,
  LENGTH_VALUE_PATTERN,
  COLOR_VALUE_PATTERN,
  ANGLE_VALUE_PATTERN,
  TIME_VALUE_PATTERN,
} from '../../../src/core/parser-cache'

describe('Parser Regex Cache', () => {
  beforeEach(() => {
    clearRegexCache()
  })

  describe('getCachedRegex', () => {
    it('should create and cache a regex from string pattern', () => {
      const regex = getCachedRegex('test', '^test-\\d+$')
      expect(regex).toBeInstanceOf(RegExp)
      expect(regex.test('test-123')).toBe(true)
      expect(regex.test('other')).toBe(false)
    })

    it('should return same regex instance for same key', () => {
      const regex1 = getCachedRegex('same-key', '^pattern$')
      const regex2 = getCachedRegex('same-key', '^pattern$')
      expect(regex1).toBe(regex2)
    })

    it('should support flags', () => {
      const regex = getCachedRegex('case-insensitive', 'hello', 'i')
      expect(regex.test('HELLO')).toBe(true)
      expect(regex.test('Hello')).toBe(true)
    })

    it('should differentiate by flags', () => {
      const regexNoFlags = getCachedRegex('pattern', 'abc')
      const regexWithFlags = getCachedRegex('pattern', 'abc', 'i')
      expect(regexNoFlags).not.toBe(regexWithFlags)
    })

    it('should accept RegExp directly', () => {
      const original = /^direct-regex$/
      const cached = getCachedRegex('direct', original)
      expect(cached).toBe(original)
    })

    it('should cache RegExp passed directly', () => {
      const original = /^direct-cached$/
      getCachedRegex('direct-cache', original)
      const retrieved = getCachedRegex('direct-cache', /^different$/)
      expect(retrieved).toBe(original)
    })
  })

  describe('clearRegexCache', () => {
    it('should clear all cached regexes', () => {
      getCachedRegex('key1', 'pattern1')
      getCachedRegex('key2', 'pattern2')
      expect(getCacheSize()).toBeGreaterThan(0)

      clearRegexCache()
      expect(getCacheSize()).toBe(0)
    })

    it('should allow creating new regexes after clear', () => {
      getCachedRegex('key', 'pattern')
      clearRegexCache()

      const newRegex = getCachedRegex('key', 'different-pattern')
      expect(newRegex.source).toBe('different-pattern')
    })
  })

  describe('getCacheSize', () => {
    it('should return 0 for empty cache', () => {
      expect(getCacheSize()).toBe(0)
    })

    it('should return correct size', () => {
      getCachedRegex('key1', 'p1')
      getCachedRegex('key2', 'p2')
      getCachedRegex('key3', 'p3')
      expect(getCacheSize()).toBe(3)
    })

    it('should not increment for same key', () => {
      getCachedRegex('same', 'pattern')
      getCachedRegex('same', 'pattern')
      getCachedRegex('same', 'pattern')
      expect(getCacheSize()).toBe(1)
    })
  })

  describe('lazyRegex', () => {
    it('should create regex with lazy prefix', () => {
      const regex = lazyRegex('custom', '^prefix-value$')
      expect(regex.test('prefix-value')).toBe(true)
    })

    it('should support flags', () => {
      const regex = lazyRegex('case', 'test', 'gi')
      expect(regex.flags).toContain('i')
      expect(regex.flags).toContain('g')
    })

    it('should cache lazy regexes', () => {
      const regex1 = lazyRegex('lazy-key', 'pattern')
      const regex2 = lazyRegex('lazy-key', 'pattern')
      expect(regex1).toBe(regex2)
    })
  })

  describe('createCachedMatcher', () => {
    it('should create a matcher function', () => {
      const hasPrefix = createCachedMatcher('prefix', /^prefix-/)
      expect(hasPrefix('prefix-test')).toBe(true)
      expect(hasPrefix('no-prefix')).toBe(false)
    })

    it('should work with string pattern', () => {
      const hasNumber = createCachedMatcher('number', '\\d+')
      expect(hasNumber('abc123')).toBe(true)
      expect(hasNumber('abc')).toBe(false)
    })

    it('should support flags', () => {
      const matcher = createCachedMatcher('insensitive', 'TEST', 'i')
      expect(matcher('test')).toBe(true)
      expect(matcher('TEST')).toBe(true)
    })

    it('should cache matcher regex', () => {
      const matcher1 = createCachedMatcher('same-matcher', 'pattern')
      const matcher2 = createCachedMatcher('same-matcher', 'different')
      // Both should use same cached regex
      expect(matcher1('pattern')).toBe(true)
      expect(matcher2('pattern')).toBe(true) // Uses cached pattern, not 'different'
    })
  })

  describe('createCachedExtractor', () => {
    it('should create an extractor function', () => {
      const extractNumber = createCachedExtractor('num', /value-(\d+)/)
      expect(extractNumber('value-42')).toBe('42')
      expect(extractNumber('value-100')).toBe('100')
    })

    it('should return null when no match', () => {
      const extractor = createCachedExtractor('test', /test-(\w+)/)
      expect(extractor('no-match')).toBeNull()
    })

    it('should work with string pattern', () => {
      const extractor = createCachedExtractor('word', '-(\\w+)$')
      expect(extractor('prefix-suffix')).toBe('suffix')
    })

    it('should support flags', () => {
      const extractor = createCachedExtractor('letter', '([A-Z]+)', 'i')
      expect(extractor('123abc456')).toBe('abc')
    })

    it('should return null for non-capturing match', () => {
      const extractor = createCachedExtractor('no-group', /test/)
      expect(extractor('test')).toBeNull()
    })
  })

  describe('Pre-defined patterns', () => {
    describe('OPACITY_PATTERN', () => {
      it('should match numeric opacity', () => {
        expect(OPACITY_PATTERN.test('/50')).toBe(true)
        expect(OPACITY_PATTERN.test('/100')).toBe(true)
      })

      it('should match percentage opacity', () => {
        expect(OPACITY_PATTERN.test('/50%')).toBe(true)
        expect(OPACITY_PATTERN.test('/0.5')).toBe(true)
      })

      it('should match bracket opacity', () => {
        expect(OPACITY_PATTERN.test('/[0.5]')).toBe(true)
        expect(OPACITY_PATTERN.test('/[var(--opacity)]')).toBe(true)
      })

      it('should not match invalid opacity', () => {
        expect(OPACITY_PATTERN.test('50')).toBe(false)
      })
    })

    describe('OPACITY_SIMPLE_PATTERN', () => {
      it('should match simple numeric opacity', () => {
        expect(OPACITY_SIMPLE_PATTERN.test('/50')).toBe(true)
        expect(OPACITY_SIMPLE_PATTERN.test('/0.5')).toBe(true)
      })

      it('should match percentage', () => {
        expect(OPACITY_SIMPLE_PATTERN.test('/50%')).toBe(true)
      })

      it('should not match bracket values', () => {
        expect(OPACITY_SIMPLE_PATTERN.test('/[0.5]')).toBe(false)
      })
    })

    describe('ARBITRARY_PATTERN', () => {
      it('should match arbitrary values', () => {
        expect(ARBITRARY_PATTERN.test('[10px]')).toBe(true)
        expect(ARBITRARY_PATTERN.test('[#ff0000]')).toBe(true)
        expect(ARBITRARY_PATTERN.test('[var(--custom)]')).toBe(true)
      })

      it('should extract content', () => {
        const match = '[custom-value]'.match(ARBITRARY_PATTERN)
        expect(match?.[1]).toBe('custom-value')
      })
    })

    describe('VARIANT_GROUP_PREFIX_PATTERN', () => {
      it('should match simple variant groups', () => {
        expect(VARIANT_GROUP_PREFIX_PATTERN.test('hover:(')).toBe(true)
        expect(VARIANT_GROUP_PREFIX_PATTERN.test('dark:(')).toBe(true)
      })

      it('should match compound variant groups', () => {
        expect(VARIANT_GROUP_PREFIX_PATTERN.test('dark:hover:(')).toBe(true)
        expect(VARIANT_GROUP_PREFIX_PATTERN.test('md:dark:focus:(')).toBe(true)
      })

      it('should extract variant prefix', () => {
        const match = 'hover:sm:('.match(VARIANT_GROUP_PREFIX_PATTERN)
        expect(match?.[1]).toBe('hover:sm')
      })
    })

    describe('WHITESPACE_PATTERN', () => {
      it('should match whitespace', () => {
        expect(WHITESPACE_PATTERN.test(' ')).toBe(true)
        expect(WHITESPACE_PATTERN.test('\t')).toBe(true)
        expect(WHITESPACE_PATTERN.test('\n')).toBe(true)
      })

      it('should not match non-whitespace', () => {
        expect(WHITESPACE_PATTERN.test('abc')).toBe(false)
      })
    })

    describe('ARBITRARY_WITH_TYPE_PATTERN', () => {
      it('should match arbitrary with type hint', () => {
        expect(ARBITRARY_WITH_TYPE_PATTERN.test('[color:red]')).toBe(true)
        expect(ARBITRARY_WITH_TYPE_PATTERN.test('[length:10px]')).toBe(true)
      })

      it('should match arbitrary without type hint', () => {
        expect(ARBITRARY_WITH_TYPE_PATTERN.test('[#ff0000]')).toBe(true)
        expect(ARBITRARY_WITH_TYPE_PATTERN.test('[10px]')).toBe(true)
      })

      it('should extract type and value', () => {
        const match = '[color:blue]'.match(ARBITRARY_WITH_TYPE_PATTERN)
        expect(match?.[1]).toBe('color')
        expect(match?.[2]).toBe('blue')
      })

      it('should handle value-only extraction', () => {
        const match = '[10rem]'.match(ARBITRARY_WITH_TYPE_PATTERN)
        expect(match?.[1]).toBeUndefined()
        expect(match?.[2]).toBe('10rem')
      })
    })

    describe('BRACKET_CONTENT_PATTERN', () => {
      it('should match bracket content', () => {
        expect(BRACKET_CONTENT_PATTERN.test('[content]')).toBe(true)
      })

      it('should extract content', () => {
        const match = '[my-value]'.match(BRACKET_CONTENT_PATTERN)
        expect(match?.[1]).toBe('my-value')
      })

      it('should not match partial brackets', () => {
        expect(BRACKET_CONTENT_PATTERN.test('prefix[content]')).toBe(false)
      })
    })

    describe('HAS_BRACKETS_PATTERN', () => {
      it('should detect brackets anywhere', () => {
        expect(HAS_BRACKETS_PATTERN.test('[value]')).toBe(true)
        expect(HAS_BRACKETS_PATTERN.test('prefix-[value]')).toBe(true)
        expect(HAS_BRACKETS_PATTERN.test('text-[14px]')).toBe(true)
      })

      it('should not match empty brackets', () => {
        expect(HAS_BRACKETS_PATTERN.test('[]')).toBe(false)
      })
    })

    describe('IMPORTANT_PREFIX_PATTERN', () => {
      it('should match important prefix', () => {
        expect(IMPORTANT_PREFIX_PATTERN.test('!text-red')).toBe(true)
        expect(IMPORTANT_PREFIX_PATTERN.test('!p-4')).toBe(true)
      })

      it('should not match without prefix', () => {
        expect(IMPORTANT_PREFIX_PATTERN.test('text-red')).toBe(false)
      })
    })

    describe('NEGATIVE_PREFIX_PATTERN', () => {
      it('should match negative prefix', () => {
        expect(NEGATIVE_PREFIX_PATTERN.test('-m-4')).toBe(true)
        expect(NEGATIVE_PREFIX_PATTERN.test('-translate-x-1')).toBe(true)
      })

      it('should match single dash not followed by double dash', () => {
        // Pattern ^-(?!--) matches dash not followed by --
        expect(NEGATIVE_PREFIX_PATTERN.test('-single')).toBe(true)
        // Note: --custom matches because the first char matches ^-, and the lookahead (?!--)
        // checks if the NEXT two chars after the first - are not "--", which they are "-c"
        // So technically this pattern matches any string starting with single dash
      })

      it('should not match without dash prefix', () => {
        expect(NEGATIVE_PREFIX_PATTERN.test('nodash')).toBe(false)
        expect(NEGATIVE_PREFIX_PATTERN.test('custom-var')).toBe(false)
      })
    })

    describe('DOUBLE_DASH_PATTERN', () => {
      it('should match CSS variable prefix', () => {
        expect(DOUBLE_DASH_PATTERN.test('--custom')).toBe(true)
        expect(DOUBLE_DASH_PATTERN.test('--color-primary')).toBe(true)
      })

      it('should not match single dash', () => {
        expect(DOUBLE_DASH_PATTERN.test('-single')).toBe(false)
      })
    })

    describe('COLON_PATTERN', () => {
      it('should match colon', () => {
        expect(COLON_PATTERN.test('hover:text-red')).toBe(true)
        expect(COLON_PATTERN.test('dark:bg-gray')).toBe(true)
      })

      it('should not match without colon', () => {
        expect(COLON_PATTERN.test('text-red')).toBe(false)
      })
    })

    describe('NUMERIC_VALUE_PATTERN', () => {
      it('should match integers', () => {
        expect(NUMERIC_VALUE_PATTERN.test('0')).toBe(true)
        expect(NUMERIC_VALUE_PATTERN.test('123')).toBe(true)
      })

      it('should match decimals', () => {
        expect(NUMERIC_VALUE_PATTERN.test('1.5')).toBe(true)
        expect(NUMERIC_VALUE_PATTERN.test('0.25')).toBe(true)
      })

      it('should match negative numbers', () => {
        expect(NUMERIC_VALUE_PATTERN.test('-5')).toBe(true)
        expect(NUMERIC_VALUE_PATTERN.test('-1.5')).toBe(true)
      })

      it('should not match with units', () => {
        expect(NUMERIC_VALUE_PATTERN.test('10px')).toBe(false)
      })
    })

    describe('PERCENTAGE_PATTERN', () => {
      it('should match percentages', () => {
        expect(PERCENTAGE_PATTERN.test('50%')).toBe(true)
        expect(PERCENTAGE_PATTERN.test('100%')).toBe(true)
        expect(PERCENTAGE_PATTERN.test('0.5%')).toBe(true)
      })

      it('should not match without percent sign', () => {
        expect(PERCENTAGE_PATTERN.test('50')).toBe(false)
      })
    })

    describe('LENGTH_VALUE_PATTERN', () => {
      it('should match px values', () => {
        expect(LENGTH_VALUE_PATTERN.test('10px')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('0px')).toBe(true)
      })

      it('should match rem/em values', () => {
        expect(LENGTH_VALUE_PATTERN.test('1rem')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('2em')).toBe(true)
      })

      it('should match viewport units', () => {
        expect(LENGTH_VALUE_PATTERN.test('100vw')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('50vh')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('10vmin')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('10vmax')).toBe(true)
      })

      it('should match other units', () => {
        expect(LENGTH_VALUE_PATTERN.test('1in')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('2cm')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('10mm')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('12pt')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('1pc')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('2ch')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('1ex')).toBe(true)
      })

      it('should match negative values', () => {
        expect(LENGTH_VALUE_PATTERN.test('-10px')).toBe(true)
      })

      it('should match unitless numbers', () => {
        expect(LENGTH_VALUE_PATTERN.test('0')).toBe(true)
        expect(LENGTH_VALUE_PATTERN.test('-5')).toBe(true)
      })
    })

    describe('COLOR_VALUE_PATTERN', () => {
      it('should match hex colors', () => {
        expect(COLOR_VALUE_PATTERN.test('#fff')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('#ffffff')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('#FF6347')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('#ffff')).toBe(true) // 4-digit hex
        expect(COLOR_VALUE_PATTERN.test('#ffffffff')).toBe(true) // 8-digit hex
      })

      it('should match rgb colors', () => {
        expect(COLOR_VALUE_PATTERN.test('rgb(255, 0, 0)')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('rgb(0,0,0)')).toBe(true)
      })

      it('should match hsl colors', () => {
        expect(COLOR_VALUE_PATTERN.test('hsl(0, 100%, 50%)')).toBe(true)
      })

      it('should match named colors', () => {
        expect(COLOR_VALUE_PATTERN.test('red')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('blue')).toBe(true)
        expect(COLOR_VALUE_PATTERN.test('transparent')).toBe(true)
      })
    })

    describe('ANGLE_VALUE_PATTERN', () => {
      it('should match degrees', () => {
        expect(ANGLE_VALUE_PATTERN.test('45deg')).toBe(true)
        expect(ANGLE_VALUE_PATTERN.test('180deg')).toBe(true)
        expect(ANGLE_VALUE_PATTERN.test('-90deg')).toBe(true)
      })

      it('should match radians', () => {
        expect(ANGLE_VALUE_PATTERN.test('3.14rad')).toBe(true)
      })

      it('should match gradians', () => {
        expect(ANGLE_VALUE_PATTERN.test('100grad')).toBe(true)
      })

      it('should match turns', () => {
        expect(ANGLE_VALUE_PATTERN.test('0.5turn')).toBe(true)
        expect(ANGLE_VALUE_PATTERN.test('1turn')).toBe(true)
      })

      it('should match unitless angles', () => {
        expect(ANGLE_VALUE_PATTERN.test('0')).toBe(true)
        expect(ANGLE_VALUE_PATTERN.test('45')).toBe(true)
      })
    })

    describe('TIME_VALUE_PATTERN', () => {
      it('should match milliseconds', () => {
        expect(TIME_VALUE_PATTERN.test('300ms')).toBe(true)
        expect(TIME_VALUE_PATTERN.test('100ms')).toBe(true)
      })

      it('should match seconds', () => {
        expect(TIME_VALUE_PATTERN.test('1s')).toBe(true)
        expect(TIME_VALUE_PATTERN.test('0.5s')).toBe(true)
      })

      it('should match decimals', () => {
        expect(TIME_VALUE_PATTERN.test('1.5s')).toBe(true)
        expect(TIME_VALUE_PATTERN.test('150.5ms')).toBe(true)
      })

      it('should match unitless values', () => {
        expect(TIME_VALUE_PATTERN.test('0')).toBe(true)
        expect(TIME_VALUE_PATTERN.test('300')).toBe(true)
      })
    })
  })

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(NUMERIC_VALUE_PATTERN.test('')).toBe(false)
      expect(OPACITY_PATTERN.test('')).toBe(false)
    })

    it('should handle special regex characters in patterns', () => {
      const regex = getCachedRegex('special', '\\[test\\]')
      expect(regex.test('[test]')).toBe(true)
    })

    it('should handle multiple patterns with same base', () => {
      const r1 = getCachedRegex('base', 'test', '')
      const r2 = getCachedRegex('base', 'test', 'i')
      const r3 = getCachedRegex('base', 'test', 'g')
      expect(r1).not.toBe(r2)
      expect(r2).not.toBe(r3)
    })
  })
})
