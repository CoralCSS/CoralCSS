import { describe, it, expect } from 'vitest'
import { cn, cx, cva, defineVariants, responsive } from '../../../src/svelte/utils'

describe('Svelte Utils', () => {
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
      expect(cn('foo', { bar: true }, ['baz'])).toBe('foo bar baz')
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
            class: 'font-bold',
          },
        ],
      })

      expect(button({ intent: 'primary', size: 'lg' })).toBe('px-4 py-2 bg-blue-500 text-lg font-bold')
    })

    it('should accept class prop (Svelte style)', () => {
      const button = cva('px-4 py-2')
      expect(button({ class: 'custom-class' })).toBe('px-4 py-2 custom-class')
    })

    it('should handle multiple variants', () => {
      const button = cva('btn', {
        variants: {
          color: {
            red: 'bg-red-500',
            blue: 'bg-blue-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      })

      expect(button({ color: 'red', size: 'lg' })).toBe('btn bg-red-500 text-lg')
    })
  })

  describe('defineVariants', () => {
    it('should create a cva-like function', () => {
      const buttonVariants = defineVariants({
        base: 'px-4 py-2 rounded',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          variant: 'primary',
        },
      })

      expect(buttonVariants()).toBe('px-4 py-2 rounded bg-blue-500')
      expect(buttonVariants({ variant: 'secondary' })).toBe('px-4 py-2 rounded bg-gray-500')
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
          size: {
            lg: 'large',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'compound-class',
          },
        ],
      })

      expect(buttonVariants({ intent: 'primary', size: 'lg' })).toBe('btn primary large compound-class')
    })
  })

  describe('responsive', () => {
    it('should return base classes', () => {
      const result = responsive({ base: 'p-2' })
      expect(result).toBe('p-2')
    })

    it('should prefix sm classes', () => {
      const result = responsive({ sm: 'p-4' })
      expect(result).toBe('sm:p-4')
    })

    it('should prefix md classes', () => {
      const result = responsive({ md: 'p-6' })
      expect(result).toBe('md:p-6')
    })

    it('should prefix lg classes', () => {
      const result = responsive({ lg: 'p-8' })
      expect(result).toBe('lg:p-8')
    })

    it('should prefix xl classes', () => {
      const result = responsive({ xl: 'p-10' })
      expect(result).toBe('xl:p-10')
    })

    it('should prefix 2xl classes', () => {
      const result = responsive({ '2xl': 'p-12' })
      expect(result).toBe('2xl:p-12')
    })

    it('should combine all breakpoints', () => {
      const result = responsive({
        base: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      })
      expect(result).toBe('p-2 sm:p-4 md:p-6 lg:p-8')
    })

    it('should handle multiple classes per breakpoint', () => {
      const result = responsive({
        base: 'p-2 m-2',
        sm: 'p-4 m-4',
      })
      expect(result).toBe('p-2 m-2 sm:p-4 sm:m-4')
    })

    it('should handle empty object', () => {
      const result = responsive({})
      expect(result).toBe('')
    })

    it('should skip undefined breakpoints', () => {
      const result = responsive({
        base: 'p-2',
        sm: undefined,
        md: 'p-6',
      })
      expect(result).toBe('p-2 md:p-6')
    })
  })
})
