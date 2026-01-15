/**
 * Text Shadow Utilities Plugin Tests
 *
 * Tests for text shadow utilities including base shadows, colored shadows,
 * opacity modifiers, and special effects.
 * @module tests/unit/plugins/core/utilities/text-shadows
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { textShadowsPlugin } from '../../../../../src/plugins/core/utilities/text-shadows'

describe('Text Shadow Utilities Plugin', () => {
  it('should generate base text shadows', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-2xs'])
    expect(css).toContain('text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)')
  })

  it('should generate text-shadow-xs', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-xs'])
    expect(css).toContain('text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15)')
  })

  it('should generate text-shadow-sm', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-sm'])
    expect(css).toContain('text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)')
  })

  it('should generate text-shadow-md', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-md'])
    expect(css).toContain('text-shadow: 0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)')
  })

  it('should generate text-shadow-lg', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-lg'])
    expect(css).toContain('text-shadow: 0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)')
  })

  it('should generate text-shadow-xl', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-xl'])
    expect(css).toContain('text-shadow: 0 20px 25px rgba(0, 0, 0, 0.35), 0 8px 10px rgba(0, 0, 0, 0.25)')
  })

  it('should generate text-shadow-2xl', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-2xl'])
    expect(css).toContain('text-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.3)')
  })

  it('should generate text-shadow-none', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-none'])
    expect(css).toContain('text-shadow: none')
  })

  it('should support opacity modifiers', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-lg/50'])
    expect(css).toContain('text-shadow')
  })

  it('should support opacity modifier for md', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-md/20'])
    expect(css).toContain('text-shadow')
  })

  it('should generate colored text shadows', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-red-500'])
    expect(css).toContain('--text-shadow-color: var(--color-red-500)')
    expect(css).toContain('text-shadow: 0 4px 6px var(--text-shadow-color)')
  })

  it('should support colored shadows with opacity', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-cyan-500/50'])
    expect(css).toContain('text-shadow')
    expect(css).toContain('var(--color-cyan-500)')
  })

  it('should support arbitrary values', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-[0_2px_10px_rgba(255,0,0,0.5)]'])
    expect(css).toContain('text-shadow: 0 2px 10px rgba(255,0,0,0.5)')
  })

  it('should generate embossed effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-embossed'])
    expect(css).toContain('text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2)')
  })

  it('should generate debossed effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-debossed'])
    expect(css).toContain('text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.8), 1px 1px 1px rgba(0, 0, 0, 0.2)')
  })

  it('should generate neon effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-neon'])
    expect(css).toContain('text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor')
  })

  it('should generate neon-lg effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-neon-lg'])
    expect(css).toContain('text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor')
  })

  it('should generate 3d effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-3d'])
    expect(css).toContain('text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 0 #aaa, 4px 4px 0 #999')
  })

  it('should generate outline effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-outline'])
    expect(css).toContain('text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['hover:text-shadow-md', 'dark:text-shadow-neon'])
    expect(css).toContain('.hover\\:text-shadow-md')
    expect(css).toContain('.dark\\:text-shadow-neon')
  })

  it('should generate multiple text shadow utilities together', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate([
      'text-shadow-md',
      'text-shadow-red-500',
      'text-shadow-neon'
    ])
    expect(css).toContain('text-shadow')
  })

  describe('Opacity Modifiers - All Sizes', () => {
    it('should generate text-shadow-2xs/50 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-2xs/50'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-xs/30 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-xs/30'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-sm/75 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-sm/75'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-xl/25 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-xl/25'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-2xl/15 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-2xl/15'])
      expect(css).toContain('text-shadow')
    })
  })

  describe('Colored Shadows with Opacity', () => {
    it('should generate text-shadow-coral-500/50 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-coral-500/50'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-coral-500)')
    })

    it('should generate text-shadow-blue-600/25 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-blue-600/25'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-blue-600)')
    })

    it('should generate text-shadow-red-400/75 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-red-400/75'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-red-400)')
    })

    it('should generate text-shadow-emerald-700/10 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-emerald-700/10'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-emerald-700)')
    })
  })

  describe('Empty Arbitrary Values', () => {
    it('should handle empty arbitrary text-shadow', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-[]'])
      expect(css).toBe('')
    })
  })

  describe('Plugin Metadata', () => {
    it('should have correct name', () => {
      const plugin = textShadowsPlugin()
      expect(plugin.name).toBe('text-shadows')
    })

    it('should have correct version', () => {
      const plugin = textShadowsPlugin()
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/text-shadows'
      )
      expect(defaultExport).toBe(textShadowsPlugin)
    })
  })

  describe('Opacity Modifiers - Detailed Coverage', () => {
    it('should generate text-shadow-2xs/50 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-2xs/50'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-xs/25 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-xs/25'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-sm/10 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-sm/10'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-md/100 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-md/100'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-lg/75 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-lg/75'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-xl/5 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-xl/5'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-2xl/90 class', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-2xl/90'])
      expect(css).toContain('text-shadow')
    })

    it('should not match unknown size with opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      // This should not match since 'unknown' is not in pattern
      const css = coral.generate(['text-shadow-unknown/50'])
      expect(css).toBe('')
    })
  })

  describe('Colored Shadows with Opacity - Detailed Coverage', () => {
    it('should generate colored shadow with 10% opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-slate-500/10'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-slate-500)')
    })

    it('should generate colored shadow with 25% opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-gray-400/25'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-gray-400)')
    })

    it('should generate colored shadow with 50% opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-zinc-600/50'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-zinc-600)')
    })

    it('should generate colored shadow with 75% opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-neutral-700/75'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-neutral-700)')
    })

    it('should generate colored shadow with 100% opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-stone-800/100'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('var(--color-stone-800)')
    })

    it('should handle all color shades with opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
      for (const shade of shades) {
        const css = coral.generate([`text-shadow-orange-${shade}/50`])
        expect(css).toContain(`var(--color-orange-${shade})`)
      }
    })

    it('should handle all colors with opacity', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const colors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose'
      ]
      for (const color of colors) {
        const css = coral.generate([`text-shadow-${color}-500/50`])
        expect(css).toContain(`var(--color-${color}-500)`)
      }
    })
  })

  describe('Arbitrary Values - Edge Cases', () => {
    it('should handle arbitrary value with spaces (underscores)', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'])
      expect(css).toContain('text-shadow: 0 4px 8px rgba(0,0,0,0.3)')
    })

    it('should handle complex arbitrary shadow', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-[1px_1px_2px_black,_0_0_1em_blue]'])
      expect(css).toContain('text-shadow: 1px 1px 2px black, 0 0 1em blue')
    })

    it('should handle arbitrary value with CSS variable', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const css = coral.generate(['text-shadow-[0_0_10px_var(--my-color)]'])
      expect(css).toContain('text-shadow: 0 0 10px var(--my-color)')
    })
  })

  describe('All Color Variants', () => {
    it('should generate all shades for a color', () => {
      const coral = createCoral({ plugins: [textShadowsPlugin()] })
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
      for (const shade of shades) {
        const css = coral.generate([`text-shadow-amber-${shade}`])
        expect(css).toContain(`--text-shadow-color: var(--color-amber-${shade})`)
      }
    })
  })
})
