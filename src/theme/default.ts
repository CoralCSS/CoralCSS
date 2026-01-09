/**
 * Default Theme
 *
 * Complete default theme configuration.
 * @module theme/default
 */

import type { Theme } from '../types'
import { colors } from './colors'
import { spacing, sizing, zIndex } from './spacing'
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacing } from './typography'

/**
 * Border radius scale
 */
export const borderRadius = {
  'none': '0px',
  'sm': '0.125rem',
  'DEFAULT': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
}

/**
 * Border width scale
 */
export const borderWidth = {
  'DEFAULT': '1px',
  '0': '0px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
}

/**
 * Box shadow scale
 */
export const boxShadow = {
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  'none': 'none',
}

/**
 * Opacity scale
 */
export const opacity = {
  '0': '0',
  '5': '0.05',
  '10': '0.1',
  '15': '0.15',
  '20': '0.2',
  '25': '0.25',
  '30': '0.3',
  '35': '0.35',
  '40': '0.4',
  '45': '0.45',
  '50': '0.5',
  '55': '0.55',
  '60': '0.6',
  '65': '0.65',
  '70': '0.7',
  '75': '0.75',
  '80': '0.8',
  '85': '0.85',
  '90': '0.9',
  '95': '0.95',
  '100': '1',
}

/**
 * Transition duration scale
 */
export const transitionDuration = {
  '0': '0s',
  '75': '75ms',
  '100': '100ms',
  '150': '150ms',
  '200': '200ms',
  '300': '300ms',
  '500': '500ms',
  '700': '700ms',
  '1000': '1000ms',
}

/**
 * Transition timing functions
 */
export const transitionTimingFunction = {
  'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}

/**
 * Animation definitions
 */
export const animation = {
  'none': 'none',
  'spin': 'spin 1s linear infinite',
  'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce': 'bounce 1s infinite',
}

/**
 * Breakpoints
 */
export const screens = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}

/**
 * Container query sizes
 */
export const containers = {
  'sm': '20rem',    // 320px
  'md': '28rem',    // 448px
  'lg': '32rem',    // 512px
  'xl': '36rem',    // 576px
  '2xl': '42rem',   // 672px
  '3xl': '48rem',   // 768px
  '4xl': '56rem',   // 896px
  '5xl': '64rem',   // 1024px
  '6xl': '72rem',   // 1152px
  '7xl': '80rem',   // 1280px
}

/**
 * Blur values
 */
export const blur = {
  'none': '0',
  'sm': '4px',
  'DEFAULT': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '24px',
  '2xl': '40px',
  '3xl': '64px',
}

/**
 * Drop shadow values
 */
export const dropShadow = {
  'sm': '0 1px 1px rgb(0 0 0 / 0.05)',
  'DEFAULT': ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
  'md': ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
  'lg': ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
  'xl': ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
  '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
  'none': '0 0 #0000',
}

/**
 * Complete default theme
 */
export const defaultTheme: Theme = {
  colors,
  spacing,
  sizing,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  borderRadius,
  borderWidth,
  boxShadow,
  opacity,
  zIndex,
  transitionDuration,
  transitionTimingFunction,
  animation,
  screens,
  containers,
}

/**
 * Get default theme
 */
export function getDefaultTheme(): Theme {
  return defaultTheme
}

/**
 * Keyframes definitions
 */
export const keyframes = {
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '.5' },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
}
