/**
 * Tests for Scrollbar Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { scrollbarPlugin } from '../../../../../src/plugins/core/utilities/scrollbar'

describe('Scrollbar Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = scrollbarPlugin()
      expect(plugin.name).toBe('scrollbar')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Firefox Scrollbar Width', () => {
    it('should generate scrollbar-auto', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-auto'])
      expect(css).toContain('scrollbar-width: auto')
    })

    it('should generate scrollbar-thin', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thin'])
      expect(css).toContain('scrollbar-width: thin')
    })

    it('should generate scrollbar-none', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-none'])
      expect(css).toContain('scrollbar-width: none')
    })
  })

  describe('Scrollbar Thumb/Track Colors (WebKit & Firefox overlap)', () => {
    it('should generate scrollbar-thumb-coral-500 (outputs WebKit styles)', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-coral-500'])
      expect(css).toContain('scrollbar-thumb-coral-500')
    })

    it('should generate scrollbar-track-gray-100 (outputs WebKit styles)', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-gray-100'])
      expect(css).toContain('scrollbar-track-gray-100')
    })

    it('should generate scrollbar-thumb-coral-500 scrollbar-track-gray-100', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-coral-500', 'scrollbar-track-gray-100'])
      expect(css).toContain('scrollbar-thumb-coral-500')
      expect(css).toContain('scrollbar-track-gray-100')
    })

    it('should generate scrollbar-thumb-blue-500 scrollbar-track-gray-200', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-blue-500', 'scrollbar-track-gray-200'])
      expect(css).toContain('scrollbar-thumb-blue-500')
      expect(css).toContain('scrollbar-track-gray-200')
    })
  })

  describe('WebKit Scrollbar Width', () => {
    it('should generate scrollbar-w-0', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-w-0'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('width: 0px')
    })

    it('should generate scrollbar-w-1', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-w-1'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('width: 4px')
    })

    it('should generate scrollbar-w-2', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-w-2'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('width: 8px')
    })

    it('should generate scrollbar-w-4', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-w-4'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('width: 16px')
    })
  })

  describe('WebKit Scrollbar Height (horizontal)', () => {
    it('should generate scrollbar-h-1', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-h-1'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('height: 4px')
    })

    it('should generate scrollbar-h-2', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-h-2'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('height: 8px')
    })

    it('should generate scrollbar-h-4', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-h-4'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('height: 16px')
    })
  })

  describe('WebKit Scrollbar Thumb Color', () => {
    it('should generate scrollbar-thumb-coral-500 for WebKit with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-coral-500'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('background-color: var(--color-coral-500)')
    })

    it('should generate scrollbar-thumb-gray-400', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-gray-400'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('background-color: var(--color-gray-400)')
    })
  })

  describe('WebKit Scrollbar Track Color', () => {
    it('should generate scrollbar-track-gray-100 for WebKit', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-gray-100'])
      expect(css).toContain('&::-webkit-scrollbar-track')
      expect(css).toContain('background-color: var(--color-gray-100)')
    })

    it('should generate scrollbar-track-gray-200', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-gray-200'])
      expect(css).toContain('&::-webkit-scrollbar-track')
      expect(css).toContain('background-color: var(--color-gray-200)')
    })
  })

  describe('WebKit Scrollbar Border Radius', () => {
    it('should generate scrollbar-thumb-rounded-none', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-rounded-none'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('border-radius: 0')
    })

    it('should generate scrollbar-thumb-rounded-sm', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-rounded-sm'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('border-radius: sm')
    })

    it('should generate scrollbar-thumb-rounded-md', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-rounded-md'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('border-radius: md')
    })

    it('should generate scrollbar-thumb-rounded-lg', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-rounded-lg'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('border-radius: lg')
    })

    it('should generate scrollbar-thumb-rounded-full', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-rounded-full'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('border-radius: 9999px')
    })
  })

  describe('WebKit Scrollbar Track Border Radius', () => {
    it('should generate scrollbar-track-rounded-none', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-rounded-none'])
      expect(css).toContain('&::-webkit-scrollbar-track')
      expect(css).toContain('border-radius: 0')
    })

    it('should generate scrollbar-track-rounded-lg', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-rounded-lg'])
      expect(css).toContain('&::-webkit-scrollbar-track')
      expect(css).toContain('border-radius: lg')
    })

    it('should generate scrollbar-track-rounded-full', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-track-rounded-full'])
      expect(css).toContain('&::-webkit-scrollbar-track')
      expect(css).toContain('border-radius: 9999px')
    })
  })

  describe('Scrollbar Gutter', () => {
    it('should generate scrollbar-gutter-auto', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-gutter-auto'])
      expect(css).toContain('scrollbar-gutter: auto')
    })

    it('should generate scrollbar-gutter-stable', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-gutter-stable'])
      expect(css).toContain('scrollbar-gutter: stable')
    })

    it('should not have scrollbar-gutter-both-edges (not implemented)', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-gutter-both-edges'])
      // This utility doesn't exist in the plugin
      expect(css).toBe('')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate thin colored scrollbar with WebKit styles', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thin', 'scrollbar-thumb-coral-500'])
      expect(css).toContain('scrollbar-width: thin')
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('background-color: var(--color-coral-500)')
    })

    it('should generate custom WebKit scrollbar', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-w-2', 'scrollbar-thumb-blue-500', 'scrollbar-thumb-rounded-full', 'scrollbar-track-gray-100'])
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('&::-webkit-scrollbar-track')
    })

    it('should generate hidden scrollbar', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-hide'])
      expect(css).toContain('scrollbar-width: none')
      expect(css).toContain('&::-webkit-scrollbar')
      expect(css).toContain('display: none')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thin', 'scrollbar-thumb-coral-500'])
      // Without responsive plugin, variants won't work
      expect(css).toContain('scrollbar-width: thin')
    })
  })

  describe('Dark Mode', () => {
    it('should note dark mode requires dark mode plugin', () => {
      const coral = createCoral({ plugins: [scrollbarPlugin()] })
      const css = coral.generate(['scrollbar-thumb-coral-500'])
      expect(css).toContain('&::-webkit-scrollbar-thumb')
      expect(css).toContain('background-color: var(--color-coral-500)')
    })
  })
})
