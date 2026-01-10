/**
 * Tests for Effects Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { effectsPlugin } from '../../../../../src/plugins/core/utilities/effects'
import type { Coral } from '../../../../../src/types'

describe('Effects Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(effectsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = effectsPlugin()
      expect(plugin.name).toBe('effects')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Box Shadow', () => {
    it('should generate shadow (default)', () => {
      const css = coral.generate(['shadow'])
      expect(css).toContain('--coral-shadow')
      expect(css).toContain('box-shadow')
    })

    it('should generate shadow-sm', () => {
      const css = coral.generate(['shadow-sm'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-md', () => {
      const css = coral.generate(['shadow-md'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-lg', () => {
      const css = coral.generate(['shadow-lg'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-xl', () => {
      const css = coral.generate(['shadow-xl'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-2xl', () => {
      const css = coral.generate(['shadow-2xl'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-none', () => {
      const css = coral.generate(['shadow-none'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow-inner', () => {
      const css = coral.generate(['shadow-inner'])
      expect(css).toContain('--coral-shadow')
    })

    it('should generate shadow arbitrary value', () => {
      const css = coral.generate(['shadow-[0_0_10px_rgba(0,0,0,0.5)]'])
      expect(css).toContain('--coral-shadow')
    })
  })

  describe('Mix Blend Mode', () => {
    const blendModes = [
      'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
      'exclusion', 'hue', 'saturation', 'color', 'luminosity',
      'plus-darker', 'plus-lighter'
    ]

    for (const mode of blendModes) {
      it(`should generate mix-blend-${mode}`, () => {
        const css = coral.generate([`mix-blend-${mode}`])
        expect(css).toContain('mix-blend-mode')
      })
    }
  })

  describe('Background Blend Mode', () => {
    const bgBlendModes = [
      'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
      'exclusion', 'hue', 'saturation', 'color', 'luminosity'
    ]

    for (const mode of bgBlendModes) {
      it(`should generate bg-blend-${mode}`, () => {
        const css = coral.generate([`bg-blend-${mode}`])
        expect(css).toContain('background-blend-mode')
      })
    }
  })

  describe('CSS Masks', () => {
    describe('Mask Image', () => {
      it('should generate mask-none', () => {
        const css = coral.generate(['mask-none'])
        expect(css).toContain('mask-image')
        expect(css).toContain('none')
      })

      it('should generate mask-linear', () => {
        const css = coral.generate(['mask-linear'])
        expect(css).toContain('mask-image')
        expect(css).toContain('linear-gradient')
      })

      it('should generate mask-linear-r', () => {
        const css = coral.generate(['mask-linear-r'])
        expect(css).toContain('mask-image')
        expect(css).toContain('to right')
      })

      it('should generate mask-linear-l', () => {
        const css = coral.generate(['mask-linear-l'])
        expect(css).toContain('mask-image')
        expect(css).toContain('to left')
      })

      it('should generate mask-linear-t', () => {
        const css = coral.generate(['mask-linear-t'])
        expect(css).toContain('mask-image')
        expect(css).toContain('to top')
      })

      it('should generate mask-linear-b', () => {
        const css = coral.generate(['mask-linear-b'])
        expect(css).toContain('mask-image')
        expect(css).toContain('to bottom')
      })

      it('should generate mask-radial', () => {
        const css = coral.generate(['mask-radial'])
        expect(css).toContain('mask-image')
        expect(css).toContain('radial-gradient')
      })

      it('should generate mask arbitrary value', () => {
        const css = coral.generate(['mask-[url(image.png)]'])
        expect(css).toContain('mask-image')
      })
    })

    describe('Mask Size', () => {
      it('should generate mask-auto', () => {
        const css = coral.generate(['mask-auto'])
        expect(css).toContain('mask-size')
        expect(css).toContain('auto')
      })

      it('should generate mask-cover', () => {
        const css = coral.generate(['mask-cover'])
        expect(css).toContain('mask-size')
        expect(css).toContain('cover')
      })

      it('should generate mask-contain', () => {
        const css = coral.generate(['mask-contain'])
        expect(css).toContain('mask-size')
        expect(css).toContain('contain')
      })

      it('should generate mask-size arbitrary value', () => {
        const css = coral.generate(['mask-size-[50%]'])
        expect(css).toContain('mask-size')
      })
    })

    describe('Mask Repeat', () => {
      it('should generate mask-repeat', () => {
        const css = coral.generate(['mask-repeat'])
        expect(css).toContain('mask-repeat')
        expect(css).toContain('repeat')
      })

      it('should generate mask-no-repeat', () => {
        const css = coral.generate(['mask-no-repeat'])
        expect(css).toContain('mask-repeat')
        expect(css).toContain('no-repeat')
      })

      it('should generate mask-repeat-x', () => {
        const css = coral.generate(['mask-repeat-x'])
        expect(css).toContain('mask-repeat')
      })

      it('should generate mask-repeat-y', () => {
        const css = coral.generate(['mask-repeat-y'])
        expect(css).toContain('mask-repeat')
      })

      it('should generate mask-repeat-round', () => {
        const css = coral.generate(['mask-repeat-round'])
        expect(css).toContain('mask-repeat')
        expect(css).toContain('round')
      })

      it('should generate mask-repeat-space', () => {
        const css = coral.generate(['mask-repeat-space'])
        expect(css).toContain('mask-repeat')
        expect(css).toContain('space')
      })
    })

    describe('Mask Position', () => {
      const positions = ['center', 'top', 'bottom', 'left', 'right']

      for (const pos of positions) {
        it(`should generate mask-position-${pos}`, () => {
          const css = coral.generate([`mask-position-${pos}`])
          expect(css).toContain('mask-position')
        })
      }

      it('should generate mask-position arbitrary value', () => {
        const css = coral.generate(['mask-position-[25%_75%]'])
        expect(css).toContain('mask-position')
      })
    })

    describe('Mask Composite', () => {
      const composites = ['add', 'subtract', 'intersect', 'exclude']

      for (const comp of composites) {
        it(`should generate mask-composite-${comp}`, () => {
          const css = coral.generate([`mask-composite-${comp}`])
          expect(css).toContain('mask-composite')
        })
      }
    })

    describe('Mask Type', () => {
      it('should generate mask-type-alpha', () => {
        const css = coral.generate(['mask-type-alpha'])
        expect(css).toContain('mask-type')
        expect(css).toContain('alpha')
      })

      it('should generate mask-type-luminance', () => {
        const css = coral.generate(['mask-type-luminance'])
        expect(css).toContain('mask-type')
        expect(css).toContain('luminance')
      })
    })

    describe('Mask Origin', () => {
      it('should generate mask-origin-border', () => {
        const css = coral.generate(['mask-origin-border'])
        expect(css).toContain('mask-origin')
        expect(css).toContain('border-box')
      })

      it('should generate mask-origin-padding', () => {
        const css = coral.generate(['mask-origin-padding'])
        expect(css).toContain('mask-origin')
        expect(css).toContain('padding-box')
      })

      it('should generate mask-origin-content', () => {
        const css = coral.generate(['mask-origin-content'])
        expect(css).toContain('mask-origin')
        expect(css).toContain('content-box')
      })
    })

    describe('Mask Clip', () => {
      it('should generate mask-clip-border', () => {
        const css = coral.generate(['mask-clip-border'])
        expect(css).toContain('mask-clip')
        expect(css).toContain('border-box')
      })

      it('should generate mask-clip-padding', () => {
        const css = coral.generate(['mask-clip-padding'])
        expect(css).toContain('mask-clip')
        expect(css).toContain('padding-box')
      })

      it('should generate mask-clip-content', () => {
        const css = coral.generate(['mask-clip-content'])
        expect(css).toContain('mask-clip')
        expect(css).toContain('content-box')
      })

      it('should generate mask-clip-no-clip', () => {
        const css = coral.generate(['mask-clip-no-clip'])
        expect(css).toContain('mask-clip')
        expect(css).toContain('no-clip')
      })
    })
  })

  describe('Shape Outside', () => {
    it('should generate shape-none', () => {
      const css = coral.generate(['shape-none'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('none')
    })

    it('should generate shape-margin-box', () => {
      const css = coral.generate(['shape-margin-box'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('margin-box')
    })

    it('should generate shape-border-box', () => {
      const css = coral.generate(['shape-border-box'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('border-box')
    })

    it('should generate shape-padding-box', () => {
      const css = coral.generate(['shape-padding-box'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('padding-box')
    })

    it('should generate shape-content-box', () => {
      const css = coral.generate(['shape-content-box'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('content-box')
    })

    it('should generate shape-circle', () => {
      const css = coral.generate(['shape-circle'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('circle')
    })

    it('should generate shape-ellipse', () => {
      const css = coral.generate(['shape-ellipse'])
      expect(css).toContain('shape-outside')
      expect(css).toContain('ellipse')
    })

    it('should generate shape-inset', () => {
      const css = coral.generate(['shape-inset'])
      expect(css).toContain('shape-outside')
    })

    it('should generate shape arbitrary value', () => {
      const css = coral.generate(['shape-[url(image.png)]'])
      expect(css).toContain('shape-outside')
    })
  })

  describe('Shape Margin', () => {
    const margins = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16']

    for (const margin of margins) {
      it(`should generate shape-margin-${margin}`, () => {
        const css = coral.generate([`shape-margin-${margin}`])
        expect(css).toContain('shape-margin')
      })
    }

    it('should generate shape-margin arbitrary value', () => {
      const css = coral.generate(['shape-margin-[20px]'])
      expect(css).toContain('shape-margin')
    })
  })

  describe('Shape Image Threshold', () => {
    const thresholds = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']

    for (const threshold of thresholds) {
      it(`should generate shape-threshold-${threshold}`, () => {
        const css = coral.generate([`shape-threshold-${threshold}`])
        expect(css).toContain('shape-image-threshold')
      })
    }

    it('should generate shape-threshold arbitrary value', () => {
      const css = coral.generate(['shape-threshold-[0.75]'])
      expect(css).toContain('shape-image-threshold')
    })
  })

  describe('Object View Box', () => {
    it('should generate object-view-box-none', () => {
      const css = coral.generate(['object-view-box-none'])
      expect(css).toContain('object-view-box')
      expect(css).toContain('none')
    })

    const insets = ['5', '10', '15', '20', '25']
    for (const inset of insets) {
      it(`should generate object-view-box-inset-${inset}`, () => {
        const css = coral.generate([`object-view-box-inset-${inset}`])
        expect(css).toContain('object-view-box')
        expect(css).toContain('inset')
      })
    }

    it('should generate object-view-box arbitrary value', () => {
      const css = coral.generate(['object-view-box-[inset(10%_20%_10%_20%)]'])
      expect(css).toContain('object-view-box')
    })
  })

  describe('Clip Path', () => {
    it('should generate clip-none', () => {
      const css = coral.generate(['clip-none'])
      expect(css).toContain('clip-path')
      expect(css).toContain('none')
    })

    it('should generate clip-circle', () => {
      const css = coral.generate(['clip-circle'])
      expect(css).toContain('clip-path')
      expect(css).toContain('circle')
    })

    it('should generate clip-ellipse', () => {
      const css = coral.generate(['clip-ellipse'])
      expect(css).toContain('clip-path')
      expect(css).toContain('ellipse')
    })

    it('should generate clip-inset', () => {
      const css = coral.generate(['clip-inset'])
      expect(css).toContain('clip-path')
      expect(css).toContain('inset')
    })

    it('should generate clip-inset-sm', () => {
      const css = coral.generate(['clip-inset-sm'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-inset-md', () => {
      const css = coral.generate(['clip-inset-md'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-inset-lg', () => {
      const css = coral.generate(['clip-inset-lg'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-triangle', () => {
      const css = coral.generate(['clip-triangle'])
      expect(css).toContain('clip-path')
      expect(css).toContain('polygon')
    })

    it('should generate clip-triangle-up', () => {
      const css = coral.generate(['clip-triangle-up'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-triangle-down', () => {
      const css = coral.generate(['clip-triangle-down'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-triangle-left', () => {
      const css = coral.generate(['clip-triangle-left'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-triangle-right', () => {
      const css = coral.generate(['clip-triangle-right'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-rhombus', () => {
      const css = coral.generate(['clip-rhombus'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-pentagon', () => {
      const css = coral.generate(['clip-pentagon'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-hexagon', () => {
      const css = coral.generate(['clip-hexagon'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-octagon', () => {
      const css = coral.generate(['clip-octagon'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-star', () => {
      const css = coral.generate(['clip-star'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-cross', () => {
      const css = coral.generate(['clip-cross'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-arrow-right', () => {
      const css = coral.generate(['clip-arrow-right'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-arrow-left', () => {
      const css = coral.generate(['clip-arrow-left'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-message', () => {
      const css = coral.generate(['clip-message'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-bevel', () => {
      const css = coral.generate(['clip-bevel'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-rabbet', () => {
      const css = coral.generate(['clip-rabbet'])
      expect(css).toContain('clip-path')
    })

    it('should generate clip-path arbitrary value', () => {
      const css = coral.generate(['clip-[polygon(0_0,100%_0,100%_100%)]'])
      expect(css).toContain('clip-path')
    })
  })

  describe('Animation Composition', () => {
    it('should generate animation-composition-replace', () => {
      const css = coral.generate(['animation-composition-replace'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('replace')
    })

    it('should generate animation-composition-add', () => {
      const css = coral.generate(['animation-composition-add'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('add')
    })

    it('should generate animation-composition-accumulate', () => {
      const css = coral.generate(['animation-composition-accumulate'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('accumulate')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/effects'
      )
      expect(defaultExport).toBe(effectsPlugin)
    })
  })
})
