/**
 * Tests for Scroll Behavior Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { scrollBehaviorPlugin } from '../../../../../src/plugins/core/utilities/scroll-behavior'

describe('Scroll Behavior Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = scrollBehaviorPlugin()
      expect(plugin.name).toBe('scroll-behavior')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Scroll Behavior', () => {
    it('should generate scroll-auto', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['scroll-auto'])
      expect(css).toContain('scroll-behavior: auto')
    })

    it('should generate scroll-smooth', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['scroll-smooth'])
      expect(css).toContain('scroll-behavior: smooth')
    })
  })

  describe('Overscroll Behavior', () => {
    it('should generate overscroll-auto', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-auto'])
      expect(css).toContain('overscroll-behavior: auto')
    })

    it('should generate overscroll-contain', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-contain'])
      expect(css).toContain('overscroll-behavior: contain')
    })

    it('should generate overscroll-none', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-none'])
      expect(css).toContain('overscroll-behavior: none')
    })
  })

  describe('Overscroll Behavior X', () => {
    it('should generate overscroll-x-auto', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-x-auto'])
      expect(css).toContain('overscroll-behavior-x: auto')
    })

    it('should generate overscroll-x-contain', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-x-contain'])
      expect(css).toContain('overscroll-behavior-x: contain')
    })

    it('should generate overscroll-x-none', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-x-none'])
      expect(css).toContain('overscroll-behavior-x: none')
    })
  })

  describe('Overscroll Behavior Y', () => {
    it('should generate overscroll-y-auto', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-y-auto'])
      expect(css).toContain('overscroll-behavior-y: auto')
    })

    it('should generate overscroll-y-contain', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-y-contain'])
      expect(css).toContain('overscroll-behavior-y: contain')
    })

    it('should generate overscroll-y-none', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-y-none'])
      expect(css).toContain('overscroll-behavior-y: none')
    })
  })

  describe('WebKit Overflow Scrolling', () => {
    it('should generate -webkit-overflow-scrolling-auto', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['-webkit-overflow-scrolling-auto'])
      expect(css).toContain('-webkit-overflow-scrolling: auto')
    })

    it('should note -webkit-overflow-scrolling-touch not implemented', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['-webkit-overflow-scrolling-touch'])
      // -webkit-overflow-scrolling-touch not implemented
      expect(css).toBe('')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate smooth scrolling for page', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['html', 'scroll-smooth'])
      expect(css).toContain('scroll-behavior: smooth')
    })

    it('should generate scrollable container with smooth scroll', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overflow-auto', 'scroll-smooth'])
      expect(css).toContain('scroll-behavior: smooth')
    })

    it('should generate prevent pull-to-refresh', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-y-contain'])
      expect(css).toContain('overscroll-behavior-y: contain')
    })

    it('should note iOS smooth scrolling pattern not implemented', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overflow-auto', '-webkit-overflow-scrolling-touch'])
      // -webkit-overflow-scrolling-touch not implemented
      expect(css).not.toContain('-webkit-overflow-scrolling: touch')
    })

    it('should generate combined overscroll control', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-contain'])
      expect(css).toContain('overscroll-behavior: contain')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({
        plugins: [scrollBehaviorPlugin()],
        theme: { breakpoints: { sm: '640px', md: '768px' } }
      })
      const css = coral.generate(['scroll-auto', 'sm:scroll-smooth'])
      // Responsive plugin not loaded, so classes are generated without @media
      expect(css).toContain('scroll-behavior: auto')
      expect(css).toContain('scroll-behavior: smooth')
    })
  })

  describe('Combined Utilities', () => {
    it('should combine smooth scroll with overscroll control', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['scroll-smooth', 'overscroll-contain'])
      expect(css).toContain('scroll-behavior: smooth')
      expect(css).toContain('overscroll-behavior: contain')
    })

    it('should combine X and Y overscroll behaviors', () => {
      const coral = createCoral({ plugins: [scrollBehaviorPlugin()] })
      const css = coral.generate(['overscroll-x-contain', 'overscroll-y-none'])
      expect(css).toContain('overscroll-behavior-x: contain')
      expect(css).toContain('overscroll-behavior-y: none')
    })
  })
})
