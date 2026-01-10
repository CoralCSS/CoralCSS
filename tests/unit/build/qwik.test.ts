import { describe, it, expect, vi } from 'vitest'
import {
  coralQwik,
  createQwikDarkModeUtils,
  getInitialDarkModeClass,
  darkModeContext,
  darkModeProvider,
  useDarkModeHook,
  darkModeAction,
  qwikClassUtils,
} from '../../../src/build/qwik'

describe('Build Qwik', () => {
  describe('coralQwik', () => {
    it('should create a Vite plugin', () => {
      const plugin = coralQwik()

      expect(plugin.name).toBe('coral-qwik')
      expect(plugin.enforce).toBe('pre')
    })

    it('should accept custom options', () => {
      const plugin = coralQwik({
        include: ['src/**/*.tsx'],
        exclude: ['node_modules/**'],
        minify: false,
        darkMode: 'media',
        output: 'custom.css',
        extractFromSignals: false,
        extractFromComponents: false,
      })

      expect(plugin.name).toBe('coral-qwik')
    })

    it('should have configResolved hook', () => {
      const plugin = coralQwik()
      expect(typeof plugin.configResolved).toBe('function')
    })

    it('should have resolveId hook', () => {
      const plugin = coralQwik()
      expect(typeof plugin.resolveId).toBe('function')
    })

    it('should have load hook', () => {
      const plugin = coralQwik()
      expect(typeof plugin.load).toBe('function')
    })

    it('should have transform hook', () => {
      const plugin = coralQwik()
      expect(typeof plugin.transform).toBe('function')
    })

    it('should have handleHotUpdate hook', () => {
      const plugin = coralQwik()
      expect(typeof plugin.handleHotUpdate).toBe('function')
    })

    it('should resolve virtual module', () => {
      const plugin = coralQwik()
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      expect(resolveId('virtual:coral.css')).toBe('\0virtual:coral.css')
    })

    it('should load virtual module', () => {
      const plugin = coralQwik()

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const load = plugin.load as (id: string) => string | undefined
      const result = load('\0virtual:coral.css')

      expect(result).toContain('CoralCSS')
    })

    it('should transform src files', () => {
      const plugin = coralQwik()

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4 bg-coral-500">', 'src/routes/index.tsx')

      expect(result).toBeNull()
    })

    it('should skip excluded files', () => {
      const plugin = coralQwik({
        exclude: ['**/*.test.tsx'],
      })

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4">', 'src/routes/index.test.tsx')

      expect(result).toBeNull()
    })
  })

  describe('createQwikDarkModeUtils', () => {
    it('should return dark mode utilities', () => {
      const utils = createQwikDarkModeUtils()

      expect(typeof utils.getDarkModeFromRequest).toBe('function')
      expect(typeof utils.setDarkModeCookie).toBe('function')
    })

    it('getDarkModeFromRequest should return null when no cookie', () => {
      const utils = createQwikDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: {},
      })

      expect(utils.getDarkModeFromRequest(request)).toBeNull()
    })

    it('getDarkModeFromRequest should return true for dark mode', () => {
      const utils = createQwikDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=dark' },
      })

      expect(utils.getDarkModeFromRequest(request)).toBe(true)
    })

    it('getDarkModeFromRequest should return false for light mode', () => {
      const utils = createQwikDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=light' },
      })

      expect(utils.getDarkModeFromRequest(request)).toBe(false)
    })

    it('setDarkModeCookie should create Headers with cookie', () => {
      const utils = createQwikDarkModeUtils()

      const darkHeaders = utils.setDarkModeCookie(true)
      expect(darkHeaders.get('Set-Cookie')).toContain('coral-dark-mode=dark')
      expect(darkHeaders.get('Set-Cookie')).toContain('Path=/')
      expect(darkHeaders.get('Set-Cookie')).toContain('Max-Age=31536000')

      const lightHeaders = utils.setDarkModeCookie(false)
      expect(lightHeaders.get('Set-Cookie')).toContain('coral-dark-mode=light')
    })
  })

  describe('getInitialDarkModeClass', () => {
    it('should return empty string when no request', () => {
      expect(getInitialDarkModeClass()).toBe('')
      expect(getInitialDarkModeClass(undefined)).toBe('')
    })

    it('should return dark when cookie is dark', () => {
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=dark' },
      })

      expect(getInitialDarkModeClass(request)).toBe('dark')
    })

    it('should return empty when cookie is light', () => {
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=light' },
      })

      expect(getInitialDarkModeClass(request)).toBe('')
    })

    it('should check client hints when no cookie', () => {
      const request = new Request('http://localhost/', {
        headers: { 'Sec-CH-Prefers-Color-Scheme': 'dark' },
      })

      expect(getInitialDarkModeClass(request)).toBe('dark')
    })

    it('should return empty for light client hint', () => {
      const request = new Request('http://localhost/', {
        headers: { 'Sec-CH-Prefers-Color-Scheme': 'light' },
      })

      expect(getInitialDarkModeClass(request)).toBe('')
    })
  })

  describe('darkModeContext', () => {
    it('should be a string', () => {
      expect(typeof darkModeContext).toBe('string')
    })

    it('should import createContextId from @builder.io/qwik', () => {
      expect(darkModeContext).toContain("import { createContextId } from '@builder.io/qwik'")
    })

    it('should define DarkModeContext interface', () => {
      expect(darkModeContext).toContain('interface DarkModeContext')
      expect(darkModeContext).toContain('darkMode: boolean')
      expect(darkModeContext).toContain('toggle: () => void')
      expect(darkModeContext).toContain('set: (value: boolean) => void')
    })

    it('should create context with id', () => {
      expect(darkModeContext).toContain("createContextId<DarkModeContext>('coral-dark-mode')")
    })
  })

  describe('darkModeProvider', () => {
    it('should be a string', () => {
      expect(typeof darkModeProvider).toBe('string')
    })

    it('should import from @builder.io/qwik', () => {
      expect(darkModeProvider).toContain('component$')
      expect(darkModeProvider).toContain('Slot')
      expect(darkModeProvider).toContain('useContextProvider')
      expect(darkModeProvider).toContain('useSignal')
      expect(darkModeProvider).toContain('useVisibleTask$')
    })

    it('should export DarkModeProvider component', () => {
      expect(darkModeProvider).toContain('export const DarkModeProvider = component$')
    })

    it('should check localStorage', () => {
      expect(darkModeProvider).toContain('localStorage')
    })

    it('should check system preference', () => {
      expect(darkModeProvider).toContain('prefers-color-scheme')
    })

    it('should toggle dark class', () => {
      expect(darkModeProvider).toContain("classList.toggle('dark'")
    })

    it('should render Slot', () => {
      expect(darkModeProvider).toContain('<Slot />')
    })
  })

  describe('useDarkModeHook', () => {
    it('should be a string', () => {
      expect(typeof useDarkModeHook).toBe('string')
    })

    it('should import useContext from @builder.io/qwik', () => {
      expect(useDarkModeHook).toContain("import { useContext } from '@builder.io/qwik'")
    })

    it('should export useDarkMode function', () => {
      expect(useDarkModeHook).toContain('export function useDarkMode()')
    })

    it('should return context', () => {
      expect(useDarkModeHook).toContain('useContext(DarkModeContext)')
    })
  })

  describe('darkModeAction', () => {
    it('should be a string', () => {
      expect(typeof darkModeAction).toBe('string')
    })

    it('should import from @builder.io/qwik-city', () => {
      expect(darkModeAction).toContain("import { routeAction$, zod$, z } from '@builder.io/qwik-city'")
    })

    it('should export useDarkModeAction', () => {
      expect(darkModeAction).toContain('export const useDarkModeAction = routeAction$')
    })

    it('should use zod for validation', () => {
      expect(darkModeAction).toContain('zod$')
      expect(darkModeAction).toContain("z.enum(['dark', 'light'])")
    })

    it('should set cookie', () => {
      expect(darkModeAction).toContain('cookie.set')
      expect(darkModeAction).toContain("'coral-dark-mode'")
    })

    it('should return success response', () => {
      expect(darkModeAction).toContain('success: true')
    })
  })

  describe('qwikClassUtils', () => {
    it('should be a string', () => {
      expect(typeof qwikClassUtils).toBe('string')
    })

    it('should import from @builder.io/qwik', () => {
      expect(qwikClassUtils).toContain("import { useSignal, useComputed$ } from '@builder.io/qwik'")
    })

    it('should export useClass function', () => {
      expect(qwikClassUtils).toContain('export function useClass')
    })

    it('should have add method', () => {
      expect(qwikClassUtils).toContain('add:')
    })

    it('should have remove method', () => {
      expect(qwikClassUtils).toContain('remove:')
    })

    it('should have toggle method', () => {
      expect(qwikClassUtils).toContain('toggle:')
    })

    it('should have has method', () => {
      expect(qwikClassUtils).toContain('has:')
    })

    it('should export useConditionalClass function', () => {
      expect(qwikClassUtils).toContain('export function useConditionalClass')
    })

    it('should use useComputed$', () => {
      expect(qwikClassUtils).toContain('useComputed$')
    })
  })
})
