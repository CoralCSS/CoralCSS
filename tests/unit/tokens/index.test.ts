import { describe, it, expect } from 'vitest'
import {
  defineTokens,
  token,
  ref,
  isRef,
} from '../../../src/tokens/index'
import type { DesignTokens, TokenDefinition } from '../../../src/tokens/index'

describe('Tokens Index', () => {
  describe('defineTokens', () => {
    it('should create a complete DesignTokens object', () => {
      const tokens = defineTokens({
        colors: { red: '#ff0000' },
      })

      expect(tokens.colors).toEqual({ red: '#ff0000' })
      expect(tokens.spacing).toEqual({})
      expect(tokens.sizing).toEqual({})
      expect(tokens.typography).toEqual({})
      expect(tokens.borders).toEqual({})
      expect(tokens.shadows).toEqual({})
      expect(tokens.radii).toEqual({})
      expect(tokens.zIndex).toEqual({})
      expect(tokens.durations).toEqual({})
      expect(tokens.easings).toEqual({})
      expect(tokens.opacity).toEqual({})
    })

    it('should preserve provided values', () => {
      const tokens = defineTokens({
        colors: { red: '#ff0000' },
        spacing: { 4: '1rem' },
        typography: { fontFamily: 'sans-serif' },
      })

      expect(tokens.colors).toEqual({ red: '#ff0000' })
      expect(tokens.spacing).toEqual({ 4: '1rem' })
      expect(tokens.typography).toEqual({ fontFamily: 'sans-serif' })
    })

    it('should handle empty input', () => {
      const tokens = defineTokens({})

      expect(tokens.colors).toEqual({})
      expect(tokens.spacing).toEqual({})
    })
  })

  describe('token', () => {
    it('should create a token definition with value', () => {
      const t = token('#ff0000')

      expect(t.value).toBe('#ff0000')
    })

    it('should create a token with description', () => {
      const t = token('#ff0000', { description: 'Primary red color' })

      expect(t.value).toBe('#ff0000')
      expect(t.description).toBe('Primary red color')
    })

    it('should create a deprecated token', () => {
      const t = token('#ff0000', { deprecated: true })

      expect(t.deprecated).toBe(true)
    })

    it('should create a deprecated token with message', () => {
      const t = token('#ff0000', { deprecated: 'Use colors.red.500 instead' })

      expect(t.deprecated).toBe('Use colors.red.500 instead')
    })

    it('should create a token with type', () => {
      const t = token('#ff0000', { type: 'color' })

      expect(t.type).toBe('color')
    })

    it('should handle all metadata', () => {
      const t = token('#ff0000', {
        description: 'Red color',
        deprecated: false,
        type: 'color',
      })

      expect(t.value).toBe('#ff0000')
      expect(t.description).toBe('Red color')
      expect(t.deprecated).toBe(false)
      expect(t.type).toBe('color')
    })

    it('should handle numeric values', () => {
      const t = token(16, { type: 'dimension' })

      expect(t.value).toBe(16)
      expect(t.type).toBe('dimension')
    })

    it('should handle array values', () => {
      const t = token(['Arial', 'sans-serif'], { type: 'fontFamily' })

      expect(t.value).toEqual(['Arial', 'sans-serif'])
    })
  })

  describe('ref', () => {
    it('should create a reference object', () => {
      const reference = ref('colors.red')

      expect(reference).toEqual({ $ref: 'colors.red' })
    })

    it('should create reference to nested path', () => {
      const reference = ref('colors.red.500')

      expect(reference).toEqual({ $ref: 'colors.red.500' })
    })
  })

  describe('isRef', () => {
    it('should return true for ref objects', () => {
      expect(isRef(ref('colors.red'))).toBe(true)
    })

    it('should return true for objects with $ref property', () => {
      expect(isRef({ $ref: 'colors.red' })).toBe(true)
    })

    it('should return false for non-ref objects', () => {
      expect(isRef({ color: 'red' })).toBe(false)
    })

    it('should return false for primitives', () => {
      expect(isRef('colors.red')).toBe(false)
      expect(isRef(123)).toBe(false)
      expect(isRef(null)).toBe(false)
      expect(isRef(undefined)).toBe(false)
    })

    it('should return false for arrays', () => {
      expect(isRef(['colors', 'red'])).toBe(false)
    })
  })

  describe('exports', () => {
    it('should export ref and isRef', () => {
      expect(ref).toBeDefined()
      expect(isRef).toBeDefined()
    })

    it('should export defineTokens', () => {
      expect(defineTokens).toBeDefined()
    })

    it('should export token', () => {
      expect(token).toBeDefined()
    })
  })
})
