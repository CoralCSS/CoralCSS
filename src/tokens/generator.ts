/**
 * Token Generator
 *
 * Generates CSS custom properties and other output formats from design tokens.
 *
 * @module tokens/generator
 */

import type {
  DesignTokens,
  TokenValue,
  TokenGenerationOptions,
  TokenOutputFormat as _TokenOutputFormat,
} from './types'
import { isRef } from './ref'

/**
 * Default generation options
 */
const defaultOptions: TokenGenerationOptions = {
  format: 'css',
  prefix: '',
  selector: ':root',
  includeComments: false,
  categorize: true,
}

/**
 * Convert a token path to a CSS variable name
 */
export function tokenToCSSVar(path: string, prefix: string = ''): string {
  const varName = path
    .replace(/\./g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
  return prefix ? `--${prefix}-${varName}` : `--${varName}`
}

/**
 * Flatten a nested token object into path-value pairs
 */
export function flattenTokens(
  tokens: Record<string, unknown>,
  prefix: string = ''
): Map<string, TokenValue> {
  const result = new Map<string, TokenValue>()

  function traverse(obj: Record<string, unknown>, path: string) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key

      if (value === null || value === undefined) {
        continue
      }

      if (isRef(value)) {
        // Store reference for later resolution
        result.set(currentPath, value as TokenValue)
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Check if it's a token definition with 'value' property
        if ('value' in value && (typeof value.value === 'string' || typeof value.value === 'number')) {
          result.set(currentPath, value.value as TokenValue)
        } else {
          // Recurse into nested object
          traverse(value as Record<string, unknown>, currentPath)
        }
      } else {
        // Primitive value
        result.set(currentPath, value as TokenValue)
      }
    }
  }

  traverse(tokens, prefix)
  return result
}

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVariables(
  tokens: Partial<DesignTokens>,
  options: TokenGenerationOptions = {}
): string {
  const opts = { ...defaultOptions, ...options }
  const flatTokens = flattenTokens(tokens as Record<string, unknown>)
  const lines: string[] = []

  if (opts.selector) {
    lines.push(`${opts.selector} {`)
  }

  let currentCategory = ''

  for (const [path, value] of flatTokens) {
    // Add category comment
    if (opts.includeComments && opts.categorize) {
      const category = path.split('.')[0] || ''
      if (category !== currentCategory) {
        if (currentCategory) {
          lines.push('')
        }
        lines.push(`  /* ${category} */`)
        currentCategory = category
      }
    }

    const varName = tokenToCSSVar(path, opts.prefix)
    const cssValue = formatCSSValue(value)
    lines.push(`  ${varName}: ${cssValue};`)
  }

  if (opts.selector) {
    lines.push('}')
  }

  return lines.join('\n')
}

/**
 * Format a token value for CSS output
 */
function formatCSSValue(value: TokenValue): string {
  if (isRef(value)) {
    // Convert reference to CSS var() reference
    const refPath = (value as { $ref: string }).$ref
    return `var(${tokenToCSSVar(refPath)})`
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return String(value)
}

/**
 * Generate SCSS variables from tokens
 */
export function generateSCSSVariables(
  tokens: Partial<DesignTokens>,
  options: TokenGenerationOptions = {}
): string {
  const opts = { ...defaultOptions, ...options }
  const flatTokens = flattenTokens(tokens as Record<string, unknown>)
  const lines: string[] = []

  let currentCategory = ''

  for (const [path, value] of flatTokens) {
    // Add category comment
    if (opts.includeComments && opts.categorize) {
      const category = path.split('.')[0] || ''
      if (category !== currentCategory) {
        if (currentCategory) {
          lines.push('')
        }
        lines.push(`// ${category}`)
        currentCategory = category
      }
    }

    const varName = path.replace(/\./g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const prefix = opts.prefix ? `${opts.prefix}-` : ''
    const scssValue = formatSCSSValue(value)
    lines.push(`$${prefix}${varName}: ${scssValue};`)
  }

  return lines.join('\n')
}

/**
 * Format a token value for SCSS output
 */
function formatSCSSValue(value: TokenValue): string {
  if (isRef(value)) {
    // Convert reference to SCSS variable reference
    const refPath = (value as { $ref: string }).$ref
    const varName = refPath.replace(/\./g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    return `$${varName}`
  }

  if (Array.isArray(value)) {
    return `(${value.join(', ')})`
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return String(value)
}

/**
 * Generate JSON output from tokens
 */
export function generateJSON(
  tokens: Partial<DesignTokens>,
  options: { flat?: boolean } = {}
): string {
  if (options.flat) {
    const flatTokens = flattenTokens(tokens as Record<string, unknown>)
    const obj: Record<string, TokenValue> = {}
    for (const [key, value] of flatTokens) {
      obj[key] = value
    }
    return JSON.stringify(obj, null, 2)
  }
  return JSON.stringify(tokens, null, 2)
}

/**
 * Generate JavaScript/TypeScript module from tokens
 */
export function generateJS(
  tokens: Partial<DesignTokens>,
  options: { typescript?: boolean; exportName?: string } = {}
): string {
  const { typescript = false, exportName = 'tokens' } = options
  const json = JSON.stringify(tokens, null, 2)

  if (typescript) {
    return `export const ${exportName} = ${json} as const;\n\nexport type Tokens = typeof ${exportName};`
  }

  return `export const ${exportName} = ${json};`
}

/**
 * Generate tokens in the specified format
 */
export function generateTokens(
  tokens: Partial<DesignTokens>,
  options: TokenGenerationOptions = {}
): string {
  const format = options.format || 'css'

  switch (format) {
    case 'css':
      return generateCSSVariables(tokens, options)
    case 'scss':
      return generateSCSSVariables(tokens, options)
    case 'json':
      return generateJSON(tokens)
    case 'js':
      return generateJS(tokens)
    case 'ts':
      return generateJS(tokens, { typescript: true })
    default:
      throw new Error(`Unsupported output format: ${format}`)
  }
}

/**
 * Generate CSS for light and dark themes
 */
export function generateThemeCSS(
  lightTokens: Partial<DesignTokens>,
  darkTokens: Partial<DesignTokens>,
  options: {
    prefix?: string
    lightSelector?: string
    darkSelector?: string
    darkMediaQuery?: boolean
  } = {}
): string {
  const {
    prefix = '',
    lightSelector = ':root',
    darkSelector = '.dark',
    darkMediaQuery = true,
  } = options

  const lines: string[] = []

  // Light theme
  lines.push(generateCSSVariables(lightTokens, {
    prefix,
    selector: lightSelector,
    includeComments: true,
    categorize: true,
  }))

  lines.push('')

  // Dark theme with class selector
  lines.push(generateCSSVariables(darkTokens, {
    prefix,
    selector: darkSelector,
    includeComments: false,
  }))

  // Dark theme with media query
  if (darkMediaQuery) {
    lines.push('')
    lines.push('@media (prefers-color-scheme: dark) {')
    lines.push(generateCSSVariables(darkTokens, {
      prefix,
      selector: ':root:not(.light)',
      includeComments: false,
    }))
    lines.push('}')
  }

  return lines.join('\n')
}

/**
 * Generate a CSS utility class from a token
 */
export function generateUtilityClass(
  property: string,
  tokenPath: string,
  prefix: string = ''
): string {
  const className = tokenPath.replace(/\./g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  const varName = tokenToCSSVar(tokenPath, prefix)
  return `.${className} { ${property}: var(${varName}); }`
}

/**
 * Generate utility classes for a token category
 */
export function generateUtilityClasses(
  tokens: Record<string, unknown>,
  property: string,
  options: { prefix?: string; classPrefix?: string } = {}
): string {
  const { prefix = '', classPrefix = '' } = options
  const flatTokens = flattenTokens(tokens)
  const lines: string[] = []

  for (const [path] of flatTokens) {
    const className = `${classPrefix}${path.replace(/\./g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
    const varName = tokenToCSSVar(path, prefix)
    lines.push(`.${className} { ${property}: var(${varName}); }`)
  }

  return lines.join('\n')
}
