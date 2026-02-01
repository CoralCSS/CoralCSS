/**
 * CoralCSS Design Tokens
 *
 * Complete design token definitions in Style Dictionary format.
 *
 * @module design-system/coral-tokens
 */

import type { DesignTokenFile, TokenGroup, StyleDictionaryToken as _StyleDictionaryToken } from './types'

/**
 * Primitive Color Tokens
 * Foundation colors that other tokens reference
 */
export const primitiveTokens: TokenGroup = {
  color: {
    white: { $value: '#ffffff', $type: 'color' },
    black: { $value: '#000000', $type: 'color' },
    transparent: { $value: 'transparent', $type: 'color' },
    current: { $value: 'currentColor', $type: 'color' },

    // Coral - Primary brand color
    coral: {
      '50': { $value: '#fff5f3', $type: 'color', $description: 'Lightest coral' },
      '100': { $value: '#ffe4de', $type: 'color' },
      '200': { $value: '#ffcfc4', $type: 'color' },
      '300': { $value: '#ffb09d', $type: 'color' },
      '400': { $value: '#ff8566', $type: 'color' },
      '500': { $value: '#ff6347', $type: 'color', $description: 'Default coral' },
      '600': { $value: '#ed4c30', $type: 'color' },
      '700': { $value: '#c73a22', $type: 'color' },
      '800': { $value: '#a43321', $type: 'color' },
      '900': { $value: '#882f21', $type: 'color' },
      '950': { $value: '#5c0a0a', $type: 'color', $description: 'Darkest coral' },
    },

    // Slate - Neutral gray scale
    slate: {
      '50': { $value: '#f8fafc', $type: 'color' },
      '100': { $value: '#f1f5f9', $type: 'color' },
      '200': { $value: '#e2e8f0', $type: 'color' },
      '300': { $value: '#cbd5e1', $type: 'color' },
      '400': { $value: '#94a3b8', $type: 'color' },
      '500': { $value: '#64748b', $type: 'color' },
      '600': { $value: '#475569', $type: 'color' },
      '700': { $value: '#334155', $type: 'color' },
      '800': { $value: '#1e293b', $type: 'color' },
      '900': { $value: '#0f172a', $type: 'color' },
      '950': { $value: '#020617', $type: 'color' },
    },

    // Gray
    gray: {
      '50': { $value: '#f9fafb', $type: 'color' },
      '100': { $value: '#f3f4f6', $type: 'color' },
      '200': { $value: '#e5e7eb', $type: 'color' },
      '300': { $value: '#d1d5db', $type: 'color' },
      '400': { $value: '#9ca3af', $type: 'color' },
      '500': { $value: '#6b7280', $type: 'color' },
      '600': { $value: '#4b5563', $type: 'color' },
      '700': { $value: '#374151', $type: 'color' },
      '800': { $value: '#1f2937', $type: 'color' },
      '900': { $value: '#111827', $type: 'color' },
      '950': { $value: '#030712', $type: 'color' },
    },

    // Red - Error/Danger
    red: {
      '50': { $value: '#fef2f2', $type: 'color' },
      '100': { $value: '#fee2e2', $type: 'color' },
      '200': { $value: '#fecaca', $type: 'color' },
      '300': { $value: '#fca5a5', $type: 'color' },
      '400': { $value: '#f87171', $type: 'color' },
      '500': { $value: '#ef4444', $type: 'color' },
      '600': { $value: '#dc2626', $type: 'color' },
      '700': { $value: '#b91c1c', $type: 'color' },
      '800': { $value: '#991b1b', $type: 'color' },
      '900': { $value: '#7f1d1d', $type: 'color' },
      '950': { $value: '#450a0a', $type: 'color' },
    },

    // Green - Success
    green: {
      '50': { $value: '#f0fdf4', $type: 'color' },
      '100': { $value: '#dcfce7', $type: 'color' },
      '200': { $value: '#bbf7d0', $type: 'color' },
      '300': { $value: '#86efac', $type: 'color' },
      '400': { $value: '#4ade80', $type: 'color' },
      '500': { $value: '#22c55e', $type: 'color' },
      '600': { $value: '#16a34a', $type: 'color' },
      '700': { $value: '#15803d', $type: 'color' },
      '800': { $value: '#166534', $type: 'color' },
      '900': { $value: '#14532d', $type: 'color' },
      '950': { $value: '#052e16', $type: 'color' },
    },

    // Blue - Info
    blue: {
      '50': { $value: '#eff6ff', $type: 'color' },
      '100': { $value: '#dbeafe', $type: 'color' },
      '200': { $value: '#bfdbfe', $type: 'color' },
      '300': { $value: '#93c5fd', $type: 'color' },
      '400': { $value: '#60a5fa', $type: 'color' },
      '500': { $value: '#3b82f6', $type: 'color' },
      '600': { $value: '#2563eb', $type: 'color' },
      '700': { $value: '#1d4ed8', $type: 'color' },
      '800': { $value: '#1e40af', $type: 'color' },
      '900': { $value: '#1e3a8a', $type: 'color' },
      '950': { $value: '#172554', $type: 'color' },
    },

    // Yellow - Warning
    yellow: {
      '50': { $value: '#fefce8', $type: 'color' },
      '100': { $value: '#fef9c3', $type: 'color' },
      '200': { $value: '#fef08a', $type: 'color' },
      '300': { $value: '#fde047', $type: 'color' },
      '400': { $value: '#facc15', $type: 'color' },
      '500': { $value: '#eab308', $type: 'color' },
      '600': { $value: '#ca8a04', $type: 'color' },
      '700': { $value: '#a16207', $type: 'color' },
      '800': { $value: '#854d0e', $type: 'color' },
      '900': { $value: '#713f12', $type: 'color' },
      '950': { $value: '#422006', $type: 'color' },
    },

    // Purple
    purple: {
      '50': { $value: '#faf5ff', $type: 'color' },
      '100': { $value: '#f3e8ff', $type: 'color' },
      '200': { $value: '#e9d5ff', $type: 'color' },
      '300': { $value: '#d8b4fe', $type: 'color' },
      '400': { $value: '#c084fc', $type: 'color' },
      '500': { $value: '#a855f7', $type: 'color' },
      '600': { $value: '#9333ea', $type: 'color' },
      '700': { $value: '#7c3aed', $type: 'color' },
      '800': { $value: '#6b21a8', $type: 'color' },
      '900': { $value: '#581c87', $type: 'color' },
      '950': { $value: '#3b0764', $type: 'color' },
    },

    // Pink
    pink: {
      '50': { $value: '#fdf2f8', $type: 'color' },
      '100': { $value: '#fce7f3', $type: 'color' },
      '200': { $value: '#fbcfe8', $type: 'color' },
      '300': { $value: '#f9a8d4', $type: 'color' },
      '400': { $value: '#f472b6', $type: 'color' },
      '500': { $value: '#ec4899', $type: 'color' },
      '600': { $value: '#db2777', $type: 'color' },
      '700': { $value: '#be185d', $type: 'color' },
      '800': { $value: '#9d174d', $type: 'color' },
      '900': { $value: '#831843', $type: 'color' },
      '950': { $value: '#500724', $type: 'color' },
    },
  },

  // Spacing scale
  spacing: {
    '0': { $value: '0', $type: 'spacing' },
    px: { $value: '1px', $type: 'spacing' },
    '0.5': { $value: '0.125rem', $type: 'spacing' },
    '1': { $value: '0.25rem', $type: 'spacing' },
    '1.5': { $value: '0.375rem', $type: 'spacing' },
    '2': { $value: '0.5rem', $type: 'spacing' },
    '2.5': { $value: '0.625rem', $type: 'spacing' },
    '3': { $value: '0.75rem', $type: 'spacing' },
    '3.5': { $value: '0.875rem', $type: 'spacing' },
    '4': { $value: '1rem', $type: 'spacing' },
    '5': { $value: '1.25rem', $type: 'spacing' },
    '6': { $value: '1.5rem', $type: 'spacing' },
    '7': { $value: '1.75rem', $type: 'spacing' },
    '8': { $value: '2rem', $type: 'spacing' },
    '9': { $value: '2.25rem', $type: 'spacing' },
    '10': { $value: '2.5rem', $type: 'spacing' },
    '11': { $value: '2.75rem', $type: 'spacing' },
    '12': { $value: '3rem', $type: 'spacing' },
    '14': { $value: '3.5rem', $type: 'spacing' },
    '16': { $value: '4rem', $type: 'spacing' },
    '20': { $value: '5rem', $type: 'spacing' },
    '24': { $value: '6rem', $type: 'spacing' },
    '28': { $value: '7rem', $type: 'spacing' },
    '32': { $value: '8rem', $type: 'spacing' },
    '36': { $value: '9rem', $type: 'spacing' },
    '40': { $value: '10rem', $type: 'spacing' },
    '44': { $value: '11rem', $type: 'spacing' },
    '48': { $value: '12rem', $type: 'spacing' },
    '52': { $value: '13rem', $type: 'spacing' },
    '56': { $value: '14rem', $type: 'spacing' },
    '60': { $value: '15rem', $type: 'spacing' },
    '64': { $value: '16rem', $type: 'spacing' },
    '72': { $value: '18rem', $type: 'spacing' },
    '80': { $value: '20rem', $type: 'spacing' },
    '96': { $value: '24rem', $type: 'spacing' },
  },

  // Sizing scale
  sizing: {
    'auto': { $value: 'auto', $type: 'sizing' },
    'full': { $value: '100%', $type: 'sizing' },
    'screen': { $value: '100vh', $type: 'sizing' },
    'min': { $value: 'min-content', $type: 'sizing' },
    'max': { $value: 'max-content', $type: 'sizing' },
    'fit': { $value: 'fit-content', $type: 'sizing' },
    '1/2': { $value: '50%', $type: 'sizing' },
    '1/3': { $value: '33.333333%', $type: 'sizing' },
    '2/3': { $value: '66.666667%', $type: 'sizing' },
    '1/4': { $value: '25%', $type: 'sizing' },
    '2/4': { $value: '50%', $type: 'sizing' },
    '3/4': { $value: '75%', $type: 'sizing' },
  },

  // Border radius
  borderRadius: {
    'none': { $value: '0', $type: 'borderRadius' },
    'sm': { $value: '0.125rem', $type: 'borderRadius' },
    'DEFAULT': { $value: '0.25rem', $type: 'borderRadius' },
    'md': { $value: '0.375rem', $type: 'borderRadius' },
    'lg': { $value: '0.5rem', $type: 'borderRadius' },
    'xl': { $value: '0.75rem', $type: 'borderRadius' },
    '2xl': { $value: '1rem', $type: 'borderRadius' },
    '3xl': { $value: '1.5rem', $type: 'borderRadius' },
    'full': { $value: '9999px', $type: 'borderRadius' },
  },

  // Border width
  borderWidth: {
    '0': { $value: '0', $type: 'dimension' },
    'DEFAULT': { $value: '1px', $type: 'dimension' },
    '2': { $value: '2px', $type: 'dimension' },
    '4': { $value: '4px', $type: 'dimension' },
    '8': { $value: '8px', $type: 'dimension' },
  },

  // Typography
  fontFamily: {
    sans: {
      $value: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      $type: 'fontFamily',
    },
    serif: {
      $value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      $type: 'fontFamily',
    },
    mono: {
      $value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      $type: 'fontFamily',
    },
  },

  fontSize: {
    'xs': { $value: '0.75rem', $type: 'dimension' },
    'sm': { $value: '0.875rem', $type: 'dimension' },
    'base': { $value: '1rem', $type: 'dimension' },
    'lg': { $value: '1.125rem', $type: 'dimension' },
    'xl': { $value: '1.25rem', $type: 'dimension' },
    '2xl': { $value: '1.5rem', $type: 'dimension' },
    '3xl': { $value: '1.875rem', $type: 'dimension' },
    '4xl': { $value: '2.25rem', $type: 'dimension' },
    '5xl': { $value: '3rem', $type: 'dimension' },
    '6xl': { $value: '3.75rem', $type: 'dimension' },
    '7xl': { $value: '4.5rem', $type: 'dimension' },
    '8xl': { $value: '6rem', $type: 'dimension' },
    '9xl': { $value: '8rem', $type: 'dimension' },
  },

  fontWeight: {
    'thin': { $value: 100, $type: 'fontWeight' },
    'extralight': { $value: 200, $type: 'fontWeight' },
    'light': { $value: 300, $type: 'fontWeight' },
    'normal': { $value: 400, $type: 'fontWeight' },
    'medium': { $value: 500, $type: 'fontWeight' },
    'semibold': { $value: 600, $type: 'fontWeight' },
    'bold': { $value: 700, $type: 'fontWeight' },
    'extrabold': { $value: 800, $type: 'fontWeight' },
    'black': { $value: 900, $type: 'fontWeight' },
  },

  lineHeight: {
    'none': { $value: 1, $type: 'number' },
    'tight': { $value: 1.25, $type: 'number' },
    'snug': { $value: 1.375, $type: 'number' },
    'normal': { $value: 1.5, $type: 'number' },
    'relaxed': { $value: 1.625, $type: 'number' },
    'loose': { $value: 2, $type: 'number' },
  },

  letterSpacing: {
    'tighter': { $value: '-0.05em', $type: 'dimension' },
    'tight': { $value: '-0.025em', $type: 'dimension' },
    'normal': { $value: '0', $type: 'dimension' },
    'wide': { $value: '0.025em', $type: 'dimension' },
    'wider': { $value: '0.05em', $type: 'dimension' },
    'widest': { $value: '0.1em', $type: 'dimension' },
  },

  // Shadows
  shadow: {
    'sm': { $value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', $type: 'shadow' },
    'DEFAULT': { $value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', $type: 'shadow' },
    'md': { $value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', $type: 'shadow' },
    'lg': { $value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', $type: 'shadow' },
    'xl': { $value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', $type: 'shadow' },
    '2xl': { $value: '0 25px 50px -12px rgb(0 0 0 / 0.25)', $type: 'shadow' },
    'inner': { $value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', $type: 'shadow' },
    'none': { $value: 'none', $type: 'shadow' },
  },

  // Motion
  duration: {
    '0': { $value: '0ms', $type: 'duration' },
    '75': { $value: '75ms', $type: 'duration' },
    '100': { $value: '100ms', $type: 'duration' },
    '150': { $value: '150ms', $type: 'duration' },
    '200': { $value: '200ms', $type: 'duration' },
    '300': { $value: '300ms', $type: 'duration' },
    '500': { $value: '500ms', $type: 'duration' },
    '700': { $value: '700ms', $type: 'duration' },
    '1000': { $value: '1000ms', $type: 'duration' },
  },

  easing: {
    'linear': { $value: 'linear', $type: 'cubicBezier' },
    'in': { $value: 'cubic-bezier(0.4, 0, 1, 1)', $type: 'cubicBezier' },
    'out': { $value: 'cubic-bezier(0, 0, 0.2, 1)', $type: 'cubicBezier' },
    'in-out': { $value: 'cubic-bezier(0.4, 0, 0.2, 1)', $type: 'cubicBezier' },
  },

  // Opacity
  opacity: {
    '0': { $value: 0, $type: 'opacity' },
    '5': { $value: 0.05, $type: 'opacity' },
    '10': { $value: 0.1, $type: 'opacity' },
    '20': { $value: 0.2, $type: 'opacity' },
    '25': { $value: 0.25, $type: 'opacity' },
    '30': { $value: 0.3, $type: 'opacity' },
    '40': { $value: 0.4, $type: 'opacity' },
    '50': { $value: 0.5, $type: 'opacity' },
    '60': { $value: 0.6, $type: 'opacity' },
    '70': { $value: 0.7, $type: 'opacity' },
    '75': { $value: 0.75, $type: 'opacity' },
    '80': { $value: 0.8, $type: 'opacity' },
    '90': { $value: 0.9, $type: 'opacity' },
    '95': { $value: 0.95, $type: 'opacity' },
    '100': { $value: 1, $type: 'opacity' },
  },

  // Z-index
  zIndex: {
    'auto': { $value: 'auto', $type: 'number' },
    '0': { $value: 0, $type: 'number' },
    '10': { $value: 10, $type: 'number' },
    '20': { $value: 20, $type: 'number' },
    '30': { $value: 30, $type: 'number' },
    '40': { $value: 40, $type: 'number' },
    '50': { $value: 50, $type: 'number' },
  },
}

/**
 * Semantic Tokens - Light Theme
 * Theme-aware tokens that reference primitives
 */
export const semanticTokens: TokenGroup = {
  semantic: {
    background: {
      default: { $value: '{color.white}', $type: 'color', $description: 'Default page background' },
      subtle: { $value: '{color.slate.50}', $type: 'color' },
      muted: { $value: '{color.slate.100}', $type: 'color' },
      emphasis: { $value: '{color.slate.200}', $type: 'color' },
      inverse: { $value: '{color.slate.900}', $type: 'color' },
    },
    foreground: {
      default: { $value: '{color.slate.900}', $type: 'color', $description: 'Default text color' },
      muted: { $value: '{color.slate.600}', $type: 'color' },
      subtle: { $value: '{color.slate.500}', $type: 'color' },
      inverse: { $value: '{color.white}', $type: 'color' },
    },
    primary: {
      default: { $value: '{color.coral.500}', $type: 'color', $description: 'Primary brand color' },
      hover: { $value: '{color.coral.600}', $type: 'color' },
      active: { $value: '{color.coral.700}', $type: 'color' },
      subtle: { $value: '{color.coral.100}', $type: 'color' },
      foreground: { $value: '{color.white}', $type: 'color' },
    },
    secondary: {
      default: { $value: '{color.slate.600}', $type: 'color' },
      hover: { $value: '{color.slate.700}', $type: 'color' },
      foreground: { $value: '{color.white}', $type: 'color' },
    },
    border: {
      default: { $value: '{color.slate.200}', $type: 'color' },
      muted: { $value: '{color.slate.100}', $type: 'color' },
      emphasis: { $value: '{color.slate.300}', $type: 'color' },
    },
    status: {
      success: { $value: '{color.green.500}', $type: 'color' },
      'success-subtle': { $value: '{color.green.100}', $type: 'color' },
      warning: { $value: '{color.yellow.500}', $type: 'color' },
      'warning-subtle': { $value: '{color.yellow.100}', $type: 'color' },
      error: { $value: '{color.red.500}', $type: 'color' },
      'error-subtle': { $value: '{color.red.100}', $type: 'color' },
      info: { $value: '{color.blue.500}', $type: 'color' },
      'info-subtle': { $value: '{color.blue.100}', $type: 'color' },
    },
    ring: {
      default: { $value: '{color.coral.500}', $type: 'color', $description: 'Focus ring color' },
      offset: { $value: '{color.white}', $type: 'color' },
    },
  },
}

/**
 * Component Tokens
 * Tokens specific to UI components
 */
export const componentTokens: TokenGroup = {
  component: {
    button: {
      padding: {
        x: {
          sm: { $value: '{spacing.3}', $type: 'spacing' },
          md: { $value: '{spacing.4}', $type: 'spacing' },
          lg: { $value: '{spacing.6}', $type: 'spacing' },
        },
        y: {
          sm: { $value: '{spacing.1.5}', $type: 'spacing' },
          md: { $value: '{spacing.2}', $type: 'spacing' },
          lg: { $value: '{spacing.3}', $type: 'spacing' },
        },
      },
      borderRadius: { $value: '{borderRadius.lg}', $type: 'borderRadius' },
      fontSize: {
        sm: { $value: '{fontSize.sm}', $type: 'dimension' },
        md: { $value: '{fontSize.base}', $type: 'dimension' },
        lg: { $value: '{fontSize.lg}', $type: 'dimension' },
      },
    },
    input: {
      padding: {
        x: { $value: '{spacing.3}', $type: 'spacing' },
        y: { $value: '{spacing.2}', $type: 'spacing' },
      },
      borderRadius: { $value: '{borderRadius.md}', $type: 'borderRadius' },
      borderWidth: { $value: '{borderWidth.DEFAULT}', $type: 'dimension' },
    },
    card: {
      padding: { $value: '{spacing.6}', $type: 'spacing' },
      borderRadius: { $value: '{borderRadius.xl}', $type: 'borderRadius' },
      shadow: { $value: '{shadow.md}', $type: 'shadow' },
    },
    modal: {
      padding: { $value: '{spacing.8}', $type: 'spacing' },
      borderRadius: { $value: '{borderRadius.2xl}', $type: 'borderRadius' },
      shadow: { $value: '{shadow.2xl}', $type: 'shadow' },
    },
    avatar: {
      size: {
        xs: { $value: '{spacing.6}', $type: 'sizing' },
        sm: { $value: '{spacing.8}', $type: 'sizing' },
        md: { $value: '{spacing.10}', $type: 'sizing' },
        lg: { $value: '{spacing.12}', $type: 'sizing' },
        xl: { $value: '{spacing.16}', $type: 'sizing' },
      },
      borderRadius: { $value: '{borderRadius.full}', $type: 'borderRadius' },
    },
    badge: {
      padding: {
        x: { $value: '{spacing.2}', $type: 'spacing' },
        y: { $value: '{spacing.0.5}', $type: 'spacing' },
      },
      borderRadius: { $value: '{borderRadius.full}', $type: 'borderRadius' },
      fontSize: { $value: '{fontSize.xs}', $type: 'dimension' },
    },
    tooltip: {
      padding: {
        x: { $value: '{spacing.3}', $type: 'spacing' },
        y: { $value: '{spacing.1.5}', $type: 'spacing' },
      },
      borderRadius: { $value: '{borderRadius.md}', $type: 'borderRadius' },
      fontSize: { $value: '{fontSize.sm}', $type: 'dimension' },
    },
  },
}

/**
 * Complete CoralCSS Design Tokens
 */
export const coralTokens: DesignTokenFile = {
  $name: 'CoralCSS Design Tokens',
  $description: 'Complete design token system for CoralCSS framework',
  $version: '1.1.0',
  ...primitiveTokens,
  ...semanticTokens,
  ...componentTokens,
}

/**
 * Export tokens as JSON string
 */
export function exportTokensJSON(): string {
  return JSON.stringify(coralTokens, null, 2)
}

/**
 * Get tokens by category
 */
export function getTokensByCategory(category: string): TokenGroup | undefined {
  return (coralTokens as Record<string, TokenGroup>)[category]
}

/**
 * Get all primitive tokens
 */
export function getPrimitiveTokens(): TokenGroup {
  return primitiveTokens
}

/**
 * Get all semantic tokens
 */
export function getSemanticTokens(): TokenGroup {
  return semanticTokens
}

/**
 * Get all component tokens
 */
export function getComponentTokens(): TokenGroup {
  return componentTokens
}
