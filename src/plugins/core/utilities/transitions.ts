/**
 * Transitions Utilities Plugin
 *
 * CSS transition and animation utilities.
 * @module plugins/core/utilities/transitions
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { transitionDuration, transitionTimingFunction, animation } from '../../../theme'

/**
 * Transitions utilities plugin
 */
export function transitionsPlugin(): Plugin {
  return {
    name: 'transitions',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Transition property
      rules.push({
        pattern: 'transition-none',
        properties: { 'transition-property': 'none' },
      })
      rules.push({
        pattern: 'transition-all',
        properties: {
          'transition-property': 'all',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })
      rules.push({
        pattern: 'transition',
        properties: {
          'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })
      rules.push({
        pattern: 'transition-colors',
        properties: {
          'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })
      rules.push({
        pattern: 'transition-opacity',
        properties: {
          'transition-property': 'opacity',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })
      rules.push({
        pattern: 'transition-shadow',
        properties: {
          'transition-property': 'box-shadow',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })
      rules.push({
        pattern: 'transition-transform',
        properties: {
          'transition-property': 'transform',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '150ms',
        },
      })

      // Transition duration
      for (const [key, value] of Object.entries(transitionDuration)) {
        rules.push({
          pattern: `duration-${key}`,
          properties: { 'transition-duration': value },
        })
      }

      // Transition timing function
      for (const [key, value] of Object.entries(transitionTimingFunction)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `ease${suffix}`,
          properties: { 'transition-timing-function': value },
        })
      }

      // Transition delay
      for (const [key, value] of Object.entries(transitionDuration)) {
        rules.push({
          pattern: `delay-${key}`,
          properties: { 'transition-delay': value },
        })
      }

      // Animation
      for (const [key, value] of Object.entries(animation)) {
        rules.push({
          pattern: `animate-${key}`,
          properties: { animation: value },
        })
      }

      // Animation delay (reuse duration values)
      for (const [key, value] of Object.entries(transitionDuration)) {
        rules.push({
          pattern: `animation-delay-${key}`,
          properties: { 'animation-delay': value },
        })
      }

      // Animation duration
      for (const [key, value] of Object.entries(transitionDuration)) {
        rules.push({
          pattern: `animation-duration-${key}`,
          properties: { 'animation-duration': value },
        })
      }

      // Animation timing function
      for (const [key, value] of Object.entries(transitionTimingFunction)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `animation-ease${suffix}`,
          properties: { 'animation-timing-function': value },
        })
      }

      // Animation iteration count
      rules.push({ pattern: 'animation-infinite', properties: { 'animation-iteration-count': 'infinite' } })
      rules.push({ pattern: 'animation-once', properties: { 'animation-iteration-count': '1' } })
      rules.push({ pattern: 'animation-twice', properties: { 'animation-iteration-count': '2' } })

      // Animation direction
      rules.push({ pattern: 'animation-normal', properties: { 'animation-direction': 'normal' } })
      rules.push({ pattern: 'animation-reverse', properties: { 'animation-direction': 'reverse' } })
      rules.push({ pattern: 'animation-alternate', properties: { 'animation-direction': 'alternate' } })
      rules.push({ pattern: 'animation-alternate-reverse', properties: { 'animation-direction': 'alternate-reverse' } })

      // Animation fill mode
      rules.push({ pattern: 'animation-fill-none', properties: { 'animation-fill-mode': 'none' } })
      rules.push({ pattern: 'animation-fill-forwards', properties: { 'animation-fill-mode': 'forwards' } })
      rules.push({ pattern: 'animation-fill-backwards', properties: { 'animation-fill-mode': 'backwards' } })
      rules.push({ pattern: 'animation-fill-both', properties: { 'animation-fill-mode': 'both' } })

      // Animation play state
      rules.push({ pattern: 'animation-running', properties: { 'animation-play-state': 'running' } })
      rules.push({ pattern: 'animation-paused', properties: { 'animation-play-state': 'paused' } })

      // Will change
      rules.push({ pattern: 'will-change-auto', properties: { 'will-change': 'auto' } })
      rules.push({ pattern: 'will-change-scroll', properties: { 'will-change': 'scroll-position' } })
      rules.push({ pattern: 'will-change-contents', properties: { 'will-change': 'contents' } })
      rules.push({ pattern: 'will-change-transform', properties: { 'will-change': 'transform' } })

      // Arbitrary values
      rules.push({
        pattern: /^duration-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'transition-duration': v } } },
      })
      rules.push({
        pattern: /^delay-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'transition-delay': v } } },
      })
      rules.push({
        pattern: /^ease-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'transition-timing-function': v } } },
      })
      rules.push({
        pattern: /^animate-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { animation: v } } },
      })
      rules.push({
        pattern: /^will-change-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'will-change': v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default transitionsPlugin
