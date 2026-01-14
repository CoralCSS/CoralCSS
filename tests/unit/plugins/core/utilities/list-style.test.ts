/**
 * Tests for List Style Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { listStylePlugin } from '../../../../../src/plugins/core/utilities/list-style'

describe('List Style Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = listStylePlugin()
      expect(plugin.name).toBe('list-style')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('List Style Type', () => {
    it('should generate list-none', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-none'])
      expect(css).toContain('list-style-type: none')
    })

    it('should generate list-disc', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-disc'])
      expect(css).toContain('list-style-type: disc')
    })

    it('should generate list-decimal', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-decimal'])
      expect(css).toContain('list-style-type: decimal')
    })

    it('should generate list-square', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-square'])
      expect(css).toContain('list-style-type: square')
    })

    it('should generate list-circle', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-circle'])
      expect(css).toContain('list-style-type: circle')
    })
  })

  describe('Alpha List Styles', () => {
    it('should generate list-upper-alpha', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-upper-alpha'])
      expect(css).toContain('list-style-type: upper-alpha')
    })

    it('should generate list-lower-alpha', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-lower-alpha'])
      expect(css).toContain('list-style-type: lower-alpha')
    })
  })

  describe('Roman List Styles', () => {
    it('should generate list-upper-roman', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-upper-roman'])
      expect(css).toContain('list-style-type: upper-roman')
    })

    it('should generate list-lower-roman', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-lower-roman'])
      expect(css).toContain('list-style-type: lower-roman')
    })
  })

  describe('List Style Position', () => {
    it('should generate list-inside', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-inside'])
      expect(css).toContain('list-style-position: inside')
    })

    it('should generate list-outside', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-outside'])
      expect(css).toContain('list-style-position: outside')
    })
  })

  describe('List Style Image', () => {
    it('should generate list-image-none', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-image-none'])
      expect(css).toContain('list-style-image: none')
    })

    it('should note list-image-url with arbitrary value not implemented', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-image-[url(checkmark.png)]'])
      // list-image with arbitrary URL pattern not implemented
      expect(css).toBe('')
    })
  })

  describe('Combined Utilities', () => {
    it('should combine list-disc with list-inside', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-disc', 'list-inside'])
      expect(css).toContain('list-style-type: disc')
      expect(css).toContain('list-style-position: inside')
    })

    it('should combine list-decimal with list-outside', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-decimal', 'list-outside'])
      expect(css).toContain('list-style-type: decimal')
      expect(css).toContain('list-style-position: outside')
    })

    it('should combine list-none with list-inside', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-none', 'list-inside'])
      expect(css).toContain('list-style-type: none')
      expect(css).toContain('list-style-position: inside')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate unordered list', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-disc', 'list-inside', 'space-y-2'])
      expect(css).toContain('list-style-type: disc')
      expect(css).toContain('list-style-position: inside')
    })

    it('should generate ordered list', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-decimal', 'list-inside', 'space-y-2'])
      expect(css).toContain('list-style-type: decimal')
      expect(css).toContain('list-style-position: inside')
    })

    it('should generate clean list', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-none', 'space-y-2'])
      expect(css).toContain('list-style-type: none')
    })

    it('should generate custom bullet list', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-square', 'list-outside', 'pl-6'])
      expect(css).toContain('list-style-type: square')
      expect(css).toContain('list-style-position: outside')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({
        plugins: [listStylePlugin()],
        theme: { breakpoints: { sm: '640px', md: '768px' } }
      })
      const css = coral.generate(['list-disc', 'sm:list-decimal', 'md:list-none'])
      // Responsive plugin not loaded, so classes are generated without @media
      expect(css).toContain('list-style-type: disc')
      expect(css).toContain('list-style-type: decimal')
      expect(css).toContain('list-style-type: none')
    })
  })

  describe('Arbitrary Values', () => {
    it('should handle list-[...] arbitrary value for list-style-image', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-[checkmark.png]'])
      expect(css).toContain('list-style-image')
      expect(css).toContain('url')
    })

    it('should handle list-[...] with URL path', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-[/images/bullet.svg]'])
      expect(css).toContain('list-style-image')
    })

    it('should handle list-type-[...] arbitrary value', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-type-[katakana]'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('katakana')
    })

    it('should handle list-type-[...] with custom counter', () => {
      const coral = createCoral({ plugins: [listStylePlugin()] })
      const css = coral.generate(['list-type-[symbols(cyclic_*)]'])
      expect(css).toContain('list-style-type')
    })
  })
})
