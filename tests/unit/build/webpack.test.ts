import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CoralWebpackPlugin,
  coralWebpackPlugin,
  coralLoader,
} from '../../../src/build/webpack'

describe('Build Webpack', () => {
  describe('CoralWebpackPlugin', () => {
    it('should create instance with default options', () => {
      const plugin = new CoralWebpackPlugin()
      expect(plugin).toBeInstanceOf(CoralWebpackPlugin)
    })

    it('should create instance with custom options', () => {
      const plugin = new CoralWebpackPlugin({
        include: ['./src/**/*.tsx'],
        exclude: ['./dist/**'],
        output: 'custom.css',
        minify: false,
        darkMode: 'media',
        preset: 'wind',
      })
      expect(plugin).toBeInstanceOf(CoralWebpackPlugin)
    })

    it('should have apply method', () => {
      const plugin = new CoralWebpackPlugin()
      expect(typeof plugin.apply).toBe('function')
    })

    it('should register hooks on apply', () => {
      const plugin = new CoralWebpackPlugin()

      const mockThisCompilationTap = vi.fn()
      const mockEmitTapAsync = vi.fn()
      const mockWatchRunTapAsync = vi.fn()

      const mockCompiler = {
        hooks: {
          thisCompilation: { tap: mockThisCompilationTap },
          emit: { tapAsync: mockEmitTapAsync },
          watchRun: { tapAsync: mockWatchRunTapAsync },
        },
        options: { mode: 'production' },
      }

      plugin.apply(mockCompiler as never)

      expect(mockThisCompilationTap).toHaveBeenCalledWith(
        'CoralWebpackPlugin',
        expect.any(Function)
      )
      expect(mockEmitTapAsync).toHaveBeenCalledWith(
        'CoralWebpackPlugin',
        expect.any(Function)
      )
      expect(mockWatchRunTapAsync).toHaveBeenCalledWith(
        'CoralWebpackPlugin',
        expect.any(Function)
      )
    })

    it('should handle development mode', () => {
      const plugin = new CoralWebpackPlugin()

      const mockThisCompilationTap = vi.fn()
      const mockEmitTapAsync = vi.fn()
      const mockWatchRunTapAsync = vi.fn()

      const mockCompiler = {
        hooks: {
          thisCompilation: { tap: mockThisCompilationTap },
          emit: { tapAsync: mockEmitTapAsync },
          watchRun: { tapAsync: mockWatchRunTapAsync },
        },
        options: { mode: 'development' },
      }

      plugin.apply(mockCompiler as never)

      expect(mockThisCompilationTap).toHaveBeenCalled()
    })
  })

  describe('coralWebpackPlugin', () => {
    it('should be a factory function', () => {
      expect(typeof coralWebpackPlugin).toBe('function')
    })

    it('should return CoralWebpackPlugin instance', () => {
      const plugin = coralWebpackPlugin()
      expect(plugin).toBeInstanceOf(CoralWebpackPlugin)
    })

    it('should pass options to plugin', () => {
      const plugin = coralWebpackPlugin({
        darkMode: 'media',
        minify: false,
      })
      expect(plugin).toBeInstanceOf(CoralWebpackPlugin)
    })
  })

  describe('coralLoader', () => {
    it('should be a function', () => {
      expect(typeof coralLoader).toBe('function')
    })

    it('should call async callback', () => {
      const mockCallback = vi.fn()
      const mockAsync = vi.fn().mockReturnValue(mockCallback)
      const mockGetOptions = vi.fn().mockReturnValue({})

      const loaderContext = {
        async: mockAsync,
        getOptions: mockGetOptions,
        resourcePath: 'test.css',
      }

      coralLoader.call(loaderContext as never, '@apply bg-red-500;')

      expect(mockAsync).toHaveBeenCalled()
    })

    it('should handle safelist option', () => {
      const mockCallback = vi.fn()
      const mockAsync = vi.fn().mockReturnValue(mockCallback)
      const mockGetOptions = vi.fn().mockReturnValue({
        safelist: ['p-4', 'mt-2'],
        darkMode: 'class',
      })

      const loaderContext = {
        async: mockAsync,
        getOptions: mockGetOptions,
        resourcePath: 'test.coral.css',
      }

      coralLoader.call(loaderContext as never, '@coral utilities { bg-red-500 }')

      expect(mockCallback).toHaveBeenCalled()
    })

    it('should handle error in loader', () => {
      const mockCallback = vi.fn()
      const mockAsync = vi.fn().mockReturnValue(mockCallback)
      const mockGetOptions = vi.fn().mockImplementation(() => {
        throw new Error('Config error')
      })

      const loaderContext = {
        async: mockAsync,
        getOptions: mockGetOptions,
        resourcePath: 'test.css',
      }

      expect(() => coralLoader.call(loaderContext as never, '')).toThrow()
    })
  })
})
