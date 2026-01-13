/**
 * Advanced Typography Utilities Plugin
 *
 * Writing mode, orientation, text align, initial letter, font variant.
 *
 * @module plugins/core/utilities/typography-advanced
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Advanced typography utilities plugin
 *
 * @example
 * ```html
 * <div class="writing-vertical-rl">Vertical text</div>
 * <p class="text-justify">Justified text</p>
 * <p class="first-letter:text-5xl">Drop cap</p>
 * ```
 */
export function typographyAdvancedPlugin(): Plugin {
  return {
    name: 'typography-advanced',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // WRITING MODE
      // ========================================

      ctx.addRule({
        pattern: 'writing-horizontal-tb',
        properties: { 'writing-mode': 'horizontal-tb' },
      })

      ctx.addRule({
        pattern: 'writing-vertical-rl',
        properties: { 'writing-mode': 'vertical-rl' },
      })

      ctx.addRule({
        pattern: 'writing-vertical-lr',
        properties: { 'writing-mode': 'vertical-lr' },
      })

      // ========================================
      // ORIENTATION
      // ========================================

      ctx.addRule({
        pattern: 'orientation-mixed',
        properties: { 'orientation': 'mixed' },
      })

      ctx.addRule({
        pattern: 'orientation-upright',
        properties: { 'orientation': 'upright' },
      })

      // ========================================
      // TEXT ALIGN (Enhanced)
      // ========================================

      ctx.addRule({
        pattern: 'text-left',
        properties: { 'text-align': 'left' },
      })

      ctx.addRule({
        pattern: 'text-center',
        properties: { 'text-align': 'center' },
      })

      ctx.addRule({
        pattern: 'text-right',
        properties: { 'text-align': 'right' },
      })

      ctx.addRule({
        pattern: 'text-justify',
        properties: { 'text-align': 'justify' },
      })

      ctx.addRule({
        pattern: 'text-start',
        properties: { 'text-align': 'start' },
      })

      ctx.addRule({
        pattern: 'text-end',
        properties: { 'text-align': 'end' },
      })

      // ========================================
      // TEXT ALIGN LAST
      // ========================================

      ctx.addRule({
        pattern: 'text-align-last-auto',
        properties: { 'text-align-last': 'auto' },
      })

      ctx.addRule({
        pattern: 'text-align-last-start',
        properties: { 'text-align-last': 'start' },
      })

      ctx.addRule({
        pattern: 'text-align-last-end',
        properties: { 'text-align-last': 'end' },
      })

      ctx.addRule({
        pattern: 'text-align-last-center',
        properties: { 'text-align-last': 'center' },
      })

      ctx.addRule({
        pattern: 'text-align-last-justify',
        properties: { 'text-align-last': 'justify' },
      })

      // ========================================
      // INITIAL LETTER
      // ========================================

      ctx.addRule({
        pattern: 'first-letter',
        properties: { '&::first-letter': { 'content': '""' } },
      })

      // Initial letter sizes
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
      for (const size of sizes) {
        ctx.addRule({
          pattern: `first-letter:${size}`,
          properties: { '&::first-letter': { 'font-size': `var(--text-${size})` } },
        })
      }

      // Initial letter styles
      ctx.addRule({
        pattern: 'first-letter:font-bold',
        properties: { '&::first-letter': { 'font-weight': 'bold' } },
      })

      ctx.addRule({
        pattern: 'first-letter:uppercase',
        properties: { '&::first-letter': { 'text-transform': 'uppercase' } },
      })

      ctx.addRule({
        pattern: 'first-letter:float-left',
        properties: { '&::first-letter': { float: 'left', 'margin-right': '0.5rem' } },
      })

      // ========================================
      // FONT VARIANT
      // ========================================

      // Common variants
      ctx.addRule({
        pattern: 'normal-nums',
        properties: {
          'font-variant-numeric': 'normal',
        },
      })

      ctx.addRule({
        pattern: 'ordinal',
        properties: {
          'font-variant-numeric': 'ordinal',
        },
      })

      ctx.addRule({
        pattern: 'slashed-zero',
        properties: {
          'font-variant-numeric': 'slashed-zero',
        },
      })

      ctx.addRule({
        pattern: 'lining-nums',
        properties: {
          'font-variant-numeric': 'lining-nums',
        },
      })

      ctx.addRule({
        pattern: 'oldstyle-nums',
        properties: {
          'font-variant-numeric': 'oldstyle-nums',
        },
      })

      ctx.addRule({
        pattern: 'proportional-nums',
        properties: {
          'font-variant-numeric': 'proportional-nums',
        },
      })

      ctx.addRule({
        pattern: 'tabular-nums',
        properties: {
          'font-variant-numeric': 'tabular-nums',
        },
      })

      ctx.addRule({
        pattern: 'diagonal-fractions',
        properties: {
          'font-variant-numeric': 'diagonal-fractions',
        },
      })

      ctx.addRule({
        pattern: 'stacked-fractions',
        properties: {
          'font-variant-numeric': 'stacked-fractions',
        },
      })

      // Font features
      ctx.addRule({
        pattern: 'common-ligatures',
        properties: {
          'font-feature-settings': '"clig" 1',
        },
      })

      ctx.addRule({
        pattern: 'discretionary-ligatures',
        properties: {
          'font-feature-settings': '"dlig" 1',
        },
      })

      ctx.addRule({
        pattern: 'no-common-ligatures',
        properties: {
          'font-feature-settings': '"clig" 0',
        },
      })

      // Small caps
      ctx.addRule({
        pattern: 'small-caps',
        properties: {
          'font-variant-caps': 'small-caps',
        },
      })

      ctx.addRule({
        pattern: 'all-small-caps',
        properties: {
          'font-variant-caps': 'all-small-caps',
        },
      })

      ctx.addRule({
        pattern: 'petite-caps',
        properties: {
          'font-variant-caps': 'petite-caps',
        },
      })

      ctx.addRule({
        pattern: 'all-petite-caps',
        properties: {
          'font-variant-caps': 'all-petite-caps',
        },
      })

      // ========================================
      // HYPHENATION
      // ========================================

      ctx.addRule({
        pattern: 'hyphens-none',
        properties: { '-webkit-hyphens': 'none', hyphens: 'none' },
      })

      ctx.addRule({
        pattern: 'hyphens-manual',
        properties: { '-webkit-hyphens': 'manual', hyphens: 'manual' },
      })

      ctx.addRule({
        pattern: 'hyphens-auto',
        properties: { '-webkit-hyphens': 'auto', hyphens: 'auto' },
      })

      // ========================================
      // CHARACTER SPACING
      // ========================================

      const charSpacing = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
      for (const spacing of charSpacing) {
        ctx.addRule({
          pattern: `tracking-${spacing}`,
          properties: { 'letter-spacing': spacing === 'normal' ? 'normal' : `var(--tracking-${spacing})` },
        })
      }

      // Word spacing
      const wordSpacing = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
      for (const spacing of wordSpacing) {
        ctx.addRule({
          pattern: `word-spacing-${spacing}`,
          properties: { 'word-spacing': `var(--word-spacing-${spacing})` },
        })
      }
    }
  }
}

export default typographyAdvancedPlugin
