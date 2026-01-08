/**
 * Sizing Utilities Plugin
 *
 * Width, height, min/max sizing utilities.
 * @module plugins/core/utilities/sizing
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { sizing, heightSizing, maxWidth } from '../../../theme'

/**
 * Sizing utilities plugin
 */
export function sizingPlugin(): Plugin {
  return {
    name: 'sizing',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Width
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `w-${key}`,
          properties: { width: value },
        })
      }

      // Height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `h-${key}`,
          properties: { height: value },
        })
      }

      // Min-width
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `min-w-${key}`,
          properties: { 'min-width': value },
        })
      }

      // Max-width (uses different scale)
      for (const [key, value] of Object.entries(maxWidth)) {
        rules.push({
          pattern: `max-w-${key}`,
          properties: { 'max-width': value },
        })
      }

      // Min-height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `min-h-${key}`,
          properties: { 'min-height': value },
        })
      }

      // Max-height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `max-h-${key}`,
          properties: { 'max-height': value },
        })
      }

      // Size (width and height together)
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `size-${key}`,
          properties: { width: value, height: value },
        })
      }

      // Arbitrary values
      rules.push({
        pattern: /^w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { width: v } } },
      })
      rules.push({
        pattern: /^h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { height: v } } },
      })
      rules.push({
        pattern: /^min-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'min-width': v } } },
      })
      rules.push({
        pattern: /^max-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'max-width': v } } },
      })
      rules.push({
        pattern: /^min-h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'min-height': v } } },
      })
      rules.push({
        pattern: /^max-h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'max-height': v } } },
      })
      rules.push({
        pattern: /^size-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { width: v, height: v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default sizingPlugin
