/**
 * Tests for Filters Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { filtersPlugin } from '../../../../../src/plugins/core/utilities/filters'
import type { Coral } from '../../../../../src/types'

describe('Filters Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(filtersPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = filtersPlugin()
      expect(plugin.name).toBe('filters')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Blur', () => {
    it('should generate blur (default)', () => {
      const css = coral.generate(['blur'])
      expect(css).toContain('--coral-blur')
      expect(css).toContain('blur(')
      expect(css).toContain('filter')
    })

    it('should generate blur-none', () => {
      const css = coral.generate(['blur-none'])
      expect(css).toContain('--coral-blur')
      expect(css).toContain('blur(0)')
    })

    it('should generate blur-sm', () => {
      const css = coral.generate(['blur-sm'])
      expect(css).toContain('--coral-blur')
      expect(css).toContain('filter')
    })

    it('should generate blur-md', () => {
      const css = coral.generate(['blur-md'])
      expect(css).toContain('--coral-blur')
    })

    it('should generate blur-lg', () => {
      const css = coral.generate(['blur-lg'])
      expect(css).toContain('--coral-blur')
    })

    it('should generate blur-xl', () => {
      const css = coral.generate(['blur-xl'])
      expect(css).toContain('--coral-blur')
    })

    it('should generate blur-2xl', () => {
      const css = coral.generate(['blur-2xl'])
      expect(css).toContain('--coral-blur')
    })

    it('should generate blur-3xl', () => {
      const css = coral.generate(['blur-3xl'])
      expect(css).toContain('--coral-blur')
    })

    it('should generate blur arbitrary value', () => {
      const css = coral.generate(['blur-[5px]'])
      expect(css).toContain('--coral-blur')
      expect(css).toContain('blur(5px)')
    })

    it('should generate blur arbitrary value with rem', () => {
      const css = coral.generate(['blur-[0.5rem]'])
      expect(css).toContain('--coral-blur')
      expect(css).toContain('blur(0.5rem)')
    })
  })

  describe('Brightness', () => {
    it('should generate brightness-0', () => {
      const css = coral.generate(['brightness-0'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(0)')
    })

    it('should generate brightness-50', () => {
      const css = coral.generate(['brightness-50'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(0.5)')
    })

    it('should generate brightness-75', () => {
      const css = coral.generate(['brightness-75'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(0.75)')
    })

    it('should generate brightness-90', () => {
      const css = coral.generate(['brightness-90'])
      expect(css).toContain('--coral-brightness')
    })

    it('should generate brightness-95', () => {
      const css = coral.generate(['brightness-95'])
      expect(css).toContain('--coral-brightness')
    })

    it('should generate brightness-100', () => {
      const css = coral.generate(['brightness-100'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(1)')
    })

    it('should generate brightness-105', () => {
      const css = coral.generate(['brightness-105'])
      expect(css).toContain('--coral-brightness')
    })

    it('should generate brightness-110', () => {
      const css = coral.generate(['brightness-110'])
      expect(css).toContain('--coral-brightness')
    })

    it('should generate brightness-125', () => {
      const css = coral.generate(['brightness-125'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(1.25)')
    })

    it('should generate brightness-150', () => {
      const css = coral.generate(['brightness-150'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(1.5)')
    })

    it('should generate brightness-200', () => {
      const css = coral.generate(['brightness-200'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(2)')
    })

    it('should generate brightness arbitrary value', () => {
      const css = coral.generate(['brightness-[1.75]'])
      expect(css).toContain('--coral-brightness')
      expect(css).toContain('brightness(1.75)')
    })
  })

  describe('Contrast', () => {
    it('should generate contrast-0', () => {
      const css = coral.generate(['contrast-0'])
      expect(css).toContain('--coral-contrast')
      expect(css).toContain('contrast(0)')
    })

    it('should generate contrast-50', () => {
      const css = coral.generate(['contrast-50'])
      expect(css).toContain('--coral-contrast')
      expect(css).toContain('contrast(0.5)')
    })

    it('should generate contrast-75', () => {
      const css = coral.generate(['contrast-75'])
      expect(css).toContain('--coral-contrast')
    })

    it('should generate contrast-100', () => {
      const css = coral.generate(['contrast-100'])
      expect(css).toContain('--coral-contrast')
      expect(css).toContain('contrast(1)')
    })

    it('should generate contrast-125', () => {
      const css = coral.generate(['contrast-125'])
      expect(css).toContain('--coral-contrast')
    })

    it('should generate contrast-150', () => {
      const css = coral.generate(['contrast-150'])
      expect(css).toContain('--coral-contrast')
    })

    it('should generate contrast-200', () => {
      const css = coral.generate(['contrast-200'])
      expect(css).toContain('--coral-contrast')
      expect(css).toContain('contrast(2)')
    })

    it('should generate contrast arbitrary value', () => {
      const css = coral.generate(['contrast-[0.8]'])
      expect(css).toContain('--coral-contrast')
      expect(css).toContain('contrast(0.8)')
    })
  })

  describe('Drop Shadow', () => {
    it('should generate drop-shadow (default)', () => {
      const css = coral.generate(['drop-shadow'])
      expect(css).toContain('--coral-drop-shadow')
      expect(css).toContain('drop-shadow')
    })

    it('should generate drop-shadow-sm', () => {
      const css = coral.generate(['drop-shadow-sm'])
      expect(css).toContain('--coral-drop-shadow')
    })

    it('should generate drop-shadow-md', () => {
      const css = coral.generate(['drop-shadow-md'])
      expect(css).toContain('--coral-drop-shadow')
    })

    it('should generate drop-shadow-lg', () => {
      const css = coral.generate(['drop-shadow-lg'])
      expect(css).toContain('--coral-drop-shadow')
    })

    it('should generate drop-shadow-xl', () => {
      const css = coral.generate(['drop-shadow-xl'])
      expect(css).toContain('--coral-drop-shadow')
    })

    it('should generate drop-shadow-2xl', () => {
      const css = coral.generate(['drop-shadow-2xl'])
      expect(css).toContain('--coral-drop-shadow')
    })

    it('should generate drop-shadow-none', () => {
      const css = coral.generate(['drop-shadow-none'])
      expect(css).toContain('--coral-drop-shadow')
    })
  })

  describe('Grayscale', () => {
    it('should generate grayscale', () => {
      const css = coral.generate(['grayscale'])
      expect(css).toContain('--coral-grayscale')
      expect(css).toContain('grayscale(100%)')
    })

    it('should generate grayscale-0', () => {
      const css = coral.generate(['grayscale-0'])
      expect(css).toContain('--coral-grayscale')
      expect(css).toContain('grayscale(0)')
    })
  })

  describe('Hue Rotate', () => {
    it('should generate hue-rotate-0', () => {
      const css = coral.generate(['hue-rotate-0'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(0deg)')
    })

    it('should generate hue-rotate-15', () => {
      const css = coral.generate(['hue-rotate-15'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(15deg)')
    })

    it('should generate hue-rotate-30', () => {
      const css = coral.generate(['hue-rotate-30'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(30deg)')
    })

    it('should generate hue-rotate-60', () => {
      const css = coral.generate(['hue-rotate-60'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(60deg)')
    })

    it('should generate hue-rotate-90', () => {
      const css = coral.generate(['hue-rotate-90'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(90deg)')
    })

    it('should generate hue-rotate-180', () => {
      const css = coral.generate(['hue-rotate-180'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(180deg)')
    })

    it('should generate hue-rotate arbitrary value', () => {
      const css = coral.generate(['hue-rotate-[45deg]'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(45deg)')
    })

    it('should generate hue-rotate arbitrary value with turn', () => {
      const css = coral.generate(['hue-rotate-[0.5turn]'])
      expect(css).toContain('--coral-hue-rotate')
      expect(css).toContain('hue-rotate(0.5turn)')
    })
  })

  describe('Invert', () => {
    it('should generate invert', () => {
      const css = coral.generate(['invert'])
      expect(css).toContain('--coral-invert')
      expect(css).toContain('invert(100%)')
    })

    it('should generate invert-0', () => {
      const css = coral.generate(['invert-0'])
      expect(css).toContain('--coral-invert')
      expect(css).toContain('invert(0)')
    })
  })

  describe('Saturate', () => {
    it('should generate saturate-0', () => {
      const css = coral.generate(['saturate-0'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(0)')
    })

    it('should generate saturate-50', () => {
      const css = coral.generate(['saturate-50'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(0.5)')
    })

    it('should generate saturate-100', () => {
      const css = coral.generate(['saturate-100'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(1)')
    })

    it('should generate saturate-150', () => {
      const css = coral.generate(['saturate-150'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(1.5)')
    })

    it('should generate saturate-200', () => {
      const css = coral.generate(['saturate-200'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(2)')
    })

    it('should generate saturate arbitrary value', () => {
      const css = coral.generate(['saturate-[2.5]'])
      expect(css).toContain('--coral-saturate')
      expect(css).toContain('saturate(2.5)')
    })
  })

  describe('Sepia', () => {
    it('should generate sepia', () => {
      const css = coral.generate(['sepia'])
      expect(css).toContain('--coral-sepia')
      expect(css).toContain('sepia(100%)')
    })

    it('should generate sepia-0', () => {
      const css = coral.generate(['sepia-0'])
      expect(css).toContain('--coral-sepia')
      expect(css).toContain('sepia(0)')
    })
  })

  describe('Filter None', () => {
    it('should generate filter-none', () => {
      const css = coral.generate(['filter-none'])
      expect(css).toContain('filter')
      expect(css).toContain('none')
    })
  })

  describe('Backdrop Blur', () => {
    it('should generate backdrop-blur (default)', () => {
      const css = coral.generate(['backdrop-blur'])
      expect(css).toContain('--coral-backdrop-blur')
      expect(css).toContain('backdrop-filter')
    })

    it('should generate backdrop-blur-none', () => {
      const css = coral.generate(['backdrop-blur-none'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-sm', () => {
      const css = coral.generate(['backdrop-blur-sm'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-md', () => {
      const css = coral.generate(['backdrop-blur-md'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-lg', () => {
      const css = coral.generate(['backdrop-blur-lg'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-xl', () => {
      const css = coral.generate(['backdrop-blur-xl'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-2xl', () => {
      const css = coral.generate(['backdrop-blur-2xl'])
      expect(css).toContain('--coral-backdrop-blur')
    })

    it('should generate backdrop-blur-3xl', () => {
      const css = coral.generate(['backdrop-blur-3xl'])
      expect(css).toContain('--coral-backdrop-blur')
    })
  })

  describe('Backdrop Brightness', () => {
    it('should generate backdrop-brightness-0', () => {
      const css = coral.generate(['backdrop-brightness-0'])
      expect(css).toContain('--coral-backdrop-brightness')
      expect(css).toContain('brightness(0)')
    })

    it('should generate backdrop-brightness-50', () => {
      const css = coral.generate(['backdrop-brightness-50'])
      expect(css).toContain('--coral-backdrop-brightness')
    })

    it('should generate backdrop-brightness-100', () => {
      const css = coral.generate(['backdrop-brightness-100'])
      expect(css).toContain('--coral-backdrop-brightness')
    })

    it('should generate backdrop-brightness-150', () => {
      const css = coral.generate(['backdrop-brightness-150'])
      expect(css).toContain('--coral-backdrop-brightness')
    })

    it('should generate backdrop-brightness-200', () => {
      const css = coral.generate(['backdrop-brightness-200'])
      expect(css).toContain('--coral-backdrop-brightness')
    })
  })

  describe('Backdrop Contrast', () => {
    it('should generate backdrop-contrast-0', () => {
      const css = coral.generate(['backdrop-contrast-0'])
      expect(css).toContain('--coral-backdrop-contrast')
    })

    it('should generate backdrop-contrast-50', () => {
      const css = coral.generate(['backdrop-contrast-50'])
      expect(css).toContain('--coral-backdrop-contrast')
    })

    it('should generate backdrop-contrast-100', () => {
      const css = coral.generate(['backdrop-contrast-100'])
      expect(css).toContain('--coral-backdrop-contrast')
    })

    it('should generate backdrop-contrast-200', () => {
      const css = coral.generate(['backdrop-contrast-200'])
      expect(css).toContain('--coral-backdrop-contrast')
    })
  })

  describe('Backdrop Grayscale', () => {
    it('should generate backdrop-grayscale', () => {
      const css = coral.generate(['backdrop-grayscale'])
      expect(css).toContain('--coral-backdrop-grayscale')
      expect(css).toContain('grayscale(100%)')
    })

    it('should generate backdrop-grayscale-0', () => {
      const css = coral.generate(['backdrop-grayscale-0'])
      expect(css).toContain('--coral-backdrop-grayscale')
      expect(css).toContain('grayscale(0)')
    })
  })

  describe('Backdrop Hue Rotate', () => {
    it('should generate backdrop-hue-rotate-0', () => {
      const css = coral.generate(['backdrop-hue-rotate-0'])
      expect(css).toContain('--coral-backdrop-hue-rotate')
    })

    it('should generate backdrop-hue-rotate-30', () => {
      const css = coral.generate(['backdrop-hue-rotate-30'])
      expect(css).toContain('--coral-backdrop-hue-rotate')
    })

    it('should generate backdrop-hue-rotate-60', () => {
      const css = coral.generate(['backdrop-hue-rotate-60'])
      expect(css).toContain('--coral-backdrop-hue-rotate')
    })

    it('should generate backdrop-hue-rotate-90', () => {
      const css = coral.generate(['backdrop-hue-rotate-90'])
      expect(css).toContain('--coral-backdrop-hue-rotate')
    })

    it('should generate backdrop-hue-rotate-180', () => {
      const css = coral.generate(['backdrop-hue-rotate-180'])
      expect(css).toContain('--coral-backdrop-hue-rotate')
    })
  })

  describe('Backdrop Invert', () => {
    it('should generate backdrop-invert', () => {
      const css = coral.generate(['backdrop-invert'])
      expect(css).toContain('--coral-backdrop-invert')
      expect(css).toContain('invert(100%)')
    })

    it('should generate backdrop-invert-0', () => {
      const css = coral.generate(['backdrop-invert-0'])
      expect(css).toContain('--coral-backdrop-invert')
      expect(css).toContain('invert(0)')
    })
  })

  describe('Backdrop Opacity', () => {
    it('should generate backdrop-opacity-0', () => {
      const css = coral.generate(['backdrop-opacity-0'])
      expect(css).toContain('--coral-backdrop-opacity')
      expect(css).toContain('opacity(0)')
    })

    it('should generate backdrop-opacity-50', () => {
      const css = coral.generate(['backdrop-opacity-50'])
      expect(css).toContain('--coral-backdrop-opacity')
      expect(css).toContain('opacity(0.5)')
    })

    it('should generate backdrop-opacity-100', () => {
      const css = coral.generate(['backdrop-opacity-100'])
      expect(css).toContain('--coral-backdrop-opacity')
      expect(css).toContain('opacity(1)')
    })

    it('should generate all backdrop-opacity values', () => {
      const values = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
      for (const value of values) {
        const css = coral.generate([`backdrop-opacity-${value}`])
        expect(css).toContain('--coral-backdrop-opacity')
      }
    })
  })

  describe('Backdrop Saturate', () => {
    it('should generate backdrop-saturate-0', () => {
      const css = coral.generate(['backdrop-saturate-0'])
      expect(css).toContain('--coral-backdrop-saturate')
    })

    it('should generate backdrop-saturate-50', () => {
      const css = coral.generate(['backdrop-saturate-50'])
      expect(css).toContain('--coral-backdrop-saturate')
    })

    it('should generate backdrop-saturate-100', () => {
      const css = coral.generate(['backdrop-saturate-100'])
      expect(css).toContain('--coral-backdrop-saturate')
    })

    it('should generate backdrop-saturate-150', () => {
      const css = coral.generate(['backdrop-saturate-150'])
      expect(css).toContain('--coral-backdrop-saturate')
    })

    it('should generate backdrop-saturate-200', () => {
      const css = coral.generate(['backdrop-saturate-200'])
      expect(css).toContain('--coral-backdrop-saturate')
    })
  })

  describe('Backdrop Sepia', () => {
    it('should generate backdrop-sepia', () => {
      const css = coral.generate(['backdrop-sepia'])
      expect(css).toContain('--coral-backdrop-sepia')
      expect(css).toContain('sepia(100%)')
    })

    it('should generate backdrop-sepia-0', () => {
      const css = coral.generate(['backdrop-sepia-0'])
      expect(css).toContain('--coral-backdrop-sepia')
      expect(css).toContain('sepia(0)')
    })
  })

  describe('Backdrop Filter None', () => {
    it('should generate backdrop-filter-none', () => {
      const css = coral.generate(['backdrop-filter-none'])
      expect(css).toContain('backdrop-filter')
      expect(css).toContain('none')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/filters'
      )
      expect(defaultExport).toBe(filtersPlugin)
    })
  })
})
