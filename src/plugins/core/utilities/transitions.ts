/**
 * Transitions Utilities Plugin
 *
 * CSS transition and animation utilities.
 * @module plugins/core/utilities/transitions
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { transitionDuration, transitionTimingFunction, animation } from '../../../theme'

/**
 * Spring animation keyframes
 */
export const springKeyframes = {
  'spring-pop': `@keyframes coral-spring-pop {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}`,
  'spring-slide-up': `@keyframes coral-spring-slide-up {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
  'spring-slide-down': `@keyframes coral-spring-slide-down {
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
  'spring-slide-left': `@keyframes coral-spring-slide-left {
  0% { transform: translateX(20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}`,
  'spring-slide-right': `@keyframes coral-spring-slide-right {
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}`,
  'spring-bounce': `@keyframes coral-spring-bounce {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-15px); }
  60% { transform: translateY(-5px); }
}`,
  'spring-scale': `@keyframes coral-spring-scale {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}`,
  'spring-rotate': `@keyframes coral-spring-rotate {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}`,
  'elastic': `@keyframes coral-elastic {
  0% { transform: scale(0); }
  40% { transform: scale(1.1); }
  60% { transform: scale(0.95); }
  80% { transform: scale(1.03); }
  100% { transform: scale(1); }
}`,
  'jello': `@keyframes coral-jello {
  0%, 11.1%, 100% { transform: none; }
  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
  77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
  88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
}`,
  'rubber': `@keyframes coral-rubber {
  0% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
  100% { transform: scale3d(1, 1, 1); }
}`,
  'wobble': `@keyframes coral-wobble {
  0% { transform: none; }
  15% { transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }
  30% { transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }
  45% { transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }
  60% { transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }
  75% { transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }
  100% { transform: none; }
}`,
  'headshake': `@keyframes coral-headshake {
  0% { transform: translateX(0); }
  12.5% { transform: translateX(-6px) rotateY(-9deg); }
  37.5% { transform: translateX(5px) rotateY(7deg); }
  62.5% { transform: translateX(-3px) rotateY(-5deg); }
  87.5% { transform: translateX(2px) rotateY(3deg); }
  100% { transform: translateX(0); }
}`,
  'swing': `@keyframes coral-swing {
  20% { transform: rotate3d(0, 0, 1, 15deg); }
  40% { transform: rotate3d(0, 0, 1, -10deg); }
  60% { transform: rotate3d(0, 0, 1, 5deg); }
  80% { transform: rotate3d(0, 0, 1, -5deg); }
  100% { transform: rotate3d(0, 0, 1, 0deg); }
}`,
  'heartbeat': `@keyframes coral-heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}`,
}

/**
 * Get all spring animation keyframes CSS
 */
export function getSpringKeyframes(): string {
  return Object.values(springKeyframes).join('\n\n')
}

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

      // ========================================
      // SPRING ANIMATIONS (Physics-Based Easing)
      // ========================================

      // Spring easing presets using cubic-bezier approximations
      // These approximate common spring physics: stiffness, damping, mass
      rules.push({
        pattern: 'ease-spring',
        properties: { 'transition-timing-function': 'cubic-bezier(0.5, 1.5, 0.5, 1)' },
      })
      rules.push({
        pattern: 'ease-spring-soft',
        properties: { 'transition-timing-function': 'cubic-bezier(0.3, 1.3, 0.5, 1)' },
      })
      rules.push({
        pattern: 'ease-spring-medium',
        properties: { 'transition-timing-function': 'cubic-bezier(0.5, 1.6, 0.4, 1)' },
      })
      rules.push({
        pattern: 'ease-spring-stiff',
        properties: { 'transition-timing-function': 'cubic-bezier(0.6, 1.8, 0.3, 1)' },
      })
      rules.push({
        pattern: 'ease-spring-bouncy',
        properties: { 'transition-timing-function': 'cubic-bezier(0.2, 2, 0.3, 1)' },
      })
      rules.push({
        pattern: 'ease-spring-snappy',
        properties: { 'transition-timing-function': 'cubic-bezier(0.7, 1.5, 0.6, 1)' },
      })

      // More accurate spring using linear() function (CSS Easing Level 2)
      // linear() allows defining easing with multiple keyframe points
      rules.push({
        pattern: 'ease-spring-linear',
        properties: {
          'transition-timing-function': `linear(
            0, 0.009, 0.035, 0.077, 0.134, 0.206, 0.291, 0.388, 0.495,
            0.609, 0.726, 0.844, 0.958, 1.066, 1.166, 1.256, 1.335,
            1.402, 1.458, 1.502, 1.536, 1.560, 1.576, 1.584, 1.586,
            1.583, 1.577, 1.567, 1.556, 1.544, 1.531, 1.518, 1.505,
            1.493, 1.481, 1.471, 1.461, 1.452, 1.445, 1.438, 1.432,
            1.427, 1.423, 1.419, 1.416, 1.414, 1.412, 1.410, 1.409, 1
          )`,
        },
      })

      // Bounce easing presets
      rules.push({
        pattern: 'ease-bounce',
        properties: {
          'transition-timing-function': `linear(
            0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141, 0.191, 0.25,
            0.316, 0.391, 0.472, 0.562, 0.66, 0.765, 0.878, 1, 0.89,
            0.78, 0.705, 0.64, 0.605, 0.58, 0.565, 0.56, 0.565, 0.58,
            0.605, 0.64, 0.705, 0.78, 0.89, 1, 0.945, 0.91, 0.9, 0.91,
            0.945, 1
          )`,
        },
      })
      rules.push({
        pattern: 'ease-bounce-in',
        properties: {
          'transition-timing-function': `linear(
            0, 0.01, 0.04, 0.09, 0.04, 0.01, 0, 0.08, 0.32, 0.08, 0,
            0.18, 0.72, 0.18, 0, 1
          )`,
        },
      })
      rules.push({
        pattern: 'ease-bounce-out',
        properties: {
          'transition-timing-function': `linear(
            0, 1, 0.82, 0.72, 0.82, 1, 0.92, 0.68, 0.92, 1, 0.96, 0.91,
            0.96, 1, 0.99, 0.99, 1
          )`,
        },
      })

      // Elastic easing
      rules.push({
        pattern: 'ease-elastic',
        properties: {
          'transition-timing-function': `linear(
            0, 0.002, 0.01, 0.024, 0.042, 0.067, 0.099, 0.138, 0.185,
            0.24, 0.305, 0.381, 0.469, 0.572, 0.693, 0.835, 1, 1.14,
            1.22, 1.24, 1.2, 1.12, 1.02, 0.92, 0.84, 0.8, 0.8, 0.84,
            0.9, 0.96, 1.02, 1.06, 1.08, 1.06, 1.02, 0.98, 0.96, 0.96,
            0.98, 1
          )`,
        },
      })
      rules.push({
        pattern: 'ease-elastic-in',
        properties: {
          'transition-timing-function': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        },
      })
      rules.push({
        pattern: 'ease-elastic-out',
        properties: {
          'transition-timing-function': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
      })
      rules.push({
        pattern: 'ease-elastic-in-out',
        properties: {
          'transition-timing-function': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        },
      })

      // Back easing (overshoots)
      rules.push({
        pattern: 'ease-back-in',
        properties: { 'transition-timing-function': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' },
      })
      rules.push({
        pattern: 'ease-back-out',
        properties: { 'transition-timing-function': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
      })
      rules.push({
        pattern: 'ease-back-in-out',
        properties: { 'transition-timing-function': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
      })

      // Expo easing (exponential)
      rules.push({
        pattern: 'ease-expo-in',
        properties: { 'transition-timing-function': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)' },
      })
      rules.push({
        pattern: 'ease-expo-out',
        properties: { 'transition-timing-function': 'cubic-bezier(0.19, 1, 0.22, 1)' },
      })
      rules.push({
        pattern: 'ease-expo-in-out',
        properties: { 'transition-timing-function': 'cubic-bezier(1, 0, 0, 1)' },
      })

      // Circ easing (circular)
      rules.push({
        pattern: 'ease-circ-in',
        properties: { 'transition-timing-function': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)' },
      })
      rules.push({
        pattern: 'ease-circ-out',
        properties: { 'transition-timing-function': 'cubic-bezier(0.075, 0.82, 0.165, 1)' },
      })
      rules.push({
        pattern: 'ease-circ-in-out',
        properties: { 'transition-timing-function': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' },
      })

      // Smooth/Emphasized easing (Material Design style)
      rules.push({
        pattern: 'ease-emphasized',
        properties: { 'transition-timing-function': 'cubic-bezier(0.2, 0, 0, 1)' },
      })
      rules.push({
        pattern: 'ease-emphasized-decelerate',
        properties: { 'transition-timing-function': 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
      })
      rules.push({
        pattern: 'ease-emphasized-accelerate',
        properties: { 'transition-timing-function': 'cubic-bezier(0.3, 0, 0.8, 0.15)' },
      })

      // ========================================
      // SPRING ANIMATION PRESETS
      // (Keyframes are exported separately via getSpringKeyframes())
      // ========================================

      // Spring pop animation
      rules.push({
        pattern: 'animate-spring-pop',
        properties: {
          animation: 'coral-spring-pop 0.4s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })

      // Spring slide animations
      rules.push({
        pattern: 'animate-spring-slide-up',
        properties: {
          animation: 'coral-spring-slide-up 0.5s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })
      rules.push({
        pattern: 'animate-spring-slide-down',
        properties: {
          animation: 'coral-spring-slide-down 0.5s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })
      rules.push({
        pattern: 'animate-spring-slide-left',
        properties: {
          animation: 'coral-spring-slide-left 0.5s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })
      rules.push({
        pattern: 'animate-spring-slide-right',
        properties: {
          animation: 'coral-spring-slide-right 0.5s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })

      // Spring bounce animation
      rules.push({
        pattern: 'animate-spring-bounce',
        properties: {
          animation: 'coral-spring-bounce 0.6s cubic-bezier(0.5, 1.8, 0.5, 1)',
        },
      })

      // Spring scale animation
      rules.push({
        pattern: 'animate-spring-scale',
        properties: {
          animation: 'coral-spring-scale 0.4s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
        },
      })

      // Spring rotate animation
      rules.push({
        pattern: 'animate-spring-rotate',
        properties: {
          animation: 'coral-spring-rotate 0.5s cubic-bezier(0.5, 1.5, 0.5, 1)',
        },
      })

      // Elastic bounce animation
      rules.push({
        pattern: 'animate-elastic',
        properties: {
          animation: 'coral-elastic 0.8s cubic-bezier(0.5, 1.8, 0.3, 1)',
        },
      })

      // Jello animation (wiggly)
      rules.push({
        pattern: 'animate-jello',
        properties: {
          animation: 'coral-jello 0.9s both',
        },
      })

      // Rubber band animation
      rules.push({
        pattern: 'animate-rubber',
        properties: {
          animation: 'coral-rubber 0.8s both',
        },
      })

      // Wobble animation
      rules.push({
        pattern: 'animate-wobble',
        properties: {
          animation: 'coral-wobble 0.8s both',
        },
      })

      // Head shake animation
      rules.push({
        pattern: 'animate-headshake',
        properties: {
          animation: 'coral-headshake 0.5s ease-in-out',
        },
      })

      // Swing animation
      rules.push({
        pattern: 'animate-swing',
        properties: {
          animation: 'coral-swing 0.6s ease-out',
          'transform-origin': 'top center',
        },
      })

      // Heartbeat animation
      rules.push({
        pattern: 'animate-heartbeat',
        properties: {
          animation: 'coral-heartbeat 1.3s ease-in-out infinite both',
        },
      })

      // ========================================
      // SCROLL-DRIVEN ANIMATIONS (CSS Level 2)
      // ========================================

      // Animation timeline utilities
      rules.push({
        pattern: 'animation-timeline-auto',
        properties: { 'animation-timeline': 'auto' },
      })
      rules.push({
        pattern: 'animation-timeline-none',
        properties: { 'animation-timeline': 'none' },
      })
      rules.push({
        pattern: 'animation-timeline-scroll',
        properties: { 'animation-timeline': 'scroll()' },
      })
      rules.push({
        pattern: 'animation-timeline-scroll-x',
        properties: { 'animation-timeline': 'scroll(x)' },
      })
      rules.push({
        pattern: 'animation-timeline-scroll-y',
        properties: { 'animation-timeline': 'scroll(y)' },
      })
      rules.push({
        pattern: 'animation-timeline-scroll-inline',
        properties: { 'animation-timeline': 'scroll(inline)' },
      })
      rules.push({
        pattern: 'animation-timeline-scroll-block',
        properties: { 'animation-timeline': 'scroll(block)' },
      })

      // View timeline (element visibility)
      rules.push({
        pattern: 'animation-timeline-view',
        properties: { 'animation-timeline': 'view()' },
      })
      rules.push({
        pattern: 'animation-timeline-view-x',
        properties: { 'animation-timeline': 'view(x)' },
      })
      rules.push({
        pattern: 'animation-timeline-view-y',
        properties: { 'animation-timeline': 'view(y)' },
      })
      rules.push({
        pattern: 'animation-timeline-view-inline',
        properties: { 'animation-timeline': 'view(inline)' },
      })
      rules.push({
        pattern: 'animation-timeline-view-block',
        properties: { 'animation-timeline': 'view(block)' },
      })

      // Animation range (for scroll-driven)
      rules.push({
        pattern: 'animation-range-normal',
        properties: { 'animation-range': 'normal' },
      })
      rules.push({
        pattern: 'animation-range-cover',
        properties: { 'animation-range': 'cover' },
      })
      rules.push({
        pattern: 'animation-range-contain',
        properties: { 'animation-range': 'contain' },
      })
      rules.push({
        pattern: 'animation-range-entry',
        properties: { 'animation-range': 'entry' },
      })
      rules.push({
        pattern: 'animation-range-exit',
        properties: { 'animation-range': 'exit' },
      })
      rules.push({
        pattern: 'animation-range-entry-crossing',
        properties: { 'animation-range': 'entry-crossing' },
      })
      rules.push({
        pattern: 'animation-range-exit-crossing',
        properties: { 'animation-range': 'exit-crossing' },
      })

      // Arbitrary animation range
      rules.push({
        pattern: /^animation-range-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'animation-range': v } }
        },
      })

      // Arbitrary animation timeline
      rules.push({
        pattern: /^animation-timeline-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'animation-timeline': v } }
        },
      })

      // Timeline scope (for named timelines)
      rules.push({
        pattern: /^timeline-scope-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'timeline-scope': `--${v}` } }
        },
      })

      // View timeline name
      rules.push({
        pattern: /^view-timeline-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'view-timeline-name': `--${v}` } }
        },
      })

      // Scroll timeline name
      rules.push({
        pattern: /^scroll-timeline-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'scroll-timeline-name': `--${v}` } }
        },
      })

      // ========================================
      // ANIMATION COMPOSITION
      // ========================================

      rules.push({
        pattern: 'animation-composition-replace',
        properties: { 'animation-composition': 'replace' },
      })
      rules.push({
        pattern: 'animation-composition-add',
        properties: { 'animation-composition': 'add' },
      })
      rules.push({
        pattern: 'animation-composition-accumulate',
        properties: { 'animation-composition': 'accumulate' },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default transitionsPlugin
