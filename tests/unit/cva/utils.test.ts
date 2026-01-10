import { describe, it, expect } from 'vitest'
import {
  cx,
  cn,
  clsx,
  classNames,
  bem,
  splitClasses,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
} from '../../../src/cva/utils'

describe('CVA Utils', () => {
  describe('cx', () => {
    it('should join strings', () => {
      expect(cx('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter falsy values', () => {
      expect(cx('a', false, 'b', null, 'c', undefined)).toBe('a b c')
    })

    it('should handle empty input', () => {
      expect(cx()).toBe('')
    })

    it('should handle arrays', () => {
      expect(cx(['a', 'b'], 'c')).toBe('a b c')
    })

    it('should handle nested arrays', () => {
      expect(cx(['a', ['b', 'c']], 'd')).toBe('a b c d')
    })

    it('should handle objects with boolean values', () => {
      expect(cx({ a: true, b: false, c: true })).toBe('a c')
    })

    it('should handle mixed inputs', () => {
      expect(cx('a', ['b'], { c: true, d: false })).toBe('a b c')
    })

    it('should handle empty arrays', () => {
      expect(cx([])).toBe('')
    })

    it('should handle nested empty arrays', () => {
      expect(cx(['a', [], 'b'])).toBe('a b')
    })
  })

  describe('cn', () => {
    it('should work like cx', () => {
      expect(cn('a', 'b')).toBe('a b')
    })

    it('should filter falsy values', () => {
      expect(cn('a', false, 'b')).toBe('a b')
    })

    it('should dedupe conflicting classes', () => {
      const result = cn('px-2', 'px-4')
      expect(result).toContain('px-4')
    })

    it('should handle color conflicts', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-blue-500')
    })
  })

  describe('clsx', () => {
    it('should be an alias for cx', () => {
      expect(clsx('a', 'b', 'c')).toBe('a b c')
    })

    it('should handle all input types', () => {
      expect(clsx('a', ['b'], { c: true })).toBe('a b c')
    })
  })

  describe('classNames', () => {
    it('should join strings', () => {
      expect(classNames('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter falsy values', () => {
      expect(classNames('a', false, 'b', null, undefined)).toBe('a b')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const hasError = false
      expect(classNames('base', isActive && 'active', hasError && 'error')).toBe('base active')
    })
  })

  describe('bem', () => {
    it('should return base class alone', () => {
      expect(bem('button', {})).toBe('button')
    })

    it('should add boolean modifiers', () => {
      expect(bem('button', { active: true })).toBe('button button--active')
    })

    it('should skip false boolean modifiers', () => {
      expect(bem('button', { active: false })).toBe('button')
    })

    it('should add string modifiers', () => {
      expect(bem('button', { size: 'lg' })).toBe('button button--size-lg')
    })

    it('should handle mixed modifiers', () => {
      expect(bem('button', { active: true, size: 'lg', variant: 'primary' }))
        .toBe('button button--active button--size-lg button--variant-primary')
    })

    it('should skip undefined and null modifiers', () => {
      expect(bem('button', { active: undefined, size: null as unknown as string })).toBe('button')
    })

    it('should skip empty string modifiers', () => {
      expect(bem('button', { size: '' })).toBe('button')
    })
  })

  describe('splitClasses', () => {
    it('should split space-separated classes', () => {
      expect(splitClasses('a b c')).toEqual(['a', 'b', 'c'])
    })

    it('should filter empty strings', () => {
      expect(splitClasses('a  b   c')).toEqual(['a', 'b', 'c'])
    })

    it('should handle empty string', () => {
      expect(splitClasses('')).toEqual([])
    })

    it('should handle single class', () => {
      expect(splitClasses('single')).toEqual(['single'])
    })
  })

  describe('hasClass', () => {
    it('should return true if class exists', () => {
      expect(hasClass('a b c', 'b')).toBe(true)
    })

    it('should return false if class does not exist', () => {
      expect(hasClass('a b c', 'd')).toBe(false)
    })

    it('should not match partial class names', () => {
      expect(hasClass('button button-primary', 'button-prim')).toBe(false)
    })
  })

  describe('addClass', () => {
    it('should add a new class', () => {
      expect(addClass('a b', 'c')).toBe('a b c')
    })

    it('should not add duplicate class', () => {
      expect(addClass('a b c', 'b')).toBe('a b c')
    })

    it('should add to empty string', () => {
      expect(addClass('', 'a')).toBe('a')
    })
  })

  describe('removeClass', () => {
    it('should remove a class', () => {
      expect(removeClass('a b c', 'b')).toBe('a c')
    })

    it('should do nothing if class does not exist', () => {
      expect(removeClass('a b c', 'd')).toBe('a b c')
    })

    it('should handle removing first class', () => {
      expect(removeClass('a b c', 'a')).toBe('b c')
    })

    it('should handle removing last class', () => {
      expect(removeClass('a b c', 'c')).toBe('a b')
    })

    it('should handle single class', () => {
      expect(removeClass('only', 'only')).toBe('')
    })
  })

  describe('toggleClass', () => {
    it('should add class if not present', () => {
      expect(toggleClass('a b', 'c')).toBe('a b c')
    })

    it('should remove class if present', () => {
      expect(toggleClass('a b c', 'b')).toBe('a c')
    })

    it('should force add class', () => {
      expect(toggleClass('a b', 'c', true)).toBe('a b c')
    })

    it('should force remove class', () => {
      expect(toggleClass('a b c', 'b', false)).toBe('a c')
    })

    it('should not duplicate when force add existing class', () => {
      expect(toggleClass('a b c', 'b', true)).toBe('a b c')
    })

    it('should do nothing when force remove non-existing class', () => {
      expect(toggleClass('a b', 'c', false)).toBe('a b')
    })
  })
})
