/**
 * Tests for Accessibility Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { accessibilityPlugin } from '../../../../../src/plugins/core/utilities/accessibility'
import type { Coral } from '../../../../../src/types'

describe('Accessibility Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(accessibilityPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = accessibilityPlugin()
      expect(plugin.name).toBe('accessibility')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Screen Reader Utilities', () => {
    it('should generate sr-only', () => {
      const css = coral.generate(['sr-only'])
      expect(css).toContain('position')
      expect(css).toContain('absolute')
    })

    it('should generate not-sr-only', () => {
      const css = coral.generate(['not-sr-only'])
      expect(css).toContain('position')
      expect(css).toContain('static')
    })
  })

  describe('Forced Colors Utilities', () => {
    it('should generate forced-color-adjust-auto', () => {
      const css = coral.generate(['forced-color-adjust-auto'])
      expect(css).toContain('forced-color-adjust')
      expect(css).toContain('auto')
    })

    it('should generate forced-color-adjust-none', () => {
      const css = coral.generate(['forced-color-adjust-none'])
      expect(css).toContain('forced-color-adjust')
      expect(css).toContain('none')
    })
  })

  describe('Skip Link Utilities', () => {
    it('should generate skip-link', () => {
      const css = coral.generate(['skip-link'])
      expect(css).toContain('position')
      expect(css).toContain('absolute')
    })

    it('should generate skip-link-visible', () => {
      const css = coral.generate(['skip-link-visible'])
      expect(css).toContain('position')
      expect(css).toContain('fixed')
    })
  })

  describe('Focus Utilities', () => {
    it('should generate focus-outline', () => {
      const css = coral.generate(['focus-outline'])
      expect(css).toContain('outline')
    })

    it('should generate focus-outline-none', () => {
      const css = coral.generate(['focus-outline-none'])
      expect(css).toContain('outline')
      expect(css).toContain('none')
    })

    it('should generate focus-ring', () => {
      const css = coral.generate(['focus-ring'])
      expect(css).toContain('box-shadow')
    })
  })

  describe('Accessible Colors', () => {
    it('should generate text-accessible', () => {
      const css = coral.generate(['text-accessible'])
      expect(css).toContain('color')
      expect(css).toContain('CanvasText')
    })

    it('should generate bg-accessible', () => {
      const css = coral.generate(['bg-accessible'])
      expect(css).toContain('background-color')
      expect(css).toContain('Canvas')
    })

    it('should generate border-accessible', () => {
      const css = coral.generate(['border-accessible'])
      expect(css).toContain('border-color')
      expect(css).toContain('CanvasText')
    })
  })

  describe('Touch Target Utilities', () => {
    it('should generate touch-target', () => {
      const css = coral.generate(['touch-target'])
      expect(css).toContain('min-width')
      expect(css).toContain('44px')
    })

    it('should generate touch-target-lg', () => {
      const css = coral.generate(['touch-target-lg'])
      expect(css).toContain('min-width')
      expect(css).toContain('48px')
    })
  })

  describe('Caret Color Utilities', () => {
    it('should generate caret-inherit', () => {
      const css = coral.generate(['caret-inherit'])
      expect(css).toContain('caret-color')
      expect(css).toContain('inherit')
    })

    it('should generate caret-current', () => {
      const css = coral.generate(['caret-current'])
      expect(css).toContain('caret-color')
      expect(css).toContain('currentColor')
    })

    it('should generate caret-transparent', () => {
      const css = coral.generate(['caret-transparent'])
      expect(css).toContain('caret-color')
      expect(css).toContain('transparent')
    })

    it('should generate caret-primary', () => {
      const css = coral.generate(['caret-primary'])
      expect(css).toContain('caret-color')
    })

    it('should generate caret-destructive', () => {
      const css = coral.generate(['caret-destructive'])
      expect(css).toContain('caret-color')
    })

    it('should generate arbitrary caret color', () => {
      const css = coral.generate(['caret-[#00ff00]'])
      expect(css).toContain('caret-color')
      expect(css).toContain('#00ff00')
    })
  })

  describe('Will Change Utilities', () => {
    it('should generate will-change-auto', () => {
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change')
      expect(css).toContain('auto')
    })

    it('should generate will-change-scroll', () => {
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change')
      expect(css).toContain('scroll-position')
    })

    it('should generate will-change-contents', () => {
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change')
      expect(css).toContain('contents')
    })

    it('should generate will-change-transform', () => {
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change')
      expect(css).toContain('transform')
    })

    it('should generate arbitrary will-change', () => {
      const css = coral.generate(['will-change-[opacity]'])
      expect(css).toContain('will-change')
      expect(css).toContain('opacity')
    })
  })

  describe('Content Utilities', () => {
    it('should generate content-none', () => {
      const css = coral.generate(['content-none'])
      expect(css).toContain('content')
      expect(css).toContain('none')
    })

    it('should generate content-empty', () => {
      const css = coral.generate(['content-empty'])
      expect(css).toContain('content')
    })

    it('should generate arbitrary content', () => {
      const css = coral.generate(['content-[attr(data-label)]'])
      expect(css).toContain('content')
    })

    it('should handle arbitrary content with quotes', () => {
      const css = coral.generate(['content-["hello"]'])
      expect(css).toContain('content')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/accessibility'
      )
      expect(defaultExport).toBe(accessibilityPlugin)
    })
  })
})
