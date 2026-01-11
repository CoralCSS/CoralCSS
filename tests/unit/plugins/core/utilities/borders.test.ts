/**
 * Tests for Borders Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { bordersPlugin } from '../../../../../src/plugins/core/utilities/borders'
import type { Coral } from '../../../../../src/types'

describe('Borders Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(bordersPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = bordersPlugin()
      expect(plugin.name).toBe('borders')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Border Radius Utilities', () => {
    it('should generate rounded', () => {
      const css = coral.generate(['rounded'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-none', () => {
      const css = coral.generate(['rounded-none'])
      expect(css).toContain('border-radius')
      expect(css).toContain('0')
    })

    it('should generate rounded-full', () => {
      const css = coral.generate(['rounded-full'])
      expect(css).toContain('border-radius')
      expect(css).toContain('9999')
    })

    it('should generate rounded-t', () => {
      const css = coral.generate(['rounded-t'])
      expect(css).toContain('border-top-left-radius')
      expect(css).toContain('border-top-right-radius')
    })

    it('should generate rounded-r', () => {
      const css = coral.generate(['rounded-r'])
      expect(css).toContain('border-top-right-radius')
      expect(css).toContain('border-bottom-right-radius')
    })

    it('should generate rounded-b', () => {
      const css = coral.generate(['rounded-b'])
      expect(css).toContain('border-bottom-right-radius')
      expect(css).toContain('border-bottom-left-radius')
    })

    it('should generate rounded-l', () => {
      const css = coral.generate(['rounded-l'])
      expect(css).toContain('border-top-left-radius')
      expect(css).toContain('border-bottom-left-radius')
    })

    it('should generate rounded-tl', () => {
      const css = coral.generate(['rounded-tl'])
      expect(css).toContain('border-top-left-radius')
    })

    it('should generate rounded-tr', () => {
      const css = coral.generate(['rounded-tr'])
      expect(css).toContain('border-top-right-radius')
    })

    it('should generate rounded-br', () => {
      const css = coral.generate(['rounded-br'])
      expect(css).toContain('border-bottom-right-radius')
    })

    it('should generate rounded-bl', () => {
      const css = coral.generate(['rounded-bl'])
      expect(css).toContain('border-bottom-left-radius')
    })

    it('should generate arbitrary border-radius', () => {
      const css = coral.generate(['rounded-[17px]'])
      expect(css).toContain('border-radius')
      expect(css).toContain('17px')
    })

    it('should handle empty arbitrary border-radius', () => {
      const css = coral.generate(['rounded-[]'])
      expect(css).toBe('')
    })
  })

  describe('Border Width Utilities', () => {
    it('should generate border', () => {
      const css = coral.generate(['border'])
      expect(css).toContain('border-width')
    })

    it('should generate border-0', () => {
      const css = coral.generate(['border-0'])
      expect(css).toContain('border-width')
      expect(css).toContain('0')
    })

    it('should generate border-2', () => {
      const css = coral.generate(['border-2'])
      expect(css).toContain('border-width')
    })

    it('should generate border-4', () => {
      const css = coral.generate(['border-4'])
      expect(css).toContain('border-width')
    })

    it('should generate border-x', () => {
      const css = coral.generate(['border-x'])
      expect(css).toContain('border-left-width')
      expect(css).toContain('border-right-width')
    })

    it('should generate border-y', () => {
      const css = coral.generate(['border-y'])
      expect(css).toContain('border-top-width')
      expect(css).toContain('border-bottom-width')
    })

    it('should generate border-t', () => {
      const css = coral.generate(['border-t'])
      expect(css).toContain('border-top-width')
    })

    it('should generate border-r', () => {
      const css = coral.generate(['border-r'])
      expect(css).toContain('border-right-width')
    })

    it('should generate border-b', () => {
      const css = coral.generate(['border-b'])
      expect(css).toContain('border-bottom-width')
    })

    it('should generate border-l', () => {
      const css = coral.generate(['border-l'])
      expect(css).toContain('border-left-width')
    })
  })

  describe('Border Style Utilities', () => {
    it('should generate border-solid', () => {
      const css = coral.generate(['border-solid'])
      expect(css).toContain('border-style')
      expect(css).toContain('solid')
    })

    it('should generate border-dashed', () => {
      const css = coral.generate(['border-dashed'])
      expect(css).toContain('border-style')
      expect(css).toContain('dashed')
    })

    it('should generate border-dotted', () => {
      const css = coral.generate(['border-dotted'])
      expect(css).toContain('border-style')
      expect(css).toContain('dotted')
    })

    it('should generate border-double', () => {
      const css = coral.generate(['border-double'])
      expect(css).toContain('border-style')
      expect(css).toContain('double')
    })

    it('should generate border-hidden', () => {
      const css = coral.generate(['border-hidden'])
      expect(css).toContain('border-style')
      expect(css).toContain('hidden')
    })

    it('should generate border-none', () => {
      const css = coral.generate(['border-none'])
      expect(css).toContain('border-style')
      expect(css).toContain('none')
    })
  })

  describe('Divide Utilities', () => {
    it('should generate divide-x', () => {
      const css = coral.generate(['divide-x'])
      expect(css).toContain('border-left-width')
    })

    it('should generate divide-y', () => {
      const css = coral.generate(['divide-y'])
      expect(css).toContain('border-top-width')
    })

    it('should generate divide-x-2', () => {
      const css = coral.generate(['divide-x-2'])
      expect(css).toContain('border-left-width')
    })

    it('should generate divide-y-2', () => {
      const css = coral.generate(['divide-y-2'])
      expect(css).toContain('border-top-width')
    })

    it('should generate divide-solid', () => {
      const css = coral.generate(['divide-solid'])
      expect(css).toContain('border-style')
      expect(css).toContain('solid')
    })

    it('should generate divide-dashed', () => {
      const css = coral.generate(['divide-dashed'])
      expect(css).toContain('border-style')
      expect(css).toContain('dashed')
    })

    it('should generate divide-dotted', () => {
      const css = coral.generate(['divide-dotted'])
      expect(css).toContain('border-style')
      expect(css).toContain('dotted')
    })

    it('should generate divide-double', () => {
      const css = coral.generate(['divide-double'])
      expect(css).toContain('border-style')
      expect(css).toContain('double')
    })

    it('should generate divide-none', () => {
      const css = coral.generate(['divide-none'])
      expect(css).toContain('border-style')
      expect(css).toContain('none')
    })
  })

  describe('Outline Utilities', () => {
    it('should generate outline-0', () => {
      const css = coral.generate(['outline-0'])
      expect(css).toContain('outline-width')
      expect(css).toContain('0px')
    })

    it('should generate outline-1', () => {
      const css = coral.generate(['outline-1'])
      expect(css).toContain('outline-width')
      expect(css).toContain('1px')
    })

    it('should generate outline-2', () => {
      const css = coral.generate(['outline-2'])
      expect(css).toContain('outline-width')
      expect(css).toContain('2px')
    })

    it('should generate outline-4', () => {
      const css = coral.generate(['outline-4'])
      expect(css).toContain('outline-width')
      expect(css).toContain('4px')
    })

    it('should generate outline-8', () => {
      const css = coral.generate(['outline-8'])
      expect(css).toContain('outline-width')
      expect(css).toContain('8px')
    })

    it('should generate outline', () => {
      const css = coral.generate(['outline'])
      expect(css).toContain('outline-style')
      expect(css).toContain('solid')
    })

    it('should generate outline-none', () => {
      const css = coral.generate(['outline-none'])
      expect(css).toContain('outline')
    })

    it('should generate outline-dashed', () => {
      const css = coral.generate(['outline-dashed'])
      expect(css).toContain('outline-style')
      expect(css).toContain('dashed')
    })

    it('should generate outline-dotted', () => {
      const css = coral.generate(['outline-dotted'])
      expect(css).toContain('outline-style')
      expect(css).toContain('dotted')
    })

    it('should generate outline-double', () => {
      const css = coral.generate(['outline-double'])
      expect(css).toContain('outline-style')
      expect(css).toContain('double')
    })
  })

  describe('Outline Offset Utilities', () => {
    it('should generate outline-offset-0', () => {
      const css = coral.generate(['outline-offset-0'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('0px')
    })

    it('should generate outline-offset-1', () => {
      const css = coral.generate(['outline-offset-1'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('1px')
    })

    it('should generate outline-offset-2', () => {
      const css = coral.generate(['outline-offset-2'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('2px')
    })

    it('should generate outline-offset-4', () => {
      const css = coral.generate(['outline-offset-4'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('4px')
    })

    it('should generate outline-offset-8', () => {
      const css = coral.generate(['outline-offset-8'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('8px')
    })
  })

  describe('Ring Utilities', () => {
    it('should generate ring', () => {
      const css = coral.generate(['ring'])
      expect(css).toContain('--coral-ring-offset-shadow')
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('box-shadow')
    })

    it('should generate ring-0', () => {
      const css = coral.generate(['ring-0'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(0px')
    })

    it('should generate ring-1', () => {
      const css = coral.generate(['ring-1'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(1px')
    })

    it('should generate ring-2', () => {
      const css = coral.generate(['ring-2'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(2px')
    })

    it('should generate ring-4', () => {
      const css = coral.generate(['ring-4'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(4px')
    })

    it('should generate ring-8', () => {
      const css = coral.generate(['ring-8'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(8px')
    })

    it('should generate ring-inset', () => {
      const css = coral.generate(['ring-inset'])
      expect(css).toContain('--coral-ring-inset')
      expect(css).toContain('inset')
    })
  })

  describe('Ring Offset Utilities', () => {
    it('should generate ring-offset-0', () => {
      const css = coral.generate(['ring-offset-0'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('0px')
    })

    it('should generate ring-offset-1', () => {
      const css = coral.generate(['ring-offset-1'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('1px')
    })

    it('should generate ring-offset-2', () => {
      const css = coral.generate(['ring-offset-2'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('2px')
    })

    it('should generate ring-offset-4', () => {
      const css = coral.generate(['ring-offset-4'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('4px')
    })

    it('should generate ring-offset-8', () => {
      const css = coral.generate(['ring-offset-8'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('8px')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate arbitrary border width', () => {
      const css = coral.generate(['border-[17px]'])
      expect(css).toContain('border-width')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary border color', () => {
      const css = coral.generate(['border-[#ff6b6b]'])
      expect(css).toContain('border-color')
      expect(css).toContain('#ff6b6b')
    })

    it('should generate arbitrary outline', () => {
      const css = coral.generate(['outline-[3px_solid_red]'])
      expect(css).toContain('outline')
      expect(css).toContain('3px')
    })

    it('should generate arbitrary outline-offset', () => {
      const css = coral.generate(['outline-offset-[17px]'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary ring', () => {
      const css = coral.generate(['ring-[17px]'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary ring-offset', () => {
      const css = coral.generate(['ring-offset-[17px]'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('17px')
    })
  })

  describe('Logical Border Properties', () => {
    it('should generate border-block', () => {
      const css = coral.generate(['border-block'])
      expect(css).toContain('border-block-width')
    })

    it('should generate border-block-start', () => {
      const css = coral.generate(['border-block-start'])
      expect(css).toContain('border-block-start-width')
    })

    it('should generate border-block-end', () => {
      const css = coral.generate(['border-block-end'])
      expect(css).toContain('border-block-end-width')
    })

    it('should generate border-inline', () => {
      const css = coral.generate(['border-inline'])
      expect(css).toContain('border-inline-width')
    })

    it('should generate border-inline-start', () => {
      const css = coral.generate(['border-inline-start'])
      expect(css).toContain('border-inline-start-width')
    })

    it('should generate border-inline-end', () => {
      const css = coral.generate(['border-inline-end'])
      expect(css).toContain('border-inline-end-width')
    })
  })

  describe('Border Image Utilities', () => {
    it('should generate border-image-none', () => {
      const css = coral.generate(['border-image-none'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('none')
    })

    it('should generate border-image-slice-0', () => {
      const css = coral.generate(['border-image-slice-0'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('0')
    })

    it('should generate border-image-slice-fill', () => {
      const css = coral.generate(['border-image-slice-fill'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('fill')
    })

    it('should generate border-image-width-0', () => {
      const css = coral.generate(['border-image-width-0'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('0')
    })

    it('should generate border-image-width-auto', () => {
      const css = coral.generate(['border-image-width-auto'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('auto')
    })

    it('should generate border-image-outset-0', () => {
      const css = coral.generate(['border-image-outset-0'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('0')
    })

    it('should generate border-image-repeat-stretch', () => {
      const css = coral.generate(['border-image-repeat-stretch'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('stretch')
    })

    it('should generate border-image-repeat-repeat', () => {
      const css = coral.generate(['border-image-repeat-repeat'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('repeat')
    })

    it('should generate border-image-repeat-round', () => {
      const css = coral.generate(['border-image-repeat-round'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('round')
    })

    it('should generate border-image-repeat-space', () => {
      const css = coral.generate(['border-image-repeat-space'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('space')
    })

    it('should generate border-gradient-to-r', () => {
      const css = coral.generate(['border-gradient-to-r'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-to-b', () => {
      const css = coral.generate(['border-gradient-to-b'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('conic-gradient')
    })
  })

  describe('Border Spacing Utilities', () => {
    it('should generate border-spacing-0', () => {
      const css = coral.generate(['border-spacing-0'])
      expect(css).toContain('border-spacing')
      expect(css).toContain('0px')
    })

    it('should generate border-spacing-4', () => {
      const css = coral.generate(['border-spacing-4'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-x-4', () => {
      const css = coral.generate(['border-spacing-x-4'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-y-4', () => {
      const css = coral.generate(['border-spacing-y-4'])
      expect(css).toContain('border-spacing')
    })
  })

  describe('Border Collapse Utilities', () => {
    it('should generate border-collapse', () => {
      const css = coral.generate(['border-collapse'])
      expect(css).toContain('border-collapse')
      expect(css).toContain('collapse')
    })

    it('should generate border-separate', () => {
      const css = coral.generate(['border-separate'])
      expect(css).toContain('border-collapse')
      expect(css).toContain('separate')
    })
  })

  describe('Table Layout Utilities', () => {
    it('should generate table-auto', () => {
      const css = coral.generate(['table-auto'])
      expect(css).toContain('table-layout')
      expect(css).toContain('auto')
    })

    it('should generate table-fixed', () => {
      const css = coral.generate(['table-fixed'])
      expect(css).toContain('table-layout')
      expect(css).toContain('fixed')
    })
  })

  describe('Caption Side Utilities', () => {
    it('should generate caption-top', () => {
      const css = coral.generate(['caption-top'])
      expect(css).toContain('caption-side')
      expect(css).toContain('top')
    })

    it('should generate caption-bottom', () => {
      const css = coral.generate(['caption-bottom'])
      expect(css).toContain('caption-side')
      expect(css).toContain('bottom')
    })
  })

  describe('Empty Cells Utilities', () => {
    it('should generate empty-cells-show', () => {
      const css = coral.generate(['empty-cells-show'])
      expect(css).toContain('empty-cells')
      expect(css).toContain('show')
    })

    it('should generate empty-cells-hide', () => {
      const css = coral.generate(['empty-cells-hide'])
      expect(css).toContain('empty-cells')
      expect(css).toContain('hide')
    })
  })
})
