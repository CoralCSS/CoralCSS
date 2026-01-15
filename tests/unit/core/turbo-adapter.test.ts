/**
 * Tests for Turbo Engine Adapter
 *
 * Tests the bridge between CoralCSS and the Rust-based Turbo engine.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  configureTurbo,
  initTurbo,
  isTurboAvailable,
  getTurboEngine,
  turboParse,
  turboParseAll,
  turboExtract,
  turboExtractParallel,
  turboProcess,
  shouldUseTurbo,
  turboParseSync,
  turboExtractSync,
  type TurboAdapterConfig,
} from '../../../src/core/turbo-adapter'

describe('Turbo Adapter', () => {
  // Reset state before each test
  beforeEach(() => {
    configureTurbo({ enabled: false })
    configureTurbo({ enabled: true })
  })

  describe('configureTurbo', () => {
    it('should accept configuration options', () => {
      const config: TurboAdapterConfig = {
        enabled: true,
        preferNative: true,
        fallbackOnError: true,
      }

      expect(() => configureTurbo(config)).not.toThrow()
    })

    it('should accept partial configuration', () => {
      expect(() => configureTurbo({ enabled: false })).not.toThrow()
      expect(() => configureTurbo({ preferNative: false })).not.toThrow()
      expect(() => configureTurbo({ fallbackOnError: false })).not.toThrow()
    })

    it('should disable turbo when enabled is false', () => {
      configureTurbo({ enabled: false })
      expect(shouldUseTurbo()).toBe(false)
    })
  })

  describe('initTurbo', () => {
    it('should return false when disabled', async () => {
      configureTurbo({ enabled: false })
      const result = await initTurbo()
      expect(result).toBe(false)
    })

    it('should attempt to initialize', async () => {
      // May or may not succeed depending on @coral-css/turbo availability
      const result = await initTurbo()
      expect(typeof result).toBe('boolean')
    })

    it('should cache initialization result', async () => {
      const result1 = await initTurbo()
      const result2 = await initTurbo()
      expect(result1).toBe(result2)
    })
  })

  describe('isTurboAvailable', () => {
    it('should return boolean', () => {
      expect(typeof isTurboAvailable()).toBe('boolean')
    })

    it('should return false when disabled', () => {
      configureTurbo({ enabled: false })
      expect(isTurboAvailable()).toBe(false)
    })
  })

  describe('getTurboEngine', () => {
    it('should return null when not initialized', () => {
      configureTurbo({ enabled: false })
      expect(getTurboEngine()).toBeNull()
    })
  })

  describe('shouldUseTurbo', () => {
    it('should return boolean', () => {
      expect(typeof shouldUseTurbo()).toBe('boolean')
    })

    it('should return false when disabled', () => {
      configureTurbo({ enabled: false })
      expect(shouldUseTurbo()).toBe(false)
    })
  })

  describe('turboParse with Fallback', () => {
    it('should use fallback when turbo unavailable', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'flex',
        variants: [],
        utility: 'flex',
        negative: false,
        arbitrary: null,
        important: false,
      })

      const result = await turboParse('flex', jsFallback)

      expect(jsFallback).toHaveBeenCalledWith('flex')
      expect(result.original).toBe('flex')
    })

    it('should handle complex class names', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'hover:bg-blue-500',
        variants: ['hover'],
        utility: 'bg-blue-500',
        negative: false,
        arbitrary: null,
        important: false,
      })

      const result = await turboParse('hover:bg-blue-500', jsFallback)

      expect(result.variants).toContain('hover')
    })
  })

  describe('turboParseAll with Fallback', () => {
    it('should use fallback when turbo unavailable', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue([
        { original: 'flex', variants: [], utility: 'flex', negative: false, arbitrary: null, important: false },
        { original: 'p-4', variants: [], utility: 'p-4', negative: false, arbitrary: null, important: false },
      ])

      const result = await turboParseAll('flex p-4', jsFallback)

      expect(jsFallback).toHaveBeenCalledWith('flex p-4')
      expect(result.length).toBe(2)
    })
  })

  describe('turboExtract with Fallback', () => {
    it('should use fallback when turbo unavailable', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue(['flex', 'items-center', 'p-4'])

      const result = await turboExtract(
        '<div class="flex items-center p-4">Content</div>',
        jsFallback
      )

      expect(jsFallback).toHaveBeenCalled()
      expect(result).toEqual(['flex', 'items-center', 'p-4'])
    })

    it('should handle empty content', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue([])
      const result = await turboExtract('', jsFallback)

      expect(result).toEqual([])
    })
  })

  describe('turboExtractParallel with Fallback', () => {
    it('should use fallback when turbo unavailable', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue(['flex', 'grid', 'block'])

      const contents = [
        '<div class="flex">A</div>',
        '<div class="grid">B</div>',
        '<div class="block">C</div>',
      ]

      const result = await turboExtractParallel(contents, jsFallback)

      expect(jsFallback).toHaveBeenCalledWith(contents)
      expect(result).toEqual(['flex', 'grid', 'block'])
    })
  })

  describe('turboProcess with Fallback', () => {
    it('should use fallback when turbo unavailable', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue('.flex { display: flex; }')

      const result = await turboProcess('flex', jsFallback)

      expect(jsFallback).toHaveBeenCalledWith('flex')
      expect(result).toContain('flex')
    })
  })

  describe('turboParseSync', () => {
    it('should return null when turbo unavailable', () => {
      configureTurbo({ enabled: false })

      const result = turboParseSync('flex')
      expect(result).toBeNull()
    })
  })

  describe('turboExtractSync', () => {
    it('should return null when turbo unavailable', () => {
      configureTurbo({ enabled: false })

      const result = turboExtractSync('<div class="flex">Content</div>')
      expect(result).toBeNull()
    })
  })

  describe('Fallback Behavior', () => {
    it('should handle fallback with variants', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'sm:hover:bg-blue-500',
        variants: ['sm', 'hover'],
        utility: 'bg-blue-500',
        negative: false,
        arbitrary: null,
        important: false,
      })

      const result = await turboParse('sm:hover:bg-blue-500', jsFallback)

      expect(result.variants).toEqual(['sm', 'hover'])
    })

    it('should handle fallback with negative values', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: '-mt-4',
        variants: [],
        utility: 'mt-4',
        negative: true,
        arbitrary: null,
        important: false,
      })

      const result = await turboParse('-mt-4', jsFallback)

      expect(result.negative).toBe(true)
    })

    it('should handle fallback with arbitrary values', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'w-[200px]',
        variants: [],
        utility: 'w',
        negative: false,
        arbitrary: '200px',
        important: false,
      })

      const result = await turboParse('w-[200px]', jsFallback)

      expect(result.arbitrary).toBe('200px')
    })

    it('should handle fallback with important modifier', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: '!flex',
        variants: [],
        utility: 'flex',
        negative: false,
        arbitrary: null,
        important: true,
      })

      const result = await turboParse('!flex', jsFallback)

      expect(result.important).toBe(true)
    })

    it('should handle fallback with opacity', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'bg-blue-500/50',
        variants: [],
        utility: 'bg-blue-500',
        negative: false,
        arbitrary: null,
        important: false,
        opacity: '50',
      })

      const result = await turboParse('bg-blue-500/50', jsFallback)

      expect(result.opacity).toBe('50')
    })
  })

  describe('Configuration Persistence', () => {
    it('should maintain configuration across calls', async () => {
      configureTurbo({ enabled: false, preferNative: false })

      expect(isTurboAvailable()).toBe(false)

      const result = await initTurbo()
      expect(result).toBe(false)
    })

    it('should reset state when disabled', () => {
      configureTurbo({ enabled: false })

      expect(getTurboEngine()).toBeNull()
      expect(isTurboAvailable()).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should not throw when fallback is used', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockReturnValue({
        original: 'flex',
        variants: [],
        utility: 'flex',
        negative: false,
        arbitrary: null,
        important: false,
      })

      await expect(turboParse('flex', jsFallback)).resolves.not.toThrow()
    })

    it('should handle fallback errors gracefully', async () => {
      configureTurbo({ enabled: false })

      const jsFallback = vi.fn().mockImplementation(() => {
        throw new Error('Fallback error')
      })

      await expect(turboParse('flex', jsFallback)).rejects.toThrow('Fallback error')
    })
  })
})
