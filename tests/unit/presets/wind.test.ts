/**
 * Tests for Wind Preset
 */
import { describe, it, expect } from 'vitest'
import { windPreset } from '../../../src/presets/wind'
import { createCoral } from '../../../src/kernel'

describe('Wind Preset', () => {
  describe('windPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = windPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include core plugins', () => {
      const plugins = windPreset()
      const pluginNames = plugins.map((p) => p.name)
      expect(pluginNames).toContain('spacing')
      expect(pluginNames).toContain('colors')
      expect(pluginNames).toContain('typography')
    })

    it('should NOT include modern-css plugin by default', () => {
      const plugins = windPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeUndefined()
    })

    it('should use default options when none provided', () => {
      const plugins = windPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = windPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should use class as default dark mode strategy', () => {
      const plugins = windPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = windPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = windPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = windPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-mode="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept prefix option', () => {
      const plugins = windPreset({ prefix: 'tw-' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Tailwind-compatible utilities', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate flexbox utilities', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
    })

    it('should generate grid utilities', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['grid', 'grid-cols-3'])
      expect(css).toContain('display: grid')
    })

    it('should generate spacing utilities', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['p-4', 'm-2', 'gap-4'])
      expect(css).toContain('padding')
      expect(css).toContain('margin')
    })

    it('should generate responsive variants', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['md:flex', 'lg:grid'])
      expect(css).toContain('@media')
    })

    it('should generate hover variants', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['hover:bg-blue-600'])
      expect(css).toContain(':hover')
    })

    it('should generate dark mode variants', () => {
      const coral = createCoral({
        plugins: windPreset(),
      })
      const css = coral.generate(['dark:bg-gray-900'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = windPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = windPreset({
        darkMode: 'class',
        darkModeSelector: '.dark',
        prefix: 'wind-',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('Default Export', () => {
    it('should export windPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/wind')
      expect(defaultExport).toBe(windPreset)
    })
  })
})
