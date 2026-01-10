import { describe, it, expect } from 'vitest'
import {
  cx,
  createVariants,
  uiKitRegistry,
  type Size,
  type Variant,
  type Color,
  type Radius,
} from '../../../src/ui-kit/index'

describe('UI Kit Index', () => {
  describe('cx', () => {
    it('should merge class strings', () => {
      expect(cx('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter falsy values', () => {
      expect(cx('a', false, 'b', null, 'c', undefined)).toBe('a b c')
    })

    it('should handle empty input', () => {
      expect(cx()).toBe('')
    })

    it('should handle single class', () => {
      expect(cx('single')).toBe('single')
    })
  })

  describe('createVariants', () => {
    it('should create a variant function', () => {
      const variants = createVariants(
        'base',
        {
          size: { sm: 'size-sm', lg: 'size-lg' },
          color: { red: 'color-red', blue: 'color-blue' },
        },
        { size: 'sm', color: 'red' }
      )

      expect(typeof variants).toBe('function')
    })

    it('should return base with default variants', () => {
      const variants = createVariants(
        'base',
        {
          size: { sm: 'size-sm', lg: 'size-lg' },
        },
        { size: 'sm' }
      )

      expect(variants()).toContain('base')
      expect(variants()).toContain('size-sm')
    })

    it('should apply custom variants', () => {
      const variants = createVariants(
        'base',
        {
          size: { sm: 'size-sm', lg: 'size-lg' },
        },
        { size: 'sm' }
      )

      expect(variants({ size: 'lg' })).toContain('size-lg')
      expect(variants({ size: 'lg' })).not.toContain('size-sm')
    })

    it('should handle multiple variant types', () => {
      const variants = createVariants(
        'btn',
        {
          size: { sm: 'btn-sm', lg: 'btn-lg' },
          color: { red: 'btn-red', blue: 'btn-blue' },
        }
      )

      const result = variants({ size: 'sm', color: 'red' })
      expect(result).toContain('btn')
      expect(result).toContain('btn-sm')
      expect(result).toContain('btn-red')
    })

    it('should handle missing defaults', () => {
      const variants = createVariants(
        'base',
        {
          size: { sm: 'size-sm' },
        }
      )

      expect(variants()).toBe('base')
    })
  })

  describe('uiKitRegistry', () => {
    it('should have button component', () => {
      expect(uiKitRegistry.button).toBeDefined()
      expect(uiKitRegistry.button.name).toBe('Button')
      expect(uiKitRegistry.button.variants).toContain('solid')
      expect(uiKitRegistry.button.sizes).toContain('md')
    })

    it('should have input component', () => {
      expect(uiKitRegistry.input).toBeDefined()
      expect(uiKitRegistry.input.name).toBe('Input')
      expect(uiKitRegistry.input.variants).toContain('default')
    })

    it('should have card component', () => {
      expect(uiKitRegistry.card).toBeDefined()
      expect(uiKitRegistry.card.name).toBe('Card')
      expect(uiKitRegistry.card.variants).toContain('elevated')
    })

    it('should have badge component', () => {
      expect(uiKitRegistry.badge).toBeDefined()
      expect(uiKitRegistry.badge.name).toBe('Badge')
    })

    it('should have avatar component', () => {
      expect(uiKitRegistry.avatar).toBeDefined()
      expect(uiKitRegistry.avatar.name).toBe('Avatar')
    })

    it('should have alert component', () => {
      expect(uiKitRegistry.alert).toBeDefined()
      expect(uiKitRegistry.alert.name).toBe('Alert')
    })

    it('should have modal component', () => {
      expect(uiKitRegistry.modal).toBeDefined()
      expect(uiKitRegistry.modal.name).toBe('Modal')
    })

    it('should have toast component', () => {
      expect(uiKitRegistry.toast).toBeDefined()
      expect(uiKitRegistry.toast.name).toBe('Toast')
    })
  })

  describe('Type exports', () => {
    it('should export Size type values', () => {
      const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']
      expect(sizes.length).toBe(5)
    })

    it('should export Variant type values', () => {
      const variants: Variant[] = ['solid', 'soft', 'outline', 'ghost']
      expect(variants.length).toBe(4)
    })

    it('should export Color type values', () => {
      const colors: Color[] = ['coral', 'slate', 'red', 'green', 'blue', 'yellow', 'purple', 'pink', 'cyan', 'orange']
      expect(colors.length).toBe(10)
    })

    it('should export Radius type values', () => {
      const radii: Radius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
      expect(radii.length).toBe(7)
    })
  })
})
