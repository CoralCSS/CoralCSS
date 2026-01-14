/**
 * Tests for Enhanced Light Mode Preset
 */
import { describe, it, expect } from 'vitest'
import { enhancedLightPreset, enhancedLightPresetConfig } from '../../../src/presets/enhanced-light'
import { createCoral } from '../../../src/kernel'

describe('Enhanced Light Mode Preset', () => {
  describe('enhancedLightPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = enhancedLightPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include enhanced-light-theme plugin', () => {
      const plugins = enhancedLightPreset()
      const themePlugin = plugins.find((p) => p.name === 'enhanced-light-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should include modern-css plugin', () => {
      const plugins = enhancedLightPreset()
      const modernPlugin = plugins.find((p) => p.name === 'modern-css')
      expect(modernPlugin).toBeDefined()
    })

    it('should include core plugins', () => {
      const plugins = enhancedLightPreset()
      const pluginNames = plugins.map((p) => p.name)
      expect(pluginNames).toContain('spacing')
      expect(pluginNames).toContain('colors')
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: enhancedLightPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with enhanced light utilities', () => {
      const coral = createCoral({
        plugins: enhancedLightPreset(),
      })
      const css = coral.generate(['p-4', 'flex', 'bg-blue-500'])
      expect(css.length).toBeGreaterThan(0)
    })

    it('should generate flexbox utilities', () => {
      const coral = createCoral({
        plugins: enhancedLightPreset(),
      })
      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
    })

    it('should generate spacing utilities', () => {
      const coral = createCoral({
        plugins: enhancedLightPreset(),
      })
      const css = coral.generate(['p-4', 'm-2', 'gap-4'])
      expect(css).toContain('padding')
    })
  })

  describe('enhancedLightPresetConfig', () => {
    it('should return config object', () => {
      const config = enhancedLightPresetConfig()
      expect(config).toBeDefined()
      expect(config.theme).toBeDefined()
    })

    it('should include colors in config', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors).toBeDefined()
      expect(config.theme.colors.primary).toBeDefined()
      expect(config.theme.colors.secondary).toBeDefined()
      expect(config.theme.colors.accent).toBeDefined()
    })

    it('should include primary color scale', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors['primary-50']).toBeDefined()
      expect(config.theme.colors['primary-100']).toBeDefined()
      expect(config.theme.colors['primary-500']).toBeDefined()
      expect(config.theme.colors['primary-900']).toBeDefined()
    })

    it('should include secondary color scale', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors['secondary-50']).toBeDefined()
      expect(config.theme.colors['secondary-500']).toBeDefined()
      expect(config.theme.colors['secondary-900']).toBeDefined()
    })

    it('should include accent color scale', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors['accent-50']).toBeDefined()
      expect(config.theme.colors['accent-500']).toBeDefined()
      expect(config.theme.colors['accent-900']).toBeDefined()
    })

    it('should include success, warning, error, info colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors.success).toBeDefined()
      expect(config.theme.colors.warning).toBeDefined()
      expect(config.theme.colors.error).toBeDefined()
      expect(config.theme.colors.info).toBeDefined()
    })

    it('should include background colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors.background).toBe('#ffffff')
      expect(config.theme.colors['background-alt']).toBeDefined()
      expect(config.theme.colors.surface).toBeDefined()
    })

    it('should include foreground colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors.foreground).toBeDefined()
      expect(config.theme.colors['foreground-muted']).toBeDefined()
      expect(config.theme.colors['foreground-faint']).toBeDefined()
    })

    it('should include border colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors.border).toBeDefined()
      expect(config.theme.colors['border-light']).toBeDefined()
      expect(config.theme.colors['border-muted']).toBeDefined()
    })

    it('should include glow colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors['glow-primary']).toBeDefined()
      expect(config.theme.colors['glow-secondary']).toBeDefined()
      expect(config.theme.colors['glow-accent']).toBeDefined()
    })

    it('should include gradient colors', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.colors['gradient-start']).toBeDefined()
      expect(config.theme.colors['gradient-end']).toBeDefined()
    })

    it('should include box shadows', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.boxShadow).toBeDefined()
      expect(config.theme.boxShadow['glow-sm']).toBeDefined()
      expect(config.theme.boxShadow['glow-md']).toBeDefined()
      expect(config.theme.boxShadow['glow-lg']).toBeDefined()
      expect(config.theme.boxShadow['card-elevated']).toBeDefined()
      expect(config.theme.boxShadow['card-floating']).toBeDefined()
    })

    it('should include border radius', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.borderRadius).toBeDefined()
      expect(config.theme.borderRadius.pill).toBe('9999px')
      expect(config.theme.borderRadius['card-sm']).toBeDefined()
      expect(config.theme.borderRadius['button-md']).toBeDefined()
    })

    it('should include spacing', () => {
      const config = enhancedLightPresetConfig()
      expect(config.theme.spacing).toBeDefined()
      expect(config.theme.spacing.xs).toBe('4px')
      expect(config.theme.spacing.sm).toBe('8px')
      expect(config.theme.spacing.md).toBe('12px')
    })
  })
})
