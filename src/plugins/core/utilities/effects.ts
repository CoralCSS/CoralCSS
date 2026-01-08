/**
 * Effects Utilities Plugin
 *
 * Box shadow, opacity, mix-blend-mode utilities.
 * @module plugins/core/utilities/effects
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { boxShadow } from '../../../theme'

/**
 * Effects utilities plugin
 */
export function effectsPlugin(): Plugin {
  return {
    name: 'effects',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Box shadow
      for (const [key, value] of Object.entries(boxShadow)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `shadow${suffix}`,
          properties: {
            '--coral-shadow': value,
            'box-shadow': 'var(--coral-ring-offset-shadow, 0 0 #0000), var(--coral-ring-shadow, 0 0 #0000), var(--coral-shadow)',
          },
        })
      }

      // Mix blend mode
      rules.push({ pattern: 'mix-blend-normal', properties: { 'mix-blend-mode': 'normal' } })
      rules.push({ pattern: 'mix-blend-multiply', properties: { 'mix-blend-mode': 'multiply' } })
      rules.push({ pattern: 'mix-blend-screen', properties: { 'mix-blend-mode': 'screen' } })
      rules.push({ pattern: 'mix-blend-overlay', properties: { 'mix-blend-mode': 'overlay' } })
      rules.push({ pattern: 'mix-blend-darken', properties: { 'mix-blend-mode': 'darken' } })
      rules.push({ pattern: 'mix-blend-lighten', properties: { 'mix-blend-mode': 'lighten' } })
      rules.push({ pattern: 'mix-blend-color-dodge', properties: { 'mix-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'mix-blend-color-burn', properties: { 'mix-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'mix-blend-hard-light', properties: { 'mix-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'mix-blend-soft-light', properties: { 'mix-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'mix-blend-difference', properties: { 'mix-blend-mode': 'difference' } })
      rules.push({ pattern: 'mix-blend-exclusion', properties: { 'mix-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'mix-blend-hue', properties: { 'mix-blend-mode': 'hue' } })
      rules.push({ pattern: 'mix-blend-saturation', properties: { 'mix-blend-mode': 'saturation' } })
      rules.push({ pattern: 'mix-blend-color', properties: { 'mix-blend-mode': 'color' } })
      rules.push({ pattern: 'mix-blend-luminosity', properties: { 'mix-blend-mode': 'luminosity' } })
      rules.push({ pattern: 'mix-blend-plus-darker', properties: { 'mix-blend-mode': 'plus-darker' } })
      rules.push({ pattern: 'mix-blend-plus-lighter', properties: { 'mix-blend-mode': 'plus-lighter' } })

      // Background blend mode
      rules.push({ pattern: 'bg-blend-normal', properties: { 'background-blend-mode': 'normal' } })
      rules.push({ pattern: 'bg-blend-multiply', properties: { 'background-blend-mode': 'multiply' } })
      rules.push({ pattern: 'bg-blend-screen', properties: { 'background-blend-mode': 'screen' } })
      rules.push({ pattern: 'bg-blend-overlay', properties: { 'background-blend-mode': 'overlay' } })
      rules.push({ pattern: 'bg-blend-darken', properties: { 'background-blend-mode': 'darken' } })
      rules.push({ pattern: 'bg-blend-lighten', properties: { 'background-blend-mode': 'lighten' } })
      rules.push({ pattern: 'bg-blend-color-dodge', properties: { 'background-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'bg-blend-color-burn', properties: { 'background-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'bg-blend-hard-light', properties: { 'background-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'bg-blend-soft-light', properties: { 'background-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'bg-blend-difference', properties: { 'background-blend-mode': 'difference' } })
      rules.push({ pattern: 'bg-blend-exclusion', properties: { 'background-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'bg-blend-hue', properties: { 'background-blend-mode': 'hue' } })
      rules.push({ pattern: 'bg-blend-saturation', properties: { 'background-blend-mode': 'saturation' } })
      rules.push({ pattern: 'bg-blend-color', properties: { 'background-blend-mode': 'color' } })
      rules.push({ pattern: 'bg-blend-luminosity', properties: { 'background-blend-mode': 'luminosity' } })

      // Arbitrary values
      rules.push({
        pattern: /^shadow-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: {
              '--coral-shadow': value,
              'box-shadow': 'var(--coral-ring-offset-shadow, 0 0 #0000), var(--coral-ring-shadow, 0 0 #0000), var(--coral-shadow)',
            },
          }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default effectsPlugin
