/**
 * Borders Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { bordersPlugin } from '../../../src/plugins/core/utilities/borders'

describe('bordersPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(bordersPlugin())
  })

  describe('Border Radius', () => {
    it('should generate rounded', () => {
      const css = coral.generate(['rounded'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-none', () => {
      const css = coral.generate(['rounded-none'])
      expect(css).toContain('border-radius: 0')
    })

    it('should generate rounded-sm', () => {
      const css = coral.generate(['rounded-sm'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-md', () => {
      const css = coral.generate(['rounded-md'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-lg', () => {
      const css = coral.generate(['rounded-lg'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-xl', () => {
      const css = coral.generate(['rounded-xl'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-2xl', () => {
      const css = coral.generate(['rounded-2xl'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-3xl', () => {
      const css = coral.generate(['rounded-3xl'])
      expect(css).toContain('border-radius')
    })

    it('should generate rounded-full', () => {
      const css = coral.generate(['rounded-full'])
      expect(css).toContain('border-radius')
      expect(css).toContain('9999px')
    })

    it('should generate directional rounded variants', () => {
      const directions = ['t', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl']
      directions.forEach((dir) => {
        const css = coral.generate([`rounded-${dir}`])
        expect(css).toContain('radius')
      })
    })

    it('should generate logical rounded variants', () => {
      const logicals = ['s', 'e', 'ss', 'se', 'ee', 'es']
      logicals.forEach((dir) => {
        const css = coral.generate([`rounded-${dir}`])
        expect(css).toContain('radius')
      })
    })

    it('should generate rounded arbitrary', () => {
      const css = coral.generate(['rounded-[12px]'])
      expect(css).toContain('border-radius: 12px')
    })

    it('should return null for rounded with empty value', () => {
      const css = coral.generate(['rounded-[]'])
      expect(css).not.toContain('border-radius: ;')
    })
  })

  describe('Border Width', () => {
    it('should generate border', () => {
      const css = coral.generate(['border'])
      expect(css).toContain('border-width')
    })

    it('should generate border-0', () => {
      const css = coral.generate(['border-0'])
      expect(css).toContain('border-width: 0px')
    })

    it('should generate border-2', () => {
      const css = coral.generate(['border-2'])
      expect(css).toContain('border-width: 2px')
    })

    it('should generate border-4', () => {
      const css = coral.generate(['border-4'])
      expect(css).toContain('border-width: 4px')
    })

    it('should generate border-8', () => {
      const css = coral.generate(['border-8'])
      expect(css).toContain('border-width: 8px')
    })

    it('should generate directional border widths', () => {
      const directions = ['x', 'y', 't', 'r', 'b', 'l', 's', 'e']
      directions.forEach((dir) => {
        const css = coral.generate([`border-${dir}`])
        expect(css).toContain('border')
        expect(css).toContain('width')
      })
    })

    it('should generate border arbitrary width', () => {
      const css = coral.generate(['border-[3px]'])
      expect(css).toContain('border-width: 3px')
    })

    it('should generate border arbitrary color', () => {
      const css = coral.generate(['border-[#ff0000]'])
      expect(css).toContain('border-color: #ff0000')
    })

    it('should return null for border with empty value', () => {
      const css = coral.generate(['border-[]'])
      expect(css).not.toContain('border-width: ;')
    })
  })

  describe('Border Style', () => {
    it('should generate border-solid', () => {
      const css = coral.generate(['border-solid'])
      expect(css).toContain('border-style: solid')
    })

    it('should generate border-dashed', () => {
      const css = coral.generate(['border-dashed'])
      expect(css).toContain('border-style: dashed')
    })

    it('should generate border-dotted', () => {
      const css = coral.generate(['border-dotted'])
      expect(css).toContain('border-style: dotted')
    })

    it('should generate border-double', () => {
      const css = coral.generate(['border-double'])
      expect(css).toContain('border-style: double')
    })

    it('should generate border-hidden', () => {
      const css = coral.generate(['border-hidden'])
      expect(css).toContain('border-style: hidden')
    })

    it('should generate border-none', () => {
      const css = coral.generate(['border-none'])
      expect(css).toContain('border-style: none')
    })
  })

  describe('Divide', () => {
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
      expect(css).toContain('border-left-width: 2px')
    })

    it('should generate divide-y-4', () => {
      const css = coral.generate(['divide-y-4'])
      expect(css).toContain('border-top-width: 4px')
    })

    it('should generate divide-solid', () => {
      const css = coral.generate(['divide-solid'])
      expect(css).toContain('border-style: solid')
    })

    it('should generate divide-dashed', () => {
      const css = coral.generate(['divide-dashed'])
      expect(css).toContain('border-style: dashed')
    })

    it('should generate divide-dotted', () => {
      const css = coral.generate(['divide-dotted'])
      expect(css).toContain('border-style: dotted')
    })

    it('should generate divide-double', () => {
      const css = coral.generate(['divide-double'])
      expect(css).toContain('border-style: double')
    })

    it('should generate divide-none', () => {
      const css = coral.generate(['divide-none'])
      expect(css).toContain('border-style: none')
    })

    it('should generate divide-x-reverse', () => {
      const css = coral.generate(['divide-x-reverse'])
      expect(css).toContain('--coral-divide-x-reverse')
    })

    it('should generate divide-y-reverse', () => {
      const css = coral.generate(['divide-y-reverse'])
      expect(css).toContain('--coral-divide-y-reverse')
    })
  })

  describe('Outline', () => {
    it('should generate outline', () => {
      const css = coral.generate(['outline'])
      expect(css).toContain('outline-style: solid')
    })

    it('should generate outline-none', () => {
      const css = coral.generate(['outline-none'])
      expect(css).toContain('outline: 2px solid transparent')
    })

    it('should generate outline widths', () => {
      const widths = ['0', '1', '2', '4', '8']
      widths.forEach((w) => {
        const css = coral.generate([`outline-${w}`])
        expect(css).toContain('outline-width')
      })
    })

    it('should generate outline-dashed', () => {
      const css = coral.generate(['outline-dashed'])
      expect(css).toContain('outline-style: dashed')
    })

    it('should generate outline-dotted', () => {
      const css = coral.generate(['outline-dotted'])
      expect(css).toContain('outline-style: dotted')
    })

    it('should generate outline-double', () => {
      const css = coral.generate(['outline-double'])
      expect(css).toContain('outline-style: double')
    })

    it('should generate outline offsets', () => {
      const offsets = ['0', '1', '2', '4', '8']
      offsets.forEach((o) => {
        const css = coral.generate([`outline-offset-${o}`])
        expect(css).toContain('outline-offset')
      })
    })

    it('should generate outline arbitrary', () => {
      const css = coral.generate(['outline-[3px_solid_blue]'])
      expect(css).toContain('outline: 3px_solid_blue')
    })

    it('should return null for outline with empty value', () => {
      const css = coral.generate(['outline-[]'])
      expect(css).not.toContain('outline: ;')
    })

    it('should generate outline-offset arbitrary', () => {
      const css = coral.generate(['outline-offset-[6px]'])
      expect(css).toContain('outline-offset: 6px')
    })

    it('should return null for outline-offset with empty value', () => {
      const css = coral.generate(['outline-offset-[]'])
      expect(css).not.toContain('outline-offset: ;')
    })

    it('should generate outline-current', () => {
      const css = coral.generate(['outline-current'])
      expect(css).toContain('outline-color: currentColor')
    })

    it('should generate outline-transparent', () => {
      const css = coral.generate(['outline-transparent'])
      expect(css).toContain('outline-color: transparent')
    })

    it('should generate outline-color arbitrary', () => {
      const css = coral.generate(['outline-color-[#ff0000]'])
      expect(css).toContain('outline-color: #ff0000')
    })

    it('should return null for outline-color with empty value', () => {
      const css = coral.generate(['outline-color-[]'])
      expect(css).not.toContain('outline-color: ;')
    })
  })

  describe('Ring', () => {
    it('should generate ring', () => {
      const css = coral.generate(['ring'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('box-shadow')
    })

    it('should generate ring widths', () => {
      const widths = ['0', '1', '2', '4', '8']
      widths.forEach((w) => {
        const css = coral.generate([`ring-${w}`])
        expect(css).toContain('--coral-ring-shadow')
      })
    })

    it('should generate ring-inset', () => {
      const css = coral.generate(['ring-inset'])
      expect(css).toContain('--coral-ring-inset: inset')
    })

    it('should generate ring offsets', () => {
      const offsets = ['0', '1', '2', '4', '8']
      offsets.forEach((o) => {
        const css = coral.generate([`ring-offset-${o}`])
        expect(css).toContain('--coral-ring-offset-width')
      })
    })

    it('should generate ring arbitrary', () => {
      const css = coral.generate(['ring-[5px]'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('5px')
    })

    it('should return null for ring with empty value', () => {
      const css = coral.generate(['ring-[]'])
      expect(css).not.toContain('--coral-ring-shadow: ;')
    })

    it('should generate ring-offset arbitrary', () => {
      const css = coral.generate(['ring-offset-[3px]'])
      expect(css).toContain('--coral-ring-offset-width: 3px')
    })

    it('should return null for ring-offset with empty value', () => {
      const css = coral.generate(['ring-offset-[]'])
      expect(css).not.toContain('--coral-ring-offset-width: ;')
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

    it('should generate rounded-bs', () => {
      const css = coral.generate(['rounded-bs'])
      expect(css).toContain('border-start-start-radius')
      expect(css).toContain('border-start-end-radius')
    })

    it('should generate rounded-be', () => {
      const css = coral.generate(['rounded-be'])
      expect(css).toContain('border-end-start-radius')
      expect(css).toContain('border-end-end-radius')
    })
  })

  describe('Border Image', () => {
    it('should generate border-image-none', () => {
      const css = coral.generate(['border-image-none'])
      expect(css).toContain('border-image-source: none')
    })

    it('should generate border-image-slice values', () => {
      const slices = ['0', '1', 'fill', '10', '20', '30']
      slices.forEach((s) => {
        const css = coral.generate([`border-image-slice-${s}`])
        expect(css).toContain('border-image-slice')
      })
    })

    it('should generate border-image-slice arbitrary', () => {
      const css = coral.generate(['border-image-slice-[15%]'])
      expect(css).toContain('border-image-slice: 15%')
    })

    it('should return null for border-image-slice with empty value', () => {
      const css = coral.generate(['border-image-slice-[]'])
      expect(css).not.toContain('border-image-slice: ;')
    })

    it('should generate border-image-width values', () => {
      const widths = ['0', '1', '2', 'auto']
      widths.forEach((w) => {
        const css = coral.generate([`border-image-width-${w}`])
        expect(css).toContain('border-image-width')
      })
    })

    it('should generate border-image-width arbitrary', () => {
      const css = coral.generate(['border-image-width-[5px]'])
      expect(css).toContain('border-image-width: 5px')
    })

    it('should return null for border-image-width with empty value', () => {
      const css = coral.generate(['border-image-width-[]'])
      expect(css).not.toContain('border-image-width: ;')
    })

    it('should generate border-image-outset values', () => {
      const outsets = ['0', '1', '2']
      outsets.forEach((o) => {
        const css = coral.generate([`border-image-outset-${o}`])
        expect(css).toContain('border-image-outset')
      })
    })

    it('should generate border-image-outset arbitrary', () => {
      const css = coral.generate(['border-image-outset-[10px]'])
      expect(css).toContain('border-image-outset: 10px')
    })

    it('should return null for border-image-outset with empty value', () => {
      const css = coral.generate(['border-image-outset-[]'])
      expect(css).not.toContain('border-image-outset: ;')
    })

    it('should generate border-image-repeat values', () => {
      const repeats = ['stretch', 'repeat', 'round', 'space']
      repeats.forEach((r) => {
        const css = coral.generate([`border-image-repeat-${r}`])
        expect(css).toContain('border-image-repeat')
        expect(css).toContain(r)
      })
    })

    it('should generate border-gradient-to-r', () => {
      const css = coral.generate(['border-gradient-to-r'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient(to right')
    })

    it('should generate border-gradient-to-b', () => {
      const css = coral.generate(['border-gradient-to-b'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient(to bottom')
    })

    it('should generate border-gradient-to-br', () => {
      const css = coral.generate(['border-gradient-to-br'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient(to bottom right')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('conic-gradient')
    })

    it('should generate border-image arbitrary', () => {
      const css = coral.generate(['border-image-[url(image.png)_30]'])
      expect(css).toContain('border-image')
    })

    it('should return null for border-image with empty value', () => {
      const css = coral.generate(['border-image-[]'])
      expect(css).not.toContain('border-image: ;')
    })
  })

  describe('Border Spacing', () => {
    it('should generate border-spacing values', () => {
      const values = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20']
      values.forEach((v) => {
        const css = coral.generate([`border-spacing-${v}`])
        expect(css).toContain('border-spacing')
      })
    })

    it('should generate border-spacing-x values', () => {
      const css = coral.generate(['border-spacing-x-4'])
      expect(css).toContain('border-spacing')
      expect(css).toContain('0')
    })

    it('should generate border-spacing-y values', () => {
      const css = coral.generate(['border-spacing-y-4'])
      expect(css).toContain('border-spacing')
      expect(css).toContain('0')
    })

    it('should generate border-spacing arbitrary', () => {
      const css = coral.generate(['border-spacing-[5px_10px]'])
      expect(css).toContain('border-spacing: 5px_10px')
    })

    it('should return null for border-spacing with empty value', () => {
      const css = coral.generate(['border-spacing-[]'])
      expect(css).not.toContain('border-spacing: ;')
    })

    it('should generate border-collapse', () => {
      const css = coral.generate(['border-collapse'])
      expect(css).toContain('border-collapse: collapse')
    })

    it('should generate border-separate', () => {
      const css = coral.generate(['border-separate'])
      expect(css).toContain('border-collapse: separate')
    })
  })

  describe('Text Emphasis', () => {
    it('should generate text-emphasis styles', () => {
      const styles = ['none', 'filled', 'open', 'dot', 'circle', 'double-circle', 'triangle', 'sesame']
      styles.forEach((s) => {
        const css = coral.generate([`text-emphasis-${s}`])
        expect(css).toContain('text-emphasis-style')
      })
    })

    it('should generate text-emphasis compound styles', () => {
      const compoundStyles = ['filled-dot', 'open-dot', 'filled-circle', 'open-circle', 'filled-triangle', 'open-triangle', 'filled-sesame', 'open-sesame']
      compoundStyles.forEach((s) => {
        const css = coral.generate([`text-emphasis-${s}`])
        expect(css).toContain('text-emphasis-style')
      })
    })

    it('should generate text-emphasis arbitrary', () => {
      const css = coral.generate(['text-emphasis-[★]'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('"★"')
    })

    it('should return null for text-emphasis with empty value', () => {
      const css = coral.generate(['text-emphasis-[]'])
      expect(css).not.toContain('text-emphasis-style: ""')
    })

    it('should generate text-emphasis-current', () => {
      const css = coral.generate(['text-emphasis-current'])
      expect(css).toContain('text-emphasis-color: currentColor')
    })

    it('should generate text-emphasis-transparent', () => {
      const css = coral.generate(['text-emphasis-transparent'])
      expect(css).toContain('text-emphasis-color: transparent')
    })

    it('should generate text-emphasis-color arbitrary', () => {
      const css = coral.generate(['text-emphasis-color-[red]'])
      expect(css).toContain('text-emphasis-color: red')
    })

    it('should return null for text-emphasis-color with empty value', () => {
      const css = coral.generate(['text-emphasis-color-[]'])
      expect(css).not.toContain('text-emphasis-color: ;')
    })

    it('should generate text-emphasis position utilities', () => {
      const positions = ['over', 'under', 'over-left', 'under-left']
      positions.forEach((p) => {
        const css = coral.generate([`text-emphasis-position-${p}`])
        expect(css).toContain('text-emphasis-position')
      })
    })
  })

  describe('Caption Side', () => {
    it('should generate caption-top', () => {
      const css = coral.generate(['caption-top'])
      expect(css).toContain('caption-side: top')
    })

    it('should generate caption-bottom', () => {
      const css = coral.generate(['caption-bottom'])
      expect(css).toContain('caption-side: bottom')
    })
  })

  describe('Table Layout', () => {
    it('should generate table-auto', () => {
      const css = coral.generate(['table-auto'])
      expect(css).toContain('table-layout: auto')
    })

    it('should generate table-fixed', () => {
      const css = coral.generate(['table-fixed'])
      expect(css).toContain('table-layout: fixed')
    })
  })

  describe('Empty Cells', () => {
    it('should generate empty-cells-show', () => {
      const css = coral.generate(['empty-cells-show'])
      expect(css).toContain('empty-cells: show')
    })

    it('should generate empty-cells-hide', () => {
      const css = coral.generate(['empty-cells-hide'])
      expect(css).toContain('empty-cells: hide')
    })
  })
})
