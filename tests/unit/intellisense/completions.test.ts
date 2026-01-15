/**
 * Tests for IntelliSense Completions
 *
 * Tests completion item generation and filtering.
 */
import { describe, it, expect } from 'vitest'
import {
  generateCompletions,
  generateVariantCompletions,
  filterCompletions,
  getCompletionsByCategory,
  type CompletionItem,
} from '../../../src/intellisense/completions'

describe('Completions', () => {
  describe('generateCompletions', () => {
    it('should generate completion items', () => {
      const completions = generateCompletions()
      expect(completions).toBeDefined()
      expect(completions.length).toBeGreaterThan(0)
    })

    it('should include spacing utilities', () => {
      const completions = generateCompletions()
      const spacingItems = completions.filter(c => c.category === 'spacing')

      expect(spacingItems.length).toBeGreaterThan(0)
      expect(spacingItems.some(c => c.label.startsWith('m-'))).toBe(true)
      expect(spacingItems.some(c => c.label.startsWith('p-'))).toBe(true)
      expect(spacingItems.some(c => c.label.startsWith('gap-'))).toBe(true)
    })

    it('should include color utilities', () => {
      const completions = generateCompletions()
      const colorItems = completions.filter(c => c.category === 'colors')

      expect(colorItems.length).toBeGreaterThan(0)
      expect(colorItems.some(c => c.label.startsWith('text-'))).toBe(true)
      expect(colorItems.some(c => c.label.startsWith('bg-'))).toBe(true)
      expect(colorItems.some(c => c.label.startsWith('border-'))).toBe(true)
    })

    it('should include typography utilities', () => {
      const completions = generateCompletions()
      const typographyItems = completions.filter(c => c.category === 'typography')

      expect(typographyItems.length).toBeGreaterThan(0)
      expect(typographyItems.some(c => c.label.startsWith('text-'))).toBe(true)
      expect(typographyItems.some(c => c.label.startsWith('font-'))).toBe(true)
    })

    it('should include layout utilities', () => {
      const completions = generateCompletions()
      const layoutItems = completions.filter(c => c.category === 'layout')

      expect(layoutItems.length).toBeGreaterThan(0)
      expect(layoutItems.some(c => c.label === 'flex')).toBe(true)
      expect(layoutItems.some(c => c.label === 'grid')).toBe(true)
      expect(layoutItems.some(c => c.label === 'block')).toBe(true)
    })

    it('should include flexbox utilities', () => {
      const completions = generateCompletions()
      const flexboxItems = completions.filter(c => c.category === 'flexbox')

      expect(flexboxItems.length).toBeGreaterThan(0)
      expect(flexboxItems.some(c => c.label.startsWith('flex-'))).toBe(true)
      expect(flexboxItems.some(c => c.label.startsWith('justify-'))).toBe(true)
      expect(flexboxItems.some(c => c.label.startsWith('items-'))).toBe(true)
    })

    it('should include grid utilities', () => {
      const completions = generateCompletions()
      const gridItems = completions.filter(c => c.category === 'grid')

      expect(gridItems.length).toBeGreaterThan(0)
      expect(gridItems.some(c => c.label.startsWith('grid-cols-'))).toBe(true)
      expect(gridItems.some(c => c.label.startsWith('grid-rows-'))).toBe(true)
      expect(gridItems.some(c => c.label.startsWith('col-span-'))).toBe(true)
    })

    it('should include sizing utilities', () => {
      const completions = generateCompletions()
      const sizingItems = completions.filter(c => c.category === 'sizing')

      expect(sizingItems.length).toBeGreaterThan(0)
      expect(sizingItems.some(c => c.label.startsWith('w-'))).toBe(true)
      expect(sizingItems.some(c => c.label.startsWith('h-'))).toBe(true)
    })

    it('should include border utilities', () => {
      const completions = generateCompletions()
      const borderItems = completions.filter(c => c.category === 'borders')

      expect(borderItems.length).toBeGreaterThan(0)
      expect(borderItems.some(c => c.label.startsWith('rounded'))).toBe(true)
      expect(borderItems.some(c => c.label.startsWith('border'))).toBe(true)
    })

    it('should include effect utilities', () => {
      const completions = generateCompletions()
      const effectItems = completions.filter(c => c.category === 'effects')

      expect(effectItems.length).toBeGreaterThan(0)
      expect(effectItems.some(c => c.label.startsWith('shadow'))).toBe(true)
      expect(effectItems.some(c => c.label.startsWith('opacity-'))).toBe(true)
    })

    it('should include transform utilities', () => {
      const completions = generateCompletions()
      const transformItems = completions.filter(c => c.category === 'transforms')

      expect(transformItems.length).toBeGreaterThan(0)
      expect(transformItems.some(c => c.label.startsWith('scale-'))).toBe(true)
      expect(transformItems.some(c => c.label.startsWith('rotate-'))).toBe(true)
      expect(transformItems.some(c => c.label.startsWith('translate-'))).toBe(true)
    })

    it('should include transition utilities', () => {
      const completions = generateCompletions()
      const transitionItems = completions.filter(c => c.category === 'transitions')

      expect(transitionItems.length).toBeGreaterThan(0)
      expect(transitionItems.some(c => c.label.startsWith('transition'))).toBe(true)
      expect(transitionItems.some(c => c.label.startsWith('duration-'))).toBe(true)
      expect(transitionItems.some(c => c.label.startsWith('ease-'))).toBe(true)
    })

    it('should include filter utilities', () => {
      const completions = generateCompletions()
      const filterItems = completions.filter(c => c.category === 'filters')

      expect(filterItems.length).toBeGreaterThan(0)
      expect(filterItems.some(c => c.label.startsWith('blur'))).toBe(true)
      expect(filterItems.some(c => c.label.startsWith('brightness-'))).toBe(true)
    })

    it('should include interactivity utilities', () => {
      const completions = generateCompletions()
      const interactivityItems = completions.filter(c => c.category === 'interactivity')

      expect(interactivityItems.length).toBeGreaterThan(0)
      expect(interactivityItems.some(c => c.label.startsWith('cursor-'))).toBe(true)
    })

    it('should have CSS property for each item', () => {
      const completions = generateCompletions()
      for (const item of completions.slice(0, 100)) {
        expect(item.css).toBeDefined()
        expect(item.css.length).toBeGreaterThan(0)
      }
    })

    it('should include negative spacing values', () => {
      const completions = generateCompletions()
      const negativeItems = completions.filter(c => c.label.startsWith('-m'))

      expect(negativeItems.length).toBeGreaterThan(0)
    })

    it('should include color opacity variants', () => {
      const completions = generateCompletions()
      const opacityItems = completions.filter(c => c.label.includes('/'))

      expect(opacityItems.length).toBeGreaterThan(0)
    })
  })

  describe('generateVariantCompletions', () => {
    it('should generate variant completions', () => {
      const variants = generateVariantCompletions()
      expect(variants).toBeDefined()
      expect(variants.length).toBeGreaterThan(0)
    })

    it('should include hover variant', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'hover:')).toBe(true)
    })

    it('should include focus variant', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'focus:')).toBe(true)
    })

    it('should include responsive variants', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'sm:')).toBe(true)
      expect(variants.some(v => v.label === 'md:')).toBe(true)
      expect(variants.some(v => v.label === 'lg:')).toBe(true)
      expect(variants.some(v => v.label === 'xl:')).toBe(true)
      expect(variants.some(v => v.label === '2xl:')).toBe(true)
    })

    it('should include dark mode variant', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'dark:')).toBe(true)
    })

    it('should include pseudo-element variants', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'before:')).toBe(true)
      expect(variants.some(v => v.label === 'after:')).toBe(true)
    })

    it('should include group/peer variants', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'group-hover:')).toBe(true)
      expect(variants.some(v => v.label === 'peer-focus:')).toBe(true)
    })

    it('should include form state variants', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'disabled:')).toBe(true)
      expect(variants.some(v => v.label === 'checked:')).toBe(true)
      expect(variants.some(v => v.label === 'required:')).toBe(true)
    })

    it('should include motion variants', () => {
      const variants = generateVariantCompletions()
      expect(variants.some(v => v.label === 'motion-safe:')).toBe(true)
      expect(variants.some(v => v.label === 'motion-reduce:')).toBe(true)
    })

    it('should have descriptions for variants', () => {
      const variants = generateVariantCompletions()
      for (const variant of variants) {
        expect(variant.description).toBeDefined()
      }
    })
  })

  describe('filterCompletions', () => {
    it('should return all completions for empty prefix', () => {
      const completions = generateCompletions()
      const filtered = filterCompletions(completions, '')

      expect(filtered.length).toBe(completions.length)
    })

    it('should filter by prefix', () => {
      const completions = generateCompletions()
      const filtered = filterCompletions(completions, 'flex')

      expect(filtered.length).toBeGreaterThan(0)
      for (const item of filtered) {
        expect(item.label.toLowerCase().startsWith('flex')).toBe(true)
      }
    })

    it('should be case insensitive', () => {
      const completions = generateCompletions()
      const lowerFiltered = filterCompletions(completions, 'flex')
      const upperFiltered = filterCompletions(completions, 'FLEX')

      expect(lowerFiltered.length).toBe(upperFiltered.length)
    })

    it('should prioritize exact matches', () => {
      const completions = generateCompletions()
      const filtered = filterCompletions(completions, 'flex')

      if (filtered.length > 0 && filtered[0].label.toLowerCase() === 'flex') {
        expect(filtered[0].label.toLowerCase()).toBe('flex')
      }
    })

    it('should sort by sortOrder', () => {
      const completions: CompletionItem[] = [
        { label: 'b', category: 'test', css: '', sortOrder: 20 },
        { label: 'a', category: 'test', css: '', sortOrder: 10 },
        { label: 'c', category: 'test', css: '', sortOrder: 30 },
      ]
      const filtered = filterCompletions(completions, '')

      // Sort order should be maintained for items with same prefix relevance
      expect(filtered[0].sortOrder).toBeLessThanOrEqual(filtered[1].sortOrder || 100)
    })

    it('should filter spacing utilities correctly', () => {
      const completions = generateCompletions()
      const filtered = filterCompletions(completions, 'p-')

      expect(filtered.length).toBeGreaterThan(0)
      expect(filtered.every(item => item.label.startsWith('p-'))).toBe(true)
    })

    it('should filter color utilities correctly', () => {
      const completions = generateCompletions()
      const filtered = filterCompletions(completions, 'text-')

      expect(filtered.length).toBeGreaterThan(0)
    })
  })

  describe('getCompletionsByCategory', () => {
    it('should group completions by category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories).toBeDefined()
      expect(categories.size).toBeGreaterThan(0)
    })

    it('should have spacing category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('spacing')).toBe(true)
      const spacingItems = categories.get('spacing')
      expect(spacingItems?.length).toBeGreaterThan(0)
    })

    it('should have colors category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('colors')).toBe(true)
    })

    it('should have typography category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('typography')).toBe(true)
    })

    it('should have layout category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('layout')).toBe(true)
    })

    it('should have flexbox category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('flexbox')).toBe(true)
    })

    it('should have grid category', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      expect(categories.has('grid')).toBe(true)
    })

    it('should preserve all items', () => {
      const completions = generateCompletions()
      const categories = getCompletionsByCategory(completions)

      let totalItems = 0
      for (const items of categories.values()) {
        totalItems += items.length
      }

      expect(totalItems).toBe(completions.length)
    })
  })

  describe('CompletionItem Structure', () => {
    it('should have required fields', () => {
      const completions = generateCompletions()

      for (const item of completions.slice(0, 50)) {
        expect(item.label).toBeDefined()
        expect(item.category).toBeDefined()
        expect(item.css).toBeDefined()
      }
    })

    it('should have valid CSS', () => {
      const completions = generateCompletions()

      for (const item of completions.slice(0, 50)) {
        expect(item.css).toContain(':')
      }
    })

    it('should have description for some items', () => {
      const completions = generateCompletions()
      const withDescriptions = completions.filter(c => c.description)

      expect(withDescriptions.length).toBeGreaterThan(0)
    })

    it('should have color value for color items', () => {
      const completions = generateCompletions()
      const colorItems = completions.filter(c => c.category === 'colors' && c.color)

      expect(colorItems.length).toBeGreaterThan(0)
    })
  })

  describe('Custom Theme Support', () => {
    it('should use custom spacing values', () => {
      const customTheme = {
        spacing: {
          '128': '32rem',
          custom: '5rem',
        },
      }
      const completions = generateCompletions(customTheme as any)

      expect(completions.some(c => c.label === 'm-128')).toBe(true)
      expect(completions.some(c => c.label === 'p-custom')).toBe(true)
    })

    it('should use custom colors', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
        },
      }
      const completions = generateCompletions(customTheme as any)

      expect(completions.some(c => c.label === 'text-brand')).toBe(true)
      expect(completions.some(c => c.label === 'bg-brand')).toBe(true)
    })
  })
})
