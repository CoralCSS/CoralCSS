/**
 * Advanced Animation Utilities Plugin
 *
 * Physics-based animations, scroll-driven animations, view transitions,
 * and gesture animations that go beyond standard CSS animations.
 *
 * @module plugins/core/utilities/advanced-animations
 */

import type { Plugin } from '../../../types'

/**
 * Advanced Animation Utilities Plugin for CoralCSS
 *
 * Features:
 * - Physics-based animations (spring, bounce, elastic)
 * - Scroll-driven animations (using animation-timeline)
 * - View transition API animations
 * - Gesture animations (swipe, shake)
 * - Magnetic hover effects
 *
 * @example
 * ```html
 * <div class="animate-spring-md">Bouncy entrance</div>
 * <div class="animate-scroll-fade-in">Fades in as you scroll</div>
 * <button class="animate-shake-on-error">Error feedback</button>
 * ```
 */
export const advancedAnimationsPlugin = (): Plugin => ({
  name: 'advanced-animations',
  version: '1.0.0',
  install(api) {
    // ========================================
    // PHYSICS-BASED ANIMATIONS
    // ========================================

    // Spring animations - using custom bezier curves for spring physics
    api.addRule({
      pattern: 'animate-spring-sm',
      generate: () => ({
        'animation': 'spring-sm 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      })
    })

    api.addRule({
      pattern: 'animate-spring-md',
      generate: () => ({
        'animation': 'spring-md 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      })
    })

    api.addRule({
      pattern: 'animate-spring-lg',
      generate: () => ({
        'animation': 'spring-lg 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      })
    })

    // Bounce animations
    api.addRule({
      pattern: 'animate-bounce-in',
      generate: () => ({
        'animation': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      })
    })

    api.addRule({
      pattern: 'animate-bounce-out',
      generate: () => ({
        'animation': 'bounce-out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
      })
    })

    // Elastic animations
    api.addRule({
      pattern: 'animate-elastic',
      generate: () => ({
        'animation': 'elastic 1s ease-out'
      })
    })

    api.addRule({
      pattern: 'animate-elastic-in',
      generate: () => ({
        'animation': 'elastic-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      })
    })

    // ========================================
    // SCROLL-DRIVEN ANIMATIONS
    // ========================================

    // Scroll fade-in
    api.addRule({
      pattern: 'animate-scroll-fade-in',
      generate: () => ({
        'animation': 'scroll-fade-in linear both',
        'animation-timeline': 'view()'
      })
    })

    // Scroll scale
    api.addRule({
      pattern: 'animate-scroll-scale',
      generate: () => ({
        'animation': 'scroll-scale linear both',
        'animation-timeline': 'view()',
        'animation-range': 'entry 0% entry 100%'
      })
    })

    // Scroll rotate
    api.addRule({
      pattern: 'animate-scroll-rotate',
      generate: () => ({
        'animation': 'scroll-rotate linear both',
        'animation-timeline': 'view()'
      })
    })

    // Scroll slide-up
    api.addRule({
      pattern: 'animate-scroll-slide-up',
      generate: () => ({
        'animation': 'scroll-slide-up linear both',
        'animation-timeline': 'view()'
      })
    })

    // Scroll blur-in
    api.addRule({
      pattern: 'animate-scroll-blur-in',
      generate: () => ({
        'animation': 'scroll-blur-in linear both',
        'animation-timeline': 'view()'
      })
    })

    // ========================================
    // GESTURE ANIMATIONS
    // ========================================

    // Swipe left
    api.addRule({
      pattern: 'animate-swipe-left',
      generate: () => ({
        'animation': 'swipe-left 0.3s ease-out forwards'
      })
    })

    // Swipe right
    api.addRule({
      pattern: 'animate-swipe-right',
      generate: () => ({
        'animation': 'swipe-right 0.3s ease-out forwards'
      })
    })

    // Swipe up
    api.addRule({
      pattern: 'animate-swipe-up',
      generate: () => ({
        'animation': 'swipe-up 0.3s ease-out forwards'
      })
    })

    // Swipe down
    api.addRule({
      pattern: 'animate-swipe-down',
      generate: () => ({
        'animation': 'swipe-down 0.3s ease-out forwards'
      })
    })

    // Shake animation (for errors)
    api.addRule({
      pattern: 'animate-shake',
      generate: () => ({
        'animation': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
      })
    })

    // Wiggle animation
    api.addRule({
      pattern: 'animate-wiggle',
      generate: () => ({
        'animation': 'wiggle 0.5s ease-in-out'
      })
    })

    // Pulse-glow (enhanced pulse)
    api.addRule({
      pattern: 'animate-pulse-glow',
      generate: () => ({
        'animation': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      })
    })

    // ========================================
    // MAGNETIC HOVER EFFECTS
    // ========================================

    // Magnetic pull with transition
    api.addRule({
      pattern: 'hover:animate-magnetic',
      generate: () => ({
        'transition': 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      })
    })

    // Magnetic pull with rotate
    api.addRule({
      pattern: 'hover:animate-magnetic-rotate',
      generate: () => ({
        'transition': 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      })
    })

    // ========================================
    // VIEW TRANSITION ANIMATIONS
    // ========================================

    api.addRule({
      pattern: 'view-transition-fade',
      generate: () => ({
        'view-transition-name': 'fade'
      })
    })

    api.addRule({
      pattern: 'view-transition-slide',
      generate: () => ({
        'view-transition-name': 'slide'
      })
    })

    api.addRule({
      pattern: 'view-transition-scale',
      generate: () => ({
        'view-transition-name': 'scale'
      })
    })

    // ========================================
    // SPECIAL EFFECTS
    // ========================================

    // Glitch effect
    api.addRule({
      pattern: 'animate-glitch',
      generate: () => ({
        'animation': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite'
      })
    })

    // Typewriter effect
    api.addRule({
      pattern: 'animate-typewriter',
      generate: () => ({
        'overflow': 'hidden',
        'white-space': 'nowrap',
        'animation': 'typewriter 2s steps(40, end)'
      })
    })

    // Reveal effect
    api.addRule({
      pattern: 'animate-reveal',
      generate: () => ({
        'animation': 'reveal 0.6s ease-out forwards'
      })
    })

    // Morphing effect
    api.addRule({
      pattern: 'animate-morph',
      generate: () => ({
        'animation': 'morph 0.5s ease-in-out'
      })
    })
  }
})

export default advancedAnimationsPlugin
