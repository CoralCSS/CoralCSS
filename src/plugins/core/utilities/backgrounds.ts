/**
 * Background Utilities Plugin
 *
 * Background color, gradient, size, position, and other background utilities.
 * @module plugins/core/utilities/backgrounds
 */

import type { Plugin, Rule, PluginContext, CSSProperties } from '../../../types'

/**
 * Backgrounds utilities plugin
 */
export function backgroundsPlugin(): Plugin {
  return {
    name: 'backgrounds',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Background attachment
      rules.push({ pattern: 'bg-fixed', properties: { 'background-attachment': 'fixed' } })
      rules.push({ pattern: 'bg-local', properties: { 'background-attachment': 'local' } })
      rules.push({ pattern: 'bg-scroll', properties: { 'background-attachment': 'scroll' } })

      // Background clip
      rules.push({ pattern: 'bg-clip-border', properties: { 'background-clip': 'border-box' } })
      rules.push({ pattern: 'bg-clip-padding', properties: { 'background-clip': 'padding-box' } })
      rules.push({ pattern: 'bg-clip-content', properties: { 'background-clip': 'content-box' } })
      rules.push({ pattern: 'bg-clip-text', properties: { 'background-clip': 'text' } })

      // Background origin
      rules.push({ pattern: 'bg-origin-border', properties: { 'background-origin': 'border-box' } })
      rules.push({ pattern: 'bg-origin-padding', properties: { 'background-origin': 'padding-box' } })
      rules.push({ pattern: 'bg-origin-content', properties: { 'background-origin': 'content-box' } })

      // Background position
      rules.push({ pattern: 'bg-bottom', properties: { 'background-position': 'bottom' } })
      rules.push({ pattern: 'bg-center', properties: { 'background-position': 'center' } })
      rules.push({ pattern: 'bg-left', properties: { 'background-position': 'left' } })
      rules.push({ pattern: 'bg-left-bottom', properties: { 'background-position': 'left bottom' } })
      rules.push({ pattern: 'bg-left-top', properties: { 'background-position': 'left top' } })
      rules.push({ pattern: 'bg-right', properties: { 'background-position': 'right' } })
      rules.push({ pattern: 'bg-right-bottom', properties: { 'background-position': 'right bottom' } })
      rules.push({ pattern: 'bg-right-top', properties: { 'background-position': 'right top' } })
      rules.push({ pattern: 'bg-top', properties: { 'background-position': 'top' } })

      // Background repeat
      rules.push({ pattern: 'bg-repeat', properties: { 'background-repeat': 'repeat' } })
      rules.push({ pattern: 'bg-no-repeat', properties: { 'background-repeat': 'no-repeat' } })
      rules.push({ pattern: 'bg-repeat-x', properties: { 'background-repeat': 'repeat-x' } })
      rules.push({ pattern: 'bg-repeat-y', properties: { 'background-repeat': 'repeat-y' } })
      rules.push({ pattern: 'bg-repeat-round', properties: { 'background-repeat': 'round' } })
      rules.push({ pattern: 'bg-repeat-space', properties: { 'background-repeat': 'space' } })

      // Background size
      rules.push({ pattern: 'bg-auto', properties: { 'background-size': 'auto' } })
      rules.push({ pattern: 'bg-cover', properties: { 'background-size': 'cover' } })
      rules.push({ pattern: 'bg-contain', properties: { 'background-size': 'contain' } })

      // Background image (none)
      rules.push({ pattern: 'bg-none', properties: { 'background-image': 'none' } })

      // Gradients - direction
      rules.push({ pattern: 'bg-gradient-to-t', properties: { 'background-image': 'linear-gradient(to top, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-tr', properties: { 'background-image': 'linear-gradient(to top right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-r', properties: { 'background-image': 'linear-gradient(to right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-br', properties: { 'background-image': 'linear-gradient(to bottom right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-b', properties: { 'background-image': 'linear-gradient(to bottom, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-bl', properties: { 'background-image': 'linear-gradient(to bottom left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-l', properties: { 'background-image': 'linear-gradient(to left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-gradient-to-tl', properties: { 'background-image': 'linear-gradient(to top left, var(--coral-gradient-stops))' } })

      // Radial gradient
      rules.push({ pattern: 'bg-gradient-radial', properties: { 'background-image': 'radial-gradient(var(--coral-gradient-stops))' } })

      // Conic gradient
      rules.push({ pattern: 'bg-gradient-conic', properties: { 'background-image': 'conic-gradient(from var(--coral-gradient-position, 0deg), var(--coral-gradient-stops))' } })

      // Gradient color stops - from
      rules.push({
        pattern: /^from-(.+)$/,
        handler: (match) => ({
          properties: {
            '--coral-gradient-from': `var(--${match[1]}, ${match[1]})`,
            '--coral-gradient-to': 'rgb(255 255 255 / 0)',
            '--coral-gradient-stops': 'var(--coral-gradient-from), var(--coral-gradient-to)',
          },
        }),
      })

      // Gradient color stops - via
      rules.push({
        pattern: /^via-(.+)$/,
        handler: (match) => ({
          properties: {
            '--coral-gradient-to': 'rgb(255 255 255 / 0)',
            '--coral-gradient-stops': `var(--coral-gradient-from), var(--${match[1]}, ${match[1]}), var(--coral-gradient-to)`,
          },
        }),
      })

      // Gradient color stops - to
      rules.push({
        pattern: /^to-(.+)$/,
        handler: (match) => ({
          properties: {
            '--coral-gradient-to': `var(--${match[1]}, ${match[1]})`,
          },
        }),
      })

      // Gradient position (for conic)
      rules.push({
        pattern: /^gradient-from-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { '--coral-gradient-position': value } }
        },
      })

      // Arbitrary values
      rules.push({
        pattern: /^bg-\[url\((.+)\)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'background-image': `url(${value})` } }
        },
      })
      rules.push({
        pattern: /^bg-\[(.+)\]$/,
        handler: (match): { properties: CSSProperties } | null => {
          const value = match[1]
          if (!value) {return null}
          // Check if it's a gradient
          if (value.includes('gradient')) {
            return { properties: { 'background-image': value } as CSSProperties }
          }
          // Check if it's a size
          if (value.includes('%') || value.includes('px') || value.includes('rem') || value.includes('auto')) {
            return { properties: { 'background-size': value } as CSSProperties }
          }
          // Otherwise treat as color
          return { properties: { 'background-color': value } as CSSProperties }
        },
      })
      rules.push({
        pattern: /^from-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              '--coral-gradient-from': value,
              '--coral-gradient-to': 'rgb(255 255 255 / 0)',
              '--coral-gradient-stops': 'var(--coral-gradient-from), var(--coral-gradient-to)',
            },
          }
        },
      })
      rules.push({
        pattern: /^via-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              '--coral-gradient-to': 'rgb(255 255 255 / 0)',
              '--coral-gradient-stops': `var(--coral-gradient-from), ${value}, var(--coral-gradient-to)`,
            },
          }
        },
      })
      rules.push({
        pattern: /^to-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { '--coral-gradient-to': value } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default backgroundsPlugin
