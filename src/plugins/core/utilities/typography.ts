/**
 * Typography Utilities Plugin
 *
 * Font, text, and typography utilities.
 * @module plugins/core/utilities/typography
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textDecorationThickness,
  textUnderlineOffset,
} from '../../../theme'

/**
 * Typography utilities plugin
 */
export function typographyPlugin(): Plugin {
  return {
    name: 'typography',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Font family
      for (const [key, value] of Object.entries(fonts)) {
        rules.push({
          pattern: `font-${key}`,
          properties: { 'font-family': Array.isArray(value) ? value.join(', ') : value },
        })
      }

      // Font size
      for (const [key, value] of Object.entries(fontSizes)) {
        if (typeof value === 'object' && 'fontSize' in value) {
          rules.push({
            pattern: `text-${key}`,
            properties: {
              'font-size': value.fontSize,
              'line-height': value.lineHeight,
            },
          })
        }
      }

      // Font weight
      for (const [key, value] of Object.entries(fontWeights)) {
        rules.push({
          pattern: `font-${key}`,
          properties: { 'font-weight': value },
        })
      }

      // Font style
      rules.push({ pattern: 'italic', properties: { 'font-style': 'italic' } })
      rules.push({ pattern: 'not-italic', properties: { 'font-style': 'normal' } })

      // Font variant numeric
      rules.push({ pattern: 'normal-nums', properties: { 'font-variant-numeric': 'normal' } })
      rules.push({ pattern: 'ordinal', properties: { 'font-variant-numeric': 'ordinal' } })
      rules.push({ pattern: 'slashed-zero', properties: { 'font-variant-numeric': 'slashed-zero' } })
      rules.push({ pattern: 'lining-nums', properties: { 'font-variant-numeric': 'lining-nums' } })
      rules.push({ pattern: 'oldstyle-nums', properties: { 'font-variant-numeric': 'oldstyle-nums' } })
      rules.push({ pattern: 'proportional-nums', properties: { 'font-variant-numeric': 'proportional-nums' } })
      rules.push({ pattern: 'tabular-nums', properties: { 'font-variant-numeric': 'tabular-nums' } })
      rules.push({ pattern: 'diagonal-fractions', properties: { 'font-variant-numeric': 'diagonal-fractions' } })
      rules.push({ pattern: 'stacked-fractions', properties: { 'font-variant-numeric': 'stacked-fractions' } })

      // Line height
      for (const [key, value] of Object.entries(lineHeights)) {
        rules.push({
          pattern: `leading-${key}`,
          properties: { 'line-height': value },
        })
      }

      // Letter spacing
      for (const [key, value] of Object.entries(letterSpacing)) {
        rules.push({
          pattern: `tracking-${key}`,
          properties: { 'letter-spacing': value },
        })
      }

      // Text alignment
      rules.push({ pattern: 'text-left', properties: { 'text-align': 'left' } })
      rules.push({ pattern: 'text-center', properties: { 'text-align': 'center' } })
      rules.push({ pattern: 'text-right', properties: { 'text-align': 'right' } })
      rules.push({ pattern: 'text-justify', properties: { 'text-align': 'justify' } })
      rules.push({ pattern: 'text-start', properties: { 'text-align': 'start' } })
      rules.push({ pattern: 'text-end', properties: { 'text-align': 'end' } })

      // Vertical alignment
      rules.push({ pattern: 'align-baseline', properties: { 'vertical-align': 'baseline' } })
      rules.push({ pattern: 'align-top', properties: { 'vertical-align': 'top' } })
      rules.push({ pattern: 'align-middle', properties: { 'vertical-align': 'middle' } })
      rules.push({ pattern: 'align-bottom', properties: { 'vertical-align': 'bottom' } })
      rules.push({ pattern: 'align-text-top', properties: { 'vertical-align': 'text-top' } })
      rules.push({ pattern: 'align-text-bottom', properties: { 'vertical-align': 'text-bottom' } })
      rules.push({ pattern: 'align-sub', properties: { 'vertical-align': 'sub' } })
      rules.push({ pattern: 'align-super', properties: { 'vertical-align': 'super' } })

      // Text decoration
      rules.push({ pattern: 'underline', properties: { 'text-decoration-line': 'underline' } })
      rules.push({ pattern: 'overline', properties: { 'text-decoration-line': 'overline' } })
      rules.push({ pattern: 'line-through', properties: { 'text-decoration-line': 'line-through' } })
      rules.push({ pattern: 'no-underline', properties: { 'text-decoration-line': 'none' } })

      // Text decoration style
      rules.push({ pattern: 'decoration-solid', properties: { 'text-decoration-style': 'solid' } })
      rules.push({ pattern: 'decoration-double', properties: { 'text-decoration-style': 'double' } })
      rules.push({ pattern: 'decoration-dotted', properties: { 'text-decoration-style': 'dotted' } })
      rules.push({ pattern: 'decoration-dashed', properties: { 'text-decoration-style': 'dashed' } })
      rules.push({ pattern: 'decoration-wavy', properties: { 'text-decoration-style': 'wavy' } })

      // Text decoration thickness
      for (const [key, value] of Object.entries(textDecorationThickness)) {
        rules.push({
          pattern: `decoration-${key}`,
          properties: { 'text-decoration-thickness': value },
        })
      }

      // Text underline offset
      for (const [key, value] of Object.entries(textUnderlineOffset)) {
        rules.push({
          pattern: `underline-offset-${key}`,
          properties: { 'text-underline-offset': value },
        })
      }

      // Text transform
      rules.push({ pattern: 'uppercase', properties: { 'text-transform': 'uppercase' } })
      rules.push({ pattern: 'lowercase', properties: { 'text-transform': 'lowercase' } })
      rules.push({ pattern: 'capitalize', properties: { 'text-transform': 'capitalize' } })
      rules.push({ pattern: 'normal-case', properties: { 'text-transform': 'none' } })

      // Text overflow
      rules.push({ pattern: 'truncate', properties: {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      }})
      rules.push({ pattern: 'text-ellipsis', properties: { 'text-overflow': 'ellipsis' } })
      rules.push({ pattern: 'text-clip', properties: { 'text-overflow': 'clip' } })

      // Text wrap
      rules.push({ pattern: 'text-wrap', properties: { 'text-wrap': 'wrap' } })
      rules.push({ pattern: 'text-nowrap', properties: { 'text-wrap': 'nowrap' } })
      rules.push({ pattern: 'text-balance', properties: { 'text-wrap': 'balance' } })
      rules.push({ pattern: 'text-pretty', properties: { 'text-wrap': 'pretty' } })

      // Text indent
      rules.push({
        pattern: /^indent-(\d+)$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'text-indent': `${parseInt(v, 10) * 0.25}rem` } }
        },
      })

      // Whitespace
      rules.push({ pattern: 'whitespace-normal', properties: { 'white-space': 'normal' } })
      rules.push({ pattern: 'whitespace-nowrap', properties: { 'white-space': 'nowrap' } })
      rules.push({ pattern: 'whitespace-pre', properties: { 'white-space': 'pre' } })
      rules.push({ pattern: 'whitespace-pre-line', properties: { 'white-space': 'pre-line' } })
      rules.push({ pattern: 'whitespace-pre-wrap', properties: { 'white-space': 'pre-wrap' } })
      rules.push({ pattern: 'whitespace-break-spaces', properties: { 'white-space': 'break-spaces' } })

      // Word break
      rules.push({ pattern: 'break-normal', properties: { 'overflow-wrap': 'normal', 'word-break': 'normal' } })
      rules.push({ pattern: 'break-words', properties: { 'overflow-wrap': 'break-word' } })
      rules.push({ pattern: 'break-all', properties: { 'word-break': 'break-all' } })
      rules.push({ pattern: 'break-keep', properties: { 'word-break': 'keep-all' } })

      // Hyphens
      rules.push({ pattern: 'hyphens-none', properties: { hyphens: 'none' } })
      rules.push({ pattern: 'hyphens-manual', properties: { hyphens: 'manual' } })
      rules.push({ pattern: 'hyphens-auto', properties: { hyphens: 'auto' } })

      // Content
      rules.push({ pattern: 'content-none', properties: { content: 'none' } })

      // Line clamp
      for (let i = 1; i <= 6; i++) {
        rules.push({
          pattern: `line-clamp-${i}`,
          properties: {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': String(i),
          },
        })
      }
      rules.push({ pattern: 'line-clamp-none', properties: {
        overflow: 'visible',
        display: 'block',
        '-webkit-box-orient': 'horizontal',
        '-webkit-line-clamp': 'none',
      }})

      // Arbitrary values
      rules.push({
        pattern: /^text-\[(.+)\]$/,
        handler: (match): { properties: Record<string, string> } | null => {
          const value = match[1]
          if (!value) return null
          // Check if it's a font size (has rem, px, em, etc.)
          if (/^\d/.test(value) || value.includes('rem') || value.includes('px') || value.includes('em')) {
            return { properties: { 'font-size': value } }
          }
          // Otherwise treat as color
          return { properties: { color: value } }
        },
      })
      rules.push({
        pattern: /^font-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'font-family': v } } },
      })
      rules.push({
        pattern: /^leading-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'line-height': v } } },
      })
      rules.push({
        pattern: /^tracking-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'letter-spacing': v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default typographyPlugin
