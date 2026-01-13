/**
 * Tests for Line Clamp Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { lineClampPlugin } from '../../../../../src/plugins/core/utilities/line-clamp'

describe('Line Clamp Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = lineClampPlugin()
      expect(plugin.name).toBe('line-clamp')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Line Clamp Values', () => {
    it('should generate line-clamp-1', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-1'])
      expect(css).toContain('overflow: hidden')
      expect(css).toContain('display: -webkit-box')
      expect(css).toContain('-webkit-box-orient: vertical')
      expect(css).toContain('-webkit-line-clamp: 1')
    })

    it('should generate line-clamp-2', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-2'])
      expect(css).toContain('-webkit-line-clamp: 2')
    })

    it('should generate line-clamp-3', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-3'])
      expect(css).toContain('-webkit-line-clamp: 3')
    })

    it('should generate line-clamp-5', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-5'])
      expect(css).toContain('-webkit-line-clamp: 5')
    })

    it('should generate line-clamp-10', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-10'])
      expect(css).toContain('-webkit-line-clamp: 10')
    })
  })

  describe('Truncate Utility', () => {
    it('should generate truncate (line-clamp-1)', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['truncate'])
      expect(css).toContain('overflow: hidden')
      expect(css).toContain('text-overflow: ellipsis')
      expect(css).toContain('white-space: nowrap')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({
        plugins: [lineClampPlugin()],
        theme: { breakpoints: { sm: '640px', md: '768px' } }
      })
      const css = coral.generate(['sm:line-clamp-2', 'md:line-clamp-3'])
      // Responsive plugin not loaded, so classes are generated without @media
      expect(css).toContain('-webkit-line-clamp: 2')
      expect(css).toContain('-webkit-line-clamp: 3')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate card description', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-3', 'text-gray-600'])
      expect(css).toContain('-webkit-line-clamp: 3')
    })

    it('should generate blog excerpt', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-5', 'text-lg'])
      expect(css).toContain('-webkit-line-clamp: 5')
    })

    it('should generate single line truncate', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['truncate', 'w-64'])
      expect(css).toContain('text-overflow: ellipsis')
      expect(css).toContain('white-space: nowrap')
    })

    it('should generate news headline', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-2', 'font-bold', 'text-xl'])
      expect(css).toContain('-webkit-line-clamp: 2')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate line-clamp-[7]', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-[7]'])
      expect(css).toContain('-webkit-line-clamp: 7')
    })

    it('should generate line-clamp-[15]', () => {
      const coral = createCoral({ plugins: [lineClampPlugin()] })
      const css = coral.generate(['line-clamp-[15]'])
      expect(css).toContain('-webkit-line-clamp: 15')
    })
  })
})
