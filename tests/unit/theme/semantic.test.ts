/**
 * Tests for Theme Semantic Tokens
 */
import { describe, it, expect } from 'vitest'
import {
  lightSemanticTokens,
  darkSemanticTokens,
  themePresets,
  generateSemanticCSS,
  generateSemanticThemeCSS,
  generateCustomSemanticThemeCSS,
} from '../../../src/theme/semantic'
import type { SemanticTokens, ThemePresetName } from '../../../src/theme/semantic'

describe('Theme Semantic Tokens', () => {
  describe('lightSemanticTokens', () => {
    it('should have all required token properties', () => {
      expect(lightSemanticTokens.background).toBeDefined()
      expect(lightSemanticTokens.foreground).toBeDefined()
      expect(lightSemanticTokens.card).toBeDefined()
      expect(lightSemanticTokens.cardForeground).toBeDefined()
      expect(lightSemanticTokens.popover).toBeDefined()
      expect(lightSemanticTokens.popoverForeground).toBeDefined()
      expect(lightSemanticTokens.primary).toBeDefined()
      expect(lightSemanticTokens.primaryForeground).toBeDefined()
      expect(lightSemanticTokens.secondary).toBeDefined()
      expect(lightSemanticTokens.secondaryForeground).toBeDefined()
      expect(lightSemanticTokens.muted).toBeDefined()
      expect(lightSemanticTokens.mutedForeground).toBeDefined()
      expect(lightSemanticTokens.accent).toBeDefined()
      expect(lightSemanticTokens.accentForeground).toBeDefined()
      expect(lightSemanticTokens.destructive).toBeDefined()
      expect(lightSemanticTokens.destructiveForeground).toBeDefined()
      expect(lightSemanticTokens.border).toBeDefined()
      expect(lightSemanticTokens.input).toBeDefined()
      expect(lightSemanticTokens.ring).toBeDefined()
      expect(lightSemanticTokens.radius).toBeDefined()
    })

    it('should have valid HSL values for colors', () => {
      // HSL format: "H S% L%" or "H S% L%"
      expect(lightSemanticTokens.background).toMatch(/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/)
      expect(lightSemanticTokens.primary).toMatch(/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/)
    })

    it('should have valid radius value', () => {
      expect(lightSemanticTokens.radius).toMatch(/^\d+(\.\d+)?rem$/)
    })
  })

  describe('darkSemanticTokens', () => {
    it('should have all required token properties', () => {
      expect(darkSemanticTokens.background).toBeDefined()
      expect(darkSemanticTokens.foreground).toBeDefined()
      expect(darkSemanticTokens.card).toBeDefined()
      expect(darkSemanticTokens.cardForeground).toBeDefined()
      expect(darkSemanticTokens.popover).toBeDefined()
      expect(darkSemanticTokens.popoverForeground).toBeDefined()
      expect(darkSemanticTokens.primary).toBeDefined()
      expect(darkSemanticTokens.primaryForeground).toBeDefined()
      expect(darkSemanticTokens.secondary).toBeDefined()
      expect(darkSemanticTokens.secondaryForeground).toBeDefined()
      expect(darkSemanticTokens.muted).toBeDefined()
      expect(darkSemanticTokens.mutedForeground).toBeDefined()
      expect(darkSemanticTokens.accent).toBeDefined()
      expect(darkSemanticTokens.accentForeground).toBeDefined()
      expect(darkSemanticTokens.destructive).toBeDefined()
      expect(darkSemanticTokens.destructiveForeground).toBeDefined()
      expect(darkSemanticTokens.border).toBeDefined()
      expect(darkSemanticTokens.input).toBeDefined()
      expect(darkSemanticTokens.ring).toBeDefined()
      expect(darkSemanticTokens.radius).toBeDefined()
    })

    it('should have valid HSL values for colors', () => {
      expect(darkSemanticTokens.background).toMatch(/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/)
      expect(darkSemanticTokens.primary).toMatch(/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/)
    })
  })

  describe('themePresets', () => {
    it('should have coral preset', () => {
      expect(themePresets.coral).toBeDefined()
      expect(themePresets.coral.light).toEqual(lightSemanticTokens)
      expect(themePresets.coral.dark).toEqual(darkSemanticTokens)
    })

    it('should have blue preset with custom primary', () => {
      expect(themePresets.blue).toBeDefined()
      expect(themePresets.blue.light.primary).toContain('221.2')
      expect(themePresets.blue.dark.primary).toContain('217.2')
    })

    it('should have green preset with custom primary', () => {
      expect(themePresets.green).toBeDefined()
      expect(themePresets.green.light.primary).toContain('142.1')
      expect(themePresets.green.dark.primary).toContain('142.1')
    })

    it('should have purple preset with custom primary', () => {
      expect(themePresets.purple).toBeDefined()
      expect(themePresets.purple.light.primary).toContain('262.1')
      expect(themePresets.purple.dark.primary).toContain('263.4')
    })

    it('should have rose preset with custom primary', () => {
      expect(themePresets.rose).toBeDefined()
      expect(themePresets.rose.light.primary).toContain('346.8')
      expect(themePresets.rose.dark.primary).toContain('346.8')
    })

    it('should have amber preset with custom primary', () => {
      expect(themePresets.amber).toBeDefined()
      expect(themePresets.amber.light.primary).toContain('37.7')
      expect(themePresets.amber.dark.primary).toContain('43.3')
    })

    it('should have slate preset with custom primary', () => {
      expect(themePresets.slate).toBeDefined()
      expect(themePresets.slate.light.primary).toContain('215.4')
      expect(themePresets.slate.dark.primary).toContain('217.9')
    })

    it('should have zinc preset with full overrides', () => {
      expect(themePresets.zinc).toBeDefined()
      expect(themePresets.zinc.light.background).toBe('0 0% 100%')
      expect(themePresets.zinc.light.foreground).toBe('240 10% 3.9%')
      expect(themePresets.zinc.dark.background).toBe('240 10% 3.9%')
      expect(themePresets.zinc.dark.foreground).toBe('0 0% 98%')
    })

    it('should have all presets accessible by name', () => {
      const presetNames: ThemePresetName[] = ['coral', 'blue', 'green', 'purple', 'rose', 'amber', 'slate', 'zinc']
      for (const name of presetNames) {
        expect(themePresets[name]).toBeDefined()
        expect(themePresets[name].light).toBeDefined()
        expect(themePresets[name].dark).toBeDefined()
      }
    })
  })

  describe('generateSemanticCSS', () => {
    it('should generate CSS variables from tokens', () => {
      const css = generateSemanticCSS(lightSemanticTokens)
      expect(css).toContain('--background:')
      expect(css).toContain('--foreground:')
      expect(css).toContain('--card:')
      expect(css).toContain('--card-foreground:')
      expect(css).toContain('--popover:')
      expect(css).toContain('--popover-foreground:')
      expect(css).toContain('--primary:')
      expect(css).toContain('--primary-foreground:')
      expect(css).toContain('--secondary:')
      expect(css).toContain('--secondary-foreground:')
      expect(css).toContain('--muted:')
      expect(css).toContain('--muted-foreground:')
      expect(css).toContain('--accent:')
      expect(css).toContain('--accent-foreground:')
      expect(css).toContain('--destructive:')
      expect(css).toContain('--destructive-foreground:')
      expect(css).toContain('--border:')
      expect(css).toContain('--input:')
      expect(css).toContain('--ring:')
      expect(css).toContain('--radius:')
    })

    it('should include token values in CSS', () => {
      const css = generateSemanticCSS(lightSemanticTokens)
      expect(css).toContain(lightSemanticTokens.background)
      expect(css).toContain(lightSemanticTokens.primary)
      expect(css).toContain(lightSemanticTokens.radius)
    })

    it('should work with dark tokens', () => {
      const css = generateSemanticCSS(darkSemanticTokens)
      expect(css).toContain(darkSemanticTokens.background)
      expect(css).toContain(darkSemanticTokens.primary)
    })
  })

  describe('generateSemanticThemeCSS', () => {
    it('should generate theme CSS with default coral preset and class strategy', () => {
      const css = generateSemanticThemeCSS()
      expect(css).toContain(':root {')
      expect(css).toContain('.dark {')
      expect(css).toContain(lightSemanticTokens.primary)
    })

    it('should generate theme CSS with coral preset', () => {
      const css = generateSemanticThemeCSS('coral', 'class')
      expect(css).toContain(':root {')
      expect(css).toContain('.dark {')
    })

    it('should generate theme CSS with blue preset', () => {
      const css = generateSemanticThemeCSS('blue', 'class')
      expect(css).toContain(':root {')
      expect(css).toContain(themePresets.blue.light.primary)
    })

    it('should generate theme CSS with green preset', () => {
      const css = generateSemanticThemeCSS('green', 'class')
      expect(css).toContain(themePresets.green.light.primary)
    })

    it('should generate theme CSS with purple preset', () => {
      const css = generateSemanticThemeCSS('purple', 'class')
      expect(css).toContain(themePresets.purple.light.primary)
    })

    it('should generate theme CSS with rose preset', () => {
      const css = generateSemanticThemeCSS('rose', 'class')
      expect(css).toContain(themePresets.rose.light.primary)
    })

    it('should generate theme CSS with amber preset', () => {
      const css = generateSemanticThemeCSS('amber', 'class')
      expect(css).toContain(themePresets.amber.light.primary)
    })

    it('should generate theme CSS with slate preset', () => {
      const css = generateSemanticThemeCSS('slate', 'class')
      expect(css).toContain(themePresets.slate.light.primary)
    })

    it('should generate theme CSS with zinc preset', () => {
      const css = generateSemanticThemeCSS('zinc', 'class')
      expect(css).toContain(themePresets.zinc.light.primary)
    })

    describe('dark mode strategies', () => {
      it('should use class strategy by default', () => {
        const css = generateSemanticThemeCSS('coral')
        expect(css).toContain('.dark {')
        expect(css).not.toContain('@media (prefers-color-scheme: dark)')
      })

      it('should use class strategy', () => {
        const css = generateSemanticThemeCSS('coral', 'class')
        expect(css).toContain('.dark {')
      })

      it('should use media strategy', () => {
        const css = generateSemanticThemeCSS('coral', 'media')
        expect(css).toContain('@media (prefers-color-scheme: dark)')
        expect(css).toContain(':root {')
      })

      it('should use selector strategy', () => {
        const css = generateSemanticThemeCSS('coral', 'selector')
        expect(css).toContain('[data-theme="dark"]')
      })

      it('should use auto strategy', () => {
        const css = generateSemanticThemeCSS('coral', 'auto')
        expect(css).toContain('.dark {')
        expect(css).toContain('@media (prefers-color-scheme: dark)')
        expect(css).toContain(':root:not(.light)')
      })

      it('should fall back to class strategy for unknown strategy', () => {
        const css = generateSemanticThemeCSS('coral', 'unknown' as any)
        expect(css).toContain('.dark {')
      })
    })
  })

  describe('generateCustomSemanticThemeCSS', () => {
    it('should generate custom theme CSS with partial overrides', () => {
      const css = generateCustomSemanticThemeCSS(
        { primary: '200 100% 50%' },
        { primary: '200 100% 30%' }
      )
      expect(css).toContain(':root {')
      expect(css).toContain('200 100% 50%')
      expect(css).toContain('200 100% 30%')
    })

    it('should merge with default light tokens', () => {
      const css = generateCustomSemanticThemeCSS(
        { primary: 'custom-primary' },
        {}
      )
      expect(css).toContain('custom-primary')
      expect(css).toContain(lightSemanticTokens.background)
    })

    it('should merge with default dark tokens', () => {
      const css = generateCustomSemanticThemeCSS(
        {},
        { primary: 'custom-dark-primary' }
      )
      expect(css).toContain('custom-dark-primary')
      expect(css).toContain(darkSemanticTokens.background)
    })

    it('should support class strategy', () => {
      const css = generateCustomSemanticThemeCSS({}, {}, 'class')
      expect(css).toContain('.dark {')
    })

    it('should support media strategy', () => {
      const css = generateCustomSemanticThemeCSS({}, {}, 'media')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should default to class strategy for unknown strategies', () => {
      const css = generateCustomSemanticThemeCSS({}, {}, 'unknown' as any)
      expect(css).toContain('.dark {')
    })

    it('should allow overriding all tokens', () => {
      const customLight: Partial<SemanticTokens> = {
        background: 'custom-bg',
        foreground: 'custom-fg',
        primary: 'custom-primary',
        radius: '1rem',
      }
      const customDark: Partial<SemanticTokens> = {
        background: 'custom-dark-bg',
        foreground: 'custom-dark-fg',
        primary: 'custom-dark-primary',
      }
      const css = generateCustomSemanticThemeCSS(customLight, customDark)
      expect(css).toContain('custom-bg')
      expect(css).toContain('custom-fg')
      expect(css).toContain('custom-primary')
      expect(css).toContain('1rem')
      expect(css).toContain('custom-dark-bg')
      expect(css).toContain('custom-dark-fg')
      expect(css).toContain('custom-dark-primary')
    })
  })

  describe('default export', () => {
    it('should export all functions and tokens', async () => {
      const mod = await import('../../../src/theme/semantic')
      expect(mod.lightSemanticTokens).toBeDefined()
      expect(mod.darkSemanticTokens).toBeDefined()
      expect(mod.themePresets).toBeDefined()
      expect(mod.generateSemanticCSS).toBeDefined()
      expect(mod.generateSemanticThemeCSS).toBeDefined()
      expect(mod.generateCustomSemanticThemeCSS).toBeDefined()
    })
  })
})
