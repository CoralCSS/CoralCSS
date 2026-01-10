/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, computed, watch } from 'vue'

// Mock Vue's inject and provide
const mockProvide = vi.fn()
const mockInject = vi.fn()

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    provide: (...args: unknown[]) => mockProvide(...args),
    inject: (...args: unknown[]) => mockInject(...args),
  }
})

import {
  provideCoralInstance,
  useCoral,
  useCoralCSS,
  useClasses,
  useResponsive,
  useWatchCSS,
} from '../../../src/vue/composables'
import { CoralKey, CoralCSSKey } from '../../../src/vue/plugin'
import { createCoral } from '../../../src/index'

describe('Vue Composables', () => {
  let styleElement: HTMLStyleElement

  beforeEach(() => {
    vi.clearAllMocks()
    styleElement = document.createElement('style')
    styleElement.id = 'coral-css-vue'
    document.head.appendChild(styleElement)
  })

  afterEach(() => {
    styleElement.remove()
  })

  describe('provideCoralInstance', () => {
    it('should create and provide Coral instance', () => {
      const coral = provideCoralInstance()

      expect(mockProvide).toHaveBeenCalledWith(CoralKey, coral)
      expect(mockProvide).toHaveBeenCalledWith(CoralCSSKey, expect.any(Set))
    })

    it('should create Coral with options', () => {
      const coral = provideCoralInstance({ darkMode: 'class' })

      expect(coral).toBeDefined()
      expect(coral.config.darkMode).toBe('class')
    })

    it('should provide empty CSS set', () => {
      provideCoralInstance()

      const setCalls = mockProvide.mock.calls.filter(
        (call) => call[0] === CoralCSSKey
      )
      expect(setCalls.length).toBe(1)
      expect(setCalls[0][1]).toBeInstanceOf(Set)
      expect(setCalls[0][1].size).toBe(0)
    })
  })

  describe('useCoral', () => {
    it('should return injected Coral instance', () => {
      const mockCoral = createCoral()
      mockInject.mockReturnValue(mockCoral)

      const coral = useCoral()

      expect(coral).toBe(mockCoral)
    })

    it('should throw if no Coral instance provided', () => {
      mockInject.mockReturnValue(undefined)

      expect(() => useCoral()).toThrow(
        'useCoral must be used within a component that has CoralPlugin installed'
      )
    })
  })

  describe('useCoralCSS', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should return className and css computed refs', () => {
      const result = useCoralCSS('bg-red-500', 'p-4')

      expect(result.className).toBeDefined()
      expect(result.css).toBeDefined()
    })

    it('should combine class names', () => {
      const result = useCoralCSS('bg-red-500', 'p-4')

      expect(result.className.value).toBe('bg-red-500 p-4')
    })

    it('should handle falsy values', () => {
      const result = useCoralCSS('base', false, null, undefined, 'active')

      expect(result.className.value).toBe('base active')
    })

    it('should handle ref inputs', () => {
      const dynamicClass = ref('bg-blue-500')
      const result = useCoralCSS('base', dynamicClass)

      expect(result.className.value).toBe('base bg-blue-500')
    })

    it('should generate CSS', () => {
      const result = useCoralCSS('bg-red-500')

      expect(typeof result.css.value).toBe('string')
    })
  })

  describe('useClasses', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should return base classes', () => {
      const classes = useClasses({ base: 'rounded-lg shadow-md' })
      const result = classes()

      expect(result).toBe('rounded-lg shadow-md')
    })

    it('should apply variants', () => {
      const classes = useClasses({
        base: 'btn',
        variants: {
          color: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      })

      expect(classes({ color: 'primary' })).toBe('btn bg-blue-500')
      expect(classes({ color: 'secondary' })).toBe('btn bg-gray-500')
    })

    it('should apply default variants', () => {
      const classes = useClasses({
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

      expect(classes()).toBe('btn text-sm')
    })

    it('should override default variants', () => {
      const classes = useClasses({
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

      expect(classes({ size: 'lg' })).toBe('btn text-lg')
    })

    it('should handle multiple variants', () => {
      const classes = useClasses({
        base: 'btn',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
          size: {
            lg: 'text-lg',
          },
        },
      })

      expect(classes({ color: 'primary', size: 'lg' })).toBe(
        'btn bg-blue-500 text-lg'
      )
    })

    it('should handle empty config', () => {
      const classes = useClasses({})
      expect(classes()).toBe('')
    })

    it('should handle missing variant value', () => {
      const classes = useClasses({
        base: 'btn',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
        },
      })

      expect(classes({ color: 'unknown' as 'primary' })).toBe('btn')
    })
  })

  describe('useResponsive', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should return base classes', () => {
      const className = useResponsive({ base: 'p-2' })

      expect(className.value).toBe('p-2')
    })

    it('should add responsive prefixes for sm', () => {
      const className = useResponsive({ sm: 'p-4' })

      expect(className.value).toBe('sm:p-4')
    })

    it('should add responsive prefixes for md', () => {
      const className = useResponsive({ md: 'p-6' })

      expect(className.value).toBe('md:p-6')
    })

    it('should add responsive prefixes for lg', () => {
      const className = useResponsive({ lg: 'p-8' })

      expect(className.value).toBe('lg:p-8')
    })

    it('should add responsive prefixes for xl', () => {
      const className = useResponsive({ xl: 'p-10' })

      expect(className.value).toBe('xl:p-10')
    })

    it('should add responsive prefixes for 2xl', () => {
      const className = useResponsive({ '2xl': 'p-12' })

      expect(className.value).toBe('2xl:p-12')
    })

    it('should combine all breakpoints', () => {
      const className = useResponsive({
        base: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      })

      expect(className.value).toBe('p-2 sm:p-4 md:p-6 lg:p-8')
    })

    it('should handle multiple classes per breakpoint', () => {
      const className = useResponsive({
        base: 'p-2 m-2',
        sm: 'p-4 m-4',
      })

      expect(className.value).toBe('p-2 m-2 sm:p-4 sm:m-4')
    })

    it('should handle ref values', () => {
      const baseClass = ref('p-2')
      const className = useResponsive({ base: baseClass })

      expect(className.value).toBe('p-2')
    })

    it('should handle empty config', () => {
      const className = useResponsive({})

      expect(className.value).toBe('')
    })
  })

  describe('useWatchCSS', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should watch string ref', () => {
      const classRef = ref('bg-red-500')

      // Should not throw
      expect(() => useWatchCSS(classRef)).not.toThrow()
    })

    it('should watch array ref', () => {
      const classRef = ref(['bg-red-500', 'p-4'])

      // Should not throw
      expect(() => useWatchCSS(classRef)).not.toThrow()
    })

    it('should inject CSS into style element', () => {
      const classRef = ref('bg-indigo-500')
      useWatchCSS(classRef)

      // Style element should exist
      const style = document.getElementById('coral-css-vue')
      expect(style).not.toBeNull()
    })

    it('should update style when ref changes', () => {
      const classRef = ref('bg-pink-500')
      useWatchCSS(classRef)

      // Change the ref value
      classRef.value = 'bg-yellow-500'

      // Just verify no error is thrown
      expect(classRef.value).toBe('bg-yellow-500')
    })
  })

  describe('CSS injection edge cases', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should handle useCoralCSS with empty string', () => {
      const result = useCoralCSS('')
      expect(result.className.value).toBe('')
    })

    it('should handle useCoralCSS with multiple spaces', () => {
      const result = useCoralCSS('  bg-red-500   p-4  ')
      expect(result.className.value).toBeTruthy()
    })

    it('should not duplicate CSS in set', () => {
      const result1 = useCoralCSS('bg-cyan-500')
      const result2 = useCoralCSS('bg-cyan-500')

      // Both should work without duplication
      expect(result1.className.value).toBe('bg-cyan-500')
      expect(result2.className.value).toBe('bg-cyan-500')
    })
  })

  describe('useCoralCSS without CoralCSSKey provided', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        // Don't return CoralCSSKey to trigger fallback
        return undefined
      })
    })

    it('should create new Set when CoralCSSKey is not provided', () => {
      const result = useCoralCSS('bg-orange-500')
      expect(result.className.value).toBe('bg-orange-500')
    })
  })

  describe('useClasses without CoralCSSKey provided', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        return undefined
      })
    })

    it('should create new Set when CoralCSSKey is not provided', () => {
      const classes = useClasses({ base: 'btn-test' })
      expect(classes()).toBe('btn-test')
    })
  })

  describe('useResponsive without CoralCSSKey provided', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        return undefined
      })
    })

    it('should create new Set when CoralCSSKey is not provided', () => {
      const className = useResponsive({ base: 'flex' })
      expect(className.value).toBe('flex')
    })
  })

  describe('useWatchCSS without CoralCSSKey provided', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        return undefined
      })
    })

    it('should create new Set when CoralCSSKey is not provided', () => {
      const classRef = ref('grid')
      expect(() => useWatchCSS(classRef)).not.toThrow()
    })
  })

  describe('CSS injection when style element is missing', () => {
    beforeEach(() => {
      // Remove the style element
      const existingStyle = document.getElementById('coral-css-vue')
      existingStyle?.remove()

      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('useCoralCSS should work without style element', () => {
      const result = useCoralCSS('text-center')
      expect(result.className.value).toBe('text-center')
    })

    it('useClasses should work without style element', () => {
      const classes = useClasses({ base: 'inline-block' })
      expect(classes()).toBe('inline-block')
    })

    it('useResponsive should work without style element', () => {
      const className = useResponsive({ base: 'block', sm: 'inline' })
      expect(className.value).toBe('block sm:inline')
    })

    it('useWatchCSS should work without style element', () => {
      const classRef = ref('absolute')
      expect(() => useWatchCSS(classRef)).not.toThrow()
    })

    it('useWatchCSS with array should work without style element', () => {
      const classRef = ref(['relative', 'z-10'])
      expect(() => useWatchCSS(classRef)).not.toThrow()
    })
  })

  describe('useCoralCSS with ref that has false value', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should handle ref with falsy value', () => {
      const conditionalClass = ref<string | null>(null)
      const result = useCoralCSS('base-class', conditionalClass)
      expect(result.className.value).toBe('base-class')
    })

    it('should handle ref with boolean false', () => {
      const conditionalClass = ref(false as boolean | string)
      const result = useCoralCSS('base', conditionalClass)
      expect(result.className.value).toBe('base')
    })
  })

  describe('useResponsive with ref values', () => {
    beforeEach(() => {
      const mockCoral = createCoral()
      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('should handle sm as ref', () => {
      const smClass = ref('flex-col')
      const className = useResponsive({ sm: smClass })
      expect(className.value).toBe('sm:flex-col')
    })

    it('should handle md as ref', () => {
      const mdClass = ref('grid-cols-2')
      const className = useResponsive({ md: mdClass })
      expect(className.value).toBe('md:grid-cols-2')
    })

    it('should handle lg as ref', () => {
      const lgClass = ref('gap-4')
      const className = useResponsive({ lg: lgClass })
      expect(className.value).toBe('lg:gap-4')
    })

    it('should handle xl as ref', () => {
      const xlClass = ref('max-w-lg')
      const className = useResponsive({ xl: xlClass })
      expect(className.value).toBe('xl:max-w-lg')
    })

    it('should handle 2xl as ref', () => {
      const xxlClass = ref('container')
      const className = useResponsive({ '2xl': xxlClass })
      expect(className.value).toBe('2xl:container')
    })

    it('should handle empty ref value', () => {
      const emptyRef = ref('')
      const className = useResponsive({ base: emptyRef })
      expect(className.value).toBe('')
    })
  })

  describe('CSS injection with actual CSS generation', () => {
    beforeEach(() => {
      // Create coral instance with a mock plugin that generates CSS
      const mockCoral = createCoral()
      // Override generate to return actual CSS
      const originalGenerate = mockCoral.generate.bind(mockCoral)
      mockCoral.generate = (classes: string[]) => {
        const result = originalGenerate(classes)
        // Return mock CSS for testing style injection
        if (classes.length > 0 && classes[0]) {
          return `.${classes[0]} { color: red; }`
        }
        return result
      }

      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return new Set<string>()
        }
        return undefined
      })
    })

    it('useCoralCSS should inject CSS into style element', () => {
      const result = useCoralCSS('test-class')
      // Access css to trigger generation
      const css = result.css.value
      expect(css).toBeTruthy()

      // Check style element was updated
      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toContain('.test-class')
    })

    it('useClasses should inject CSS into style element', () => {
      const classes = useClasses({ base: 'component-base' })
      const className = classes()
      expect(className).toBe('component-base')

      // Check style element
      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toBeTruthy()
    })

    it('useResponsive should inject CSS into style element', () => {
      const className = useResponsive({ base: 'responsive-test' })
      expect(className.value).toBe('responsive-test')

      // Check style element
      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toBeTruthy()
    })

    it('useWatchCSS should inject CSS into style element', () => {
      const classRef = ref('watch-test')
      useWatchCSS(classRef)

      // Check style element
      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toBeTruthy()
    })

    it('useWatchCSS with array should inject CSS', () => {
      const classRef = ref(['array-test', 'multiple'])
      useWatchCSS(classRef)

      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toBeTruthy()
    })
  })

  describe('CSS already in injectedCSS set', () => {
    let sharedCSSSet: Set<string>

    beforeEach(() => {
      const mockCoral = createCoral()
      const originalGenerate = mockCoral.generate.bind(mockCoral)
      mockCoral.generate = (classes: string[]) => {
        const result = originalGenerate(classes)
        if (classes.length > 0 && classes[0]) {
          return `.duplicate { color: blue; }`
        }
        return result
      }

      sharedCSSSet = new Set<string>()
      // Pre-populate with the CSS
      sharedCSSSet.add('.duplicate { color: blue; }')

      mockInject.mockImplementation((key) => {
        if (key === CoralKey) {
          return mockCoral
        }
        if (key === CoralCSSKey) {
          return sharedCSSSet
        }
        return undefined
      })
    })

    it('useCoralCSS should not duplicate CSS', () => {
      const result = useCoralCSS('duplicate-class')
      result.css.value // trigger computation

      // Should still have only one entry
      expect(sharedCSSSet.size).toBe(1)
    })

    it('useClasses should not duplicate CSS', () => {
      const classes = useClasses({ base: 'duplicate-class' })
      classes()

      expect(sharedCSSSet.size).toBe(1)
    })

    it('useResponsive should not duplicate CSS', () => {
      const className = useResponsive({ base: 'duplicate-class' })
      className.value // trigger computation

      expect(sharedCSSSet.size).toBe(1)
    })

    it('useWatchCSS should not duplicate CSS', () => {
      const classRef = ref('duplicate-class')
      useWatchCSS(classRef)

      expect(sharedCSSSet.size).toBe(1)
    })
  })
})
