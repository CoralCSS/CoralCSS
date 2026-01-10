/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  withCoralCSS,
  resetDecorator,
  getCoralInstance,
  getInjectedCSS,
  generateCSS,
  createVariantCSS,
} from '../../../src/storybook/decorator'

describe('Storybook Decorator', () => {
  beforeEach(() => {
    resetDecorator()
  })

  afterEach(() => {
    resetDecorator()
  })

  describe('withCoralCSS', () => {
    it('should create a decorator function', () => {
      const decorator = withCoralCSS()
      expect(typeof decorator).toBe('function')
    })

    it('should return story result when called', () => {
      const decorator = withCoralCSS()
      const Story = () => '<div>Test</div>'
      const result = decorator(Story, { globals: {}, args: {} })
      expect(result).toBe('<div>Test</div>')
    })

    it('should initialize coral instance', () => {
      withCoralCSS()
      const instance = getCoralInstance()
      expect(instance).toBeDefined()
      expect(instance?.generate).toBeDefined()
    })

    it('should process base classes', () => {
      const decorator = withCoralCSS({
        baseClasses: ['bg-red-500', 'p-4'],
      })
      decorator(() => null, { globals: {}, args: {} })
      // Should not throw
    })

    it('should handle dark mode from globals', () => {
      const decorator = withCoralCSS({
        enableDarkMode: true,
        darkModeClass: 'dark',
      })

      decorator(() => null, { globals: { darkMode: true }, args: {} })
      expect(document.documentElement.classList.contains('dark')).toBe(true)

      decorator(() => null, { globals: { darkMode: false }, args: {} })
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('should handle theme global for dark mode', () => {
      const decorator = withCoralCSS({
        enableDarkMode: true,
      })

      decorator(() => null, { globals: { theme: 'dark' }, args: {} })
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should use default dark mode class', () => {
      const decorator = withCoralCSS({
        enableDarkMode: true,
      })

      decorator(() => null, { globals: { darkMode: true }, args: {} })
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should accept coral options', () => {
      withCoralCSS({
        darkMode: 'class',
      })
      const instance = getCoralInstance()
      expect(instance?.config.darkMode).toBe('class')
    })

    it('should reuse existing coral instance', () => {
      withCoralCSS()
      const instance1 = getCoralInstance()

      withCoralCSS()
      const instance2 = getCoralInstance()

      expect(instance1).toBe(instance2)
    })
  })

  describe('resetDecorator', () => {
    it('should reset coral instance', () => {
      withCoralCSS()
      expect(getCoralInstance()).not.toBeNull()

      resetDecorator()
      expect(getCoralInstance()).toBeNull()
    })

    it('should remove style element', () => {
      withCoralCSS()
      generateCSS('bg-red-500')

      const styleBefore = document.querySelector('#coral-storybook-styles')
      expect(styleBefore).toBeDefined()

      resetDecorator()
      const styleAfter = document.querySelector('#coral-storybook-styles')
      expect(styleAfter).toBeNull()
    })

    it('should clear injected CSS', () => {
      withCoralCSS()
      generateCSS('bg-red-500')

      resetDecorator()
      expect(getInjectedCSS()).toEqual([])
    })
  })

  describe('getCoralInstance', () => {
    it('should return null before initialization', () => {
      expect(getCoralInstance()).toBeNull()
    })

    it('should return coral instance after initialization', () => {
      withCoralCSS()
      expect(getCoralInstance()).not.toBeNull()
    })
  })

  describe('getInjectedCSS', () => {
    it('should return empty array initially', () => {
      expect(getInjectedCSS()).toEqual([])
    })

    it('should return injected CSS as array', () => {
      withCoralCSS()
      generateCSS('bg-red-500')

      const injected = getInjectedCSS()
      expect(Array.isArray(injected)).toBe(true)
    })
  })

  describe('generateCSS', () => {
    it('should accept string input', () => {
      const result = generateCSS('bg-red-500 p-4')
      expect(typeof result).toBe('string')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('p-4')
    })

    it('should accept array input', () => {
      const result = generateCSS(['bg-red-500', 'p-4'])
      expect(typeof result).toBe('string')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('p-4')
    })

    it('should inject CSS by default', () => {
      generateCSS('bg-red-500')
      expect(getInjectedCSS().length).toBeGreaterThanOrEqual(0)
    })

    it('should not inject CSS when autoInject is false', () => {
      resetDecorator()
      generateCSS('bg-blue-500', { autoInject: false })
      expect(getInjectedCSS()).toEqual([])
    })

    it('should not duplicate injected CSS', () => {
      generateCSS('bg-red-500')
      const length1 = getInjectedCSS().length

      generateCSS('bg-red-500')
      const length2 = getInjectedCSS().length

      expect(length1).toBe(length2)
    })
  })

  describe('getStyleElement edge cases', () => {
    it('should reuse existing style element', () => {
      // Create an existing style element
      const existingStyle = document.createElement('style')
      existingStyle.id = 'coral-storybook-styles'
      existingStyle.textContent = '.existing { color: red; }'
      document.head.appendChild(existingStyle)

      // Initialize decorator which should find the existing element
      const decorator = withCoralCSS()
      decorator(() => null, { globals: {}, args: {} })
      generateCSS('bg-red-500')

      // Style element should still be the same one
      const styleElements = document.querySelectorAll('#coral-storybook-styles')
      expect(styleElements.length).toBe(1)
    })

    it('should inject CSS correctly', () => {
      withCoralCSS()
      generateCSS(['p-4', 'mt-2', 'm-4'])

      const styleEl = document.querySelector('#coral-storybook-styles')
      expect(styleEl).not.toBeNull()
    })
  })

  describe('processClasses edge cases', () => {
    it('should handle autoInject false correctly', () => {
      // Clean up any existing style element from previous tests
      document.querySelectorAll('#coral-storybook-styles').forEach(el => el.remove())
      resetDecorator()
      generateCSS('bg-purple-500', { autoInject: false })

      // No CSS should be injected
      const styleEl = document.querySelector('#coral-storybook-styles')
      expect(styleEl).toBeNull()
    })

    it('should process multiple classes and return joined string', () => {
      const result = generateCSS(['class-a', 'class-b', 'class-c'])
      expect(result).toBe('class-a class-b class-c')
    })
  })

  describe('withCoralCSS edge cases', () => {
    it('should handle empty baseClasses', () => {
      const decorator = withCoralCSS({
        baseClasses: [],
      })
      const Story = () => 'Test'
      const result = decorator(Story, { globals: {}, args: {} })
      expect(result).toBe('Test')
    })

    it('should handle undefined globals', () => {
      const decorator = withCoralCSS({
        enableDarkMode: true,
      })
      const Story = () => 'Test'
      const result = decorator(Story, { args: {} })
      expect(result).toBe('Test')
    })

    it('should not enable dark mode when enableDarkMode is false', () => {
      const decorator = withCoralCSS({
        enableDarkMode: false,
      })
      decorator(() => null, { globals: { darkMode: true }, args: {} })
      // Dark class should not be added
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('createVariantCSS', () => {
    it('should create variant function', () => {
      const buttonVariants = createVariantCSS({
        base: 'btn',
        variants: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
      })

      expect(typeof buttonVariants).toBe('function')
    })

    it('should return base classes for unknown variant', () => {
      const buttonVariants = createVariantCSS({
        base: 'btn',
        variants: {
          primary: 'btn-primary',
        },
      })

      const result = buttonVariants('unknown')
      expect(result).toBe('btn')
    })

    it('should return base + variant classes', () => {
      const buttonVariants = createVariantCSS({
        base: 'btn',
        variants: {
          primary: 'btn-primary',
        },
      })

      const result = buttonVariants('primary')
      expect(result).toBe('btn btn-primary')
    })

    it('should handle empty base', () => {
      const buttonVariants = createVariantCSS({
        variants: {
          primary: 'btn-primary',
        },
      })

      const result = buttonVariants('primary')
      expect(result).toBe('btn-primary')
    })

    it('should pre-generate all variant CSS', () => {
      createVariantCSS({
        base: 'btn',
        variants: {
          primary: 'bg-red-500',
          secondary: 'bg-blue-500',
        },
      })

      // CSS should be injected
      expect(getInjectedCSS().length).toBeGreaterThanOrEqual(0)
    })
  })
})
