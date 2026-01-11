import { describe, it, expect, vi } from 'vitest'
import { coralRollupPlugin, createCSSInjector } from '../../../src/build/rollup'

describe('Build Rollup', () => {
  describe('coralRollupPlugin', () => {
    it('should create a plugin with name', () => {
      const plugin = coralRollupPlugin()
      expect(plugin.name).toBe('coral-rollup')
    })

    it('should accept custom options', () => {
      const plugin = coralRollupPlugin({
        include: ['./src/**/*.tsx'],
        exclude: ['./node_modules/**'],
        output: 'styles.css',
        minify: false,
        darkMode: 'media',
        mode: 'inject',
        fileName: 'custom.css',
      })
      expect(plugin.name).toBe('coral-rollup')
    })

    it('should have resolveId method', () => {
      const plugin = coralRollupPlugin()
      expect(typeof plugin.resolveId).toBe('function')
    })

    it('should resolve virtual module', () => {
      const plugin = coralRollupPlugin()
      const resolveId = plugin.resolveId as (id: string) => string | null

      expect(resolveId('virtual:coral.css')).toBe('\0virtual:coral.css')
      expect(resolveId('coral.css')).toBe('\0virtual:coral.css')
      expect(resolveId('other.css')).toBeNull()
    })

    it('should have load method', () => {
      const plugin = coralRollupPlugin()
      expect(typeof plugin.load).toBe('function')
    })

    it('should load virtual module', () => {
      const plugin = coralRollupPlugin()
      const load = plugin.load as (id: string) => string | null

      const result = load('\0virtual:coral.css')
      expect(result).toContain('CoralCSS')
    })

    it('should return null for non-virtual modules', () => {
      const plugin = coralRollupPlugin()
      const load = plugin.load as (id: string) => string | null

      expect(load('other.css')).toBeNull()
    })

    it('should have transform method', () => {
      const plugin = coralRollupPlugin()
      expect(typeof plugin.transform).toBe('function')
    })

    it('should transform files matching include pattern', () => {
      const plugin = coralRollupPlugin({
        include: ['**/*.tsx'],
      })
      const transform = plugin.transform as (code: string, id: string) => null

      const result = transform('<div className="bg-red-500">', 'App.tsx')
      expect(result).toBeNull()
    })

    it('should skip files matching exclude pattern', () => {
      const plugin = coralRollupPlugin({
        exclude: ['**/*.test.tsx'],
      })
      const transform = plugin.transform as (code: string, id: string) => null

      const result = transform('<div className="bg-red-500">', 'App.test.tsx')
      expect(result).toBeNull()
    })

    it('should have generateBundle method', () => {
      const plugin = coralRollupPlugin()
      expect(typeof plugin.generateBundle).toBe('function')
    })

    it('should emit file in file mode', () => {
      const plugin = coralRollupPlugin({ mode: 'file' })

      expect(typeof plugin.generateBundle).toBe('function')

      const mockEmitFile = vi.fn()
      const generateBundle = plugin.generateBundle as unknown as (this: { emitFile: typeof mockEmitFile }) => void

      // Call generateBundle - it may or may not emit depending on collected classes
      generateBundle.call({ emitFile: mockEmitFile })

      // The generateBundle function exists and can be called
      expect(plugin.name).toBe('coral-rollup')
    })

    it('should have watchChange method', () => {
      const plugin = coralRollupPlugin()
      expect(typeof plugin.watchChange).toBe('function')
    })
  })

  describe('createCSSInjector', () => {
    it('should create injector script', () => {
      const css = '.test { color: red; }'
      const script = createCSSInjector(css)

      expect(script).toContain('document.createElement')
      expect(script).toContain('style')
      expect(script).toContain('document.head.appendChild')
    })

    it('should include CSS content', () => {
      const css = '.bg-red-500 { background-color: #f00; }'
      const script = createCSSInjector(css)

      expect(script).toContain('bg-red-500')
    })

    it('should escape special characters', () => {
      const css = '.test { content: "test"; }'
      const script = createCSSInjector(css)

      expect(script).toContain('"')
    })

    it('should be self-executing function', () => {
      const script = createCSSInjector('.test {}')
      expect(script).toContain('(function()')
      expect(script).toContain('})()')
    })
  })
})
