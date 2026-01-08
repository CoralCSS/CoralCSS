/**
 * Dark Mode Variants Plugin
 *
 * Dark mode and color scheme variants.
 * @module plugins/core/variants/dark
 */

import type { Plugin, Variant, PluginContext, DarkModeStrategy } from '../../../types'

/**
 * Dark mode variants plugin options
 */
export interface DarkModeVariantsOptions {
  strategy?: DarkModeStrategy
  selector?: string
}

/**
 * Dark mode variants plugin
 */
export function darkModeVariantsPlugin(options: DarkModeVariantsOptions = {}): Plugin {
  const { strategy = 'class', selector = '.dark' } = options

  return {
    name: 'dark-mode-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // Dark mode variant
      switch (strategy) {
        case 'class':
          variants.push({
            name: 'dark',
            handler: (s) => `${selector} ${s}`,
          })
          variants.push({
            name: 'light',
            handler: (s) => `.light ${s}`,
          })
          break

        case 'media':
          variants.push({
            name: 'dark',
            handler: (s) => s,
            wrapper: (css) => `@media (prefers-color-scheme: dark) { ${css} }`,
          })
          variants.push({
            name: 'light',
            handler: (s) => s,
            wrapper: (css) => `@media (prefers-color-scheme: light) { ${css} }`,
          })
          break

        case 'selector':
          variants.push({
            name: 'dark',
            handler: (s) => `${selector} ${s}`,
          })
          variants.push({
            name: 'light',
            handler: (s) => `[data-theme="light"] ${s}`,
          })
          break

        case 'auto':
          // Support both class and media query
          variants.push({
            name: 'dark',
            handler: (s) => `${selector} ${s}`,
          })
          // Also add a media query variant for auto detection
          variants.push({
            name: 'dark-media',
            handler: (s) => s,
            wrapper: (css) => `@media (prefers-color-scheme: dark) { ${css} }`,
          })
          variants.push({
            name: 'light',
            handler: (s) => `.light ${s}`,
          })
          break
      }

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default darkModeVariantsPlugin
