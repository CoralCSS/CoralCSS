/**
 * Utilities Tests
 *
 * Tests for utility functions.
 */

import { describe, it, expect } from 'vitest'
import {
  kebabCase,
  escapeSelector,
  generateId,
  splitByDelimiter,
} from '../../src/utils/string'
import {
  serializeProperties,
  formatCSS,
  minifyCSS,
  wrapInMediaQuery,
  wrapInContainerQuery,
  cssVar,
} from '../../src/utils/css'
import {
  hexToRgb,
  rgbToHex,
  adjustAlpha,
  isDark,
  mixColors,
} from '../../src/utils/color'

describe('String Utilities', () => {
  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('backgroundColor')).toBe('background-color')
    })

    it('should handle already kebab-case', () => {
      expect(kebabCase('background-color')).toBe('background-color')
    })

    it('should handle single word', () => {
      expect(kebabCase('display')).toBe('display')
    })

    it('should handle consecutive uppercase letters', () => {
      expect(kebabCase('XMLHttpRequest')).toBe('x-m-l-http-request')
    })
  })

  describe('escapeSelector', () => {
    it('should escape forward slashes', () => {
      expect(escapeSelector('w-1/2')).toBe('w-1\\/2')
    })

    it('should escape brackets', () => {
      expect(escapeSelector('p-[20px]')).toBe('p-\\[20px\\]')
    })

    it('should escape colons', () => {
      expect(escapeSelector('hover:block')).toBe('hover\\:block')
    })

    it('should handle multiple special characters', () => {
      expect(escapeSelector('dark:hover:w-1/2')).toBe('dark\\:hover\\:w-1\\/2')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      expect(id1).not.toBe(id2)
    })

    it('should include prefix', () => {
      const id = generateId('coral')
      expect(id).toMatch(/^coral-/)
    })
  })

  describe('splitByDelimiter', () => {
    it('should split by delimiter', () => {
      const result = splitByDelimiter('a:b:c', ':')
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('should handle no delimiter', () => {
      const result = splitByDelimiter('abc', ':')
      expect(result).toEqual(['abc'])
    })

    it('should handle brackets', () => {
      const result = splitByDelimiter('hover:[&>div]:block', ':')
      expect(result).toContain('[&>div]')
    })
  })
})

describe('CSS Utilities', () => {
  describe('serializeProperties', () => {
    it('should serialize properties to CSS', () => {
      const result = serializeProperties({ display: 'block', color: 'red' })
      expect(result).toContain('display: block')
      expect(result).toContain('color: red')
    })

    it('should handle empty object', () => {
      const result = serializeProperties({})
      expect(result).toBe('')
    })
  })

  describe('formatCSS', () => {
    it('should format CSS rule', () => {
      const result = formatCSS('.test', { display: 'block' })
      expect(result).toContain('.test')
      expect(result).toContain('display: block')
    })
  })

  describe('minifyCSS', () => {
    it('should remove whitespace', () => {
      const css = '.test { display: block; }'
      const result = minifyCSS(css)
      expect(result).not.toContain('  ')
    })

    it('should remove comments', () => {
      const css = '/* comment */ .test { display: block; }'
      const result = minifyCSS(css)
      expect(result).not.toContain('comment')
    })
  })

  describe('wrapInMediaQuery', () => {
    it('should wrap CSS in media query', () => {
      const result = wrapInMediaQuery('.test { display: block; }', '(min-width: 640px)')
      expect(result).toContain('@media (min-width: 640px)')
    })
  })

  describe('wrapInContainerQuery', () => {
    it('should wrap CSS in container query', () => {
      const result = wrapInContainerQuery('.test { display: block; }', '(min-width: 640px)')
      expect(result).toContain('@container (min-width: 640px)')
    })

    it('should handle named container', () => {
      const result = wrapInContainerQuery('.test { display: block; }', '(min-width: 640px)', 'sidebar')
      expect(result).toContain('@container sidebar')
    })
  })

  describe('cssVar', () => {
    it('should create CSS variable', () => {
      expect(cssVar('color-primary')).toBe('var(--color-primary)')
    })

    it('should handle fallback', () => {
      expect(cssVar('color-primary', 'blue')).toBe('var(--color-primary, blue)')
    })
  })
})

describe('Color Utilities', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      const result = hexToRgb('#ff0000')
      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should handle short hex', () => {
      const result = hexToRgb('#f00')
      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should handle without hash', () => {
      const result = hexToRgb('ff0000')
      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })
  })

  describe('rgbToHex', () => {
    it('should convert RGB to hex', () => {
      const result = rgbToHex(255, 0, 0)
      expect(result).toBe('#ff0000')
    })

    it('should pad with zeros', () => {
      const result = rgbToHex(0, 0, 15)
      expect(result).toBe('#00000f')
    })
  })

  describe('adjustAlpha', () => {
    it('should adjust hex color alpha', () => {
      const result = adjustAlpha('#ff0000', 0.5)
      expect(result).toContain('rgba')
      expect(result).toContain('0.5')
    })

    it('should handle RGB string', () => {
      const result = adjustAlpha('rgb(255, 0, 0)', 0.5)
      expect(result).toContain('rgba')
    })
  })

  describe('isDark', () => {
    it('should return true for dark colors', () => {
      expect(isDark('#000000')).toBe(true)
      expect(isDark('#333333')).toBe(true)
    })

    it('should return false for light colors', () => {
      expect(isDark('#ffffff')).toBe(false)
      expect(isDark('#eeeeee')).toBe(false)
    })
  })

  describe('mixColors', () => {
    it('should mix two colors', () => {
      const result = mixColors('#ff0000', '#0000ff', 0.5)
      // Should be purple-ish
      expect(result).toBeDefined()
    })

    it('should return first color at weight 0', () => {
      const result = mixColors('#ff0000', '#0000ff', 0)
      expect(result).toBe('#ff0000')
    })

    it('should return second color at weight 1', () => {
      const result = mixColors('#ff0000', '#0000ff', 1)
      expect(result).toBe('#0000ff')
    })
  })
})
