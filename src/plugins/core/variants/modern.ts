/**
 * Modern CSS Variants Plugin
 *
 * Container queries, :has() selector, and other modern CSS variants.
 * @module plugins/core/variants/modern
 */

import type { Plugin, Variant, PluginContext } from '../../../types'
import { containers } from '../../../theme'

/**
 * Modern CSS variants plugin
 */
export function modernVariantsPlugin(): Plugin {
  return {
    name: 'modern-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // Container queries (unnamed container)
      for (const [name, width] of Object.entries(containers)) {
        variants.push({
          name: `@${name}`,
          handler: (selector) => selector,
          wrapper: (css: string) => `@container (min-width: ${width}) { ${css} }`,
        })
      }

      // Named container queries
      variants.push({
        name: '@container',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container { ${css} }`,
      })

      // Container query with arbitrary value
      // This will be handled by pattern matching in the kernel

      // :has() selector variants
      variants.push({
        name: 'has-checked',
        handler: (selector) => `${selector}:has(:checked)`,
      })
      variants.push({
        name: 'has-focus',
        handler: (selector) => `${selector}:has(:focus)`,
      })
      variants.push({
        name: 'has-focus-visible',
        handler: (selector) => `${selector}:has(:focus-visible)`,
      })
      variants.push({
        name: 'has-hover',
        handler: (selector) => `${selector}:has(:hover)`,
      })
      variants.push({
        name: 'has-active',
        handler: (selector) => `${selector}:has(:active)`,
      })

      // Arbitrary :has() selector
      // has-[selector]: pattern will be handled by regex matching

      // Supports query
      variants.push({
        name: 'supports-grid',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (display: grid) { ${css} }`,
      })
      variants.push({
        name: 'supports-flex',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (display: flex) { ${css} }`,
      })
      variants.push({
        name: 'supports-backdrop',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (backdrop-filter: blur(1px)) { ${css} }`,
      })
      variants.push({
        name: 'supports-scroll-snap',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (scroll-snap-type: x mandatory) { ${css} }`,
      })
      variants.push({
        name: 'supports-container',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (container-type: inline-size) { ${css} }`,
      })
      variants.push({
        name: 'supports-anchor',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (anchor-name: --a) { ${css} }`,
      })
      variants.push({
        name: 'supports-has',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports selector(:has(*)) { ${css} }`,
      })

      // :where() and :is() variants for specificity control
      variants.push({
        name: 'where',
        handler: (selector) => `:where(${selector})`,
      })
      variants.push({
        name: 'is',
        handler: (selector) => `:is(${selector})`,
      })
      variants.push({
        name: 'not',
        handler: (selector) => `:not(${selector})`,
      })

      // RTL/LTR variants
      variants.push({
        name: 'rtl',
        handler: (selector) => `[dir="rtl"] ${selector}`,
      })
      variants.push({
        name: 'ltr',
        handler: (selector) => `[dir="ltr"] ${selector}`,
      })

      // Data attribute variants
      variants.push({
        name: 'data-loading',
        handler: (selector) => `${selector}[data-loading]`,
      })
      variants.push({
        name: 'data-active',
        handler: (selector) => `${selector}[data-active]`,
      })
      variants.push({
        name: 'data-selected',
        handler: (selector) => `${selector}[data-selected]`,
      })
      variants.push({
        name: 'data-disabled',
        handler: (selector) => `${selector}[data-disabled]`,
      })
      variants.push({
        name: 'data-open',
        handler: (selector) => `${selector}[data-open]`,
      })
      variants.push({
        name: 'data-closed',
        handler: (selector) => `${selector}[data-closed]`,
      })

      // ARIA state variants
      variants.push({
        name: 'aria-busy',
        handler: (selector) => `${selector}[aria-busy="true"]`,
      })
      variants.push({
        name: 'aria-checked',
        handler: (selector) => `${selector}[aria-checked="true"]`,
      })
      variants.push({
        name: 'aria-disabled',
        handler: (selector) => `${selector}[aria-disabled="true"]`,
      })
      variants.push({
        name: 'aria-expanded',
        handler: (selector) => `${selector}[aria-expanded="true"]`,
      })
      variants.push({
        name: 'aria-hidden',
        handler: (selector) => `${selector}[aria-hidden="true"]`,
      })
      variants.push({
        name: 'aria-pressed',
        handler: (selector) => `${selector}[aria-pressed="true"]`,
      })
      variants.push({
        name: 'aria-readonly',
        handler: (selector) => `${selector}[aria-readonly="true"]`,
      })
      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })
      variants.push({
        name: 'aria-selected',
        handler: (selector) => `${selector}[aria-selected="true"]`,
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default modernVariantsPlugin
