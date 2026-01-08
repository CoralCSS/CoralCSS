/**
 * Regex Utilities
 *
 * Helper functions for working with regular expressions.
 * @module utils/regex
 */

/**
 * Escape special characters for use in RegExp
 *
 * @example
 * ```typescript
 * escapeRegex('p-[4px]') // 'p-\\[4px\\]'
 * escapeRegex('1/2') // '1\\/2'
 * ```
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Create a pattern from string (escape special chars and convert to RegExp)
 *
 * @example
 * ```typescript
 * createPattern('p-*') // /^p-.*$/
 * createPattern('bg-[*]') // /^bg-\[.*\]$/
 * ```
 */
export function createPattern(str: string, flags = ''): RegExp {
  // Replace * with .* for wildcard matching
  const escaped = escapeRegex(str).replace(/\\\*/g, '.*')
  return new RegExp(`^${escaped}$`, flags)
}

/**
 * Create an anchored pattern from RegExp or string
 *
 * @example
 * ```typescript
 * anchorPattern(/p-\d+/) // /^p-\d+$/
 * anchorPattern('p-\\d+') // /^p-\d+$/
 * ```
 */
export function anchorPattern(pattern: RegExp | string): RegExp {
  if (typeof pattern === 'string') {
    return new RegExp(`^${pattern}$`)
  }

  const source = pattern.source
  const flags = pattern.flags

  // Check if already anchored
  const hasStart = source.startsWith('^')
  const hasEnd = source.endsWith('$')

  if (hasStart && hasEnd) {
    return pattern
  }

  const newSource = `${hasStart ? '' : '^'}${source}${hasEnd ? '' : '$'}`
  return new RegExp(newSource, flags)
}

/**
 * Create pattern for utility class matching
 *
 * @example
 * ```typescript
 * createUtilityPattern('p', ['t', 'r', 'b', 'l', 'x', 'y'], '\\d+')
 * // Matches: p-4, pt-4, pr-4, pb-4, pl-4, px-4, py-4
 * ```
 */
export function createUtilityPattern(
  prefix: string,
  sides: string[] | null,
  valuePattern: string
): RegExp {
  const escapedPrefix = escapeRegex(prefix)

  if (sides && sides.length > 0) {
    const sidesPattern = sides.map(escapeRegex).join('|')
    return new RegExp(`^${escapedPrefix}(${sidesPattern})?-(${valuePattern})$`)
  }

  return new RegExp(`^${escapedPrefix}-(${valuePattern})$`)
}

/**
 * Create pattern for color utilities
 *
 * @example
 * ```typescript
 * createColorPattern('bg')
 * // Matches: bg-red-500, bg-[#ff0000], bg-transparent
 * ```
 */
export function createColorPattern(prefix: string): RegExp {
  const escapedPrefix = escapeRegex(prefix)
  // Match: prefix-color-shade OR prefix-[arbitrary] OR prefix-special
  return new RegExp(
    `^${escapedPrefix}-(?:` +
      `([a-z]+)-([0-9]+)|` + // color-shade (e.g., red-500)
      `\\[([^\\]]+)\\]|` + // arbitrary value
      `(inherit|current|transparent|black|white)` + // special values
      `)$`
  )
}

/**
 * Create pattern for spacing utilities
 *
 * @example
 * ```typescript
 * createSpacingPattern('p', ['t', 'r', 'b', 'l', 'x', 'y', 's', 'e'])
 * // Matches: p-4, pt-4, px-auto, p-[20px]
 * ```
 */
export function createSpacingPattern(prefix: string, sides: string[]): RegExp {
  const escapedPrefix = escapeRegex(prefix)
  const sidesPattern = sides.map(escapeRegex).join('|')

  return new RegExp(
    `^${escapedPrefix}(?:(${sidesPattern}))?-(?:` +
      `([0-9.]+)|` + // numeric value
      `(px|auto|full)|` + // special values
      `\\[([^\\]]+)\\]` + // arbitrary value
      `)$`
  )
}

/**
 * Create pattern for arbitrary value extraction
 *
 * @example
 * ```typescript
 * createArbitraryPattern('bg')
 * // Matches: bg-[#ff0000], bg-[rgb(255,0,0)]
 * ```
 */
export function createArbitraryPattern(prefix: string): RegExp {
  const escapedPrefix = escapeRegex(prefix)
  return new RegExp(`^${escapedPrefix}-\\[([^\\]]+)\\]$`)
}

/**
 * Extract arbitrary value from class name
 *
 * @example
 * ```typescript
 * extractArbitraryValue('bg-[#ff0000]') // '#ff0000'
 * extractArbitraryValue('w-[calc(100%-20px)]') // 'calc(100%-20px)'
 * ```
 */
export function extractArbitraryValue(className: string): string | null {
  const match = className.match(/\[([^\]]+)\]/)
  return match ? match[1]! : null
}

/**
 * Check if class has arbitrary value
 *
 * @example
 * ```typescript
 * hasArbitraryValue('bg-[#ff0000]') // true
 * hasArbitraryValue('bg-red-500') // false
 * ```
 */
export function hasArbitraryValue(className: string): boolean {
  return /\[[^\]]+\]/.test(className)
}

/**
 * Pattern for matching variant prefixes
 */
export const VARIANT_PREFIX_PATTERN = /^([a-z-]+):/

/**
 * Pattern for matching variant groups
 */
export const VARIANT_GROUP_PATTERN = /([a-z-]+(?::[a-z-]+)*):\(([^)]+)\)/g

/**
 * Pattern for matching negative utilities
 */
export const NEGATIVE_PATTERN = /^-(.+)$/

/**
 * Pattern for matching class attribute in HTML
 */
export const CLASS_ATTR_PATTERN = /class(?:Name)?=["']([^"']+)["']/g

/**
 * Pattern for matching class in template literals
 */
export const TEMPLATE_CLASS_PATTERN = /class(?:Name)?=\{[`'"]([^`'"]+)[`'"]\}/g

/**
 * Pattern for matching data attributes
 */
export const DATA_ATTR_PATTERN = /data-\[([^\]]+)\]/

/**
 * Pattern for matching aria attributes
 */
export const ARIA_PATTERN = /aria-([a-z]+)/

/**
 * Pattern for matching responsive variants
 */
export const RESPONSIVE_PATTERN = /^(sm|md|lg|xl|2xl|max-sm|max-md|max-lg|max-xl|max-2xl)$/

/**
 * Pattern for matching container query variants
 */
export const CONTAINER_QUERY_PATTERN = /^@(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/
