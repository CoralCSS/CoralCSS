/**
 * Tests for Grid Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { gridPlugin } from '../../../../../src/plugins/core/utilities/grid'
import type { Coral } from '../../../../../src/types'

describe('Grid Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(gridPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = gridPlugin()
      expect(plugin.name).toBe('grid')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Grid Template Columns', () => {
    it('should generate grid-cols-1 through grid-cols-12', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`grid-cols-${i}`])
        expect(css).toContain('grid-template-columns')
        expect(css).toContain(`repeat(${i}`)
      }
    })

    it('should generate grid-cols-none', () => {
      const css = coral.generate(['grid-cols-none'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('none')
    })

    it('should generate grid-cols-subgrid', () => {
      const css = coral.generate(['grid-cols-subgrid'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('subgrid')
    })

    it('should generate grid-cols arbitrary value', () => {
      const css = coral.generate(['grid-cols-[200px_1fr_200px]'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('200px_1fr_200px')
    })
  })

  describe('Grid Template Rows', () => {
    it('should generate grid-rows-1 through grid-rows-12', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`grid-rows-${i}`])
        expect(css).toContain('grid-template-rows')
        expect(css).toContain(`repeat(${i}`)
      }
    })

    it('should generate grid-rows-none', () => {
      const css = coral.generate(['grid-rows-none'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('none')
    })

    it('should generate grid-rows-subgrid', () => {
      const css = coral.generate(['grid-rows-subgrid'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('subgrid')
    })

    it('should generate grid-rows arbitrary value', () => {
      const css = coral.generate(['grid-rows-[auto_1fr_auto]'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('auto_1fr_auto')
    })
  })

  describe('Grid Column Span', () => {
    it('should generate col-auto', () => {
      const css = coral.generate(['col-auto'])
      expect(css).toContain('grid-column')
      expect(css).toContain('auto')
    })

    it('should generate col-span-1 through col-span-12', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`col-span-${i}`])
        expect(css).toContain('grid-column')
        expect(css).toContain(`span ${i}`)
      }
    })

    it('should generate col-span-full', () => {
      const css = coral.generate(['col-span-full'])
      expect(css).toContain('grid-column')
      expect(css).toContain('1 / -1')
    })

    it('should generate col arbitrary value', () => {
      const css = coral.generate(['col-[1/3]'])
      expect(css).toContain('grid-column')
      expect(css).toContain('1/3')
    })
  })

  describe('Grid Column Start/End', () => {
    it('should generate col-start-auto', () => {
      const css = coral.generate(['col-start-auto'])
      expect(css).toContain('grid-column-start')
      expect(css).toContain('auto')
    })

    it('should generate col-start-1 through col-start-13', () => {
      for (let i = 1; i <= 13; i++) {
        const css = coral.generate([`col-start-${i}`])
        expect(css).toContain('grid-column-start')
      }
    })

    it('should generate col-start arbitrary value', () => {
      const css = coral.generate(['col-start-[5]'])
      expect(css).toContain('grid-column-start')
      expect(css).toContain('5')
    })

    it('should generate col-end-auto', () => {
      const css = coral.generate(['col-end-auto'])
      expect(css).toContain('grid-column-end')
      expect(css).toContain('auto')
    })

    it('should generate col-end-1 through col-end-13', () => {
      for (let i = 1; i <= 13; i++) {
        const css = coral.generate([`col-end-${i}`])
        expect(css).toContain('grid-column-end')
      }
    })

    it('should generate col-end arbitrary value', () => {
      const css = coral.generate(['col-end-[7]'])
      expect(css).toContain('grid-column-end')
      expect(css).toContain('7')
    })
  })

  describe('Grid Row Span', () => {
    it('should generate row-auto', () => {
      const css = coral.generate(['row-auto'])
      expect(css).toContain('grid-row')
      expect(css).toContain('auto')
    })

    it('should generate row-span-1 through row-span-12', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`row-span-${i}`])
        expect(css).toContain('grid-row')
        expect(css).toContain(`span ${i}`)
      }
    })

    it('should generate row-span-full', () => {
      const css = coral.generate(['row-span-full'])
      expect(css).toContain('grid-row')
      expect(css).toContain('1 / -1')
    })

    it('should generate row arbitrary value', () => {
      const css = coral.generate(['row-[2/4]'])
      expect(css).toContain('grid-row')
      expect(css).toContain('2/4')
    })
  })

  describe('Grid Row Start/End', () => {
    it('should generate row-start-auto', () => {
      const css = coral.generate(['row-start-auto'])
      expect(css).toContain('grid-row-start')
      expect(css).toContain('auto')
    })

    it('should generate row-start-1 through row-start-13', () => {
      for (let i = 1; i <= 13; i++) {
        const css = coral.generate([`row-start-${i}`])
        expect(css).toContain('grid-row-start')
      }
    })

    it('should generate row-start arbitrary value', () => {
      const css = coral.generate(['row-start-[3]'])
      expect(css).toContain('grid-row-start')
      expect(css).toContain('3')
    })

    it('should generate row-end-auto', () => {
      const css = coral.generate(['row-end-auto'])
      expect(css).toContain('grid-row-end')
      expect(css).toContain('auto')
    })

    it('should generate row-end-1 through row-end-13', () => {
      for (let i = 1; i <= 13; i++) {
        const css = coral.generate([`row-end-${i}`])
        expect(css).toContain('grid-row-end')
      }
    })

    it('should generate row-end arbitrary value', () => {
      const css = coral.generate(['row-end-[5]'])
      expect(css).toContain('grid-row-end')
      expect(css).toContain('5')
    })
  })

  describe('Grid Auto Flow', () => {
    it('should generate grid-flow-row', () => {
      const css = coral.generate(['grid-flow-row'])
      expect(css).toContain('grid-auto-flow')
      expect(css).toContain('row')
    })

    it('should generate grid-flow-col', () => {
      const css = coral.generate(['grid-flow-col'])
      expect(css).toContain('grid-auto-flow')
      expect(css).toContain('column')
    })

    it('should generate grid-flow-dense', () => {
      const css = coral.generate(['grid-flow-dense'])
      expect(css).toContain('grid-auto-flow')
      expect(css).toContain('dense')
    })

    it('should generate grid-flow-row-dense', () => {
      const css = coral.generate(['grid-flow-row-dense'])
      expect(css).toContain('grid-auto-flow')
      expect(css).toContain('row dense')
    })

    it('should generate grid-flow-col-dense', () => {
      const css = coral.generate(['grid-flow-col-dense'])
      expect(css).toContain('grid-auto-flow')
      expect(css).toContain('column dense')
    })
  })

  describe('Grid Auto Columns', () => {
    it('should generate auto-cols-auto', () => {
      const css = coral.generate(['auto-cols-auto'])
      expect(css).toContain('grid-auto-columns')
      expect(css).toContain('auto')
    })

    it('should generate auto-cols-min', () => {
      const css = coral.generate(['auto-cols-min'])
      expect(css).toContain('grid-auto-columns')
      expect(css).toContain('min-content')
    })

    it('should generate auto-cols-max', () => {
      const css = coral.generate(['auto-cols-max'])
      expect(css).toContain('grid-auto-columns')
      expect(css).toContain('max-content')
    })

    it('should generate auto-cols-fr', () => {
      const css = coral.generate(['auto-cols-fr'])
      expect(css).toContain('grid-auto-columns')
      expect(css).toContain('minmax(0, 1fr)')
    })

    it('should generate auto-cols arbitrary value', () => {
      const css = coral.generate(['auto-cols-[200px]'])
      expect(css).toContain('grid-auto-columns')
      expect(css).toContain('200px')
    })
  })

  describe('Grid Auto Rows', () => {
    it('should generate auto-rows-auto', () => {
      const css = coral.generate(['auto-rows-auto'])
      expect(css).toContain('grid-auto-rows')
      expect(css).toContain('auto')
    })

    it('should generate auto-rows-min', () => {
      const css = coral.generate(['auto-rows-min'])
      expect(css).toContain('grid-auto-rows')
      expect(css).toContain('min-content')
    })

    it('should generate auto-rows-max', () => {
      const css = coral.generate(['auto-rows-max'])
      expect(css).toContain('grid-auto-rows')
      expect(css).toContain('max-content')
    })

    it('should generate auto-rows-fr', () => {
      const css = coral.generate(['auto-rows-fr'])
      expect(css).toContain('grid-auto-rows')
      expect(css).toContain('minmax(0, 1fr)')
    })

    it('should generate auto-rows arbitrary value', () => {
      const css = coral.generate(['auto-rows-[100px]'])
      expect(css).toContain('grid-auto-rows')
      expect(css).toContain('100px')
    })
  })

  describe('Grid Area', () => {
    it('should generate grid-area-auto', () => {
      const css = coral.generate(['grid-area-auto'])
      expect(css).toContain('grid-area')
      expect(css).toContain('auto')
    })

    it('should generate named grid areas', () => {
      const areas = ['header', 'sidebar', 'main', 'footer', 'content', 'nav', 'aside']
      for (const area of areas) {
        const css = coral.generate([`grid-area-${area}`])
        expect(css).toContain('grid-area')
        expect(css).toContain(area)
      }
    })

    it('should generate grid-area arbitrary value', () => {
      const css = coral.generate(['grid-area-[1/2/3/4]'])
      expect(css).toContain('grid-area')
      expect(css).toContain('1/2/3/4')
    })
  })

  describe('Grid Template Areas Layouts', () => {
    it('should generate grid-areas-holy-grail', () => {
      const css = coral.generate(['grid-areas-holy-grail'])
      expect(css).toContain('grid-template-areas')
      expect(css).toContain('header')
      expect(css).toContain('nav')
      expect(css).toContain('main')
      expect(css).toContain('footer')
    })

    it('should generate grid-areas-sidebar-left', () => {
      const css = coral.generate(['grid-areas-sidebar-left'])
      expect(css).toContain('grid-template-areas')
      expect(css).toContain('sidebar')
    })

    it('should generate grid-areas-sidebar-right', () => {
      const css = coral.generate(['grid-areas-sidebar-right'])
      expect(css).toContain('grid-template-areas')
      expect(css).toContain('sidebar')
    })

    it('should generate grid-areas-stack', () => {
      const css = coral.generate(['grid-areas-stack'])
      expect(css).toContain('grid-template-areas')
    })

    it('should generate grid-areas arbitrary value', () => {
      const css = coral.generate(['grid-areas-["a_a"_"b_c"]'])
      expect(css).toContain('grid-template-areas')
    })
  })

  describe('Masonry Layout', () => {
    it('should generate grid-rows-masonry', () => {
      const css = coral.generate(['grid-rows-masonry'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('masonry')
    })

    it('should generate grid-cols-masonry', () => {
      const css = coral.generate(['grid-cols-masonry'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('masonry')
    })

    it('should generate masonry-auto-flow-pack', () => {
      const css = coral.generate(['masonry-auto-flow-pack'])
      expect(css).toContain('masonry-auto-flow')
      expect(css).toContain('pack')
    })

    it('should generate masonry-auto-flow-next', () => {
      const css = coral.generate(['masonry-auto-flow-next'])
      expect(css).toContain('masonry-auto-flow')
      expect(css).toContain('next')
    })

    it('should generate masonry-auto-flow-ordered', () => {
      const css = coral.generate(['masonry-auto-flow-ordered'])
      expect(css).toContain('masonry-auto-flow')
      expect(css).toContain('ordered')
    })

    it('should generate masonry-auto-flow-definite-first', () => {
      const css = coral.generate(['masonry-auto-flow-definite-first'])
      expect(css).toContain('masonry-auto-flow')
      expect(css).toContain('definite-first')
    })
  })

  describe('Align/Justify Tracks', () => {
    it('should generate align-tracks utilities', () => {
      const values = ['start', 'end', 'center', 'stretch', 'baseline', 'space-between', 'space-around', 'space-evenly']
      for (const value of values) {
        const css = coral.generate([`align-tracks-${value}`])
        expect(css).toContain('align-tracks')
        expect(css).toContain(value)
      }
    })

    it('should generate justify-tracks utilities', () => {
      const values = ['start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly']
      for (const value of values) {
        const css = coral.generate([`justify-tracks-${value}`])
        expect(css).toContain('justify-tracks')
        expect(css).toContain(value)
      }
    })
  })

  describe('Auto-fit/Auto-fill', () => {
    it('should generate grid-cols-auto-fit with various sizes', () => {
      const sizes = ['100', '150', '200', '250', '300', '350', '400']
      for (const size of sizes) {
        const css = coral.generate([`grid-cols-auto-fit-${size}`])
        expect(css).toContain('grid-template-columns')
        expect(css).toContain('auto-fit')
        expect(css).toContain(`${size}px`)
      }
    })

    it('should generate grid-cols-auto-fill with various sizes', () => {
      const sizes = ['100', '150', '200', '250', '300', '350', '400']
      for (const size of sizes) {
        const css = coral.generate([`grid-cols-auto-fill-${size}`])
        expect(css).toContain('grid-template-columns')
        expect(css).toContain('auto-fill')
        expect(css).toContain(`${size}px`)
      }
    })

    it('should generate grid-cols-auto-fit arbitrary value', () => {
      const css = coral.generate(['grid-cols-auto-fit-[280px]'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('auto-fit')
      expect(css).toContain('280px')
    })

    it('should generate grid-cols-auto-fill arbitrary value', () => {
      const css = coral.generate(['grid-cols-auto-fill-[320px]'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('auto-fill')
      expect(css).toContain('320px')
    })
  })

  describe('Extended Span Utilities', () => {
    it('should generate col-span-to-end', () => {
      const css = coral.generate(['col-span-to-end'])
      expect(css).toContain('grid-column-end')
      expect(css).toContain('-1')
    })

    it('should generate row-span-to-end', () => {
      const css = coral.generate(['row-span-to-end'])
      expect(css).toContain('grid-row-end')
      expect(css).toContain('-1')
    })

    it('should generate negative column lines', () => {
      for (let i = 1; i <= 3; i++) {
        const startCss = coral.generate([`col-start--${i}`])
        expect(startCss).toContain('grid-column-start')
        expect(startCss).toContain(`-${i}`)

        const endCss = coral.generate([`col-end--${i}`])
        expect(endCss).toContain('grid-column-end')
        expect(endCss).toContain(`-${i}`)
      }
    })

    it('should generate negative row lines', () => {
      for (let i = 1; i <= 3; i++) {
        const startCss = coral.generate([`row-start--${i}`])
        expect(startCss).toContain('grid-row-start')
        expect(startCss).toContain(`-${i}`)

        const endCss = coral.generate([`row-end--${i}`])
        expect(endCss).toContain('grid-row-end')
        expect(endCss).toContain(`-${i}`)
      }
    })
  })

  describe('Grid Sizing Keywords', () => {
    it('should generate grid-cols-min', () => {
      const css = coral.generate(['grid-cols-min'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('min-content')
    })

    it('should generate grid-cols-max', () => {
      const css = coral.generate(['grid-cols-max'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('max-content')
    })

    it('should generate grid-cols-fit', () => {
      const css = coral.generate(['grid-cols-fit'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('fit-content')
    })

    it('should generate grid-rows-min', () => {
      const css = coral.generate(['grid-rows-min'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('min-content')
    })

    it('should generate grid-rows-max', () => {
      const css = coral.generate(['grid-rows-max'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('max-content')
    })

    it('should generate grid-rows-fit', () => {
      const css = coral.generate(['grid-rows-fit'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('fit-content')
    })
  })

  describe('Order', () => {
    it('should generate order-first', () => {
      const css = coral.generate(['order-first'])
      expect(css).toContain('order')
      expect(css).toContain('-9999')
    })

    it('should generate order-last', () => {
      const css = coral.generate(['order-last'])
      expect(css).toContain('order')
      expect(css).toContain('9999')
    })

    it('should generate order-none', () => {
      const css = coral.generate(['order-none'])
      expect(css).toContain('order')
      expect(css).toContain('0')
    })

    it('should generate order-1 through order-12', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`order-${i}`])
        expect(css).toContain('order')
      }
    })

    it('should generate negative order values', () => {
      for (let i = 1; i <= 12; i++) {
        const css = coral.generate([`-order-${i}`])
        expect(css).toContain('order')
        expect(css).toContain(`-${i}`)
      }
    })

    it('should generate order arbitrary value', () => {
      const css = coral.generate(['order-[99]'])
      expect(css).toContain('order')
      expect(css).toContain('99')
    })
  })

  describe('Gap Utilities', () => {
    it('should generate gap-inline utilities', () => {
      const values = ['0', '1', '2', '4', '8', '16']
      for (const value of values) {
        const css = coral.generate([`gap-inline-${value}`])
        expect(css).toContain('column-gap')
      }
    })

    it('should generate gap-block utilities', () => {
      const values = ['0', '1', '2', '4', '8', '16']
      for (const value of values) {
        const css = coral.generate([`gap-block-${value}`])
        expect(css).toContain('row-gap')
      }
    })

    it('should generate gap-inline arbitrary value', () => {
      const css = coral.generate(['gap-inline-[30px]'])
      expect(css).toContain('column-gap')
      expect(css).toContain('30px')
    })

    it('should generate gap-block arbitrary value', () => {
      const css = coral.generate(['gap-block-[20px]'])
      expect(css).toContain('row-gap')
      expect(css).toContain('20px')
    })
  })

  describe('Subgrid Utilities', () => {
    it('should generate subgrid', () => {
      const css = coral.generate(['subgrid'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('subgrid')
    })

    it('should generate subgrid-cols', () => {
      const css = coral.generate(['subgrid-cols'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('subgrid')
    })

    it('should generate subgrid-rows', () => {
      const css = coral.generate(['subgrid-rows'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('subgrid')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/grid'
      )
      expect(defaultExport).toBe(gridPlugin)
    })
  })
})
