import { describe, it, expect, vi } from 'vitest'
import {
  coralSvelteKit,
  coralPreprocessor,
  createCoralHandle,
  darkModeStore,
  classAction,
  svelteKitTypes,
} from '../../../src/build/sveltekit'

describe('Build SvelteKit', () => {
  describe('coralSvelteKit', () => {
    it('should create a Vite plugin', () => {
      const plugin = coralSvelteKit()

      expect(plugin.name).toBe('coral-sveltekit')
      expect(plugin.enforce).toBe('pre')
    })

    it('should accept custom options', () => {
      const plugin = coralSvelteKit({
        include: ['src/**/*.svelte'],
        exclude: ['node_modules/**'],
        minify: false,
        darkMode: 'media',
        output: 'custom.css',
        preprocessor: false,
      })

      expect(plugin.name).toBe('coral-sveltekit')
    })

    it('should have configResolved hook', () => {
      const plugin = coralSvelteKit()
      expect(typeof plugin.configResolved).toBe('function')
    })

    it('should have resolveId hook', () => {
      const plugin = coralSvelteKit()
      expect(typeof plugin.resolveId).toBe('function')
    })

    it('should have load hook', () => {
      const plugin = coralSvelteKit()
      expect(typeof plugin.load).toBe('function')
    })

    it('should have transform hook', () => {
      const plugin = coralSvelteKit()
      expect(typeof plugin.transform).toBe('function')
    })

    it('should have handleHotUpdate hook', () => {
      const plugin = coralSvelteKit()
      expect(typeof plugin.handleHotUpdate).toBe('function')
    })

    it('should resolve virtual module', () => {
      const plugin = coralSvelteKit()
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      expect(resolveId('virtual:coral.css')).toBe('\0virtual:coral.css')
    })

    it('should load virtual module', () => {
      const plugin = coralSvelteKit()

      // First configure
      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const load = plugin.load as (id: string) => string | undefined
      const result = load('\0virtual:coral.css')

      expect(result).toContain('CoralCSS')
    })

    it('should transform Svelte files', () => {
      const plugin = coralSvelteKit()

      // First configure
      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4 bg-coral-500">', 'App.svelte')

      expect(result).toBeNull()
    })

    it('should skip excluded files', () => {
      const plugin = coralSvelteKit({
        exclude: ['**/*.test.svelte'],
      })

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4">', 'App.test.svelte')

      expect(result).toBeNull()
    })
  })

  describe('coralPreprocessor', () => {
    it('should create a preprocessor', () => {
      const preprocessor = coralPreprocessor()

      expect(preprocessor.name).toBe('coral-preprocessor')
      expect(typeof preprocessor.style).toBe('function')
    })

    it('should accept options', () => {
      const preprocessor = coralPreprocessor({
        darkMode: 'media',
      })

      expect(preprocessor.name).toBe('coral-preprocessor')
    })

    it('should skip non-css languages', () => {
      const preprocessor = coralPreprocessor()

      const result = preprocessor.style({
        content: '@apply p-4;',
        filename: 'App.svelte',
        attributes: { lang: 'scss' },
      })

      expect(result).toBeUndefined()
    })

    it('should skip content without @apply', () => {
      const preprocessor = coralPreprocessor()

      const result = preprocessor.style({
        content: '.test { color: red; }',
        filename: 'App.svelte',
        attributes: {},
      })

      expect(result).toBeUndefined()
    })

    it('should process @apply directives', () => {
      const preprocessor = coralPreprocessor()

      const result = preprocessor.style({
        content: '.test { @apply p-4; }',
        filename: 'App.svelte',
        attributes: {},
      })

      expect(result).toBeDefined()
      expect(result?.code).toBeDefined()
    })

    it('should process postcss lang', () => {
      const preprocessor = coralPreprocessor()

      const result = preprocessor.style({
        content: '.test { @apply p-4; }',
        filename: 'App.svelte',
        attributes: { lang: 'postcss' },
      })

      expect(result).toBeDefined()
    })

    it('should process css lang', () => {
      const preprocessor = coralPreprocessor()

      const result = preprocessor.style({
        content: '.test { @apply p-4; }',
        filename: 'App.svelte',
        attributes: { lang: 'css' },
      })

      expect(result).toBeDefined()
    })
  })

  describe('createCoralHandle', () => {
    it('should create a handle function', () => {
      const handle = createCoralHandle()
      expect(typeof handle).toBe('function')
    })

    it('should accept options', () => {
      const handle = createCoralHandle({
        darkMode: 'media',
      })
      expect(typeof handle).toBe('function')
    })

    it('should process request', async () => {
      const handle = createCoralHandle()

      const mockEvent = {
        request: {
          headers: new Headers(),
          url: 'http://localhost/',
        },
        url: new URL('http://localhost/'),
        locals: {} as Record<string, unknown>,
      }

      const mockResolve = vi.fn().mockResolvedValue(new Response('OK'))

      await handle({ event: mockEvent, resolve: mockResolve })

      expect(mockResolve).toHaveBeenCalled()
    })

    it('should detect dark mode from cookie', async () => {
      const handle = createCoralHandle({ darkMode: 'class' })

      const mockEvent = {
        request: {
          headers: new Headers({ cookie: 'coral-dark-mode=dark' }),
          url: 'http://localhost/',
        },
        url: new URL('http://localhost/'),
        locals: {} as Record<string, unknown>,
      }

      const mockResolve = vi.fn().mockResolvedValue(new Response('OK'))

      await handle({ event: mockEvent, resolve: mockResolve })

      expect(mockEvent.locals.darkMode).toBe(true)
    })

    it('should transform HTML for dark mode', async () => {
      const handle = createCoralHandle({ darkMode: 'class' })

      const mockEvent = {
        request: {
          headers: new Headers({ cookie: 'coral-dark-mode=dark' }),
          url: 'http://localhost/',
        },
        url: new URL('http://localhost/'),
        locals: {} as Record<string, unknown>,
      }

      const mockResolve = vi.fn().mockImplementation((_event, opts) => {
        if (opts?.transformPageChunk) {
          const transformed = opts.transformPageChunk({ html: '<html>' })
          expect(transformed).toContain('class="dark"')
        }
        return Promise.resolve(new Response('OK'))
      })

      await handle({ event: mockEvent, resolve: mockResolve })
    })
  })

  describe('darkModeStore', () => {
    it('should be a string', () => {
      expect(typeof darkModeStore).toBe('string')
    })

    it('should import from svelte/store', () => {
      expect(darkModeStore).toContain("import { writable, derived } from 'svelte/store'")
    })

    it('should import browser from $app/environment', () => {
      expect(darkModeStore).toContain("import { browser } from '$app/environment'")
    })

    it('should create dark mode store', () => {
      expect(darkModeStore).toContain('createDarkModeStore')
    })

    it('should have toggle function', () => {
      expect(darkModeStore).toContain('toggle')
    })

    it('should persist to localStorage', () => {
      expect(darkModeStore).toContain('localStorage')
    })

    it('should toggle dark class', () => {
      expect(darkModeStore).toContain("classList.toggle('dark'")
    })

    it('should check system preference', () => {
      expect(darkModeStore).toContain('prefers-color-scheme')
    })
  })

  describe('classAction', () => {
    it('should be a string', () => {
      expect(typeof classAction).toBe('string')
    })

    it('should export coral function', () => {
      expect(classAction).toContain('export function coral')
    })

    it('should accept string or array', () => {
      expect(classAction).toContain('string | string[]')
    })

    it('should have update method', () => {
      expect(classAction).toContain('update(')
    })

    it('should have destroy method', () => {
      expect(classAction).toContain('destroy()')
    })

    it('should add classes', () => {
      expect(classAction).toContain('classList.add')
    })

    it('should remove classes', () => {
      expect(classAction).toContain('classList.remove')
    })
  })

  describe('svelteKitTypes', () => {
    it('should be a string', () => {
      expect(typeof svelteKitTypes).toBe('string')
    })

    it('should declare global namespace', () => {
      expect(svelteKitTypes).toContain('declare global')
    })

    it('should declare App namespace', () => {
      expect(svelteKitTypes).toContain('namespace App')
    })

    it('should include Locals interface', () => {
      expect(svelteKitTypes).toContain('interface Locals')
    })

    it('should include darkMode property', () => {
      expect(svelteKitTypes).toContain('darkMode?')
    })
  })
})
