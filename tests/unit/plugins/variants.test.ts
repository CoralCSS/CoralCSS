/**
 * Variant Plugins Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { spacingPlugin } from '../../../src/plugins/core/utilities/spacing'
import { colorsPlugin } from '../../../src/plugins/core/utilities/colors'
import { layoutPlugin } from '../../../src/plugins/core/utilities/layout'
import { pseudoVariantsPlugin } from '../../../src/plugins/core/variants/pseudo'
import { responsiveVariantsPlugin } from '../../../src/plugins/core/variants/responsive'
import { darkModeVariantsPlugin } from '../../../src/plugins/core/variants/dark'

describe('variant plugins', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(spacingPlugin())
    coral.use(colorsPlugin())
    coral.use(layoutPlugin())
    coral.use(pseudoVariantsPlugin())
    coral.use(responsiveVariantsPlugin())
    coral.use(darkModeVariantsPlugin())
  })

  describe('pseudo variants', () => {
    it('should generate hover variant', () => {
      const css = coral.generate(['hover:bg-coral-500'])
      expect(css).toContain(':hover')
      expect(css).toContain('background-color')
    })

    it('should generate focus variant', () => {
      const css = coral.generate(['focus:bg-coral-500'])
      expect(css).toContain(':focus')
    })

    it('should generate active variant', () => {
      const css = coral.generate(['active:bg-coral-500'])
      expect(css).toContain(':active')
    })

    it('should generate disabled variant', () => {
      const css = coral.generate(['disabled:opacity-50'])
      expect(css).toContain(':disabled')
    })

    it('should generate first variant', () => {
      const css = coral.generate(['first:pt-0'])
      expect(css).toContain(':first-child')
    })

    it('should generate last variant', () => {
      const css = coral.generate(['last:pb-0'])
      expect(css).toContain(':last-child')
    })

    it('should generate odd variant', () => {
      const css = coral.generate(['odd:bg-slate-100'])
      expect(css).toContain(':nth-child(odd)')
    })

    it('should generate even variant', () => {
      const css = coral.generate(['even:bg-slate-100'])
      expect(css).toContain(':nth-child(even)')
    })

    it('should generate group-hover variant', () => {
      const css = coral.generate(['group-hover:text-white'])
      expect(css).toContain('.group:hover')
    })

    it('should generate peer-focus variant', () => {
      const css = coral.generate(['peer-focus:text-coral-500'])
      expect(css).toContain('.peer:focus')
    })
  })

  describe('responsive variants', () => {
    it('should generate sm variant', () => {
      const css = coral.generate(['sm:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('640px')
    })

    it('should generate md variant', () => {
      const css = coral.generate(['md:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('768px')
    })

    it('should generate lg variant', () => {
      const css = coral.generate(['lg:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('1024px')
    })

    it('should generate xl variant', () => {
      const css = coral.generate(['xl:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('1280px')
    })

    it('should generate 2xl variant', () => {
      const css = coral.generate(['2xl:flex'])
      expect(css).toContain('@media')
      expect(css).toContain('1536px')
    })
  })

  describe('dark mode variant', () => {
    it('should generate dark variant with class strategy', () => {
      const css = coral.generate(['dark:bg-slate-900'])
      expect(css).toContain('.dark')
      expect(css).toContain('background-color')
    })
  })

  describe('combined variants', () => {
    it('should handle hover with responsive', () => {
      const css = coral.generate(['md:hover:bg-coral-500'])
      expect(css).toContain('@media')
      expect(css).toContain(':hover')
    })

    it('should handle dark with hover', () => {
      const css = coral.generate(['dark:hover:bg-coral-500'])
      expect(css).toContain('.dark')
      expect(css).toContain(':hover')
    })
  })
})
