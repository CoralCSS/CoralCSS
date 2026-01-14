/**
 * Tests for Full Preset
 */
import { describe, it, expect } from 'vitest'
import { fullPreset } from '../../../src/presets/full'
import { createCoral } from '../../../src/kernel'

describe('Full Preset', () => {
  describe('fullPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = fullPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include more plugins than mini preset', () => {
      const plugins = fullPreset()
      // Full preset should have many more plugins than mini (10)
      expect(plugins.length).toBeGreaterThan(10)
    })

    it('should include modern-css plugin', () => {
      const plugins = fullPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should include dark-mode-variants plugin', () => {
      const plugins = fullPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should use default options when none provided', () => {
      const plugins = fullPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = fullPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept custom dark mode selector', () => {
      const plugins = fullPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-theme="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept prefix option', () => {
      const plugins = fullPreset({ prefix: 'tw-' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with full utilities', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'grid', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = fullPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      // Should only have one dark-mode-variants plugin
      expect(darkModePlugins.length).toBe(1)
    })

    it('should include all core plugins', () => {
      const plugins = fullPreset()
      const pluginNames = plugins.map((p) => p.name)

      // Should include essential utilities
      expect(pluginNames).toContain('spacing')
      expect(pluginNames).toContain('colors')
      expect(pluginNames).toContain('typography')
    })

    it('should accept all options at once', () => {
      const plugins = fullPreset({
        darkMode: 'class',
        darkModeSelector: '.dark',
        prefix: 'coral-',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('Default Export', () => {
    it('should export fullPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/full')
      expect(defaultExport).toBe(fullPreset)
    })
  })

  describe('Integration', () => {
    it('should support grid utilities', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['grid', 'grid-cols-3', 'gap-4'])
      expect(css).toContain('display: grid')
    })

    it('should support flexbox utilities', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
    })

    it('should support transform utilities', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['transform', 'scale-110', 'rotate-45'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should support transition utilities', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['transition', 'duration-300'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should support responsive variants', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['md:flex', 'lg:grid'])
      expect(css).toContain('@media')
    })

    it('should support hover variants', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['hover:bg-blue-600'])
      expect(css).toContain(':hover')
    })

    it('should support focus variants', () => {
      const coral = createCoral({
        plugins: fullPreset(),
      })
      const css = coral.generate(['focus:ring-2'])
      expect(css.length).toBeGreaterThan(0)
    })
  })
})
