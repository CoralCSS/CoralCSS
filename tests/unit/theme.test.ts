/**
 * Theme Tests
 *
 * Tests for the theme module.
 */

import { describe, it, expect } from 'vitest'
import {
  colors,
  coral,
  getColor,
  spacing,
  getSpacing,
  sizing,
  getSizing,
  fonts,
  getFontFamily,
  fontSizes,
  getFontSize,
  fontWeights,
  getFontWeight,
  defaultTheme,
  getDefaultTheme,
  invertColorScale,
  generateDarkColors,
  generateDarkModeCSS,
  generateLightModeCSS,
  generateThemeCSS,
  wrapInDarkMode,
  usesClassStrategy,
  usesMediaStrategy,
} from '../../src/theme'

describe('Colors', () => {
  describe('color scales', () => {
    it('should have all shades from 50 to 950', () => {
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
      for (const shade of shades) {
        expect(coral[shade]).toBeDefined()
      }
    })

    it('should have coral brand colors', () => {
      expect(coral).toBeDefined()
      expect(coral['500']).toBeDefined()
    })

    it('should have all standard colors', () => {
      const colorNames = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
      for (const name of colorNames) {
        expect(colors[name]).toBeDefined()
      }
    })
  })

  describe('getColor', () => {
    it('should return color value', () => {
      expect(getColor('coral', '500')).toBe(coral['500'])
    })

    it('should return undefined for unknown color', () => {
      expect(getColor('unknown', '500')).toBeUndefined()
    })
  })
})

describe('Spacing', () => {
  describe('spacing scale', () => {
    it('should have standard spacing values', () => {
      expect(spacing['0']).toBe('0px')
      expect(spacing['1']).toBe('0.25rem')
      expect(spacing['4']).toBe('1rem')
      expect(spacing['8']).toBe('2rem')
    })

    it('should have fractional values', () => {
      expect(spacing['0.5']).toBe('0.125rem')
      expect(spacing['1.5']).toBe('0.375rem')
    })

    it('should have pixel value', () => {
      expect(spacing['px']).toBe('1px')
    })
  })

  describe('getSpacing', () => {
    it('should return spacing value', () => {
      expect(getSpacing('4')).toBe('1rem')
    })

    it('should return undefined for unknown key', () => {
      expect(getSpacing('unknown')).toBeUndefined()
    })
  })

  describe('sizing', () => {
    it('should include spacing values', () => {
      expect((sizing as Record<string, string>)['4']).toBe('1rem')
    })

    it('should include fraction values', () => {
      expect(sizing['1/2']).toBe('50%')
      expect(sizing['1/3']).toBe('33.333333%')
    })

    it('should include special values', () => {
      expect(sizing['full']).toBe('100%')
      expect(sizing['screen']).toBe('100vw')
      expect(sizing['auto']).toBe('auto')
    })
  })

  describe('getSizing', () => {
    it('should return sizing value', () => {
      expect(getSizing('1/2')).toBe('50%')
    })
  })
})

describe('Typography', () => {
  describe('fonts', () => {
    it('should have font stacks', () => {
      expect(fonts.sans).toBeInstanceOf(Array)
      expect(fonts.serif).toBeInstanceOf(Array)
      expect(fonts.mono).toBeInstanceOf(Array)
    })
  })

  describe('getFontFamily', () => {
    it('should return font stack as string', () => {
      const result = getFontFamily('sans')
      expect(result).toContain('ui-sans-serif')
    })
  })

  describe('fontSizes', () => {
    it('should have size and line height', () => {
      expect(fontSizes['base']).toHaveProperty('fontSize')
      expect(fontSizes['base']).toHaveProperty('lineHeight')
    })

    it('should have all standard sizes', () => {
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
      for (const size of sizes) {
        expect(fontSizes[size]).toBeDefined()
      }
    })
  })

  describe('getFontSize', () => {
    it('should return font size object', () => {
      const result = getFontSize('base')
      expect(result).toHaveProperty('fontSize')
      expect(result).toHaveProperty('lineHeight')
    })
  })

  describe('fontWeights', () => {
    it('should have all standard weights', () => {
      const weights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
      for (const weight of weights) {
        expect(fontWeights[weight]).toBeDefined()
      }
    })
  })

  describe('getFontWeight', () => {
    it('should return font weight', () => {
      expect(getFontWeight('bold')).toBe('700')
    })
  })
})

describe('Default Theme', () => {
  describe('defaultTheme', () => {
    it('should have all required properties', () => {
      expect(defaultTheme.colors).toBeDefined()
      expect(defaultTheme.spacing).toBeDefined()
      expect(defaultTheme.fonts).toBeDefined()
      expect(defaultTheme.fontSizes).toBeDefined()
      expect(defaultTheme.borderRadius).toBeDefined()
      expect(defaultTheme.boxShadow).toBeDefined()
      expect(defaultTheme.screens).toBeDefined()
    })
  })

  describe('getDefaultTheme', () => {
    it('should return default theme', () => {
      const theme = getDefaultTheme()
      expect(theme).toBe(defaultTheme)
    })
  })
})

describe('Dark Mode', () => {
  describe('invertColorScale', () => {
    it('should invert color scale', () => {
      const inverted = invertColorScale(coral)
      expect(inverted['50']).toBe(coral['950'])
      expect(inverted['950']).toBe(coral['50'])
      expect(inverted['500']).toBe(coral['500']) // Middle stays same
    })
  })

  describe('generateDarkColors', () => {
    it('should generate dark mode colors', () => {
      const darkColors = generateDarkColors()
      expect(darkColors).toBeDefined()
      expect(darkColors.coral).toBeDefined()
    })
  })

  describe('generateDarkModeCSS', () => {
    it('should generate CSS with class strategy', () => {
      const css = generateDarkModeCSS('class')
      expect(css).toContain('.dark')
    })

    it('should generate CSS with media strategy', () => {
      const css = generateDarkModeCSS('media')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should generate CSS with selector strategy', () => {
      const css = generateDarkModeCSS('selector', '[data-theme="dark"]')
      expect(css).toContain('[data-theme="dark"]')
    })

    it('should generate CSS with auto strategy', () => {
      const css = generateDarkModeCSS('auto')
      expect(css).toContain('.dark')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })
  })

  describe('generateLightModeCSS', () => {
    it('should generate light mode CSS variables', () => {
      const css = generateLightModeCSS()
      expect(css).toContain(':root')
      expect(css).toContain('--')
    })
  })

  describe('generateThemeCSS', () => {
    it('should generate complete theme CSS', () => {
      const css = generateThemeCSS('class')
      expect(css).toContain(':root')
      expect(css).toContain('.dark')
    })

    it('should generate complete theme CSS with custom selector', () => {
      const css = generateThemeCSS('selector', '[data-mode="dark"]')
      expect(css).toContain(':root')
      expect(css).toContain('[data-mode="dark"]')
    })
  })

  describe('generateDarkModeCSS additional cases', () => {
    it('should use default selector for selector strategy', () => {
      const css = generateDarkModeCSS('selector')
      expect(css).toContain('[data-theme="dark"]')
    })

    it('should handle unknown strategy as default', () => {
      const css = generateDarkModeCSS('unknown' as never)
      expect(css).toContain('.dark')
    })
  })

  describe('wrapInDarkMode', () => {
    it('should wrap CSS with class strategy', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'class')
      expect(result).toBe('.dark .test { color: red; }')
    })

    it('should wrap CSS with media strategy', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'media')
      expect(result).toBe('@media (prefers-color-scheme: dark) { .test { color: red; } }')
    })

    it('should wrap CSS with selector strategy', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'selector', '[data-theme="dark"]')
      expect(result).toBe('[data-theme="dark"] .test { color: red; }')
    })

    it('should use default selector for selector strategy', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'selector')
      expect(result).toBe('[data-theme="dark"] .test { color: red; }')
    })

    it('should wrap CSS with auto strategy (uses class)', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'auto')
      expect(result).toBe('.dark .test { color: red; }')
    })

    it('should handle unknown strategy as default', () => {
      const result = wrapInDarkMode('.test { color: red; }', 'unknown' as never)
      expect(result).toBe('.dark .test { color: red; }')
    })
  })

  describe('usesClassStrategy', () => {
    it('should return true for class strategy', () => {
      expect(usesClassStrategy('class')).toBe(true)
    })

    it('should return true for auto strategy', () => {
      expect(usesClassStrategy('auto')).toBe(true)
    })

    it('should return false for media strategy', () => {
      expect(usesClassStrategy('media')).toBe(false)
    })

    it('should return false for selector strategy', () => {
      expect(usesClassStrategy('selector')).toBe(false)
    })
  })

  describe('usesMediaStrategy', () => {
    it('should return true for media strategy', () => {
      expect(usesMediaStrategy('media')).toBe(true)
    })

    it('should return true for auto strategy', () => {
      expect(usesMediaStrategy('auto')).toBe(true)
    })

    it('should return false for class strategy', () => {
      expect(usesMediaStrategy('class')).toBe(false)
    })

    it('should return false for selector strategy', () => {
      expect(usesMediaStrategy('selector')).toBe(false)
    })
  })
})
