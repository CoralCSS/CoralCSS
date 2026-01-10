import { describe, it, expect } from 'vitest'
import {
  tokenToCSSVar,
  flattenTokens,
  generateCSSVariables,
  generateSCSSVariables,
  generateJSON,
  generateJS,
  generateTokens,
  generateThemeCSS,
  generateUtilityClass,
  generateUtilityClasses,
} from '../../../src/tokens/generator'
import { ref } from '../../../src/tokens/ref'
import type { DesignTokens } from '../../../src/tokens/types'

describe('Token Generator', () => {
  describe('tokenToCSSVar', () => {
    it('should convert simple path to CSS variable', () => {
      expect(tokenToCSSVar('colors.red')).toBe('--colors-red')
    })

    it('should handle nested paths', () => {
      expect(tokenToCSSVar('colors.red.500')).toBe('--colors-red-500')
    })

    it('should convert camelCase to kebab-case', () => {
      expect(tokenToCSSVar('fontSize.base')).toBe('--font-size-base')
    })

    it('should handle prefix', () => {
      expect(tokenToCSSVar('colors.red', 'coral')).toBe('--coral-colors-red')
    })

    it('should handle empty prefix', () => {
      expect(tokenToCSSVar('colors.red', '')).toBe('--colors-red')
    })
  })

  describe('flattenTokens', () => {
    it('should flatten simple object', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = flattenTokens(tokens)

      expect(result.get('colors.red')).toBe('#ff0000')
    })

    it('should flatten deeply nested object', () => {
      const tokens = { colors: { red: { 500: '#ff0000' } } }
      const result = flattenTokens(tokens)

      expect(result.get('colors.red.500')).toBe('#ff0000')
    })

    it('should handle objects with value property', () => {
      const tokens = { colors: { red: { value: '#ff0000' } } }
      const result = flattenTokens(tokens)

      expect(result.get('colors.red')).toBe('#ff0000')
    })

    it('should handle numeric values', () => {
      const tokens = { spacing: { 4: 16 } }
      const result = flattenTokens(tokens)

      expect(result.get('spacing.4')).toBe(16)
    })

    it('should handle ref values', () => {
      const tokens = { colors: { primary: ref('colors.red') } }
      const result = flattenTokens(tokens)

      expect(result.get('colors.primary')).toHaveProperty('$ref', 'colors.red')
    })

    it('should skip null and undefined values', () => {
      const tokens = { colors: { red: '#ff0000', blue: null, green: undefined } }
      const result = flattenTokens(tokens)

      expect(result.get('colors.red')).toBe('#ff0000')
      expect(result.has('colors.blue')).toBe(false)
      expect(result.has('colors.green')).toBe(false)
    })

    it('should handle prefix', () => {
      const tokens = { red: '#ff0000' }
      const result = flattenTokens(tokens, 'colors')

      expect(result.get('colors.red')).toBe('#ff0000')
    })
  })

  describe('generateCSSVariables', () => {
    it('should generate CSS variables with default selector', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateCSSVariables(tokens)

      expect(result).toContain(':root {')
      expect(result).toContain('--colors-red: #ff0000;')
      expect(result).toContain('}')
    })

    it('should handle custom selector', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateCSSVariables(tokens, { selector: '.theme-light' })

      expect(result).toContain('.theme-light {')
    })

    it('should handle no selector', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateCSSVariables(tokens, { selector: '' })

      expect(result).not.toContain('{')
      expect(result).toContain('--colors-red: #ff0000;')
    })

    it('should handle prefix', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateCSSVariables(tokens, { prefix: 'coral' })

      expect(result).toContain('--coral-colors-red: #ff0000;')
    })

    it('should include comments when enabled', () => {
      const tokens = { colors: { red: '#ff0000' }, spacing: { 4: '1rem' } }
      const result = generateCSSVariables(tokens, {
        includeComments: true,
        categorize: true,
      })

      expect(result).toContain('/* colors */')
      expect(result).toContain('/* spacing */')
    })

    it('should handle ref values', () => {
      const tokens = { colors: { primary: ref('colors.red') } }
      const result = generateCSSVariables(tokens)

      expect(result).toContain('var(--colors-red)')
    })

    it('should handle array values', () => {
      const tokens = { fontFamily: { sans: ['Arial', 'sans-serif'] } }
      const result = generateCSSVariables(tokens)

      expect(result).toContain('Arial, sans-serif')
    })

    it('should handle numeric values', () => {
      const tokens = { spacing: { 4: 16 } }
      const result = generateCSSVariables(tokens)

      expect(result).toContain('--spacing-4: 16;')
    })
  })

  describe('generateSCSSVariables', () => {
    it('should generate SCSS variables', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateSCSSVariables(tokens)

      expect(result).toContain('$colors-red: #ff0000;')
    })

    it('should handle prefix', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateSCSSVariables(tokens, { prefix: 'coral' })

      expect(result).toContain('$coral-colors-red: #ff0000;')
    })

    it('should handle ref values', () => {
      const tokens = { colors: { primary: ref('colors.red') } }
      const result = generateSCSSVariables(tokens)

      expect(result).toContain('$colors-red')
    })

    it('should handle array values', () => {
      const tokens = { fontFamily: { sans: ['Arial', 'sans-serif'] } }
      const result = generateSCSSVariables(tokens)

      expect(result).toContain('(Arial, sans-serif)')
    })

    it('should include comments when enabled', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateSCSSVariables(tokens, {
        includeComments: true,
        categorize: true,
      })

      expect(result).toContain('// colors')
    })
  })

  describe('generateJSON', () => {
    it('should generate JSON output', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateJSON(tokens)

      expect(JSON.parse(result)).toEqual(tokens)
    })

    it('should generate flat JSON output', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateJSON(tokens, { flat: true })
      const parsed = JSON.parse(result)

      expect(parsed['colors.red']).toBe('#ff0000')
    })
  })

  describe('generateJS', () => {
    it('should generate JavaScript output', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateJS(tokens)

      expect(result).toContain('export const tokens =')
      expect(result).toContain('"colors"')
      expect(result).toContain('"red"')
    })

    it('should generate TypeScript output', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateJS(tokens, { typescript: true })

      expect(result).toContain('as const')
      expect(result).toContain('export type Tokens')
    })

    it('should handle custom export name', () => {
      const tokens = { colors: { red: '#ff0000' } }
      const result = generateJS(tokens, { exportName: 'designTokens' })

      expect(result).toContain('export const designTokens =')
    })
  })

  describe('generateTokens', () => {
    const tokens = { colors: { red: '#ff0000' } }

    it('should generate CSS by default', () => {
      const result = generateTokens(tokens)

      expect(result).toContain(':root')
      expect(result).toContain('--colors-red')
    })

    it('should generate CSS when format is css', () => {
      const result = generateTokens(tokens, { format: 'css' })

      expect(result).toContain(':root')
    })

    it('should generate SCSS when format is scss', () => {
      const result = generateTokens(tokens, { format: 'scss' })

      expect(result).toContain('$colors-red')
    })

    it('should generate JSON when format is json', () => {
      const result = generateTokens(tokens, { format: 'json' })

      expect(JSON.parse(result)).toEqual(tokens)
    })

    it('should generate JS when format is js', () => {
      const result = generateTokens(tokens, { format: 'js' })

      expect(result).toContain('export const tokens')
    })

    it('should generate TS when format is ts', () => {
      const result = generateTokens(tokens, { format: 'ts' })

      expect(result).toContain('as const')
    })

    it('should throw for unsupported format', () => {
      expect(() => generateTokens(tokens, { format: 'xml' as 'css' })).toThrow(
        'Unsupported output format'
      )
    })
  })

  describe('generateThemeCSS', () => {
    const lightTokens = { colors: { background: '#ffffff' } }
    const darkTokens = { colors: { background: '#1a1a2e' } }

    it('should generate light and dark theme CSS', () => {
      const result = generateThemeCSS(lightTokens, darkTokens)

      expect(result).toContain(':root {')
      expect(result).toContain('.dark {')
      expect(result).toContain('#ffffff')
      expect(result).toContain('#1a1a2e')
    })

    it('should handle custom selectors', () => {
      const result = generateThemeCSS(lightTokens, darkTokens, {
        lightSelector: '[data-theme="light"]',
        darkSelector: '[data-theme="dark"]',
      })

      expect(result).toContain('[data-theme="light"]')
      expect(result).toContain('[data-theme="dark"]')
    })

    it('should include media query by default', () => {
      const result = generateThemeCSS(lightTokens, darkTokens)

      expect(result).toContain('@media (prefers-color-scheme: dark)')
      expect(result).toContain(':root:not(.light)')
    })

    it('should skip media query when disabled', () => {
      const result = generateThemeCSS(lightTokens, darkTokens, {
        darkMediaQuery: false,
      })

      expect(result).not.toContain('@media (prefers-color-scheme: dark)')
    })

    it('should handle prefix', () => {
      const result = generateThemeCSS(lightTokens, darkTokens, {
        prefix: 'coral',
      })

      expect(result).toContain('--coral-colors-background')
    })
  })

  describe('generateUtilityClass', () => {
    it('should generate utility class', () => {
      const result = generateUtilityClass('background-color', 'colors.red')

      expect(result).toBe('.colors-red { background-color: var(--colors-red); }')
    })

    it('should handle prefix', () => {
      const result = generateUtilityClass('background-color', 'colors.red', 'coral')

      expect(result).toBe('.colors-red { background-color: var(--coral-colors-red); }')
    })

    it('should convert camelCase to kebab-case', () => {
      const result = generateUtilityClass('font-size', 'fontSize.base')

      expect(result).toContain('.font-size-base')
    })
  })

  describe('generateUtilityClasses', () => {
    it('should generate utility classes for all tokens', () => {
      const tokens = { red: '#ff0000', blue: '#0000ff' }
      const result = generateUtilityClasses(tokens, 'background-color')

      expect(result).toContain('.red { background-color: var(--red); }')
      expect(result).toContain('.blue { background-color: var(--blue); }')
    })

    it('should handle prefix', () => {
      const tokens = { red: '#ff0000' }
      const result = generateUtilityClasses(tokens, 'background-color', {
        prefix: 'coral',
      })

      expect(result).toContain('var(--coral-red)')
    })

    it('should handle class prefix', () => {
      const tokens = { red: '#ff0000' }
      const result = generateUtilityClasses(tokens, 'background-color', {
        classPrefix: 'bg-',
      })

      expect(result).toContain('.bg-red')
    })
  })
})
