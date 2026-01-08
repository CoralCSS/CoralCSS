/**
 * Border Utilities Plugin
 *
 * Border, border-radius, outline, ring, and divide utilities.
 * @module plugins/core/utilities/borders
 */

import type { Plugin, Rule, PluginContext, CSSProperties } from '../../../types'
import { borderRadius, borderWidth } from '../../../theme'

/**
 * Border utilities plugin
 */
export function bordersPlugin(): Plugin {
  return {
    name: 'borders',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Border radius
      for (const [key, value] of Object.entries(borderRadius)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `rounded${suffix}`, properties: { 'border-radius': value } })
        rules.push({ pattern: `rounded-t${suffix}`, properties: { 'border-top-left-radius': value, 'border-top-right-radius': value } })
        rules.push({ pattern: `rounded-r${suffix}`, properties: { 'border-top-right-radius': value, 'border-bottom-right-radius': value } })
        rules.push({ pattern: `rounded-b${suffix}`, properties: { 'border-bottom-right-radius': value, 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-l${suffix}`, properties: { 'border-top-left-radius': value, 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-tl${suffix}`, properties: { 'border-top-left-radius': value } })
        rules.push({ pattern: `rounded-tr${suffix}`, properties: { 'border-top-right-radius': value } })
        rules.push({ pattern: `rounded-br${suffix}`, properties: { 'border-bottom-right-radius': value } })
        rules.push({ pattern: `rounded-bl${suffix}`, properties: { 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-s${suffix}`, properties: { 'border-start-start-radius': value, 'border-end-start-radius': value } })
        rules.push({ pattern: `rounded-e${suffix}`, properties: { 'border-start-end-radius': value, 'border-end-end-radius': value } })
        rules.push({ pattern: `rounded-ss${suffix}`, properties: { 'border-start-start-radius': value } })
        rules.push({ pattern: `rounded-se${suffix}`, properties: { 'border-start-end-radius': value } })
        rules.push({ pattern: `rounded-ee${suffix}`, properties: { 'border-end-end-radius': value } })
        rules.push({ pattern: `rounded-es${suffix}`, properties: { 'border-end-start-radius': value } })
      }

      // Border width
      for (const [key, value] of Object.entries(borderWidth)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `border${suffix}`, properties: { 'border-width': value } })
        rules.push({ pattern: `border-x${suffix}`, properties: { 'border-left-width': value, 'border-right-width': value } })
        rules.push({ pattern: `border-y${suffix}`, properties: { 'border-top-width': value, 'border-bottom-width': value } })
        rules.push({ pattern: `border-t${suffix}`, properties: { 'border-top-width': value } })
        rules.push({ pattern: `border-r${suffix}`, properties: { 'border-right-width': value } })
        rules.push({ pattern: `border-b${suffix}`, properties: { 'border-bottom-width': value } })
        rules.push({ pattern: `border-l${suffix}`, properties: { 'border-left-width': value } })
        rules.push({ pattern: `border-s${suffix}`, properties: { 'border-inline-start-width': value } })
        rules.push({ pattern: `border-e${suffix}`, properties: { 'border-inline-end-width': value } })
      }

      // Border style
      rules.push({ pattern: 'border-solid', properties: { 'border-style': 'solid' } })
      rules.push({ pattern: 'border-dashed', properties: { 'border-style': 'dashed' } })
      rules.push({ pattern: 'border-dotted', properties: { 'border-style': 'dotted' } })
      rules.push({ pattern: 'border-double', properties: { 'border-style': 'double' } })
      rules.push({ pattern: 'border-hidden', properties: { 'border-style': 'hidden' } })
      rules.push({ pattern: 'border-none', properties: { 'border-style': 'none' } })

      // Divide width (between children)
      for (const [key, value] of Object.entries(borderWidth)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `divide-x${suffix}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'border-left-width': value },
        })
        rules.push({
          pattern: `divide-y${suffix}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'border-top-width': value },
        })
      }

      // Divide style
      rules.push({
        pattern: 'divide-solid',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'solid' },
      })
      rules.push({
        pattern: 'divide-dashed',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'dashed' },
      })
      rules.push({
        pattern: 'divide-dotted',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'dotted' },
      })
      rules.push({
        pattern: 'divide-double',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'double' },
      })
      rules.push({
        pattern: 'divide-none',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'none' },
      })

      // Outline width
      rules.push({ pattern: 'outline-0', properties: { 'outline-width': '0px' } })
      rules.push({ pattern: 'outline-1', properties: { 'outline-width': '1px' } })
      rules.push({ pattern: 'outline-2', properties: { 'outline-width': '2px' } })
      rules.push({ pattern: 'outline-4', properties: { 'outline-width': '4px' } })
      rules.push({ pattern: 'outline-8', properties: { 'outline-width': '8px' } })

      // Outline style
      rules.push({ pattern: 'outline', properties: { 'outline-style': 'solid' } })
      rules.push({ pattern: 'outline-none', properties: { outline: '2px solid transparent', 'outline-offset': '2px' } })
      rules.push({ pattern: 'outline-dashed', properties: { 'outline-style': 'dashed' } })
      rules.push({ pattern: 'outline-dotted', properties: { 'outline-style': 'dotted' } })
      rules.push({ pattern: 'outline-double', properties: { 'outline-style': 'double' } })

      // Outline offset
      rules.push({ pattern: 'outline-offset-0', properties: { 'outline-offset': '0px' } })
      rules.push({ pattern: 'outline-offset-1', properties: { 'outline-offset': '1px' } })
      rules.push({ pattern: 'outline-offset-2', properties: { 'outline-offset': '2px' } })
      rules.push({ pattern: 'outline-offset-4', properties: { 'outline-offset': '4px' } })
      rules.push({ pattern: 'outline-offset-8', properties: { 'outline-offset': '8px' } })

      // Ring (box-shadow based)
      rules.push({
        pattern: 'ring',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(3px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-0',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(0px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-1',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(1px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-2',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(2px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-4',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(4px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-8',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(8px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({ pattern: 'ring-inset', properties: { '--coral-ring-inset': 'inset' } })

      // Ring offset
      rules.push({ pattern: 'ring-offset-0', properties: { '--coral-ring-offset-width': '0px' } })
      rules.push({ pattern: 'ring-offset-1', properties: { '--coral-ring-offset-width': '1px' } })
      rules.push({ pattern: 'ring-offset-2', properties: { '--coral-ring-offset-width': '2px' } })
      rules.push({ pattern: 'ring-offset-4', properties: { '--coral-ring-offset-width': '4px' } })
      rules.push({ pattern: 'ring-offset-8', properties: { '--coral-ring-offset-width': '8px' } })

      // Arbitrary values
      rules.push({
        pattern: /^rounded-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-radius': value } }
        },
      })
      rules.push({
        pattern: /^border-\[(.+)\]$/,
        handler: (match): { properties: CSSProperties } | null => {
          const value = match[1]
          if (!value) return null
          // Check if it's a width value
          if (/^\d/.test(value) || value.includes('px') || value.includes('rem')) {
            return { properties: { 'border-width': value } as CSSProperties }
          }
          // Otherwise treat as color
          return { properties: { 'border-color': value } as CSSProperties }
        },
      })
      rules.push({
        pattern: /^outline-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { outline: value } }
        },
      })
      rules.push({
        pattern: /^outline-offset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'outline-offset': value } }
        },
      })
      rules.push({
        pattern: /^ring-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: {
              '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
              '--coral-ring-shadow': `var(--coral-ring-inset) 0 0 0 calc(${value} + var(--coral-ring-offset-width)) var(--coral-ring-color)`,
              'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
            },
          }
        },
      })
      rules.push({
        pattern: /^ring-offset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-ring-offset-width': value } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default bordersPlugin
