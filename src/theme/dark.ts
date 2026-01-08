/**
 * Dark Mode Utilities
 *
 * Dark mode color inversions and utilities.
 * @module theme/dark
 */

import type { ColorScale, ThemeColors, DarkModeStrategy } from '../types'
import { colors as lightColors } from './colors'

/**
 * Invert a color scale for dark mode
 * Swaps light and dark shades
 */
export function invertColorScale(scale: ColorScale): ColorScale {
  return {
    50: scale[950],
    100: scale[900],
    200: scale[800],
    300: scale[700],
    400: scale[600],
    500: scale[500],
    600: scale[400],
    700: scale[300],
    800: scale[200],
    900: scale[100],
    950: scale[50],
  }
}

/**
 * Generate dark mode color overrides
 */
export function generateDarkColors(): Partial<ThemeColors> {
  const darkColors: Partial<ThemeColors> = {}

  // Invert all color scales
  for (const [name, value] of Object.entries(lightColors)) {
    if (typeof value === 'object' && '50' in value) {
      darkColors[name] = invertColorScale(value as ColorScale)
    }
  }

  // Keep semantic colors the same
  darkColors.inherit = 'inherit'
  darkColors.current = 'currentColor'
  darkColors.transparent = 'transparent'
  darkColors.black = '#000000'
  darkColors.white = '#ffffff'

  return darkColors
}

/**
 * Generate CSS for dark mode color variables
 */
export function generateDarkModeCSS(
  strategy: DarkModeStrategy,
  selector?: string
): string {
  const darkColors = generateDarkColors()
  const variables: string[] = []

  // Generate CSS variables for dark colors
  for (const [name, value] of Object.entries(darkColors)) {
    if (typeof value === 'object' && '50' in value) {
      const scale = value as ColorScale
      for (const [shade, color] of Object.entries(scale)) {
        variables.push(`  --${name}-${shade}: ${color};`)
      }
    }
  }

  const variableBlock = variables.join('\n')

  switch (strategy) {
    case 'class':
      return `.dark {\n${variableBlock}\n}`

    case 'media':
      return `@media (prefers-color-scheme: dark) {\n  :root {\n${variableBlock}\n  }\n}`

    case 'selector':
      return `${selector ?? '[data-theme="dark"]'} {\n${variableBlock}\n}`

    case 'auto':
      // Generate both class and media query
      return [
        `.dark {\n${variableBlock}\n}`,
        `@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${variableBlock}\n  }\n}`,
      ].join('\n\n')

    default:
      return `.dark {\n${variableBlock}\n}`
  }
}

/**
 * Get dark mode wrapper for CSS
 */
export function wrapInDarkMode(
  css: string,
  strategy: DarkModeStrategy,
  selector?: string
): string {
  switch (strategy) {
    case 'class':
      return `.dark ${css}`

    case 'media':
      return `@media (prefers-color-scheme: dark) { ${css} }`

    case 'selector':
      return `${selector ?? '[data-theme="dark"]'} ${css}`

    case 'auto':
      // For auto, we use the class strategy
      return `.dark ${css}`

    default:
      return `.dark ${css}`
  }
}

/**
 * Check if dark mode should use class strategy
 */
export function usesClassStrategy(strategy: DarkModeStrategy): boolean {
  return strategy === 'class' || strategy === 'auto'
}

/**
 * Check if dark mode should use media query strategy
 */
export function usesMediaStrategy(strategy: DarkModeStrategy): boolean {
  return strategy === 'media' || strategy === 'auto'
}

/**
 * Generate CSS variable declarations for light theme
 */
export function generateLightModeCSS(): string {
  const variables: string[] = []

  for (const [name, value] of Object.entries(lightColors)) {
    if (typeof value === 'object' && '50' in value) {
      const scale = value as ColorScale
      for (const [shade, color] of Object.entries(scale)) {
        variables.push(`  --${name}-${shade}: ${color};`)
      }
    } else if (typeof value === 'string') {
      variables.push(`  --${name}: ${value};`)
    }
  }

  return `:root {\n${variables.join('\n')}\n}`
}

/**
 * Generate complete theme CSS with both light and dark modes
 */
export function generateThemeCSS(
  darkModeStrategy: DarkModeStrategy,
  darkModeSelector?: string
): string {
  const parts: string[] = [
    generateLightModeCSS(),
    generateDarkModeCSS(darkModeStrategy, darkModeSelector),
  ]

  return parts.join('\n\n')
}
