import { describe, it, expect } from 'vitest'
import { cn, cx, merge, cva, defineVariants } from '../../../src/vue/utils'

describe('Vue Utils', () => {
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

    it('should return empty string for no inputs', () => {
      expect(cn()).toBe('')
    })
  })

  describe('cx', () => {
    it('should be an alias for cn', () => {
      expect(cx).toBe(cn)
    })
  })

  describe('merge', () => {
    it('should merge class names with conflict resolution', () => {
      const result = merge('p-2', 'p-4')
      expect(result).toContain('p-4')
      expect(result).not.toContain('p-2')
    })

    it('should handle same color conflicts', () => {
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
    })

    it('should apply default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
      })

      expect(button()).toBe('px-4 py-2 bg-blue-500')
    })

    it('should apply compound variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
          size: {
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
    })

    it('should accept class prop (Vue style)', () => {
      const button = cva('px-4 py-2')
      expect(button({ class: 'custom-class' })).toBe('px-4 py-2 custom-class')
    })
  })

  describe('defineVariants', () => {
    it('should create a cva-like function', () => {
      const buttonVariants = defineVariants({
        base: 'px-4 py-2 rounded',
        variants: {
          variant: {
            primary: 'bg-blue-500 text-white',
            secondary: 'bg-gray-200 text-gray-800',
          },
          size: {
            sm: 'text-sm h-8',
            md: 'text-base h-10',
            lg: 'text-lg h-12',
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'md',
        },
      })

      expect(buttonVariants()).toBe('px-4 py-2 rounded bg-blue-500 text-white text-base h-10')
      expect(buttonVariants({ variant: 'secondary' })).toBe('px-4 py-2 rounded bg-gray-200 text-gray-800 text-base h-10')
      expect(buttonVariants({ size: 'lg' })).toBe('px-4 py-2 rounded bg-blue-500 text-white text-lg h-12')
    })

    it('should handle empty base', () => {
      const variants = defineVariants({
        variants: {
          color: {
            red: 'text-red-500',
          },
        },
      })

      expect(variants({ color: 'red' })).toBe('text-red-500')
    })

    it('should handle compound variants', () => {
      const buttonVariants = defineVariants({
        base: 'btn',
        variants: {
          intent: {
            primary: 'primary',
          },
          disabled: {
            true: 'disabled',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            disabled: 'true',
            className: 'opacity-50',
          },
        ],
      })

      expect(buttonVariants({ intent: 'primary', disabled: 'true' })).toBe('btn primary disabled opacity-50')
    })
  })

  describe('cva edge cases', () => {
    it('should not apply compound variants when conditions do not match', () => {
      const button = cva('base', {
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
            className: 'compound-class',
          },
        ],
      })

      // Should NOT include compound-class because intent is secondary
      expect(button({ intent: 'secondary', size: 'lg' })).toBe('base bg-gray-500 text-lg')
      expect(button({ intent: 'secondary', size: 'lg' })).not.toContain('compound-class')
    })

    it('should handle compound variants with partial match', () => {
      const button = cva('base', {
        variants: {
          a: { x: 'a-x' },
          b: { y: 'b-y' },
        },
        compoundVariants: [
          { a: 'x', b: 'y', className: 'both-match' },
        ],
      })

      // Only a matches, b is not provided
      expect(button({ a: 'x' })).toBe('base a-x')
      expect(button({ a: 'x' })).not.toContain('both-match')
    })

    it('should handle undefined variant value', () => {
      const button = cva('base', {
        variants: {
          color: {
            red: 'text-red-500',
          },
        },
      })

      // Pass undefined explicitly
      expect(button({ color: undefined })).toBe('base')
    })

    it('should handle variant with no matching value', () => {
      const button = cva('base', {
        variants: {
          size: {
            sm: 'text-sm',
            md: 'text-md',
          },
        },
      })

      // Pass a value that doesn't exist in variants
      expect(button({ size: 'xl' as 'sm' })).toBe('base')
    })

    it('should handle cva without config', () => {
      const button = cva('base-only')
      expect(button()).toBe('base-only')
      expect(button({})).toBe('base-only')
    })

    it('should handle compound variants with default variants', () => {
      const button = cva('base', {
        variants: {
          intent: {
            primary: 'primary-cls',
          },
          size: {
            lg: 'lg-cls',
          },
        },
        defaultVariants: {
          intent: 'primary',
          size: 'lg',
        },
        compoundVariants: [
          { intent: 'primary', size: 'lg', className: 'default-compound' },
        ],
      })

      // Default variants should trigger compound
      expect(button()).toBe('base primary-cls lg-cls default-compound')
    })
  })

  describe('cn edge cases', () => {
    it('should handle array with all falsy values', () => {
      expect(cn([null, undefined, false, ''])).toBe('')
    })

    it('should handle deeply nested arrays', () => {
      expect(cn([[['deeply', 'nested']]])).toBe('deeply nested')
    })

    it('should handle object with null values', () => {
      expect(cn({ active: null, disabled: undefined })).toBe('')
    })
  })

  describe('merge edge cases', () => {
    it('should handle negative utilities', () => {
      const result = merge('-mt-2', '-mt-4')
      expect(result).toContain('-mt-4')
    })

    it('should handle text color utilities', () => {
      const result = merge('text-red-500', 'text-red-600')
      expect(result).toBe('text-red-600')
    })

    it('should handle border color utilities', () => {
      const result = merge('border-blue-500', 'border-blue-600')
      expect(result).toBe('border-blue-600')
    })

    it('should handle ring color utilities', () => {
      const result = merge('ring-green-500', 'ring-green-600')
      expect(result).toBe('ring-green-600')
    })

    it('should handle fill utilities', () => {
      const result = merge('fill-red-500', 'fill-red-600')
      expect(result).toBe('fill-red-600')
    })

    it('should handle stroke utilities', () => {
      const result = merge('stroke-purple-500', 'stroke-purple-600')
      expect(result).toBe('stroke-purple-600')
    })

    it('should handle utilities without prefix pattern', () => {
      const result = merge('flex', 'block')
      expect(result).toContain('flex')
      expect(result).toContain('block')
    })

    it('should handle variant prefixed utilities', () => {
      const result = merge('md:p-2', 'md:p-4')
      expect(result).toBe('md:p-4')
    })

    it('should handle negative color utilities', () => {
      // Negative utilities with color prefix should work
      const result = merge('-bg-red-500', '-bg-red-600')
      expect(result).toBe('-bg-red-600')
    })

    it('should handle negative text color utilities', () => {
      const result = merge('-text-blue-500', '-text-blue-600')
      expect(result).toBe('-text-blue-600')
    })

    it('should handle multiple variant prefixed color utilities', () => {
      const result = merge('hover:md:bg-red-500', 'hover:md:bg-red-600')
      expect(result).toBe('hover:md:bg-red-600')
    })

    it('should handle variant prefixed negative utilities', () => {
      const result = merge('hover:-mt-2', 'hover:-mt-4')
      expect(result).toBe('hover:-mt-4')
    })

    it('should handle deeply nested variants with color utilities', () => {
      const result = merge('dark:hover:focus:text-red-500', 'dark:hover:focus:text-red-600')
      expect(result).toBe('dark:hover:focus:text-red-600')
    })

    it('should handle empty variant prefix gracefully', () => {
      const result = merge(':p-4', ':p-2')
      expect(result).toBe(':p-2')
    })
  })
})
