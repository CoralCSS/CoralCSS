/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createCoralStore, coralStore, createClassGenerator } from '../../../src/svelte/store'

// Mock svelte/store
vi.mock('svelte/store', () => ({
  writable: (initialValue: string) => {
    let value = initialValue
    const subscribers = new Set<(v: string) => void>()
    return {
      subscribe: (fn: (v: string) => void) => {
        subscribers.add(fn)
        fn(value)
        return () => subscribers.delete(fn)
      },
      set: (v: string) => {
        value = v
        subscribers.forEach((fn) => fn(v))
      },
      get: () => value,
    }
  },
  get: (store: { get: () => string }) => store.get(),
}))

// Mock svelte context
vi.mock('svelte', () => ({
  getContext: vi.fn(),
  setContext: vi.fn(),
}))

describe('Svelte Store', () => {
  beforeEach(() => {
    // Clean up any existing style elements
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  afterEach(() => {
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  describe('createCoralStore', () => {
    it('should create a store with coral instance', () => {
      const store = createCoralStore()
      expect(store.coral).toBeDefined()
    })

    it('should create a store with injectedCSS set', () => {
      const store = createCoralStore()
      expect(store.injectedCSS).toBeInstanceOf(Set)
    })

    it('should have generate method', () => {
      const store = createCoralStore()
      expect(store.generate).toBeDefined()
      expect(typeof store.generate).toBe('function')
    })

    it('should have process method', () => {
      const store = createCoralStore()
      expect(store.process).toBeDefined()
      expect(typeof store.process).toBe('function')
    })

    it('should have subscribe method', () => {
      const store = createCoralStore()
      expect(store.subscribe).toBeDefined()
    })

    it('should create style element when autoInject is true', () => {
      createCoralStore({ autoInject: true })
      const style = document.getElementById('coral-css-svelte')
      expect(style).not.toBeNull()
      expect(style?.getAttribute('data-coral')).toBe('svelte')
    })

    it('should not create style element when autoInject is false', () => {
      createCoralStore({ autoInject: false })
      const style = document.getElementById('coral-css-svelte')
      expect(style).toBeNull()
    })

    it('should generate CSS for string input', () => {
      const store = createCoralStore({ autoInject: false })
      const css = store.generate('bg-red-500 p-4')
      expect(typeof css).toBe('string')
    })

    it('should generate CSS for array input', () => {
      const store = createCoralStore({ autoInject: false })
      const css = store.generate(['bg-red-500', 'p-4'])
      expect(typeof css).toBe('string')
    })

    it('should process and return class names', () => {
      const store = createCoralStore({ autoInject: false })
      const result = store.process('bg-red-500 p-4')
      expect(result).toBe('bg-red-500 p-4')
    })

    it('should process array of classes', () => {
      const store = createCoralStore({ autoInject: false })
      const result = store.process(['bg-red-500', 'p-4'])
      expect(result).toBe('bg-red-500 p-4')
    })

    it('should accept darkMode option', () => {
      const store = createCoralStore({ darkMode: 'class' })
      expect(store.coral.config.darkMode).toBe('class')
    })
  })

  describe('coralStore', () => {
    it('should be a default store instance', () => {
      expect(coralStore).toBeDefined()
      expect(coralStore.coral).toBeDefined()
      expect(coralStore.generate).toBeDefined()
      expect(coralStore.process).toBeDefined()
    })
  })

  describe('createClassGenerator', () => {
    it('should create a class generator function', () => {
      const getClass = createClassGenerator({
        base: 'rounded-lg p-4',
      })

      expect(typeof getClass).toBe('function')
    })

    it('should return base classes', () => {
      const getClass = createClassGenerator({
        base: 'rounded-lg p-4',
      })

      const result = getClass()
      expect(result).toContain('rounded-lg')
      expect(result).toContain('p-4')
    })

    it('should apply variant classes', () => {
      const getClass = createClassGenerator({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      })

      const result = getClass({ variant: 'primary' })
      expect(result).toContain('btn')
      expect(result).toContain('bg-blue-500')
    })

    it('should apply default variants', () => {
      const getClass = createClassGenerator({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          variant: 'secondary',
        },
      })

      const result = getClass()
      expect(result).toContain('bg-gray-500')
    })

    it('should override default variants', () => {
      const getClass = createClassGenerator({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          variant: 'secondary',
        },
      })

      const result = getClass({ variant: 'primary' })
      expect(result).toContain('bg-blue-500')
    })

    it('should handle multiple variants', () => {
      const getClass = createClassGenerator({
        base: 'btn',
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

      const result = getClass({ color: 'red', size: 'lg' })
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-lg')
    })

    it('should handle empty config', () => {
      const getClass = createClassGenerator({})
      const result = getClass()
      expect(result).toBe('')
    })
  })
})
