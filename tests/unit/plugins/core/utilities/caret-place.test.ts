/**
 * Tests for Caret & Place Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { caretPlacePlugin } from '../../../../../src/plugins/core/utilities/caret-place'

describe('Caret & Place Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = caretPlacePlugin()
      expect(plugin.name).toBe('caret-place')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Caret Color', () => {
    it('should generate caret-auto', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-auto'])
      expect(css).toContain('caret-color: auto')
    })

    it('should generate caret-current', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-current'])
      expect(css).toContain('caret-color: currentColor')
    })

    it('should generate caret-coral-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-coral-500'])
      expect(css).toContain('caret-color: var(--color-coral-500)')
    })

    it('should generate caret-blue-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-blue-500'])
      expect(css).toContain('caret-color: var(--color-blue-500)')
    })

    it('should generate caret-red-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-red-500'])
      expect(css).toContain('caret-color: var(--color-red-500)')
    })

    it('should generate caret-green-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-green-500'])
      expect(css).toContain('caret-color: var(--color-green-500)')
    })

    it('should generate caret-purple-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-purple-500'])
      expect(css).toContain('caret-color: var(--color-purple-500)')
    })

    it('should note caret-transparent is not implemented', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-transparent'])
      expect(css).toBe('')
    })
  })

  describe('Place Items', () => {
    it('should generate place-items-start', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-start'])
      expect(css).toContain('place-items: start')
    })

    it('should generate place-items-end', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-end'])
      expect(css).toContain('place-items: end')
    })

    it('should generate place-items-center', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-center'])
      expect(css).toContain('place-items: center')
    })

    it('should generate place-items-baseline', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-baseline'])
      expect(css).toContain('place-items: baseline')
    })

    it('should generate place-items-stretch', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-stretch'])
      expect(css).toContain('place-items: stretch')
    })
  })

  describe('Place Self', () => {
    it('should note place-self-auto is not implemented', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-auto'])
      expect(css).toBe('')
    })

    it('should generate place-self-start', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-start'])
      expect(css).toContain('place-self: start')
    })

    it('should generate place-self-end', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-end'])
      expect(css).toContain('place-self: end')
    })

    it('should generate place-self-center', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-center'])
      expect(css).toContain('place-self: center')
    })

    it('should generate place-self-stretch', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-stretch'])
      expect(css).toContain('place-self: stretch')
    })
  })

  describe('Place Content', () => {
    it('should generate place-content-center', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-center'])
      expect(css).toContain('place-content: center')
    })

    it('should generate place-content-start', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-start'])
      expect(css).toContain('place-content: start')
    })

    it('should generate place-content-end', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-end'])
      expect(css).toContain('place-content: end')
    })

    it('should generate place-content-between', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-between'])
      expect(css).toContain('place-content: between')
    })

    it('should generate place-content-around', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-around'])
      expect(css).toContain('place-content: around')
    })

    it('should generate place-content-evenly', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-evenly'])
      expect(css).toContain('place-content: evenly')
    })

    it('should generate place-content-stretch', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-stretch'])
      expect(css).toContain('place-content: stretch')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate custom caret color input with CSS variable', () => {
      const coral = createCoral({
        plugins: [caretPlacePlugin()],
        theme: { colors: { coral: { 500: '#ff6b6b' } } }
      })
      const css = coral.generate(['caret-coral-500', 'border', 'rounded', 'px-3'])
      expect(css).toContain('caret-color: var(--color-coral-500)')
    })

    it('should generate centered grid item', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-center'])
      expect(css).toContain('place-items: center')
    })

    it('should generate centered grid cell', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-center'])
      expect(css).toContain('place-self: center')
    })

    it('should generate centered flex/grid content', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-center'])
      expect(css).toContain('place-content: center')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-coral-500', 'caret-blue-500'])
      expect(css).toContain('caret-color: var(--color-coral-500)')
      expect(css).toContain('caret-color: var(--color-blue-500)')
    })
  })

  describe('Combined Utilities', () => {
    it('should combine place-items with place-self', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-center', 'place-self-stretch'])
      expect(css).toContain('place-items: center')
      expect(css).toContain('place-self: stretch')
    })

    it('should note focus variants require variants plugin', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-coral-500'])
      expect(css).toContain('caret-color: var(--color-coral-500)')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate arbitrary caret color', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-[#ff00ff]'])
      expect(css).toContain('caret-color: #ff00ff')
    })

    it('should generate arbitrary caret color with underscore replacement', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-[var(--my_custom_color)]'])
      expect(css).toContain('caret-color: var(--my custom color)')
    })

    it('should handle empty arbitrary caret value', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary place-items', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-[safe_center]'])
      expect(css).toContain('place-items: safe center')
    })

    it('should handle empty arbitrary place-items', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-items-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary place-self', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-[auto]'])
      expect(css).toContain('place-self: auto')
    })

    it('should handle empty arbitrary place-self', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-self-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary place-content', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-[space-between_center]'])
      expect(css).toContain('place-content: space-between center')
    })

    it('should handle empty arbitrary place-content', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['place-content-[]'])
      expect(css).toBe('')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/caret-place'
      )
      expect(defaultExport).toBe(caretPlacePlugin)
    })
  })

  describe('Additional Caret Colors', () => {
    it('should generate caret-white', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-white'])
      expect(css).toContain('caret-color: #ffffff')
    })

    it('should generate caret-black', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })
      const css = coral.generate(['caret-black'])
      expect(css).toContain('caret-color: #000000')
    })

    it('should generate all shade levels', () => {
      const coral = createCoral({ plugins: [caretPlacePlugin()] })

      // Test shade 50
      expect(coral.generate(['caret-coral-50'])).toContain('var(--color-coral-50)')

      // Test shade 950
      expect(coral.generate(['caret-coral-950'])).toContain('var(--color-coral-950)')
    })
  })
})
