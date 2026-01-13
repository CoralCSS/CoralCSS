/**
 * Tests for Blending Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { blendingPlugin } from '../../../../../src/plugins/core/utilities/blending'

describe('Blending Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = blendingPlugin()
      expect(plugin.name).toBe('blending')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Mix Blend Mode', () => {
    it('should generate mix-blend-normal', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-normal'])
      expect(css).toContain('mix-blend-mode: normal')
    })

    it('should generate mix-blend-multiply', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-multiply'])
      expect(css).toContain('mix-blend-mode: multiply')
    })

    it('should generate mix-blend-screen', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-screen'])
      expect(css).toContain('mix-blend-mode: screen')
    })

    it('should generate mix-blend-overlay', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-overlay'])
      expect(css).toContain('mix-blend-mode: overlay')
    })

    it('should generate mix-blend-darken', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-darken'])
      expect(css).toContain('mix-blend-mode: darken')
    })

    it('should generate mix-blend-lighten', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-lighten'])
      expect(css).toContain('mix-blend-mode: lighten')
    })

    it('should generate mix-blend-color-dodge', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-color-dodge'])
      expect(css).toContain('mix-blend-mode: color-dodge')
    })

    it('should generate mix-blend-color-burn', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-color-burn'])
      expect(css).toContain('mix-blend-mode: color-burn')
    })

    it('should generate mix-blend-hard-light', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-hard-light'])
      expect(css).toContain('mix-blend-mode: hard-light')
    })

    it('should generate mix-blend-soft-light', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-soft-light'])
      expect(css).toContain('mix-blend-mode: soft-light')
    })

    it('should generate mix-blend-difference', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-difference'])
      expect(css).toContain('mix-blend-mode: difference')
    })

    it('should generate mix-blend-exclusion', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-exclusion'])
      expect(css).toContain('mix-blend-mode: exclusion')
    })

    it('should generate mix-blend-hue', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-hue'])
      expect(css).toContain('mix-blend-mode: hue')
    })

    it('should generate mix-blend-saturation', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-saturation'])
      expect(css).toContain('mix-blend-mode: saturation')
    })

    it('should generate mix-blend-color', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-color'])
      expect(css).toContain('mix-blend-mode: color')
    })

    it('should generate mix-blend-luminosity', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-luminosity'])
      expect(css).toContain('mix-blend-mode: luminosity')
    })

    it('should generate mix-blend-plus-lighter', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-plus-lighter'])
      expect(css).toContain('mix-blend-mode: plus-lighter')
    })
  })

  describe('Background Blend Mode', () => {
    it('should generate bg-blend-normal', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-normal'])
      expect(css).toContain('background-blend-mode: normal')
    })

    it('should generate bg-blend-multiply', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-multiply'])
      expect(css).toContain('background-blend-mode: multiply')
    })

    it('should generate bg-blend-screen', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-screen'])
      expect(css).toContain('background-blend-mode: screen')
    })

    it('should generate bg-blend-overlay', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-overlay'])
      expect(css).toContain('background-blend-mode: overlay')
    })

    it('should generate bg-blend-darken', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-darken'])
      expect(css).toContain('background-blend-mode: darken')
    })

    it('should generate bg-blend-lighten', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-lighten'])
      expect(css).toContain('background-blend-mode: lighten')
    })

    it('should generate bg-blend-color-dodge', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-color-dodge'])
      expect(css).toContain('background-blend-mode: color-dodge')
    })

    it('should generate bg-blend-color-burn', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-color-burn'])
      expect(css).toContain('background-blend-mode: color-burn')
    })

    it('should generate bg-blend-hard-light', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-hard-light'])
      expect(css).toContain('background-blend-mode: hard-light')
    })

    it('should generate bg-blend-soft-light', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-soft-light'])
      expect(css).toContain('background-blend-mode: soft-light')
    })

    it('should generate bg-blend-difference', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-difference'])
      expect(css).toContain('background-blend-mode: difference')
    })

    it('should generate bg-blend-exclusion', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-exclusion'])
      expect(css).toContain('background-blend-mode: exclusion')
    })

    it('should generate bg-blend-hue', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-hue'])
      expect(css).toContain('background-blend-mode: hue')
    })

    it('should generate bg-blend-saturation', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-saturation'])
      expect(css).toContain('background-blend-mode: saturation')
    })

    it('should generate bg-blend-color', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-color'])
      expect(css).toContain('background-blend-mode: color')
    })

    it('should generate bg-blend-luminosity', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-luminosity'])
      expect(css).toContain('background-blend-mode: luminosity')
    })

    it('should note bg-blend-plus-lighter is not implemented (only mix-blend-plus-lighter exists)', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['bg-blend-plus-lighter'])
      // This utility is not implemented
      expect(css).toBe('')
    })
  })

  describe('Isolation', () => {
    it('should generate isolate', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['isolate'])
      expect(css).toContain('isolation: isolate')
    })

    it('should generate isolation-auto', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['isolation-auto'])
      expect(css).toContain('isolation: auto')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate multiply blend for overlay', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-multiply', 'opacity-80'])
      expect(css).toContain('mix-blend-mode: multiply')
    })

    it('should generate screen blend for highlights', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-screen', 'opacity-60'])
      expect(css).toContain('mix-blend-mode: screen')
    })

    it('should generate gradient with blend mode', () => {
      const coral = createCoral({
        plugins: [blendingPlugin()],
        theme: { colors: { coral: { 500: '#ff6b6b' }, blue: { 500: '#3b82f6' } } }
      })
      const css = coral.generate(['bg-gradient-to-r', 'from-coral-500', 'to-blue-500', 'bg-blend-overlay'])
      expect(css).toContain('background-blend-mode: overlay')
    })

    it('should generate isolated blend group', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['isolate'])
      expect(css).toContain('isolation: isolate')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-normal', 'mix-blend-multiply'])
      expect(css).toContain('mix-blend-mode: normal')
      expect(css).toContain('mix-blend-mode: multiply')
    })
  })

  describe('Hover States', () => {
    it('should note hover variants require variants plugin', () => {
      const coral = createCoral({ plugins: [blendingPlugin()] })
      const css = coral.generate(['mix-blend-multiply'])
      expect(css).toContain('mix-blend-mode: multiply')
    })
  })
})
