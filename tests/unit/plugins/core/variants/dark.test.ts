/**
 * Tests for Dark Mode Variants Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { darkModeVariantsPlugin } from '../../../../../src/plugins/core/variants/dark'
import { layoutPlugin } from '../../../../../src/plugins/core/utilities/layout'
import type { Coral } from '../../../../../src/types'

describe('Dark Mode Variants Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral()
      coral.use(darkModeVariantsPlugin())
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = darkModeVariantsPlugin()
      expect(plugin.name).toBe('dark-mode-variants')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Class Strategy (default)', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin())
    })

    it('should generate dark variant with .dark selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('.dark')
    })

    it('should generate light variant with .light selector', () => {
      const css = coral.generate(['light:block'])
      expect(css).toContain('.light')
    })
  })

  describe('Class Strategy with custom selector', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'class', selector: '[data-mode="dark"]' }))
    })

    it('should generate dark variant with custom selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('[data-mode="dark"]')
    })
  })

  describe('Media Strategy', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'media' }))
    })

    it('should generate dark variant with prefers-color-scheme media query', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-color-scheme: dark')
    })

    it('should generate light variant with prefers-color-scheme media query', () => {
      const css = coral.generate(['light:block'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-color-scheme: light')
    })
  })

  describe('Selector Strategy', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'selector' }))
    })

    it('should generate dark variant with selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('.dark')
    })

    it('should generate light variant with data-theme attribute', () => {
      const css = coral.generate(['light:block'])
      expect(css).toContain('[data-theme="light"]')
    })
  })

  describe('Selector Strategy with custom selector', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'selector', selector: '[data-theme="dark"]' }))
    })

    it('should generate dark variant with custom data-theme selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('[data-theme="dark"]')
    })
  })

  describe('Auto Strategy', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'auto' }))
    })

    it('should generate dark variant with class selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('.dark')
    })

    it('should generate dark-media variant with media query', () => {
      const css = coral.generate(['dark-media:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-color-scheme: dark')
    })

    it('should generate light variant with .light selector', () => {
      const css = coral.generate(['light:block'])
      expect(css).toContain('.light')
    })
  })

  describe('Auto Strategy with custom selector', () => {
    let coral: Coral

    beforeEach(() => {
      coral = createCoral()
      coral.use(layoutPlugin())
      coral.use(darkModeVariantsPlugin({ strategy: 'auto', selector: '.dark-mode' }))
    })

    it('should generate dark variant with custom class selector', () => {
      const css = coral.generate(['dark:hidden'])
      expect(css).toContain('.dark-mode')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/dark'
      )
      expect(defaultExport).toBe(darkModeVariantsPlugin)
    })
  })
})
