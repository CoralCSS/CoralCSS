/**
 * CoralCSS Default Theme CSS
 *
 * Pre-generated CSS theme variables for light and dark modes.
 * Can be imported directly or generated dynamically.
 * @module theme/css
 */

import { lightSemanticTokens, darkSemanticTokens, themePresets, generateSemanticCSS } from './semantic'
import type { ThemePresetName } from './semantic'
import { colors } from './colors'
import { spacing, sizing, maxWidth, zIndex } from './spacing'
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacing } from './typography'
import { borderRadius, borderWidth, boxShadow, opacity, transitionDuration, transitionTimingFunction, blur, dropShadow, screens } from './default'
import type { DarkModeStrategy } from '../types'

/**
 * CSS generation options
 */
export interface CSSGenerationOptions {
  /** Theme preset to use */
  preset?: ThemePresetName
  /** Dark mode strategy */
  darkMode?: DarkModeStrategy
  /** Include color palette CSS variables */
  includeColors?: boolean
  /** Include spacing CSS variables */
  includeSpacing?: boolean
  /** Include typography CSS variables */
  includeTypography?: boolean
  /** Include effect CSS variables (shadows, blur, etc.) */
  includeEffects?: boolean
  /** Include breakpoint CSS variables */
  includeBreakpoints?: boolean
  /** Include CSS reset/normalize */
  includeReset?: boolean
  /** Include base layer styles */
  includeBase?: boolean
  /** Minify output */
  minify?: boolean
}

const defaultOptions: CSSGenerationOptions = {
  preset: 'coral',
  darkMode: 'class',
  includeColors: true,
  includeSpacing: true,
  includeTypography: true,
  includeEffects: true,
  includeBreakpoints: true,
  includeReset: true,
  includeBase: true,
  minify: false,
}

/**
 * Generate CSS color palette variables
 */
export function generateColorPaletteCSS(): string {
  const lines: string[] = []

  for (const [name, scale] of Object.entries(colors)) {
    if (typeof scale === 'object') {
      for (const [shade, value] of Object.entries(scale)) {
        lines.push(`  --color-${name}-${shade}: ${value};`)
      }
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS spacing variables
 */
export function generateSpacingCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key.replace('.', '\\.').replace('/', '\\/')}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS sizing variables
 */
export function generateSizingCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(sizing)) {
    const safeKey = key.replace('.', '\\.').replace('/', '\\/')
    lines.push(`  --sizing-${safeKey}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS max-width variables
 */
export function generateMaxWidthCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(maxWidth)) {
    lines.push(`  --max-width-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS z-index variables
 */
export function generateZIndexCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(zIndex)) {
    lines.push(`  --z-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS typography variables
 */
export function generateTypographyCSS(): string {
  const lines: string[] = []

  // Font families
  for (const [key, value] of Object.entries(fonts)) {
    lines.push(`  --font-${key}: ${value};`)
  }

  // Font sizes
  for (const [key, value] of Object.entries(fontSizes)) {
    if (typeof value === 'string') {
      lines.push(`  --text-${key}: ${value};`)
    } else if (typeof value === 'object' && value !== null) {
      const fontValue = value as { fontSize: string; lineHeight?: string }
      lines.push(`  --text-${key}: ${fontValue.fontSize};`)
      if (fontValue.lineHeight) {
        lines.push(`  --text-${key}-line-height: ${fontValue.lineHeight};`)
      }
    }
  }

  // Font weights
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`)
  }

  // Line heights
  for (const [key, value] of Object.entries(lineHeights)) {
    lines.push(`  --leading-${key}: ${value};`)
  }

  // Letter spacing
  for (const [key, value] of Object.entries(letterSpacing)) {
    lines.push(`  --tracking-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS effect variables (shadows, blur, etc.)
 */
export function generateEffectsCSS(): string {
  const lines: string[] = []

  // Border radius
  for (const [key, value] of Object.entries(borderRadius)) {
    lines.push(`  --rounded-${key}: ${value};`)
  }

  // Border width
  for (const [key, value] of Object.entries(borderWidth)) {
    lines.push(`  --border-${key}: ${value};`)
  }

  // Box shadows
  for (const [key, value] of Object.entries(boxShadow)) {
    lines.push(`  --shadow-${key}: ${value};`)
  }

  // Opacity
  for (const [key, value] of Object.entries(opacity)) {
    lines.push(`  --opacity-${key}: ${value};`)
  }

  // Transition duration
  for (const [key, value] of Object.entries(transitionDuration)) {
    lines.push(`  --duration-${key}: ${value};`)
  }

  // Transition timing
  for (const [key, value] of Object.entries(transitionTimingFunction)) {
    lines.push(`  --ease-${key}: ${value};`)
  }

  // Blur
  for (const [key, value] of Object.entries(blur)) {
    lines.push(`  --blur-${key}: ${value};`)
  }

  // Drop shadow
  for (const [key, value] of Object.entries(dropShadow)) {
    if (Array.isArray(value)) {
      lines.push(`  --drop-shadow-${key}: ${value.join(', ')};`)
    } else {
      lines.push(`  --drop-shadow-${key}: ${value};`)
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS breakpoint variables
 */
export function generateBreakpointsCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(screens)) {
    if (typeof value === 'string') {
      lines.push(`  --screen-${key}: ${value};`)
    } else if (typeof value === 'object' && value !== null) {
      const screenValue = value as { min?: string; max?: string }
      if (screenValue.min) {
        lines.push(`  --screen-${key}: ${screenValue.min};`)
      }
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS reset/normalize
 */
export function generateResetCSS(): string {
  return `/*! CoralCSS Reset - Based on modern-normalize */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  -moz-tab-size: 4;
  tab-size: 4;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  line-height: inherit;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr[title] {
  text-decoration: underline dotted;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace);
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: hsl(var(--muted-foreground, 215.4 16.3% 46.9%));
}

button, [role='button'] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}
`
}

/**
 * Generate CSS base layer styles
 */
export function generateBaseCSS(): string {
  return `/* CoralCSS Base Layer */
html {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: 'rlig' 1, 'calt' 1;
}

/* Focus ring default */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Selection styling */
::selection {
  background-color: hsl(var(--primary) / 0.2);
  color: hsl(var(--foreground));
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Print styles */
@media print {
  body {
    background-color: white;
    color: black;
  }
}
`
}

/**
 * Generate complete theme CSS
 */
export function generateThemeCSSComplete(options: CSSGenerationOptions = {}): string {
  const opts = { ...defaultOptions, ...options }
  const sections: string[] = []

  // Reset
  if (opts.includeReset) {
    sections.push(generateResetCSS())
  }

  // Root variables
  const rootLines: string[] = []

  // Semantic tokens for light mode
  const lightTokens = opts.preset ? themePresets[opts.preset].light : lightSemanticTokens
  rootLines.push(generateSemanticCSS(lightTokens))

  // Color palette
  if (opts.includeColors) {
    rootLines.push('')
    rootLines.push('  /* Color Palette */')
    rootLines.push(generateColorPaletteCSS())
  }

  // Spacing
  if (opts.includeSpacing) {
    rootLines.push('')
    rootLines.push('  /* Spacing */')
    rootLines.push(generateSpacingCSS())
    rootLines.push('')
    rootLines.push('  /* Sizing */')
    rootLines.push(generateSizingCSS())
    rootLines.push('')
    rootLines.push('  /* Max Width */')
    rootLines.push(generateMaxWidthCSS())
    rootLines.push('')
    rootLines.push('  /* Z-Index */')
    rootLines.push(generateZIndexCSS())
  }

  // Typography
  if (opts.includeTypography) {
    rootLines.push('')
    rootLines.push('  /* Typography */')
    rootLines.push(generateTypographyCSS())
  }

  // Effects
  if (opts.includeEffects) {
    rootLines.push('')
    rootLines.push('  /* Effects */')
    rootLines.push(generateEffectsCSS())
  }

  // Breakpoints
  if (opts.includeBreakpoints) {
    rootLines.push('')
    rootLines.push('  /* Breakpoints */')
    rootLines.push(generateBreakpointsCSS())
  }

  sections.push(`:root {\n${rootLines.join('\n')}\n}`)

  // Dark mode tokens
  const darkTokens = opts.preset ? themePresets[opts.preset].dark : darkSemanticTokens

  switch (opts.darkMode) {
    case 'class':
      sections.push(`.dark {\n${generateSemanticCSS(darkTokens)}\n}`)
      break
    case 'media':
      sections.push(`@media (prefers-color-scheme: dark) {\n  :root {\n${generateSemanticCSS(darkTokens)}\n  }\n}`)
      break
    case 'selector':
      sections.push(`[data-theme="dark"] {\n${generateSemanticCSS(darkTokens)}\n}`)
      break
    case 'auto':
      sections.push(`.dark {\n${generateSemanticCSS(darkTokens)}\n}`)
      sections.push(`@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${generateSemanticCSS(darkTokens)}\n  }\n}`)
      break
  }

  // Base styles
  if (opts.includeBase) {
    sections.push(generateBaseCSS())
  }

  let css = sections.join('\n\n')

  // Minify if requested
  if (opts.minify) {
    css = css
      .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
      .replace(/\s*\n\s*/g, '')           // Remove newlines
      .replace(/\s*{\s*/g, '{')           // Clean braces
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')           // Clean colons
      .replace(/\s*;\s*/g, ';')           // Clean semicolons
      .replace(/;}/g, '}')                // Remove trailing semicolons
  }

  return css
}

/**
 * Pre-generated default theme CSS (coral preset, class strategy)
 */
export const defaultThemeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'class',
  includeReset: true,
  includeBase: true,
})

/**
 * Pre-generated minimal theme CSS (semantic tokens only)
 */
export const minimalThemeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'class',
  includeColors: false,
  includeSpacing: false,
  includeTypography: false,
  includeEffects: false,
  includeBreakpoints: false,
  includeReset: false,
  includeBase: false,
})

/**
 * Pre-generated theme CSS with only reset
 */
export const resetOnlyCSS = generateResetCSS()

/**
 * Pre-generated theme CSS with system dark mode
 */
export const systemDarkModeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'media',
  includeReset: true,
  includeBase: true,
})

export default generateThemeCSSComplete
