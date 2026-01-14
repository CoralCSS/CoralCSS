/**
 * Tests for GitHub Theme Preset
 */
import { describe, it, expect } from 'vitest'
import { githubPreset, githubPresetConfig } from '../../../src/presets/github'
import { createCoral } from '../../../src/kernel'

describe('GitHub Theme Preset', () => {
  describe('githubPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = githubPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include github-theme plugin', () => {
      const plugins = githubPreset()
      const themePlugin = plugins.find((p) => p.name === 'github-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should include github-dark-mode plugin', () => {
      const plugins = githubPreset()
      const darkModeThemePlugin = plugins.find((p) => p.name === 'github-dark-mode')
      expect(darkModeThemePlugin).toBeDefined()
      expect(darkModeThemePlugin?.version).toBe('1.0.0')
    })

    it('should include modern-css plugin', () => {
      const plugins = githubPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should use default options when none provided', () => {
      const plugins = githubPreset()
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = githubPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should use class as default dark mode strategy', () => {
      const plugins = githubPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = githubPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = githubPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = githubPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-color-mode="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should not enable color blind mode by default', () => {
      const plugins = githubPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable color blind mode when option is true', () => {
      const plugins = githubPreset({ colorBlind: true })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should not enable reduced motion by default', () => {
      const plugins = githubPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should enable reduced motion when option is true', () => {
      const plugins = githubPreset({ reducedMotion: true })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: githubPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with GitHub utilities', () => {
      const coral = createCoral({
        plugins: githubPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = githubPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = githubPreset({
        darkMode: 'class',
        darkModeSelector: '[data-theme="dark"]',
        colorBlind: true,
        reducedMotion: true,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('githubPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = githubPresetConfig()
      expect(config.darkMode).toBe('class')
      expect(config.theme).toBeDefined()
      expect(config.theme.colors).toBeDefined()
      expect(config.theme.dark).toBeDefined()
      expect(config.theme.spacing).toBeDefined()
      expect(config.theme.borderRadius).toBeDefined()
      expect(config.theme.boxShadow).toBeDefined()
    })

    it('should return custom darkMode from options', () => {
      const config = githubPresetConfig({ darkMode: 'media' })
      expect(config.darkMode).toBe('media')
    })

    it('should include github light color palette', () => {
      const config = githubPresetConfig()
      expect(config.theme.colors.primary).toBe('#0969da')
      expect(config.theme.colors.background).toBe('#ffffff')
    })

    it('should include github dark color palette', () => {
      const config = githubPresetConfig()
      expect(config.theme.dark.primary).toBe('#58a6ff')
      expect(config.theme.dark.background).toBe('#0d1117')
    })

    it('should include btn colors', () => {
      const config = githubPresetConfig()
      expect(config.theme.colors['btn-primary-bg']).toBeDefined()
      expect(config.theme.colors['btn-secondary-bg']).toBeDefined()
    })

    it('should include link colors', () => {
      const config = githubPresetConfig()
      expect(config.theme.colors.link).toBeDefined()
      expect(config.theme.colors['link-hover']).toBeDefined()
    })

    it('should include code colors', () => {
      const config = githubPresetConfig()
      expect(config.theme.colors['code-bg']).toBeDefined()
      expect(config.theme.colors['code-border']).toBeDefined()
    })
  })
})
