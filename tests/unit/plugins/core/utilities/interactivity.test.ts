/**
 * Tests for Interactivity Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { interactivityPlugin } from '../../../../../src/plugins/core/utilities/interactivity'
import type { Coral } from '../../../../../src/types'

describe('Interactivity Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(interactivityPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = interactivityPlugin()
      expect(plugin.name).toBe('interactivity')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Cursor Utilities', () => {
    it('should generate cursor-pointer', () => {
      const css = coral.generate(['cursor-pointer'])
      expect(css).toContain('cursor')
      expect(css).toContain('pointer')
    })

    it('should generate cursor-wait', () => {
      const css = coral.generate(['cursor-wait'])
      expect(css).toContain('cursor')
      expect(css).toContain('wait')
    })

    it('should generate cursor-not-allowed', () => {
      const css = coral.generate(['cursor-not-allowed'])
      expect(css).toContain('cursor')
      expect(css).toContain('not-allowed')
    })

    it('should generate arbitrary cursor', () => {
      const css = coral.generate(['cursor-[url(hand.cur),pointer]'])
      expect(css).toContain('cursor')
    })
  })

  describe('Pointer Events', () => {
    it('should generate pointer-events-none', () => {
      const css = coral.generate(['pointer-events-none'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
    })

    it('should generate pointer-events-auto', () => {
      const css = coral.generate(['pointer-events-auto'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('auto')
    })
  })

  describe('Resize Utilities', () => {
    it('should generate resize-none', () => {
      const css = coral.generate(['resize-none'])
      expect(css).toContain('resize')
      expect(css).toContain('none')
    })

    it('should generate resize-y', () => {
      const css = coral.generate(['resize-y'])
      expect(css).toContain('resize')
      expect(css).toContain('vertical')
    })

    it('should generate resize', () => {
      const css = coral.generate(['resize'])
      expect(css).toContain('resize')
      expect(css).toContain('both')
    })
  })

  describe('Scroll Behavior', () => {
    it('should generate scroll-auto', () => {
      const css = coral.generate(['scroll-auto'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('auto')
    })

    it('should generate scroll-smooth', () => {
      const css = coral.generate(['scroll-smooth'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('smooth')
    })
  })

  describe('Scroll Margin', () => {
    it('should generate scroll-m-4', () => {
      const css = coral.generate(['scroll-m-4'])
      expect(css).toContain('scroll-margin')
    })

    it('should generate scroll-mt-8', () => {
      const css = coral.generate(['scroll-mt-8'])
      expect(css).toContain('scroll-margin-top')
    })

    it('should generate arbitrary scroll margin', () => {
      const css = coral.generate(['scroll-m-[20px]'])
      expect(css).toContain('scroll-margin')
      expect(css).toContain('20px')
    })
  })

  describe('Scroll Padding', () => {
    it('should generate scroll-p-4', () => {
      const css = coral.generate(['scroll-p-4'])
      expect(css).toContain('scroll-padding')
    })

    it('should generate scroll-px-8', () => {
      const css = coral.generate(['scroll-px-8'])
      expect(css).toContain('scroll-padding-left')
      expect(css).toContain('scroll-padding-right')
    })

    it('should generate arbitrary scroll padding', () => {
      const css = coral.generate(['scroll-p-[30px]'])
      expect(css).toContain('scroll-padding')
      expect(css).toContain('30px')
    })
  })

  describe('Scroll Snap', () => {
    it('should generate snap-start', () => {
      const css = coral.generate(['snap-start'])
      expect(css).toContain('scroll-snap-align')
      expect(css).toContain('start')
    })

    it('should generate snap-x', () => {
      const css = coral.generate(['snap-x'])
      expect(css).toContain('scroll-snap-type')
    })

    it('should generate snap-mandatory', () => {
      const css = coral.generate(['snap-mandatory'])
      expect(css).toContain('--coral-scroll-snap-strictness')
      expect(css).toContain('mandatory')
    })
  })

  describe('Touch Action', () => {
    it('should generate touch-auto', () => {
      const css = coral.generate(['touch-auto'])
      expect(css).toContain('touch-action')
      expect(css).toContain('auto')
    })

    it('should generate touch-none', () => {
      const css = coral.generate(['touch-none'])
      expect(css).toContain('touch-action')
      expect(css).toContain('none')
    })

    it('should generate touch-pan-x', () => {
      const css = coral.generate(['touch-pan-x'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-x')
    })

    it('should generate touch-manipulation', () => {
      const css = coral.generate(['touch-manipulation'])
      expect(css).toContain('touch-action')
      expect(css).toContain('manipulation')
    })
  })

  describe('User Select', () => {
    it('should generate select-none', () => {
      const css = coral.generate(['select-none'])
      expect(css).toContain('user-select')
      expect(css).toContain('none')
    })

    it('should generate select-text', () => {
      const css = coral.generate(['select-text'])
      expect(css).toContain('user-select')
      expect(css).toContain('text')
    })

    it('should generate select-all', () => {
      const css = coral.generate(['select-all'])
      expect(css).toContain('user-select')
      expect(css).toContain('all')
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

  describe('Color Scheme', () => {
    it('should generate color-scheme-light', () => {
      const css = coral.generate(['color-scheme-light'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light')
    })

    it('should generate color-scheme-dark', () => {
      const css = coral.generate(['color-scheme-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('dark')
    })

    it('should generate color-scheme-light-dark', () => {
      const css = coral.generate(['color-scheme-light-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light dark')
    })
  })

  describe('Content Visibility', () => {
    it('should generate content-visibility-auto', () => {
      const css = coral.generate(['content-visibility-auto'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('auto')
    })

    it('should generate content-visibility-hidden', () => {
      const css = coral.generate(['content-visibility-hidden'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('hidden')
    })
  })

  describe('Scrollbar Utilities', () => {
    it('should generate scrollbar-thin', () => {
      const css = coral.generate(['scrollbar-thin'])
      expect(css).toContain('scrollbar-width')
      expect(css).toContain('thin')
    })

    it('should generate scrollbar-none', () => {
      const css = coral.generate(['scrollbar-none'])
      expect(css).toContain('scrollbar-width')
      expect(css).toContain('none')
    })
  })

  describe('Zoom Utilities', () => {
    it('should generate zoom-50', () => {
      const css = coral.generate(['zoom-50'])
      expect(css).toContain('zoom')
      expect(css).toContain('0.5')
    })

    it('should generate zoom-150', () => {
      const css = coral.generate(['zoom-150'])
      expect(css).toContain('zoom')
      expect(css).toContain('1.5')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/interactivity'
      )
      expect(defaultExport).toBe(interactivityPlugin)
    })
  })
})
