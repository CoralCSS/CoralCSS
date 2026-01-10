import { describe, it, expect } from 'vitest'
import {
  primitiveColors,
  primitiveSpacing,
  primitiveSizing,
  primitiveFonts,
  primitiveFontSizes,
  primitiveFontWeights,
  primitiveLineHeights,
  primitiveLetterSpacing,
  primitiveBorderRadius,
  primitiveBorderWidths,
  primitiveShadows,
  primitiveDurations,
  primitiveEasings,
  primitiveZIndex,
  primitiveOpacity,
  primitives,
} from '../../../src/tokens/primitives'

describe('Primitive Tokens', () => {
  describe('primitiveColors', () => {
    it('should have coral color palette', () => {
      expect(primitiveColors.coral).toBeDefined()
      expect(primitiveColors.coral[500]).toBe('#ff6b6b')
      expect(primitiveColors.coral[50]).toBe('#fff5f3')
      expect(primitiveColors.coral[950]).toBe('#5c0a0a')
    })

    it('should have slate color palette', () => {
      expect(primitiveColors.slate).toBeDefined()
      expect(primitiveColors.slate[500]).toBe('#64748b')
    })

    it('should have all color palettes', () => {
      expect(primitiveColors.red).toBeDefined()
      expect(primitiveColors.green).toBeDefined()
      expect(primitiveColors.blue).toBeDefined()
      expect(primitiveColors.yellow).toBeDefined()
      expect(primitiveColors.purple).toBeDefined()
      expect(primitiveColors.pink).toBeDefined()
      expect(primitiveColors.cyan).toBeDefined()
      expect(primitiveColors.orange).toBeDefined()
      expect(primitiveColors.gray).toBeDefined()
    })

    it('should have base colors', () => {
      expect(primitiveColors.black).toBe('#000000')
      expect(primitiveColors.white).toBe('#ffffff')
      expect(primitiveColors.transparent).toBe('transparent')
      expect(primitiveColors.current).toBe('currentColor')
    })

    it('should have all shade levels', () => {
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
      for (const shade of shades) {
        expect(primitiveColors.coral[shade]).toBeDefined()
        expect(primitiveColors.slate[shade]).toBeDefined()
      }
    })
  })

  describe('primitiveSpacing', () => {
    it('should have base spacing values', () => {
      expect(primitiveSpacing[0]).toBe('0')
      expect(primitiveSpacing[1]).toBe('0.25rem')
      expect(primitiveSpacing[2]).toBe('0.5rem')
      expect(primitiveSpacing[4]).toBe('1rem')
      expect(primitiveSpacing[8]).toBe('2rem')
    })

    it('should have pixel value', () => {
      expect(primitiveSpacing.px).toBe('1px')
    })

    it('should have fractional values', () => {
      expect(primitiveSpacing[0.5]).toBe('0.125rem')
      expect(primitiveSpacing[1.5]).toBe('0.375rem')
      expect(primitiveSpacing[2.5]).toBe('0.625rem')
    })

    it('should have large spacing values', () => {
      expect(primitiveSpacing[48]).toBe('12rem')
      expect(primitiveSpacing[64]).toBe('16rem')
      expect(primitiveSpacing[96]).toBe('24rem')
    })
  })

  describe('primitiveSizing', () => {
    it('should extend spacing', () => {
      expect(primitiveSizing[4]).toBe('1rem')
    })

    it('should have special sizing values', () => {
      expect(primitiveSizing.auto).toBe('auto')
      expect(primitiveSizing.full).toBe('100%')
      expect(primitiveSizing.screen).toBe('100vh')
      expect(primitiveSizing.min).toBe('min-content')
      expect(primitiveSizing.max).toBe('max-content')
      expect(primitiveSizing.fit).toBe('fit-content')
    })

    it('should have viewport values', () => {
      expect(primitiveSizing.svh).toBe('100svh')
      expect(primitiveSizing.lvh).toBe('100lvh')
      expect(primitiveSizing.dvh).toBe('100dvh')
    })

    it('should have fractional values', () => {
      expect(primitiveSizing['1/2']).toBe('50%')
      expect(primitiveSizing['1/3']).toBe('33.333333%')
      expect(primitiveSizing['2/3']).toBe('66.666667%')
      expect(primitiveSizing['1/4']).toBe('25%')
      expect(primitiveSizing['3/4']).toBe('75%')
    })
  })

  describe('primitiveFonts', () => {
    it('should have sans-serif stack', () => {
      expect(primitiveFonts.sans).toBeDefined()
      expect(Array.isArray(primitiveFonts.sans)).toBe(true)
      expect(primitiveFonts.sans).toContain('system-ui')
    })

    it('should have serif stack', () => {
      expect(primitiveFonts.serif).toBeDefined()
      expect(primitiveFonts.serif).toContain('Georgia')
    })

    it('should have monospace stack', () => {
      expect(primitiveFonts.mono).toBeDefined()
      expect(primitiveFonts.mono).toContain('monospace')
    })
  })

  describe('primitiveFontSizes', () => {
    it('should have base sizes', () => {
      expect(primitiveFontSizes.xs).toBeDefined()
      expect(primitiveFontSizes.sm).toBeDefined()
      expect(primitiveFontSizes.base).toBeDefined()
      expect(primitiveFontSizes.lg).toBeDefined()
      expect(primitiveFontSizes.xl).toBeDefined()
    })

    it('should include line height', () => {
      const [size, options] = primitiveFontSizes.base
      expect(size).toBe('1rem')
      expect(options.lineHeight).toBe('1.5rem')
    })

    it('should have large sizes', () => {
      expect(primitiveFontSizes['2xl']).toBeDefined()
      expect(primitiveFontSizes['5xl']).toBeDefined()
      expect(primitiveFontSizes['9xl']).toBeDefined()
    })
  })

  describe('primitiveFontWeights', () => {
    it('should have all weight values', () => {
      expect(primitiveFontWeights.thin).toBe(100)
      expect(primitiveFontWeights.normal).toBe(400)
      expect(primitiveFontWeights.medium).toBe(500)
      expect(primitiveFontWeights.semibold).toBe(600)
      expect(primitiveFontWeights.bold).toBe(700)
      expect(primitiveFontWeights.black).toBe(900)
    })
  })

  describe('primitiveLineHeights', () => {
    it('should have line height values', () => {
      expect(primitiveLineHeights.none).toBe('1')
      expect(primitiveLineHeights.tight).toBe('1.25')
      expect(primitiveLineHeights.normal).toBe('1.5')
      expect(primitiveLineHeights.loose).toBe('2')
    })
  })

  describe('primitiveLetterSpacing', () => {
    it('should have letter spacing values', () => {
      expect(primitiveLetterSpacing.tighter).toBe('-0.05em')
      expect(primitiveLetterSpacing.normal).toBe('0em')
      expect(primitiveLetterSpacing.widest).toBe('0.1em')
    })
  })

  describe('primitiveBorderRadius', () => {
    it('should have radius values', () => {
      expect(primitiveBorderRadius.none).toBe('0')
      expect(primitiveBorderRadius.sm).toBe('0.125rem')
      expect(primitiveBorderRadius.DEFAULT).toBe('0.25rem')
      expect(primitiveBorderRadius.md).toBe('0.375rem')
      expect(primitiveBorderRadius.lg).toBe('0.5rem')
      expect(primitiveBorderRadius.full).toBe('9999px')
    })
  })

  describe('primitiveBorderWidths', () => {
    it('should have border width values', () => {
      expect(primitiveBorderWidths[0]).toBe('0px')
      expect(primitiveBorderWidths.DEFAULT).toBe('1px')
      expect(primitiveBorderWidths[2]).toBe('2px')
      expect(primitiveBorderWidths[8]).toBe('8px')
    })
  })

  describe('primitiveShadows', () => {
    it('should have shadow values', () => {
      expect(primitiveShadows.sm).toBeDefined()
      expect(primitiveShadows.DEFAULT).toBeDefined()
      expect(primitiveShadows.lg).toBeDefined()
      expect(primitiveShadows.xl).toBeDefined()
      expect(primitiveShadows.inner).toContain('inset')
      expect(primitiveShadows.none).toBe('none')
    })
  })

  describe('primitiveDurations', () => {
    it('should have duration values', () => {
      expect(primitiveDurations[0]).toBe('0ms')
      expect(primitiveDurations[150]).toBe('150ms')
      expect(primitiveDurations[300]).toBe('300ms')
      expect(primitiveDurations[1000]).toBe('1000ms')
    })
  })

  describe('primitiveEasings', () => {
    it('should have easing values', () => {
      expect(primitiveEasings.linear).toBe('linear')
      expect(primitiveEasings.in).toContain('cubic-bezier')
      expect(primitiveEasings.out).toContain('cubic-bezier')
      expect(primitiveEasings['in-out']).toContain('cubic-bezier')
    })
  })

  describe('primitiveZIndex', () => {
    it('should have z-index values', () => {
      expect(primitiveZIndex.auto).toBe('auto')
      expect(primitiveZIndex[0]).toBe(0)
      expect(primitiveZIndex[50]).toBe(50)
      expect(primitiveZIndex[100]).toBe(100)
    })
  })

  describe('primitiveOpacity', () => {
    it('should have opacity values', () => {
      expect(primitiveOpacity[0]).toBe(0)
      expect(primitiveOpacity[50]).toBe(0.5)
      expect(primitiveOpacity[100]).toBe(1)
    })
  })

  describe('primitives', () => {
    it('should combine all primitives', () => {
      expect(primitives.colors).toBe(primitiveColors)
      expect(primitives.spacing).toBe(primitiveSpacing)
      expect(primitives.sizing).toBe(primitiveSizing)
      expect(primitives.fonts).toBe(primitiveFonts)
      expect(primitives.fontSizes).toBe(primitiveFontSizes)
      expect(primitives.fontWeights).toBe(primitiveFontWeights)
      expect(primitives.borderRadius).toBe(primitiveBorderRadius)
      expect(primitives.shadows).toBe(primitiveShadows)
    })
  })
})
