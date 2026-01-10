/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import {
  toHaveClass,
  toHaveClasses,
  toNotHaveClass,
  toHaveVariant,
  toMatchCSS,
  toContainCSS,
  setupCoralMatchers,
  getClassAssertions,
} from '../../../src/testing/matchers'

describe('Testing Matchers', () => {
  describe('toHaveClass', () => {
    it('should pass when element has class', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4'

      const result = toHaveClass(element, 'bg-red-500')
      expect(result.pass).toBe(true)
    })

    it('should fail when element does not have class', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500'

      const result = toHaveClass(element, 'p-4')
      expect(result.pass).toBe(false)
    })

    it('should work with string input', () => {
      const result = toHaveClass('bg-red-500 p-4', 'bg-red-500')
      expect(result.pass).toBe(true)
    })

    it('should return proper message on failure', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500'

      const result = toHaveClass(element, 'p-4')
      expect(result.message()).toContain('p-4')
    })
  })

  describe('toHaveClasses', () => {
    it('should pass when element has all classes', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4 m-2'

      const result = toHaveClasses(element, ['bg-red-500', 'p-4'])
      expect(result.pass).toBe(true)
    })

    it('should fail when element is missing a class', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500'

      const result = toHaveClasses(element, ['bg-red-500', 'p-4'])
      expect(result.pass).toBe(false)
    })

    it('should work with string input', () => {
      const result = toHaveClasses('bg-red-500 p-4', ['bg-red-500', 'p-4'])
      expect(result.pass).toBe(true)
    })

    it('should return missing classes in message', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500'

      const result = toHaveClasses(element, ['bg-red-500', 'p-4', 'm-2'])
      expect(result.message()).toContain('p-4')
      expect(result.message()).toContain('m-2')
    })
  })

  describe('toNotHaveClass', () => {
    it('should pass when element does not have class', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500'

      const result = toNotHaveClass(element, 'p-4')
      expect(result.pass).toBe(true)
    })

    it('should fail when element has class', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4'

      const result = toNotHaveClass(element, 'p-4')
      expect(result.pass).toBe(false)
    })

    it('should work with string input', () => {
      const result = toNotHaveClass('bg-red-500', 'p-4')
      expect(result.pass).toBe(true)
    })
  })

  describe('toHaveVariant', () => {
    it('should pass when class has variant prefix', () => {
      const result = toHaveVariant('hover:bg-red-500', 'hover')
      expect(result.pass).toBe(true)
    })

    it('should pass for element with variant class', () => {
      const element = document.createElement('div')
      element.className = 'hover:bg-red-500 focus:outline-none'

      const result = toHaveVariant(element, 'hover')
      expect(result.pass).toBe(true)
    })

    it('should fail when variant is not present', () => {
      const result = toHaveVariant('bg-red-500', 'hover')
      expect(result.pass).toBe(false)
    })

    it('should detect nested variants', () => {
      const result = toHaveVariant('dark:hover:bg-red-500', 'dark')
      expect(result.pass).toBe(true)
    })
  })

  describe('toMatchCSS', () => {
    it('should pass for matching CSS', () => {
      const css = '.test { color: red; }'
      const result = toMatchCSS(css, '.test { color: red; }')
      expect(result.pass).toBe(true)
    })

    it('should handle whitespace differences', () => {
      const css1 = '.test{color:red;}'
      const css2 = '.test { color: red; }'
      const result = toMatchCSS(css1, css2)
      expect(result.pass).toBe(true)
    })

    it('should fail for different CSS', () => {
      const css1 = '.test { color: red; }'
      const css2 = '.test { color: blue; }'
      const result = toMatchCSS(css1, css2)
      expect(result.pass).toBe(false)
    })
  })

  describe('toContainCSS', () => {
    it('should pass when CSS contains expected rule', () => {
      const css = '.test { color: red; background: blue; }'
      const result = toContainCSS(css, 'color: red')
      expect(result.pass).toBe(true)
    })

    it('should fail when CSS does not contain expected rule', () => {
      const css = '.test { color: red; }'
      const result = toContainCSS(css, 'background: blue')
      expect(result.pass).toBe(false)
    })

    it('should match exact case', () => {
      const css = '.test { color: RED; }'
      const result = toContainCSS(css, 'color: RED')
      expect(result.pass).toBe(true)
    })
  })

  describe('setupCoralMatchers', () => {
    it('should extend expect with coral matchers', () => {
      const mockExpect = {
        extend: (matchers: Record<string, unknown>) => {
          expect(matchers.toHaveClass).toBeDefined()
          expect(matchers.toHaveClasses).toBeDefined()
          expect(matchers.toNotHaveClass).toBeDefined()
          expect(matchers.toHaveVariant).toBeDefined()
          expect(matchers.toMatchCSS).toBeDefined()
          expect(matchers.toContainCSS).toBeDefined()
        },
      }

      setupCoralMatchers(mockExpect)
    })

    it('should call extend with functions that work correctly', () => {
      let registeredMatchers: Record<string, unknown> = {}
      const mockExpect = {
        extend: (matchers: Record<string, unknown>) => {
          registeredMatchers = matchers
        },
      }

      setupCoralMatchers(mockExpect)

      // Test the registered toHaveClass
      const toHaveClassFn = registeredMatchers.toHaveClass as (received: Element | string, className: string) => { pass: boolean }
      expect(toHaveClassFn('a b c', 'b').pass).toBe(true)

      // Test the registered toHaveClasses
      const toHaveClassesFn = registeredMatchers.toHaveClasses as (received: Element | string, classNames: string[]) => { pass: boolean }
      expect(toHaveClassesFn('a b c', ['a', 'b']).pass).toBe(true)

      // Test the registered toNotHaveClass
      const toNotHaveClassFn = registeredMatchers.toNotHaveClass as (received: Element | string, className: string) => { pass: boolean }
      expect(toNotHaveClassFn('a b', 'c').pass).toBe(true)

      // Test the registered toHaveVariant
      const toHaveVariantFn = registeredMatchers.toHaveVariant as (received: Element | string, variant: string, value?: string) => { pass: boolean }
      expect(toHaveVariantFn('hover:bg-red', 'hover').pass).toBe(true)
      expect(toHaveVariantFn('hover:bg-red', 'hover', 'bg-red').pass).toBe(true)

      // Test the registered toMatchCSS
      const toMatchCSSFn = registeredMatchers.toMatchCSS as (received: string, expected: string) => { pass: boolean }
      expect(toMatchCSSFn('.a { color: red; }', '.a { color: red; }').pass).toBe(true)

      // Test the registered toContainCSS
      const toContainCSSFn = registeredMatchers.toContainCSS as (received: string, expected: string) => { pass: boolean }
      expect(toContainCSSFn('.a { color: red; }', 'color: red').pass).toBe(true)
    })
  })

  describe('getClassAssertions', () => {
    it('should return classes array', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4 m-2'

      const assertions = getClassAssertions(element)
      expect(assertions.classes).toEqual(['bg-red-500', 'p-4', 'm-2'])
    })

    it('should check hasClass correctly', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4'

      const assertions = getClassAssertions(element)
      expect(assertions.hasClass('bg-red-500')).toBe(true)
      expect(assertions.hasClass('p-8')).toBe(false)
    })

    it('should check hasAllClasses correctly', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4 m-2'

      const assertions = getClassAssertions(element)
      expect(assertions.hasAllClasses(['bg-red-500', 'p-4'])).toBe(true)
      expect(assertions.hasAllClasses(['bg-red-500', 'p-8'])).toBe(false)
    })

    it('should check hasAnyClass correctly', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4'

      const assertions = getClassAssertions(element)
      expect(assertions.hasAnyClass(['bg-red-500', 'p-8'])).toBe(true)
      expect(assertions.hasAnyClass(['m-2', 'p-8'])).toBe(false)
    })

    it('should check hasVariant correctly', () => {
      const element = document.createElement('div')
      element.className = 'hover:bg-red-500 focus:outline-none'

      const assertions = getClassAssertions(element)
      expect(assertions.hasVariant('hover')).toBe(true)
      expect(assertions.hasVariant('focus')).toBe(true)
      expect(assertions.hasVariant('dark')).toBe(false)
    })

    it('should get variant classes correctly', () => {
      const element = document.createElement('div')
      element.className = 'hover:bg-red-500 hover:text-white focus:outline-none'

      const assertions = getClassAssertions(element)
      expect(assertions.getVariantClasses('hover')).toEqual(['hover:bg-red-500', 'hover:text-white'])
      expect(assertions.getVariantClasses('focus')).toEqual(['focus:outline-none'])
      expect(assertions.getVariantClasses('dark')).toEqual([])
    })

    it('should get base classes correctly', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4 hover:bg-blue-500 dark:text-white'

      const assertions = getClassAssertions(element)
      expect(assertions.getBaseClasses()).toEqual(['bg-red-500', 'p-4'])
    })

    it('should handle empty class list', () => {
      const element = document.createElement('div')

      const assertions = getClassAssertions(element)
      expect(assertions.classes).toEqual([])
      expect(assertions.hasClass('any')).toBe(false)
      expect(assertions.hasAllClasses(['a', 'b'])).toBe(false)
      expect(assertions.hasAnyClass(['a', 'b'])).toBe(false)
      expect(assertions.hasVariant('hover')).toBe(false)
      expect(assertions.getVariantClasses('hover')).toEqual([])
      expect(assertions.getBaseClasses()).toEqual([])
    })
  })

  describe('message branches', () => {
    describe('toHaveClass messages', () => {
      it('should return success message when pass is true', () => {
        const result = toHaveClass('bg-red-500 p-4', 'bg-red-500')
        expect(result.pass).toBe(true)
        expect(result.message()).toContain('Expected element not to have class')
        expect(result.message()).toContain('bg-red-500')
      })

      it('should return failure message with no classes', () => {
        const result = toHaveClass('', 'p-4')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain('(no classes)')
      })
    })

    describe('toHaveClasses messages', () => {
      it('should return success message when pass is true', () => {
        const result = toHaveClasses('bg-red-500 p-4', ['bg-red-500', 'p-4'])
        expect(result.pass).toBe(true)
        expect(result.message()).toContain('Expected element not to have classes')
      })
    })

    describe('toNotHaveClass messages', () => {
      it('should return success message when class is absent', () => {
        const result = toNotHaveClass('bg-red-500', 'p-4')
        expect(result.pass).toBe(true)
        expect(result.message()).toContain("doesn't")
      })

      it('should return failure message when class is present', () => {
        const result = toNotHaveClass('bg-red-500 p-4', 'p-4')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain('Expected element not to have class')
      })
    })

    describe('toHaveVariant messages', () => {
      it('should return success message with specific value', () => {
        const result = toHaveVariant('hover:bg-red-500', 'hover', 'bg-red-500')
        expect(result.pass).toBe(true)
        expect(result.message()).toContain('Expected element not to have variant')
        expect(result.message()).toContain('hover:bg-red-500')
      })

      it('should return failure message with no classes', () => {
        const result = toHaveVariant('', 'hover')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain('(none)')
      })

      it('should return failure message with specific value', () => {
        const result = toHaveVariant('hover:bg-red-500', 'hover', 'bg-blue-500')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain(':bg-blue-500')
        expect(result.message()).toContain("it doesn't")
      })
    })

    describe('toMatchCSS messages', () => {
      it('should return success message', () => {
        const result = toMatchCSS('.test { color: red; }', '.test { color: red; }')
        expect(result.pass).toBe(true)
        expect(result.message()).toContain('Expected CSS not to match')
      })

      it('should return failure message with diff', () => {
        const result = toMatchCSS('.test { color: red; }', '.test { color: blue; }')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain('Expected CSS:')
        expect(result.message()).toContain('Received:')
      })
    })

    describe('toContainCSS messages', () => {
      it('should return success message', () => {
        const result = toContainCSS('.test { color: red; }', 'color: red')
        expect(result.pass).toBe(true)
        expect(result.message()).toContain('Expected CSS not to contain')
      })

      it('should return failure message', () => {
        const result = toContainCSS('.test { color: red; }', 'color: blue')
        expect(result.pass).toBe(false)
        expect(result.message()).toContain('Expected CSS to contain:')
      })
    })
  })

  describe('toHaveVariant with specific value', () => {
    it('should pass when variant with exact value exists', () => {
      const result = toHaveVariant('hover:bg-red-500 focus:text-white', 'hover', 'bg-red-500')
      expect(result.pass).toBe(true)
    })

    it('should fail when variant with different value exists', () => {
      const result = toHaveVariant('hover:bg-red-500', 'hover', 'bg-blue-500')
      expect(result.pass).toBe(false)
    })

    it('should pass with element when variant has specific value', () => {
      const element = document.createElement('div')
      element.className = 'hover:bg-red-500 focus:text-white'

      const result = toHaveVariant(element, 'hover', 'bg-red-500')
      expect(result.pass).toBe(true)
    })

    it('should fail with element when variant has different value', () => {
      const element = document.createElement('div')
      element.className = 'hover:bg-red-500'

      const result = toHaveVariant(element, 'hover', 'bg-blue-500')
      expect(result.pass).toBe(false)
    })
  })
})
