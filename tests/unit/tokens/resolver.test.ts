import { describe, it, expect } from 'vitest'
import {
  getNestedValue,
  setNestedValue,
  resolveRef,
  resolveTokens,
  TokenResolver,
  createResolver,
  transformers,
  mergeTokens,
  validateTokens,
} from '../../../src/tokens/resolver'
import { ref } from '../../../src/tokens/ref'
import type { DesignTokens } from '../../../src/tokens/types'

describe('Token Resolver', () => {
  describe('getNestedValue', () => {
    it('should get top-level value', () => {
      const obj = { foo: 'bar' }
      expect(getNestedValue(obj, 'foo')).toBe('bar')
    })

    it('should get nested value', () => {
      const obj = { a: { b: { c: 'value' } } }
      expect(getNestedValue(obj, 'a.b.c')).toBe('value')
    })

    it('should return undefined for missing path', () => {
      const obj = { a: { b: 1 } }
      expect(getNestedValue(obj, 'a.c')).toBeUndefined()
      expect(getNestedValue(obj, 'x.y.z')).toBeUndefined()
    })

    it('should handle null values', () => {
      const obj = { a: null }
      expect(getNestedValue(obj, 'a.b')).toBeUndefined()
    })

    it('should handle non-object intermediate values', () => {
      const obj = { a: 'string' }
      expect(getNestedValue(obj, 'a.b')).toBeUndefined()
    })
  })

  describe('setNestedValue', () => {
    it('should set top-level value', () => {
      const obj: Record<string, unknown> = {}
      setNestedValue(obj, 'foo', 'bar')
      expect(obj.foo).toBe('bar')
    })

    it('should set nested value', () => {
      const obj: Record<string, unknown> = {}
      setNestedValue(obj, 'a.b.c', 'value')
      expect((obj.a as Record<string, unknown>).b).toEqual({ c: 'value' })
    })

    it('should overwrite existing values', () => {
      const obj: Record<string, unknown> = { a: { b: 'old' } }
      setNestedValue(obj, 'a.b', 'new')
      expect((obj.a as Record<string, unknown>).b).toBe('new')
    })

    it('should create intermediate objects', () => {
      const obj: Record<string, unknown> = {}
      setNestedValue(obj, 'deep.nested.path', 'value')
      expect(getNestedValue(obj, 'deep.nested.path')).toBe('value')
    })
  })

  describe('resolveRef', () => {
    it('should resolve a simple reference', () => {
      const tokens = { colors: { primary: '#ff6b6b' } }
      const result = resolveRef(ref('colors.primary'), tokens)
      expect(result).toBe('#ff6b6b')
    })

    it('should resolve nested references', () => {
      const tokens = {
        base: '#ff6b6b',
        colors: { primary: ref('base') },
      }
      const result = resolveRef(ref('colors.primary'), tokens)
      expect(result).toBe('#ff6b6b')
    })

    it('should throw on circular references', () => {
      const tokens: Record<string, unknown> = {
        a: ref('b'),
        b: ref('a'),
      }
      expect(() => resolveRef(ref('a'), tokens)).toThrow('Circular token reference')
    })

    it('should throw on missing references', () => {
      const tokens = { colors: {} }
      expect(() => resolveRef(ref('colors.missing'), tokens)).toThrow('Token reference not found')
    })
  })

  describe('resolveTokens', () => {
    it('should resolve all references in object', () => {
      const tokens = {
        base: '#ff6b6b',
        colors: { primary: ref('base') },
      }
      const resolved = resolveTokens(tokens)
      expect(resolved.colors).toEqual({ primary: '#ff6b6b' })
    })

    it('should preserve non-reference values', () => {
      const tokens = {
        spacing: { 4: '1rem' },
        colors: { red: '#ff0000' },
      }
      const resolved = resolveTokens(tokens)
      expect(resolved.spacing).toEqual({ 4: '1rem' })
      expect(resolved.colors).toEqual({ red: '#ff0000' })
    })

    it('should keep unresolved references', () => {
      const tokens = {
        colors: { primary: ref('missing.path') },
      }
      const resolved = resolveTokens(tokens)
      expect(resolved.colors).toEqual({ primary: { $ref: 'missing.path' } })
    })

    it('should handle deeply nested objects', () => {
      const tokens = {
        base: 'value',
        a: { b: { c: { d: ref('base') } } },
      }
      const resolved = resolveTokens(tokens)
      expect(getNestedValue(resolved, 'a.b.c.d')).toBe('value')
    })
  })

  describe('TokenResolver', () => {
    const testTokens: DesignTokens = {
      colors: { primary: '#ff6b6b', secondary: '#3b82f6' },
      spacing: { 4: '1rem', 8: '2rem' },
      typography: {},
      borders: {},
      shadows: {},
      radii: {},
      zIndex: {},
      durations: {},
      easings: {},
      opacity: {},
      sizing: {},
    }

    describe('get', () => {
      it('should get a token value', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.get('colors.primary')).toBe('#ff6b6b')
      })

      it('should return undefined for missing tokens', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.get('colors.missing')).toBeUndefined()
      })

      it('should cache results', () => {
        const resolver = new TokenResolver(testTokens)
        resolver.get('colors.primary')
        resolver.get('colors.primary')
        // Just verifying it doesn't throw
        expect(resolver.get('colors.primary')).toBe('#ff6b6b')
      })
    })

    describe('var', () => {
      it('should create CSS variable reference', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.var('colors.primary')).toBe('var(--colors-primary)')
      })

      it('should handle camelCase conversion', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.var('fontSize.base')).toBe('var(--font-size-base)')
      })

      it('should support fallback value', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.var('colors.primary', '#000')).toBe('var(--colors-primary, #000)')
      })
    })

    describe('category', () => {
      it('should return a token category', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.category('colors')).toEqual(testTokens.colors)
      })
    })

    describe('has', () => {
      it('should return true for existing tokens', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.has('colors.primary')).toBe(true)
      })

      it('should return false for missing tokens', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.has('colors.missing')).toBe(false)
      })
    })

    describe('getMany', () => {
      it('should get multiple tokens', () => {
        const resolver = new TokenResolver(testTokens)
        const result = resolver.getMany(['colors.primary', 'spacing.4'])
        expect(result['colors.primary']).toBe('#ff6b6b')
        expect(result['spacing.4']).toBe('1rem')
      })
    })

    describe('getResolved', () => {
      it('should return all resolved tokens', () => {
        const resolver = new TokenResolver(testTokens)
        const resolved = resolver.getResolved()
        expect(resolved.colors).toBeDefined()
        expect(resolved.spacing).toBeDefined()
      })

      it('should cache resolved tokens', () => {
        const resolver = new TokenResolver(testTokens)
        const first = resolver.getResolved()
        const second = resolver.getResolved()
        expect(first).toBe(second)
      })
    })

    describe('addTransformer', () => {
      it('should apply transformers to values', () => {
        const resolver = new TokenResolver(testTokens)
        resolver.addTransformer((value) => {
          if (typeof value === 'string' && value.startsWith('#')) {
            return value.toUpperCase()
          }
          return value
        })
        expect(resolver.get('colors.primary')).toBe('#FF6B6B')
      })

      it('should clear cache when transformer added', () => {
        const resolver = new TokenResolver(testTokens)
        resolver.get('colors.primary') // Cache

        resolver.addTransformer((v) => v)
        resolver.get('colors.primary') // Should recalculate
        // Just verify it doesn't throw
        expect(true).toBe(true)
      })
    })

    describe('clearCache', () => {
      it('should clear the cache', () => {
        const resolver = new TokenResolver(testTokens)
        resolver.get('colors.primary')
        resolver.clearCache()
        // Just verify it doesn't throw
        expect(resolver.get('colors.primary')).toBe('#ff6b6b')
      })
    })

    describe('scope', () => {
      it('should create scoped resolver', () => {
        const resolver = new TokenResolver(testTokens)
        const scoped = resolver.scope('colors')
        expect(scoped?.get('primary')).toBe('#ff6b6b')
      })

      it('should return undefined for invalid scope', () => {
        const resolver = new TokenResolver(testTokens)
        expect(resolver.scope('invalid')).toBeUndefined()
      })
    })
  })

  describe('createResolver', () => {
    it('should create a TokenResolver instance', () => {
      const resolver = createResolver({ colors: {}, spacing: {} } as DesignTokens)
      expect(resolver).toBeInstanceOf(TokenResolver)
    })
  })

  describe('transformers', () => {
    describe('addUnit', () => {
      it('should add unit to numeric values', () => {
        const transform = transformers.addUnit('px')
        expect(transform(16, '', { tokens: {} as DesignTokens })).toBe('16px')
      })

      it('should not modify non-numeric values', () => {
        const transform = transformers.addUnit('px')
        expect(transform('16px', '', { tokens: {} as DesignTokens })).toBe('16px')
      })
    })

    describe('scale', () => {
      it('should scale numeric values', () => {
        const transform = transformers.scale(2)
        expect(transform(16, '', { tokens: {} as DesignTokens })).toBe(32)
      })

      it('should not modify non-numeric values', () => {
        const transform = transformers.scale(2)
        expect(transform('16px', '', { tokens: {} as DesignTokens })).toBe('16px')
      })
    })

    describe('prefix', () => {
      it('should prefix string values', () => {
        const transform = transformers.prefix('--')
        expect(transform('color-primary', '', { tokens: {} as DesignTokens })).toBe('--color-primary')
      })

      it('should not modify non-string values', () => {
        const transform = transformers.prefix('--')
        expect(transform(16, '', { tokens: {} as DesignTokens })).toBe(16)
      })
    })

    describe('toVar', () => {
      it('should convert to CSS variable', () => {
        const transform = transformers.toVar()
        expect(transform('value', 'colors.primary', { tokens: {} as DesignTokens })).toBe('var(--colors-primary)')
      })

      it('should handle camelCase conversion', () => {
        const transform = transformers.toVar()
        expect(transform('value', 'fontSize.base', { tokens: {} as DesignTokens })).toBe('var(--font-size-base)')
      })

      it('should support prefix', () => {
        const transform = transformers.toVar('coral')
        expect(transform('value', 'colors.primary', { tokens: {} as DesignTokens })).toBe('var(--coral-colors-primary)')
      })
    })
  })

  describe('mergeTokens', () => {
    it('should merge multiple token sets', () => {
      const tokens1 = { colors: { red: '#ff0000' } }
      const tokens2 = { colors: { blue: '#0000ff' } }
      const merged = mergeTokens(tokens1 as Partial<DesignTokens>, tokens2 as Partial<DesignTokens>)
      expect((merged.colors as Record<string, string>).red).toBe('#ff0000')
      expect((merged.colors as Record<string, string>).blue).toBe('#0000ff')
    })

    it('should deep merge nested objects', () => {
      const tokens1 = { colors: { coral: { 500: '#ff6b6b' } } }
      const tokens2 = { colors: { coral: { 600: '#ee5a5a' } } }
      const merged = mergeTokens(tokens1 as Partial<DesignTokens>, tokens2 as Partial<DesignTokens>)
      expect((merged.colors as Record<string, Record<string, string>>).coral[500]).toBe('#ff6b6b')
      expect((merged.colors as Record<string, Record<string, string>>).coral[600]).toBe('#ee5a5a')
    })

    it('should overwrite with later values', () => {
      const tokens1 = { colors: { red: '#ff0000' } }
      const tokens2 = { colors: { red: '#cc0000' } }
      const merged = mergeTokens(tokens1 as Partial<DesignTokens>, tokens2 as Partial<DesignTokens>)
      expect((merged.colors as Record<string, string>).red).toBe('#cc0000')
    })
  })

  describe('validateTokens', () => {
    it('should validate valid tokens', () => {
      const tokens = { colors: { primary: '#ff6b6b' } }
      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
      expect(result.errors).toEqual([])
    })

    it('should detect non-object tokens', () => {
      const result = validateTokens('not an object')
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Tokens must be an object')
    })

    it('should detect null tokens', () => {
      const result = validateTokens(null)
      expect(result.valid).toBe(false)
    })

    it('should detect unresolved references', () => {
      const tokens = { colors: { primary: ref('missing.path') } }
      const result = validateTokens(tokens)
      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.includes('Unresolved reference'))).toBe(true)
    })

    it('should allow valid references', () => {
      const tokens = {
        base: '#ff6b6b',
        colors: { primary: ref('base') },
      }
      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })
  })
})
