/**
 * SVG Utilities Plugin
 *
 * Fill, stroke, and SVG-specific utilities.
 * @module plugins/core/utilities/svg
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { colors } from '../../../theme'

/**
 * SVG utilities plugin
 */
export function svgPlugin(): Plugin {
  return {
    name: 'svg',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Fill utilities
      rules.push({ pattern: 'fill-none', properties: { fill: 'none' } })
      rules.push({ pattern: 'fill-inherit', properties: { fill: 'inherit' } })
      rules.push({ pattern: 'fill-current', properties: { fill: 'currentColor' } })
      rules.push({ pattern: 'fill-transparent', properties: { fill: 'transparent' } })
      rules.push({ pattern: 'fill-black', properties: { fill: '#000000' } })
      rules.push({ pattern: 'fill-white', properties: { fill: '#ffffff' } })

      // Semantic fill colors
      rules.push({ pattern: 'fill-foreground', properties: { fill: 'hsl(var(--foreground))' } })
      rules.push({ pattern: 'fill-primary', properties: { fill: 'hsl(var(--primary))' } })
      rules.push({ pattern: 'fill-secondary', properties: { fill: 'hsl(var(--secondary))' } })
      rules.push({ pattern: 'fill-muted', properties: { fill: 'hsl(var(--muted))' } })
      rules.push({ pattern: 'fill-muted-foreground', properties: { fill: 'hsl(var(--muted-foreground))' } })
      rules.push({ pattern: 'fill-accent', properties: { fill: 'hsl(var(--accent))' } })
      rules.push({ pattern: 'fill-destructive', properties: { fill: 'hsl(var(--destructive))' } })

      // Fill with color palette
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object' && '50' in colorValue) {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `fill-${colorName}-${shade}`,
              properties: { fill: hex as string },
            })
          }
        }
      }

      // Arbitrary fill
      rules.push({
        pattern: /^fill-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { fill: v } }
        },
      })

      // Stroke utilities
      rules.push({ pattern: 'stroke-none', properties: { stroke: 'none' } })
      rules.push({ pattern: 'stroke-inherit', properties: { stroke: 'inherit' } })
      rules.push({ pattern: 'stroke-current', properties: { stroke: 'currentColor' } })
      rules.push({ pattern: 'stroke-transparent', properties: { stroke: 'transparent' } })
      rules.push({ pattern: 'stroke-black', properties: { stroke: '#000000' } })
      rules.push({ pattern: 'stroke-white', properties: { stroke: '#ffffff' } })

      // Semantic stroke colors
      rules.push({ pattern: 'stroke-foreground', properties: { stroke: 'hsl(var(--foreground))' } })
      rules.push({ pattern: 'stroke-primary', properties: { stroke: 'hsl(var(--primary))' } })
      rules.push({ pattern: 'stroke-secondary', properties: { stroke: 'hsl(var(--secondary))' } })
      rules.push({ pattern: 'stroke-muted', properties: { stroke: 'hsl(var(--muted))' } })
      rules.push({ pattern: 'stroke-muted-foreground', properties: { stroke: 'hsl(var(--muted-foreground))' } })
      rules.push({ pattern: 'stroke-accent', properties: { stroke: 'hsl(var(--accent))' } })
      rules.push({ pattern: 'stroke-destructive', properties: { stroke: 'hsl(var(--destructive))' } })
      rules.push({ pattern: 'stroke-border', properties: { stroke: 'hsl(var(--border))' } })

      // Stroke with color palette
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object' && '50' in colorValue) {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `stroke-${colorName}-${shade}`,
              properties: { stroke: hex as string },
            })
          }
        }
      }

      // Arbitrary stroke color
      rules.push({
        pattern: /^stroke-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          // Check if it's a width value (number or px)
          if (/^\d/.test(v)) {
            return null // Let stroke-width handle it
          }
          return { properties: { stroke: v } }
        },
      })

      // Stroke width
      rules.push({ pattern: 'stroke-0', properties: { 'stroke-width': '0' } })
      rules.push({ pattern: 'stroke-1', properties: { 'stroke-width': '1' } })
      rules.push({ pattern: 'stroke-2', properties: { 'stroke-width': '2' } })

      // Arbitrary stroke width
      rules.push({
        pattern: /^stroke-\[(\d+(?:\.\d+)?(?:px|rem|em)?)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'stroke-width': v } }
        },
      })

      // Stroke linecap
      rules.push({ pattern: 'stroke-linecap-butt', properties: { 'stroke-linecap': 'butt' } })
      rules.push({ pattern: 'stroke-linecap-round', properties: { 'stroke-linecap': 'round' } })
      rules.push({ pattern: 'stroke-linecap-square', properties: { 'stroke-linecap': 'square' } })

      // Stroke linejoin
      rules.push({ pattern: 'stroke-linejoin-arcs', properties: { 'stroke-linejoin': 'arcs' } })
      rules.push({ pattern: 'stroke-linejoin-bevel', properties: { 'stroke-linejoin': 'bevel' } })
      rules.push({ pattern: 'stroke-linejoin-miter', properties: { 'stroke-linejoin': 'miter' } })
      rules.push({ pattern: 'stroke-linejoin-miter-clip', properties: { 'stroke-linejoin': 'miter-clip' } })
      rules.push({ pattern: 'stroke-linejoin-round', properties: { 'stroke-linejoin': 'round' } })

      // Stroke dasharray
      rules.push({ pattern: 'stroke-dash-none', properties: { 'stroke-dasharray': 'none' } })
      rules.push({ pattern: 'stroke-dash-2', properties: { 'stroke-dasharray': '2' } })
      rules.push({ pattern: 'stroke-dash-4', properties: { 'stroke-dasharray': '4' } })
      rules.push({ pattern: 'stroke-dash-6', properties: { 'stroke-dasharray': '6' } })

      // Arbitrary dasharray
      rules.push({
        pattern: /^stroke-dash-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'stroke-dasharray': v } }
        },
      })

      // Stroke dashoffset
      rules.push({ pattern: 'stroke-dashoffset-0', properties: { 'stroke-dashoffset': '0' } })
      rules.push({ pattern: 'stroke-dashoffset-1', properties: { 'stroke-dashoffset': '1' } })
      rules.push({ pattern: 'stroke-dashoffset-2', properties: { 'stroke-dashoffset': '2' } })

      // Arbitrary dashoffset
      rules.push({
        pattern: /^stroke-dashoffset-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'stroke-dashoffset': v } }
        },
      })

      // Fill rule
      rules.push({ pattern: 'fill-rule-nonzero', properties: { 'fill-rule': 'nonzero' } })
      rules.push({ pattern: 'fill-rule-evenodd', properties: { 'fill-rule': 'evenodd' } })

      // Clip rule
      rules.push({ pattern: 'clip-rule-nonzero', properties: { 'clip-rule': 'nonzero' } })
      rules.push({ pattern: 'clip-rule-evenodd', properties: { 'clip-rule': 'evenodd' } })

      // Paint order
      rules.push({ pattern: 'paint-order-normal', properties: { 'paint-order': 'normal' } })
      rules.push({ pattern: 'paint-order-stroke', properties: { 'paint-order': 'stroke' } })
      rules.push({ pattern: 'paint-order-fill', properties: { 'paint-order': 'fill' } })
      rules.push({ pattern: 'paint-order-markers', properties: { 'paint-order': 'markers' } })

      // Vector effect
      rules.push({ pattern: 'vector-effect-none', properties: { 'vector-effect': 'none' } })
      rules.push({ pattern: 'vector-effect-non-scaling-stroke', properties: { 'vector-effect': 'non-scaling-stroke' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default svgPlugin
