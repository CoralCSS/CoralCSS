/**
 * CSS Generator
 *
 * Generates CSS from matched rules.
 * @module core/generator
 */

import type {
  Rule,
  Variant,
  Theme,
  CSSProperties,
  GeneratedCSS,
  ParsedClass,
  MatchResult,
} from '../types'
import { escapeSelector } from '../utils/string'
import { serializeProperties, formatRule } from '../utils/css'

/**
 * Generator options
 */
export interface GeneratorOptions {
  /** CSS class prefix */
  prefix?: string
}

/**
 * CSS Generator class
 *
 * @example
 * ```typescript
 * const generator = new Generator(theme, variants)
 * const css = generator.generateClass('p-4', rule, match)
 * ```
 */
export class Generator {
  private theme: Theme
  private variants: Map<string, Variant>
  private prefix: string

  constructor(
    theme: Theme,
    variants: Map<string, Variant>,
    options: GeneratorOptions = {}
  ) {
    this.theme = theme
    this.variants = variants
    this.prefix = options.prefix ?? ''
  }

  /**
   * Generate CSS for a single class
   *
   * @example
   * ```typescript
   * const css = generator.generateClass('p-4', rule, ['p-4', '4'])
   * // { selector: '.p-4', properties: { padding: '1rem' }, ... }
   * ```
   */
  generateClass(
    className: string,
    rule: Rule,
    match: RegExpMatchArray
  ): GeneratedCSS | null {
    // Generate CSS properties from rule using generate, handler, or properties
    let properties: CSSProperties | null = null

    if (rule.generate) {
      properties = rule.generate(match, this.theme)
    } else if (rule.handler) {
      const result = rule.handler(match, this.theme)
      if (result) {
        // Check if result has a 'properties' key with object value
        if (typeof result === 'object' && 'properties' in result && typeof result.properties === 'object') {
          properties = result.properties as CSSProperties
        } else {
          properties = result as CSSProperties
        }
      }
    } else if (rule.properties) {
      properties = rule.properties
    }

    if (!properties) {
      return null
    }

    // Create selector
    const escapedClass = escapeSelector(className)
    const selector = this.prefix ? `.${this.prefix}${escapedClass}` : `.${escapedClass}`

    return {
      selector,
      properties,
      layer: rule.layer ?? 'utilities',
      priority: rule.priority ?? 0,
      className,
      variants: [],
    }
  }

  /**
   * Generate CSS for a parsed class with variants
   *
   * @example
   * ```typescript
   * const parsed = parse('hover:dark:bg-red-500')
   * const matchResult = matcher.match('bg-red-500')
   * const css = generator.generateWithVariants(parsed, matchResult)
   * ```
   */
  generateWithVariants(
    parsed: ParsedClass,
    matchResult: MatchResult
  ): GeneratedCSS | null {
    // Generate base CSS
    const baseCSS = this.generateClass(
      parsed.original,
      matchResult.rule,
      matchResult.match
    )

    if (!baseCSS) {
      return null
    }

    // Apply variants
    baseCSS.variants = parsed.variants

    return baseCSS
  }

  /**
   * Apply variants to generated CSS and produce final CSS string
   *
   * @example
   * ```typescript
   * const cssString = generator.applyVariants(generatedCSS)
   * // '@media (min-width: 768px) { .md\\:hover\\:bg-red-500:hover { background-color: red; } }'
   * ```
   */
  applyVariants(css: GeneratedCSS): string {
    let selector = css.selector
    let cssString = formatRule(selector, css.properties)
    const appliedVariants = [...css.variants].reverse() // Apply in reverse order
    const wrappers: ((css: string) => string)[] = []

    for (const variantName of appliedVariants) {
      const variant = this.variants.get(variantName)
      if (!variant) {
        // Unknown variant, skip
        continue
      }

      // Use transform if available, otherwise construct from handler
      if (variant.transform) {
        cssString = variant.transform(selector, cssString)
      } else if (variant.handler) {
        const newSelector = variant.handler(selector)
        cssString = cssString.replace(selector, newSelector)
        selector = newSelector
      }

      // Collect wrappers (for at-rules like media queries)
      if (variant.wrapper) {
        wrappers.push(variant.wrapper)
      }
    }

    // Apply wrappers from outer to inner
    for (const wrapper of wrappers.reverse()) {
      cssString = wrapper(cssString)
    }

    return cssString
  }

  /**
   * Generate CSS string from GeneratedCSS object
   */
  toCSS(css: GeneratedCSS): string {
    if (css.variants.length === 0) {
      return formatRule(css.selector, css.properties)
    }
    return this.applyVariants(css)
  }

  /**
   * Generate CSS for multiple classes
   *
   * @example
   * ```typescript
   * const cssStrings = generator.generateMany(parsedClasses, matchResults)
   * const fullCSS = cssStrings.join('\n')
   * ```
   */
  generateMany(
    parsedClasses: ParsedClass[],
    getMatchResult: (utility: string) => MatchResult | null
  ): string[] {
    const results: string[] = []

    for (const parsed of parsedClasses) {
      const matchResult = getMatchResult(parsed.utility)
      if (!matchResult) {
        continue
      }

      const css = this.generateWithVariants(parsed, matchResult)
      if (css) {
        results.push(this.toCSS(css))
      }
    }

    return results
  }

  /**
   * Update theme
   */
  setTheme(theme: Theme): void {
    this.theme = theme
  }

  /**
   * Update variants
   */
  setVariants(variants: Map<string, Variant>): void {
    this.variants = variants
  }

  /**
   * Update prefix
   */
  setPrefix(prefix: string): void {
    this.prefix = prefix
  }
}

/**
 * Create a new generator instance
 */
export function createGenerator(
  theme: Theme,
  variants: Map<string, Variant>,
  options?: GeneratorOptions
): Generator {
  return new Generator(theme, variants, options)
}

/**
 * Generate CSS properties for negative values
 *
 * @example
 * ```typescript
 * const props = generateNegative({ marginTop: '1rem' })
 * // { marginTop: '-1rem' }
 * ```
 */
export function generateNegative(properties: CSSProperties): CSSProperties {
  const result: CSSProperties = {}

  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === 'string' && /^[0-9]/.test(value)) {
      result[key] = `-${value}`
    } else if (typeof value === 'number' && value > 0) {
      result[key] = -value
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * Merge CSS properties, later values override earlier
 */
export function mergeProperties(...propsList: CSSProperties[]): CSSProperties {
  return Object.assign({}, ...propsList)
}

/**
 * Sort generated CSS by layer and priority
 */
export function sortGeneratedCSS(cssItems: GeneratedCSS[]): GeneratedCSS[] {
  const layerOrder: Record<string, number> = {
    base: 0,
    components: 1,
    utilities: 2,
  }

  return [...cssItems].sort((a, b) => {
    // First sort by layer
    const layerA = layerOrder[a.layer] ?? 2
    const layerB = layerOrder[b.layer] ?? 2
    const layerDiff = layerA - layerB
    if (layerDiff !== 0) {
      return layerDiff
    }

    // Then by priority within layer
    return a.priority - b.priority
  })
}

/**
 * Deduplicate CSS items by selector
 */
export function dedupeGeneratedCSS(cssItems: GeneratedCSS[]): GeneratedCSS[] {
  const seen = new Map<string, GeneratedCSS>()

  for (const item of cssItems) {
    const key = `${item.selector}:${item.variants.join(':')}`
    // Later items override earlier
    seen.set(key, item)
  }

  return Array.from(seen.values())
}

/**
 * CSSGenerator - Simplified generator that wraps matcher
 *
 * Provides a simpler API for generating CSS from class names.
 *
 * @example
 * ```typescript
 * const matcher = new RuleMatcher()
 * const generator = new CSSGenerator(matcher)
 *
 * matcher.addRule({
 *   pattern: 'block',
 *   properties: { display: 'block' }
 * })
 *
 * const css = generator.generateClass('block')
 * // '.block { display: block; }'
 * ```
 */
export class CSSGenerator {
  private matcher: { match: (utility: string) => MatchResult | null }
  private variants: Map<string, Variant>
  private theme: Theme

  constructor(matcher: { match: (utility: string) => MatchResult | null }, theme?: Theme) {
    this.matcher = matcher
    this.variants = new Map()
    this.theme = theme ?? ({} as Theme)
  }

  /**
   * Add a variant
   */
  addVariant(variant: Variant): void {
    this.variants.set(variant.name, variant)
  }

  /**
   * Generate CSS for a single class
   */
  generateClass(className: string): string {
    // Handle important prefix
    const isImportant = className.startsWith('!')
    const cleanClassName = isImportant ? className.slice(1) : className

    // Parse variants
    const parts = cleanClassName.split(':')
    const utility = parts.pop() ?? cleanClassName
    const variantNames = parts

    // Match the utility
    const matchResult = this.matcher.match(utility)
    if (!matchResult) {
      return ''
    }

    // Generate properties
    const rule = matchResult.rule
    const match = matchResult.match
    let properties: CSSProperties | null = null

    if (rule.generate) {
      properties = rule.generate(match, this.theme)
    } else if (rule.handler) {
      const result = rule.handler(match, this.theme)
      if (result) {
        if (typeof result === 'object' && 'properties' in result && typeof result.properties === 'object') {
          properties = result.properties as CSSProperties
        } else {
          properties = result as CSSProperties
        }
      }
    } else if (rule.properties) {
      properties = rule.properties
    }

    if (!properties) {
      return ''
    }

    // Create selector
    const escapedClass = escapeSelector(className)
    let selector = `.${escapedClass}`

    // Apply variants to selector
    for (const variantName of variantNames.reverse()) {
      const variant = this.variants.get(variantName)
      if (variant?.handler) {
        selector = variant.handler(selector)
      }
    }

    // Format properties
    const propsString = Object.entries(properties)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        const cssValue = isImportant ? `${value} !important` : value
        return `${cssKey}: ${cssValue}`
      })
      .join('; ')

    return `${selector} { ${propsString}; }`
  }

  /**
   * Generate CSS for multiple classes
   */
  generateMultiple(classNames: string[]): string {
    const seen = new Set<string>()
    const results: string[] = []

    for (const className of classNames) {
      if (seen.has(className)) continue
      seen.add(className)

      const css = this.generateClass(className)
      if (css) {
        results.push(css)
      }
    }

    return results.join('\n')
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this.theme = theme
  }
}
