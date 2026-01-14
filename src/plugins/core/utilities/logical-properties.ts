/**
 * Logical Properties Plugin - RTL/LTR Support
 *
 * Provides logical property utilities for bidirectional text support.
 * These properties adapt automatically based on text direction (ltr/rtl).
 *
 * Note: Basic padding/margin logical (ps-*, pe-*, ms-*, me-*) are in spacing.ts
 * This plugin adds additional logical properties not covered elsewhere.
 *
 * @module plugins/core/utilities/logical-properties
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

// Spacing scale (matches Tailwind)
const spacingScale: Record<string, string> = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
}

// Border width scale
const borderWidthScale: Record<string, string> = {
  '0': '0px',
  '': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
}

// Border radius scale
const borderRadiusScale: Record<string, string> = {
  'none': '0px',
  'sm': '0.125rem',
  '': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
}

// Inset scale (includes auto and fractions)
const insetScale: Record<string, string> = {
  ...spacingScale,
  'auto': 'auto',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  'full': '100%',
}

// Size scale
const sizeScale: Record<string, string> = {
  ...spacingScale,
  'auto': 'auto',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  'full': '100%',
  'screen': '100vw',
  'svw': '100svw',
  'lvw': '100lvw',
  'dvw': '100dvw',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
}

/**
 * Logical Properties Plugin
 *
 * Provides utilities for CSS logical properties that adapt to text direction.
 */
export function logicalPropertiesPlugin(): Plugin {
  return {
    name: 'logical-properties',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // INSET LOGICAL (Position)
      // ========================================

      // start-* (inset-inline-start)
      for (const [key, value] of Object.entries(insetScale)) {
        rules.push({
          pattern: `start-${key}`,
          properties: { 'inset-inline-start': value },
        })
      }

      // end-* (inset-inline-end)
      for (const [key, value] of Object.entries(insetScale)) {
        rules.push({
          pattern: `end-${key}`,
          properties: { 'inset-inline-end': value },
        })
      }

      // Negative inset values
      for (const [key, value] of Object.entries(spacingScale)) {
        if (key !== '0' && key !== 'px') {
          rules.push({
            pattern: `-start-${key}`,
            properties: { 'inset-inline-start': `-${value}` },
          })
          rules.push({
            pattern: `-end-${key}`,
            properties: { 'inset-inline-end': `-${value}` },
          })
        }
      }

      // inset-inline (both start and end)
      for (const [key, value] of Object.entries(insetScale)) {
        rules.push({
          pattern: `inset-inline-${key}`,
          properties: {
            'inset-inline-start': value,
            'inset-inline-end': value,
          },
        })
      }

      // inset-block (both top and bottom in logical terms)
      for (const [key, value] of Object.entries(insetScale)) {
        rules.push({
          pattern: `inset-block-${key}`,
          properties: {
            'inset-block-start': value,
            'inset-block-end': value,
          },
        })
      }

      // Arbitrary inset values
      rules.push({
        pattern: /^start-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'inset-inline-start': v } }
        },
      })
      rules.push({
        pattern: /^end-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'inset-inline-end': v } }
        },
      })

      // ========================================
      // BORDER INLINE (Start/End)
      // ========================================

      // border-s-* (border-inline-start-width)
      for (const [key, value] of Object.entries(borderWidthScale)) {
        const className = key ? `border-s-${key}` : 'border-s'
        rules.push({
          pattern: className,
          properties: { 'border-inline-start-width': value },
        })
      }

      // border-e-* (border-inline-end-width)
      for (const [key, value] of Object.entries(borderWidthScale)) {
        const className = key ? `border-e-${key}` : 'border-e'
        rules.push({
          pattern: className,
          properties: { 'border-inline-end-width': value },
        })
      }

      // border-bs-* (border-block-start-width)
      for (const [key, value] of Object.entries(borderWidthScale)) {
        const className = key ? `border-bs-${key}` : 'border-bs'
        rules.push({
          pattern: className,
          properties: { 'border-block-start-width': value },
        })
      }

      // border-be-* (border-block-end-width)
      for (const [key, value] of Object.entries(borderWidthScale)) {
        const className = key ? `border-be-${key}` : 'border-be'
        rules.push({
          pattern: className,
          properties: { 'border-block-end-width': value },
        })
      }

      // ========================================
      // BORDER COLOR LOGICAL
      // ========================================

      rules.push({ pattern: 'border-s-inherit', properties: { 'border-inline-start-color': 'inherit' } })
      rules.push({ pattern: 'border-s-current', properties: { 'border-inline-start-color': 'currentColor' } })
      rules.push({ pattern: 'border-s-transparent', properties: { 'border-inline-start-color': 'transparent' } })
      rules.push({ pattern: 'border-s-black', properties: { 'border-inline-start-color': 'rgb(0 0 0)' } })
      rules.push({ pattern: 'border-s-white', properties: { 'border-inline-start-color': 'rgb(255 255 255)' } })

      rules.push({ pattern: 'border-e-inherit', properties: { 'border-inline-end-color': 'inherit' } })
      rules.push({ pattern: 'border-e-current', properties: { 'border-inline-end-color': 'currentColor' } })
      rules.push({ pattern: 'border-e-transparent', properties: { 'border-inline-end-color': 'transparent' } })
      rules.push({ pattern: 'border-e-black', properties: { 'border-inline-end-color': 'rgb(0 0 0)' } })
      rules.push({ pattern: 'border-e-white', properties: { 'border-inline-end-color': 'rgb(255 255 255)' } })

      // ========================================
      // BORDER RADIUS LOGICAL
      // ========================================

      // rounded-ss-* (border-start-start-radius)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-ss-${key}` : 'rounded-ss'
        rules.push({
          pattern: className,
          properties: { 'border-start-start-radius': value },
        })
      }

      // rounded-se-* (border-start-end-radius)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-se-${key}` : 'rounded-se'
        rules.push({
          pattern: className,
          properties: { 'border-start-end-radius': value },
        })
      }

      // rounded-es-* (border-end-start-radius)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-es-${key}` : 'rounded-es'
        rules.push({
          pattern: className,
          properties: { 'border-end-start-radius': value },
        })
      }

      // rounded-ee-* (border-end-end-radius)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-ee-${key}` : 'rounded-ee'
        rules.push({
          pattern: className,
          properties: { 'border-end-end-radius': value },
        })
      }

      // rounded-s-* (start side - both start-start and start-end)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-s-${key}` : 'rounded-s'
        rules.push({
          pattern: className,
          properties: {
            'border-start-start-radius': value,
            'border-start-end-radius': value,
          },
        })
      }

      // rounded-e-* (end side - both end-start and end-end)
      for (const [key, value] of Object.entries(borderRadiusScale)) {
        const className = key ? `rounded-e-${key}` : 'rounded-e'
        rules.push({
          pattern: className,
          properties: {
            'border-end-start-radius': value,
            'border-end-end-radius': value,
          },
        })
      }

      // ========================================
      // FLOAT LOGICAL
      // ========================================

      rules.push({ pattern: 'float-start', properties: { float: 'inline-start' } })
      rules.push({ pattern: 'float-end', properties: { float: 'inline-end' } })

      // ========================================
      // CLEAR LOGICAL
      // ========================================

      rules.push({ pattern: 'clear-start', properties: { clear: 'inline-start' } })
      rules.push({ pattern: 'clear-end', properties: { clear: 'inline-end' } })

      // ========================================
      // TEXT ALIGN LOGICAL
      // ========================================

      rules.push({ pattern: 'text-start', properties: { 'text-align': 'start' } })
      rules.push({ pattern: 'text-end', properties: { 'text-align': 'end' } })

      // ========================================
      // RESIZE LOGICAL
      // ========================================

      rules.push({ pattern: 'resize-block', properties: { resize: 'block' } })
      rules.push({ pattern: 'resize-inline', properties: { resize: 'inline' } })

      // ========================================
      // OVERFLOW LOGICAL
      // ========================================

      rules.push({ pattern: 'overflow-inline-auto', properties: { 'overflow-inline': 'auto' } })
      rules.push({ pattern: 'overflow-inline-hidden', properties: { 'overflow-inline': 'hidden' } })
      rules.push({ pattern: 'overflow-inline-clip', properties: { 'overflow-inline': 'clip' } })
      rules.push({ pattern: 'overflow-inline-visible', properties: { 'overflow-inline': 'visible' } })
      rules.push({ pattern: 'overflow-inline-scroll', properties: { 'overflow-inline': 'scroll' } })

      rules.push({ pattern: 'overflow-block-auto', properties: { 'overflow-block': 'auto' } })
      rules.push({ pattern: 'overflow-block-hidden', properties: { 'overflow-block': 'hidden' } })
      rules.push({ pattern: 'overflow-block-clip', properties: { 'overflow-block': 'clip' } })
      rules.push({ pattern: 'overflow-block-visible', properties: { 'overflow-block': 'visible' } })
      rules.push({ pattern: 'overflow-block-scroll', properties: { 'overflow-block': 'scroll' } })

      // ========================================
      // OVERSCROLL LOGICAL
      // ========================================

      rules.push({ pattern: 'overscroll-inline-auto', properties: { 'overscroll-behavior-inline': 'auto' } })
      rules.push({ pattern: 'overscroll-inline-contain', properties: { 'overscroll-behavior-inline': 'contain' } })
      rules.push({ pattern: 'overscroll-inline-none', properties: { 'overscroll-behavior-inline': 'none' } })

      rules.push({ pattern: 'overscroll-block-auto', properties: { 'overscroll-behavior-block': 'auto' } })
      rules.push({ pattern: 'overscroll-block-contain', properties: { 'overscroll-behavior-block': 'contain' } })
      rules.push({ pattern: 'overscroll-block-none', properties: { 'overscroll-behavior-block': 'none' } })

      // ========================================
      // SIZE LOGICAL (inline-size, block-size)
      // ========================================

      // inline-size (w-* equivalent in logical terms)
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `inline-size-${key}`,
          properties: { 'inline-size': value },
        })
      }

      // block-size (h-* equivalent in logical terms)
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `block-size-${key}`,
          properties: { 'block-size': value },
        })
      }

      // min-inline-size
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `min-inline-size-${key}`,
          properties: { 'min-inline-size': value },
        })
      }

      // max-inline-size
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `max-inline-size-${key}`,
          properties: { 'max-inline-size': value },
        })
      }

      // min-block-size
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `min-block-size-${key}`,
          properties: { 'min-block-size': value },
        })
      }

      // max-block-size
      for (const [key, value] of Object.entries(sizeScale)) {
        rules.push({
          pattern: `max-block-size-${key}`,
          properties: { 'max-block-size': value },
        })
      }

      // ========================================
      // SCROLL MARGIN LOGICAL
      // ========================================

      // scroll-ms-* (scroll-margin-inline-start)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-ms-${key}`,
          properties: { 'scroll-margin-inline-start': value },
        })
      }

      // scroll-me-* (scroll-margin-inline-end)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-me-${key}`,
          properties: { 'scroll-margin-inline-end': value },
        })
      }

      // scroll-mbs-* (scroll-margin-block-start)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-mbs-${key}`,
          properties: { 'scroll-margin-block-start': value },
        })
      }

      // scroll-mbe-* (scroll-margin-block-end)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-mbe-${key}`,
          properties: { 'scroll-margin-block-end': value },
        })
      }

      // ========================================
      // SCROLL PADDING LOGICAL
      // ========================================

      // scroll-ps-* (scroll-padding-inline-start)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-ps-${key}`,
          properties: { 'scroll-padding-inline-start': value },
        })
      }

      // scroll-pe-* (scroll-padding-inline-end)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-pe-${key}`,
          properties: { 'scroll-padding-inline-end': value },
        })
      }

      // scroll-pbs-* (scroll-padding-block-start)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-pbs-${key}`,
          properties: { 'scroll-padding-block-start': value },
        })
      }

      // scroll-pbe-* (scroll-padding-block-end)
      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `scroll-pbe-${key}`,
          properties: { 'scroll-padding-block-end': value },
        })
      }

      // ========================================
      // GAP LOGICAL (for flex/grid)
      // ========================================

      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `gap-inline-${key}`,
          properties: { 'column-gap': value },
        })
        rules.push({
          pattern: `gap-block-${key}`,
          properties: { 'row-gap': value },
        })
      }

      // ========================================
      // WRITING MODE
      // ========================================

      rules.push({ pattern: 'writing-horizontal-tb', properties: { 'writing-mode': 'horizontal-tb' } })
      rules.push({ pattern: 'writing-vertical-rl', properties: { 'writing-mode': 'vertical-rl' } })
      rules.push({ pattern: 'writing-vertical-lr', properties: { 'writing-mode': 'vertical-lr' } })

      // ========================================
      // DIRECTION
      // ========================================

      rules.push({ pattern: 'dir-ltr', properties: { direction: 'ltr' } })
      rules.push({ pattern: 'dir-rtl', properties: { direction: 'rtl' } })

      // ========================================
      // UNICODE-BIDI
      // ========================================

      rules.push({ pattern: 'bidi-normal', properties: { 'unicode-bidi': 'normal' } })
      rules.push({ pattern: 'bidi-embed', properties: { 'unicode-bidi': 'embed' } })
      rules.push({ pattern: 'bidi-isolate', properties: { 'unicode-bidi': 'isolate' } })
      rules.push({ pattern: 'bidi-isolate-override', properties: { 'unicode-bidi': 'isolate-override' } })
      rules.push({ pattern: 'bidi-override', properties: { 'unicode-bidi': 'bidi-override' } })
      rules.push({ pattern: 'bidi-plaintext', properties: { 'unicode-bidi': 'plaintext' } })

      // ========================================
      // TEXT ORIENTATION (for vertical writing)
      // ========================================

      rules.push({ pattern: 'text-orientation-mixed', properties: { 'text-orientation': 'mixed' } })
      rules.push({ pattern: 'text-orientation-upright', properties: { 'text-orientation': 'upright' } })
      rules.push({ pattern: 'text-orientation-sideways', properties: { 'text-orientation': 'sideways' } })

      // ========================================
      // CAPTION-SIDE LOGICAL
      // ========================================

      rules.push({ pattern: 'caption-block-start', properties: { 'caption-side': 'block-start' } })
      rules.push({ pattern: 'caption-block-end', properties: { 'caption-side': 'block-end' } })
      rules.push({ pattern: 'caption-inline-start', properties: { 'caption-side': 'inline-start' } })
      rules.push({ pattern: 'caption-inline-end', properties: { 'caption-side': 'inline-end' } })

      // ========================================
      // CONTAIN-INTRINSIC-SIZE LOGICAL
      // ========================================

      for (const [key, value] of Object.entries(spacingScale)) {
        rules.push({
          pattern: `contain-intrinsic-inline-${key}`,
          properties: { 'contain-intrinsic-inline-size': value },
        })
        rules.push({
          pattern: `contain-intrinsic-block-${key}`,
          properties: { 'contain-intrinsic-block-size': value },
        })
      }

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default logicalPropertiesPlugin
