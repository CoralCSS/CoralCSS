/**
 * Parser Tests
 *
 * Tests for the class name parser.
 */

import { describe, it, expect } from 'vitest'
import { ClassNameParser } from '../../src/core/parser'

describe('ClassNameParser', () => {
  const parser = new ClassNameParser()

  describe('parse', () => {
    it('should parse simple class names', () => {
      const result = parser.parse('block')
      expect(result.utility).toBe('block')
      expect(result.variants).toEqual([])
      expect(result.negative).toBe(false)
    })

    it('should parse class with variant', () => {
      const result = parser.parse('hover:block')
      expect(result.utility).toBe('block')
      expect(result.variants).toEqual(['hover'])
    })

    it('should parse class with multiple variants', () => {
      const result = parser.parse('dark:hover:block')
      expect(result.utility).toBe('block')
      expect(result.variants).toEqual(['dark', 'hover'])
    })

    it('should parse negative values', () => {
      const result = parser.parse('-mt-4')
      expect(result.utility).toBe('mt-4')
      expect(result.negative).toBe(true)
    })

    it('should parse arbitrary values', () => {
      const result = parser.parse('p-[20px]')
      expect(result.utility).toBe('p-[20px]')
      expect(result.arbitrary).toBe('20px')
    })

    it('should parse class with opacity modifier', () => {
      const result = parser.parse('bg-red-500/50')
      expect(result.utility).toBe('bg-red-500/50')
      expect(result.opacity).toBe('50')
    })

    it('should parse important modifier', () => {
      const result = parser.parse('!block')
      expect(result.utility).toBe('block')
      expect(result.important).toBe(true)
    })

    it('should handle complex class names', () => {
      const result = parser.parse('dark:hover:!-translate-x-[10px]/50')
      expect(result.variants).toEqual(['dark', 'hover'])
      expect(result.important).toBe(true)
      expect(result.negative).toBe(true)
    })
  })

  describe('expandVariantGroups', () => {
    it('should expand variant groups', () => {
      const result = parser.expandVariantGroups('hover:(bg-red text-white)')
      expect(result).toContain('hover:bg-red')
      expect(result).toContain('hover:text-white')
    })

    it('should handle nested variant groups', () => {
      const result = parser.expandVariantGroups('dark:(hover:(bg-red text-white))')
      expect(result).toContain('dark:hover:bg-red')
      expect(result).toContain('dark:hover:text-white')
    })

    it('should preserve non-grouped classes', () => {
      const result = parser.expandVariantGroups('flex hover:(bg-red) items-center')
      expect(result).toContain('flex')
      expect(result).toContain('hover:bg-red')
      expect(result).toContain('items-center')
    })
  })

  describe('parseArbitraryValue', () => {
    it('should extract arbitrary value', () => {
      const result = parser.parseArbitraryValue('[20px]')
      expect(result).toBe('20px')
    })

    it('should handle CSS functions', () => {
      const result = parser.parseArbitraryValue('[calc(100%-20px)]')
      expect(result).toBe('calc(100%-20px)')
    })

    it('should handle colors', () => {
      const result = parser.parseArbitraryValue('[#ff0000]')
      expect(result).toBe('#ff0000')
    })

    it('should handle rgb colors', () => {
      const result = parser.parseArbitraryValue('[rgb(255,0,0)]')
      expect(result).toBe('rgb(255,0,0)')
    })

    it('should return null for non-arbitrary values', () => {
      const result = parser.parseArbitraryValue('20px')
      expect(result).toBeNull()
    })
  })

  describe('splitVariants', () => {
    it('should split variants from utility', () => {
      const result = parser.splitVariants('hover:focus:block')
      expect(result.variants).toEqual(['hover', 'focus'])
      expect(result.utility).toBe('block')
    })

    it('should handle no variants', () => {
      const result = parser.splitVariants('block')
      expect(result.variants).toEqual([])
      expect(result.utility).toBe('block')
    })

    it('should handle arbitrary variants', () => {
      const result = parser.splitVariants('[&>div]:block')
      expect(result.variants).toEqual(['[&>div]'])
      expect(result.utility).toBe('block')
    })
  })
})
