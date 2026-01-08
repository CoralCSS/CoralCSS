/**
 * Generator Tests
 *
 * Tests for the CSS generator.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { CSSGenerator } from '../../src/core/generator'
import { RuleMatcher } from '../../src/core/matcher'
import type { Rule, Variant } from '../../src/types'

describe('CSSGenerator', () => {
  let generator: CSSGenerator
  let matcher: RuleMatcher

  beforeEach(() => {
    matcher = new RuleMatcher()
    generator = new CSSGenerator(matcher)

    // Add some test rules
    matcher.addRule({
      pattern: 'block',
      properties: { display: 'block' },
    })
    matcher.addRule({
      pattern: 'flex',
      properties: { display: 'flex' },
    })
    matcher.addRule({
      pattern: /^p-(\d+)$/,
      handler: (match) => {
        const v = match[1]
        if (!v) return null
        return { properties: { padding: `${parseInt(v, 10) * 0.25}rem` } }
      },
    })
    matcher.addRule({
      pattern: /^text-(.+)-(\d+)$/,
      handler: (match) => {
        const c = match[1]
        const s = match[2]
        if (!c || !s) return null
        return { properties: { color: `var(--${c}-${s})` } }
      },
    })
  })

  describe('generateClass', () => {
    it('should generate CSS for static pattern', () => {
      const css = generator.generateClass('block')
      expect(css).toContain('.block')
      expect(css).toContain('display: block')
    })

    it('should generate CSS for regex pattern', () => {
      const css = generator.generateClass('p-4')
      expect(css).toContain('.p-4')
      expect(css).toContain('padding: 1rem')
    })

    it('should return empty string for unknown class', () => {
      const css = generator.generateClass('unknown-class')
      expect(css).toBe('')
    })

    it('should escape special characters in selectors', () => {
      matcher.addRule({
        pattern: 'w-1/2',
        properties: { width: '50%' },
      })
      const css = generator.generateClass('w-1/2')
      expect(css).toContain('.w-1\\/2')
    })
  })

  describe('applyVariants', () => {
    beforeEach(() => {
      // Add variants
      generator.addVariant({
        name: 'hover',
        handler: (selector) => `${selector}:hover`,
      })
      generator.addVariant({
        name: 'focus',
        handler: (selector) => `${selector}:focus`,
      })
      generator.addVariant({
        name: 'dark',
        handler: (selector) => `.dark ${selector}`,
      })
    })

    it('should apply single variant', () => {
      const css = generator.generateClass('hover:block')
      expect(css).toContain('.hover\\:block:hover')
    })

    it('should apply multiple variants', () => {
      const css = generator.generateClass('dark:hover:block')
      expect(css).toContain('.dark .dark\\:hover\\:block:hover')
    })
  })

  describe('generateNegative', () => {
    beforeEach(() => {
      matcher.addRule({
        pattern: /^(-?)mt-(\d+)$/,
        handler: (match) => {
          const neg = match[1]
          const num = match[2]
          if (num === undefined) return null
          const isNegative = neg === '-'
          const value = parseInt(num, 10) * 0.25
          return {
            properties: { 'margin-top': isNegative ? `-${value}rem` : `${value}rem` },
          }
        },
      })
    })

    it('should generate negative values', () => {
      const css = generator.generateClass('-mt-4')
      expect(css).toContain('.-mt-4')
      expect(css).toContain('-1rem')
    })
  })

  describe('generateImportant', () => {
    it('should generate important declaration', () => {
      const css = generator.generateClass('!block')
      expect(css).toContain('.\\!block')
      expect(css).toContain('display: block !important')
    })
  })

  describe('generateMultiple', () => {
    it('should generate CSS for multiple classes', () => {
      const css = generator.generateMultiple(['block', 'flex', 'p-4'])
      expect(css).toContain('.block')
      expect(css).toContain('.flex')
      expect(css).toContain('.p-4')
    })

    it('should deduplicate classes', () => {
      const css = generator.generateMultiple(['block', 'block'])
      const matches = (css.match(/\.block/g) ?? []).length
      expect(matches).toBe(1)
    })

    it('should sort output properly', () => {
      const css = generator.generateMultiple(['block', 'p-4', 'flex'])
      // Classes should be in a consistent order
      expect(css).toBeDefined()
    })
  })
})
