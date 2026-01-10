import { describe, it, expect } from 'vitest'
import { cva } from '../../../src/cva/cva'
import {
  compose,
  extend,
  withDefaults,
  responsive,
  conditional,
  mergeVariants,
} from '../../../src/cva/compose'

describe('CVA Compose', () => {
  describe('compose', () => {
    it('should compose two CVA functions', () => {
      const base = cva({
        base: 'btn',
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
        },
      })

      const colors = cva({
        variants: {
          color: { red: 'btn-red', blue: 'btn-blue' },
        },
      })

      const button = compose(base, colors)

      const result = button({ size: 'sm', color: 'red' })
      expect(result).toContain('btn')
      expect(result).toContain('btn-sm')
      expect(result).toContain('btn-red')
    })

    it('should merge variants from multiple functions', () => {
      const fn1 = cva({
        variants: { a: { x: 'ax' } },
      })
      const fn2 = cva({
        variants: { b: { y: 'by' } },
      })

      const composed = compose(fn1, fn2)

      expect(composed.variants).toHaveProperty('a')
      expect(composed.variants).toHaveProperty('b')
    })

    it('should merge default variants', () => {
      const fn1 = cva({
        variants: { a: { x: 'ax' } },
        defaultVariants: { a: 'x' },
      })
      const fn2 = cva({
        variants: { b: { y: 'by' } },
        defaultVariants: { b: 'y' },
      })

      const composed = compose(fn1, fn2)

      expect(composed.defaultVariants).toHaveProperty('a')
      expect(composed.defaultVariants).toHaveProperty('b')
    })

    it('should handle class prop', () => {
      const fn1 = cva({ base: 'base1' })
      const fn2 = cva({ base: 'base2' })

      const composed = compose(fn1, fn2)
      const result = composed({ class: 'extra' })

      expect(result).toContain('extra')
    })

    it('should handle className prop', () => {
      const fn1 = cva({ base: 'base1' })
      const fn2 = cva({ base: 'base2' })

      const composed = compose(fn1, fn2)
      const result = composed({ className: 'extra' })

      expect(result).toContain('extra')
    })
  })

  describe('extend', () => {
    it('should extend a CVA function with new config', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: { sm: 'btn-sm', md: 'btn-md' },
        },
      })

      const iconButton = extend(button, {
        base: 'icon-btn',
      })

      const result = iconButton({ size: 'sm' })
      expect(result).toContain('btn')
      expect(result).toContain('btn-sm')
      expect(result).toContain('icon-btn')
    })

    it('should merge existing variants', () => {
      const button = cva({
        variants: {
          size: { sm: 'btn-sm' },
        },
      })

      const extended = extend(button, {
        variants: {
          size: { lg: 'btn-lg' },
        },
      })

      expect(extended.variants.size).toHaveProperty('sm')
      expect(extended.variants.size).toHaveProperty('lg')
    })

    it('should merge default variants', () => {
      const button = cva({
        variants: { size: { sm: 'sm' } },
        defaultVariants: { size: 'sm' },
      })

      const extended = extend(button, {
        variants: { color: { red: 'red' } },
        defaultVariants: { color: 'red' },
      })

      expect(extended.defaultVariants).toHaveProperty('size')
      expect(extended.defaultVariants).toHaveProperty('color')
    })

    it('should handle compound variants in extension', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
        },
      })

      const extended = extend(button, {
        variants: {
          color: { red: 'btn-red' },
        },
        compoundVariants: [
          { size: 'lg', color: 'red', class: 'btn-lg-red' },
        ],
      })

      const result = extended({ size: 'lg', color: 'red' })
      expect(result).toContain('btn-lg-red')
    })

    it('should handle compound variants with className instead of class', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
        },
      })

      const extended = extend(button, {
        variants: {
          color: { blue: 'btn-blue' },
        },
        compoundVariants: [
          { size: 'lg', color: 'blue', className: 'compound-classname' },
        ],
      })

      const result = extended({ size: 'lg', color: 'blue' })
      expect(result).toContain('compound-classname')
    })

    it('should handle compound variants with both class and className', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: { md: 'btn-md' },
        },
      })

      const extended = extend(button, {
        variants: {
          theme: { dark: 'dark-theme' },
        },
        compoundVariants: [
          { size: 'md', theme: 'dark', class: 'from-class', className: 'from-classname' },
        ],
      })

      const result = extended({ size: 'md', theme: 'dark' })
      expect(result).toContain('from-class')
      expect(result).toContain('from-classname')
    })

    it('should handle compound variants that do not match', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
        },
      })

      const extended = extend(button, {
        variants: {
          color: { red: 'btn-red' },
        },
        compoundVariants: [
          { size: 'lg', color: 'red', class: 'should-not-appear' },
        ],
      })

      const result = extended({ size: 'sm', color: 'red' })
      expect(result).not.toContain('should-not-appear')
    })
  })

  describe('withDefaults', () => {
    it('should create a function with preset defaults', () => {
      const button = cva({
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
          color: { red: 'btn-red', blue: 'btn-blue' },
        },
      })

      const smallButton = withDefaults(button, { size: 'sm' })

      const result = smallButton({ color: 'red' })
      expect(result).toContain('btn-sm')
      expect(result).toContain('btn-red')
    })

    it('should allow overriding defaults', () => {
      const button = cva({
        variants: {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
        },
      })

      const smallButton = withDefaults(button, { size: 'sm' })

      const result = smallButton({ size: 'lg' })
      expect(result).toContain('btn-lg')
      expect(result).not.toContain('btn-sm')
    })

    it('should merge defaultVariants', () => {
      const button = cva({
        variants: { size: { sm: 'sm' } },
        defaultVariants: { size: 'sm' },
      })

      const wrapped = withDefaults(button, { size: 'sm' })
      expect(wrapped.defaultVariants).toHaveProperty('size')
    })
  })

  describe('responsive', () => {
    it('should create responsive classes', () => {
      const button = cva({
        variants: {
          size: { sm: 'h-8', md: 'h-10', lg: 'h-12' },
        },
      })

      const classes = responsive(button, {
        size: { base: 'sm', md: 'lg' },
      })

      expect(classes).toContain('h-8')
      expect(classes).toContain('md:h-12')
    })

    it('should handle multiple variants', () => {
      const button = cva({
        variants: {
          size: { sm: 'h-8', lg: 'h-12' },
          padding: { sm: 'p-2', lg: 'p-4' },
        },
      })

      const classes = responsive(button, {
        size: { base: 'sm', lg: 'lg' },
        padding: { base: 'sm', lg: 'lg' },
      })

      expect(classes).toContain('h-8')
      expect(classes).toContain('p-2')
      expect(classes).toContain('lg:h-12')
      expect(classes).toContain('lg:p-4')
    })
  })

  describe('conditional', () => {
    it('should apply true value when condition is true', () => {
      const button = cva({
        variants: {
          state: { active: 'is-active', inactive: 'is-inactive' },
        },
      })

      const classes = conditional(button, 'state', true, 'active', 'inactive')
      expect(classes).toContain('is-active')
    })

    it('should apply false value when condition is false', () => {
      const button = cva({
        variants: {
          state: { active: 'is-active', inactive: 'is-inactive' },
        },
      })

      const classes = conditional(button, 'state', false, 'active', 'inactive')
      expect(classes).toContain('is-inactive')
    })
  })

  describe('mergeVariants', () => {
    it('should merge multiple class sources', () => {
      const result = mergeVariants('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should filter falsy values', () => {
      const result = mergeVariants('class1', false, 'class2', null, 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects', () => {
      const result = mergeVariants('class1', { 'class2': true, 'class3': false })
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).not.toContain('class3')
    })
  })
})
