/**
 * Semantic Theme Tokens
 *
 * Design system tokens for light and dark themes.
 * Uses HSL for easy customization.
 * @module theme/semantic
 */

import type { DarkModeStrategy } from '../types'

/**
 * Semantic color tokens configuration
 */
export interface SemanticTokens {
  /** Page background */
  background: string
  /** Primary text color */
  foreground: string
  /** Card/surface background */
  card: string
  /** Card text color */
  cardForeground: string
  /** Popover/dropdown background */
  popover: string
  /** Popover text color */
  popoverForeground: string
  /** Primary brand color */
  primary: string
  /** Primary text on primary background */
  primaryForeground: string
  /** Secondary/muted color */
  secondary: string
  /** Secondary text color */
  secondaryForeground: string
  /** Muted backgrounds */
  muted: string
  /** Muted text (less prominent) */
  mutedForeground: string
  /** Accent highlights */
  accent: string
  /** Accent text color */
  accentForeground: string
  /** Destructive/error color */
  destructive: string
  /** Destructive text color */
  destructiveForeground: string
  /** Border color */
  border: string
  /** Form input border */
  input: string
  /** Focus ring color */
  ring: string
  /** Border radius base */
  radius: string
}

/**
 * Light theme semantic tokens
 * Using HSL values for easy customization
 */
export const lightSemanticTokens: SemanticTokens = {
  background: '0 0% 100%',           // white
  foreground: '222.2 84% 4.9%',      // near black
  card: '0 0% 100%',                 // white
  cardForeground: '222.2 84% 4.9%',
  popover: '0 0% 100%',
  popoverForeground: '222.2 84% 4.9%',
  primary: '24.6 95% 53.1%',         // coral-500 (#ff7f50)
  primaryForeground: '60 9.1% 97.8%', // light
  secondary: '210 40% 96.1%',        // slate-100
  secondaryForeground: '222.2 47.4% 11.2%',
  muted: '210 40% 96.1%',
  mutedForeground: '215.4 16.3% 46.9%',
  accent: '210 40% 96.1%',
  accentForeground: '222.2 47.4% 11.2%',
  destructive: '0 84.2% 60.2%',      // red-500
  destructiveForeground: '60 9.1% 97.8%',
  border: '214.3 31.8% 91.4%',       // slate-200
  input: '214.3 31.8% 91.4%',
  ring: '24.6 95% 53.1%',            // coral-500
  radius: '0.5rem',
}

/**
 * Dark theme semantic tokens
 */
export const darkSemanticTokens: SemanticTokens = {
  background: '222.2 84% 4.9%',      // near black
  foreground: '210 40% 98%',         // near white
  card: '222.2 84% 4.9%',
  cardForeground: '210 40% 98%',
  popover: '222.2 84% 4.9%',
  popoverForeground: '210 40% 98%',
  primary: '20.5 90.2% 48.2%',       // coral-600 (brighter in dark)
  primaryForeground: '60 9.1% 97.8%',
  secondary: '217.2 32.6% 17.5%',    // slate-800
  secondaryForeground: '210 40% 98%',
  muted: '217.2 32.6% 17.5%',
  mutedForeground: '215 20.2% 65.1%',
  accent: '217.2 32.6% 17.5%',
  accentForeground: '210 40% 98%',
  destructive: '0 62.8% 30.6%',      // darker red
  destructiveForeground: '210 40% 98%',
  border: '217.2 32.6% 17.5%',       // slate-800
  input: '217.2 32.6% 17.5%',
  ring: '20.5 90.2% 48.2%',          // coral-600
  radius: '0.5rem',
}

/**
 * Theme color palette presets
 */
export const themePresets = {
  coral: {
    light: lightSemanticTokens,
    dark: darkSemanticTokens,
  },
  blue: {
    light: {
      ...lightSemanticTokens,
      primary: '221.2 83.2% 53.3%',   // blue-500
      ring: '221.2 83.2% 53.3%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '217.2 91.2% 59.8%',   // blue-400
      ring: '217.2 91.2% 59.8%',
    },
  },
  green: {
    light: {
      ...lightSemanticTokens,
      primary: '142.1 76.2% 36.3%',   // green-600
      ring: '142.1 76.2% 36.3%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '142.1 70.6% 45.3%',   // green-500
      ring: '142.1 70.6% 45.3%',
    },
  },
  purple: {
    light: {
      ...lightSemanticTokens,
      primary: '262.1 83.3% 57.8%',   // violet-500
      ring: '262.1 83.3% 57.8%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '263.4 70% 50.4%',     // violet-600
      ring: '263.4 70% 50.4%',
    },
  },
  rose: {
    light: {
      ...lightSemanticTokens,
      primary: '346.8 77.2% 49.8%',   // rose-500
      ring: '346.8 77.2% 49.8%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '346.8 77.2% 49.8%',
      ring: '346.8 77.2% 49.8%',
    },
  },
  amber: {
    light: {
      ...lightSemanticTokens,
      primary: '37.7 92.1% 50.2%',    // amber-500
      ring: '37.7 92.1% 50.2%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '43.3 96.4% 56.3%',    // amber-400
      ring: '43.3 96.4% 56.3%',
    },
  },
  slate: {
    light: {
      ...lightSemanticTokens,
      primary: '215.4 16.3% 46.9%',   // slate-500
      ring: '215.4 16.3% 46.9%',
    },
    dark: {
      ...darkSemanticTokens,
      primary: '217.9 10.6% 64.9%',   // slate-400
      ring: '217.9 10.6% 64.9%',
    },
  },
  zinc: {
    light: {
      ...lightSemanticTokens,
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      card: '0 0% 100%',
      cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%',
      popoverForeground: '240 10% 3.9%',
      primary: '240 5.9% 10%',
      primaryForeground: '0 0% 98%',
      secondary: '240 4.8% 95.9%',
      secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%',
      mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%',
      accentForeground: '240 5.9% 10%',
      border: '240 5.9% 90%',
      input: '240 5.9% 90%',
      ring: '240 5.9% 10%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 98%',
      radius: '0.5rem',
    },
    dark: {
      ...darkSemanticTokens,
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      card: '240 10% 3.9%',
      cardForeground: '0 0% 98%',
      popover: '240 10% 3.9%',
      popoverForeground: '0 0% 98%',
      primary: '0 0% 98%',
      primaryForeground: '240 5.9% 10%',
      secondary: '240 3.7% 15.9%',
      secondaryForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%',
      mutedForeground: '240 5% 64.9%',
      accent: '240 3.7% 15.9%',
      accentForeground: '0 0% 98%',
      border: '240 3.7% 15.9%',
      input: '240 3.7% 15.9%',
      ring: '240 4.9% 83.9%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 98%',
      radius: '0.5rem',
    },
  },
} as const

export type ThemePresetName = keyof typeof themePresets

/**
 * Generate CSS variables from semantic tokens
 */
export function generateSemanticCSS(tokens: SemanticTokens): string {
  return `  --background: ${tokens.background};
  --foreground: ${tokens.foreground};
  --card: ${tokens.card};
  --card-foreground: ${tokens.cardForeground};
  --popover: ${tokens.popover};
  --popover-foreground: ${tokens.popoverForeground};
  --primary: ${tokens.primary};
  --primary-foreground: ${tokens.primaryForeground};
  --secondary: ${tokens.secondary};
  --secondary-foreground: ${tokens.secondaryForeground};
  --muted: ${tokens.muted};
  --muted-foreground: ${tokens.mutedForeground};
  --accent: ${tokens.accent};
  --accent-foreground: ${tokens.accentForeground};
  --destructive: ${tokens.destructive};
  --destructive-foreground: ${tokens.destructiveForeground};
  --border: ${tokens.border};
  --input: ${tokens.input};
  --ring: ${tokens.ring};
  --radius: ${tokens.radius};`
}

/**
 * Generate complete semantic theme CSS
 */
export function generateSemanticThemeCSS(
  preset: ThemePresetName = 'coral',
  strategy: DarkModeStrategy = 'class'
): string {
  const { light, dark } = themePresets[preset]

  const lightCSS = `:root {\n${generateSemanticCSS(light)}\n}`

  let darkCSS: string
  switch (strategy) {
    case 'class':
      darkCSS = `.dark {\n${generateSemanticCSS(dark)}\n}`
      break
    case 'media':
      darkCSS = `@media (prefers-color-scheme: dark) {\n  :root {\n${generateSemanticCSS(dark)}\n  }\n}`
      break
    case 'selector':
      darkCSS = `[data-theme="dark"] {\n${generateSemanticCSS(dark)}\n}`
      break
    case 'auto':
      darkCSS = `.dark {\n${generateSemanticCSS(dark)}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${generateSemanticCSS(dark)}\n  }\n}`
      break
    default:
      darkCSS = `.dark {\n${generateSemanticCSS(dark)}\n}`
  }

  return `${lightCSS}\n\n${darkCSS}`
}

/**
 * Generate custom semantic theme CSS
 */
export function generateCustomSemanticThemeCSS(
  lightTokens: Partial<SemanticTokens>,
  darkTokens: Partial<SemanticTokens>,
  strategy: DarkModeStrategy = 'class'
): string {
  const light = { ...lightSemanticTokens, ...lightTokens }
  const dark = { ...darkSemanticTokens, ...darkTokens }

  const lightCSS = `:root {\n${generateSemanticCSS(light)}\n}`

  let darkCSS: string
  switch (strategy) {
    case 'class':
      darkCSS = `.dark {\n${generateSemanticCSS(dark)}\n}`
      break
    case 'media':
      darkCSS = `@media (prefers-color-scheme: dark) {\n  :root {\n${generateSemanticCSS(dark)}\n  }\n}`
      break
    default:
      darkCSS = `.dark {\n${generateSemanticCSS(dark)}\n}`
  }

  return `${lightCSS}\n\n${darkCSS}`
}
