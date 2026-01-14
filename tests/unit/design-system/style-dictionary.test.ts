/**
 * Style Dictionary Integration Tests
 *
 * Tests for Style Dictionary token generation.
 */
import { describe, it, expect } from 'vitest'
import {
  createStyleDictionaryConfig,
  toStyleDictionary,
  buildTokens,
  getDefaultTokens,
} from '../../../src/design-system/style-dictionary'

describe('Style Dictionary Integration', () => {
  describe('createStyleDictionaryConfig', () => {
    it('should create config with default options', () => {
      const config = createStyleDictionaryConfig()

      expect(config).toBeDefined()
      expect(config.source).toBeDefined()
      expect(config.platforms).toBeDefined()
      expect(config.hooks).toBeDefined()
    })

    it('should create config with custom platforms', () => {
      const config = createStyleDictionaryConfig({
        platforms: ['web', 'ios'],
      })

      expect(config.platforms).toHaveProperty('web')
      expect(config.platforms).toHaveProperty('ios')
    })

    it('should create config with custom output directory', () => {
      const config = createStyleDictionaryConfig({
        outputDir: 'custom/output',
        platforms: ['web'],
      })

      expect(config.platforms.web?.buildPath).toContain('custom/output')
    })

    it('should create config with custom prefix', () => {
      const config = createStyleDictionaryConfig({
        prefix: 'myapp',
        platforms: ['web'],
      })

      expect(config.platforms.web?.prefix).toBe('myapp')
    })

    it('should include transform hooks', () => {
      const config = createStyleDictionaryConfig()

      expect(config.hooks?.transforms).toBeDefined()
      expect(config.hooks?.transformGroups).toBeDefined()
    })
  })

  describe('toStyleDictionary', () => {
    it('should convert empty tokens', () => {
      const result = toStyleDictionary({})

      expect(result).toBeDefined()
      expect(result.$name).toBe('CoralCSS Design Tokens')
      expect(result.$version).toBe('1.1.0')
    })

    it('should convert color tokens', () => {
      const tokens = {
        colors: {
          primary: '#ff6347',
          secondary: '#4a90d9',
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.color).toBeDefined()
      expect(result.color?.primary).toHaveProperty('$value', '#ff6347')
      expect(result.color?.primary).toHaveProperty('$type', 'color')
    })

    it('should convert nested color scales', () => {
      const tokens = {
        colors: {
          gray: {
            '100': '#f5f5f5',
            '500': '#9e9e9e',
            '900': '#212121',
          },
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.color?.gray?.['100']).toHaveProperty('$value', '#f5f5f5')
      expect(result.color?.gray?.['500']).toHaveProperty('$value', '#9e9e9e')
    })

    it('should convert spacing tokens', () => {
      const tokens = {
        spacing: {
          '1': '0.25rem',
          '2': '0.5rem',
          '4': '1rem',
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.spacing).toBeDefined()
      expect(result.spacing?.['1']).toHaveProperty('$value', '0.25rem')
      expect(result.spacing?.['1']).toHaveProperty('$type', 'spacing')
    })

    it('should convert numeric spacing to rem', () => {
      const tokens = {
        spacing: {
          '1': 0.25, // numeric value
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.spacing?.['1']).toHaveProperty('$value', '0.25rem')
    })

    it('should convert sizing tokens', () => {
      const tokens = {
        sizing: {
          full: '100%',
          half: '50%',
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.sizing).toBeDefined()
      expect(result.sizing?.full).toHaveProperty('$type', 'sizing')
    })

    it('should convert typography tokens', () => {
      const tokens = {
        typography: {
          fontFamily: {
            sans: 'Inter, sans-serif',
            mono: 'Monaco, monospace',
          },
          fontSize: {
            sm: '0.875rem',
            base: '1rem',
          },
          fontWeight: {
            normal: 400,
            bold: 700,
          },
          lineHeight: {
            tight: 1.25,
            normal: 1.5,
          },
          letterSpacing: {
            tight: '-0.025em',
            normal: '0',
          },
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.typography).toBeDefined()
      expect(result.typography?.fontFamily?.sans).toHaveProperty('$type', 'fontFamily')
      expect(result.typography?.fontSize?.sm).toHaveProperty('$type', 'dimension')
      expect(result.typography?.fontWeight?.bold).toHaveProperty('$value', 700)
      expect(result.typography?.lineHeight?.normal).toHaveProperty('$type', 'number')
      expect(result.typography?.letterSpacing?.tight).toHaveProperty('$type', 'dimension')
    })

    it('should handle font family arrays', () => {
      const tokens = {
        typography: {
          fontFamily: {
            sans: ['Inter', 'Helvetica', 'sans-serif'],
          },
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.typography?.fontFamily?.sans).toHaveProperty(
        '$value',
        'Inter, Helvetica, sans-serif'
      )
    })

    it('should handle font size with line height', () => {
      const tokens = {
        typography: {
          fontSize: {
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
          },
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.typography?.fontSize?.lg).toHaveProperty('$value', '1.125rem')
    })

    it('should convert border tokens', () => {
      const tokens = {
        borders: {
          width: {
            '1': '1px',
            '2': '2px',
          },
          radius: {
            sm: '0.125rem',
            md: '0.375rem',
          },
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.border).toBeDefined()
      expect(result.border?.width?.['1']).toHaveProperty('$type', 'dimension')
      expect(result.border?.radius?.sm).toHaveProperty('$type', 'borderRadius')
    })

    it('should convert shadow tokens', () => {
      const tokens = {
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.shadow).toBeDefined()
      expect(result.shadow?.sm).toHaveProperty('$type', 'shadow')
    })

    it('should convert motion tokens', () => {
      const tokens = {
        durations: {
          fast: '150ms',
          normal: '300ms',
        },
        easings: {
          in: 'cubic-bezier(0.4, 0, 1, 1)',
          out: 'cubic-bezier(0, 0, 0.2, 1)',
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.motion).toBeDefined()
      expect(result.motion?.duration?.fast).toHaveProperty('$type', 'duration')
      expect(result.motion?.easing?.in).toHaveProperty('$type', 'cubicBezier')
    })

    it('should convert opacity tokens', () => {
      const tokens = {
        opacity: {
          '50': 0.5,
          '100': 1,
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.opacity).toBeDefined()
      expect(result.opacity?.['50']).toHaveProperty('$type', 'opacity')
    })

    it('should convert z-index tokens', () => {
      const tokens = {
        zIndex: {
          '10': 10,
          '50': 50,
        },
      }

      const result = toStyleDictionary(tokens)

      expect(result.zIndex).toBeDefined()
      expect(result.zIndex?.['10']).toHaveProperty('$type', 'number')
    })

    it('should use custom prefix', () => {
      const tokens = {
        colors: {
          primary: '#ff6347',
        },
      }

      const result = toStyleDictionary(tokens, { prefix: 'myapp' })

      expect(result).toBeDefined()
    })
  })

  describe('buildTokens', () => {
    it('should build tokens for web platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web'],
        outputDir: 'dist/tokens',
        prefix: 'coral',
      })

      expect(outputs).toBeInstanceOf(Map)
      expect(outputs.size).toBeGreaterThan(0)

      // Check for CSS output
      const cssOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.css')
      )
      expect(cssOutput).toBeDefined()
      expect(cssOutput?.[1]).toContain(':root')
    })

    it('should build tokens for SCSS platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-scss'],
        outputDir: '',
        prefix: 'coral',
      })

      // Check for SCSS output
      const scssOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.scss')
      )
      expect(scssOutput).toBeDefined()
      expect(scssOutput?.[1]).toContain('$')
    })

    it('should build tokens for JavaScript platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-js'],
        outputDir: '',
      })

      const jsOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.js')
      )
      expect(jsOutput).toBeDefined()
      expect(jsOutput?.[1]).toContain('export')
    })

    it('should build tokens for TypeScript platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-ts'],
        outputDir: '',
      })

      const tsOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.ts')
      )
      expect(tsOutput).toBeDefined()
    })

    it('should build tokens for iOS platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['ios'],
        outputDir: '',
      })

      const swiftOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.swift')
      )
      expect(swiftOutput).toBeDefined()
      expect(swiftOutput?.[1]).toContain('import SwiftUI')
    })

    it('should build tokens for Android Compose platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['android-compose'],
        outputDir: '',
      })

      const ktOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.kt')
      )
      expect(ktOutput).toBeDefined()
      expect(ktOutput?.[1]).toContain('package')
    })

    it('should build tokens for Figma platform', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['figma'],
        outputDir: '',
      })

      const jsonOutput = Array.from(outputs.entries()).find(([key]) =>
        key.includes('.json')
      )
      expect(jsonOutput).toBeDefined()
    })

    it('should build tokens for multiple platforms', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web', 'web-scss', 'web-js'],
        outputDir: 'dist',
      })

      expect(outputs.size).toBeGreaterThan(3)
    })

    it('should use default options when not provided', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens)

      expect(outputs).toBeInstanceOf(Map)
    })
  })

  describe('getDefaultTokens', () => {
    it('should return coral tokens', () => {
      const tokens = getDefaultTokens()

      expect(tokens).toBeDefined()
      expect(tokens.$name).toBe('CoralCSS Design Tokens')
      expect(tokens.$version).toBe('1.1.0')
    })

    it('should include color tokens', () => {
      const tokens = getDefaultTokens()

      expect(tokens.color).toBeDefined()
    })

    it('should include spacing tokens', () => {
      const tokens = getDefaultTokens()

      expect(tokens.spacing).toBeDefined()
    })

    it('should include semantic tokens', () => {
      const tokens = getDefaultTokens()

      expect(tokens.semantic).toBeDefined()
    })

    it('should include component tokens', () => {
      const tokens = getDefaultTokens()

      expect(tokens.component).toBeDefined()
    })
  })

  describe('format functions', () => {
    it('should format CSS with proper structure', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web'],
        outputDir: '',
        prefix: 'test',
      })

      const cssOutput = Array.from(outputs.values()).find((v) =>
        v.includes(':root')
      )
      expect(cssOutput).toContain('--test-')
      expect(cssOutput).toContain(':root {')
      expect(cssOutput).toContain('}')
    })

    it('should format SCSS with proper structure', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-scss'],
        outputDir: '',
        prefix: 'test',
      })

      const scssOutput = Array.from(outputs.values()).find((v) =>
        v.includes('$test-')
      )
      expect(scssOutput).toContain('$test-')
    })

    it('should format JavaScript with proper structure', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-js'],
        outputDir: '',
      })

      const jsOutput = Array.from(outputs.values()).find((v) =>
        v.includes('export const tokens')
      )
      expect(jsOutput).toContain('export const tokens')
      expect(jsOutput).toContain('export default tokens')
    })

    it('should format TypeScript declarations', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['web-ts'],
        outputDir: '',
      })

      const dtsOutput = Array.from(outputs.values()).find((v) =>
        v.includes('interface CoralTokens')
      )
      expect(dtsOutput).toBeDefined()
    })

    it('should format Swift with proper structure', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['ios'],
        outputDir: '',
        prefix: 'MyApp',
      })

      const swiftOutput = Array.from(outputs.values()).find((v) =>
        v.includes('public enum')
      )
      expect(swiftOutput).toContain('import SwiftUI')
      expect(swiftOutput).toContain('public enum')
    })

    it('should format Kotlin Compose with proper structure', () => {
      const tokens = getDefaultTokens()
      const outputs = buildTokens(tokens, {
        platforms: ['android-compose'],
        outputDir: '',
      })

      const ktOutput = Array.from(outputs.values()).find((v) =>
        v.includes('object')
      )
      expect(ktOutput).toContain('package com.coralcss.tokens')
      expect(ktOutput).toContain('import androidx.compose.ui.graphics.Color')
    })
  })
})
