/**
 * Tests for Coral Preset
 */
import { describe, it, expect } from 'vitest'
import { coralPreset, coralPresetConfig } from '../../../src/presets/coral'
import { createCoral } from '../../../src/kernel'

describe('Coral Preset', () => {
  describe('coralPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = coralPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include core plugins', () => {
      const plugins = coralPreset()
      const pluginNames = plugins.map((p) => p.name)
      expect(pluginNames).toContain('spacing')
      expect(pluginNames).toContain('colors')
      expect(pluginNames).toContain('typography')
    })

    it('should include modern-css plugin by default', () => {
      const plugins = coralPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should exclude modern-css plugin when modernCSS is false', () => {
      const plugins = coralPreset({ modernCSS: false })
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeUndefined()
    })

    it('should use default options when none provided', () => {
      const plugins = coralPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = coralPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should use class as default dark mode strategy', () => {
      const plugins = coralPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = coralPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = coralPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = coralPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-theme="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept prefix option', () => {
      const plugins = coralPreset({ prefix: 'coral-' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: coralPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with coral utilities', () => {
      const coral = createCoral({
        plugins: coralPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate flexbox utilities', () => {
      const coral = createCoral({
        plugins: coralPreset(),
      })
      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
    })

    it('should generate grid utilities', () => {
      const coral = createCoral({
        plugins: coralPreset(),
      })
      const css = coral.generate(['grid', 'grid-cols-3'])
      expect(css).toContain('display: grid')
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = coralPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = coralPreset({
        darkMode: 'class',
        darkModeSelector: '.dark',
        modernCSS: true,
        prefix: 'c-',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('coralPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = coralPresetConfig()
      expect(config.prefix).toBe('')
      expect(config.darkMode).toBe('class')
    })

    it('should return custom prefix from options', () => {
      const config = coralPresetConfig({ prefix: 'coral-' })
      expect(config.prefix).toBe('coral-')
    })

    it('should return custom darkMode from options', () => {
      const config = coralPresetConfig({ darkMode: 'media' })
      expect(config.darkMode).toBe('media')
    })

    it('should use class darkMode when option is undefined', () => {
      const config = coralPresetConfig({})
      expect(config.darkMode).toBe('class')
    })

    it('should use empty prefix when option is undefined', () => {
      const config = coralPresetConfig({})
      expect(config.prefix).toBe('')
    })
  })

  describe('Default Export', () => {
    it('should export coralPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/coral')
      expect(defaultExport).toBe(coralPreset)
    })
  })
})
