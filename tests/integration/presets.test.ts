/**
 * Presets Integration Tests
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../src/kernel'
import { coralPreset, coralPresetConfig } from '../../src/presets/coral'
import { windPreset } from '../../src/presets/wind'
import { miniPreset } from '../../src/presets/mini'
import { fullPreset } from '../../src/presets/full'

describe('Presets Integration', () => {
  describe('coralPreset', () => {
    it('should register all plugins', () => {
      const coral = createCoral()
      const plugins = coralPreset()

      plugins.forEach((plugin) => coral.use(plugin))

      expect(coral.pluginCount).toBeGreaterThan(0)
    })

    it('should generate spacing utilities', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['p-4', 'm-4', 'gap-4'])
      expect(css).toContain('padding')
      expect(css).toContain('margin')
      expect(css).toContain('gap')
    })

    it('should generate color utilities', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['bg-coral-500', 'text-white'])
      expect(css).toContain('background-color')
      expect(css).toContain('color')
    })

    it('should generate layout utilities', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['flex', 'grid', 'hidden'])
      expect(css).toContain('display: flex')
      expect(css).toContain('display: grid')
      expect(css).toContain('display: none')
    })

    it('should support responsive variants', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['md:flex', 'lg:hidden'])
      expect(css).toContain('@media')
    })

    it('should support dark mode', () => {
      const coral = createCoral()
      coralPreset({ darkMode: 'class' }).forEach((p) => coral.use(p))

      const css = coral.generate(['dark:bg-slate-900'])
      expect(css).toContain('.dark')
    })

    it('should work without modern CSS features', () => {
      const coral = createCoral()
      const plugins = coralPreset({ modernCSS: false })
      plugins.forEach((p) => coral.use(p))

      // Should still generate basic utilities
      const css = coral.generate(['flex', 'p-4'])
      expect(css).toContain('display: flex')
      expect(css).toContain('padding')

      // Should have fewer plugins without modern CSS
      const withModern = coralPreset({ modernCSS: true })
      expect(plugins.length).toBeLessThan(withModern.length)
    })

    it('should support custom dark mode selector', () => {
      const coral = createCoral()
      coralPreset({ darkMode: 'selector', darkModeSelector: '[data-theme="dark"]' }).forEach((p) => coral.use(p))

      const css = coral.generate(['dark:bg-slate-900'])
      expect(css).toBeDefined()
    })
  })

  describe('coralPresetConfig', () => {
    it('should return default config with empty options', () => {
      const config = coralPresetConfig()
      expect(config.prefix).toBe('')
      expect(config.darkMode).toBe('class')
    })

    it('should return config with custom prefix', () => {
      const config = coralPresetConfig({ prefix: 'tw-' })
      expect(config.prefix).toBe('tw-')
    })

    it('should return config with custom dark mode', () => {
      const config = coralPresetConfig({ darkMode: 'media' })
      expect(config.darkMode).toBe('media')
    })

    it('should return config with all options', () => {
      const config = coralPresetConfig({
        prefix: 'coral-',
        darkMode: 'selector'
      })
      expect(config.prefix).toBe('coral-')
      expect(config.darkMode).toBe('selector')
    })
  })

  describe('windPreset', () => {
    it('should be Tailwind-compatible', () => {
      const coral = createCoral()
      windPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['flex', 'items-center', 'justify-between'])
      expect(css).toContain('display: flex')
      expect(css).toContain('align-items: center')
      expect(css).toContain('justify-content: space-between')
    })
  })

  describe('miniPreset', () => {
    it('should include minimal utilities', () => {
      const coral = createCoral()
      miniPreset().forEach((p) => coral.use(p))

      const css = coral.generate(['flex', 'p-4'])
      expect(css).toContain('display: flex')
      expect(css).toContain('padding')
    })
  })

  describe('fullPreset', () => {
    it('should include all utilities', () => {
      const coral = createCoral()
      fullPreset().forEach((p) => coral.use(p))

      const css = coral.generate([
        'flex',
        'grid',
        'p-4',
        'bg-coral-500',
        'text-white',
        'rounded-lg',
        'shadow-lg',
      ])

      expect(css).toContain('display: flex')
      expect(css).toContain('display: grid')
      expect(css).toContain('padding')
      expect(css).toContain('background-color')
      expect(css).toContain('color')
      expect(css).toContain('border-radius')
      expect(css).toContain('box-shadow')
    })
  })

  describe('real-world usage', () => {
    it('should generate card component styles', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const classes = [
        'bg-white',
        'rounded-xl',
        'shadow-lg',
        'p-6',
        'hover:shadow-xl',
        'transition',
      ]

      const css = coral.generate(classes)

      expect(css).toContain('background-color')
      expect(css).toContain('border-radius')
      expect(css).toContain('box-shadow')
      expect(css).toContain('padding')
      expect(css).toContain(':hover')
      expect(css).toContain('transition')
    })

    it('should generate button styles', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const classes = [
        'bg-coral-500',
        'text-white',
        'px-4',
        'py-2',
        'rounded-lg',
        'hover:bg-coral-600',
        'focus:ring-2',
        'focus:ring-coral-500',
      ]

      const css = coral.generate(classes)

      expect(css).toContain('background-color')
      expect(css).toContain('color')
      expect(css).toContain('padding')
      expect(css).toContain('border-radius')
      expect(css).toContain(':hover')
      expect(css).toContain(':focus')
    })

    it('should generate responsive grid', () => {
      const coral = createCoral()
      coralPreset().forEach((p) => coral.use(p))

      const classes = [
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
        'gap-4',
      ]

      const css = coral.generate(classes)

      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('gap')
      expect(css).toContain('@media')
    })
  })
})
