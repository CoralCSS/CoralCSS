import { describe, it, expect } from 'vitest'
import { cn, cx, merge, cva } from '../../../src/react/utils'

describe('React Utils', () => {
  describe('cn', () => {
    it('should combine strings', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle falsy values', () => {
      expect(cn('foo', null, 'bar', undefined, false, '')).toBe('foo bar')
    })

    it('should handle numbers', () => {
      expect(cn('foo', 123)).toBe('foo 123')
    })

    it('should handle arrays', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })

    it('should handle object syntax', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should handle mixed inputs', () => {
      expect(cn('foo', { bar: true }, ['baz', { qux: true }])).toBe('foo bar baz qux')
    })

    it('should handle boolean conditions', () => {
      const isActive = true
      const isDisabled = false
      expect(cn('btn', isActive && 'active', isDisabled && 'disabled')).toBe('btn active')
    })

    it('should return empty string for no inputs', () => {
      expect(cn()).toBe('')
    })

    it('should return empty string for all falsy inputs', () => {
      expect(cn(null, undefined, false, '')).toBe('')
    })
  })

  describe('cx', () => {
    it('should be an alias for cn', () => {
      expect(cx).toBe(cn)
    })

    it('should work the same as cn', () => {
      expect(cx('foo', 'bar')).toBe('foo bar')
      expect(cx({ foo: true, bar: false })).toBe('foo')
    })
  })

  describe('merge', () => {
    it('should merge class names', () => {
      const result = merge('p-2', 'p-4')
      expect(result).toContain('p-4')
      expect(result).not.toContain('p-2')
    })

    it('should keep non-conflicting classes', () => {
      const result = merge('bg-red-500 p-2', 'text-white')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('p-2')
      expect(result).toContain('text-white')
    })

    it('should handle same color utilities with conflict resolution', () => {
      const result = merge('bg-red-500', 'bg-red-600')
      expect(result).toBe('bg-red-600')
    })

    it('should keep different color utilities', () => {
      const result = merge('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('bg-blue-500')
    })

    it('should handle empty inputs', () => {
      expect(merge()).toBe('')
      expect(merge('')).toBe('')
    })

    it('should handle single input', () => {
      expect(merge('p-4')).toBe('p-4')
    })

    it('should handle same color variant conflicts', () => {
      const result = merge('hover:bg-red-500', 'hover:bg-red-600')
      expect(result).toBe('hover:bg-red-600')
    })

    it('should keep different color variants', () => {
      const result = merge('hover:bg-red-500', 'hover:bg-blue-500')
      expect(result).toContain('hover:bg-red-500')
      expect(result).toContain('hover:bg-blue-500')
    })

    it('should handle negative utilities', () => {
      const result = merge('-mt-2', '-mt-4')
      expect(result).toBe('-mt-4')
    })

    it('should handle text size conflicts', () => {
      const result = merge('text-sm', 'text-lg')
      // text-sm and text-lg have same prefix 'text', so last wins
      expect(result).toContain('text-lg')
    })
  })

  describe('cva', () => {
    it('should return base classes', () => {
      const button = cva('px-4 py-2')
      expect(button()).toBe('px-4 py-2')
    })

    it('should apply variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      })

      expect(button({ intent: 'primary' })).toBe('px-4 py-2 bg-blue-500')
      expect(button({ intent: 'secondary' })).toBe('px-4 py-2 bg-gray-500')
    })

    it('should apply default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
      })

      expect(button()).toBe('px-4 py-2 bg-blue-500')
    })

    it('should override default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
      })

      expect(button({ intent: 'secondary' })).toBe('px-4 py-2 bg-gray-500')
    })

    it('should apply multiple variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      })

      expect(button({ intent: 'primary', size: 'lg' })).toBe('px-4 py-2 bg-blue-500 text-lg')
    })

    it('should apply compound variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            className: 'font-bold',
          },
        ],
      })

      expect(button({ intent: 'primary', size: 'lg' })).toBe('px-4 py-2 bg-blue-500 text-lg font-bold')
      expect(button({ intent: 'primary', size: 'sm' })).toBe('px-4 py-2 bg-blue-500 text-sm')
    })

    it('should accept additional className', () => {
      const button = cva('px-4 py-2')
      expect(button({ className: 'custom-class' })).toBe('px-4 py-2 custom-class')
    })

    it('should handle no config', () => {
      const button = cva('px-4 py-2')
      expect(button()).toBe('px-4 py-2')
      expect(button({})).toBe('px-4 py-2')
    })

    it('should handle empty variants', () => {
      const button = cva('px-4 py-2', {
        variants: {},
      })
      expect(button()).toBe('px-4 py-2')
    })

    it('should handle undefined props', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
        },
      })
      expect(button(undefined)).toBe('px-4 py-2')
    })

    it('should handle compound variants with default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          intent: 'primary',
          size: 'lg',
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            className: 'shadow-lg',
          },
        ],
      })

      expect(button()).toBe('px-4 py-2 bg-blue-500 text-lg shadow-lg')
    })
  })
})
