/**
 * Tests for Nord Theme Preset
 */
import { describe, it, expect } from 'vitest'
import { nordPreset, nordPresetConfig } from '../../../src/presets/nord'
import { createCoral } from '../../../src/kernel'

describe('Nord Theme Preset', () => {
  describe('nordPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = nordPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include nord-theme plugin', () => {
      const plugins = nordPreset()
      const themePlugin = plugins.find((p) => p.name === 'nord-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should include modern-css plugin', () => {
      const plugins = nordPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should use default options when none provided', () => {
      const plugins = nordPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = nordPreset({ darkMode: 'class' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept media dark mode strategy', () => {
      const plugins = nordPreset({ darkMode: 'media' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = nordPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = nordPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = nordPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-nord-dark]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable polar night by default', () => {
      const plugins = nordPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should disable polar night when option is false', () => {
      const plugins = nordPreset({ polarNight: false })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable frost by default', () => {
      const plugins = nordPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should disable frost when option is false', () => {
      const plugins = nordPreset({ frost: false })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable aurora by default', () => {
      const plugins = nordPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should disable aurora when option is false', () => {
      const plugins = nordPreset({ aurora: false })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: nordPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Nord utilities', () => {
      const coral = createCoral({
        plugins: nordPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = nordPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = nordPreset({
        darkMode: 'class',
        darkModeSelector: '.nord-dark',
        polarNight: true,
        frost: true,
        aurora: true,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with all features disabled', () => {
      const plugins = nordPreset({
        polarNight: false,
        frost: false,
        aurora: false,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('nordPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = nordPresetConfig()
      expect(config.darkMode).toBe('media')
      expect(config.theme).toBeDefined()
      expect(config.theme.colors).toBeDefined()
      expect(config.theme.spacing).toBeDefined()
      expect(config.theme.borderRadius).toBeDefined()
      expect(config.theme.boxShadow).toBeDefined()
    })

    it('should return custom darkMode from options', () => {
      const config = nordPresetConfig({ darkMode: 'class' })
      expect(config.darkMode).toBe('class')
    })

    it('should include nord color palette', () => {
      const config = nordPresetConfig()
      expect(config.theme.colors.primary).toBeDefined()
      expect(config.theme.colors.secondary).toBeDefined()
      expect(config.theme.colors.background).toBeDefined()
    })
  })
})
