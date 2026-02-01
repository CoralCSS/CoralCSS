/**
 * Build Integration Tests
 */
import { describe, it, expect, vi } from 'vitest'

describe('Build Integration', () => {
  describe('Vite Plugin', () => {
    it('should export coralVitePlugin', async () => {
      const { coralVitePlugin } = await import('../../src/build/vite')
      expect(coralVitePlugin).toBeDefined()
      expect(typeof coralVitePlugin).toBe('function')
    })

    it('should return a valid Vite plugin', async () => {
      const { coralVitePlugin } = await import('../../src/build/vite')
      const plugin = coralVitePlugin()

      expect(plugin).toHaveProperty('name')
      expect(plugin.name).toBe('coral-vite')
    })

    it('should accept options', async () => {
      const { coralVitePlugin } = await import('../../src/build/vite')
      const plugin = coralVitePlugin({
        darkMode: 'class',
        prefix: 'tw-',
      })

      expect(plugin.name).toBe('coral-vite')
    })
  })

  describe('PostCSS Plugin', () => {
    it('should export coralPostCSSPlugin', async () => {
      const { coralPostCSSPlugin } = await import('../../src/build/postcss')
      expect(coralPostCSSPlugin).toBeDefined()
      expect(typeof coralPostCSSPlugin).toBe('function')
    })

    it('should return a valid PostCSS plugin', async () => {
      const { coralPostCSSPlugin } = await import('../../src/build/postcss')
      const plugin = coralPostCSSPlugin()

      expect(plugin).toHaveProperty('postcssPlugin')
      expect(plugin.postcssPlugin).toBe('coral-postcss')
    })

    it('should accept content option', async () => {
      const { coralPostCSSPlugin } = await import('../../src/build/postcss')
      const plugin = coralPostCSSPlugin({
        content: ['./src/**/*.html'],
      })

      expect(plugin.postcssPlugin).toBe('coral-postcss')
    })
  })

  describe('CLI', () => {
    it('should export CLI functions', async () => {
      const { cli, run, parseArgs } = await import('../../src/build/cli')
      expect(cli).toBeDefined()
      expect(run).toBeDefined()
      expect(parseArgs).toBeDefined()
    })

    it('should parse arguments correctly', async () => {
      const { parseArgs } = await import('../../src/build/cli')
      const args = parseArgs(['src/**/*.html', '-o', 'dist/styles.css', '--minify'])

      expect(args.input).toContain('src/**/*.html')
      expect(args.output).toBe('dist/styles.css')
      expect(args.minify).toBe(true)
    })

    it('should have default values', async () => {
      const { parseArgs } = await import('../../src/build/cli')
      const args = parseArgs(['src/**/*.html'])

      expect(args.output).toBe('coral.css')
      expect(args.minify).toBe(false)
    })
  })

  describe('Runtime', () => {
    it('should export runtime modules', { timeout: 30000 }, async () => {
      const runtime = await import('../../src/runtime')
      expect(runtime.DOMObserver).toBeDefined()
      expect(runtime.StyleInjector).toBeDefined()
    })

    it('should export CDN bundle', async () => {
      const { createCoralCDN, getCoralCDN } = await import('../../src/runtime/cdn')
      expect(createCoralCDN).toBeDefined()
      expect(getCoralCDN).toBeDefined()
    })
  })
})
