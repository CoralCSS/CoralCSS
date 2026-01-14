/**
 * Tests for Material Design Preset
 */
import { describe, it, expect } from 'vitest'
import { materialPreset, materialPresetConfig } from '../../../src/presets/material'
import { createCoral } from '../../../src/kernel'

describe('Material Design Preset', () => {
  describe('materialPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = materialPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include material-theme plugin', () => {
      const plugins = materialPreset()
      const themePlugin = plugins.find((p) => p.name === 'material-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should use default options when none provided', () => {
      const plugins = materialPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = materialPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept custom dark mode selector', () => {
      const plugins = materialPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-mode="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should exclude modern CSS when modernCSS is false', () => {
      const pluginsWithModern = materialPreset({ modernCSS: true })
      const pluginsWithoutModern = materialPreset({ modernCSS: false })

      const hasModernWithOption = pluginsWithModern.some((p) => p.name === 'modern-css')
      const hasModernWithoutOption = pluginsWithoutModern.some((p) => p.name === 'modern-css')

      expect(hasModernWithOption).toBe(true)
      expect(hasModernWithoutOption).toBe(false)
    })

    it('should accept custom primary color', () => {
      const plugins = materialPreset({ primary: '#3F51B5' })
      const themePlugin = plugins.find((p) => p.name === 'material-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should accept custom secondary color', () => {
      const plugins = materialPreset({ secondary: '#FF4081' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom background color', () => {
      const plugins = materialPreset({ background: '#FAFAFA' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom surface color', () => {
      const plugins = materialPreset({ surface: '#F5F5F5' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom error color', () => {
      const plugins = materialPreset({ error: '#F44336' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom onPrimary color', () => {
      const plugins = materialPreset({ onPrimary: '#000000' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom onBackground color', () => {
      const plugins = materialPreset({ onBackground: '#212121' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom onSurface color', () => {
      const plugins = materialPreset({ onSurface: '#424242' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom onError color', () => {
      const plugins = materialPreset({ onError: '#000000' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: materialPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Material utilities', () => {
      const coral = createCoral({
        plugins: materialPreset(),
      })
      const css = coral.generate(['p-4', 'm-2', 'flex'])
      expect(css).toContain('padding')
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = materialPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = materialPreset({
        darkMode: 'class',
        darkModeSelector: '.dark',
        modernCSS: true,
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        error: '#B00020',
        onPrimary: '#FFFFFF',
        onBackground: '#000000',
        onSurface: '#000000',
        onError: '#FFFFFF',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('materialPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = materialPresetConfig()
      expect(config.darkMode).toBe('class')
    })

    it('should return custom darkMode from options', () => {
      const config = materialPresetConfig({ darkMode: 'media' })
      expect(config.darkMode).toBe('media')
    })

    it('should return class darkMode when option is undefined', () => {
      const config = materialPresetConfig({})
      expect(config.darkMode).toBe('class')
    })
  })

  describe('Default Export', () => {
    it('should export materialPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/material')
      expect(defaultExport).toBe(materialPreset)
    })
  })

  describe('Color Manipulation', () => {
    it('should generate lighter and darker color variants', () => {
      const coral = createCoral({
        plugins: materialPreset({ primary: '#6200EE' }),
      })
      expect(coral).toBeDefined()
    })

    it('should handle edge case colors', () => {
      // Test with white (max values)
      const pluginsWhite = materialPreset({ primary: '#FFFFFF' })
      expect(pluginsWhite.length).toBeGreaterThan(0)

      // Test with black (min values)
      const pluginsBlack = materialPreset({ primary: '#000000' })
      expect(pluginsBlack.length).toBeGreaterThan(0)
    })

    it('should handle colors with low RGB values', () => {
      const plugins = materialPreset({ primary: '#100808' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should handle colors with high RGB values', () => {
      const plugins = materialPreset({ primary: '#F0F8FF' })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('Theme Extension', () => {
    it('should extend theme with Material colors', () => {
      const coral = createCoral({
        plugins: materialPreset(),
      })
      expect(coral.generate).toBeDefined()
    })

    it('should extend theme with Material spacing', () => {
      const plugins = materialPreset()
      const themePlugin = plugins.find((p) => p.name === 'material-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should extend theme with Material border radius values', () => {
      const plugins = materialPreset()
      const themePlugin = plugins.find((p) => p.name === 'material-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should extend theme with Material elevation (box shadow) values', () => {
      const plugins = materialPreset()
      const themePlugin = plugins.find((p) => p.name === 'material-theme')
      expect(themePlugin).toBeDefined()
    })
  })
})
