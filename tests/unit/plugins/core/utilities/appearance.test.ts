/**
 * Tests for Appearance Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { appearancePlugin } from '../../../../../src/plugins/core/utilities/appearance'

describe('Appearance Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = appearancePlugin()
      expect(plugin.name).toBe('appearance')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Basic Appearance Values', () => {
    it('should generate appearance-none', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })

    it('should generate appearance-auto', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-auto'])
      expect(css).toContain('-webkit-appearance: auto')
      expect(css).toContain('appearance: auto')
    })
  })

  describe('Form Control Appearances', () => {
    it('should generate appearance-button', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-button'])
      expect(css).toContain('-webkit-appearance: button')
      expect(css).toContain('appearance: button')
    })

    it('should generate appearance-textfield', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-textfield'])
      expect(css).toContain('-webkit-appearance: textfield')
      expect(css).toContain('appearance: textfield')
    })

    it('should generate appearance-searchfield', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-searchfield'])
      expect(css).toContain('-webkit-appearance: searchfield')
      expect(css).toContain('appearance: searchfield')
    })
  })

  describe('Input Appearances', () => {
    it('should generate appearance-checkbox', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-checkbox'])
      expect(css).toContain('-webkit-appearance: checkbox')
      expect(css).toContain('appearance: checkbox')
    })

    it('should generate appearance-radio', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-radio'])
      expect(css).toContain('-webkit-appearance: radio')
      expect(css).toContain('appearance: radio')
    })
  })

  describe('Slider Appearance', () => {
    it('should generate appearance-slider-horizontal', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-slider-horizontal'])
      expect(css).toContain('-webkit-appearance: slider-horizontal')
      expect(css).toContain('appearance: slider-horizontal')
    })
  })

  describe('Button Appearances', () => {
    it('should generate appearance-square-button', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-square-button'])
      expect(css).toContain('-webkit-appearance: square-button')
      expect(css).toContain('appearance: square-button')
    })
  })

  describe('Select Appearance', () => {
    it('should generate appearance-menulist', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-menulist'])
      expect(css).toContain('-webkit-appearance: menulist')
      expect(css).toContain('appearance: menulist')
    })

    it('should generate appearance-menulist-button', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-menulist-button'])
      expect(css).toContain('-webkit-appearance: menulist-button')
      expect(css).toContain('appearance: menulist-button')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate custom styled input', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none', 'border', 'rounded', 'px-3', 'py-2'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })

    it('should generate custom styled select', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none', 'bg-white', 'border', 'rounded', 'px-3', 'py-2'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })

    it('should generate custom checkbox', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none', 'w-5', 'h-5', 'border', 'rounded'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })

    it('should generate custom range slider', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none', 'w-full', 'h-2', 'bg-gray-200', 'rounded-lg'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })
  })

  describe('Reset to Default', () => {
    it('should reset custom input back to default', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-auto'])
      expect(css).toContain('-webkit-appearance: auto')
      expect(css).toContain('appearance: auto')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none', 'appearance-auto'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('-webkit-appearance: auto')
    })
  })

  describe('Cross-browser Compatibility', () => {
    it('should include both -webkit- and standard properties', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-none'])
      expect(css).toContain('-webkit-appearance: none')
      expect(css).toContain('appearance: none')
    })

    it('should include vendor prefix for all appearance values', () => {
      const coral = createCoral({ plugins: [appearancePlugin()] })
      const css = coral.generate(['appearance-button', 'appearance-textfield'])
      expect(css).toContain('-webkit-appearance: button')
      expect(css).toContain('-webkit-appearance: textfield')
    })
  })
})
