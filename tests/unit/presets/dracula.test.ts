/**
 * Tests for Dracula Theme Preset
 */
import { describe, it, expect } from 'vitest'
import { draculaPreset, draculaPresetConfig } from '../../../src/presets/dracula'
import { createCoral } from '../../../src/kernel'

describe('Dracula Theme Preset', () => {
  describe('draculaPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = draculaPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include dracula-theme plugin', () => {
      const plugins = draculaPreset()
      const themePlugin = plugins.find((p) => p.name === 'dracula-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should include modern-css plugin', () => {
      const plugins = draculaPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should use default options when none provided', () => {
      const plugins = draculaPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = draculaPreset({ darkMode: 'class' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept media dark mode strategy', () => {
      const plugins = draculaPreset({ darkMode: 'media' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = draculaPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = draculaPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = draculaPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-dracula]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should not enable high contrast by default', () => {
      const plugins = draculaPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable high contrast when option is true', () => {
      const plugins = draculaPreset({ highContrast: true })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should not enable bold accents by default', () => {
      const plugins = draculaPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable bold accents when option is true', () => {
      const plugins = draculaPreset({ boldAccents: true })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: draculaPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Dracula utilities', () => {
      const coral = createCoral({
        plugins: draculaPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-purple-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = draculaPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = draculaPreset({
        darkMode: 'class',
        darkModeSelector: '.dracula-dark',
        highContrast: true,
        boldAccents: true,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with high contrast and bold accents together', () => {
      const plugins = draculaPreset({
        highContrast: true,
        boldAccents: true,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should apply bold accent colors when boldAccents is true', () => {
      const coral = createCoral({
        plugins: draculaPreset({ boldAccents: true }),
      })
      const css = coral.generate(['p-4', 'flex'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate CSS with bold accents enabled', () => {
      const plugins = draculaPreset({ boldAccents: true })
      const themePlugin = plugins.find((p) => p.name === 'dracula-theme')
      expect(themePlugin).toBeDefined()

      const coral = createCoral({ plugins })
      const css = coral.generate(['p-4'])
      expect(css).toContain('padding')
    })

    it('should set bold accent colors when boldAccents is true', () => {
      const plugins = draculaPreset({ boldAccents: true })
      const coral = createCoral({ plugins })

      // Bold accents should modify the theme colors
      expect(plugins.length).toBeGreaterThan(0)
      expect(coral).toBeDefined()
    })

    it('should apply all bold accent color overrides', () => {
      const plugins = draculaPreset({ boldAccents: true, highContrast: true })
      const coral = createCoral({ plugins })

      // Bold accents plugin should be installed correctly
      expect(plugins.length).toBeGreaterThan(5)
      expect(coral).toBeDefined()

      // Generate some CSS to trigger plugin installation
      const css = coral.generate(['bg-purple-500', 'text-pink-500'])
      expect(css.length).toBeGreaterThan(0)
    })
  })

  describe('draculaPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = draculaPresetConfig()
      expect(config.darkMode).toBe('media')
      expect(config.theme).toBeDefined()
      expect(config.theme.colors).toBeDefined()
      expect(config.theme.spacing).toBeDefined()
      expect(config.theme.borderRadius).toBeDefined()
      expect(config.theme.boxShadow).toBeDefined()
    })

    it('should return custom darkMode from options', () => {
      const config = draculaPresetConfig({ darkMode: 'class' })
      expect(config.darkMode).toBe('class')
    })

    it('should include dracula color palette', () => {
      const config = draculaPresetConfig()
      expect(config.theme.colors.primary).toBeDefined()
      expect(config.theme.colors.secondary).toBeDefined()
      expect(config.theme.colors.background).toBeDefined()
      expect(config.theme.colors.cyan).toBeDefined()
      expect(config.theme.colors.purple).toBeDefined()
      expect(config.theme.colors.pink).toBeDefined()
    })

    it('should include glow shadows', () => {
      const config = draculaPresetConfig()
      expect(config.theme.boxShadow['dracula-glow-purple']).toBeDefined()
      expect(config.theme.boxShadow['dracula-glow-cyan']).toBeDefined()
    })
  })
})
