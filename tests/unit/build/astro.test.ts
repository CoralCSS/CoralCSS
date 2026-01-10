import { describe, it, expect, vi } from 'vitest'
import {
  coralAstroIntegration,
  generateStyleTag,
  viewTransitionStyles,
} from '../../../src/build/astro'

describe('Build Astro', () => {
  describe('coralAstroIntegration', () => {
    it('should return an integration object', () => {
      const integration = coralAstroIntegration()
      expect(integration.name).toBe('@coral-css/astro')
      expect(integration.hooks).toBeDefined()
    })

    it('should accept custom options', () => {
      const integration = coralAstroIntegration({
        content: ['./src/**/*.astro'],
        darkMode: 'media',
        minify: false,
        safelist: ['p-4', 'mt-2'],
        base: false,
        applyBaseStyles: false,
      })
      expect(integration.name).toBe('@coral-css/astro')
    })

    it('should have astro:config:setup hook', () => {
      const integration = coralAstroIntegration()
      expect(integration.hooks['astro:config:setup']).toBeDefined()
    })

    it('should have astro:config:done hook', () => {
      const integration = coralAstroIntegration()
      expect(integration.hooks['astro:config:done']).toBeDefined()
    })

    it('should have astro:build:start hook', () => {
      const integration = coralAstroIntegration()
      expect(integration.hooks['astro:build:start']).toBeDefined()
    })

    it('should have astro:build:done hook', () => {
      const integration = coralAstroIntegration()
      expect(integration.hooks['astro:build:done']).toBeDefined()
    })

    it('should have astro:server:setup hook', () => {
      const integration = coralAstroIntegration()
      expect(integration.hooks['astro:server:setup']).toBeDefined()
    })

    it('should call updateConfig in config:setup', () => {
      const integration = coralAstroIntegration()
      const mockUpdateConfig = vi.fn()
      const mockInjectScript = vi.fn()

      integration.hooks['astro:config:setup']!({
        command: 'dev',
        isRestart: false,
        updateConfig: mockUpdateConfig,
        injectScript: mockInjectScript,
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      expect(mockUpdateConfig).toHaveBeenCalled()
    })

    it('should inject base styles when enabled', () => {
      const integration = coralAstroIntegration({
        base: true,
        applyBaseStyles: true,
      })
      const mockInjectScript = vi.fn()

      integration.hooks['astro:config:setup']!({
        command: 'dev',
        isRestart: false,
        updateConfig: vi.fn(),
        injectScript: mockInjectScript,
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      expect(mockInjectScript).toHaveBeenCalledWith('head-inline', expect.any(String))
    })

    it('should inject runtime script', () => {
      const integration = coralAstroIntegration()
      const mockInjectScript = vi.fn()

      integration.hooks['astro:config:setup']!({
        command: 'dev',
        isRestart: false,
        updateConfig: vi.fn(),
        injectScript: mockInjectScript,
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      expect(mockInjectScript).toHaveBeenCalledWith('page', expect.any(String))
    })

    it('should set production mode for build command', () => {
      const integration = coralAstroIntegration()

      integration.hooks['astro:config:setup']!({
        command: 'build',
        isRestart: false,
        updateConfig: vi.fn(),
        injectScript: vi.fn(),
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      expect(integration.name).toBe('@coral-css/astro')
    })

    it('should add middleware in server:setup', () => {
      const integration = coralAstroIntegration()
      const mockUse = vi.fn()

      // First setup
      integration.hooks['astro:config:setup']!({
        command: 'dev',
        isRestart: false,
        updateConfig: vi.fn(),
        injectScript: vi.fn(),
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      integration.hooks['astro:server:setup']!({
        server: {
          middlewares: { use: mockUse },
        },
      })

      expect(mockUse).toHaveBeenCalled()
    })

    it('should reset classes in build:start', () => {
      const integration = coralAstroIntegration({
        safelist: ['p-4'],
      })

      // First setup
      integration.hooks['astro:config:setup']!({
        command: 'build',
        isRestart: false,
        updateConfig: vi.fn(),
        injectScript: vi.fn(),
        config: {
          root: new URL('file:///'),
          srcDir: new URL('file:///src/'),
          publicDir: new URL('file:///public/'),
          outDir: new URL('file:///dist/'),
          build: { assets: 'assets', format: 'file' },
          vite: {},
        },
        addRenderer: vi.fn(),
        addWatchFile: vi.fn(),
        injectRoute: vi.fn(),
      })

      integration.hooks['astro:build:start']!()

      expect(integration.name).toBe('@coral-css/astro')
    })
  })

  describe('generateStyleTag', () => {
    it('should generate a style tag', () => {
      const result = generateStyleTag(['p-4', 'mt-2'])
      expect(result).toContain('<style')
      expect(result).toContain('data-coral')
      expect(result).toContain('</style>')
    })

    it('should accept dark mode option', () => {
      const result = generateStyleTag(['p-4'], { darkMode: 'media' })
      expect(result).toContain('<style')
    })

    it('should generate CSS for classes', () => {
      const result = generateStyleTag(['bg-coral-500'])
      expect(result).toContain('<style')
    })
  })

  describe('viewTransitionStyles', () => {
    it('should be a string', () => {
      expect(typeof viewTransitionStyles).toBe('string')
    })

    it('should contain view transition styles', () => {
      expect(viewTransitionStyles).toContain('::view-transition-old')
      expect(viewTransitionStyles).toContain('::view-transition-new')
    })

    it('should contain fade animations', () => {
      expect(viewTransitionStyles).toContain('coral-fade-out')
      expect(viewTransitionStyles).toContain('coral-fade-in')
    })

    it('should contain slide animations', () => {
      expect(viewTransitionStyles).toContain('coral-slide-out')
      expect(viewTransitionStyles).toContain('coral-slide-in')
    })

    it('should contain keyframe definitions', () => {
      expect(viewTransitionStyles).toContain('@keyframes')
    })

    it('should contain slide variant selector', () => {
      expect(viewTransitionStyles).toContain('[data-coral-transition="slide"]')
    })
  })
})
