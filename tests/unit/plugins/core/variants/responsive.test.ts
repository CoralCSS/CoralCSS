/**
 * Tests for Responsive Variants Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { responsiveVariantsPlugin } from '../../../../../src/plugins/core/variants/responsive'
import { layoutPlugin } from '../../../../../src/plugins/core/utilities/layout'
import type { Coral } from '../../../../../src/types'

describe('Responsive Variants Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(responsiveVariantsPlugin())
    coral.use(layoutPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = responsiveVariantsPlugin()
      expect(plugin.name).toBe('responsive-variants')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Breakpoint Variants', () => {
    it('should generate sm variant', () => {
      const css = coral.generate(['sm:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
    })

    it('should generate md variant', () => {
      const css = coral.generate(['md:block'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
    })

    it('should generate lg variant', () => {
      const css = coral.generate(['lg:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
    })

    it('should generate xl variant', () => {
      const css = coral.generate(['xl:grid'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
    })

    it('should generate 2xl variant', () => {
      const css = coral.generate(['2xl:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
    })
  })

  describe('Max-width Variants', () => {
    it('should generate max-sm variant', () => {
      const css = coral.generate(['max-sm:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('max-width')
    })

    it('should generate max-md variant', () => {
      const css = coral.generate(['max-md:block'])
      expect(css).toContain('@media')
      expect(css).toContain('max-width')
    })

    it('should generate max-lg variant', () => {
      const css = coral.generate(['max-lg:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('max-width')
    })

    it('should generate max-xl variant', () => {
      const css = coral.generate(['max-xl:grid'])
      expect(css).toContain('@media')
      expect(css).toContain('max-width')
    })
  })

  describe('Only Variants (specific breakpoint range)', () => {
    it('should generate sm-only variant', () => {
      const css = coral.generate(['sm-only:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
      expect(css).toContain('max-width')
    })

    it('should generate md-only variant', () => {
      const css = coral.generate(['md-only:block'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
      expect(css).toContain('max-width')
    })

    it('should generate lg-only variant', () => {
      const css = coral.generate(['lg-only:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
      expect(css).toContain('max-width')
    })

    it('should generate xl-only variant', () => {
      const css = coral.generate(['xl-only:grid'])
      expect(css).toContain('@media')
      expect(css).toContain('min-width')
      expect(css).toContain('max-width')
    })
  })

  describe('Orientation Variants', () => {
    it('should generate portrait variant', () => {
      const css = coral.generate(['portrait:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('orientation: portrait')
    })

    it('should generate landscape variant', () => {
      const css = coral.generate(['landscape:block'])
      expect(css).toContain('@media')
      expect(css).toContain('orientation: landscape')
    })
  })

  describe('Print Variant', () => {
    it('should generate print variant', () => {
      const css = coral.generate(['print:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('print')
    })

    it('should generate print variant for block', () => {
      const css = coral.generate(['print:block'])
      expect(css).toContain('@media print')
    })
  })

  describe('Motion Variants', () => {
    it('should generate motion-safe variant', () => {
      const css = coral.generate(['motion-safe:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-reduced-motion: no-preference')
    })

    it('should generate motion-reduce variant', () => {
      const css = coral.generate(['motion-reduce:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-reduced-motion: reduce')
    })
  })

  describe('Contrast Variants', () => {
    it('should generate contrast-more variant', () => {
      const css = coral.generate(['contrast-more:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-contrast: more')
    })

    it('should generate contrast-less variant', () => {
      const css = coral.generate(['contrast-less:hidden'])
      expect(css).toContain('@media')
      expect(css).toContain('prefers-contrast: less')
    })
  })

  describe('Combined Responsive Variants', () => {
    it('should combine breakpoint with hover', () => {
      const css = coral.generate(['sm:hover:hidden'])
      expect(css).toBeDefined()
    })

    it('should combine multiple breakpoints', () => {
      const css = coral.generate(['sm:hidden', 'md:block', 'lg:flex'])
      expect(css).toBeDefined()
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/responsive'
      )
      expect(defaultExport).toBe(responsiveVariantsPlugin)
    })
  })
})
