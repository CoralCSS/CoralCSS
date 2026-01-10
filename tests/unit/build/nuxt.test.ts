import { describe, it, expect, vi } from 'vitest'
import {
  coralNuxtModule,
  defineCoralModule,
  createNuxtPlugin,
  useCoralComposables,
  nuxtPluginContent,
  nuxtAppConfigTypes,
} from '../../../src/build/nuxt'

describe('Build Nuxt', () => {
  describe('coralNuxtModule', () => {
    it('should be defined', () => {
      expect(coralNuxtModule).toBeDefined()
    })

    it('should have meta information', () => {
      expect(coralNuxtModule.meta).toBeDefined()
      expect(coralNuxtModule.meta?.name).toBe('@coral-css/nuxt')
      expect(coralNuxtModule.meta?.version).toBe('1.0.0')
      expect(coralNuxtModule.meta?.configKey).toBe('coral')
    })

    it('should have defaults', () => {
      expect(coralNuxtModule.defaults).toBeDefined()
      expect(coralNuxtModule.defaults?.darkMode).toBe('class')
      expect(coralNuxtModule.defaults?.minify).toBe(true)
      expect(coralNuxtModule.defaults?.injectCSS).toBe(true)
    })

    it('should have setup function', () => {
      expect(typeof coralNuxtModule.setup).toBe('function')
    })
  })

  describe('defineCoralModule', () => {
    it('should return a module definition', () => {
      const module = defineCoralModule()

      expect(module.meta).toBeDefined()
      expect(module.defaults).toBeDefined()
      expect(typeof module.setup).toBe('function')
    })

    it('should have correct default include patterns', () => {
      const module = defineCoralModule()

      expect(module.defaults?.include).toContain('components/**/*.{vue,js,ts}')
      expect(module.defaults?.include).toContain('pages/**/*.vue')
      expect(module.defaults?.include).toContain('layouts/**/*.vue')
      expect(module.defaults?.include).toContain('app.vue')
    })

    it('should have correct default exclude patterns', () => {
      const module = defineCoralModule()

      expect(module.defaults?.exclude).toContain('node_modules/**')
    })

    it('should register vite plugin in setup', () => {
      const module = defineCoralModule()
      const mockHook = vi.fn()

      const mockNuxt = {
        options: {
          rootDir: '/project',
          srcDir: '/project/src',
          buildDir: '/project/.nuxt',
          dev: true,
          css: [],
        },
        hook: mockHook,
        hooks: { hook: mockHook },
      }

      module.setup({}, mockNuxt)

      expect(mockHook).toHaveBeenCalledWith('vite:extendConfig', expect.any(Function))
    })

    it('should inject CSS when injectCSS is true', () => {
      const module = defineCoralModule()
      const mockHook = vi.fn()

      const mockNuxt = {
        options: {
          rootDir: '/project',
          srcDir: '/project/src',
          buildDir: '/project/.nuxt',
          dev: true,
          css: [],
        },
        hook: mockHook,
        hooks: { hook: mockHook },
      }

      module.setup({ injectCSS: true }, mockNuxt)

      expect(mockNuxt.options.css).toContain('virtual:coral.css')
    })

    it('should register build:before hook', () => {
      const module = defineCoralModule()
      const mockHook = vi.fn()

      const mockNuxt = {
        options: {
          rootDir: '/project',
          srcDir: '/project/src',
          buildDir: '/project/.nuxt',
          dev: false,
          css: [],
        },
        hook: mockHook,
        hooks: { hook: mockHook },
      }

      module.setup({}, mockNuxt)

      expect(mockHook).toHaveBeenCalledWith('build:before', expect.any(Function))
    })

    it('should register nitro:config hook', () => {
      const module = defineCoralModule()
      const mockHook = vi.fn()

      const mockNuxt = {
        options: {
          rootDir: '/project',
          srcDir: '/project/src',
          buildDir: '/project/.nuxt',
          dev: true,
          css: [],
        },
        hook: mockHook,
        hooks: { hook: mockHook },
      }

      module.setup({}, mockNuxt)

      expect(mockHook).toHaveBeenCalledWith('nitro:config', expect.any(Function))
    })
  })

  describe('createNuxtPlugin', () => {
    it('should return plugin definition', () => {
      const plugin = createNuxtPlugin()

      expect(plugin.src).toBe('coral-plugin.client.ts')
      expect(plugin.mode).toBe('client')
    })
  })

  describe('useCoralComposables', () => {
    it('should have useCoralClasses', () => {
      expect(useCoralComposables.useCoralClasses).toBeDefined()
      expect(typeof useCoralComposables.useCoralClasses).toBe('string')
    })

    it('should have useDarkMode', () => {
      expect(useCoralComposables.useDarkMode).toBeDefined()
      expect(typeof useCoralComposables.useDarkMode).toBe('string')
    })

    it('should have useTheme', () => {
      expect(useCoralComposables.useTheme).toBeDefined()
      expect(typeof useCoralComposables.useTheme).toBe('string')
    })

    it('useCoralClasses should contain class logic', () => {
      expect(useCoralComposables.useCoralClasses).toContain('useCoralClasses')
      expect(useCoralComposables.useCoralClasses).toContain('filter')
      expect(useCoralComposables.useCoralClasses).toContain('join')
    })

    it('useDarkMode should contain toggle logic', () => {
      expect(useCoralComposables.useDarkMode).toContain('toggle')
      expect(useCoralComposables.useDarkMode).toContain('dark')
    })

    it('useTheme should contain setTheme logic', () => {
      expect(useCoralComposables.useTheme).toContain('setTheme')
      expect(useCoralComposables.useTheme).toContain('data-theme')
    })
  })

  describe('nuxtPluginContent', () => {
    it('should be a string', () => {
      expect(typeof nuxtPluginContent).toBe('string')
    })

    it('should contain plugin definition', () => {
      expect(nuxtPluginContent).toContain('defineNuxtPlugin')
    })

    it('should check for dark mode preference', () => {
      expect(nuxtPluginContent).toContain('localStorage')
      expect(nuxtPluginContent).toContain('prefers-color-scheme')
    })

    it('should add dark class', () => {
      expect(nuxtPluginContent).toContain("classList.add('dark')")
    })
  })

  describe('nuxtAppConfigTypes', () => {
    it('should be a string', () => {
      expect(typeof nuxtAppConfigTypes).toBe('string')
    })

    it('should declare nuxt/schema module', () => {
      expect(nuxtAppConfigTypes).toContain("declare module 'nuxt/schema'")
    })

    it('should declare @nuxt/schema module', () => {
      expect(nuxtAppConfigTypes).toContain("declare module '@nuxt/schema'")
    })

    it('should include AppConfigInput interface', () => {
      expect(nuxtAppConfigTypes).toContain('AppConfigInput')
    })

    it('should include NuxtConfig interface', () => {
      expect(nuxtAppConfigTypes).toContain('NuxtConfig')
    })

    it('should include coral config type', () => {
      expect(nuxtAppConfigTypes).toContain('coral?')
      expect(nuxtAppConfigTypes).toContain('darkMode')
    })
  })
})
