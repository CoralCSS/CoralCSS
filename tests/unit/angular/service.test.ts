/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { CoralService, createCoralService, CORAL_CONFIG } from '../../../src/angular/service'

describe('Angular Service', () => {
  beforeEach(() => {
    // Clean up any existing style elements
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  afterEach(() => {
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  describe('CoralService', () => {
    it('should create a service instance', () => {
      const service = new CoralService()
      expect(service).toBeDefined()
    })

    it('should have getInstance method', () => {
      const service = new CoralService()
      const instance = service.getInstance()
      expect(instance).toBeDefined()
    })

    it('should create style element when autoInject is true', () => {
      new CoralService({ autoInject: true })
      const style = document.getElementById('coral-css-angular')
      expect(style).not.toBeNull()
      expect(style?.getAttribute('data-coral')).toBe('angular')
    })

    it('should not create style element when autoInject is false', () => {
      new CoralService({ autoInject: false })
      const style = document.getElementById('coral-css-angular')
      expect(style).toBeNull()
    })

    it('should generate CSS for string input', () => {
      const service = new CoralService({ autoInject: false })
      const css = service.generate('bg-red-500 p-4')
      expect(typeof css).toBe('string')
    })

    it('should generate CSS for array input', () => {
      const service = new CoralService({ autoInject: false })
      const css = service.generate(['bg-red-500', 'p-4'])
      expect(typeof css).toBe('string')
    })

    it('should process and return class names', () => {
      const service = new CoralService({ autoInject: false })
      const result = service.process('bg-red-500 p-4')
      expect(result).toBe('bg-red-500 p-4')
    })

    it('should process array of classes', () => {
      const service = new CoralService({ autoInject: false })
      const result = service.process(['bg-red-500', 'p-4'])
      expect(result).toBe('bg-red-500 p-4')
    })

    it('should destroy and remove style element', () => {
      const service = new CoralService({ autoInject: true })
      expect(document.getElementById('coral-css-angular')).not.toBeNull()

      service.destroy()
      expect(document.getElementById('coral-css-angular')).toBeNull()
    })

    describe('cn', () => {
      it('should combine class names', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.cn('foo', 'bar')
        expect(result).toBe('foo bar')
      })

      it('should handle falsy values', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.cn('foo', null, 'bar', false, undefined)
        expect(result).toBe('foo bar')
      })

      it('should handle object syntax', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.cn({ foo: true, bar: false, baz: true })
        expect(result).toBe('foo baz')
      })

      it('should handle conditional classes', () => {
        const service = new CoralService({ autoInject: false })
        const isActive = true
        const result = service.cn('btn', isActive && 'active')
        expect(result).toBe('btn active')
      })
    })

    describe('createVariants', () => {
      it('should create a variant generator', () => {
        const service = new CoralService({ autoInject: false })
        const button = service.createVariants({
          base: 'px-4 py-2',
          variants: {
            intent: {
              primary: 'bg-blue-500',
              secondary: 'bg-gray-500',
            },
          },
        })

        expect(typeof button).toBe('function')
      })

      it('should return base classes', () => {
        const service = new CoralService({ autoInject: false })
        const button = service.createVariants({
          base: 'px-4 py-2',
        })

        expect(button()).toBe('px-4 py-2')
      })

      it('should apply variants', () => {
        const service = new CoralService({ autoInject: false })
        const button = service.createVariants({
          base: 'btn',
          variants: {
            intent: {
              primary: 'bg-blue-500',
              secondary: 'bg-gray-500',
            },
          },
        })

        expect(button({ intent: 'primary' })).toBe('btn bg-blue-500')
      })

      it('should apply default variants', () => {
        const service = new CoralService({ autoInject: false })
        const button = service.createVariants({
          base: 'btn',
          variants: {
            intent: {
              primary: 'bg-blue-500',
            },
          },
          defaultVariants: {
            intent: 'primary',
          },
        })

        expect(button()).toBe('btn bg-blue-500')
      })

      it('should handle multiple variants', () => {
        const service = new CoralService({ autoInject: false })
        const button = service.createVariants({
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

        expect(button({ color: 'red', size: 'lg' })).toBe('btn bg-red-500 text-lg')
      })
    })

    describe('responsive', () => {
      it('should return base classes', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({ base: 'p-2' })
        expect(result).toBe('p-2')
      })

      it('should prefix sm classes', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({ sm: 'p-4' })
        expect(result).toBe('sm:p-4')
      })

      it('should prefix md classes', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({ md: 'p-6' })
        expect(result).toBe('md:p-6')
      })

      it('should combine all breakpoints', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({
          base: 'p-2',
          sm: 'p-4',
          md: 'p-6',
          lg: 'p-8',
        })
        expect(result).toBe('p-2 sm:p-4 md:p-6 lg:p-8')
      })

      it('should handle multiple classes per breakpoint', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({
          base: 'p-2 m-2',
          sm: 'p-4 m-4',
        })
        expect(result).toBe('p-2 m-2 sm:p-4 sm:m-4')
      })

      it('should handle xl and 2xl', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.responsive({
          xl: 'p-10',
          '2xl': 'p-12',
        })
        expect(result).toBe('xl:p-10 2xl:p-12')
      })
    })

    describe('darkMode', () => {
      it('should generate dark mode classes', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.darkMode({
          light: 'bg-white text-gray-900',
          dark: 'bg-gray-900 text-white',
        })
        expect(result).toBe('bg-white text-gray-900 dark:bg-gray-900 dark:text-white')
      })

      it('should handle single class', () => {
        const service = new CoralService({ autoInject: false })
        const result = service.darkMode({
          light: 'bg-white',
          dark: 'bg-gray-900',
        })
        expect(result).toBe('bg-white dark:bg-gray-900')
      })
    })
  })

  describe('createCoralService', () => {
    it('should create a CoralService instance', () => {
      const service = createCoralService()
      expect(service).toBeInstanceOf(CoralService)
    })

    it('should accept config options', () => {
      const service = createCoralService({ darkMode: 'class' })
      expect(service.getInstance().config.darkMode).toBe('class')
    })
  })

  describe('CORAL_CONFIG', () => {
    it('should be a string token', () => {
      expect(CORAL_CONFIG).toBe('CORAL_CONFIG')
    })
  })
})
