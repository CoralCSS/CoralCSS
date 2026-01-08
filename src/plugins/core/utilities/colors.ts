/**
 * Color Utilities Plugin
 *
 * Background, text, border, and other color utilities.
 * @module plugins/core/utilities/colors
 */

import type { Plugin, Rule, PluginContext, ColorScale } from '../../../types'
import { colors, opacity } from '../../../theme'

/**
 * Generate color rules for a property prefix
 */
function createColorRules(
  prefix: string,
  property: string,
  colorScale: Record<string, string | ColorScale>
): Rule[] {
  const rules: Rule[] = []

  for (const [colorName, colorValue] of Object.entries(colorScale)) {
    if (typeof colorValue === 'string') {
      // Simple color value (inherit, current, transparent, black, white)
      rules.push({
        pattern: `${prefix}-${colorName}`,
        properties: { [property]: colorValue },
      })
    } else if (typeof colorValue === 'object') {
      // Color scale (50-950)
      for (const [shade, hex] of Object.entries(colorValue)) {
        rules.push({
          pattern: `${prefix}-${colorName}-${shade}`,
          properties: { [property]: hex },
        })
      }
    }
  }

  return rules
}

/**
 * Generate color rules with opacity support
 */
function createColorOpacityRules(
  prefix: string,
  property: string,
  colorScale: Record<string, string | ColorScale>
): Rule[] {
  const rules: Rule[] = []

  for (const [colorName, colorValue] of Object.entries(colorScale)) {
    if (typeof colorValue === 'object') {
      for (const [shade, hex] of Object.entries(colorValue)) {
        // With opacity modifier: bg-red-500/50
        rules.push({
          pattern: new RegExp(`^${prefix}-${colorName}-${shade}/(\\d+)$`),
          handler: (match) => {
            const opacityStr = match[1]
            if (!opacityStr) return null
            const opacityValue = parseInt(opacityStr, 10) / 100
            const rgb = hexToRgbValues(hex)
            if (rgb) {
              return {
                properties: {
                  [property]: `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacityValue})`,
                },
              }
            }
            return { properties: { [property]: hex } }
          },
        })
      }
    }
  }

  return rules
}

/**
 * Convert hex to RGB values
 */
function hexToRgbValues(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || !result[1] || !result[2] || !result[3]) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Colors utilities plugin
 */
export function colorsPlugin(): Plugin {
  return {
    name: 'colors',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Background colors
      rules.push(...createColorRules('bg', 'background-color', colors))
      rules.push(...createColorOpacityRules('bg', 'background-color', colors))

      // Text colors
      rules.push(...createColorRules('text', 'color', colors))
      rules.push(...createColorOpacityRules('text', 'color', colors))

      // Border colors
      rules.push(...createColorRules('border', 'border-color', colors))
      rules.push(...createColorOpacityRules('border', 'border-color', colors))
      rules.push(...createColorRules('border-t', 'border-top-color', colors))
      rules.push(...createColorRules('border-r', 'border-right-color', colors))
      rules.push(...createColorRules('border-b', 'border-bottom-color', colors))
      rules.push(...createColorRules('border-l', 'border-left-color', colors))
      rules.push(...createColorRules('border-x', 'border-inline-color', colors))
      rules.push(...createColorRules('border-y', 'border-block-color', colors))

      // Outline colors
      rules.push(...createColorRules('outline', 'outline-color', colors))
      rules.push(...createColorOpacityRules('outline', 'outline-color', colors))

      // Ring colors (box-shadow based)
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `ring-${colorName}-${shade}`,
              properties: {
                '--coral-ring-color': hex,
              },
            })
          }
        }
      }

      // Divide colors (for > * + * selector)
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `divide-${colorName}-${shade}`,
              selector: (s) => `${s} > * + *`,
              properties: { 'border-color': hex },
            })
          }
        }
      }

      // Accent color
      rules.push(...createColorRules('accent', 'accent-color', colors))

      // Caret color
      rules.push(...createColorRules('caret', 'caret-color', colors))

      // Fill color (for SVG)
      rules.push(...createColorRules('fill', 'fill', colors))
      rules.push({ pattern: 'fill-none', properties: { fill: 'none' } })

      // Stroke color (for SVG)
      rules.push(...createColorRules('stroke', 'stroke', colors))
      rules.push({ pattern: 'stroke-none', properties: { stroke: 'none' } })

      // Placeholder color
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `placeholder-${colorName}-${shade}`,
              selector: (s) => `${s}::placeholder`,
              properties: { color: hex },
            })
          }
        }
      }

      // Decoration color (text-decoration-color)
      rules.push(...createColorRules('decoration', 'text-decoration-color', colors))

      // Shadow color
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `shadow-${colorName}-${shade}`,
              properties: {
                '--coral-shadow-color': hex,
              },
            })
          }
        }
      }

      // Arbitrary color values
      rules.push({
        pattern: /^bg-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'background-color': value } }
        },
      })
      rules.push({
        pattern: /^text-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: value } }
        },
      })
      rules.push({
        pattern: /^border-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-color': value } }
        },
      })

      // Opacity utilities
      for (const [key, value] of Object.entries(opacity)) {
        rules.push({
          pattern: `opacity-${key}`,
          properties: { opacity: value },
        })
      }

      // Arbitrary opacity
      rules.push({
        pattern: /^opacity-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { opacity: value } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default colorsPlugin
