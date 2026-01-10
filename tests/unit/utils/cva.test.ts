import { describe, it, expect } from 'vitest'
import {
  cx,
  cn,
  cva,
  compose,
  slots,
  responsiveVariants,
  when,
  toggle,
  focusRing,
  disabledStyles,
  transition,
  buttonVariants,
  badgeVariants,
  inputVariants,
  cardSlots,
} from '../../../src/utils/cva'

describe('Utils CVA', () => {
  describe('cx', () => {
    it('should merge string classes', () => {
      expect(cx('foo', 'bar')).toBe('foo bar')
    })

    it('should handle single string', () => {
      expect(cx('foo')).toBe('foo')
    })

    it('should handle empty string', () => {
      expect(cx('')).toBe('')
    })

    it('should handle null values', () => {
      expect(cx('foo', null, 'bar')).toBe('foo bar')
    })

    it('should handle undefined values', () => {
      expect(cx('foo', undefined, 'bar')).toBe('foo bar')
    })

    it('should handle false values', () => {
      expect(cx('foo', false, 'bar')).toBe('foo bar')
    })

    it('should handle array of strings', () => {
      expect(cx(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle nested arrays', () => {
      expect(cx(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('should handle object with boolean values', () => {
      expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should handle mixed inputs', () => {
      expect(cx('foo', ['bar', 'baz'], { qux: true, quux: false })).toBe('foo bar baz qux')
    })

    it('should filter empty strings in array', () => {
      expect(cx(['foo', '', 'bar'])).toBe('foo bar')
    })

    it('should handle multiple spaces in string', () => {
      expect(cx('foo  bar   baz')).toBe('foo bar baz')
    })

    it('should handle object with undefined values', () => {
      expect(cx({ foo: undefined, bar: true })).toBe('bar')
    })

    it('should handle object with null values', () => {
      expect(cx({ foo: null, bar: true })).toBe('bar')
    })

    it('should handle object keys with spaces', () => {
      expect(cx({ 'foo bar': true })).toBe('foo bar')
    })

    it('should return empty string for all falsy inputs', () => {
      expect(cx(null, undefined, false, '')).toBe('')
    })

    it('should handle no arguments', () => {
      expect(cx()).toBe('')
    })
  })

  describe('cn', () => {
    it('should be an alias for cx', () => {
      expect(cn).toBe(cx)
    })

    it('should work like cx', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })
  })

  describe('cva', () => {
    it('should return base classes when no variants', () => {
      const button = cva({ base: 'btn' })
      expect(button()).toBe('btn')
    })

    it('should apply default variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button()).toBe('btn btn-sm')
    })

    it('should apply specified variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button({ size: 'lg' })).toBe('btn btn-lg')
    })

    it('should handle multiple variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
          color: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
          },
        },
        defaultVariants: {
          size: 'sm',
          color: 'primary',
        },
      })
      expect(button({ size: 'lg', color: 'secondary' })).toBe('btn text-lg bg-secondary')
    })

    it('should handle compound variants', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
          color: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
          },
        },
        compoundVariants: [
          {
            size: 'sm',
            color: 'primary',
            class: 'compound-sm-primary',
          },
        ],
        defaultVariants: {
          size: 'sm',
          color: 'primary',
        },
      })
      expect(button()).toContain('compound-sm-primary')
    })

    it('should handle compound variants with array conditions', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
          },
        },
        compoundVariants: [
          {
            size: ['sm', 'md'],
            class: 'small-or-medium',
          },
        ],
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button({ size: 'sm' })).toContain('small-or-medium')
      expect(button({ size: 'md' })).toContain('small-or-medium')
      expect(button({ size: 'lg' })).not.toContain('small-or-medium')
    })

    it('should handle compound variants with className', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
          },
        },
        compoundVariants: [
          {
            size: 'sm',
            className: 'compound-class',
          },
        ],
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button()).toContain('compound-class')
    })

    it('should append class prop', () => {
      const button = cva({ base: 'btn' })
      expect(button({ class: 'custom' })).toBe('btn custom')
    })

    it('should append className prop', () => {
      const button = cva({ base: 'btn' })
      expect(button({ className: 'custom' })).toBe('btn custom')
    })

    it('should expose variants metadata', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'btn-sm',
            lg: 'btn-lg',
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button.variants).toEqual({ size: { sm: 'btn-sm', lg: 'btn-lg' } })
      expect(button.defaultVariants).toEqual({ size: 'sm' })
    })

    it('should handle empty config', () => {
      const button = cva({})
      expect(button()).toBe('')
    })

    it('should handle variant not matching', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: 'btn-sm',
          },
        },
      })
      expect(button({ size: 'nonexistent' as 'sm' })).toBe('btn')
    })

    it('should handle base as array', () => {
      const button = cva({
        base: ['inline-flex', 'items-center'],
      })
      expect(button()).toBe('inline-flex items-center')
    })

    it('should handle variant value as array', () => {
      const button = cva({
        base: 'btn',
        variants: {
          size: {
            sm: ['text-sm', 'p-2'],
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })
      expect(button()).toBe('btn text-sm p-2')
    })
  })

  describe('compose', () => {
    it('should compose two cva functions', () => {
      const base = cva({
        base: 'rounded',
        variants: {
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      })

      const color = cva({
        variants: {
          color: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
          },
        },
      })

      const combined = compose(base, color)
      expect(combined({ size: 'sm', color: 'primary' })).toContain('rounded')
      expect(combined({ size: 'sm', color: 'primary' })).toContain('text-sm')
      expect(combined({ size: 'sm', color: 'primary' })).toContain('bg-primary')
    })

    it('should work with no props', () => {
      const base = cva({ base: 'rounded' })
      const extra = cva({ base: 'shadow' })

      const combined = compose(base, extra)
      expect(combined()).toContain('rounded')
      expect(combined()).toContain('shadow')
    })

    it('should handle three cva functions', () => {
      const a = cva({ base: 'a' })
      const b = cva({ base: 'b' })
      const c = cva({ base: 'c' })

      const combined = compose(a, b, c)
      expect(combined()).toBe('a b c')
    })
  })

  describe('slots', () => {
    it('should return slot classes', () => {
      const card = slots({
        slots: {
          root: 'card',
          header: 'card-header',
          body: 'card-body',
        },
      })

      const result = card()
      expect(result.root).toBe('card')
      expect(result.header).toBe('card-header')
      expect(result.body).toBe('card-body')
    })

    it('should apply variant classes to slots', () => {
      const card = slots({
        slots: {
          root: 'card',
          header: 'card-header',
        },
        variants: {
          size: {
            sm: {
              root: 'card-sm',
              header: 'header-sm',
            },
            lg: {
              root: 'card-lg',
              header: 'header-lg',
            },
          },
        },
      })

      const result = card({ size: 'sm' })
      expect(result.root).toContain('card')
      expect(result.root).toContain('card-sm')
      expect(result.header).toContain('card-header')
      expect(result.header).toContain('header-sm')
    })

    it('should apply default variants', () => {
      const card = slots({
        slots: {
          root: 'card',
        },
        variants: {
          size: {
            sm: { root: 'card-sm' },
            lg: { root: 'card-lg' },
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })

      const result = card()
      expect(result.root).toContain('card-sm')
    })

    it('should handle slots without variant styles', () => {
      const card = slots({
        slots: {
          root: 'card',
          footer: 'card-footer',
        },
        variants: {
          size: {
            sm: { root: 'card-sm' },
          },
        },
      })

      const result = card({ size: 'sm' })
      expect(result.footer).toBe('card-footer')
    })

    it('should work with no props', () => {
      const card = slots({
        slots: {
          root: 'card',
        },
      })

      const result = card()
      expect(result.root).toBe('card')
    })
  })

  describe('responsiveVariants', () => {
    it('should apply simple variant value', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      })

      expect(button({ size: 'sm' })).toBe('btn text-sm')
    })

    it('should apply responsive variant value', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
          },
        },
      })

      const result = button({
        size: { default: 'sm', md: 'md', lg: 'lg' },
      })

      expect(result).toContain('btn')
      expect(result).toContain('text-sm')
      expect(result).toContain('md:text-md')
      expect(result).toContain('lg:text-lg')
    })

    it('should apply default variants', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          size: 'sm',
        },
      })

      expect(button()).toBe('btn text-sm')
    })

    it('should handle all breakpoints', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'p-2',
          },
        },
      })

      const result = button({
        size: { default: 'sm', sm: 'sm', md: 'sm', lg: 'sm', xl: 'sm', '2xl': 'sm' },
      })

      expect(result).toContain('p-2')
      expect(result).toContain('sm:p-2')
      expect(result).toContain('md:p-2')
      expect(result).toContain('lg:p-2')
      expect(result).toContain('xl:p-2')
      expect(result).toContain('2xl:p-2')
    })

    it('should handle multiple responsive classes', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm p-2',
            lg: 'text-lg p-4',
          },
        },
      })

      const result = button({
        size: { default: 'sm', md: 'lg' },
      })

      expect(result).toContain('text-sm')
      expect(result).toContain('p-2')
      expect(result).toContain('md:text-lg')
      expect(result).toContain('md:p-4')
    })

    it('should append class prop', () => {
      const button = responsiveVariants({
        base: 'btn',
      })

      expect(button({ class: 'custom' })).toBe('btn custom')
    })

    it('should append className prop', () => {
      const button = responsiveVariants({
        base: 'btn',
      })

      expect(button({ className: 'custom' })).toBe('btn custom')
    })

    it('should handle missing responsive value', () => {
      const button = responsiveVariants({
        base: 'btn',
        variants: {
          size: {
            sm: 'text-sm',
          },
        },
      })

      const result = button({
        size: { md: 'sm' },
      })

      expect(result).toContain('btn')
      expect(result).toContain('md:text-sm')
      expect(result).not.toContain('text-sm ')
    })
  })

  describe('when', () => {
    it('should return trueClass when condition is true', () => {
      expect(when(true, 'active')).toBe('active')
    })

    it('should return falseClass when condition is false', () => {
      expect(when(false, 'active', 'inactive')).toBe('inactive')
    })

    it('should return empty string when condition is false and no falseClass', () => {
      expect(when(false, 'active')).toBe('')
    })

    it('should handle undefined condition', () => {
      expect(when(undefined, 'active', 'inactive')).toBe('inactive')
    })

    it('should handle null condition', () => {
      expect(when(null, 'active', 'inactive')).toBe('inactive')
    })
  })

  describe('toggle', () => {
    it('should be an alias for when', () => {
      expect(toggle).toBe(when)
    })

    it('should work like when', () => {
      expect(toggle(true, 'visible', 'hidden')).toBe('visible')
      expect(toggle(false, 'visible', 'hidden')).toBe('hidden')
    })
  })

  describe('focusRing', () => {
    it('should contain focus utility classes', () => {
      expect(focusRing).toContain('focus:outline-none')
      expect(focusRing).toContain('focus-visible:ring-2')
      expect(focusRing).toContain('focus-visible:ring-ring')
      expect(focusRing).toContain('focus-visible:ring-offset-2')
    })
  })

  describe('disabledStyles', () => {
    it('should contain disabled utility classes', () => {
      expect(disabledStyles).toContain('disabled:pointer-events-none')
      expect(disabledStyles).toContain('disabled:opacity-50')
    })
  })

  describe('transition', () => {
    it('should contain transition utility classes', () => {
      expect(transition).toBe('transition-colors duration-200')
    })
  })

  describe('buttonVariants', () => {
    it('should return default button classes', () => {
      const classes = buttonVariants()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('rounded-md')
      expect(classes).toContain('bg-primary')
      expect(classes).toContain('h-10')
      expect(classes).toContain('px-4')
    })

    it('should apply destructive variant', () => {
      const classes = buttonVariants({ variant: 'destructive' })
      expect(classes).toContain('bg-destructive')
    })

    it('should apply outline variant', () => {
      const classes = buttonVariants({ variant: 'outline' })
      expect(classes).toContain('border')
      expect(classes).toContain('bg-background')
    })

    it('should apply secondary variant', () => {
      const classes = buttonVariants({ variant: 'secondary' })
      expect(classes).toContain('bg-secondary')
    })

    it('should apply ghost variant', () => {
      const classes = buttonVariants({ variant: 'ghost' })
      expect(classes).toContain('hover:bg-accent')
    })

    it('should apply link variant', () => {
      const classes = buttonVariants({ variant: 'link' })
      expect(classes).toContain('underline-offset-4')
    })

    it('should apply sm size', () => {
      const classes = buttonVariants({ size: 'sm' })
      expect(classes).toContain('h-9')
      expect(classes).toContain('px-3')
    })

    it('should apply lg size', () => {
      const classes = buttonVariants({ size: 'lg' })
      expect(classes).toContain('h-11')
      expect(classes).toContain('px-8')
    })

    it('should apply icon size', () => {
      const classes = buttonVariants({ size: 'icon' })
      expect(classes).toContain('w-10')
    })

    it('should apply compound variant for outline + icon', () => {
      const classes = buttonVariants({ variant: 'outline', size: 'icon' })
      expect(classes).toContain('border-2')
    })

    it('should expose variants', () => {
      expect(buttonVariants.variants).toBeDefined()
      expect(buttonVariants.variants?.variant).toBeDefined()
      expect(buttonVariants.variants?.size).toBeDefined()
    })

    it('should expose defaultVariants', () => {
      expect(buttonVariants.defaultVariants).toEqual({
        variant: 'default',
        size: 'default',
      })
    })
  })

  describe('badgeVariants', () => {
    it('should return default badge classes', () => {
      const classes = badgeVariants()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('px-2.5')
      expect(classes).toContain('bg-primary')
    })

    it('should apply secondary variant', () => {
      const classes = badgeVariants({ variant: 'secondary' })
      expect(classes).toContain('bg-secondary')
    })

    it('should apply destructive variant', () => {
      const classes = badgeVariants({ variant: 'destructive' })
      expect(classes).toContain('bg-destructive')
    })

    it('should apply outline variant', () => {
      const classes = badgeVariants({ variant: 'outline' })
      expect(classes).toContain('text-foreground')
    })

    it('should apply success variant', () => {
      const classes = badgeVariants({ variant: 'success' })
      expect(classes).toContain('bg-green-500')
    })

    it('should apply warning variant', () => {
      const classes = badgeVariants({ variant: 'warning' })
      expect(classes).toContain('bg-amber-500')
    })

    it('should apply info variant', () => {
      const classes = badgeVariants({ variant: 'info' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('inputVariants', () => {
    it('should return default input classes', () => {
      const classes = inputVariants()
      expect(classes).toContain('flex')
      expect(classes).toContain('w-full')
      expect(classes).toContain('rounded-md')
      expect(classes).toContain('border')
      expect(classes).toContain('h-10')
    })

    it('should apply sm size', () => {
      const classes = inputVariants({ size: 'sm' })
      expect(classes).toContain('h-9')
      expect(classes).toContain('text-xs')
    })

    it('should apply lg size', () => {
      const classes = inputVariants({ size: 'lg' })
      expect(classes).toContain('h-11')
      expect(classes).toContain('text-base')
    })

    it('should apply error state', () => {
      const classes = inputVariants({ state: 'error' })
      expect(classes).toContain('border-destructive')
    })

    it('should apply success state', () => {
      const classes = inputVariants({ state: 'success' })
      expect(classes).toContain('border-green-500')
    })

    it('should contain disabled styles', () => {
      const classes = inputVariants()
      expect(classes).toContain('disabled:pointer-events-none')
      expect(classes).toContain('disabled:opacity-50')
    })
  })

  describe('cardSlots', () => {
    it('should return default card slot classes', () => {
      const card = cardSlots()
      expect(card.root).toContain('rounded-lg')
      expect(card.root).toContain('border')
      expect(card.root).toContain('shadow-sm')
      expect(card.header).toContain('flex')
      expect(card.header).toContain('p-6')
      expect(card.title).toContain('text-2xl')
      expect(card.description).toContain('text-sm')
      expect(card.content).toContain('p-6')
      expect(card.footer).toContain('flex')
    })

    it('should apply outline variant', () => {
      const card = cardSlots({ variant: 'outline' })
      expect(card.root).toContain('border-2')
      expect(card.root).toContain('shadow-none')
    })

    it('should apply ghost variant', () => {
      const card = cardSlots({ variant: 'ghost' })
      expect(card.root).toContain('border-none')
      expect(card.root).toContain('shadow-none')
    })

    it('should apply elevated variant', () => {
      const card = cardSlots({ variant: 'elevated' })
      expect(card.root).toContain('shadow-lg')
    })
  })
})
