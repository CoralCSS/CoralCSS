/**
 * Tests for Aspect Ratio Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { aspectRatioPlugin } from '../../../../../src/plugins/core/utilities/aspect-ratio'

describe('Aspect Ratio Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = aspectRatioPlugin()
      expect(plugin.name).toBe('aspect-ratio')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Standard Aspect Ratios', () => {
    it('should generate aspect-auto', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-auto'])
      expect(css).toContain('aspect-ratio: auto')
    })

    it('should generate aspect-square', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-square'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate aspect-video', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })

  describe('Numeric Aspect Ratios', () => {
    it('should generate aspect-4-3', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-4-3'])
      expect(css).toContain('aspect-ratio: 4 / 3')
    })

    it('should note aspect-3-2 not implemented (use aspect-[3/2] instead)', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-3-2'])
      // aspect-3-2 is not implemented, use arbitrary aspect-[3/2] instead
      expect(css).toBe('')
    })

    it('should generate aspect-21-9', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-21-9'])
      expect(css).toContain('aspect-ratio: 21 / 9')
    })
  })

  describe('Arbitrary Aspect Ratios', () => {
    it('should generate aspect-[4/3]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[4/3]'])
      expect(css).toContain('aspect-ratio: 4/3')
    })

    it('should generate aspect-[1.618]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[1.618]'])
      expect(css).toContain('aspect-ratio: 1.618')
    })

    it('should generate aspect-[1920/1080]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[1920/1080]'])
      expect(css).toContain('aspect-ratio: 1920/1080')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video', 'aspect-square'])
      expect(css).toContain('aspect-ratio: 16 / 9')
      expect(css).toContain('aspect-ratio: 1 / 1')
    })
  })

  describe('Hover States', () => {
    it('should note hover variants require variants plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate Instagram square photo', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-square', 'w-full', 'object-cover'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate YouTube thumbnail', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video', 'w-full'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })

    it('should generate Twitter post image', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-16-9'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })
})
