/**
 * Keyframes Plugin
 *
 * CSS Keyframe animations for CoralCSS advanced effects
 * @module plugins/core/utilities/keyframes
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Base CSS with all keyframe animations
 * This gets injected as @layer base
 */
export const keyframesCSS = `
/* Gradient Animations */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes wave {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes gradient-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes gradient-rotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

/* Spring Animations */
@keyframes spring-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes spring-out {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); }
  100% { transform: scale(0); opacity: 0; }
}

@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes elastic {
  0% { transform: scale(0); }
  55% { transform: scale(1); }
  70% { transform: scale(0.98); }
  85% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes jello {
  0%, 100% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
}

@keyframes rubber-band {
  0% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
  100% { transform: scale3d(1, 1, 1); }
}

/* Skeleton Loading */
@keyframes skeleton-loading {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Glow Animation */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 15px currentColor, 0 0 30px currentColor; }
  50% { box-shadow: 0 0 25px currentColor, 0 0 50px currentColor; }
}

/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Pulse Animations */
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
}

/* Wiggle Animation */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* Shake Animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Swing Animation */
@keyframes swing {
  20% { transform: rotate3d(0, 0, 1, 15deg); }
  40% { transform: rotate3d(0, 0, 1, -10deg); }
  60% { transform: rotate3d(0, 0, 1, 5deg); }
  80% { transform: rotate3d(0, 0, 1, -5deg); }
  100% { transform: rotate3d(0, 0, 1, 0deg); }
}

/* Heartbeat Animation */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}

/* Breathing Animation */
@keyframes breathing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Ripple Animation */
@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

/* Slide Animations */
@keyframes slide-in-left {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-up {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-down {
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Zoom Animations */
@keyframes zoom-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes zoom-out {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.5); opacity: 0; }
}

/* Flip Animations */
@keyframes flip-in-x {
  0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
  100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
}

@keyframes flip-in-y {
  0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
  100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
}

/* Bounce Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

@keyframes bounce-subtle {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Tada Animation */
@keyframes tada {
  0%, 100% { transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg); }
  10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }
  30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }
  40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }
}

/* Wobble Animation */
@keyframes wobble {
  0%, 100% { transform: translateX(0) rotate3d(0, 0, 1, 0deg); }
  15% { transform: translateX(-25%) rotate3d(0, 0, 1, -5deg); }
  30% { transform: translateX(20%) rotate3d(0, 0, 1, 3deg); }
  45% { transform: translateX(-15%) rotate3d(0, 0, 1, -3deg); }
  60% { transform: translateX(10%) rotate3d(0, 0, 1, 2deg); }
  75% { transform: translateX(-5%) rotate3d(0, 0, 1, -1deg); }
}

/* Flash Animation */
@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

/* Blink Animation */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Pop Animation */
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Spin Slow */
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Ping */
@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}

/* Background pan */
@keyframes bg-pan-left {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes bg-pan-right {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* Marquee */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

/* Typewriter cursor */
@keyframes cursor-blink {
  0%, 100% { border-color: transparent; }
  50% { border-color: currentColor; }
}

/* Progress indeterminate */
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

/* Coral button ripple */
@keyframes coral-ripple {
  0% { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(4); opacity: 0; }
}

/* Morph shape */
@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

/* 3D rotate */
@keyframes rotate-3d {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* Gradient border rotation */
@keyframes border-gradient-rotate {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
`

/**
 * Keyframes Plugin
 */
export function keyframesPlugin(): Plugin {
  return {
    name: 'keyframes',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // Add animation utilities that use the keyframes
      const animations: Record<string, string> = {
        // Float
        'animate-float': 'float 3s ease-in-out infinite',
        'animate-float-slow': 'float-slow 4s ease-in-out infinite',
        // Pulse
        'animate-pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'animate-pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        // Wiggle
        'animate-wiggle': 'wiggle 0.5s ease-in-out infinite',
        // Shake
        'animate-shake': 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        // Swing
        'animate-swing': 'swing 1s ease-in-out',
        // Heartbeat
        'animate-heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        // Breathing
        'animate-breathing': 'breathing 3s ease-in-out infinite',
        // Slide
        'animate-slide-in-left': 'slide-in-left 0.5s ease-out',
        'animate-slide-in-right': 'slide-in-right 0.5s ease-out',
        'animate-slide-in-up': 'slide-in-up 0.5s ease-out',
        'animate-slide-in-down': 'slide-in-down 0.5s ease-out',
        // Zoom
        'animate-zoom-in': 'zoom-in 0.3s ease-out',
        'animate-zoom-out': 'zoom-out 0.3s ease-out',
        // Flip
        'animate-flip-in-x': 'flip-in-x 0.5s ease-out',
        'animate-flip-in-y': 'flip-in-y 0.5s ease-out',
        // Bounce
        'animate-bounce-subtle': 'bounce-subtle 1s ease infinite',
        // Attention
        'animate-tada': 'tada 1s ease-in-out',
        'animate-wobble': 'wobble 1s ease-in-out',
        'animate-flash': 'flash 1s ease-in-out infinite',
        'animate-blink': 'blink 1s step-end infinite',
        'animate-pop': 'pop 0.3s ease-out',
        // Spin variations
        'animate-spin-slow': 'spin-slow 3s linear infinite',
        // Marquee
        'animate-marquee': 'marquee 25s linear infinite',
        'animate-marquee-reverse': 'marquee-reverse 25s linear infinite',
        // Progress
        'animate-progress': 'progress-indeterminate 1.5s ease-in-out infinite',
        // Morph
        'animate-morph': 'morph 8s ease-in-out infinite',
        // 3D
        'animate-rotate-3d': 'rotate-3d 4s linear infinite',
        // Background
        'animate-bg-pan-left': 'bg-pan-left 3s linear infinite',
        'animate-bg-pan-right': 'bg-pan-right 3s linear infinite',
      }

      for (const [key, value] of Object.entries(animations)) {
        ctx.addRule({
          pattern: key,
          properties: { animation: value },
        })
      }

      // Animation modifiers
      const durations = ['75', '100', '150', '200', '300', '500', '700', '1000', '1500', '2000', '3000']
      for (const duration of durations) {
        ctx.addRule({
          pattern: `duration-${duration}`,
          properties: { 'animation-duration': `${duration}ms` },
        })
      }

      const delays = ['75', '100', '150', '200', '300', '500', '700', '1000']
      for (const delay of delays) {
        ctx.addRule({
          pattern: `delay-${delay}`,
          properties: { 'animation-delay': `${delay}ms` },
        })
      }

      // Iteration count
      ctx.addRule({ pattern: 'animate-once', properties: { 'animation-iteration-count': '1' } })
      ctx.addRule({ pattern: 'animate-twice', properties: { 'animation-iteration-count': '2' } })
      ctx.addRule({ pattern: 'animate-thrice', properties: { 'animation-iteration-count': '3' } })
      ctx.addRule({ pattern: 'animate-infinite', properties: { 'animation-iteration-count': 'infinite' } })

      // Direction
      ctx.addRule({ pattern: 'animate-normal', properties: { 'animation-direction': 'normal' } })
      ctx.addRule({ pattern: 'animate-reverse', properties: { 'animation-direction': 'reverse' } })
      ctx.addRule({ pattern: 'animate-alternate', properties: { 'animation-direction': 'alternate' } })
      ctx.addRule({ pattern: 'animate-alternate-reverse', properties: { 'animation-direction': 'alternate-reverse' } })

      // Fill mode
      ctx.addRule({ pattern: 'animate-fill-none', properties: { 'animation-fill-mode': 'none' } })
      ctx.addRule({ pattern: 'animate-fill-forwards', properties: { 'animation-fill-mode': 'forwards' } })
      ctx.addRule({ pattern: 'animate-fill-backwards', properties: { 'animation-fill-mode': 'backwards' } })
      ctx.addRule({ pattern: 'animate-fill-both', properties: { 'animation-fill-mode': 'both' } })

      // Play state
      ctx.addRule({ pattern: 'animate-running', properties: { 'animation-play-state': 'running' } })
      ctx.addRule({ pattern: 'animate-paused', properties: { 'animation-play-state': 'paused' } })
    },
  }
}

export default keyframesPlugin
