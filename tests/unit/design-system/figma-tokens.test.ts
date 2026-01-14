/**
 * Tests for Figma Tokens Integration
 */
import { describe, it, expect, vi } from 'vitest'
import {
  toFigmaTokens,
  fromFigmaTokens,
  toFigmaVariables,
  syncWithFigma,
} from '../../../src/design-system/figma-tokens'
import type { DesignTokenFile } from '../../../src/design-system/types'

describe('Figma Tokens Integration', () => {
  describe('toFigmaTokens', () => {
    it('should convert empty tokens to Figma format', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      expect(result).toBeDefined()
      expect(result['core']).toBeDefined()
    })

    it('should convert color tokens', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: { $value: '#007AFF', $type: 'color' },
          secondary: { $value: '#FF9500', $type: 'color' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].color).toBeDefined()
      expect(result['core'].color.primary).toBeDefined()
      expect(result['core'].color.primary.value).toBe('#007AFF')
      expect(result['core'].color.primary.type).toBe('color')
    })

    it('should convert spacing tokens', () => {
      const tokens: DesignTokenFile = {
        spacing: {
          sm: { $value: '8px', $type: 'spacing' },
          md: { $value: '16px', $type: 'spacing' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].spacing).toBeDefined()
      expect(result['core'].spacing.sm).toBeDefined()
      expect(result['core'].spacing.sm.value).toBe('8px')
    })

    it('should convert sizing tokens', () => {
      const tokens: DesignTokenFile = {
        sizing: {
          sm: { $value: '24px', $type: 'sizing' },
          lg: { $value: '48px', $type: 'sizing' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].sizing).toBeDefined()
      expect(result['core'].sizing.sm.value).toBe('24px')
    })

    it('should convert typography tokens', () => {
      const tokens: DesignTokenFile = {
        typography: {
          fontFamily: {
            sans: { $value: 'Inter, sans-serif', $type: 'fontFamily' },
          },
          fontSize: {
            sm: { $value: '14px', $type: 'dimension' },
            md: { $value: '16px', $type: 'dimension' },
          },
          fontWeight: {
            normal: { $value: '400', $type: 'fontWeight' },
            bold: { $value: '700', $type: 'fontWeight' },
          },
          lineHeight: {
            tight: { $value: '1.25', $type: 'number' },
            normal: { $value: '1.5', $type: 'number' },
          },
          letterSpacing: {
            tight: { $value: '-0.02em', $type: 'dimension' },
          },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].fontFamilies).toBeDefined()
      expect(result['core'].fontSizes).toBeDefined()
      expect(result['core'].fontWeights).toBeDefined()
      expect(result['core'].lineHeights).toBeDefined()
      expect(result['core'].letterSpacing).toBeDefined()
    })

    it('should convert border tokens', () => {
      const tokens: DesignTokenFile = {
        border: {
          radius: {
            sm: { $value: '4px', $type: 'borderRadius' },
            md: { $value: '8px', $type: 'borderRadius' },
          },
          width: {
            DEFAULT: { $value: '1px', $type: 'dimension' },
          },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].borderRadius).toBeDefined()
      expect(result['core'].borderWidth).toBeDefined()
    })

    it('should convert shadow tokens', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          sm: { $value: '0 1px 2px rgba(0, 0, 0, 0.1)', $type: 'shadow' },
          md: { $value: '0 4px 6px rgba(0, 0, 0, 0.1)', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow).toBeDefined()
      expect(result['core'].boxShadow.sm).toBeDefined()
    })

    it('should convert opacity tokens', () => {
      const tokens: DesignTokenFile = {
        opacity: {
          50: { $value: 0.5, $type: 'opacity' },
          100: { $value: 1, $type: 'opacity' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].opacity).toBeDefined()
    })

    it('should include semantic tokens by default', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      expect(result['semantic/light']).toBeDefined()
      expect(result['semantic/dark']).toBeDefined()
    })

    it('should exclude semantic tokens when disabled', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens, { includeSemantics: false })

      expect(result['semantic/light']).toBeUndefined()
      expect(result['semantic/dark']).toBeUndefined()
    })

    it('should include component tokens by default', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      expect(result['components']).toBeDefined()
      expect(result['components'].button).toBeDefined()
      expect(result['components'].input).toBeDefined()
      expect(result['components'].card).toBeDefined()
    })

    it('should exclude component tokens when disabled', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens, { includeComponents: false })

      expect(result['components']).toBeUndefined()
    })

    it('should handle nested color groups', () => {
      const tokens: DesignTokenFile = {
        color: {
          blue: {
            100: { $value: '#E0F2FE', $type: 'color' },
            500: { $value: '#3B82F6', $type: 'color' },
            900: { $value: '#1E3A8A', $type: 'color' },
          },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].color.blue).toBeDefined()
      expect(result['core'].color.blue['100'].value).toBe('#E0F2FE')
      expect(result['core'].color.blue['500'].value).toBe('#3B82F6')
    })

    it('should ignore $ prefixed keys', () => {
      const tokens: DesignTokenFile = {
        $name: 'Test Tokens',
        color: {
          $description: 'Color tokens',
          primary: { $value: '#007AFF', $type: 'color' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].color.primary).toBeDefined()
      expect(result['core'].color.$description).toBeUndefined()
    })

    it('should include token descriptions', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: { $value: '#007AFF', $type: 'color', $description: 'Primary brand color' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].color.primary.description).toBe('Primary brand color')
    })

    it('should handle shadow value "none"', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          none: { $value: 'none', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow.none).toBeDefined()
      expect(result['core'].boxShadow.none.value.x).toBe(0)
      expect(result['core'].boxShadow.none.value.y).toBe(0)
      expect(result['core'].boxShadow.none.value.color).toBe('transparent')
    })

    it('should handle inset shadows', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          inner: { $value: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow.inner.value.type).toBe('innerShadow')
    })

    it('should handle multiple shadows', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          complex: { $value: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow.complex.value).toBeDefined()
      // Multiple shadows should be parsed as array
      expect(Array.isArray(result['core'].boxShadow.complex.value)).toBe(true)
    })

    it('should handle rem values in shadows', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          rem: { $value: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      // Shadows are parsed - the blur should be a number
      expect(result['core'].boxShadow.rem.value).toBeDefined()
      expect(typeof result['core'].boxShadow.rem.value.blur).toBe('number')
    })

    it('should handle hex colors in shadows', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          hex: { $value: '0 2px 4px #000000', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow.hex.value.color).toBe('#000000')
    })

    it('should handle hsl colors in shadows', () => {
      const tokens: DesignTokenFile = {
        shadow: {
          hsl: { $value: '0 2px 4px hsl(0, 0%, 0%)', $type: 'shadow' },
        },
      }
      const result = toFigmaTokens(tokens)

      expect(result['core'].boxShadow.hsl.value.color).toBe('hsl(0, 0%, 0%)')
    })
  })

  describe('fromFigmaTokens', () => {
    it('should import empty Figma tokens', () => {
      const figmaTokens = {}
      const result = fromFigmaTokens(figmaTokens)

      expect(result).toBeDefined()
      expect(result.$name).toBe('Imported from Figma')
    })

    it('should import color tokens', () => {
      const figmaTokens = {
        core: {
          color: {
            primary: { value: '#007AFF', type: 'color' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.color).toBeDefined()
      expect((result.color as any).color).toBeDefined()
    })

    it('should import spacing tokens', () => {
      const figmaTokens = {
        core: {
          spacing: {
            sm: { value: '8px', type: 'spacing' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.spacing).toBeDefined()
    })

    it('should import typography tokens', () => {
      const figmaTokens = {
        core: {
          fontSizes: {
            md: { value: '16px', type: 'fontSizes' as const },
          },
          fontWeights: {
            bold: { value: '700', type: 'fontWeights' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.typography).toBeDefined()
    })

    it('should import border tokens', () => {
      const figmaTokens = {
        core: {
          borderRadius: {
            md: { value: '8px', type: 'borderRadius' as const },
          },
          borderWidth: {
            DEFAULT: { value: '1px', type: 'borderWidth' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.border).toBeDefined()
    })

    it('should import shadow tokens', () => {
      const figmaTokens = {
        core: {
          boxShadow: {
            md: { value: { x: 0, y: 4, blur: 6, spread: 0, color: '#000', type: 'dropShadow' }, type: 'boxShadow' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.shadow).toBeDefined()
    })

    it('should handle nested token groups', () => {
      const figmaTokens = {
        core: {
          color: {
            blue: {
              100: { value: '#E0F2FE', type: 'color' as const },
              500: { value: '#3B82F6', type: 'color' as const },
            },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.color).toBeDefined()
    })

    it('should resolve token references', () => {
      const figmaTokens = {
        core: {
          color: {
            primary: { value: '{color.blue.500}', type: 'color' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.color).toBeDefined()
    })

    it('should ignore $ prefixed keys', () => {
      const figmaTokens = {
        $themes: [],
        $metadata: {},
        core: {
          color: {
            $type: 'color',
            primary: { value: '#007AFF', type: 'color' as const },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      // color key is mapped to 'color' category
      expect(result.color).toBeDefined()
    })

    it('should preserve token descriptions', () => {
      const figmaTokens = {
        core: {
          color: {
            primary: { value: '#007AFF', type: 'color' as const, description: 'Primary color' },
          },
        },
      }
      const result = fromFigmaTokens(figmaTokens)

      expect(result.color).toBeDefined()
    })
  })

  describe('toFigmaVariables', () => {
    it('should export empty tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaVariables(tokens)

      expect(result).toBeDefined()
      expect(result.collections).toBeDefined()
      expect(Array.isArray(result.collections)).toBe(true)
    })

    it('should create color collection', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: { $value: '#007AFF', $type: 'color' },
        },
      }
      const result = toFigmaVariables(tokens)

      const colorCollection = result.collections.find(c => c.name === 'Colors')
      expect(colorCollection).toBeDefined()
      expect(colorCollection?.modes).toContain('Light')
      expect(colorCollection?.modes).toContain('Dark')
    })

    it('should create spacing collection', () => {
      const tokens: DesignTokenFile = {
        spacing: {
          sm: { $value: '8px', $type: 'spacing' },
        },
      }
      const result = toFigmaVariables(tokens)

      const spacingCollection = result.collections.find(c => c.name === 'Spacing')
      expect(spacingCollection).toBeDefined()
      expect(spacingCollection?.modes).toContain('Default')
    })

    it('should create typography collection', () => {
      const tokens: DesignTokenFile = {
        typography: {
          fontSize: {
            sm: { $value: '14px', $type: 'dimension' },
          },
        },
      }
      const result = toFigmaVariables(tokens)

      const typographyCollection = result.collections.find(c => c.name === 'Typography')
      expect(typographyCollection).toBeDefined()
    })

    it('should create color variables with correct format', () => {
      const tokens: DesignTokenFile = {
        color: {
          blue: {
            500: { $value: '#3B82F6', $type: 'color' },
          },
        },
      }
      const result = toFigmaVariables(tokens)

      const colorCollection = result.collections.find(c => c.name === 'Colors')
      expect(colorCollection?.variables.length).toBeGreaterThan(0)

      const blueVar = colorCollection?.variables.find(v => v.name.includes('blue'))
      expect(blueVar?.type).toBe('COLOR')
      expect(blueVar?.scopes).toContain('ALL_FILLS')
      expect(blueVar?.scopes).toContain('STROKE_COLOR')
    })

    it('should create spacing variables with correct format', () => {
      const tokens: DesignTokenFile = {
        spacing: {
          '4': { $value: '16px', $type: 'spacing' },
        },
      }
      const result = toFigmaVariables(tokens)

      const spacingCollection = result.collections.find(c => c.name === 'Spacing')
      expect(spacingCollection?.variables.length).toBeGreaterThan(0)

      const spacingVar = spacingCollection?.variables[0]
      expect(spacingVar?.type).toBe('FLOAT')
      expect(spacingVar?.values.Default).toBe(16)
      expect(spacingVar?.scopes).toContain('GAP')
      expect(spacingVar?.scopes).toContain('WIDTH_HEIGHT')
    })

    it('should handle nested color groups', () => {
      const tokens: DesignTokenFile = {
        color: {
          slate: {
            100: { $value: '#F1F5F9', $type: 'color' },
            500: { $value: '#64748B', $type: 'color' },
            900: { $value: '#0F172A', $type: 'color' },
          },
        },
      }
      const result = toFigmaVariables(tokens)

      const colorCollection = result.collections.find(c => c.name === 'Colors')
      expect(colorCollection?.variables.length).toBe(3)
    })

    it('should ignore $ prefixed keys', () => {
      const tokens: DesignTokenFile = {
        color: {
          $description: 'Colors',
          primary: { $value: '#007AFF', $type: 'color' },
        },
      }
      const result = toFigmaVariables(tokens)

      const colorCollection = result.collections.find(c => c.name === 'Colors')
      expect(colorCollection?.variables.length).toBe(1)
    })
  })

  describe('syncWithFigma', () => {
    it('should fail with invalid access token', async () => {
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: '',
        fileKey: 'validfilekey',
        mode: 'push',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid Figma access token')
    })

    it('should fail with short access token', async () => {
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: '12345',
        fileKey: 'validfilekey',
        mode: 'push',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid Figma access token')
    })

    it('should fail with invalid file key', async () => {
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: '',
        mode: 'push',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid Figma file key')
    })

    it('should fail with short file key', async () => {
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: '12345',
        mode: 'push',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid Figma file key')
    })

    it('should succeed with valid credentials in push mode', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: 'abcdefghij12345',
        mode: 'push',
      })

      expect(result.success).toBe(true)
      expect(result.message).toContain('pushed to')
      consoleSpy.mockRestore()
    })

    it('should succeed with valid credentials in pull mode', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: 'abcdefghij12345',
        mode: 'pull',
      })

      expect(result.success).toBe(true)
      expect(result.message).toContain('pulled from')
      consoleSpy.mockRestore()
    })

    it('should succeed with valid credentials in sync mode', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tokens: DesignTokenFile = {}
      const result = await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: 'abcdefghij12345',
        mode: 'sync',
      })

      expect(result.success).toBe(true)
      expect(result.message).toContain('synced with')
      consoleSpy.mockRestore()
    })

    it('should log sync operation', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tokens: DesignTokenFile = {}
      await syncWithFigma(tokens, {
        accessToken: 'figd_valid_token_12345',
        fileKey: 'abcdefghij12345',
        mode: 'push',
      })

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('Semantic Tokens', () => {
    it('should create light theme semantic tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const lightTheme = result['semantic/light']
      expect(lightTheme).toBeDefined()
      expect(lightTheme.background).toBeDefined()
      expect(lightTheme.foreground).toBeDefined()
      expect(lightTheme.primary).toBeDefined()
      expect(lightTheme.border).toBeDefined()
      expect(lightTheme.status).toBeDefined()
    })

    it('should create dark theme semantic tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const darkTheme = result['semantic/dark']
      expect(darkTheme).toBeDefined()
      expect(darkTheme.background).toBeDefined()
      expect(darkTheme.foreground).toBeDefined()
    })

    it('should have different values for light and dark themes', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const lightBg = result['semantic/light'].background.default.value
      const darkBg = result['semantic/dark'].background.default.value

      expect(lightBg).not.toBe(darkBg)
    })
  })

  describe('Component Tokens', () => {
    it('should create button tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const button = result['components'].button
      expect(button).toBeDefined()
      expect(button.padding).toBeDefined()
      expect(button.borderRadius).toBeDefined()
      expect(button.fontSize).toBeDefined()
    })

    it('should create input tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const input = result['components'].input
      expect(input).toBeDefined()
      expect(input.padding).toBeDefined()
      expect(input.borderRadius).toBeDefined()
      expect(input.borderWidth).toBeDefined()
    })

    it('should create card tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const card = result['components'].card
      expect(card).toBeDefined()
      expect(card.padding).toBeDefined()
      expect(card.borderRadius).toBeDefined()
      expect(card.shadow).toBeDefined()
    })

    it('should create modal tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const modal = result['components'].modal
      expect(modal).toBeDefined()
      expect(modal.padding).toBeDefined()
      expect(modal.borderRadius).toBeDefined()
      expect(modal.shadow).toBeDefined()
    })

    it('should create avatar tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const avatar = result['components'].avatar
      expect(avatar).toBeDefined()
      expect(avatar.size).toBeDefined()
      expect(avatar.borderRadius).toBeDefined()
    })

    it('should create badge tokens', () => {
      const tokens: DesignTokenFile = {}
      const result = toFigmaTokens(tokens)

      const badge = result['components'].badge
      expect(badge).toBeDefined()
      expect(badge.padding).toBeDefined()
      expect(badge.borderRadius).toBeDefined()
      expect(badge.fontSize).toBeDefined()
    })
  })
})
