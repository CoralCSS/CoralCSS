/**
 * Semantic Design Tokens
 *
 * Meaningful, context-aware tokens that reference primitives.
 * These provide semantic meaning and enable theming.
 *
 * @module tokens/semantic
 */

import { ref } from './ref'
import type { ColorTokens, TypographyTokens, SpacingTokens, ShadowTokens } from './types'

/**
 * Light theme semantic colors
 */
export const lightSemanticColors: ColorTokens = {
  // Background colors
  background: {
    default: '#ffffff',
    subtle: '#f8fafc',
    muted: '#f1f5f9',
    emphasized: '#e2e8f0',
    inverse: '#0f172a',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Foreground/text colors
  foreground: {
    default: '#0f172a',
    muted: '#475569',
    subtle: '#64748b',
    disabled: '#94a3b8',
    inverse: '#ffffff',
    onAccent: '#ffffff',
  },

  // Border colors
  border: {
    default: '#e2e8f0',
    muted: '#f1f5f9',
    emphasis: '#cbd5e1',
    focus: '#ff6b6b',
  },

  // Accent/brand colors
  accent: {
    default: '#ff6b6b',
    emphasis: '#ff4757',
    muted: '#ffc9bf',
    subtle: '#fff5f3',
    foreground: '#ffffff',
  },

  // Status colors
  status: {
    success: '#22c55e',
    successSubtle: '#f0fdf4',
    successMuted: '#dcfce7',
    successForeground: '#166534',

    warning: '#eab308',
    warningSubtle: '#fefce8',
    warningMuted: '#fef9c3',
    warningForeground: '#854d0e',

    error: '#ef4444',
    errorSubtle: '#fef2f2',
    errorMuted: '#fee2e2',
    errorForeground: '#991b1b',

    info: '#3b82f6',
    infoSubtle: '#eff6ff',
    infoMuted: '#dbeafe',
    infoForeground: '#1e40af',
  },

  // Interactive states
  interactive: {
    hover: 'rgba(0, 0, 0, 0.04)',
    active: 'rgba(0, 0, 0, 0.08)',
    selected: '#fff5f3',
    disabled: '#f1f5f9',
  },
}

/**
 * Dark theme semantic colors
 */
export const darkSemanticColors: ColorTokens = {
  // Background colors
  background: {
    default: '#0f172a',
    subtle: '#1e293b',
    muted: '#334155',
    emphasized: '#475569',
    inverse: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.75)',
  },

  // Foreground/text colors
  foreground: {
    default: '#f8fafc',
    muted: '#cbd5e1',
    subtle: '#94a3b8',
    disabled: '#64748b',
    inverse: '#0f172a',
    onAccent: '#ffffff',
  },

  // Border colors
  border: {
    default: '#334155',
    muted: '#1e293b',
    emphasis: '#475569',
    focus: '#ff6b6b',
  },

  // Accent/brand colors
  accent: {
    default: '#ff6b6b',
    emphasis: '#ff7a63',
    muted: '#5c0a0a',
    subtle: 'rgba(255, 107, 107, 0.1)',
    foreground: '#ffffff',
  },

  // Status colors
  status: {
    success: '#22c55e',
    successSubtle: 'rgba(34, 197, 94, 0.1)',
    successMuted: 'rgba(34, 197, 94, 0.2)',
    successForeground: '#86efac',

    warning: '#eab308',
    warningSubtle: 'rgba(234, 179, 8, 0.1)',
    warningMuted: 'rgba(234, 179, 8, 0.2)',
    warningForeground: '#fde047',

    error: '#ef4444',
    errorSubtle: 'rgba(239, 68, 68, 0.1)',
    errorMuted: 'rgba(239, 68, 68, 0.2)',
    errorForeground: '#fca5a5',

    info: '#3b82f6',
    infoSubtle: 'rgba(59, 130, 246, 0.1)',
    infoMuted: 'rgba(59, 130, 246, 0.2)',
    infoForeground: '#93c5fd',
  },

  // Interactive states
  interactive: {
    hover: 'rgba(255, 255, 255, 0.04)',
    active: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 107, 107, 0.1)',
    disabled: '#1e293b',
  },
}

/**
 * Semantic typography tokens
 */
export const semanticTypography: TypographyTokens = {
  fontFamily: {
    body: ref('primitives.fonts.sans'),
    heading: ref('primitives.fonts.sans'),
    mono: ref('primitives.fonts.mono'),
  },

  fontSize: {
    // Display sizes
    'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
    'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
    'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
    'display-xs': ['1.5rem', { lineHeight: '1.3' }],

    // Heading sizes
    'heading-xl': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
    'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
    'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
    'heading-sm': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
    'heading-xs': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],

    // Body sizes
    'body-xl': ['1.25rem', { lineHeight: '1.75' }],
    'body-lg': ['1.125rem', { lineHeight: '1.75' }],
    'body-md': ['1rem', { lineHeight: '1.5' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5' }],
    'body-xs': ['0.75rem', { lineHeight: '1.5' }],

    // Label sizes
    'label-lg': ['0.875rem', { lineHeight: '1.25', fontWeight: '500' }],
    'label-md': ['0.875rem', { lineHeight: '1.25', fontWeight: '500' }],
    'label-sm': ['0.75rem', { lineHeight: '1.25', fontWeight: '500' }],
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.025em',
  },
}

/**
 * Semantic spacing tokens
 */
export const semanticSpacing: SpacingTokens = {
  // Layout spacing
  'page-x': '1rem',       // Page horizontal padding (mobile)
  'page-x-sm': '1.5rem',  // Page horizontal padding (tablet)
  'page-x-lg': '2rem',    // Page horizontal padding (desktop)

  // Section spacing
  'section-y': '4rem',    // Vertical section padding
  'section-y-lg': '6rem', // Large vertical section padding

  // Component spacing
  'component-padding-xs': '0.5rem',
  'component-padding-sm': '0.75rem',
  'component-padding-md': '1rem',
  'component-padding-lg': '1.5rem',
  'component-padding-xl': '2rem',

  // Gap/gutter spacing
  'gap-xs': '0.25rem',
  'gap-sm': '0.5rem',
  'gap-md': '1rem',
  'gap-lg': '1.5rem',
  'gap-xl': '2rem',

  // Stack spacing (vertical rhythm)
  'stack-xs': '0.25rem',
  'stack-sm': '0.5rem',
  'stack-md': '0.75rem',
  'stack-lg': '1rem',
  'stack-xl': '1.5rem',

  // Inline spacing (horizontal)
  'inline-xs': '0.25rem',
  'inline-sm': '0.5rem',
  'inline-md': '0.75rem',
  'inline-lg': '1rem',
  'inline-xl': '1.5rem',
}

/**
 * Semantic shadow tokens
 */
export const semanticShadows: ShadowTokens = {
  // Elevation levels
  'elevation-1': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'elevation-2': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'elevation-3': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'elevation-4': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'elevation-5': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Component-specific
  'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'dropdown': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'modal': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'tooltip': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'button': '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  // Focus ring
  'focus-ring': '0 0 0 2px var(--color-accent-default)',
  'focus-ring-offset': '0 0 0 2px var(--color-background-default), 0 0 0 4px var(--color-accent-default)',
}

/**
 * Semantic border radius tokens
 */
export const semanticRadii = {
  'none': '0',
  'sm': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',

  // Component-specific
  'button': '0.75rem',
  'input': '0.75rem',
  'card': '1rem',
  'modal': '1rem',
  'badge': '9999px',
  'avatar': '9999px',
}

/**
 * Semantic z-index tokens
 */
export const semanticZIndex = {
  'hide': -1,
  'base': 0,
  'dropdown': 1000,
  'sticky': 1100,
  'fixed': 1200,
  'drawer': 1300,
  'modal-backdrop': 1400,
  'modal': 1500,
  'popover': 1600,
  'tooltip': 1700,
  'toast': 1800,
  'max': 9999,
}

/**
 * Semantic duration tokens
 */
export const semanticDurations = {
  'instant': '0ms',
  'fast': '100ms',
  'normal': '200ms',
  'slow': '300ms',
  'slower': '500ms',
  'slowest': '1000ms',

  // Specific interactions
  'button': '150ms',
  'input': '150ms',
  'modal': '200ms',
  'drawer': '300ms',
  'tooltip': '150ms',
  'toast': '300ms',
}

/**
 * Semantic easing tokens
 */
export const semanticEasings = {
  'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  // Specific interactions
  'button': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'modal': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'drawer': 'cubic-bezier(0.16, 1, 0.3, 1)',
}

/**
 * Combined semantic tokens for light theme
 */
export const lightSemanticTokens = {
  colors: lightSemanticColors,
  typography: semanticTypography,
  spacing: semanticSpacing,
  shadows: semanticShadows,
  radii: semanticRadii,
  zIndex: semanticZIndex,
  durations: semanticDurations,
  easings: semanticEasings,
}

/**
 * Combined semantic tokens for dark theme
 */
export const darkSemanticTokens = {
  colors: darkSemanticColors,
  typography: semanticTypography,
  spacing: semanticSpacing,
  shadows: semanticShadows,
  radii: semanticRadii,
  zIndex: semanticZIndex,
  durations: semanticDurations,
  easings: semanticEasings,
}
