/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createCoralPlugin, CoralPlugin, CoralKey, CoralCSSKey } from '../../../src/vue/plugin'

// Mock Vue App
function createMockApp() {
  const provided: Map<symbol | string, unknown> = new Map()
  const directives: Map<string, unknown> = new Map()
  const globalProperties: Record<string, unknown> = {}

  return {
    provide: vi.fn((key: symbol | string, value: unknown) => {
      provided.set(key, value)
    }),
    directive: vi.fn((name: string, directive: unknown) => {
      directives.set(name, directive)
    }),
    config: {
      globalProperties,
    },
    _provided: provided,
    _directives: directives,
  }
}

describe('Vue Plugin', () => {
  beforeEach(() => {
    // Clean up any existing style elements
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  afterEach(() => {
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  describe('createCoralPlugin', () => {
    it('should create a plugin', () => {
      const plugin = createCoralPlugin()
      expect(plugin).toBeDefined()
      expect(plugin.install).toBeDefined()
    })

    it('should install and provide Coral instance', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      expect(app.provide).toHaveBeenCalledWith(CoralKey, expect.anything())
      expect(app.provide).toHaveBeenCalledWith(CoralCSSKey, expect.any(Set))
    })

    it('should register coral directive', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      expect(app.directive).toHaveBeenCalledWith('coral', expect.anything())
    })

    it('should create style element when autoInject is true', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const style = document.getElementById('coral-css-vue')
      expect(style).not.toBeNull()
      expect(style?.getAttribute('data-coral')).toBe('vue')
    })

    it('should not create style element when autoInject is false', () => {
      const plugin = createCoralPlugin({ autoInject: false })
      const app = createMockApp()

      plugin.install(app as never)

      const style = document.getElementById('coral-css-vue')
      expect(style).toBeNull()
    })

    it('should add global properties when autoInject is true', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      expect(app.config.globalProperties.$coral).toBeDefined()
      expect(app.config.globalProperties.$coralCSS).toBeDefined()
    })

    it('should accept darkMode option', () => {
      const plugin = createCoralPlugin({ darkMode: 'class' })
      const app = createMockApp()

      plugin.install(app as never)

      // Plugin should be installed without error
      expect(app.provide).toHaveBeenCalled()
    })
  })

  describe('CoralPlugin', () => {
    it('should be a default plugin instance', () => {
      expect(CoralPlugin).toBeDefined()
      expect(CoralPlugin.install).toBeDefined()
    })

    it('should install successfully', () => {
      const app = createMockApp()

      CoralPlugin.install(app as never)

      expect(app.provide).toHaveBeenCalled()
    })
  })

  describe('injection keys', () => {
    it('should export CoralKey as symbol', () => {
      expect(typeof CoralKey).toBe('symbol')
    })

    it('should export CoralCSSKey as symbol', () => {
      expect(typeof CoralCSSKey).toBe('symbol')
    })
  })

  describe('$coralCSS function', () => {
    it('should inject CSS and return class names', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const coralCSS = app.config.globalProperties.$coralCSS as (classes: string | string[]) => string
      expect(coralCSS).toBeDefined()

      // Test with string
      const result1 = coralCSS('bg-red-500 p-4')
      expect(result1).toBe('bg-red-500 p-4')

      // Test with array
      const result2 = coralCSS(['mt-2', 'mb-4'])
      expect(result2).toBe('mt-2 mb-4')

      // Check CSS is injected
      const style = document.getElementById('coral-css-vue')
      expect(style).not.toBeNull()
    })

    it('should not duplicate injected CSS', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const coralCSS = app.config.globalProperties.$coralCSS as (classes: string | string[]) => string

      // Inject same classes twice
      coralCSS('p-4')
      const firstContent = document.getElementById('coral-css-vue')?.textContent

      coralCSS('p-4')
      const secondContent = document.getElementById('coral-css-vue')?.textContent

      // Content should be the same (no duplication)
      expect(firstContent).toBe(secondContent)
    })
  })

  describe('directive functionality', () => {
    it('should apply classes via directive', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
      }
      expect(directiveConfig).toBeDefined()

      // Test directive mounted hook
      const element = document.createElement('div')
      directiveConfig.mounted(element, { value: 'bg-red-500 p-4' })

      expect(element.classList.contains('bg-red-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should handle array of classes via directive', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
      }

      const element = document.createElement('div')
      directiveConfig.mounted(element, { value: ['bg-blue-500', 'p-2'] })

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('p-2')).toBe(true)
    })

    it('should update classes via directive', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('bg-red-500')

      directiveConfig.updated(element, {
        value: 'bg-blue-500',
        oldValue: 'bg-red-500',
      })

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('bg-red-500')).toBe(false)
    })

    it('should handle update with no oldValue', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue?: string | string[] | null }) => void
      }

      const element = document.createElement('div')

      directiveConfig.updated(element, {
        value: 'bg-green-500',
        oldValue: null,
      })

      expect(element.classList.contains('bg-green-500')).toBe(true)
    })

    it('should handle update with array values', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('bg-red-500', 'p-2')

      directiveConfig.updated(element, {
        value: ['bg-blue-500', 'p-4'],
        oldValue: ['bg-red-500', 'p-2'],
      })

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
      expect(element.classList.contains('bg-red-500')).toBe(false)
      expect(element.classList.contains('p-2')).toBe(false)
    })

    it('should handle no value in mounted', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value?: string | string[] | null }) => void
      }

      const element = document.createElement('div')

      // Should not throw with no value
      directiveConfig.mounted(element, { value: null })
      expect(element.classList.length).toBe(0)
    })

    it('should handle same value in update (no change)', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('bg-red-500')

      directiveConfig.updated(element, {
        value: 'bg-red-500',
        oldValue: 'bg-red-500',
      })

      // Should still have the class
      expect(element.classList.contains('bg-red-500')).toBe(true)
    })

    it('should update classes with no new value', () => {
      const plugin = createCoralPlugin()
      const app = createMockApp()

      plugin.install(app as never)

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value?: string | string[] | null; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('old-class')

      directiveConfig.updated(element, {
        value: null,
        oldValue: 'old-class',
      })

      // Old class should be removed
      expect(element.classList.contains('old-class')).toBe(false)
    })
  })

  describe('CSS injection with actual generation', () => {
    it('should inject CSS when generate returns value', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      // Get the provided Coral instance and mock generate
      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      const originalGenerate = providedCoral.generate.bind(providedCoral)
      providedCoral.generate = (classes: string[]) => {
        if (classes.length > 0 && classes[0]) {
          return `.${classes[0]} { color: red; }`
        }
        return originalGenerate(classes)
      }

      const coralCSS = app.config.globalProperties.$coralCSS as (classes: string | string[]) => string
      const result = coralCSS('test-class')

      expect(result).toBe('test-class')

      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toContain('.test-class')
    })

    it('should not duplicate CSS injection', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = () => '.same-css { color: blue; }'

      const coralCSS = app.config.globalProperties.$coralCSS as (classes: string | string[]) => string

      coralCSS('class1')
      const firstContent = document.getElementById('coral-css-vue')?.textContent

      coralCSS('class2')
      const secondContent = document.getElementById('coral-css-vue')?.textContent

      // Content should be the same since CSS is the same
      expect(firstContent).toBe(secondContent)
    })

    it('should inject CSS via directive with CSS generation', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = (classes: string[]) => {
        if (classes.length > 0 && classes[0]) {
          return `.${classes[0]} { background: red; }`
        }
        return ''
      }

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
      }

      const element = document.createElement('div')
      directiveConfig.mounted(element, { value: 'directive-class' })

      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toContain('.directive-class')
    })

    it('should inject CSS via directive updated hook with CSS generation', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = (classes: string[]) => {
        if (classes.length > 0 && classes[0]) {
          return `.${classes[0]} { margin: 10px; }`
        }
        return ''
      }

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      directiveConfig.mounted(element, { value: 'old-directive-class' })

      directiveConfig.updated(element, {
        value: 'new-directive-class',
        oldValue: 'old-directive-class',
      })

      const style = document.getElementById('coral-css-vue')
      expect(style?.textContent).toContain('.new-directive-class')
    })

    it('should handle directive updated with array values and CSS generation', () => {
      const plugin = createCoralPlugin({ autoInject: true })
      const app = createMockApp()

      plugin.install(app as never)

      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = (classes: string[]) => {
        if (classes.length > 0) {
          return classes.map(c => `.${c} { padding: 8px; }`).join('\n')
        }
        return ''
      }

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('old1', 'old2')

      directiveConfig.updated(element, {
        value: ['new1', 'new2'],
        oldValue: ['old1', 'old2'],
      })

      expect(element.classList.contains('new1')).toBe(true)
      expect(element.classList.contains('new2')).toBe(true)
    })
  })

  describe('directive without style element', () => {
    it('should handle directive mounted without style element', () => {
      const plugin = createCoralPlugin({ autoInject: false })
      const app = createMockApp()

      plugin.install(app as never)

      // Mock generate to return CSS
      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = () => '.test { color: red; }'

      const directiveConfig = app._directives.get('coral') as {
        mounted: (el: HTMLElement, binding: { value: string | string[] }) => void
      }

      const element = document.createElement('div')
      // Should not throw even without style element
      expect(() => directiveConfig.mounted(element, { value: 'test-class' })).not.toThrow()
      expect(element.classList.contains('test-class')).toBe(true)
    })

    it('should handle directive updated without style element', () => {
      const plugin = createCoralPlugin({ autoInject: false })
      const app = createMockApp()

      plugin.install(app as never)

      // Mock generate to return CSS
      const providedCoral = app._provided.get(CoralKey) as { generate: (classes: string[]) => string }
      providedCoral.generate = () => '.test { color: red; }'

      const directiveConfig = app._directives.get('coral') as {
        updated: (el: HTMLElement, binding: { value: string | string[]; oldValue: string | string[] }) => void
      }

      const element = document.createElement('div')
      element.classList.add('old-class')

      // Should not throw even without style element
      expect(() => directiveConfig.updated(element, {
        value: 'new-class',
        oldValue: 'old-class',
      })).not.toThrow()

      expect(element.classList.contains('new-class')).toBe(true)
    })
  })
})
