/**
 * Filters Utilities Plugin
 *
 * Filter and backdrop-filter utilities.
 * @module plugins/core/utilities/filters
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { blur, dropShadow } from '../../../theme'

/**
 * Filters utilities plugin
 */
export function filtersPlugin(): Plugin {
  return {
    name: 'filters',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Blur
      for (const [key, value] of Object.entries(blur)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `blur${suffix}`,
          properties: {
            '--coral-blur': `blur(${value})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Brightness
      const brightnessValues = ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200']
      for (const value of brightnessValues) {
        rules.push({
          pattern: `brightness-${value}`,
          properties: {
            '--coral-brightness': `brightness(${parseInt(value, 10) / 100})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Contrast
      const contrastValues = ['0', '50', '75', '100', '125', '150', '200']
      for (const value of contrastValues) {
        rules.push({
          pattern: `contrast-${value}`,
          properties: {
            '--coral-contrast': `contrast(${parseInt(value, 10) / 100})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Drop shadow
      for (const [key, value] of Object.entries(dropShadow)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        const shadowValue = Array.isArray(value) ? value.map((v) => `drop-shadow(${v})`).join(' ') : `drop-shadow(${value})`
        rules.push({
          pattern: `drop-shadow${suffix}`,
          properties: {
            '--coral-drop-shadow': shadowValue,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Grayscale
      rules.push({
        pattern: 'grayscale',
        properties: {
          '--coral-grayscale': 'grayscale(100%)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })
      rules.push({
        pattern: 'grayscale-0',
        properties: {
          '--coral-grayscale': 'grayscale(0)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })

      // Hue rotate
      const hueRotateValues = ['0', '15', '30', '60', '90', '180']
      for (const value of hueRotateValues) {
        rules.push({
          pattern: `hue-rotate-${value}`,
          properties: {
            '--coral-hue-rotate': `hue-rotate(${value}deg)`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Invert
      rules.push({
        pattern: 'invert',
        properties: {
          '--coral-invert': 'invert(100%)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })
      rules.push({
        pattern: 'invert-0',
        properties: {
          '--coral-invert': 'invert(0)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })

      // Saturate
      const saturateValues = ['0', '50', '100', '150', '200']
      for (const value of saturateValues) {
        rules.push({
          pattern: `saturate-${value}`,
          properties: {
            '--coral-saturate': `saturate(${parseInt(value, 10) / 100})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        })
      }

      // Sepia
      rules.push({
        pattern: 'sepia',
        properties: {
          '--coral-sepia': 'sepia(100%)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })
      rules.push({
        pattern: 'sepia-0',
        properties: {
          '--coral-sepia': 'sepia(0)',
          filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
        },
      })

      // Filter none
      rules.push({
        pattern: 'filter-none',
        properties: { filter: 'none' },
      })

      // Backdrop blur
      for (const [key, value] of Object.entries(blur)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `backdrop-blur${suffix}`,
          properties: {
            '--coral-backdrop-blur': `blur(${value})`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop brightness
      for (const value of brightnessValues) {
        rules.push({
          pattern: `backdrop-brightness-${value}`,
          properties: {
            '--coral-backdrop-brightness': `brightness(${parseInt(value, 10) / 100})`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop contrast
      for (const value of contrastValues) {
        rules.push({
          pattern: `backdrop-contrast-${value}`,
          properties: {
            '--coral-backdrop-contrast': `contrast(${parseInt(value, 10) / 100})`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop grayscale
      rules.push({
        pattern: 'backdrop-grayscale',
        properties: {
          '--coral-backdrop-grayscale': 'grayscale(100%)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })
      rules.push({
        pattern: 'backdrop-grayscale-0',
        properties: {
          '--coral-backdrop-grayscale': 'grayscale(0)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })

      // Backdrop hue rotate
      for (const value of hueRotateValues) {
        rules.push({
          pattern: `backdrop-hue-rotate-${value}`,
          properties: {
            '--coral-backdrop-hue-rotate': `hue-rotate(${value}deg)`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop invert
      rules.push({
        pattern: 'backdrop-invert',
        properties: {
          '--coral-backdrop-invert': 'invert(100%)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })
      rules.push({
        pattern: 'backdrop-invert-0',
        properties: {
          '--coral-backdrop-invert': 'invert(0)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })

      // Backdrop opacity
      const opacityValues = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
      for (const value of opacityValues) {
        rules.push({
          pattern: `backdrop-opacity-${value}`,
          properties: {
            '--coral-backdrop-opacity': `opacity(${parseInt(value, 10) / 100})`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop saturate
      for (const value of saturateValues) {
        rules.push({
          pattern: `backdrop-saturate-${value}`,
          properties: {
            '--coral-backdrop-saturate': `saturate(${parseInt(value, 10) / 100})`,
            'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
          },
        })
      }

      // Backdrop sepia
      rules.push({
        pattern: 'backdrop-sepia',
        properties: {
          '--coral-backdrop-sepia': 'sepia(100%)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })
      rules.push({
        pattern: 'backdrop-sepia-0',
        properties: {
          '--coral-backdrop-sepia': 'sepia(0)',
          'backdrop-filter': 'var(--coral-backdrop-blur) var(--coral-backdrop-brightness) var(--coral-backdrop-contrast) var(--coral-backdrop-grayscale) var(--coral-backdrop-hue-rotate) var(--coral-backdrop-invert) var(--coral-backdrop-opacity) var(--coral-backdrop-saturate) var(--coral-backdrop-sepia)',
        },
      })

      // Backdrop filter none
      rules.push({
        pattern: 'backdrop-filter-none',
        properties: { 'backdrop-filter': 'none' },
      })

      // Arbitrary values
      rules.push({
        pattern: /^blur-\[(.+)\]$/,
        handler: (match) => ({
          properties: {
            '--coral-blur': `blur(${match[1]})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        }),
      })
      rules.push({
        pattern: /^brightness-\[(.+)\]$/,
        handler: (match) => ({
          properties: {
            '--coral-brightness': `brightness(${match[1]})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        }),
      })
      rules.push({
        pattern: /^contrast-\[(.+)\]$/,
        handler: (match) => ({
          properties: {
            '--coral-contrast': `contrast(${match[1]})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        }),
      })
      rules.push({
        pattern: /^hue-rotate-\[(.+)\]$/,
        handler: (match) => ({
          properties: {
            '--coral-hue-rotate': `hue-rotate(${match[1]})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        }),
      })
      rules.push({
        pattern: /^saturate-\[(.+)\]$/,
        handler: (match) => ({
          properties: {
            '--coral-saturate': `saturate(${match[1]})`,
            filter: 'var(--coral-blur) var(--coral-brightness) var(--coral-contrast) var(--coral-grayscale) var(--coral-hue-rotate) var(--coral-invert) var(--coral-saturate) var(--coral-sepia) var(--coral-drop-shadow)',
          },
        }),
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default filtersPlugin
