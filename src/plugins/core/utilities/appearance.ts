/**
 * Appearance Utilities Plugin
 *
 * Control the native appearance of form controls.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/appearance
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Appearance utilities plugin
 *
 * @example
 * ```html
 * <input class="appearance-none" />
 *
 * <select class="appearance-auto" />
 * ```
 */
export function appearancePlugin(): Plugin {
  return {
    name: 'appearance',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // Remove default OS styling
      ctx.addRule({
        pattern: 'appearance-none',
        properties: { '-webkit-appearance': 'none', 'appearance': 'none' },
      })

      // Use default OS styling (auto)
      ctx.addRule({
        pattern: 'appearance-auto',
        properties: { '-webkit-appearance': 'auto', 'appearance': 'auto' },
      })

      // Button appearance
      ctx.addRule({
        pattern: 'appearance-button',
        properties: { '-webkit-appearance': 'button', 'appearance': 'button' },
      })

      // Textfield appearance
      ctx.addRule({
        pattern: 'appearance-textfield',
        properties: { '-webkit-appearance': 'textfield', 'appearance': 'textfield' },
      })

      // Searchfield appearance
      ctx.addRule({
        pattern: 'appearance-searchfield',
        properties: { '-webkit-appearance': 'searchfield', 'appearance': 'searchfield' },
      })

      // Checkbox appearance
      ctx.addRule({
        pattern: 'appearance-checkbox',
        properties: { '-webkit-appearance': 'checkbox', 'appearance': 'checkbox' },
      })

      // Radio appearance
      ctx.addRule({
        pattern: 'appearance-radio',
        properties: { '-webkit-appearance': 'radio', 'appearance': 'radio' },
      })

      // Slider appearance
      ctx.addRule({
        pattern: 'appearance-slider-horizontal',
        properties: { '-webkit-appearance': 'slider-horizontal', 'appearance': 'slider-horizontal' },
      })

      // Square button appearance
      ctx.addRule({
        pattern: 'appearance-square-button',
        properties: { '-webkit-appearance': 'square-button', 'appearance': 'square-button' },
      })

      // Menulist appearance (select)
      ctx.addRule({
        pattern: 'appearance-menulist',
        properties: { '-webkit-appearance': 'menulist', 'appearance': 'menulist' },
      })

      // Menulist-button appearance
      ctx.addRule({
        pattern: 'appearance-menulist-button',
        properties: { '-webkit-appearance': 'menulist-button', 'appearance': 'menulist-button' },
      })
    }
  }
}

export default appearancePlugin
