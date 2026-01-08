/**
 * Transforms Utilities Plugin
 *
 * CSS transform utilities.
 * @module plugins/core/utilities/transforms
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Transforms utilities plugin
 */
export function transformsPlugin(): Plugin {
  return {
    name: 'transforms',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Scale
      const scaleValues = ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150']
      for (const value of scaleValues) {
        const decimal = parseInt(value, 10) / 100
        rules.push({
          pattern: `scale-${value}`,
          properties: {
            '--coral-scale-x': String(decimal),
            '--coral-scale-y': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `scale-x-${value}`,
          properties: {
            '--coral-scale-x': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `scale-y-${value}`,
          properties: {
            '--coral-scale-y': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
      }

      // Rotate
      const rotateValues = ['0', '1', '2', '3', '6', '12', '45', '90', '180']
      for (const value of rotateValues) {
        rules.push({
          pattern: `rotate-${value}`,
          properties: {
            '--coral-rotate': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-rotate-${value}`,
            properties: {
              '--coral-rotate': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Translate
      const translateValues = {
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
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        'full': '100%',
      }

      for (const [key, value] of Object.entries(translateValues)) {
        rules.push({
          pattern: `translate-x-${key}`,
          properties: {
            '--coral-translate-x': value,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `translate-y-${key}`,
          properties: {
            '--coral-translate-y': value,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        // Negative values
        if (!key.includes('/') && key !== 'full' && key !== '0' && key !== 'px') {
          rules.push({
            pattern: `-translate-x-${key}`,
            properties: {
              '--coral-translate-x': `-${value}`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
          rules.push({
            pattern: `-translate-y-${key}`,
            properties: {
              '--coral-translate-y': `-${value}`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Skew
      const skewValues = ['0', '1', '2', '3', '6', '12']
      for (const value of skewValues) {
        rules.push({
          pattern: `skew-x-${value}`,
          properties: {
            '--coral-skew-x': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `skew-y-${value}`,
          properties: {
            '--coral-skew-y': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-skew-x-${value}`,
            properties: {
              '--coral-skew-x': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
          rules.push({
            pattern: `-skew-y-${value}`,
            properties: {
              '--coral-skew-y': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Transform origin
      rules.push({ pattern: 'origin-center', properties: { 'transform-origin': 'center' } })
      rules.push({ pattern: 'origin-top', properties: { 'transform-origin': 'top' } })
      rules.push({ pattern: 'origin-top-right', properties: { 'transform-origin': 'top right' } })
      rules.push({ pattern: 'origin-right', properties: { 'transform-origin': 'right' } })
      rules.push({ pattern: 'origin-bottom-right', properties: { 'transform-origin': 'bottom right' } })
      rules.push({ pattern: 'origin-bottom', properties: { 'transform-origin': 'bottom' } })
      rules.push({ pattern: 'origin-bottom-left', properties: { 'transform-origin': 'bottom left' } })
      rules.push({ pattern: 'origin-left', properties: { 'transform-origin': 'left' } })
      rules.push({ pattern: 'origin-top-left', properties: { 'transform-origin': 'top left' } })

      // Transform none
      rules.push({ pattern: 'transform-none', properties: { transform: 'none' } })

      // Transform GPU (for hardware acceleration)
      rules.push({ pattern: 'transform-gpu', properties: { transform: 'translate3d(var(--coral-translate-x), var(--coral-translate-y), 0) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))' } })
      rules.push({ pattern: 'transform-cpu', properties: { transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))' } })

      // Arbitrary values
      const transformVar = 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))'
      rules.push({
        pattern: /^scale-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-scale-x': v, '--coral-scale-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^rotate-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-rotate': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^translate-x-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-translate-x': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^translate-y-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-translate-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^skew-x-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-skew-x': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^skew-y-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-skew-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^origin-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'transform-origin': v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default transformsPlugin
