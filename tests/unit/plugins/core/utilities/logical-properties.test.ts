/**
 * Tests for Logical Properties Plugin
 *
 * Tests RTL/LTR support utilities using CSS logical properties.
 * Note: Some logical properties (ms-*, me-*, ps-*, pe-*, etc.) come from
 * the spacing plugin, so we include both for comprehensive testing.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { logicalPropertiesPlugin } from '../../../../../src/plugins/core/utilities/logical-properties'
import { spacingPlugin } from '../../../../../src/plugins/core/utilities/spacing'
import type { Coral } from '../../../../../src/types'

describe('Logical Properties Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(spacingPlugin())
    coral.use(logicalPropertiesPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = logicalPropertiesPlugin()
      expect(plugin.name).toBe('logical-properties')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Inset Logical Properties', () => {
    const spacingValues = ['0', 'px', '1', '2', '4', '8', '16', 'auto']

    // start-* (inset-inline-start)
    for (const value of spacingValues) {
      it(`should generate start-${value}`, () => {
        const css = coral.generate([`start-${value}`])
        expect(css).toContain('inset-inline-start')
      })
    }

    // end-* (inset-inline-end)
    for (const value of spacingValues) {
      it(`should generate end-${value}`, () => {
        const css = coral.generate([`end-${value}`])
        expect(css).toContain('inset-inline-end')
      })
    }

    // Fractional values
    const fractions = ['1/2', '1/3', '2/3', '1/4', '3/4', 'full']
    for (const fraction of fractions) {
      it(`should generate start-${fraction}`, () => {
        const css = coral.generate([`start-${fraction}`])
        expect(css).toContain('inset-inline-start')
      })
    }

    for (const fraction of fractions) {
      it(`should generate end-${fraction}`, () => {
        const css = coral.generate([`end-${fraction}`])
        expect(css).toContain('inset-inline-end')
      })
    }
  })

  describe('Margin Logical Properties', () => {
    const spacingValues = ['0', 'px', '1', '2', '4', '8', '16', 'auto']

    // ms-* (margin-inline-start)
    for (const value of spacingValues) {
      it(`should generate ms-${value}`, () => {
        const css = coral.generate([`ms-${value}`])
        expect(css).toContain('margin-inline-start')
      })
    }

    // me-* (margin-inline-end)
    for (const value of spacingValues) {
      it(`should generate me-${value}`, () => {
        const css = coral.generate([`me-${value}`])
        expect(css).toContain('margin-inline-end')
      })
    }

    // mbs-* (margin-block-start)
    for (const value of spacingValues) {
      it(`should generate mbs-${value}`, () => {
        const css = coral.generate([`mbs-${value}`])
        expect(css).toContain('margin-block-start')
      })
    }

    // mbe-* (margin-block-end)
    for (const value of spacingValues) {
      it(`should generate mbe-${value}`, () => {
        const css = coral.generate([`mbe-${value}`])
        expect(css).toContain('margin-block-end')
      })
    }
  })

  describe('Padding Logical Properties', () => {
    const spacingValues = ['0', 'px', '1', '2', '4', '8', '16']

    // ps-* (padding-inline-start)
    for (const value of spacingValues) {
      it(`should generate ps-${value}`, () => {
        const css = coral.generate([`ps-${value}`])
        expect(css).toContain('padding-inline-start')
      })
    }

    // pe-* (padding-inline-end)
    for (const value of spacingValues) {
      it(`should generate pe-${value}`, () => {
        const css = coral.generate([`pe-${value}`])
        expect(css).toContain('padding-inline-end')
      })
    }

    // pbs-* (padding-block-start)
    for (const value of spacingValues) {
      it(`should generate pbs-${value}`, () => {
        const css = coral.generate([`pbs-${value}`])
        expect(css).toContain('padding-block-start')
      })
    }

    // pbe-* (padding-block-end)
    for (const value of spacingValues) {
      it(`should generate pbe-${value}`, () => {
        const css = coral.generate([`pbe-${value}`])
        expect(css).toContain('padding-block-end')
      })
    }
  })

  describe('Size Logical Properties', () => {
    const sizeValues = ['0', 'px', '1', '2', '4', '8', '16', 'full', 'screen', 'min', 'max', 'fit']

    // inline-size (width in LTR)
    for (const value of sizeValues) {
      it(`should generate inline-size-${value}`, () => {
        const css = coral.generate([`inline-size-${value}`])
        expect(css).toContain('inline-size')
      })
    }

    // block-size (height in LTR)
    for (const value of sizeValues) {
      it(`should generate block-size-${value}`, () => {
        const css = coral.generate([`block-size-${value}`])
        expect(css).toContain('block-size')
      })
    }

    // min-inline-size
    for (const value of sizeValues) {
      it(`should generate min-inline-size-${value}`, () => {
        const css = coral.generate([`min-inline-size-${value}`])
        expect(css).toContain('min-inline-size')
      })
    }

    // max-inline-size
    for (const value of sizeValues) {
      it(`should generate max-inline-size-${value}`, () => {
        const css = coral.generate([`max-inline-size-${value}`])
        expect(css).toContain('max-inline-size')
      })
    }

    // min-block-size
    for (const value of sizeValues) {
      it(`should generate min-block-size-${value}`, () => {
        const css = coral.generate([`min-block-size-${value}`])
        expect(css).toContain('min-block-size')
      })
    }

    // max-block-size
    for (const value of sizeValues) {
      it(`should generate max-block-size-${value}`, () => {
        const css = coral.generate([`max-block-size-${value}`])
        expect(css).toContain('max-block-size')
      })
    }
  })

  describe('Border Logical Properties', () => {
    const borderWidths = ['0', '', '2', '4', '8']

    // Border width - inline-start (border-s-*)
    for (const width of borderWidths) {
      const className = width ? `border-s-${width}` : 'border-s'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-inline-start')
      })
    }

    // Border width - inline-end (border-e-*)
    for (const width of borderWidths) {
      const className = width ? `border-e-${width}` : 'border-e'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-inline-end')
      })
    }

    // Border width - block-start
    for (const width of borderWidths) {
      const className = width ? `border-bs-${width}` : 'border-bs'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-block-start')
      })
    }

    // Border width - block-end
    for (const width of borderWidths) {
      const className = width ? `border-be-${width}` : 'border-be'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-block-end')
      })
    }
  })

  describe('Border Radius Logical Properties', () => {
    const radiusSizes = ['none', 'sm', '', 'md', 'lg', 'xl', '2xl', '3xl', 'full']

    // Border radius - start-start
    for (const size of radiusSizes) {
      const className = size ? `rounded-ss-${size}` : 'rounded-ss'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-start-start-radius')
      })
    }

    // Border radius - start-end
    for (const size of radiusSizes) {
      const className = size ? `rounded-se-${size}` : 'rounded-se'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-start-end-radius')
      })
    }

    // Border radius - end-start
    for (const size of radiusSizes) {
      const className = size ? `rounded-es-${size}` : 'rounded-es'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-end-start-radius')
      })
    }

    // Border radius - end-end
    for (const size of radiusSizes) {
      const className = size ? `rounded-ee-${size}` : 'rounded-ee'
      it(`should generate ${className}`, () => {
        const css = coral.generate([className])
        expect(css).toContain('border-end-end-radius')
      })
    }
  })

  describe('Text Alignment Logical Properties', () => {
    it('should generate text-start', () => {
      const css = coral.generate(['text-start'])
      expect(css).toContain('text-align')
      expect(css).toContain('start')
    })

    it('should generate text-end', () => {
      const css = coral.generate(['text-end'])
      expect(css).toContain('text-align')
      expect(css).toContain('end')
    })
  })

  describe('Float Logical Properties', () => {
    it('should generate float-start', () => {
      const css = coral.generate(['float-start'])
      expect(css).toContain('float')
      expect(css).toContain('inline-start')
    })

    it('should generate float-end', () => {
      const css = coral.generate(['float-end'])
      expect(css).toContain('float')
      expect(css).toContain('inline-end')
    })
  })

  describe('Clear Logical Properties', () => {
    it('should generate clear-start', () => {
      const css = coral.generate(['clear-start'])
      expect(css).toContain('clear')
      expect(css).toContain('inline-start')
    })

    it('should generate clear-end', () => {
      const css = coral.generate(['clear-end'])
      expect(css).toContain('clear')
      expect(css).toContain('inline-end')
    })
  })

  describe('Scroll Margin Logical Properties', () => {
    const spacingValues = ['0', 'px', '1', '2', '4', '8']

    // scroll-ms-* (scroll-margin-inline-start)
    for (const value of spacingValues) {
      it(`should generate scroll-ms-${value}`, () => {
        const css = coral.generate([`scroll-ms-${value}`])
        expect(css).toContain('scroll-margin-inline-start')
      })
    }

    // scroll-me-* (scroll-margin-inline-end)
    for (const value of spacingValues) {
      it(`should generate scroll-me-${value}`, () => {
        const css = coral.generate([`scroll-me-${value}`])
        expect(css).toContain('scroll-margin-inline-end')
      })
    }
  })

  describe('Scroll Padding Logical Properties', () => {
    const spacingValues = ['0', 'px', '1', '2', '4', '8']

    // scroll-ps-* (scroll-padding-inline-start)
    for (const value of spacingValues) {
      it(`should generate scroll-ps-${value}`, () => {
        const css = coral.generate([`scroll-ps-${value}`])
        expect(css).toContain('scroll-padding-inline-start')
      })
    }

    // scroll-pe-* (scroll-padding-inline-end)
    for (const value of spacingValues) {
      it(`should generate scroll-pe-${value}`, () => {
        const css = coral.generate([`scroll-pe-${value}`])
        expect(css).toContain('scroll-padding-inline-end')
      })
    }
  })

  describe('Writing Mode', () => {
    const writingModes = ['horizontal-tb', 'vertical-rl', 'vertical-lr']

    for (const mode of writingModes) {
      it(`should generate writing-mode-${mode}`, () => {
        const css = coral.generate([`writing-${mode}`])
        expect(css).toContain('writing-mode')
      })
    }
  })

  describe('Direction', () => {
    it('should generate dir-ltr', () => {
      const css = coral.generate(['dir-ltr'])
      expect(css).toContain('direction')
      expect(css).toContain('ltr')
    })

    it('should generate dir-rtl', () => {
      const css = coral.generate(['dir-rtl'])
      expect(css).toContain('direction')
      expect(css).toContain('rtl')
    })
  })

  describe('Text Orientation', () => {
    const orientations = ['mixed', 'upright', 'sideways']

    for (const orientation of orientations) {
      it(`should generate text-orientation-${orientation}`, () => {
        const css = coral.generate([`text-orientation-${orientation}`])
        expect(css).toContain('text-orientation')
      })
    }
  })

  describe('Negative Values', () => {
    const negativeValues = ['1', '2', '4', '8']

    // Negative inset-inline-start
    for (const value of negativeValues) {
      it(`should generate -start-${value}`, () => {
        const css = coral.generate([`-start-${value}`])
        expect(css).toContain('inset-inline-start')
        expect(css).toContain('-')
      })
    }

    // Negative inset-inline-end
    for (const value of negativeValues) {
      it(`should generate -end-${value}`, () => {
        const css = coral.generate([`-end-${value}`])
        expect(css).toContain('inset-inline-end')
        expect(css).toContain('-')
      })
    }

    // Note: Negative margin logical utilities (-ms-*, -me-*) are tested in spacing.test.ts
    // as they are part of the spacing plugin, not the logical-properties plugin
  })
})
