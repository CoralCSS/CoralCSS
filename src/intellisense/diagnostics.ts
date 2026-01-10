/**
 * CoralCSS IntelliSense Diagnostics
 *
 * Validates utility classes and reports issues.
 * @module intellisense/diagnostics
 */

import { createCoral } from '../index'
import type { Theme } from '../types'
import { defaultTheme } from '../theme/default'

/**
 * Diagnostic severity levels
 */
export enum DiagnosticSeverity {
  Error = 1,
  Warning = 2,
  Information = 3,
  Hint = 4,
}

/**
 * Diagnostic structure
 */
export interface Diagnostic {
  /** Class name that has the issue */
  className: string
  /** Start position in source */
  start: number
  /** End position in source */
  end: number
  /** Diagnostic message */
  message: string
  /** Severity level */
  severity: DiagnosticSeverity
  /** Error code */
  code?: string
  /** Suggested fixes */
  suggestions?: string[]
}

/**
 * Class location in source
 */
export interface ClassLocation {
  className: string
  start: number
  end: number
}

/**
 * Create a diagnostics provider
 */
export function createDiagnosticsProvider(theme: Theme = defaultTheme) {
  const coral = createCoral({ theme })

  // Known utility patterns for validation
  const knownPatterns = buildKnownPatterns(theme)

  /**
   * Validate a single class name
   */
  function validateClass(className: string): Diagnostic | null {
    if (!className || className.trim().length === 0) {
      return null
    }

    className = className.trim()

    // Skip arbitrary values - they're always valid syntax-wise
    if (className.includes('[') && className.includes(']')) {
      return validateArbitraryValue(className)
    }

    // Parse variants
    const parts = className.split(':')
    const baseClass = parts.pop() || ''
    const variants = parts

    // Validate variants
    for (const variant of variants) {
      const variantDiag = validateVariant(variant)
      if (variantDiag && variantDiag.message) {
        return {
          className,
          start: 0,
          end: className.length,
          message: variantDiag.message,
          severity: variantDiag.severity || DiagnosticSeverity.Error,
          code: variantDiag.code,
          suggestions: variantDiag.suggestions,
        }
      }
    }

    // Try to generate CSS
    const css = coral.generate([className])

    // If CSS is generated, class is valid
    if (css && css.trim().length > 0) {
      return null
    }

    // Check for common typos and suggest fixes
    const suggestions = findSimilarClasses(baseClass, knownPatterns)

    // Check for specific issues
    const issue = detectSpecificIssue(baseClass, variants)

    return {
      className,
      start: 0,
      end: className.length,
      message: issue || `Unknown utility class: "${className}"`,
      severity: DiagnosticSeverity.Error,
      code: 'unknown-class',
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    }
  }

  /**
   * Validate an arbitrary value class
   */
  function validateArbitraryValue(className: string): Diagnostic | null {
    // Check for balanced brackets
    const openBrackets = (className.match(/\[/g) || []).length
    const closeBrackets = (className.match(/\]/g) || []).length

    if (openBrackets !== closeBrackets) {
      return {
        className,
        start: 0,
        end: className.length,
        message: 'Unbalanced brackets in arbitrary value',
        severity: DiagnosticSeverity.Error,
        code: 'unbalanced-brackets',
      }
    }

    // Check for empty arbitrary value
    if (className.includes('[]')) {
      return {
        className,
        start: 0,
        end: className.length,
        message: 'Empty arbitrary value',
        severity: DiagnosticSeverity.Error,
        code: 'empty-arbitrary',
      }
    }

    return null
  }

  /**
   * Validate a variant
   */
  function validateVariant(variant: string): Partial<Diagnostic> | null {
    const knownVariants = [
      // Pseudo-classes
      'hover', 'focus', 'focus-within', 'focus-visible', 'active', 'visited',
      'target', 'first', 'last', 'only', 'odd', 'even', 'first-of-type',
      'last-of-type', 'only-of-type', 'empty', 'disabled', 'enabled', 'checked',
      'indeterminate', 'default', 'required', 'valid', 'invalid', 'in-range',
      'out-of-range', 'placeholder-shown', 'autofill', 'read-only',
      // Pseudo-elements
      'before', 'after', 'first-letter', 'first-line', 'marker', 'selection',
      'file', 'placeholder', 'backdrop',
      // Responsive
      'sm', 'md', 'lg', 'xl', '2xl',
      // Dark mode
      'dark',
      // Group/peer
      'group-hover', 'group-focus', 'group-active', 'group-focus-within',
      'peer-hover', 'peer-focus', 'peer-checked', 'peer-invalid', 'peer-disabled',
      // Motion
      'motion-safe', 'motion-reduce',
      // Contrast
      'contrast-more', 'contrast-less',
      // Orientation
      'portrait', 'landscape',
      // Print
      'print',
      // Direction
      'rtl', 'ltr',
      // State
      'open',
      // Has
      'has',
    ]

    // Check for arbitrary variant
    if (variant.startsWith('[') && variant.endsWith(']')) {
      return null // Arbitrary variants are valid
    }

    // Check for arbitrary data/aria/supports
    if (variant.startsWith('data-[') || variant.startsWith('aria-[') || variant.startsWith('supports-[')) {
      return null
    }

    // Check for group/peer with arbitrary
    if ((variant.startsWith('group-') || variant.startsWith('peer-')) && variant.includes('[')) {
      return null
    }

    if (!knownVariants.includes(variant)) {
      // Check for responsive max variants (max-sm, max-md, etc.)
      if (variant.startsWith('max-') && knownVariants.includes(variant.slice(4))) {
        return null
      }

      // Check for min variants
      if (variant.startsWith('min-') && variant.includes('[')) {
        return null
      }

      const suggestions = findSimilarItems(variant, knownVariants)

      return {
        message: `Unknown variant: "${variant}"`,
        severity: DiagnosticSeverity.Error,
        code: 'unknown-variant',
        suggestions: suggestions.length > 0 ? suggestions.map(s => `${s}:`) : undefined,
      }
    }

    return null
  }

  /**
   * Validate multiple classes in content
   */
  function validateContent(content: string, classLocations: ClassLocation[]): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    for (const loc of classLocations) {
      const diag = validateClass(loc.className)
      if (diag) {
        diagnostics.push({
          ...diag,
          start: loc.start,
          end: loc.end,
        })
      }
    }

    // Check for conflicting classes
    const conflicts = findConflictingClasses(classLocations)
    diagnostics.push(...conflicts)

    return diagnostics
  }

  /**
   * Extract class locations from HTML/JSX
   */
  function extractClassLocations(content: string): ClassLocation[] {
    const locations: ClassLocation[] = []

    // Match class/className attributes
    const classRegex = /(?:class|className)=["'{]([^"'}]+)["'}]/g
    let match: RegExpExecArray | null

    while ((match = classRegex.exec(content)) !== null) {
      const classValue = match[1]
      if (!classValue) { continue }
      const attrStart = match.index + match[0].indexOf(classValue)

      // Split into individual classes
      const classes = classValue.split(/\s+/).filter(Boolean)
      let offset = 0

      for (const cls of classes) {
        const clsIndex = classValue.indexOf(cls, offset)
        locations.push({
          className: cls,
          start: attrStart + clsIndex,
          end: attrStart + clsIndex + cls.length,
        })
        offset = clsIndex + cls.length
      }
    }

    return locations
  }

  /**
   * Find conflicting classes
   */
  function findConflictingClasses(classLocations: ClassLocation[]): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    // Group classes by property they affect
    const propertyGroups: Record<string, ClassLocation[]> = {}

    for (const loc of classLocations) {
      const property = getPropertyForClass(loc.className)
      if (property) {
        if (!propertyGroups[property]) {
          propertyGroups[property] = []
        }
        propertyGroups[property].push(loc)
      }
    }

    // Check for conflicts (multiple classes affecting same property)
    for (const [property, locs] of Object.entries(propertyGroups)) {
      if (locs.length > 1) {
        // Skip if they're the same class or have different variants
        const uniqueBase = new Set(locs.map(l => l.className.split(':').pop() || ''))
        if (uniqueBase.size > 1) {
          const lastLoc = locs[locs.length - 1]
          const lastClassName = lastLoc ? lastLoc.className : ''
          for (const loc of locs.slice(0, -1)) {
            diagnostics.push({
              className: loc.className,
              start: loc.start,
              end: loc.end,
              message: `Potentially conflicting classes for "${property}". "${lastClassName}" will take precedence.`,
              severity: DiagnosticSeverity.Warning,
              code: 'conflicting-classes',
            })
          }
        }
      }
    }

    return diagnostics
  }

  return {
    validateClass,
    validateContent,
    extractClassLocations,
    findConflictingClasses,
  }
}

/**
 * Build known patterns from theme
 */
function buildKnownPatterns(theme: Theme): Set<string> {
  const patterns = new Set<string>()

  // Add spacing-based utilities
  const spacing = theme.spacing || {}
  for (const key of Object.keys(spacing)) {
    patterns.add(`m-${key}`)
    patterns.add(`mx-${key}`)
    patterns.add(`my-${key}`)
    patterns.add(`mt-${key}`)
    patterns.add(`mr-${key}`)
    patterns.add(`mb-${key}`)
    patterns.add(`ml-${key}`)
    patterns.add(`p-${key}`)
    patterns.add(`px-${key}`)
    patterns.add(`py-${key}`)
    patterns.add(`pt-${key}`)
    patterns.add(`pr-${key}`)
    patterns.add(`pb-${key}`)
    patterns.add(`pl-${key}`)
    patterns.add(`gap-${key}`)
    patterns.add(`gap-x-${key}`)
    patterns.add(`gap-y-${key}`)
    patterns.add(`w-${key}`)
    patterns.add(`h-${key}`)
    patterns.add(`size-${key}`)
  }

  // Add color-based utilities
  const colors = theme.colors || {}
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      patterns.add(`text-${name}`)
      patterns.add(`bg-${name}`)
      patterns.add(`border-${name}`)
    } else if (typeof value === 'object' && value !== null) {
      const colorScale = value as unknown as { [key: string]: string }
      for (const shade of Object.keys(colorScale)) {
        const colorName = shade === 'DEFAULT' ? name : `${name}-${shade}`
        patterns.add(`text-${colorName}`)
        patterns.add(`bg-${colorName}`)
        patterns.add(`border-${colorName}`)
        patterns.add(`ring-${colorName}`)
      }
    }
  }

  // Add common static utilities
  const staticUtilities = [
    'flex', 'grid', 'block', 'inline-block', 'inline', 'hidden',
    'static', 'relative', 'absolute', 'fixed', 'sticky',
    'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap',
    'items-start', 'items-center', 'items-end', 'items-stretch',
    'justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around',
    'font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl',
    'text-left', 'text-center', 'text-right', 'text-justify',
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full',
    'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl',
    'transition', 'transition-all', 'transition-colors', 'transition-opacity',
    'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300',
    'cursor-pointer', 'cursor-default', 'cursor-not-allowed',
    'overflow-hidden', 'overflow-auto', 'overflow-scroll', 'overflow-visible',
    'truncate', 'underline', 'line-through', 'no-underline',
    'uppercase', 'lowercase', 'capitalize', 'normal-case',
    'visible', 'invisible', 'opacity-0', 'opacity-50', 'opacity-100',
  ]

  for (const util of staticUtilities) {
    patterns.add(util)
  }

  return patterns
}

/**
 * Find similar classes for suggestions
 */
function findSimilarClasses(className: string, knownPatterns: Set<string>): string[] {
  const suggestions: { pattern: string; distance: number }[] = []

  for (const pattern of knownPatterns) {
    const distance = levenshteinDistance(className, pattern)
    if (distance <= 3) { // Max 3 character difference
      suggestions.push({ pattern, distance })
    }
  }

  // Sort by distance and return top 5
  suggestions.sort((a, b) => a.distance - b.distance)
  return suggestions.slice(0, 5).map(s => s.pattern)
}

/**
 * Find similar items from a list
 */
function findSimilarItems(item: string, knownItems: string[]): string[] {
  const suggestions: { item: string; distance: number }[] = []

  for (const known of knownItems) {
    const distance = levenshteinDistance(item, known)
    if (distance <= 2) {
      suggestions.push({ item: known, distance })
    }
  }

  suggestions.sort((a, b) => a.distance - b.distance)
  return suggestions.slice(0, 3).map(s => s.item)
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  const firstRow = matrix[0]
  if (firstRow) {
    for (let j = 0; j <= a.length; j++) {
      firstRow[j] = j
    }
  }

  for (let i = 1; i <= b.length; i++) {
    const currentRow = matrix[i]
    const prevRow = matrix[i - 1]
    if (!currentRow || !prevRow) { continue }

    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        currentRow[j] = prevRow[j - 1] ?? 0
      } else {
        const substitution = prevRow[j - 1] ?? 0
        const insertion = currentRow[j - 1] ?? 0
        const deletion = prevRow[j] ?? 0
        currentRow[j] = Math.min(substitution, insertion, deletion) + 1
      }
    }
  }

  const lastRow = matrix[b.length]
  return lastRow ? (lastRow[a.length] ?? 0) : 0
}

/**
 * Detect specific issues with a class
 */
function detectSpecificIssue(baseClass: string, _variants: string[]): string | null {
  // Check for invalid color shades
  const colorMatch = baseClass.match(/^(text|bg|border|ring)-(\w+)-(\d+)$/)
  if (colorMatch && colorMatch[3]) {
    const shade = parseInt(colorMatch[3], 10)
    if (shade % 50 !== 0 || shade < 50 || shade > 950) {
      return `Invalid color shade "${shade}". Valid shades are: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`
    }
  }

  // Check for invalid spacing values
  const spacingMatch = baseClass.match(/^(m|p|gap|w|h|size)([xytbrl]?)-(.+)$/)
  if (spacingMatch && spacingMatch[3]) {
    const value = spacingMatch[3]
    const validSpacing = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto', 'full']
    if (!validSpacing.includes(value) && !value.includes('[') && !value.includes('/')) {
      return `Invalid spacing value "${value}". Use a theme value or arbitrary value like [24px]`
    }
  }

  // Check for invalid font sizes
  const fontSizeMatch = baseClass.match(/^text-(xs|sm|base|lg|xl|[\d]+xl)$/)
  if (baseClass.startsWith('text-') && !fontSizeMatch) {
    const sizeValue = baseClass.slice(5)
    if (/^\d+$/.test(sizeValue)) {
      return `Invalid font size "${sizeValue}". Use a named size (xs, sm, base, lg, xl, 2xl, etc.) or arbitrary value like [16px]`
    }
  }

  // Check for common typos
  const typos: Record<string, string> = {
    'colour': 'color',
    'centre': 'center',
    'grey': 'gray',
    'flexbox': 'flex',
    'margin': 'm-',
    'padding': 'p-',
    'backround': 'bg-',
    'trasition': 'transition',
    'tranform': 'transform',
  }

  for (const [typo, correction] of Object.entries(typos)) {
    if (baseClass.includes(typo)) {
      return `Possible typo: "${typo}" should be "${correction}"`
    }
  }

  return null
}

/**
 * Get the CSS property that a class affects
 */
function getPropertyForClass(className: string): string | null {
  const parts = className.split(':')
  const baseClass = parts.pop() || ''

  // Property detection patterns
  const propertyPatterns: Record<string, RegExp> = {
    'display': /^(flex|grid|block|inline|hidden|contents)/,
    'position': /^(static|relative|absolute|fixed|sticky)/,
    'margin': /^-?m[xytblrse]?-/,
    'padding': /^p[xytblrse]?-/,
    'width': /^(w-|min-w-|max-w-)/,
    'height': /^(h-|min-h-|max-h-)/,
    'font-size': /^text-(xs|sm|base|lg|xl|\d+xl)/,
    'font-weight': /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    'text-align': /^text-(left|center|right|justify)/,
    'color': /^text-((?!xs|sm|base|lg|xl|\d+xl|left|center|right|justify).+)/,
    'background-color': /^bg-/,
    'border-radius': /^rounded/,
    'border-width': /^border(-[xytblrse])?(-\d+)?$/,
    'border-color': /^border-((?!\d|solid|dashed|dotted).+)/,
    'flex-direction': /^flex-(row|col)/,
    'align-items': /^items-/,
    'justify-content': /^justify-/,
    'gap': /^gap-/,
    'opacity': /^opacity-/,
    'z-index': /^z-/,
    'overflow': /^overflow-/,
    'cursor': /^cursor-/,
    'transition': /^(transition|duration|ease|delay)-/,
    'transform': /^(scale|rotate|translate|skew|origin)-/,
    'box-shadow': /^shadow/,
  }

  for (const [property, pattern] of Object.entries(propertyPatterns)) {
    if (pattern.test(baseClass)) {
      // Include variants in property key for conflict detection
      const variantKey = parts.length > 0 ? `${parts.join(':')}:${property}` : property
      return variantKey
    }
  }

  return null
}

/**
 * Default diagnostics provider instance
 */
export const diagnosticsProvider = createDiagnosticsProvider()
