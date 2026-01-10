/**
 * Tests for Flexbox Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { flexboxPlugin } from '../../../../../src/plugins/core/utilities/flexbox'
import type { Coral } from '../../../../../src/types'

describe('Flexbox Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(flexboxPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = flexboxPlugin()
      expect(plugin.name).toBe('flexbox')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Flex Basis', () => {
    it('should generate basis-auto', () => {
      const css = coral.generate(['basis-auto'])
      expect(css).toContain('flex-basis')
      expect(css).toContain('auto')
    })

    it('should generate basis-0', () => {
      const css = coral.generate(['basis-0'])
      expect(css).toContain('flex-basis')
      expect(css).toContain('0')
    })

    it('should generate basis-full', () => {
      const css = coral.generate(['basis-full'])
      expect(css).toContain('flex-basis')
      expect(css).toContain('100%')
    })

    it('should generate basis-1/2', () => {
      const css = coral.generate(['basis-1/2'])
      expect(css).toContain('flex-basis')
    })

    it('should generate basis-1/3 and basis-2/3', () => {
      const css1 = coral.generate(['basis-1/3'])
      expect(css1).toContain('flex-basis')
      const css2 = coral.generate(['basis-2/3'])
      expect(css2).toContain('flex-basis')
    })

    it('should generate basis-1/4 and basis-3/4', () => {
      const css1 = coral.generate(['basis-1/4'])
      expect(css1).toContain('flex-basis')
      const css2 = coral.generate(['basis-3/4'])
      expect(css2).toContain('flex-basis')
    })

    it('should generate basis arbitrary value', () => {
      const css = coral.generate(['basis-[200px]'])
      expect(css).toContain('flex-basis')
      expect(css).toContain('200px')
    })

    it('should generate basis arbitrary value with calc', () => {
      const css = coral.generate(['basis-[calc(100%-2rem)]'])
      expect(css).toContain('flex-basis')
      expect(css).toContain('calc')
    })
  })

  describe('Flex Direction', () => {
    it('should generate flex-row', () => {
      const css = coral.generate(['flex-row'])
      expect(css).toContain('flex-direction')
      expect(css).toContain('row')
    })

    it('should generate flex-row-reverse', () => {
      const css = coral.generate(['flex-row-reverse'])
      expect(css).toContain('flex-direction')
      expect(css).toContain('row-reverse')
    })

    it('should generate flex-col', () => {
      const css = coral.generate(['flex-col'])
      expect(css).toContain('flex-direction')
      expect(css).toContain('column')
    })

    it('should generate flex-col-reverse', () => {
      const css = coral.generate(['flex-col-reverse'])
      expect(css).toContain('flex-direction')
      expect(css).toContain('column-reverse')
    })
  })

  describe('Flex Wrap', () => {
    it('should generate flex-wrap', () => {
      const css = coral.generate(['flex-wrap'])
      expect(css).toContain('flex-wrap')
      expect(css).toContain('wrap')
    })

    it('should generate flex-wrap-reverse', () => {
      const css = coral.generate(['flex-wrap-reverse'])
      expect(css).toContain('flex-wrap')
      expect(css).toContain('wrap-reverse')
    })

    it('should generate flex-nowrap', () => {
      const css = coral.generate(['flex-nowrap'])
      expect(css).toContain('flex-wrap')
      expect(css).toContain('nowrap')
    })
  })

  describe('Flex', () => {
    it('should generate flex-1', () => {
      const css = coral.generate(['flex-1'])
      expect(css).toContain('flex')
      expect(css).toContain('1 1 0%')
    })

    it('should generate flex-auto', () => {
      const css = coral.generate(['flex-auto'])
      expect(css).toContain('flex')
      expect(css).toContain('1 1 auto')
    })

    it('should generate flex-initial', () => {
      const css = coral.generate(['flex-initial'])
      expect(css).toContain('flex')
      expect(css).toContain('0 1 auto')
    })

    it('should generate flex-none', () => {
      const css = coral.generate(['flex-none'])
      expect(css).toContain('flex')
      expect(css).toContain('none')
    })

    it('should generate flex arbitrary value', () => {
      const css = coral.generate(['flex-[2_2_0%]'])
      expect(css).toContain('flex')
      expect(css).toContain('2_2_0%')
    })
  })

  describe('Flex Grow', () => {
    it('should generate grow', () => {
      const css = coral.generate(['grow'])
      expect(css).toContain('flex-grow')
      expect(css).toContain('1')
    })

    it('should generate grow-0', () => {
      const css = coral.generate(['grow-0'])
      expect(css).toContain('flex-grow')
      expect(css).toContain('0')
    })

    it('should generate grow arbitrary value', () => {
      const css = coral.generate(['grow-[2]'])
      expect(css).toContain('flex-grow')
      expect(css).toContain('2')
    })
  })

  describe('Flex Shrink', () => {
    it('should generate shrink', () => {
      const css = coral.generate(['shrink'])
      expect(css).toContain('flex-shrink')
      expect(css).toContain('1')
    })

    it('should generate shrink-0', () => {
      const css = coral.generate(['shrink-0'])
      expect(css).toContain('flex-shrink')
      expect(css).toContain('0')
    })

    it('should generate shrink arbitrary value', () => {
      const css = coral.generate(['shrink-[2]'])
      expect(css).toContain('flex-shrink')
      expect(css).toContain('2')
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

    it('should generate order arbitrary value', () => {
      const css = coral.generate(['order-[99]'])
      expect(css).toContain('order')
      expect(css).toContain('99')
    })
  })

  describe('Justify Content', () => {
    it('should generate justify-normal', () => {
      const css = coral.generate(['justify-normal'])
      expect(css).toContain('justify-content')
      expect(css).toContain('normal')
    })

    it('should generate justify-start', () => {
      const css = coral.generate(['justify-start'])
      expect(css).toContain('justify-content')
      expect(css).toContain('flex-start')
    })

    it('should generate justify-end', () => {
      const css = coral.generate(['justify-end'])
      expect(css).toContain('justify-content')
      expect(css).toContain('flex-end')
    })

    it('should generate justify-center', () => {
      const css = coral.generate(['justify-center'])
      expect(css).toContain('justify-content')
      expect(css).toContain('center')
    })

    it('should generate justify-between', () => {
      const css = coral.generate(['justify-between'])
      expect(css).toContain('justify-content')
      expect(css).toContain('space-between')
    })

    it('should generate justify-around', () => {
      const css = coral.generate(['justify-around'])
      expect(css).toContain('justify-content')
      expect(css).toContain('space-around')
    })

    it('should generate justify-evenly', () => {
      const css = coral.generate(['justify-evenly'])
      expect(css).toContain('justify-content')
      expect(css).toContain('space-evenly')
    })

    it('should generate justify-stretch', () => {
      const css = coral.generate(['justify-stretch'])
      expect(css).toContain('justify-content')
      expect(css).toContain('stretch')
    })
  })

  describe('Justify Items', () => {
    it('should generate justify-items-start', () => {
      const css = coral.generate(['justify-items-start'])
      expect(css).toContain('justify-items')
      expect(css).toContain('start')
    })

    it('should generate justify-items-end', () => {
      const css = coral.generate(['justify-items-end'])
      expect(css).toContain('justify-items')
      expect(css).toContain('end')
    })

    it('should generate justify-items-center', () => {
      const css = coral.generate(['justify-items-center'])
      expect(css).toContain('justify-items')
      expect(css).toContain('center')
    })

    it('should generate justify-items-stretch', () => {
      const css = coral.generate(['justify-items-stretch'])
      expect(css).toContain('justify-items')
      expect(css).toContain('stretch')
    })
  })

  describe('Justify Self', () => {
    it('should generate justify-self-auto', () => {
      const css = coral.generate(['justify-self-auto'])
      expect(css).toContain('justify-self')
      expect(css).toContain('auto')
    })

    it('should generate justify-self-start', () => {
      const css = coral.generate(['justify-self-start'])
      expect(css).toContain('justify-self')
      expect(css).toContain('start')
    })

    it('should generate justify-self-end', () => {
      const css = coral.generate(['justify-self-end'])
      expect(css).toContain('justify-self')
      expect(css).toContain('end')
    })

    it('should generate justify-self-center', () => {
      const css = coral.generate(['justify-self-center'])
      expect(css).toContain('justify-self')
      expect(css).toContain('center')
    })

    it('should generate justify-self-stretch', () => {
      const css = coral.generate(['justify-self-stretch'])
      expect(css).toContain('justify-self')
      expect(css).toContain('stretch')
    })
  })

  describe('Align Content', () => {
    it('should generate content-normal', () => {
      const css = coral.generate(['content-normal'])
      expect(css).toContain('align-content')
      expect(css).toContain('normal')
    })

    it('should generate content-center', () => {
      const css = coral.generate(['content-center'])
      expect(css).toContain('align-content')
      expect(css).toContain('center')
    })

    it('should generate content-start', () => {
      const css = coral.generate(['content-start'])
      expect(css).toContain('align-content')
      expect(css).toContain('flex-start')
    })

    it('should generate content-end', () => {
      const css = coral.generate(['content-end'])
      expect(css).toContain('align-content')
      expect(css).toContain('flex-end')
    })

    it('should generate content-between', () => {
      const css = coral.generate(['content-between'])
      expect(css).toContain('align-content')
      expect(css).toContain('space-between')
    })

    it('should generate content-around', () => {
      const css = coral.generate(['content-around'])
      expect(css).toContain('align-content')
      expect(css).toContain('space-around')
    })

    it('should generate content-evenly', () => {
      const css = coral.generate(['content-evenly'])
      expect(css).toContain('align-content')
      expect(css).toContain('space-evenly')
    })

    it('should generate content-baseline', () => {
      const css = coral.generate(['content-baseline'])
      expect(css).toContain('align-content')
      expect(css).toContain('baseline')
    })

    it('should generate content-stretch', () => {
      const css = coral.generate(['content-stretch'])
      expect(css).toContain('align-content')
      expect(css).toContain('stretch')
    })
  })

  describe('Align Items', () => {
    it('should generate items-start', () => {
      const css = coral.generate(['items-start'])
      expect(css).toContain('align-items')
      expect(css).toContain('flex-start')
    })

    it('should generate items-end', () => {
      const css = coral.generate(['items-end'])
      expect(css).toContain('align-items')
      expect(css).toContain('flex-end')
    })

    it('should generate items-center', () => {
      const css = coral.generate(['items-center'])
      expect(css).toContain('align-items')
      expect(css).toContain('center')
    })

    it('should generate items-baseline', () => {
      const css = coral.generate(['items-baseline'])
      expect(css).toContain('align-items')
      expect(css).toContain('baseline')
    })

    it('should generate items-stretch', () => {
      const css = coral.generate(['items-stretch'])
      expect(css).toContain('align-items')
      expect(css).toContain('stretch')
    })
  })

  describe('Align Self', () => {
    it('should generate self-auto', () => {
      const css = coral.generate(['self-auto'])
      expect(css).toContain('align-self')
      expect(css).toContain('auto')
    })

    it('should generate self-start', () => {
      const css = coral.generate(['self-start'])
      expect(css).toContain('align-self')
      expect(css).toContain('flex-start')
    })

    it('should generate self-end', () => {
      const css = coral.generate(['self-end'])
      expect(css).toContain('align-self')
      expect(css).toContain('flex-end')
    })

    it('should generate self-center', () => {
      const css = coral.generate(['self-center'])
      expect(css).toContain('align-self')
      expect(css).toContain('center')
    })

    it('should generate self-stretch', () => {
      const css = coral.generate(['self-stretch'])
      expect(css).toContain('align-self')
      expect(css).toContain('stretch')
    })

    it('should generate self-baseline', () => {
      const css = coral.generate(['self-baseline'])
      expect(css).toContain('align-self')
      expect(css).toContain('baseline')
    })
  })

  describe('Place Content', () => {
    it('should generate place-content-center', () => {
      const css = coral.generate(['place-content-center'])
      expect(css).toContain('place-content')
      expect(css).toContain('center')
    })

    it('should generate place-content-start', () => {
      const css = coral.generate(['place-content-start'])
      expect(css).toContain('place-content')
      expect(css).toContain('start')
    })

    it('should generate place-content-end', () => {
      const css = coral.generate(['place-content-end'])
      expect(css).toContain('place-content')
      expect(css).toContain('end')
    })

    it('should generate place-content-between', () => {
      const css = coral.generate(['place-content-between'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-between')
    })

    it('should generate place-content-around', () => {
      const css = coral.generate(['place-content-around'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-around')
    })

    it('should generate place-content-evenly', () => {
      const css = coral.generate(['place-content-evenly'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-evenly')
    })

    it('should generate place-content-baseline', () => {
      const css = coral.generate(['place-content-baseline'])
      expect(css).toContain('place-content')
      expect(css).toContain('baseline')
    })

    it('should generate place-content-stretch', () => {
      const css = coral.generate(['place-content-stretch'])
      expect(css).toContain('place-content')
      expect(css).toContain('stretch')
    })
  })

  describe('Place Items', () => {
    it('should generate place-items-start', () => {
      const css = coral.generate(['place-items-start'])
      expect(css).toContain('place-items')
      expect(css).toContain('start')
    })

    it('should generate place-items-end', () => {
      const css = coral.generate(['place-items-end'])
      expect(css).toContain('place-items')
      expect(css).toContain('end')
    })

    it('should generate place-items-center', () => {
      const css = coral.generate(['place-items-center'])
      expect(css).toContain('place-items')
      expect(css).toContain('center')
    })

    it('should generate place-items-baseline', () => {
      const css = coral.generate(['place-items-baseline'])
      expect(css).toContain('place-items')
      expect(css).toContain('baseline')
    })

    it('should generate place-items-stretch', () => {
      const css = coral.generate(['place-items-stretch'])
      expect(css).toContain('place-items')
      expect(css).toContain('stretch')
    })
  })

  describe('Place Self', () => {
    it('should generate place-self-auto', () => {
      const css = coral.generate(['place-self-auto'])
      expect(css).toContain('place-self')
      expect(css).toContain('auto')
    })

    it('should generate place-self-start', () => {
      const css = coral.generate(['place-self-start'])
      expect(css).toContain('place-self')
      expect(css).toContain('start')
    })

    it('should generate place-self-end', () => {
      const css = coral.generate(['place-self-end'])
      expect(css).toContain('place-self')
      expect(css).toContain('end')
    })

    it('should generate place-self-center', () => {
      const css = coral.generate(['place-self-center'])
      expect(css).toContain('place-self')
      expect(css).toContain('center')
    })

    it('should generate place-self-stretch', () => {
      const css = coral.generate(['place-self-stretch'])
      expect(css).toContain('place-self')
      expect(css).toContain('stretch')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/flexbox'
      )
      expect(defaultExport).toBe(flexboxPlugin)
    })
  })
})
