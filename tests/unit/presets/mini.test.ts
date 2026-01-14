/**
 * Tests for Mini Preset
 */
import { describe, it, expect } from 'vitest'
import { miniPreset } from '../../../src/presets/mini'
import { createCoral } from '../../../src/kernel'

describe('Mini Preset', () => {
  describe('miniPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = miniPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include essential utility plugins', () => {
      const plugins = miniPreset()
      const pluginNames = plugins.map((p) => p.name)

      // Check for essential utilities
      expect(pluginNames).toContain('spacing')
      expect(pluginNames).toContain('sizing')
      expect(pluginNames).toContain('colors')
      expect(pluginNames).toContain('typography')
      expect(pluginNames).toContain('layout')
      expect(pluginNames).toContain('flexbox')
      expect(pluginNames).toContain('borders')
    })

    it('should include essential variant plugins', () => {
      const plugins = miniPreset()
      const pluginNames = plugins.map((p) => p.name)

      expect(pluginNames).toContain('pseudo-variants')
      expect(pluginNames).toContain('responsive-variants')
      expect(pluginNames).toContain('dark-mode-variants')
    })

    it('should use default darkMode class strategy', () => {
      const plugins = miniPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = miniPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept custom dark mode selector', () => {
      const plugins = miniPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-dark]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate spacing utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['p-4', 'm-2', 'gap-4'])
      expect(css).toContain('padding')
      expect(css).toContain('margin')
    })

    it('should generate sizing utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['w-full', 'h-screen'])
      expect(css).toContain('width')
      expect(css).toContain('height')
    })

    it('should generate color utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['bg-blue-500', 'text-white'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate typography utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['text-lg', 'font-bold'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate layout utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['block', 'hidden', 'relative'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate flexbox utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
    })

    it('should generate border utilities', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['border', 'rounded-lg'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should support pseudo variants', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['hover:bg-blue-600'])
      expect(css).toContain(':hover')
    })

    it('should support responsive variants', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['md:flex'])
      expect(css).toContain('@media')
    })

    it('should support dark mode variants', () => {
      const coral = createCoral({
        plugins: miniPreset(),
      })
      const css = coral.generate(['dark:bg-gray-900'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should have exactly 10 plugins', () => {
      const plugins = miniPreset()
      // 7 utility plugins + 3 variant plugins = 10
      expect(plugins.length).toBe(10)
    })
  })

  describe('Default Export', () => {
    it('should export miniPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/mini')
      expect(defaultExport).toBe(miniPreset)
    })
  })
})
