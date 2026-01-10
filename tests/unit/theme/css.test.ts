import { describe, it, expect } from 'vitest'
import {
  generateColorPaletteCSS,
  generateSpacingCSS,
  generateSizingCSS,
  generateMaxWidthCSS,
  generateZIndexCSS,
  generateTypographyCSS,
  generateEffectsCSS,
} from '../../../src/theme/css'

describe('Theme CSS', () => {
  describe('generateColorPaletteCSS', () => {
    it('should generate color CSS variables', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-')
    })

    it('should include coral colors', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-coral-')
    })

    it('should include slate colors', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-slate-')
    })

    it('should include shade values', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('-500:')
    })
  })

  describe('generateSpacingCSS', () => {
    it('should generate spacing CSS variables', () => {
      const css = generateSpacingCSS()
      expect(css).toContain('--spacing-')
    })

    it('should include numeric spacing values', () => {
      const css = generateSpacingCSS()
      expect(css).toContain('--spacing-4')
    })
  })

  describe('generateSizingCSS', () => {
    it('should generate sizing CSS variables', () => {
      const css = generateSizingCSS()
      expect(css).toContain('--sizing-')
    })
  })

  describe('generateMaxWidthCSS', () => {
    it('should generate max-width CSS variables', () => {
      const css = generateMaxWidthCSS()
      expect(css).toContain('--max-width-')
    })
  })

  describe('generateZIndexCSS', () => {
    it('should generate z-index CSS variables', () => {
      const css = generateZIndexCSS()
      expect(css).toContain('--z-')
    })
  })

  describe('generateTypographyCSS', () => {
    it('should generate font family CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--font-')
    })

    it('should generate font size CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--text-')
    })

    it('should generate font weight CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--font-weight-')
    })

    it('should generate line height CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--leading-')
    })

    it('should generate letter spacing CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--tracking-')
    })
  })

  describe('generateEffectsCSS', () => {
    it('should generate border radius CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--rounded-')
    })

    it('should generate border width CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--border-')
    })

    it('should generate shadow CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--shadow-')
    })

    it('should generate opacity CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--opacity-')
    })

    it('should generate duration CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--duration-')
    })
  })
})
