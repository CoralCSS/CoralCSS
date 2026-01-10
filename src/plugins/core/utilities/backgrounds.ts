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

      // ========================================
      // RADIAL GRADIENTS (Enhanced)
      // ========================================

      // Basic radial
      rules.push({ pattern: 'bg-gradient-radial', properties: { 'background-image': 'radial-gradient(var(--coral-gradient-stops))' } })

      // Radial shapes
      rules.push({ pattern: 'bg-radial-circle', properties: { 'background-image': 'radial-gradient(circle, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-ellipse', properties: { 'background-image': 'radial-gradient(ellipse, var(--coral-gradient-stops))' } })

      // Radial sizes
      rules.push({ pattern: 'bg-radial-closest-side', properties: { 'background-image': 'radial-gradient(closest-side, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-closest-corner', properties: { 'background-image': 'radial-gradient(closest-corner, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-farthest-side', properties: { 'background-image': 'radial-gradient(farthest-side, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-farthest-corner', properties: { 'background-image': 'radial-gradient(farthest-corner, var(--coral-gradient-stops))' } })

      // Radial positions
      rules.push({ pattern: 'bg-radial-at-center', properties: { 'background-image': 'radial-gradient(at center, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-top', properties: { 'background-image': 'radial-gradient(at top, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-top-right', properties: { 'background-image': 'radial-gradient(at top right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-right', properties: { 'background-image': 'radial-gradient(at right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-bottom-right', properties: { 'background-image': 'radial-gradient(at bottom right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-bottom', properties: { 'background-image': 'radial-gradient(at bottom, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-bottom-left', properties: { 'background-image': 'radial-gradient(at bottom left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-left', properties: { 'background-image': 'radial-gradient(at left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-at-top-left', properties: { 'background-image': 'radial-gradient(at top left, var(--coral-gradient-stops))' } })

      // Circle at positions
      rules.push({ pattern: 'bg-radial-circle-at-center', properties: { 'background-image': 'radial-gradient(circle at center, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-circle-at-top', properties: { 'background-image': 'radial-gradient(circle at top, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-circle-at-bottom', properties: { 'background-image': 'radial-gradient(circle at bottom, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-circle-at-left', properties: { 'background-image': 'radial-gradient(circle at left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-radial-circle-at-right', properties: { 'background-image': 'radial-gradient(circle at right, var(--coral-gradient-stops))' } })

      // ========================================
      // CONIC GRADIENTS (Enhanced)
      // ========================================

      // Basic conic
      rules.push({ pattern: 'bg-gradient-conic', properties: { 'background-image': 'conic-gradient(from var(--coral-gradient-position, 0deg), var(--coral-gradient-stops))' } })

      // Conic from angles
      rules.push({ pattern: 'bg-conic-from-0', properties: { 'background-image': 'conic-gradient(from 0deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-45', properties: { 'background-image': 'conic-gradient(from 45deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-90', properties: { 'background-image': 'conic-gradient(from 90deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-135', properties: { 'background-image': 'conic-gradient(from 135deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-180', properties: { 'background-image': 'conic-gradient(from 180deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-225', properties: { 'background-image': 'conic-gradient(from 225deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-270', properties: { 'background-image': 'conic-gradient(from 270deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-from-315', properties: { 'background-image': 'conic-gradient(from 315deg, var(--coral-gradient-stops))' } })

      // Conic at positions
      rules.push({ pattern: 'bg-conic-at-center', properties: { 'background-image': 'conic-gradient(at center, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-top', properties: { 'background-image': 'conic-gradient(at top, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-top-right', properties: { 'background-image': 'conic-gradient(at top right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-right', properties: { 'background-image': 'conic-gradient(at right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-bottom-right', properties: { 'background-image': 'conic-gradient(at bottom right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-bottom', properties: { 'background-image': 'conic-gradient(at bottom, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-bottom-left', properties: { 'background-image': 'conic-gradient(at bottom left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-left', properties: { 'background-image': 'conic-gradient(at left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-conic-at-top-left', properties: { 'background-image': 'conic-gradient(at top left, var(--coral-gradient-stops))' } })

      // ========================================
      // GRADIENT STOP POSITIONS
      // ========================================

      // From positions (percentage)
      const stopPositions = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
      for (const pos of stopPositions) {
        rules.push({
          pattern: `from-${pos}%`,
          properties: { '--coral-gradient-from-position': `${pos}%` },
        })
        rules.push({
          pattern: `via-${pos}%`,
          properties: { '--coral-gradient-via-position': `${pos}%` },
        })
        rules.push({
          pattern: `to-${pos}%`,
          properties: { '--coral-gradient-to-position': `${pos}%` },
        })
      }

      // ========================================
      // REPEATING GRADIENTS
      // ========================================

      // Repeating linear
      rules.push({ pattern: 'bg-repeating-linear-to-t', properties: { 'background-image': 'repeating-linear-gradient(to top, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-r', properties: { 'background-image': 'repeating-linear-gradient(to right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-b', properties: { 'background-image': 'repeating-linear-gradient(to bottom, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-l', properties: { 'background-image': 'repeating-linear-gradient(to left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-tr', properties: { 'background-image': 'repeating-linear-gradient(to top right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-br', properties: { 'background-image': 'repeating-linear-gradient(to bottom right, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-bl', properties: { 'background-image': 'repeating-linear-gradient(to bottom left, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-linear-to-tl', properties: { 'background-image': 'repeating-linear-gradient(to top left, var(--coral-gradient-stops))' } })

      // Repeating radial
      rules.push({ pattern: 'bg-repeating-radial', properties: { 'background-image': 'repeating-radial-gradient(var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-radial-circle', properties: { 'background-image': 'repeating-radial-gradient(circle, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-radial-ellipse', properties: { 'background-image': 'repeating-radial-gradient(ellipse, var(--coral-gradient-stops))' } })

      // Repeating conic
      rules.push({ pattern: 'bg-repeating-conic', properties: { 'background-image': 'repeating-conic-gradient(var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-conic-from-0', properties: { 'background-image': 'repeating-conic-gradient(from 0deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-conic-from-90', properties: { 'background-image': 'repeating-conic-gradient(from 90deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-conic-from-180', properties: { 'background-image': 'repeating-conic-gradient(from 180deg, var(--coral-gradient-stops))' } })
      rules.push({ pattern: 'bg-repeating-conic-from-270', properties: { 'background-image': 'repeating-conic-gradient(from 270deg, var(--coral-gradient-stops))' } })

      // ========================================
      // GRADIENT ANGLE UTILITIES
      // ========================================

      const gradientAngles = ['0', '15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180', '195', '210', '225', '240', '255', '270', '285', '300', '315', '330', '345']
      for (const angle of gradientAngles) {
        rules.push({
          pattern: `bg-gradient-${angle}`,
          properties: { 'background-image': `linear-gradient(${angle}deg, var(--coral-gradient-stops))` },
        })
      }

      // ========================================
      // GRADIENT COLOR INTERPOLATION
      // ========================================

      rules.push({ pattern: 'gradient-in-srgb', properties: { '--coral-gradient-interpolation': 'in srgb' } })
      rules.push({ pattern: 'gradient-in-srgb-linear', properties: { '--coral-gradient-interpolation': 'in srgb-linear' } })
      rules.push({ pattern: 'gradient-in-lab', properties: { '--coral-gradient-interpolation': 'in lab' } })
      rules.push({ pattern: 'gradient-in-oklab', properties: { '--coral-gradient-interpolation': 'in oklab' } })
      rules.push({ pattern: 'gradient-in-lch', properties: { '--coral-gradient-interpolation': 'in lch' } })
      rules.push({ pattern: 'gradient-in-oklch', properties: { '--coral-gradient-interpolation': 'in oklch' } })
      rules.push({ pattern: 'gradient-in-hsl', properties: { '--coral-gradient-interpolation': 'in hsl' } })
      rules.push({ pattern: 'gradient-in-hwb', properties: { '--coral-gradient-interpolation': 'in hwb' } })

      // Hue interpolation for oklch/lch
      rules.push({ pattern: 'gradient-hue-shorter', properties: { '--coral-gradient-hue': 'shorter hue' } })
      rules.push({ pattern: 'gradient-hue-longer', properties: { '--coral-gradient-hue': 'longer hue' } })
      rules.push({ pattern: 'gradient-hue-increasing', properties: { '--coral-gradient-hue': 'increasing hue' } })
      rules.push({ pattern: 'gradient-hue-decreasing', properties: { '--coral-gradient-hue': 'decreasing hue' } })

      // ========================================
      // MULTIPLE GRADIENT BACKGROUNDS
      // ========================================

      rules.push({ pattern: 'bg-gradient-blend', properties: { 'background-blend-mode': 'normal' } })
      rules.push({ pattern: 'bg-gradient-blend-multiply', properties: { 'background-blend-mode': 'multiply' } })
      rules.push({ pattern: 'bg-gradient-blend-screen', properties: { 'background-blend-mode': 'screen' } })
      rules.push({ pattern: 'bg-gradient-blend-overlay', properties: { 'background-blend-mode': 'overlay' } })
      rules.push({ pattern: 'bg-gradient-blend-darken', properties: { 'background-blend-mode': 'darken' } })
      rules.push({ pattern: 'bg-gradient-blend-lighten', properties: { 'background-blend-mode': 'lighten' } })
      rules.push({ pattern: 'bg-gradient-blend-color-dodge', properties: { 'background-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'bg-gradient-blend-color-burn', properties: { 'background-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'bg-gradient-blend-hard-light', properties: { 'background-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'bg-gradient-blend-soft-light', properties: { 'background-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'bg-gradient-blend-difference', properties: { 'background-blend-mode': 'difference' } })
      rules.push({ pattern: 'bg-gradient-blend-exclusion', properties: { 'background-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'bg-gradient-blend-hue', properties: { 'background-blend-mode': 'hue' } })
      rules.push({ pattern: 'bg-gradient-blend-saturation', properties: { 'background-blend-mode': 'saturation' } })
      rules.push({ pattern: 'bg-gradient-blend-color', properties: { 'background-blend-mode': 'color' } })
      rules.push({ pattern: 'bg-gradient-blend-luminosity', properties: { 'background-blend-mode': 'luminosity' } })

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
