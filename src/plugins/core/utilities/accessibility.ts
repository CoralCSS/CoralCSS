/**
 * Accessibility Utilities Plugin
 *
 * Screen reader, focus, and accessibility utilities.
 * @module plugins/core/utilities/accessibility
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Accessibility utilities plugin
 */
export function accessibilityPlugin(): Plugin {
  return {
    name: 'accessibility',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Screen reader only - visually hidden but accessible
      rules.push({
        pattern: 'sr-only',
        properties: {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border-width': '0',
        },
      })

      // Remove sr-only - make element visible again
      rules.push({
        pattern: 'not-sr-only',
        properties: {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          'white-space': 'normal',
        },
      })

      // Forced colors mode utilities
      rules.push({
        pattern: 'forced-color-adjust-auto',
        properties: { 'forced-color-adjust': 'auto' },
      })
      rules.push({
        pattern: 'forced-color-adjust-none',
        properties: { 'forced-color-adjust': 'none' },
      })

      // Skip link pattern (for keyboard navigation)
      rules.push({
        pattern: 'skip-link',
        properties: {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border-width': '0',
        },
      })

      // Focus visible skip link - base styles (user applies focus-visible variant)
      rules.push({
        pattern: 'skip-link-visible',
        properties: {
          position: 'fixed',
          width: 'auto',
          height: 'auto',
          padding: '1rem',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          'white-space': 'normal',
          top: '1rem',
          left: '1rem',
          'z-index': '9999',
          'background-color': 'hsl(var(--background, 0 0% 100%))',
          color: 'hsl(var(--foreground, 222.2 84% 4.9%))',
          'border-radius': 'var(--radius, 0.5rem)',
          'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
      })

      // Focus outline utilities
      rules.push({
        pattern: 'focus-outline',
        properties: {
          outline: '2px solid hsl(var(--ring, 24.6 95% 53.1%))',
          'outline-offset': '2px',
        },
      })
      rules.push({
        pattern: 'focus-outline-none',
        properties: { outline: 'none' },
      })
      rules.push({
        pattern: 'focus-ring',
        properties: {
          'box-shadow': '0 0 0 2px hsl(var(--ring, 24.6 95% 53.1%))',
        },
      })

      // Accessible color utilities (system colors)
      rules.push({
        pattern: 'text-accessible',
        properties: { color: 'CanvasText' },
      })
      rules.push({
        pattern: 'bg-accessible',
        properties: { 'background-color': 'Canvas' },
      })
      rules.push({
        pattern: 'border-accessible',
        properties: { 'border-color': 'CanvasText' },
      })

      // Touch target sizing (WCAG 2.5.5)
      rules.push({
        pattern: 'touch-target',
        properties: {
          'min-width': '44px',
          'min-height': '44px',
        },
      })
      rules.push({
        pattern: 'touch-target-lg',
        properties: {
          'min-width': '48px',
          'min-height': '48px',
        },
      })

      // Caret color
      rules.push({
        pattern: 'caret-inherit',
        properties: { 'caret-color': 'inherit' },
      })
      rules.push({
        pattern: 'caret-current',
        properties: { 'caret-color': 'currentColor' },
      })
      rules.push({
        pattern: 'caret-transparent',
        properties: { 'caret-color': 'transparent' },
      })
      rules.push({
        pattern: 'caret-primary',
        properties: { 'caret-color': 'hsl(var(--primary))' },
      })
      rules.push({
        pattern: 'caret-destructive',
        properties: { 'caret-color': 'hsl(var(--destructive))' },
      })

      // Arbitrary caret color
      rules.push({
        pattern: /^caret-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'caret-color': v } }
        },
      })

      // Will change utilities
      rules.push({
        pattern: 'will-change-auto',
        properties: { 'will-change': 'auto' },
      })
      rules.push({
        pattern: 'will-change-scroll',
        properties: { 'will-change': 'scroll-position' },
      })
      rules.push({
        pattern: 'will-change-contents',
        properties: { 'will-change': 'contents' },
      })
      rules.push({
        pattern: 'will-change-transform',
        properties: { 'will-change': 'transform' },
      })

      // Arbitrary will-change
      rules.push({
        pattern: /^will-change-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'will-change': v } }
        },
      })

      // Content utilities
      rules.push({
        pattern: 'content-none',
        properties: { content: 'none' },
      })
      rules.push({
        pattern: 'content-empty',
        properties: { content: '""' },
      })

      // Arbitrary content
      rules.push({
        pattern: /^content-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          // Handle special quotes
          const content = v.startsWith("'") || v.startsWith('"') ? v : `"${v}"`
          return { properties: { content } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default accessibilityPlugin
