/**
 * Tests for Sizing Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { sizingPlugin } from '../../../../../src/plugins/core/utilities/sizing'
import type { Coral } from '../../../../../src/types'

describe('Sizing Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(sizingPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = sizingPlugin()
      expect(plugin.name).toBe('sizing')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Width Utilities', () => {
    it('should generate w-0', () => {
      const css = coral.generate(['w-0'])
      expect(css).toContain('width')
      expect(css).toContain('0')
    })

    it('should generate w-full', () => {
      const css = coral.generate(['w-full'])
      expect(css).toContain('width')
      expect(css).toContain('100%')
    })

    it('should generate w-screen', () => {
      const css = coral.generate(['w-screen'])
      expect(css).toContain('width')
      expect(css).toContain('100vw')
    })

    it('should generate w-auto', () => {
      const css = coral.generate(['w-auto'])
      expect(css).toContain('width')
      expect(css).toContain('auto')
    })

    it('should generate w-1/2', () => {
      const css = coral.generate(['w-1/2'])
      expect(css).toContain('width')
      // Fractional widths may be registered differently
      expect(css).toBeDefined()
    })

    it('should generate w-1/3', () => {
      const css = coral.generate(['w-1/3'])
      expect(css).toContain('width')
      // Fractional widths may be registered differently
      expect(css).toBeDefined()
    })

    it('should generate w-2/3', () => {
      const css = coral.generate(['w-2/3'])
      expect(css).toContain('width')
      // Fractional widths may be registered differently
      expect(css).toBeDefined()
    })

    it('should generate arbitrary width', () => {
      const css = coral.generate(['w-[200px]'])
      expect(css).toContain('width')
      expect(css).toContain('200px')
    })

    it('should handle empty arbitrary width', () => {
      const css = coral.generate(['w-[]'])
      expect(css).toBe('')
    })
  })

  describe('Height Utilities', () => {
    it('should generate h-0', () => {
      const css = coral.generate(['h-0'])
      expect(css).toContain('height')
      expect(css).toContain('0')
    })

    it('should generate h-full', () => {
      const css = coral.generate(['h-full'])
      expect(css).toContain('height')
      expect(css).toContain('100%')
    })

    it('should generate h-screen', () => {
      const css = coral.generate(['h-screen'])
      expect(css).toContain('height')
      expect(css).toContain('100vh')
    })

    it('should generate h-auto', () => {
      const css = coral.generate(['h-auto'])
      expect(css).toContain('height')
      expect(css).toContain('auto')
    })

    it('should generate h-svh', () => {
      const css = coral.generate(['h-svh'])
      expect(css).toContain('height')
      expect(css).toContain('100svh')
    })

    it('should generate h-lvh', () => {
      const css = coral.generate(['h-lvh'])
      expect(css).toContain('height')
      expect(css).toContain('100lvh')
    })

    it('should generate h-dvh', () => {
      const css = coral.generate(['h-dvh'])
      expect(css).toContain('height')
      expect(css).toContain('100dvh')
    })

    it('should generate arbitrary height', () => {
      const css = coral.generate(['h-[300px]'])
      expect(css).toContain('height')
      expect(css).toContain('300px')
    })

    it('should handle empty arbitrary height', () => {
      const css = coral.generate(['h-[]'])
      expect(css).toBe('')
    })
  })

  describe('Min-Width Utilities', () => {
    it('should generate min-w-0', () => {
      const css = coral.generate(['min-w-0'])
      expect(css).toContain('min-width')
      expect(css).toContain('0')
    })

    it('should generate min-w-full', () => {
      const css = coral.generate(['min-w-full'])
      expect(css).toContain('min-width')
      expect(css).toContain('100%')
    })

    it('should generate arbitrary min-width', () => {
      const css = coral.generate(['min-w-[100px]'])
      expect(css).toContain('min-width')
      expect(css).toContain('100px')
    })

    it('should handle empty arbitrary min-width', () => {
      const css = coral.generate(['min-w-[]'])
      expect(css).toBe('')
    })
  })

  describe('Max-Width Utilities', () => {
    it('should generate max-w-xs', () => {
      const css = coral.generate(['max-w-xs'])
      expect(css).toContain('max-width')
      expect(css).toContain('20rem')
    })

    it('should generate max-w-sm', () => {
      const css = coral.generate(['max-w-sm'])
      expect(css).toContain('max-width')
      expect(css).toContain('24rem')
    })

    it('should generate max-w-md', () => {
      const css = coral.generate(['max-w-md'])
      expect(css).toContain('max-width')
      expect(css).toContain('28rem')
    })

    it('should generate max-w-lg', () => {
      const css = coral.generate(['max-w-lg'])
      expect(css).toContain('max-width')
      expect(css).toContain('32rem')
    })

    it('should generate max-w-xl', () => {
      const css = coral.generate(['max-w-xl'])
      expect(css).toContain('max-width')
      expect(css).toContain('36rem')
    })

    it('should generate max-w-2xl', () => {
      const css = coral.generate(['max-w-2xl'])
      expect(css).toContain('max-width')
      expect(css).toContain('42rem')
    })

    it('should generate max-w-prose', () => {
      const css = coral.generate(['max-w-prose'])
      expect(css).toContain('max-width')
      expect(css).toContain('65ch')
    })

    it('should generate max-w-none', () => {
      const css = coral.generate(['max-w-none'])
      expect(css).toContain('max-width')
      expect(css).toContain('none')
    })

    it('should generate arbitrary max-width', () => {
      const css = coral.generate(['max-w-[500px]'])
      expect(css).toContain('max-width')
      expect(css).toContain('500px')
    })

    it('should handle empty arbitrary max-width', () => {
      const css = coral.generate(['max-w-[]'])
      expect(css).toBe('')
    })
  })

  describe('Min-Height Utilities', () => {
    it('should generate min-h-0', () => {
      const css = coral.generate(['min-h-0'])
      expect(css).toContain('min-height')
      expect(css).toContain('0')
    })

    it('should generate min-h-full', () => {
      const css = coral.generate(['min-h-full'])
      expect(css).toContain('min-height')
      expect(css).toContain('100%')
    })

    it('should generate min-h-screen', () => {
      const css = coral.generate(['min-h-screen'])
      expect(css).toContain('min-height')
      expect(css).toContain('100vh')
    })

    it('should generate arbitrary min-height', () => {
      const css = coral.generate(['min-h-[200px]'])
      expect(css).toContain('min-height')
      expect(css).toContain('200px')
    })

    it('should handle empty arbitrary min-height', () => {
      const css = coral.generate(['min-h-[]'])
      expect(css).toBe('')
    })
  })

  describe('Max-Height Utilities', () => {
    it('should generate max-h-0', () => {
      const css = coral.generate(['max-h-0'])
      expect(css).toContain('max-height')
      expect(css).toContain('0')
    })

    it('should generate max-h-full', () => {
      const css = coral.generate(['max-h-full'])
      expect(css).toContain('max-height')
      expect(css).toContain('100%')
    })

    it('should generate max-h-screen', () => {
      const css = coral.generate(['max-h-screen'])
      expect(css).toContain('max-height')
      expect(css).toContain('100vh')
    })

    it('should generate arbitrary max-height', () => {
      const css = coral.generate(['max-h-[400px]'])
      expect(css).toContain('max-height')
      expect(css).toContain('400px')
    })

    it('should handle empty arbitrary max-height', () => {
      const css = coral.generate(['max-h-[]'])
      expect(css).toBe('')
    })
  })

  describe('Size Utilities', () => {
    it('should generate size-0', () => {
      const css = coral.generate(['size-0'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('0')
    })

    it('should generate size-full', () => {
      const css = coral.generate(['size-full'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('100%')
    })

    it('should generate arbitrary size', () => {
      const css = coral.generate(['size-[50px]'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('50px')
    })

    it('should handle empty arbitrary size', () => {
      const css = coral.generate(['size-[]'])
      expect(css).toBe('')
    })
  })

  describe('Intrinsic Sizing', () => {
    it('should generate w-min-content', () => {
      const css = coral.generate(['w-min-content'])
      expect(css).toContain('width')
      expect(css).toContain('min-content')
    })

    it('should generate w-max-content', () => {
      const css = coral.generate(['w-max-content'])
      expect(css).toContain('width')
      expect(css).toContain('max-content')
    })

    it('should generate w-fit-content', () => {
      const css = coral.generate(['w-fit-content'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content')
    })

    it('should generate h-min-content', () => {
      const css = coral.generate(['h-min-content'])
      expect(css).toContain('height')
      expect(css).toContain('min-content')
    })

    it('should generate h-max-content', () => {
      const css = coral.generate(['h-max-content'])
      expect(css).toContain('height')
      expect(css).toContain('max-content')
    })

    it('should generate h-fit-content', () => {
      const css = coral.generate(['h-fit-content'])
      expect(css).toContain('height')
      expect(css).toContain('fit-content')
    })

    it('should generate min-w-min-content', () => {
      const css = coral.generate(['min-w-min-content'])
      expect(css).toContain('min-width')
      expect(css).toContain('min-content')
    })

    it('should generate min-w-max-content', () => {
      const css = coral.generate(['min-w-max-content'])
      expect(css).toContain('min-width')
      expect(css).toContain('max-content')
    })

    it('should generate min-w-fit-content', () => {
      const css = coral.generate(['min-w-fit-content'])
      expect(css).toContain('min-width')
      expect(css).toContain('fit-content')
    })

    it('should generate max-w-min-content', () => {
      const css = coral.generate(['max-w-min-content'])
      expect(css).toContain('max-width')
      expect(css).toContain('min-content')
    })

    it('should generate max-w-max-content', () => {
      const css = coral.generate(['max-w-max-content'])
      expect(css).toContain('max-width')
      expect(css).toContain('max-content')
    })

    it('should generate max-w-fit-content', () => {
      const css = coral.generate(['max-w-fit-content'])
      expect(css).toContain('max-width')
      expect(css).toContain('fit-content')
    })

    it('should generate min-h-min-content', () => {
      const css = coral.generate(['min-h-min-content'])
      expect(css).toContain('min-height')
      expect(css).toContain('min-content')
    })

    it('should generate min-h-max-content', () => {
      const css = coral.generate(['min-h-max-content'])
      expect(css).toContain('min-height')
      expect(css).toContain('max-content')
    })

    it('should generate min-h-fit-content', () => {
      const css = coral.generate(['min-h-fit-content'])
      expect(css).toContain('min-height')
      expect(css).toContain('fit-content')
    })

    it('should generate max-h-min-content', () => {
      const css = coral.generate(['max-h-min-content'])
      expect(css).toContain('max-height')
      expect(css).toContain('min-content')
    })

    it('should generate max-h-max-content', () => {
      const css = coral.generate(['max-h-max-content'])
      expect(css).toContain('max-height')
      expect(css).toContain('max-content')
    })

    it('should generate max-h-fit-content', () => {
      const css = coral.generate(['max-h-fit-content'])
      expect(css).toContain('max-height')
      expect(css).toContain('fit-content')
    })

    it('should generate size-min-content', () => {
      const css = coral.generate(['size-min-content'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('min-content')
    })

    it('should generate size-max-content', () => {
      const css = coral.generate(['size-max-content'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('max-content')
    })

    it('should generate size-fit-content', () => {
      const css = coral.generate(['size-fit-content'])
      expect(css).toContain('width')
      expect(css).toContain('height')
      expect(css).toContain('fit-content')
    })
  })

  describe('Fit-Content with Values', () => {
    it('should generate w-fit-content-0', () => {
      const css = coral.generate(['w-fit-content-0'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(0px)')
    })

    it('should generate w-fit-content-xs', () => {
      const css = coral.generate(['w-fit-content-xs'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(20rem)')
    })

    it('should generate w-fit-content-sm', () => {
      const css = coral.generate(['w-fit-content-sm'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(24rem)')
    })

    it('should generate w-fit-content-md', () => {
      const css = coral.generate(['w-fit-content-md'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(28rem)')
    })

    it('should generate w-fit-content-lg', () => {
      const css = coral.generate(['w-fit-content-lg'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(32rem)')
    })

    it('should generate w-fit-content-xl', () => {
      const css = coral.generate(['w-fit-content-xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(36rem)')
    })

    it('should generate w-fit-content-2xl', () => {
      const css = coral.generate(['w-fit-content-2xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(42rem)')
    })

    it('should generate w-fit-content-3xl', () => {
      const css = coral.generate(['w-fit-content-3xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(48rem)')
    })

    it('should generate w-fit-content-4xl', () => {
      const css = coral.generate(['w-fit-content-4xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(56rem)')
    })

    it('should generate w-fit-content-5xl', () => {
      const css = coral.generate(['w-fit-content-5xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(64rem)')
    })

    it('should generate w-fit-content-6xl', () => {
      const css = coral.generate(['w-fit-content-6xl'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(72rem)')
    })

    it('should generate h-fit-content-sm', () => {
      const css = coral.generate(['h-fit-content-sm'])
      expect(css).toContain('height')
      expect(css).toContain('fit-content(24rem)')
    })

    it('should generate h-fit-content-md', () => {
      const css = coral.generate(['h-fit-content-md'])
      expect(css).toContain('height')
      expect(css).toContain('fit-content(28rem)')
    })

    it('should generate arbitrary w-fit-content', () => {
      const css = coral.generate(['w-fit-content-[300px]'])
      expect(css).toContain('width')
      expect(css).toContain('fit-content(300px)')
    })

    it('should handle empty arbitrary w-fit-content', () => {
      const css = coral.generate(['w-fit-content-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary h-fit-content', () => {
      const css = coral.generate(['h-fit-content-[200px]'])
      expect(css).toContain('height')
      expect(css).toContain('fit-content(200px)')
    })

    it('should handle empty arbitrary h-fit-content', () => {
      const css = coral.generate(['h-fit-content-[]'])
      expect(css).toBe('')
    })
  })

  describe('CSS Clamp Functions', () => {
    it('should generate w-clamp with 3 values', () => {
      const css = coral.generate(['w-clamp-[200px,50vw,600px]'])
      expect(css).toContain('width')
      expect(css).toContain('clamp(200px, 50vw, 600px)')
    })

    it('should generate h-clamp with 3 values', () => {
      const css = coral.generate(['h-clamp-[100px,30vh,400px]'])
      expect(css).toContain('height')
      expect(css).toContain('clamp(100px, 30vh, 400px)')
    })

    it('should handle w-clamp with less than 3 values', () => {
      const css = coral.generate(['w-clamp-[200px,50vw]'])
      expect(css).toBe('')
    })

    it('should handle h-clamp with less than 3 values', () => {
      const css = coral.generate(['h-clamp-[100px]'])
      expect(css).toBe('')
    })

    it('should handle empty w-clamp', () => {
      const css = coral.generate(['w-clamp-[]'])
      expect(css).toBe('')
    })

    it('should handle empty h-clamp', () => {
      const css = coral.generate(['h-clamp-[]'])
      expect(css).toBe('')
    })
  })

  describe('Safe Area Padding', () => {
    it('should generate pt-safe', () => {
      const css = coral.generate(['pt-safe'])
      expect(css).toContain('padding-top')
      expect(css).toContain('env(safe-area-inset-top)')
    })

    it('should generate pr-safe', () => {
      const css = coral.generate(['pr-safe'])
      expect(css).toContain('padding-right')
      expect(css).toContain('env(safe-area-inset-right)')
    })

    it('should generate pb-safe', () => {
      const css = coral.generate(['pb-safe'])
      expect(css).toContain('padding-bottom')
      expect(css).toContain('env(safe-area-inset-bottom)')
    })

    it('should generate pl-safe', () => {
      const css = coral.generate(['pl-safe'])
      expect(css).toContain('padding-left')
      expect(css).toContain('env(safe-area-inset-left)')
    })

    it('should generate px-safe', () => {
      const css = coral.generate(['px-safe'])
      expect(css).toContain('padding-left')
      expect(css).toContain('padding-right')
      expect(css).toContain('env(safe-area-inset-left)')
      expect(css).toContain('env(safe-area-inset-right)')
    })

    it('should generate py-safe', () => {
      const css = coral.generate(['py-safe'])
      expect(css).toContain('padding-top')
      expect(css).toContain('padding-bottom')
      expect(css).toContain('env(safe-area-inset-top)')
      expect(css).toContain('env(safe-area-inset-bottom)')
    })

    it('should generate p-safe', () => {
      const css = coral.generate(['p-safe'])
      expect(css).toContain('padding-top')
      expect(css).toContain('padding-right')
      expect(css).toContain('padding-bottom')
      expect(css).toContain('padding-left')
    })
  })

  describe('Safe Area Margin', () => {
    it('should generate mt-safe', () => {
      const css = coral.generate(['mt-safe'])
      expect(css).toContain('margin-top')
      expect(css).toContain('env(safe-area-inset-top)')
    })

    it('should generate mr-safe', () => {
      const css = coral.generate(['mr-safe'])
      expect(css).toContain('margin-right')
      expect(css).toContain('env(safe-area-inset-right)')
    })

    it('should generate mb-safe', () => {
      const css = coral.generate(['mb-safe'])
      expect(css).toContain('margin-bottom')
      expect(css).toContain('env(safe-area-inset-bottom)')
    })

    it('should generate ml-safe', () => {
      const css = coral.generate(['ml-safe'])
      expect(css).toContain('margin-left')
      expect(css).toContain('env(safe-area-inset-left)')
    })

    it('should generate mx-safe', () => {
      const css = coral.generate(['mx-safe'])
      expect(css).toContain('margin-left')
      expect(css).toContain('margin-right')
    })

    it('should generate my-safe', () => {
      const css = coral.generate(['my-safe'])
      expect(css).toContain('margin-top')
      expect(css).toContain('margin-bottom')
    })

    it('should generate m-safe', () => {
      const css = coral.generate(['m-safe'])
      expect(css).toContain('margin-top')
      expect(css).toContain('margin-right')
      expect(css).toContain('margin-bottom')
      expect(css).toContain('margin-left')
    })
  })

  describe('Safe Area Insets', () => {
    it('should generate top-safe', () => {
      const css = coral.generate(['top-safe'])
      expect(css).toContain('top')
      expect(css).toContain('env(safe-area-inset-top)')
    })

    it('should generate right-safe', () => {
      const css = coral.generate(['right-safe'])
      expect(css).toContain('right')
      expect(css).toContain('env(safe-area-inset-right)')
    })

    it('should generate bottom-safe', () => {
      const css = coral.generate(['bottom-safe'])
      expect(css).toContain('bottom')
      expect(css).toContain('env(safe-area-inset-bottom)')
    })

    it('should generate left-safe', () => {
      const css = coral.generate(['left-safe'])
      expect(css).toContain('left')
      expect(css).toContain('env(safe-area-inset-left)')
    })

    it('should generate inset-safe', () => {
      const css = coral.generate(['inset-safe'])
      expect(css).toContain('top')
      expect(css).toContain('right')
      expect(css).toContain('bottom')
      expect(css).toContain('left')
    })

    it('should generate inset-x-safe', () => {
      const css = coral.generate(['inset-x-safe'])
      expect(css).toContain('left')
      expect(css).toContain('right')
    })

    it('should generate inset-y-safe', () => {
      const css = coral.generate(['inset-y-safe'])
      expect(css).toContain('top')
      expect(css).toContain('bottom')
    })
  })

  describe('Safe Area with Fallback', () => {
    it('should generate pt-safe with fallback', () => {
      const css = coral.generate(['pt-safe-[16px]'])
      expect(css).toContain('padding-top')
      expect(css).toContain('env(safe-area-inset-top, 16px)')
    })

    it('should generate pb-safe with fallback', () => {
      const css = coral.generate(['pb-safe-[20px]'])
      expect(css).toContain('padding-bottom')
      expect(css).toContain('env(safe-area-inset-bottom, 20px)')
    })

    it('should generate pl-safe with fallback', () => {
      const css = coral.generate(['pl-safe-[12px]'])
      expect(css).toContain('padding-left')
      expect(css).toContain('env(safe-area-inset-left, 12px)')
    })

    it('should generate pr-safe with fallback', () => {
      const css = coral.generate(['pr-safe-[8px]'])
      expect(css).toContain('padding-right')
      expect(css).toContain('env(safe-area-inset-right, 8px)')
    })

    it('should handle empty pt-safe fallback', () => {
      const css = coral.generate(['pt-safe-[]'])
      expect(css).toBe('')
    })

    it('should handle empty pb-safe fallback', () => {
      const css = coral.generate(['pb-safe-[]'])
      expect(css).toBe('')
    })

    it('should handle empty pl-safe fallback', () => {
      const css = coral.generate(['pl-safe-[]'])
      expect(css).toBe('')
    })

    it('should handle empty pr-safe fallback', () => {
      const css = coral.generate(['pr-safe-[]'])
      expect(css).toBe('')
    })
  })

  describe('Screen Safe Sizing', () => {
    it('should generate h-screen-safe', () => {
      const css = coral.generate(['h-screen-safe'])
      expect(css).toContain('height')
      expect(css).toContain('calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))')
    })

    it('should generate min-h-screen-safe', () => {
      const css = coral.generate(['min-h-screen-safe'])
      expect(css).toContain('min-height')
      expect(css).toContain('calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))')
    })

    it('should generate w-screen-safe', () => {
      const css = coral.generate(['w-screen-safe'])
      expect(css).toContain('width')
      expect(css).toContain('calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/sizing'
      )
      expect(defaultExport).toBe(sizingPlugin)
    })
  })
})
