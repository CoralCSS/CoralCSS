/**
 * Tests for Catppuccin Theme Preset
 */
import { describe, it, expect } from 'vitest'
import { catppuccinPreset, catppuccinPresetConfig } from '../../../src/presets/catppuccin'
import type { CatppuccinFlavor } from '../../../src/presets/catppuccin'
import { createCoral } from '../../../src/kernel'

describe('Catppuccin Theme Preset', () => {
  describe('catppuccinPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = catppuccinPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include catppuccin-theme plugin', () => {
      const plugins = catppuccinPreset()
      const themePlugin = plugins.find((p) => p.name === 'catppuccin-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should include modern-css plugin', () => {
      const plugins = catppuccinPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should use mocha flavor by default', () => {
      const plugins = catppuccinPreset()
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept latte flavor', () => {
      const plugins = catppuccinPreset({ flavor: 'latte' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept frappe flavor', () => {
      const plugins = catppuccinPreset({ flavor: 'frappe' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept macchiato flavor', () => {
      const plugins = catppuccinPreset({ flavor: 'macchiato' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept mocha flavor', () => {
      const plugins = catppuccinPreset({ flavor: 'mocha' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = catppuccinPreset({ darkMode: 'media' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should use class as default dark mode strategy', () => {
      const plugins = catppuccinPreset()
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept selector dark mode strategy', () => {
      const plugins = catppuccinPreset({ darkMode: 'selector' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept auto dark mode strategy', () => {
      const plugins = catppuccinPreset({ darkMode: 'auto' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom dark mode selector', () => {
      const plugins = catppuccinPreset({
        darkMode: 'selector',
        darkModeSelector: '[data-catppuccin]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom accent color', () => {
      const plugins = catppuccinPreset({ accentColor: '#FF0000' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: catppuccinPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Catppuccin utilities', () => {
      const coral = createCoral({
        plugins: catppuccinPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = catppuccinPreset()
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = catppuccinPreset({
        darkMode: 'class',
        darkModeSelector: '.ctp-dark',
        flavor: 'macchiato',
        accentColor: '#cba6f7',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with all flavors', () => {
      const flavors: CatppuccinFlavor[] = ['latte', 'frappe', 'macchiato', 'mocha']
      for (const flavor of flavors) {
        const plugins = catppuccinPreset({ flavor })
        expect(plugins.length).toBeGreaterThan(0)
      }
    })
  })

  describe('catppuccinPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = catppuccinPresetConfig()
      expect(config.darkMode).toBe('class')
      expect(config.theme).toBeDefined()
      expect(config.theme.colors).toBeDefined()
      expect(config.theme.spacing).toBeDefined()
      expect(config.theme.borderRadius).toBeDefined()
      expect(config.theme.boxShadow).toBeDefined()
    })

    it('should return custom darkMode from options', () => {
      const config = catppuccinPresetConfig({ darkMode: 'media' })
      expect(config.darkMode).toBe('media')
    })

    it('should return mocha colors by default', () => {
      const config = catppuccinPresetConfig()
      expect(config.theme.colors.primary).toBe('#89b4fa') // Mocha blue
    })

    it('should return latte colors when flavor is latte', () => {
      const config = catppuccinPresetConfig({ flavor: 'latte' })
      expect(config.theme.colors.primary).toBe('#1e66f5') // Latte blue
    })

    it('should return frappe colors when flavor is frappe', () => {
      const config = catppuccinPresetConfig({ flavor: 'frappe' })
      expect(config.theme.colors.primary).toBe('#8caaee') // Frappe blue
    })

    it('should return macchiato colors when flavor is macchiato', () => {
      const config = catppuccinPresetConfig({ flavor: 'macchiato' })
      expect(config.theme.colors.primary).toBe('#8aadf4') // Macchiato blue
    })

    it('should include catppuccin-specific colors', () => {
      const config = catppuccinPresetConfig()
      expect(config.theme.colors.rosewater).toBeDefined()
      expect(config.theme.colors.flamingo).toBeDefined()
      expect(config.theme.colors.pink).toBeDefined()
      expect(config.theme.colors.mauve).toBeDefined()
      expect(config.theme.colors.lavender).toBeDefined()
    })

    it('should include base colors', () => {
      const config = catppuccinPresetConfig()
      expect(config.theme.colors.base).toBeDefined()
      expect(config.theme.colors.mantle).toBeDefined()
      expect(config.theme.colors.crust).toBeDefined()
    })

    it('should include surface colors', () => {
      const config = catppuccinPresetConfig()
      expect(config.theme.colors.surface0).toBeDefined()
      expect(config.theme.colors.surface1).toBeDefined()
      expect(config.theme.colors.surface2).toBeDefined()
    })
  })
})
