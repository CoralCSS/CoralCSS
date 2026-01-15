/**
 * Tests for IntelliSense Colors Provider
 *
 * Tests color parsing, conversion, and WCAG accessibility features.
 */
import { describe, it, expect } from 'vitest'
import { createColorProvider, colorProvider, type ColorInfo } from '../../../src/intellisense/colors'

describe('Colors Provider', () => {
  describe('createColorProvider', () => {
    it('should create a color provider with default theme', () => {
      const provider = createColorProvider()
      expect(provider).toBeDefined()
      expect(provider.getColor).toBeDefined()
      expect(provider.getColorFromClass).toBeDefined()
      expect(provider.getPalettes).toBeDefined()
      expect(provider.searchColors).toBeDefined()
      expect(provider.getContrastRatio).toBeDefined()
      expect(provider.meetsWCAG).toBeDefined()
      expect(provider.suggestTextColors).toBeDefined()
    })

    it('should create provider with custom theme', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
          secondary: {
            100: '#e0f7fa',
            500: '#00bcd4',
            900: '#006064',
          },
        },
      }
      const provider = createColorProvider(customTheme as any)
      expect(provider.getColor('brand')).toBeDefined()
      expect(provider.getColor('secondary-500')).toBeDefined()
    })
  })

  describe('getColor', () => {
    it('should return color info for simple hex colors', () => {
      const customTheme = {
        colors: {
          primary: '#3b82f6',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('primary')

      expect(info).toBeDefined()
      expect(info?.hex).toBe('#3b82f6')
      expect(info?.rgb).toBeDefined()
      expect(info?.hsl).toBeDefined()
    })

    it('should handle color scales', () => {
      const customTheme = {
        colors: {
          coral: {
            50: '#fff0f0',
            500: '#ff6b6b',
            900: '#7f1d1d',
          },
        },
      }
      const provider = createColorProvider(customTheme as any)

      expect(provider.getColor('coral-50')?.hex).toBe('#fff0f0')
      expect(provider.getColor('coral-500')?.hex).toBe('#ff6b6b')
      expect(provider.getColor('coral-900')?.hex).toBe('#7f1d1d')
    })

    it('should handle opacity modifier', () => {
      const customTheme = {
        colors: {
          blue: '#3b82f6',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('blue/50')

      expect(info).toBeDefined()
      expect(info?.opacity).toBe(0.5)
      expect(info?.rgba).toContain('0.5')
    })

    it('should return null for unknown colors', () => {
      const provider = createColorProvider({ colors: {} } as any)
      expect(provider.getColor('unknown-color')).toBeNull()
    })

    it('should handle DEFAULT shade', () => {
      const customTheme = {
        colors: {
          accent: {
            DEFAULT: '#ff6b6b',
            light: '#ff9999',
          },
        },
      }
      const provider = createColorProvider(customTheme as any)
      expect(provider.getColor('accent')?.hex).toBe('#ff6b6b')
    })
  })

  describe('getColorFromClass', () => {
    it('should extract color from text- class', () => {
      const customTheme = {
        colors: {
          red: { 500: '#ef4444' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColorFromClass('text-red-500')

      expect(info).toBeDefined()
      expect(info?.hex).toBe('#ef4444')
    })

    it('should extract color from bg- class', () => {
      const customTheme = {
        colors: {
          blue: { 600: '#2563eb' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColorFromClass('bg-blue-600')

      expect(info).toBeDefined()
      expect(info?.hex).toBe('#2563eb')
    })

    it('should extract color from border- class', () => {
      const customTheme = {
        colors: {
          gray: { 300: '#d1d5db' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColorFromClass('border-gray-300')

      expect(info).toBeDefined()
    })

    it('should handle gradient color classes', () => {
      const customTheme = {
        colors: {
          purple: { 500: '#8b5cf6' },
        },
      }
      const provider = createColorProvider(customTheme as any)

      expect(provider.getColorFromClass('from-purple-500')).toBeDefined()
      expect(provider.getColorFromClass('via-purple-500')).toBeDefined()
      expect(provider.getColorFromClass('to-purple-500')).toBeDefined()
    })

    it('should handle classes with variants', () => {
      const customTheme = {
        colors: {
          green: { 500: '#22c55e' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColorFromClass('hover:bg-green-500')

      expect(info).toBeDefined()
    })

    it('should return null for non-color classes', () => {
      const provider = createColorProvider({ colors: {} } as any)
      expect(provider.getColorFromClass('flex')).toBeNull()
      expect(provider.getColorFromClass('p-4')).toBeNull()
    })
  })

  describe('getPalettes', () => {
    it('should return color palettes', () => {
      const customTheme = {
        colors: {
          red: { 100: '#fee2e2', 500: '#ef4444', 900: '#7f1d1d' },
          blue: { 100: '#dbeafe', 500: '#3b82f6', 900: '#1e3a8a' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const palettes = provider.getPalettes()

      expect(palettes.length).toBeGreaterThan(0)
      expect(palettes[0].name).toBeDefined()
      expect(palettes[0].colors).toBeDefined()
    })

    it('should group colors by palette name', () => {
      const customTheme = {
        colors: {
          coral: { 100: '#fff0f0', 500: '#ff6b6b' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const palettes = provider.getPalettes()

      const coralPalette = palettes.find(p => p.name === 'coral')
      expect(coralPalette).toBeDefined()
    })
  })

  describe('searchColors', () => {
    it('should find colors by name', () => {
      const customTheme = {
        colors: {
          coral: { 500: '#ff6b6b' },
          crimson: { 500: '#dc143c' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const results = provider.searchColors('coral')

      expect(results.length).toBeGreaterThan(0)
      expect(results[0].name).toContain('coral')
    })

    it('should find colors by hex value', () => {
      const customTheme = {
        colors: {
          primary: '#ff6b6b',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const results = provider.searchColors('#ff6b6b')

      expect(results.length).toBeGreaterThan(0)
    })

    it('should return empty array for no matches', () => {
      const provider = createColorProvider({ colors: {} } as any)
      const results = provider.searchColors('nonexistent')

      expect(results).toHaveLength(0)
    })
  })

  describe('getContrastRatio', () => {
    it('should calculate contrast between black and white', () => {
      const customTheme = {
        colors: {
          black: '#000000',
          white: '#ffffff',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const ratio = provider.getContrastRatio('black', 'white')

      expect(ratio).toBeCloseTo(21, 0)
    })

    it('should return 0 for unknown colors', () => {
      const provider = createColorProvider({ colors: {} } as any)
      const ratio = provider.getContrastRatio('unknown1', 'unknown2')

      expect(ratio).toBe(0)
    })

    it('should calculate contrast for similar colors', () => {
      const customTheme = {
        colors: {
          gray: { 400: '#9ca3af', 500: '#6b7280' },
        },
      }
      const provider = createColorProvider(customTheme as any)
      const ratio = provider.getContrastRatio('gray-400', 'gray-500')

      expect(ratio).toBeGreaterThan(1)
      expect(ratio).toBeLessThan(5)
    })
  })

  describe('meetsWCAG', () => {
    it('should pass AA for high contrast', () => {
      const customTheme = {
        colors: {
          black: '#000000',
          white: '#ffffff',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const result = provider.meetsWCAG('black', 'white', 'AA')

      expect(result.normalText).toBe(true)
      expect(result.largeText).toBe(true)
      expect(result.ratio).toBeCloseTo(21, 0)
    })

    it('should pass AAA for high contrast', () => {
      const customTheme = {
        colors: {
          black: '#000000',
          white: '#ffffff',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const result = provider.meetsWCAG('black', 'white', 'AAA')

      expect(result.normalText).toBe(true)
      expect(result.largeText).toBe(true)
    })

    it('should fail for low contrast', () => {
      const customTheme = {
        colors: {
          lightGray: '#e5e7eb',
          lighterGray: '#f3f4f6',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const result = provider.meetsWCAG('lightGray', 'lighterGray', 'AA')

      expect(result.normalText).toBe(false)
    })

    it('should use AA as default level', () => {
      const customTheme = {
        colors: {
          a: '#000000',
          b: '#ffffff',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const result = provider.meetsWCAG('a', 'b')

      expect(result.normalText).toBe(true)
    })
  })

  describe('suggestTextColors', () => {
    it('should suggest accessible text colors for dark background', () => {
      const customTheme = {
        colors: {
          dark: '#1f2937',
          white: '#ffffff',
          light: '#f9fafb',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const suggestions = provider.suggestTextColors('dark')

      expect(suggestions.length).toBeGreaterThan(0)
    })

    it('should return empty array for unknown background', () => {
      const provider = createColorProvider({ colors: {} } as any)
      const suggestions = provider.suggestTextColors('unknown')

      expect(suggestions).toHaveLength(0)
    })

    it('should limit suggestions', () => {
      const customTheme = {
        colors: {
          bg: '#1f2937',
          // Many potential text colors
          ...Object.fromEntries(
            Array.from({ length: 20 }, (_, i) => [`color${i}`, `#${(255 - i * 10).toString(16).padStart(2, '0')}${'ff'}${'ff'}`])
          ),
        },
      }
      const provider = createColorProvider(customTheme as any)
      const suggestions = provider.suggestTextColors('bg')

      expect(suggestions.length).toBeLessThanOrEqual(10)
    })
  })

  describe('Color Parsing', () => {
    it('should parse 3-digit hex colors', () => {
      const customTheme = {
        colors: {
          short: '#fff',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('short')

      expect(info?.hex).toBe('#ffffff')
    })

    it('should parse 8-digit hex colors (with alpha)', () => {
      const customTheme = {
        colors: {
          withAlpha: '#ff6b6baa',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('withAlpha')

      expect(info?.hex).toBe('#ff6b6b')
    })

    it('should parse rgb colors', () => {
      const customTheme = {
        colors: {
          rgbColor: 'rgb(255, 107, 107)',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('rgbColor')

      expect(info).toBeDefined()
      expect(info?.rgb.r).toBe(255)
      expect(info?.rgb.g).toBe(107)
      expect(info?.rgb.b).toBe(107)
    })

    it('should parse rgba colors', () => {
      const customTheme = {
        colors: {
          rgbaColor: 'rgba(255, 107, 107, 0.5)',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('rgbaColor')

      expect(info).toBeDefined()
      expect(info?.opacity).toBe(0.5)
    })

    it('should parse hsl colors', () => {
      const customTheme = {
        colors: {
          hslColor: 'hsl(0, 100%, 71%)',
        },
      }
      const provider = createColorProvider(customTheme as any)
      const info = provider.getColor('hslColor')

      expect(info).toBeDefined()
      expect(info?.hsl.h).toBe(0)
      expect(info?.hsl.s).toBe(100)
      expect(info?.hsl.l).toBe(71)
    })

    it('should handle named colors', () => {
      const customTheme = {
        colors: {
          blackColor: 'black',
          whiteColor: 'white',
          transparentColor: 'transparent',
        },
      }
      const provider = createColorProvider(customTheme as any)

      expect(provider.getColor('blackColor')?.hex).toBe('#000000')
      expect(provider.getColor('whiteColor')?.hex).toBe('#ffffff')
    })

    it('should return null for current and inherit', () => {
      const customTheme = {
        colors: {
          currentColor: 'current',
          inheritColor: 'inherit',
        },
      }
      const provider = createColorProvider(customTheme as any)

      expect(provider.getColor('currentColor')).toBeNull()
      expect(provider.getColor('inheritColor')).toBeNull()
    })
  })

  describe('Default Provider', () => {
    it('should export default provider instance', () => {
      expect(colorProvider).toBeDefined()
      expect(colorProvider.getColor).toBeDefined()
    })
  })
})
