/**
 * Design Tokens System
 *
 * Comprehensive design tokens for building consistent design systems.
 * Supports token aliasing, theming, and multiple export formats.
 * @module theme/tokens
 */

import type { DarkModeStrategy } from '../types'

/**
 * Token value with optional description
 */
export interface TokenValue {
  value: string
  description?: string
  deprecated?: boolean
  /** Reference to another token */
  ref?: string
}

/**
 * Token category with nested tokens
 */
export type TokenCategory = {
  [key: string]: TokenValue | TokenCategory | string
}

/**
 * Complete design tokens structure
 */
export interface DesignTokens {
  /** Color tokens */
  colors: {
    /** Primitive/base colors */
    primitive: TokenCategory
    /** Semantic color tokens */
    semantic: TokenCategory
  }
  /** Spacing tokens */
  spacing: TokenCategory
  /** Sizing tokens */
  sizing: TokenCategory
  /** Typography tokens */
  typography: {
    fontFamily: TokenCategory
    fontSize: TokenCategory
    fontWeight: TokenCategory
    lineHeight: TokenCategory
    letterSpacing: TokenCategory
  }
  /** Border tokens */
  borders: {
    width: TokenCategory
    radius: TokenCategory
    color: TokenCategory
  }
  /** Shadow tokens */
  shadows: TokenCategory
  /** Motion/animation tokens */
  motion: {
    duration: TokenCategory
    easing: TokenCategory
  }
  /** Opacity tokens */
  opacity: TokenCategory
  /** Z-index tokens */
  zIndex: TokenCategory
  /** Breakpoints */
  breakpoints: TokenCategory
}

/**
 * Token output format
 */
export type TokenFormat = 'css' | 'scss' | 'less' | 'json' | 'js' | 'ts'

/**
 * Default design tokens for CoralCSS
 */
export const defaultDesignTokens: DesignTokens = {
  colors: {
    primitive: {
      // Coral palette
      'coral-50': { value: '#fff7ed', description: 'Lightest coral' },
      'coral-100': { value: '#ffedd5', description: 'Very light coral' },
      'coral-200': { value: '#fed7aa', description: 'Light coral' },
      'coral-300': { value: '#fdba74', description: 'Light-medium coral' },
      'coral-400': { value: '#fb923c', description: 'Medium coral' },
      'coral-500': { value: '#ff7f50', description: 'Base coral' },
      'coral-600': { value: '#ea580c', description: 'Medium-dark coral' },
      'coral-700': { value: '#c2410c', description: 'Dark coral' },
      'coral-800': { value: '#9a3412', description: 'Very dark coral' },
      'coral-900': { value: '#7c2d12', description: 'Darkest coral' },
      'coral-950': { value: '#431407', description: 'Near black coral' },

      // Neutral grays
      'gray-50': { value: '#f9fafb' },
      'gray-100': { value: '#f3f4f6' },
      'gray-200': { value: '#e5e7eb' },
      'gray-300': { value: '#d1d5db' },
      'gray-400': { value: '#9ca3af' },
      'gray-500': { value: '#6b7280' },
      'gray-600': { value: '#4b5563' },
      'gray-700': { value: '#374151' },
      'gray-800': { value: '#1f2937' },
      'gray-900': { value: '#111827' },
      'gray-950': { value: '#030712' },

      // Base colors
      white: { value: '#ffffff' },
      black: { value: '#000000' },
      transparent: { value: 'transparent' },
      current: { value: 'currentColor' },
    },
    semantic: {
      // Surface colors
      'surface-default': { value: 'var(--color-gray-50)', ref: 'gray-50' },
      'surface-subtle': { value: 'var(--color-gray-100)', ref: 'gray-100' },
      'surface-muted': { value: 'var(--color-gray-200)', ref: 'gray-200' },
      'surface-emphasis': { value: 'var(--color-white)', ref: 'white' },
      'surface-inverse': { value: 'var(--color-gray-900)', ref: 'gray-900' },

      // Text colors
      'text-default': { value: 'var(--color-gray-900)', ref: 'gray-900' },
      'text-subtle': { value: 'var(--color-gray-600)', ref: 'gray-600' },
      'text-muted': { value: 'var(--color-gray-500)', ref: 'gray-500' },
      'text-disabled': { value: 'var(--color-gray-400)', ref: 'gray-400' },
      'text-inverse': { value: 'var(--color-white)', ref: 'white' },
      'text-link': { value: 'var(--color-coral-600)', ref: 'coral-600' },
      'text-link-hover': { value: 'var(--color-coral-700)', ref: 'coral-700' },

      // Border colors
      'border-default': { value: 'var(--color-gray-200)', ref: 'gray-200' },
      'border-subtle': { value: 'var(--color-gray-100)', ref: 'gray-100' },
      'border-emphasis': { value: 'var(--color-gray-300)', ref: 'gray-300' },
      'border-strong': { value: 'var(--color-gray-400)', ref: 'gray-400' },
      'border-focus': { value: 'var(--color-coral-500)', ref: 'coral-500' },

      // Status colors
      'status-success': { value: '#22c55e', description: 'Success green' },
      'status-success-subtle': { value: '#dcfce7', description: 'Success background' },
      'status-warning': { value: '#f59e0b', description: 'Warning amber' },
      'status-warning-subtle': { value: '#fef3c7', description: 'Warning background' },
      'status-error': { value: '#ef4444', description: 'Error red' },
      'status-error-subtle': { value: '#fee2e2', description: 'Error background' },
      'status-info': { value: '#3b82f6', description: 'Info blue' },
      'status-info-subtle': { value: '#dbeafe', description: 'Info background' },

      // Brand colors
      'brand-primary': { value: 'var(--color-coral-500)', ref: 'coral-500' },
      'brand-primary-hover': { value: 'var(--color-coral-600)', ref: 'coral-600' },
      'brand-primary-active': { value: 'var(--color-coral-700)', ref: 'coral-700' },
      'brand-secondary': { value: 'var(--color-gray-700)', ref: 'gray-700' },
      'brand-secondary-hover': { value: 'var(--color-gray-800)', ref: 'gray-800' },

      // Interactive states
      'interactive-default': { value: 'var(--color-coral-500)', ref: 'coral-500' },
      'interactive-hover': { value: 'var(--color-coral-600)', ref: 'coral-600' },
      'interactive-active': { value: 'var(--color-coral-700)', ref: 'coral-700' },
      'interactive-disabled': { value: 'var(--color-gray-300)', ref: 'gray-300' },
      'interactive-focus-ring': { value: 'var(--color-coral-500)', ref: 'coral-500' },
    },
  },

  spacing: {
    '0': { value: '0px', description: 'No spacing' },
    px: { value: '1px', description: '1 pixel' },
    '0.5': { value: '0.125rem', description: '2px' },
    '1': { value: '0.25rem', description: '4px' },
    '1.5': { value: '0.375rem', description: '6px' },
    '2': { value: '0.5rem', description: '8px' },
    '2.5': { value: '0.625rem', description: '10px' },
    '3': { value: '0.75rem', description: '12px' },
    '3.5': { value: '0.875rem', description: '14px' },
    '4': { value: '1rem', description: '16px - Base unit' },
    '5': { value: '1.25rem', description: '20px' },
    '6': { value: '1.5rem', description: '24px' },
    '7': { value: '1.75rem', description: '28px' },
    '8': { value: '2rem', description: '32px' },
    '9': { value: '2.25rem', description: '36px' },
    '10': { value: '2.5rem', description: '40px' },
    '11': { value: '2.75rem', description: '44px' },
    '12': { value: '3rem', description: '48px' },
    '14': { value: '3.5rem', description: '56px' },
    '16': { value: '4rem', description: '64px' },
    '20': { value: '5rem', description: '80px' },
    '24': { value: '6rem', description: '96px' },
    '28': { value: '7rem', description: '112px' },
    '32': { value: '8rem', description: '128px' },
    '36': { value: '9rem', description: '144px' },
    '40': { value: '10rem', description: '160px' },
    '44': { value: '11rem', description: '176px' },
    '48': { value: '12rem', description: '192px' },
    '52': { value: '13rem', description: '208px' },
    '56': { value: '14rem', description: '224px' },
    '60': { value: '15rem', description: '240px' },
    '64': { value: '16rem', description: '256px' },
    '72': { value: '18rem', description: '288px' },
    '80': { value: '20rem', description: '320px' },
    '96': { value: '24rem', description: '384px' },
  },

  sizing: {
    '0': { value: '0px' },
    px: { value: '1px' },
    '0.5': { value: '0.125rem' },
    '1': { value: '0.25rem' },
    '1.5': { value: '0.375rem' },
    '2': { value: '0.5rem' },
    '2.5': { value: '0.625rem' },
    '3': { value: '0.75rem' },
    '3.5': { value: '0.875rem' },
    '4': { value: '1rem' },
    '5': { value: '1.25rem' },
    '6': { value: '1.5rem' },
    '7': { value: '1.75rem' },
    '8': { value: '2rem' },
    '9': { value: '2.25rem' },
    '10': { value: '2.5rem' },
    '11': { value: '2.75rem' },
    '12': { value: '3rem' },
    '14': { value: '3.5rem' },
    '16': { value: '4rem' },
    '20': { value: '5rem' },
    '24': { value: '6rem' },
    '28': { value: '7rem' },
    '32': { value: '8rem' },
    '36': { value: '9rem' },
    '40': { value: '10rem' },
    '44': { value: '11rem' },
    '48': { value: '12rem' },
    '52': { value: '13rem' },
    '56': { value: '14rem' },
    '60': { value: '15rem' },
    '64': { value: '16rem' },
    '72': { value: '18rem' },
    '80': { value: '20rem' },
    '96': { value: '24rem' },
    auto: { value: 'auto' },
    full: { value: '100%' },
    min: { value: 'min-content' },
    max: { value: 'max-content' },
    fit: { value: 'fit-content' },
    screen: { value: '100vw' },
    svw: { value: '100svw' },
    lvw: { value: '100lvw' },
    dvw: { value: '100dvw' },
    '1/2': { value: '50%' },
    '1/3': { value: '33.333333%' },
    '2/3': { value: '66.666667%' },
    '1/4': { value: '25%' },
    '2/4': { value: '50%' },
    '3/4': { value: '75%' },
    '1/5': { value: '20%' },
    '2/5': { value: '40%' },
    '3/5': { value: '60%' },
    '4/5': { value: '80%' },
    '1/6': { value: '16.666667%' },
    '5/6': { value: '83.333333%' },
  },

  typography: {
    fontFamily: {
      sans: { value: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' },
      serif: { value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
      mono: { value: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace' },
    },
    fontSize: {
      xs: { value: '0.75rem', description: '12px' },
      sm: { value: '0.875rem', description: '14px' },
      base: { value: '1rem', description: '16px' },
      lg: { value: '1.125rem', description: '18px' },
      xl: { value: '1.25rem', description: '20px' },
      '2xl': { value: '1.5rem', description: '24px' },
      '3xl': { value: '1.875rem', description: '30px' },
      '4xl': { value: '2.25rem', description: '36px' },
      '5xl': { value: '3rem', description: '48px' },
      '6xl': { value: '3.75rem', description: '60px' },
      '7xl': { value: '4.5rem', description: '72px' },
      '8xl': { value: '6rem', description: '96px' },
      '9xl': { value: '8rem', description: '128px' },
    },
    fontWeight: {
      thin: { value: '100' },
      extralight: { value: '200' },
      light: { value: '300' },
      normal: { value: '400' },
      medium: { value: '500' },
      semibold: { value: '600' },
      bold: { value: '700' },
      extrabold: { value: '800' },
      black: { value: '900' },
    },
    lineHeight: {
      none: { value: '1' },
      tight: { value: '1.25' },
      snug: { value: '1.375' },
      normal: { value: '1.5' },
      relaxed: { value: '1.625' },
      loose: { value: '2' },
      '3': { value: '0.75rem', description: '12px' },
      '4': { value: '1rem', description: '16px' },
      '5': { value: '1.25rem', description: '20px' },
      '6': { value: '1.5rem', description: '24px' },
      '7': { value: '1.75rem', description: '28px' },
      '8': { value: '2rem', description: '32px' },
      '9': { value: '2.25rem', description: '36px' },
      '10': { value: '2.5rem', description: '40px' },
    },
    letterSpacing: {
      tighter: { value: '-0.05em' },
      tight: { value: '-0.025em' },
      normal: { value: '0em' },
      wide: { value: '0.025em' },
      wider: { value: '0.05em' },
      widest: { value: '0.1em' },
    },
  },

  borders: {
    width: {
      '0': { value: '0px' },
      '1': { value: '1px' },
      '2': { value: '2px' },
      '4': { value: '4px' },
      '8': { value: '8px' },
    },
    radius: {
      none: { value: '0px' },
      sm: { value: '0.125rem', description: '2px' },
      DEFAULT: { value: '0.25rem', description: '4px' },
      md: { value: '0.375rem', description: '6px' },
      lg: { value: '0.5rem', description: '8px' },
      xl: { value: '0.75rem', description: '12px' },
      '2xl': { value: '1rem', description: '16px' },
      '3xl': { value: '1.5rem', description: '24px' },
      full: { value: '9999px', description: 'Circular' },
    },
    color: {
      default: { value: 'var(--border-default)', ref: 'border-default' },
      subtle: { value: 'var(--border-subtle)', ref: 'border-subtle' },
      emphasis: { value: 'var(--border-emphasis)', ref: 'border-emphasis' },
    },
  },

  shadows: {
    sm: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    DEFAULT: { value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
    md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    xl: { value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    '2xl': { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
    none: { value: 'none' },
  },

  motion: {
    duration: {
      '0': { value: '0ms' },
      '75': { value: '75ms' },
      '100': { value: '100ms' },
      '150': { value: '150ms' },
      '200': { value: '200ms' },
      '300': { value: '300ms' },
      '500': { value: '500ms' },
      '700': { value: '700ms' },
      '1000': { value: '1000ms' },
    },
    easing: {
      linear: { value: 'linear' },
      in: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
      out: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
      'in-out': { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      spring: { value: 'cubic-bezier(0.5, 1.5, 0.5, 1)', description: 'Bouncy spring' },
      bounce: { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', description: 'Elastic bounce' },
    },
  },

  opacity: {
    '0': { value: '0' },
    '5': { value: '0.05' },
    '10': { value: '0.1' },
    '15': { value: '0.15' },
    '20': { value: '0.2' },
    '25': { value: '0.25' },
    '30': { value: '0.3' },
    '35': { value: '0.35' },
    '40': { value: '0.4' },
    '45': { value: '0.45' },
    '50': { value: '0.5' },
    '55': { value: '0.55' },
    '60': { value: '0.6' },
    '65': { value: '0.65' },
    '70': { value: '0.7' },
    '75': { value: '0.75' },
    '80': { value: '0.8' },
    '85': { value: '0.85' },
    '90': { value: '0.9' },
    '95': { value: '0.95' },
    '100': { value: '1' },
  },

  zIndex: {
    auto: { value: 'auto' },
    '0': { value: '0' },
    '10': { value: '10' },
    '20': { value: '20' },
    '30': { value: '30' },
    '40': { value: '40' },
    '50': { value: '50' },
    dropdown: { value: '1000', description: 'Dropdown menus' },
    sticky: { value: '1020', description: 'Sticky elements' },
    fixed: { value: '1030', description: 'Fixed navigation' },
    'modal-backdrop': { value: '1040', description: 'Modal backdrop' },
    modal: { value: '1050', description: 'Modal dialogs' },
    popover: { value: '1060', description: 'Popovers' },
    tooltip: { value: '1070', description: 'Tooltips' },
    toast: { value: '1080', description: 'Toast notifications' },
  },

  breakpoints: {
    sm: { value: '640px', description: 'Small screens' },
    md: { value: '768px', description: 'Medium screens' },
    lg: { value: '1024px', description: 'Large screens' },
    xl: { value: '1280px', description: 'Extra large screens' },
    '2xl': { value: '1536px', description: '2X large screens' },
  },
}

/**
 * Dark mode token overrides
 */
export const darkModeTokens: Partial<DesignTokens> = {
  colors: {
    primitive: {},
    semantic: {
      // Surface colors
      'surface-default': { value: 'var(--color-gray-900)', ref: 'gray-900' },
      'surface-subtle': { value: 'var(--color-gray-800)', ref: 'gray-800' },
      'surface-muted': { value: 'var(--color-gray-700)', ref: 'gray-700' },
      'surface-emphasis': { value: 'var(--color-gray-800)', ref: 'gray-800' },
      'surface-inverse': { value: 'var(--color-gray-50)', ref: 'gray-50' },

      // Text colors
      'text-default': { value: 'var(--color-gray-50)', ref: 'gray-50' },
      'text-subtle': { value: 'var(--color-gray-300)', ref: 'gray-300' },
      'text-muted': { value: 'var(--color-gray-400)', ref: 'gray-400' },
      'text-disabled': { value: 'var(--color-gray-500)', ref: 'gray-500' },
      'text-inverse': { value: 'var(--color-gray-900)', ref: 'gray-900' },
      'text-link': { value: 'var(--color-coral-400)', ref: 'coral-400' },
      'text-link-hover': { value: 'var(--color-coral-300)', ref: 'coral-300' },

      // Border colors
      'border-default': { value: 'var(--color-gray-700)', ref: 'gray-700' },
      'border-subtle': { value: 'var(--color-gray-800)', ref: 'gray-800' },
      'border-emphasis': { value: 'var(--color-gray-600)', ref: 'gray-600' },
      'border-strong': { value: 'var(--color-gray-500)', ref: 'gray-500' },
      'border-focus': { value: 'var(--color-coral-400)', ref: 'coral-400' },

      // Status colors - darker variants
      'status-success-subtle': { value: '#14532d', description: 'Success background (dark)' },
      'status-warning-subtle': { value: '#78350f', description: 'Warning background (dark)' },
      'status-error-subtle': { value: '#7f1d1d', description: 'Error background (dark)' },
      'status-info-subtle': { value: '#1e3a8a', description: 'Info background (dark)' },

      // Interactive states
      'interactive-default': { value: 'var(--color-coral-400)', ref: 'coral-400' },
      'interactive-hover': { value: 'var(--color-coral-300)', ref: 'coral-300' },
      'interactive-active': { value: 'var(--color-coral-200)', ref: 'coral-200' },
      'interactive-disabled': { value: 'var(--color-gray-600)', ref: 'gray-600' },
      'interactive-focus-ring': { value: 'var(--color-coral-400)', ref: 'coral-400' },
    },
  },
}

/**
 * Resolve token value, following references
 */
function resolveTokenValue(
  token: TokenValue | TokenCategory | string,
  allTokens: DesignTokens
): string {
  if (typeof token === 'string') {
    return token
  }
  if ('value' in token) {
    return token.value as string
  }
  return ''
}

/**
 * Flatten nested tokens into a flat object
 */
function flattenTokens(
  obj: TokenCategory,
  prefix = '',
  result: Record<string, TokenValue | string> = {}
): Record<string, TokenValue | string> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'string') {
      result[newKey] = value
    } else if (typeof value === 'object' && value !== null && 'value' in value) {
      result[newKey] = value as TokenValue
    } else if (typeof value === 'object' && value !== null) {
      flattenTokens(value as TokenCategory, newKey, result)
    }
  }
  return result
}

/**
 * Generate CSS custom properties from tokens
 */
export function generateTokensCSS(
  tokens: DesignTokens = defaultDesignTokens,
  options: {
    prefix?: string
    includeDescriptions?: boolean
  } = {}
): string {
  const { prefix = '', includeDescriptions = false } = options
  const lines: string[] = []

  // Helper to generate variables
  const generateVars = (category: TokenCategory, categoryPrefix: string) => {
    const flat = flattenTokens(category)
    for (const [key, token] of Object.entries(flat)) {
      const varName = prefix ? `--${prefix}-${categoryPrefix}-${key}` : `--${categoryPrefix}-${key}`
      const value = typeof token === 'string' ? token : token.value
      const desc = typeof token === 'object' && token.description

      if (includeDescriptions && desc) {
        lines.push(`  /* ${desc} */`)
      }
      lines.push(`  ${varName}: ${value};`)
    }
  }

  lines.push(':root {')

  // Colors - primitive
  generateVars(tokens.colors.primitive, 'color')
  lines.push('')

  // Colors - semantic
  generateVars(tokens.colors.semantic, 'color')
  lines.push('')

  // Spacing
  generateVars(tokens.spacing, 'spacing')
  lines.push('')

  // Sizing
  generateVars(tokens.sizing, 'size')
  lines.push('')

  // Typography
  generateVars(tokens.typography.fontFamily, 'font')
  generateVars(tokens.typography.fontSize, 'text')
  generateVars(tokens.typography.fontWeight, 'font-weight')
  generateVars(tokens.typography.lineHeight, 'leading')
  generateVars(tokens.typography.letterSpacing, 'tracking')
  lines.push('')

  // Borders
  generateVars(tokens.borders.width, 'border-width')
  generateVars(tokens.borders.radius, 'radius')
  lines.push('')

  // Shadows
  generateVars(tokens.shadows, 'shadow')
  lines.push('')

  // Motion
  generateVars(tokens.motion.duration, 'duration')
  generateVars(tokens.motion.easing, 'ease')
  lines.push('')

  // Opacity
  generateVars(tokens.opacity, 'opacity')
  lines.push('')

  // Z-index
  generateVars(tokens.zIndex, 'z')
  lines.push('')

  // Breakpoints
  generateVars(tokens.breakpoints, 'screen')

  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate dark mode CSS overrides
 */
export function generateDarkTokensCSS(
  darkTokens: Partial<DesignTokens> = darkModeTokens,
  strategy: DarkModeStrategy = 'class',
  options: { prefix?: string } = {}
): string {
  const { prefix = '' } = options
  const lines: string[] = []

  const generateVars = (category: TokenCategory, categoryPrefix: string) => {
    const flat = flattenTokens(category)
    for (const [key, token] of Object.entries(flat)) {
      const varName = prefix ? `--${prefix}-${categoryPrefix}-${key}` : `--${categoryPrefix}-${key}`
      const value = typeof token === 'string' ? token : token.value
      lines.push(`  ${varName}: ${value};`)
    }
  }

  // Generate dark mode selector
  let selector: string
  switch (strategy) {
    case 'class':
      selector = '.dark'
      break
    case 'media':
      return `@media (prefers-color-scheme: dark) {\n  :root {\n${generateDarkVarsContent(darkTokens, prefix)}\n  }\n}`
    case 'selector':
      selector = '[data-theme="dark"]'
      break
    case 'auto':
      const classRule = `.dark {\n${generateDarkVarsContent(darkTokens, prefix)}\n}`
      const mediaRule = `@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${generateDarkVarsContent(darkTokens, prefix)}\n  }\n}`
      return `${classRule}\n\n${mediaRule}`
    default:
      selector = '.dark'
  }

  lines.push(`${selector} {`)
  if (darkTokens.colors?.semantic) {
    generateVars(darkTokens.colors.semantic, 'color')
  }
  lines.push('}')

  return lines.join('\n')
}

function generateDarkVarsContent(
  darkTokens: Partial<DesignTokens>,
  prefix: string
): string {
  const lines: string[] = []
  const flat = darkTokens.colors?.semantic ? flattenTokens(darkTokens.colors.semantic) : {}

  for (const [key, token] of Object.entries(flat)) {
    const varName = prefix ? `--${prefix}-color-${key}` : `--color-${key}`
    const value = typeof token === 'string' ? token : token.value
    lines.push(`    ${varName}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate SCSS variables from tokens
 */
export function generateTokensSCSS(
  tokens: DesignTokens = defaultDesignTokens,
  options: { prefix?: string } = {}
): string {
  const { prefix = '' } = options
  const lines: string[] = []

  const generateVars = (category: TokenCategory, categoryPrefix: string) => {
    const flat = flattenTokens(category)
    for (const [key, token] of Object.entries(flat)) {
      const varName = prefix ? `$${prefix}-${categoryPrefix}-${key}` : `$${categoryPrefix}-${key}`
      const value = typeof token === 'string' ? token : token.value
      const desc = typeof token === 'object' && token.description
      if (desc) {
        lines.push(`// ${desc}`)
      }
      lines.push(`${varName}: ${value};`)
    }
    lines.push('')
  }

  lines.push('// CoralCSS Design Tokens')
  lines.push('// Generated automatically - do not edit')
  lines.push('')

  generateVars(tokens.colors.primitive, 'color')
  generateVars(tokens.colors.semantic, 'color')
  generateVars(tokens.spacing, 'spacing')
  generateVars(tokens.sizing, 'size')
  generateVars(tokens.typography.fontFamily, 'font')
  generateVars(tokens.typography.fontSize, 'text')
  generateVars(tokens.typography.fontWeight, 'font-weight')
  generateVars(tokens.typography.lineHeight, 'leading')
  generateVars(tokens.typography.letterSpacing, 'tracking')
  generateVars(tokens.borders.width, 'border-width')
  generateVars(tokens.borders.radius, 'radius')
  generateVars(tokens.shadows, 'shadow')
  generateVars(tokens.motion.duration, 'duration')
  generateVars(tokens.motion.easing, 'ease')
  generateVars(tokens.opacity, 'opacity')
  generateVars(tokens.zIndex, 'z')
  generateVars(tokens.breakpoints, 'screen')

  return lines.join('\n')
}

/**
 * Generate JSON token format (compatible with Style Dictionary)
 */
export function generateTokensJSON(
  tokens: DesignTokens = defaultDesignTokens
): string {
  // Transform to Style Dictionary format
  const transform = (obj: TokenCategory): object => {
    const result: Record<string, object> = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = { value }
      } else if ('value' in value) {
        result[key] = { value: value.value, ...(value.description && { comment: value.description }) }
      } else {
        result[key] = transform(value as TokenCategory)
      }
    }
    return result
  }

  const output = {
    color: {
      primitive: transform(tokens.colors.primitive),
      semantic: transform(tokens.colors.semantic),
    },
    spacing: transform(tokens.spacing),
    sizing: transform(tokens.sizing),
    typography: {
      fontFamily: transform(tokens.typography.fontFamily),
      fontSize: transform(tokens.typography.fontSize),
      fontWeight: transform(tokens.typography.fontWeight),
      lineHeight: transform(tokens.typography.lineHeight),
      letterSpacing: transform(tokens.typography.letterSpacing),
    },
    borders: {
      width: transform(tokens.borders.width),
      radius: transform(tokens.borders.radius),
    },
    shadows: transform(tokens.shadows),
    motion: {
      duration: transform(tokens.motion.duration),
      easing: transform(tokens.motion.easing),
    },
    opacity: transform(tokens.opacity),
    zIndex: transform(tokens.zIndex),
    breakpoints: transform(tokens.breakpoints),
  }

  return JSON.stringify(output, null, 2)
}

/**
 * Generate TypeScript token type definitions
 */
export function generateTokensTypeScript(
  tokens: DesignTokens = defaultDesignTokens
): string {
  const lines: string[] = []

  lines.push('// CoralCSS Design Tokens - TypeScript')
  lines.push('// Generated automatically - do not edit')
  lines.push('')
  lines.push('export const tokens = {')

  const generateObject = (obj: TokenCategory, indent = 2) => {
    const pad = ' '.repeat(indent)
    const entries = Object.entries(obj)

    for (const [key, value] of entries) {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`

      if (typeof value === 'string') {
        lines.push(`${pad}${safeKey}: '${value}',`)
      } else if ('value' in value) {
        lines.push(`${pad}${safeKey}: '${value.value}',`)
      } else {
        lines.push(`${pad}${safeKey}: {`)
        generateObject(value as TokenCategory, indent + 2)
        lines.push(`${pad}},`)
      }
    }
  }

  lines.push('  colors: {')
  lines.push('    primitive: {')
  generateObject(tokens.colors.primitive, 6)
  lines.push('    },')
  lines.push('    semantic: {')
  generateObject(tokens.colors.semantic, 6)
  lines.push('    },')
  lines.push('  },')

  lines.push('  spacing: {')
  generateObject(tokens.spacing, 4)
  lines.push('  },')

  lines.push('  sizing: {')
  generateObject(tokens.sizing, 4)
  lines.push('  },')

  lines.push('  typography: {')
  lines.push('    fontFamily: {')
  generateObject(tokens.typography.fontFamily, 6)
  lines.push('    },')
  lines.push('    fontSize: {')
  generateObject(tokens.typography.fontSize, 6)
  lines.push('    },')
  lines.push('    fontWeight: {')
  generateObject(tokens.typography.fontWeight, 6)
  lines.push('    },')
  lines.push('    lineHeight: {')
  generateObject(tokens.typography.lineHeight, 6)
  lines.push('    },')
  lines.push('    letterSpacing: {')
  generateObject(tokens.typography.letterSpacing, 6)
  lines.push('    },')
  lines.push('  },')

  lines.push('  borders: {')
  lines.push('    width: {')
  generateObject(tokens.borders.width, 6)
  lines.push('    },')
  lines.push('    radius: {')
  generateObject(tokens.borders.radius, 6)
  lines.push('    },')
  lines.push('  },')

  lines.push('  shadows: {')
  generateObject(tokens.shadows, 4)
  lines.push('  },')

  lines.push('  motion: {')
  lines.push('    duration: {')
  generateObject(tokens.motion.duration, 6)
  lines.push('    },')
  lines.push('    easing: {')
  generateObject(tokens.motion.easing, 6)
  lines.push('    },')
  lines.push('  },')

  lines.push('  opacity: {')
  generateObject(tokens.opacity, 4)
  lines.push('  },')

  lines.push('  zIndex: {')
  generateObject(tokens.zIndex, 4)
  lines.push('  },')

  lines.push('  breakpoints: {')
  generateObject(tokens.breakpoints, 4)
  lines.push('  },')

  lines.push('} as const')
  lines.push('')
  lines.push('export type Tokens = typeof tokens')

  return lines.join('\n')
}

/**
 * Create custom design tokens by merging with defaults
 */
export function createDesignTokens(
  customTokens: Partial<DesignTokens>
): DesignTokens {
  return {
    colors: {
      primitive: { ...defaultDesignTokens.colors.primitive, ...customTokens.colors?.primitive },
      semantic: { ...defaultDesignTokens.colors.semantic, ...customTokens.colors?.semantic },
    },
    spacing: { ...defaultDesignTokens.spacing, ...customTokens.spacing },
    sizing: { ...defaultDesignTokens.sizing, ...customTokens.sizing },
    typography: {
      fontFamily: { ...defaultDesignTokens.typography.fontFamily, ...customTokens.typography?.fontFamily },
      fontSize: { ...defaultDesignTokens.typography.fontSize, ...customTokens.typography?.fontSize },
      fontWeight: { ...defaultDesignTokens.typography.fontWeight, ...customTokens.typography?.fontWeight },
      lineHeight: { ...defaultDesignTokens.typography.lineHeight, ...customTokens.typography?.lineHeight },
      letterSpacing: { ...defaultDesignTokens.typography.letterSpacing, ...customTokens.typography?.letterSpacing },
    },
    borders: {
      width: { ...defaultDesignTokens.borders.width, ...customTokens.borders?.width },
      radius: { ...defaultDesignTokens.borders.radius, ...customTokens.borders?.radius },
      color: { ...defaultDesignTokens.borders.color, ...customTokens.borders?.color },
    },
    shadows: { ...defaultDesignTokens.shadows, ...customTokens.shadows },
    motion: {
      duration: { ...defaultDesignTokens.motion.duration, ...customTokens.motion?.duration },
      easing: { ...defaultDesignTokens.motion.easing, ...customTokens.motion?.easing },
    },
    opacity: { ...defaultDesignTokens.opacity, ...customTokens.opacity },
    zIndex: { ...defaultDesignTokens.zIndex, ...customTokens.zIndex },
    breakpoints: { ...defaultDesignTokens.breakpoints, ...customTokens.breakpoints },
  }
}

/**
 * Generate complete token CSS with dark mode
 */
export function generateCompleteTokensCSS(
  tokens: DesignTokens = defaultDesignTokens,
  darkTokens: Partial<DesignTokens> = darkModeTokens,
  strategy: DarkModeStrategy = 'class',
  options: { prefix?: string; includeDescriptions?: boolean } = {}
): string {
  const lightCSS = generateTokensCSS(tokens, options)
  const darkCSS = generateDarkTokensCSS(darkTokens, strategy, options)
  return `${lightCSS}\n\n${darkCSS}`
}
