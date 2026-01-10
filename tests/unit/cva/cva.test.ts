import { describe, it, expect } from 'vitest'
import { cva, type VariantProps, type CVAConfig } from '../../../src/cva/cva'

describe('CVA - Class Variance Authority', () => {
  describe('cva function', () => {
    it('should create a CVA function', () => {
      const button = cva({
        base: 'btn',
      })

      expect(typeof button).toBe('function')
    })

    it('should return base classes when called without arguments', () => {
      const button = cva({
        base: 'btn-base',
      })

      expect(button()).toBe('btn-base')
    })

    it('should handle empty config', () => {
      const button = cva({})
      expect(button()).toBe('')
    })

    it('should apply variant classes', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
        },
      })

      expect(button({ color: 'red' })).toContain('btn-red')
      expect(button({ color: 'blue' })).toContain('btn-blue')
    })

    it('should apply default variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
        },
        defaultVariants: {
          color: 'blue',
        },
      })

      expect(button()).toContain('btn-blue')
    })

    it('should override default variants with props', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
        },
        defaultVariants: {
          color: 'blue',
        },
      })

      expect(button({ color: 'red' })).toContain('btn-red')
      expect(button({ color: 'red' })).not.toContain('btn-blue')
    })

    it('should handle multiple variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
      })

      const result = button({ color: 'red', size: 'lg' })
      expect(result).toContain('btn-red')
      expect(result).toContain('btn-lg')
    })

    it('should apply compound variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        compoundVariants: [
          { color: 'red', size: 'lg', class: 'btn-red-lg' },
        ],
      })

      const result = button({ color: 'red', size: 'lg' })
      expect(result).toContain('btn-red-lg')
    })

    it('should not apply compound variants when conditions do not match', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        compoundVariants: [
          { color: 'red', size: 'lg', class: 'btn-red-lg' },
        ],
      })

      const result = button({ color: 'blue', size: 'lg' })
      expect(result).not.toContain('btn-red-lg')
    })

    it('should handle compound variants with className', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
          },
        },
        compoundVariants: [
          { color: 'red', className: 'extra-class' },
        ],
      })

      const result = button({ color: 'red' })
      expect(result).toContain('extra-class')
    })

    it('should handle array values in compound variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
            green: 'btn-green',
          },
        },
        compoundVariants: [
          { color: ['red', 'blue'], class: 'primary-color' },
        ],
      })

      expect(button({ color: 'red' })).toContain('primary-color')
      expect(button({ color: 'blue' })).toContain('primary-color')
      expect(button({ color: 'green' })).not.toContain('primary-color')
    })

    it('should append custom class prop', () => {
      const button = cva({
        base: 'btn',
      })

      const result = button({ class: 'custom-class' })
      expect(result).toContain('custom-class')
    })

    it('should append custom className prop', () => {
      const button = cva({
        base: 'btn',
      })

      const result = button({ className: 'custom-class' })
      expect(result).toContain('custom-class')
    })

    it('should handle null variant values', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
          },
        },
      })

      const result = button({ color: null })
      expect(result).toBe('btn')
    })

    it('should handle undefined variant values', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
          },
        },
      })

      const result = button({ color: undefined })
      expect(result).toBe('btn')
    })

    it('should expose variants property', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
          },
        },
      })

      expect(button.variants).toEqual({ color: { red: 'btn-red' } })
    })

    it('should expose defaultVariants property', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
          },
        },
        defaultVariants: {
          color: 'red',
        },
      })

      expect(button.defaultVariants).toEqual({ color: 'red' })
    })

    it('should handle base as array', () => {
      const button = cva({
        base: ['btn', 'btn-base'],
      })

      const result = button()
      expect(result).toContain('btn')
      expect(result).toContain('btn-base')
    })

    it('should use default variants in compound variant conditions', () => {
      const button = cva({
        base: 'btn',
        variants: {
          color: {
            red: 'btn-red',
            blue: 'btn-blue',
          },
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        compoundVariants: [
          { color: 'red', size: 'lg', class: 'compound-class' },
        ],
        defaultVariants: {
          color: 'red',
          size: 'lg',
        },
      })

      // Should apply compound variant from defaults
      const result = button()
      expect(result).toContain('compound-class')
    })
  })
})
