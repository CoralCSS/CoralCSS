import { describe, it, expect, vi } from 'vitest'
import {
  coralRemix,
  createDarkModeUtils,
  getClientHintsHeaders,
  coralLinks,
  useDarkModeHook,
  darkModeAction,
} from '../../../src/build/remix'

describe('Build Remix', () => {
  describe('coralRemix', () => {
    it('should create a Vite plugin', () => {
      const plugin = coralRemix()

      expect(plugin.name).toBe('coral-remix')
      expect(plugin.enforce).toBe('pre')
    })

    it('should accept custom options', () => {
      const plugin = coralRemix({
        include: ['app/**/*.tsx'],
        exclude: ['node_modules/**'],
        minify: false,
        darkMode: 'media',
        output: 'custom.css',
        prefetchOptimization: false,
        extractFromMeta: false,
        extractFromLoaders: false,
      })

      expect(plugin.name).toBe('coral-remix')
    })

    it('should have configResolved hook', () => {
      const plugin = coralRemix()
      expect(typeof plugin.configResolved).toBe('function')
    })

    it('should have resolveId hook', () => {
      const plugin = coralRemix()
      expect(typeof plugin.resolveId).toBe('function')
    })

    it('should have load hook', () => {
      const plugin = coralRemix()
      expect(typeof plugin.load).toBe('function')
    })

    it('should have transform hook', () => {
      const plugin = coralRemix()
      expect(typeof plugin.transform).toBe('function')
    })

    it('should have handleHotUpdate hook', () => {
      const plugin = coralRemix()
      expect(typeof plugin.handleHotUpdate).toBe('function')
    })

    it('should resolve virtual module', () => {
      const plugin = coralRemix()
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      expect(resolveId('virtual:coral.css')).toBe('\0virtual:coral.css')
    })

    it('should load virtual module', () => {
      const plugin = coralRemix()

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const load = plugin.load as (id: string) => string | undefined
      const result = load('\0virtual:coral.css')

      expect(result).toContain('CoralCSS')
    })

    it('should transform app files', () => {
      const plugin = coralRemix()

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div className="p-4 bg-coral-500">', 'app/routes/index.tsx')

      expect(result).toBeNull()
    })

    it('should skip excluded files', () => {
      const plugin = coralRemix({
        exclude: ['**/*.test.tsx'],
      })

      const configResolved = plugin.configResolved as (config: { command: string; mode: string }) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div className="p-4">', 'app/routes/index.test.tsx')

      expect(result).toBeNull()
    })
  })

  describe('createDarkModeUtils', () => {
    it('should return dark mode utilities', () => {
      const utils = createDarkModeUtils()

      expect(typeof utils.getDarkModeCookie).toBe('function')
      expect(typeof utils.setDarkModeCookie).toBe('function')
      expect(typeof utils.getSystemDarkMode).toBe('function')
    })

    it('getDarkModeCookie should return null when no cookie', () => {
      const utils = createDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: {},
      })

      expect(utils.getDarkModeCookie(request)).toBeNull()
    })

    it('getDarkModeCookie should return true for dark mode', () => {
      const utils = createDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=dark' },
      })

      expect(utils.getDarkModeCookie(request)).toBe(true)
    })

    it('getDarkModeCookie should return false for light mode', () => {
      const utils = createDarkModeUtils()
      const request = new Request('http://localhost/', {
        headers: { Cookie: 'coral-dark-mode=light' },
      })

      expect(utils.getDarkModeCookie(request)).toBe(false)
    })

    it('setDarkModeCookie should create cookie string', () => {
      const utils = createDarkModeUtils()

      const darkCookie = utils.setDarkModeCookie(true)
      expect(darkCookie).toContain('coral-dark-mode=dark')
      expect(darkCookie).toContain('Path=/')
      expect(darkCookie).toContain('Max-Age=31536000')

      const lightCookie = utils.setDarkModeCookie(false)
      expect(lightCookie).toContain('coral-dark-mode=light')
    })

    it('getSystemDarkMode should check Sec-CH-Prefers-Color-Scheme', () => {
      const utils = createDarkModeUtils()

      const darkRequest = new Request('http://localhost/', {
        headers: { 'Sec-CH-Prefers-Color-Scheme': 'dark' },
      })
      expect(utils.getSystemDarkMode(darkRequest)).toBe(true)

      const lightRequest = new Request('http://localhost/', {
        headers: { 'Sec-CH-Prefers-Color-Scheme': 'light' },
      })
      expect(utils.getSystemDarkMode(lightRequest)).toBe(false)
    })
  })

  describe('getClientHintsHeaders', () => {
    it('should return client hints headers', () => {
      const headers = getClientHintsHeaders()

      expect(headers['Accept-CH']).toBe('Sec-CH-Prefers-Color-Scheme')
      expect(headers['Vary']).toBe('Sec-CH-Prefers-Color-Scheme')
      expect(headers['Critical-CH']).toBe('Sec-CH-Prefers-Color-Scheme')
    })
  })

  describe('coralLinks', () => {
    it('should return links array', () => {
      const links = coralLinks()

      expect(Array.isArray(links)).toBe(true)
      expect(links.length).toBe(1)
    })

    it('should include virtual:coral.css stylesheet', () => {
      const links = coralLinks()

      expect(links[0].rel).toBe('stylesheet')
      expect(links[0].href).toBe('virtual:coral.css')
    })
  })

  describe('useDarkModeHook', () => {
    it('should be a string', () => {
      expect(typeof useDarkModeHook).toBe('string')
    })

    it('should import from @remix-run/react', () => {
      expect(useDarkModeHook).toContain("import { useFetcher } from '@remix-run/react'")
    })

    it('should import from react', () => {
      expect(useDarkModeHook).toContain('useCallback')
      expect(useDarkModeHook).toContain('useEffect')
      expect(useDarkModeHook).toContain('useState')
    })

    it('should export useDarkMode function', () => {
      expect(useDarkModeHook).toContain('export function useDarkMode')
    })

    it('should use localStorage', () => {
      expect(useDarkModeHook).toContain('localStorage')
    })

    it('should toggle dark class', () => {
      expect(useDarkModeHook).toContain("classList.toggle('dark'")
    })

    it('should check system preference', () => {
      expect(useDarkModeHook).toContain('prefers-color-scheme')
    })

    it('should return toggle and setDarkMode', () => {
      expect(useDarkModeHook).toContain('toggle')
      expect(useDarkModeHook).toContain('setDarkMode')
    })
  })

  describe('darkModeAction', () => {
    it('should be a string', () => {
      expect(typeof darkModeAction).toBe('string')
    })

    it('should import from @remix-run/node', () => {
      expect(darkModeAction).toContain("import type { ActionFunctionArgs } from '@remix-run/node'")
      expect(darkModeAction).toContain("import { json } from '@remix-run/node'")
    })

    it('should export action function', () => {
      expect(darkModeAction).toContain('export async function action')
    })

    it('should read formData', () => {
      expect(darkModeAction).toContain('request.formData()')
    })

    it('should set cookie header', () => {
      expect(darkModeAction).toContain("'Set-Cookie'")
      expect(darkModeAction).toContain('coral-dark-mode')
    })

    it('should return success response', () => {
      expect(darkModeAction).toContain('success: true')
    })
  })
})
