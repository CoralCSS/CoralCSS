/**
 * Responsive Variants Plugin
 *
 * Breakpoint-based responsive variants.
 * @module plugins/core/variants/responsive
 */

import type { Plugin, Variant, PluginContext } from '../../../types'
import { screens } from '../../../theme'

/**
 * Responsive variants plugin
 */
export function responsiveVariantsPlugin(): Plugin {
  return {
    name: 'responsive-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // Standard breakpoints (min-width)
      for (const [name, width] of Object.entries(screens)) {
        variants.push({
          name,
          match: name,
          handler: (selector) => selector,
          wrapper: (css: string) => `@media (min-width: ${width}) { ${css} }`,
        })
      }

      // Max-width breakpoints
      for (const [name, width] of Object.entries(screens)) {
        // Calculate max-width as 1px less than min-width
        const maxWidth = `${parseInt(width, 10) - 1}px`
        variants.push({
          name: `max-${name}`,
          match: `max-${name}`,
          handler: (selector) => selector,
          wrapper: (css: string) => `@media (max-width: ${maxWidth}) { ${css} }`,
        })
      }

      // Range breakpoints (between two breakpoints)
      const breakpointNames = Object.keys(screens) as Array<keyof typeof screens>
      for (let i = 0; i < breakpointNames.length - 1; i++) {
        const minName = breakpointNames[i]
        const maxName = breakpointNames[i + 1]
        if (!minName || !maxName) {continue}
        const minWidth = screens[minName]
        const maxWidth = `${parseInt(screens[maxName], 10) - 1}px`

        variants.push({
          name: `${minName}-only`,
          match: `${minName}-only`,
          handler: (selector) => selector,
          wrapper: (css: string) => `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}) { ${css} }`,
        })
      }

      // Portrait and landscape
      variants.push({
        name: 'portrait',
        match: 'portrait',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (orientation: portrait) { ${css} }`,
      })
      variants.push({
        name: 'landscape',
        match: 'landscape',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (orientation: landscape) { ${css} }`,
      })

      // Print
      variants.push({
        name: 'print',
        match: 'print',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media print { ${css} }`,
      })

      // Reduced motion
      variants.push({
        name: 'motion-safe',
        match: 'motion-safe',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (prefers-reduced-motion: no-preference) { ${css} }`,
      })
      variants.push({
        name: 'motion-reduce',
        match: 'motion-reduce',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (prefers-reduced-motion: reduce) { ${css} }`,
      })

      // Contrast preferences
      variants.push({
        name: 'contrast-more',
        match: 'contrast-more',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (prefers-contrast: more) { ${css} }`,
      })
      variants.push({
        name: 'contrast-less',
        match: 'contrast-less',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (prefers-contrast: less) { ${css} }`,
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default responsiveVariantsPlugin
