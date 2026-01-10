import { describe, it, expect } from 'vitest'
import { ref, isRef } from '../../../src/tokens/ref'

describe('Token Reference Utilities', () => {
  describe('ref', () => {
    it('should create a reference object', () => {
      const result = ref('colors.coral.500')
      expect(result).toEqual({ $ref: 'colors.coral.500' })
    })

    it('should create reference with any path', () => {
      expect(ref('spacing.4')).toEqual({ $ref: 'spacing.4' })
      expect(ref('typography.fontSize.base')).toEqual({ $ref: 'typography.fontSize.base' })
    })
  })

  describe('isRef', () => {
    it('should return true for reference objects', () => {
      expect(isRef({ $ref: 'colors.coral.500' })).toBe(true)
      expect(isRef(ref('spacing.4'))).toBe(true)
    })

    it('should return false for non-reference values', () => {
      expect(isRef('string')).toBe(false)
      expect(isRef(123)).toBe(false)
      expect(isRef(null)).toBe(false)
      expect(isRef(undefined)).toBe(false)
      expect(isRef([])).toBe(false)
      expect(isRef({})).toBe(false)
    })

    it('should return false for objects without $ref', () => {
      expect(isRef({ ref: 'not-a-ref' })).toBe(false)
      expect(isRef({ value: 'test' })).toBe(false)
    })

    it('should return false for objects with non-string $ref', () => {
      expect(isRef({ $ref: 123 })).toBe(false)
      expect(isRef({ $ref: null })).toBe(false)
      expect(isRef({ $ref: {} })).toBe(false)
    })
  })
})
