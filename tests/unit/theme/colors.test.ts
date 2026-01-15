/**
 * Theme Colors Tests
 */
import { describe, it, expect } from 'vitest'
import { colors, getColor } from '../../../src/theme/colors'

describe('Theme Colors', () => {
  describe('colors object', () => {
    it('should have coral color palette', () => {
      expect(colors.coral).toBeDefined()
      expect(colors.coral['500']).toBe('#ff6b6b')
    })

    it('should have gray color palette', () => {
      expect(colors.gray).toBeDefined()
      expect(colors.gray['500']).toBeDefined()
    })

    it('should have all basic color palettes', () => {
      const expectedColors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose'
      ]

      expectedColors.forEach(colorName => {
        expect(colors[colorName]).toBeDefined()
      })
    })

    it('should have color shades from 50 to 950', () => {
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

      shades.forEach(shade => {
        expect(colors.coral[shade]).toBeDefined()
        expect(typeof colors.coral[shade]).toBe('string')
        expect(colors.coral[shade]).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })

    it('should have special colors', () => {
      expect(colors.transparent).toBe('transparent')
      expect(colors.current).toBe('currentColor')
      expect(colors.inherit).toBe('inherit')
      expect(colors.black).toBe('#000000')
      expect(colors.white).toBe('#ffffff')
    })
  })

  describe('getColor function', () => {
    it('should get color with shade', () => {
      const color = getColor('coral', '500')
      expect(color).toBe('#ff6b6b')
    })

    it('should get color from different palette', () => {
      const color = getColor('blue', '600')
      expect(color).toBeDefined()
      expect(typeof color).toBe('string')
    })

    it('should return special color without shade', () => {
      const transparent = getColor('transparent')
      expect(transparent).toBe('transparent')

      const current = getColor('current')
      expect(current).toBe('currentColor')

      const black = getColor('black')
      expect(black).toBe('#000000')

      const white = getColor('white')
      expect(white).toBe('#ffffff')
    })

    it('should return undefined for non-existent color', () => {
      const color = getColor('nonexistent', '500')
      expect(color).toBeUndefined()
    })

    it('should return undefined for color without shade when shade is required', () => {
      const color = getColor('coral')
      expect(color).toBeUndefined()
    })

    it('should return undefined for non-existent shade', () => {
      const color = getColor('coral', '999')
      expect(color).toBeUndefined()
    })

    it('should handle all color palettes', () => {
      const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green']
      const shades = ['100', '500', '900']

      colors.forEach(colorName => {
        shades.forEach(shade => {
          const color = getColor(colorName, shade)
          expect(color).toBeDefined()
          expect(typeof color).toBe('string')
          expect(color).toMatch(/^#[0-9a-f]{6}$/i)
        })
      })
    })
  })

})
