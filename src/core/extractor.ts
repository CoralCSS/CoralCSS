/**
 * Class Extractor
 *
 * Extracts class names from HTML and other content.
 * @module core/extractor
 */

import { dedupeStrings } from '../utils/string'
import { CLASS_ATTR_PATTERN, TEMPLATE_CLASS_PATTERN } from '../utils/regex'

/**
 * Extractor options
 */
export interface ExtractorOptions {
  /** Include attributify syntax */
  attributify?: boolean
  /** Custom extraction patterns */
  patterns?: RegExp[]
}

/**
 * Attributify attribute groups
 */
const ATTRIBUTIFY_GROUPS = [
  'p',
  'm',
  'w',
  'h',
  'size',
  'bg',
  'text',
  'border',
  'ring',
  'shadow',
  'font',
  'leading',
  'tracking',
  'flex',
  'grid',
  'gap',
  'pos',
  'inset',
  'z',
  'opacity',
  'blur',
  'rounded',
  'transition',
  'duration',
  'ease',
  'delay',
  'scale',
  'rotate',
  'translate',
]

/**
 * Class Extractor class
 *
 * @example
 * ```typescript
 * const extractor = new Extractor()
 * const classes = extractor.extractFromHTML('<div class="p-4 bg-red-500">')
 * // ['p-4', 'bg-red-500']
 * ```
 */
export class Extractor {
  private options: ExtractorOptions
  private attributifyPattern: RegExp

  constructor(options: ExtractorOptions = {}) {
    this.options = {
      attributify: false,
      patterns: [],
      ...options,
    }

    // Build attributify pattern
    const attrGroups = ATTRIBUTIFY_GROUPS.join('|')
    this.attributifyPattern = new RegExp(`(?:^|\\s)(${attrGroups})="([^"]*)"`, 'g')
  }

  /**
   * Extract classes from HTML content
   *
   * @example
   * ```typescript
   * const classes = extractor.extractFromHTML(`
   *   <div class="p-4 bg-red-500">
   *     <button class="btn hover:bg-blue-500">Click</button>
   *   </div>
   * `)
   * // ['p-4', 'bg-red-500', 'btn', 'hover:bg-blue-500']
   * ```
   */
  extractFromHTML(html: string): string[] {
    const classes: string[] = []

    // Extract from class attributes
    classes.push(...this.extractClassAttribute(html))

    // Extract from className attributes (JSX)
    classes.push(...this.extractClassNameAttribute(html))

    // Extract attributify syntax if enabled
    if (this.options.attributify) {
      classes.push(...this.extractAttributify(html))
    }

    // Apply custom patterns
    for (const pattern of this.options.patterns ?? []) {
      classes.push(...this.extractWithPattern(html, pattern))
    }

    return dedupeStrings(classes)
  }

  /**
   * Extract from any content (JS, JSX, templates, etc.)
   *
   * @example
   * ```typescript
   * const classes = extractor.extract(`
   *   const className = "p-4 bg-red-500"
   *   element.classList.add('hover:bg-blue-500')
   * `)
   * ```
   */
  extract(content: string): string[] {
    const classes: string[] = []

    // Extract from class/className attributes
    classes.push(...this.extractClassAttribute(content))
    classes.push(...this.extractClassNameAttribute(content))

    // Extract from template literals
    classes.push(...this.extractTemplateLiterals(content))

    // Extract from string literals that look like classes
    classes.push(...this.extractStringLiterals(content))

    // Apply custom patterns
    for (const pattern of this.options.patterns ?? []) {
      classes.push(...this.extractWithPattern(content, pattern))
    }

    return dedupeStrings(classes)
  }

  /**
   * Extract from class="..." attributes
   */
  private extractClassAttribute(content: string): string[] {
    const classes: string[] = []
    const pattern = /class="([^"]*)"/g
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    return classes
  }

  /**
   * Extract from className="..." or className={'...'} attributes
   */
  private extractClassNameAttribute(content: string): string[] {
    const classes: string[] = []

    // className="..."
    const stringPattern = /className="([^"]*)"/g
    let match: RegExpExecArray | null

    while ((match = stringPattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    // className={'...'}
    const exprPattern = /className=\{[`'"]([^`'"]*)[`'"]\}/g
    while ((match = exprPattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    return classes
  }

  /**
   * Extract from template literals
   */
  private extractTemplateLiterals(content: string): string[] {
    const classes: string[] = []

    // Match template literals in className or class contexts
    const pattern = /(?:class(?:Name)?=\{?)`([^`]*)`/g
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const value = match[1]!
      // Remove ${...} expressions
      const cleaned = value.replace(/\$\{[^}]*\}/g, ' ')
      classes.push(...this.splitClasses(cleaned))
    }

    return classes
  }

  /**
   * Extract from string literals that look like utility classes
   */
  private extractStringLiterals(content: string): string[] {
    const classes: string[] = []

    // Match quoted strings that look like class names
    // This is a heuristic - looks for common utility patterns
    const pattern = /["'`]([a-z][a-z0-9-:[\]()./]*(?:\s+[a-z][a-z0-9-:[\]()./]*)*)["'`]/gi
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const value = match[1]!
      // Only include if it looks like utility classes
      const parts = this.splitClasses(value)
      for (const part of parts) {
        if (this.looksLikeUtility(part)) {
          classes.push(part)
        }
      }
    }

    return classes
  }

  /**
   * Extract attributify syntax
   *
   * @example
   * ```html
   * <div bg="red-500 hover:red-600" p="4" m="x-2 y-4">
   * ```
   * Extracts: ['bg-red-500', 'hover:bg-red-600', 'p-4', 'm-x-2', 'm-y-4']
   */
  extractAttributify(html: string): string[] {
    const classes: string[] = []
    let match: RegExpExecArray | null

    // Reset regex
    this.attributifyPattern.lastIndex = 0

    while ((match = this.attributifyPattern.exec(html)) !== null) {
      const [, attr, values] = match
      const valueList = values!.trim().split(/\s+/)

      for (const value of valueList) {
        if (!value) {
          continue
        }

        // Check for variant prefix
        const variantMatch = value.match(/^([a-z-]+:)?(.+)$/)
        if (variantMatch) {
          const [, variant, val] = variantMatch
          if (variant) {
            // e.g., hover:red-500 -> hover:bg-red-500
            classes.push(`${variant}${attr}-${val}`)
          } else {
            // e.g., red-500 -> bg-red-500
            classes.push(`${attr}-${val}`)
          }
        }
      }
    }

    return classes
  }

  /**
   * Extract using a custom pattern
   */
  private extractWithPattern(content: string, pattern: RegExp): string[] {
    const classes: string[] = []
    let match: RegExpExecArray | null

    // Clone pattern to reset lastIndex
    const clonedPattern = new RegExp(pattern.source, pattern.flags)

    while ((match = clonedPattern.exec(content)) !== null) {
      // Use first capture group or full match
      const value = match[1] ?? match[0]
      classes.push(...this.splitClasses(value))
    }

    return classes
  }

  /**
   * Split a class string into individual classes
   */
  private splitClasses(classString: string): string[] {
    return classString
      .split(/\s+/)
      .map((c) => c.trim())
      .filter(Boolean)
  }

  /**
   * Check if a string looks like a utility class
   */
  private looksLikeUtility(str: string): boolean {
    // Common utility patterns
    const patterns = [
      /^-?[a-z]+-[a-z0-9[\]().:%-]+$/, // Standard utilities
      /^[a-z]+:[a-z]+-[a-z0-9[\]().:%-]+$/, // With variants
      /^-?[a-z]+$/, // Simple utilities (flex, block, etc.)
    ]

    return patterns.some((p) => p.test(str))
  }

  /**
   * Set extraction options
   */
  setOptions(options: Partial<ExtractorOptions>): void {
    this.options = { ...this.options, ...options }
  }
}

/**
 * Create a new extractor instance
 */
export function createExtractor(options?: ExtractorOptions): Extractor {
  return new Extractor(options)
}

/**
 * Extract classes from HTML (convenience function)
 */
export function extractFromHTML(html: string, options?: ExtractorOptions): string[] {
  const extractor = new Extractor(options)
  return extractor.extractFromHTML(html)
}

/**
 * Extract classes from any content (convenience function)
 */
export function extractClasses(content: string, options?: ExtractorOptions): string[] {
  const extractor = new Extractor(options)
  return extractor.extract(content)
}
