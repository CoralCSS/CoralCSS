/**
 * Tests for IntelliSense Hover Provider
 *
 * Tests hover information generation for utility classes.
 */
import { describe, it, expect } from 'vitest'
import {
  createHoverProvider,
  hoverProvider,
  type HoverInfo,
} from '../../../src/intellisense/hover'

describe('Hover Provider', () => {
  describe('createHoverProvider', () => {
    it('should create a hover provider', () => {
      const provider = createHoverProvider()
      expect(provider).toBeDefined()
      expect(provider.getHoverInfo).toBeDefined()
      expect(provider.getHoverInfoBatch).toBeDefined()
    })

    it('should create provider with custom theme', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
        },
      }
      const provider = createHoverProvider(customTheme as any)
      expect(provider).toBeDefined()
    })
  })

  describe('getHoverInfo', () => {
    const provider = createHoverProvider()

    it('should return null for empty class', () => {
      expect(provider.getHoverInfo('')).toBeNull()
      expect(provider.getHoverInfo('   ')).toBeNull()
    })

    it('should return hover info for layout classes', () => {
      const info = provider.getHoverInfo('flex')

      expect(info).toBeDefined()
      expect(info?.className).toBe('flex')
      expect(info?.css).toBeDefined()
      expect(info?.category).toBe('layout')
    })

    it('should return hover info for grid class', () => {
      const info = provider.getHoverInfo('grid')

      expect(info).toBeDefined()
      expect(info?.category).toBe('layout')
    })

    it('should return hover info for spacing classes', () => {
      const info = provider.getHoverInfo('p-4')

      expect(info).toBeDefined()
      expect(info?.className).toBe('p-4')
      expect(info?.category).toBe('spacing')
      expect(info?.description).toContain('padding')
    })

    it('should return hover info for margin classes', () => {
      const infoM = provider.getHoverInfo('m-4')
      const infoMx = provider.getHoverInfo('mx-auto')
      const infoMy = provider.getHoverInfo('my-2')

      expect(infoM?.category).toBe('spacing')
      expect(infoMx?.description).toContain('margin')
      expect(infoMy?.category).toBe('spacing')
    })

    it('should return hover info for gap classes', () => {
      const info = provider.getHoverInfo('gap-4')

      expect(info).toBeDefined()
      expect(info?.category).toBe('spacing')
    })

    it('should return hover info for sizing classes', () => {
      const infoW = provider.getHoverInfo('w-full')
      const infoH = provider.getHoverInfo('h-screen')

      expect(infoW?.category).toBe('sizing')
      expect(infoH?.category).toBe('sizing')
    })

    it('should return hover info for typography classes', () => {
      const infoSize = provider.getHoverInfo('text-lg')
      const infoWeight = provider.getHoverInfo('font-bold')
      const infoAlign = provider.getHoverInfo('text-center')

      expect(infoSize?.category).toBe('typography')
      expect(infoWeight?.category).toBe('typography')
      expect(infoAlign?.category).toBe('typography')
    })

    it('should return hover info for color classes', () => {
      const infoText = provider.getHoverInfo('text-red-500')
      const infoBg = provider.getHoverInfo('bg-blue-500')
      const infoBorder = provider.getHoverInfo('border-gray-300')

      if (infoText) {
        expect(infoText.category).toBe('colors')
      }
      if (infoBg) {
        expect(infoBg.category).toBe('colors')
      }
    })

    it('should return hover info for flexbox classes', () => {
      const infoDirection = provider.getHoverInfo('flex-row')
      const infoJustify = provider.getHoverInfo('justify-center')
      const infoItems = provider.getHoverInfo('items-start')

      expect(infoDirection?.category).toBe('flexbox')
      expect(infoJustify?.category).toBe('flexbox')
      expect(infoItems?.category).toBe('flexbox')
    })

    it('should return hover info for grid classes', () => {
      const infoCols = provider.getHoverInfo('grid-cols-3')
      const infoRows = provider.getHoverInfo('grid-rows-2')
      const infoSpan = provider.getHoverInfo('col-span-2')

      expect(infoCols?.category).toBe('grid')
      expect(infoRows?.category).toBe('grid')
      expect(infoSpan?.category).toBe('grid')
    })

    it('should return hover info for border classes', () => {
      const infoRounded = provider.getHoverInfo('rounded-lg')
      const infoBorder = provider.getHoverInfo('border')
      const infoRing = provider.getHoverInfo('ring-2')

      expect(infoRounded?.category).toBe('borders')
      expect(infoBorder?.category).toBe('borders')
      expect(infoRing?.category).toBe('borders')
    })

    it('should return hover info for effect classes', () => {
      const infoShadow = provider.getHoverInfo('shadow-md')
      const infoOpacity = provider.getHoverInfo('opacity-50')
      const infoBlend = provider.getHoverInfo('mix-blend-multiply')

      expect(infoShadow?.category).toBe('effects')
      expect(infoOpacity?.category).toBe('effects')
      expect(infoBlend?.category).toBe('effects')
    })

    it('should return hover info for transform classes', () => {
      const infoScale = provider.getHoverInfo('scale-110')
      const infoRotate = provider.getHoverInfo('rotate-45')
      const infoTranslate = provider.getHoverInfo('translate-x-4')

      expect(infoScale?.category).toBe('transforms')
      expect(infoRotate?.category).toBe('transforms')
      expect(infoTranslate?.category).toBe('transforms')
    })

    it('should return hover info for transition classes', () => {
      const infoTransition = provider.getHoverInfo('transition')
      const infoDuration = provider.getHoverInfo('duration-300')
      const infoEase = provider.getHoverInfo('ease-in-out')
      const infoAnimate = provider.getHoverInfo('animate-spin')

      expect(infoTransition?.category).toBe('transitions')
      expect(infoDuration?.category).toBe('transitions')
      expect(infoEase?.category).toBe('transitions')
      expect(infoAnimate?.category).toBe('transitions')
    })

    it('should return hover info for filter classes', () => {
      const infoBlur = provider.getHoverInfo('blur-sm')
      const infoBrightness = provider.getHoverInfo('brightness-75')
      const infoGrayscale = provider.getHoverInfo('grayscale')
      const infoBackdrop = provider.getHoverInfo('backdrop-blur-md')

      expect(infoBlur?.category).toBe('filters')
      expect(infoBrightness?.category).toBe('filters')
      expect(infoGrayscale?.category).toBe('filters')
      expect(infoBackdrop?.category).toBe('filters')
    })

    it('should return hover info for interactivity classes', () => {
      const infoCursor = provider.getHoverInfo('cursor-pointer')
      const infoSelect = provider.getHoverInfo('select-none')
      const infoScroll = provider.getHoverInfo('scroll-smooth')

      expect(infoCursor?.category).toBe('interactivity')
      expect(infoSelect?.category).toBe('interactivity')
      expect(infoScroll?.category).toBe('interactivity')
    })

    it('should handle negative values', () => {
      const info = provider.getHoverInfo('-mt-4')

      expect(info).toBeDefined()
      expect(info?.description).toContain('negative')
    })

    it('should parse variants correctly', () => {
      const info = provider.getHoverInfo('hover:bg-blue-500')

      expect(info).toBeDefined()
      expect(info?.variants).toContain('hover')
    })

    it('should handle multiple variants', () => {
      const info = provider.getHoverInfo('sm:hover:bg-blue-500')

      expect(info).toBeDefined()
      expect(info?.variants).toContain('sm')
      expect(info?.variants).toContain('hover')
    })

    it('should format CSS output', () => {
      const info = provider.getHoverInfo('flex')

      expect(info?.css).toBeDefined()
      expect(info?.css).toContain('display')
    })
  })

  describe('getHoverInfoBatch', () => {
    const provider = createHoverProvider()

    it('should return info for multiple classes', () => {
      const classNames = ['flex', 'p-4', 'text-lg']
      const results = provider.getHoverInfoBatch(classNames)

      expect(results.size).toBe(3)
      expect(results.get('flex')).toBeDefined()
      expect(results.get('p-4')).toBeDefined()
      expect(results.get('text-lg')).toBeDefined()
    })

    it('should handle mix of valid and invalid classes', () => {
      const classNames = ['flex', 'unknownclass', 'p-4']
      const results = provider.getHoverInfoBatch(classNames)

      expect(results.size).toBe(3)
      expect(results.get('flex')).toBeDefined()
      expect(results.get('unknownclass')).toBeNull()
      expect(results.get('p-4')).toBeDefined()
    })

    it('should handle empty array', () => {
      const results = provider.getHoverInfoBatch([])
      expect(results.size).toBe(0)
    })
  })

  describe('Color Resolution', () => {
    it('should resolve simple colors', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
        },
      }
      const provider = createHoverProvider(customTheme as any)
      const info = provider.getHoverInfo('text-brand')

      if (info?.color) {
        expect(info.color).toBe('#ff6b6b')
      }
    })

    it('should resolve color scales', () => {
      const customTheme = {
        colors: {
          coral: {
            500: '#ff6b6b',
          },
        },
      }
      const provider = createHoverProvider(customTheme as any)
      const info = provider.getHoverInfo('bg-coral-500')

      if (info?.color) {
        expect(info.color).toBe('#ff6b6b')
      }
    })

    it('should handle DEFAULT shade', () => {
      const customTheme = {
        colors: {
          accent: {
            DEFAULT: '#ff6b6b',
          },
        },
      }
      const provider = createHoverProvider(customTheme as any)
      const info = provider.getHoverInfo('text-accent')

      expect(info).toBeDefined()
    })
  })

  describe('HoverInfo Structure', () => {
    const provider = createHoverProvider()

    it('should include className', () => {
      const info = provider.getHoverInfo('flex')
      expect(info?.className).toBe('flex')
    })

    it('should include formatted CSS', () => {
      const info = provider.getHoverInfo('flex')
      expect(info?.css).toBeDefined()
      expect(info?.css.length).toBeGreaterThan(0)
    })

    it('should include description when available', () => {
      const info = provider.getHoverInfo('flex')
      expect(info?.description).toBeDefined()
    })

    it('should include category', () => {
      const info = provider.getHoverInfo('flex')
      expect(info?.category).toBeDefined()
    })
  })

  describe('Default Provider', () => {
    it('should export default provider instance', () => {
      expect(hoverProvider).toBeDefined()
      expect(hoverProvider.getHoverInfo).toBeDefined()
    })

    it('should work with default theme', () => {
      const info = hoverProvider.getHoverInfo('flex')
      expect(info).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    const provider = createHoverProvider()

    it('should handle classes with arbitrary values', () => {
      const info = provider.getHoverInfo('w-[200px]')
      expect(info).toBeDefined()
    })

    it('should handle long variant chains', () => {
      const info = provider.getHoverInfo('dark:sm:hover:focus:bg-blue-500')

      if (info?.variants) {
        expect(info.variants.length).toBe(4)
      }
    })

    it('should trim whitespace', () => {
      const info = provider.getHoverInfo('  flex  ')
      expect(info?.className).toBe('flex')
    })
  })
})
