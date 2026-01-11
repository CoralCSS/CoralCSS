/**
 * Theme Typography Tests
 */
import { describe, it, expect } from 'vitest'
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textDecorationThickness,
  textUnderlineOffset,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getLetterSpacing,
} from '../../../src/theme/typography'

describe('Theme Typography', () => {
  describe('fonts', () => {
    it('should have sans font family', () => {
      expect(fonts.sans).toBeDefined()
      expect(Array.isArray(fonts.sans)).toBe(true)
      expect(fonts.sans.length).toBeGreaterThan(0)
    })

    it('should have serif font family', () => {
      expect(fonts.serif).toBeDefined()
      expect(Array.isArray(fonts.serif)).toBe(true)
      expect(fonts.serif.length).toBeGreaterThan(0)
    })

    it('should have mono font family', () => {
      expect(fonts.mono).toBeDefined()
      expect(Array.isArray(fonts.mono)).toBe(true)
      expect(fonts.mono.length).toBeGreaterThan(0)
    })
  })

  describe('fontSizes', () => {
    it('should have xs size', () => {
      expect(fontSizes.xs).toBeDefined()
      expect(fontSizes.xs.fontSize).toBe('0.75rem')
    })

    it('should have base size', () => {
      expect(fontSizes.base).toBeDefined()
      expect(fontSizes.base.fontSize).toBe('1rem')
    })

    it('should have all size variants', () => {
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
      sizes.forEach(size => {
        expect(fontSizes[size]).toBeDefined()
      })
    })
  })

  describe('fontWeights', () => {
    it('should have all weight variants', () => {
      expect(fontWeights.thin).toBe('100')
      expect(fontWeights.extralight).toBe('200')
      expect(fontWeights.light).toBe('300')
      expect(fontWeights.normal).toBe('400')
      expect(fontWeights.medium).toBe('500')
      expect(fontWeights.semibold).toBe('600')
      expect(fontWeights.bold).toBe('700')
      expect(fontWeights.extrabold).toBe('800')
      expect(fontWeights.black).toBe('900')
    })
  })

  describe('lineHeights', () => {
    it('should have named line heights', () => {
      expect(lineHeights.none).toBe('1')
      expect(lineHeights.tight).toBe('1.25')
      expect(lineHeights.snug).toBe('1.375')
      expect(lineHeights.normal).toBe('1.5')
      expect(lineHeights.relaxed).toBe('1.625')
      expect(lineHeights.loose).toBe('2')
    })

    it('should have numeric line heights', () => {
      expect(lineHeights['3']).toBe('.75rem')
      expect(lineHeights['4']).toBe('1rem')
      expect(lineHeights['10']).toBe('2.5rem')
    })
  })

  describe('letterSpacing', () => {
    it('should have all spacing variants', () => {
      expect(letterSpacing.tighter).toBe('-0.05em')
      expect(letterSpacing.tight).toBe('-0.025em')
      expect(letterSpacing.normal).toBe('0em')
      expect(letterSpacing.wide).toBe('0.025em')
      expect(letterSpacing.wider).toBe('0.05em')
      expect(letterSpacing.widest).toBe('0.1em')
    })
  })

  describe('textDecorationThickness', () => {
    it('should have all thickness variants', () => {
      expect(textDecorationThickness.auto).toBe('auto')
      expect(textDecorationThickness['from-font']).toBe('from-font')
      expect(textDecorationThickness['0']).toBe('0px')
      expect(textDecorationThickness['1']).toBe('1px')
      expect(textDecorationThickness['2']).toBe('2px')
      expect(textDecorationThickness['4']).toBe('4px')
      expect(textDecorationThickness['8']).toBe('8px')
    })
  })

  describe('textUnderlineOffset', () => {
    it('should have all offset variants', () => {
      expect(textUnderlineOffset.auto).toBe('auto')
      expect(textUnderlineOffset['0']).toBe('0px')
      expect(textUnderlineOffset['1']).toBe('1px')
      expect(textUnderlineOffset['2']).toBe('2px')
      expect(textUnderlineOffset['4']).toBe('4px')
      expect(textUnderlineOffset['8']).toBe('8px')
    })
  })

  describe('getFontFamily', () => {
    it('should return sans font family as string', () => {
      const result = getFontFamily('sans')
      expect(typeof result).toBe('string')
      expect(result).toContain('ui-sans-serif')
      expect(result).toContain(',')
    })

    it('should return serif font family as string', () => {
      const result = getFontFamily('serif')
      expect(typeof result).toBe('string')
      expect(result).toContain('ui-serif')
    })

    it('should return mono font family as string', () => {
      const result = getFontFamily('mono')
      expect(typeof result).toBe('string')
      expect(result).toContain('ui-monospace')
    })

    it('should return the key as fallback for unknown family', () => {
      const result = getFontFamily('unknown' as keyof typeof fonts)
      expect(result).toBe('unknown')
    })
  })

  describe('getFontSize', () => {
    it('should return font size object for valid size', () => {
      const result = getFontSize('lg')
      expect(result).toBeDefined()
      expect(result?.fontSize).toBe('1.125rem')
      expect(result?.lineHeight).toBe('1.75rem')
    })

    it('should return base font size', () => {
      const result = getFontSize('base')
      expect(result).toBeDefined()
      expect(result?.fontSize).toBe('1rem')
      expect(result?.lineHeight).toBe('1.5rem')
    })

    it('should return undefined for unknown size', () => {
      const result = getFontSize('unknown')
      expect(result).toBeUndefined()
    })

    it('should handle all size variants', () => {
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
      sizes.forEach(size => {
        const result = getFontSize(size)
        expect(result).toBeDefined()
        expect(result?.fontSize).toBeDefined()
        expect(result?.lineHeight).toBeDefined()
      })
    })
  })

  describe('getFontWeight', () => {
    it('should return weight value for valid weight', () => {
      expect(getFontWeight('bold')).toBe('700')
      expect(getFontWeight('normal')).toBe('400')
    })

    it('should return all weight values', () => {
      expect(getFontWeight('thin')).toBe('100')
      expect(getFontWeight('extralight')).toBe('200')
      expect(getFontWeight('light')).toBe('300')
      expect(getFontWeight('medium')).toBe('500')
      expect(getFontWeight('semibold')).toBe('600')
      expect(getFontWeight('extrabold')).toBe('800')
      expect(getFontWeight('black')).toBe('900')
    })

    it('should return undefined for unknown weight', () => {
      const result = getFontWeight('unknown')
      expect(result).toBeUndefined()
    })
  })

  describe('getLineHeight', () => {
    it('should return line height value for valid key', () => {
      expect(getLineHeight('tight')).toBe('1.25')
      expect(getLineHeight('normal')).toBe('1.5')
      expect(getLineHeight('loose')).toBe('2')
    })

    it('should return numeric line heights', () => {
      expect(getLineHeight('3')).toBe('.75rem')
      expect(getLineHeight('4')).toBe('1rem')
      expect(getLineHeight('5')).toBe('1.25rem')
      expect(getLineHeight('6')).toBe('1.5rem')
      expect(getLineHeight('7')).toBe('1.75rem')
      expect(getLineHeight('8')).toBe('2rem')
      expect(getLineHeight('9')).toBe('2.25rem')
      expect(getLineHeight('10')).toBe('2.5rem')
    })

    it('should return undefined for unknown key', () => {
      const result = getLineHeight('unknown')
      expect(result).toBeUndefined()
    })
  })

  describe('getLetterSpacing', () => {
    it('should return letter spacing value for valid key', () => {
      expect(getLetterSpacing('tight')).toBe('-0.025em')
      expect(getLetterSpacing('normal')).toBe('0em')
      expect(getLetterSpacing('wide')).toBe('0.025em')
    })

    it('should return all spacing values', () => {
      expect(getLetterSpacing('tighter')).toBe('-0.05em')
      expect(getLetterSpacing('wider')).toBe('0.05em')
      expect(getLetterSpacing('widest')).toBe('0.1em')
    })

    it('should return undefined for unknown key', () => {
      const result = getLetterSpacing('unknown')
      expect(result).toBeUndefined()
    })
  })
})
