/**
 * Class Mapper
 *
 * Maps Tailwind CSS classes to CoralCSS equivalents.
 * @module migration/class-mapper
 */

import type { ClassMapping } from './types'

/**
 * Class mapping rules
 */
export interface ClassMappingRule {
  /** Pattern to match (regex or string) */
  pattern: RegExp | string
  /** Replacement function or string */
  replacement: string | ((match: string, ...groups: string[]) => string)
  /** Whether the class is deprecated */
  deprecated?: boolean
  /** Warning message */
  warning?: string
  /** Whether this is fully compatible */
  compatible: boolean
}

/**
 * Tailwind to CoralCSS class mapping rules
 */
export const tailwindMappingRules: ClassMappingRule[] = [
  // ===== FULLY COMPATIBLE (No changes needed) =====

  // Spacing - 100% compatible
  { pattern: /^(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(gap|gap-x|gap-y)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(space-x|space-y)-(.+)$/, replacement: '$&', compatible: true },

  // Layout - 100% compatible
  { pattern: /^(flex|grid|block|inline|inline-block|inline-flex|hidden)$/, replacement: '$&', compatible: true },
  { pattern: /^(items|justify|content|place)-(start|end|center|between|around|evenly|stretch)$/, replacement: '$&', compatible: true },
  { pattern: /^(flex-row|flex-col|flex-wrap|flex-nowrap)$/, replacement: '$&', compatible: true },
  { pattern: /^(grid-cols|grid-rows)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(col|row)-(span|start|end)-(.+)$/, replacement: '$&', compatible: true },

  // Sizing - 100% compatible
  { pattern: /^(w|h|min-w|max-w|min-h|max-h)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(size)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^aspect-(.+)$/, replacement: '$&', compatible: true },

  // Typography - 100% compatible
  { pattern: /^(text|font)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(leading|tracking|line-clamp)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(uppercase|lowercase|capitalize|normal-case)$/, replacement: '$&', compatible: true },
  { pattern: /^(truncate|whitespace|break|hyphens)-?(.*)$/, replacement: '$&', compatible: true },

  // Colors - 100% compatible
  { pattern: /^(bg|text|border|ring|outline|shadow|accent|caret|fill|stroke)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(from|via|to)-(.+)$/, replacement: '$&', compatible: true },

  // Borders - 100% compatible
  { pattern: /^(border|rounded|ring|outline)-?(.*)$/, replacement: '$&', compatible: true },

  // Effects - 100% compatible
  { pattern: /^(shadow|opacity|blur|brightness|contrast|grayscale|invert|saturate|sepia)-?(.*)$/, replacement: '$&', compatible: true },
  { pattern: /^(backdrop|filter|drop-shadow)-(.+)$/, replacement: '$&', compatible: true },

  // Transforms - 100% compatible
  { pattern: /^(translate|rotate|scale|skew|origin)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(-?)(translate|rotate|scale|skew)-(.+)$/, replacement: '$&', compatible: true },

  // Transitions - 100% compatible
  { pattern: /^(transition|duration|ease|delay)-?(.*)$/, replacement: '$&', compatible: true },

  // Animations - 100% compatible (CoralCSS has more)
  { pattern: /^animate-(.+)$/, replacement: '$&', compatible: true },

  // Interactivity - 100% compatible
  { pattern: /^(cursor|pointer-events|resize|select|touch|scroll)-(.+)$/, replacement: '$&', compatible: true },

  // Positioning - 100% compatible
  { pattern: /^(relative|absolute|fixed|sticky|static)$/, replacement: '$&', compatible: true },
  { pattern: /^(top|right|bottom|left|inset|z)-(.+)$/, replacement: '$&', compatible: true },

  // Display/Visibility - 100% compatible
  { pattern: /^(visible|invisible|collapse)$/, replacement: '$&', compatible: true },
  { pattern: /^(overflow|overscroll)-(.+)$/, replacement: '$&', compatible: true },

  // Flexbox/Grid - 100% compatible
  { pattern: /^(flex|grow|shrink|basis|order|grid-flow)-(.+)$/, replacement: '$&', compatible: true },
  { pattern: /^(auto-cols|auto-rows)-(.+)$/, replacement: '$&', compatible: true },

  // Container - 100% compatible
  { pattern: /^container$/, replacement: '$&', compatible: true },
  { pattern: /^(mx-auto)$/, replacement: '$&', compatible: true },

  // Accessibility - 100% compatible
  { pattern: /^sr-only$/, replacement: '$&', compatible: true },
  { pattern: /^not-sr-only$/, replacement: '$&', compatible: true },

  // ===== DEPRECATED / CHANGED CLASSES =====

  // divide-* -> Use border utilities
  {
    pattern: /^divide-(x|y)-(.+)$/,
    replacement: 'border-$1-$2',
    deprecated: true,
    warning: 'divide-* utilities should use border utilities with appropriate child selectors',
    compatible: false,
  },
  {
    pattern: /^divide-(solid|dashed|dotted|double|none)$/,
    replacement: 'border-$1',
    deprecated: true,
    warning: 'divide-* utilities should use border utilities',
    compatible: false,
  },

  // ring-offset-* -> Use outline or shadow
  {
    pattern: /^ring-offset-(.+)$/,
    replacement: 'ring-offset-$1',
    deprecated: false,
    warning: 'Consider using outline utilities for better accessibility',
    compatible: true,
  },

  // ===== TAILWIND 4.x SPECIFIC =====

  // @tailwind directives -> @coral
  {
    pattern: /@tailwind\s+(base|components|utilities)/,
    replacement: '@coral $1',
    compatible: false,
    warning: 'Replace @tailwind directive with @coral',
  },

  // ===== ENHANCEMENTS (CoralCSS specific) =====
  // These suggest CoralCSS enhanced alternatives

  // Hover groups - suggest variant syntax
  {
    pattern: /^hover:(bg-[^\s]+)\s+hover:(text-[^\s]+)$/,
    replacement: 'hover:($1 $2)',
    warning: 'CoralCSS supports variant groups for cleaner syntax',
    compatible: true,
  },
]

/**
 * Class categories for reporting
 */
export const classCategories = {
  spacing: /^(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space)-/,
  layout: /^(flex|grid|block|inline|hidden|items|justify|content|place)-/,
  sizing: /^(w|h|min-w|max-w|min-h|max-h|size|aspect)-/,
  typography: /^(text|font|leading|tracking|line-clamp|truncate|whitespace)/,
  colors: /^(bg|text|border|ring|outline|shadow|accent|caret|fill|stroke|from|via|to)-/,
  borders: /^(border|rounded|ring|outline)-/,
  effects: /^(shadow|opacity|blur|brightness|contrast|grayscale|backdrop|filter)/,
  transforms: /^(-?)(translate|rotate|scale|skew|origin)-/,
  transitions: /^(transition|duration|ease|delay|animate)-/,
  interactivity: /^(cursor|pointer-events|resize|select|touch|scroll)-/,
  positioning: /^(relative|absolute|fixed|sticky|static|top|right|bottom|left|inset|z)-/,
} as const

/**
 * Map a single class name
 */
export function mapClass(className: string, customMappings?: Record<string, string>): ClassMapping {
  // Check custom mappings first
  if (customMappings && customMappings[className]) {
    return {
      original: className,
      mapped: customMappings[className],
      compatible: true,
    }
  }

  // Check against rules
  for (const rule of tailwindMappingRules) {
    const pattern = typeof rule.pattern === 'string'
      ? new RegExp(`^${rule.pattern}$`)
      : rule.pattern

    if (pattern.test(className)) {
      let mapped: string | null = null

      if (typeof rule.replacement === 'function') {
        const match = className.match(pattern)
        if (match) {
          mapped = rule.replacement(match[0], ...match.slice(1))
        }
      } else if (rule.replacement !== '$&') {
        mapped = className.replace(pattern, rule.replacement)
      }

      return {
        original: className,
        mapped: mapped !== className ? mapped : null,
        deprecated: rule.deprecated,
        warning: rule.warning,
        compatible: rule.compatible,
        replacement: rule.deprecated && mapped ? mapped : undefined,
      }
    }
  }

  // Unknown class - check if it looks like a utility
  if (/^[a-z][a-z0-9-]*(-[a-z0-9]+)*$/.test(className)) {
    return {
      original: className,
      mapped: null,
      compatible: true, // Assume custom utilities are compatible
      warning: 'Unknown utility class - verify it exists in CoralCSS',
    }
  }

  // Arbitrary value
  if (/^\[.+\]$/.test(className) || /^[a-z]+-\[.+\]$/.test(className)) {
    return {
      original: className,
      mapped: null,
      compatible: true, // Arbitrary values work the same
    }
  }

  return {
    original: className,
    mapped: null,
    compatible: true,
  }
}

/**
 * Map multiple classes
 */
export function mapClasses(
  classes: string[],
  customMappings?: Record<string, string>
): ClassMapping[] {
  return classes.map(cls => mapClass(cls, customMappings))
}

/**
 * Extract classes from a class attribute string
 */
export function extractClasses(classString: string): string[] {
  return classString
    .split(/\s+/)
    .filter(c => c.length > 0)
    .map(c => c.trim())
}

/**
 * Analyze class compatibility
 */
export function analyzeClassCompatibility(classes: string[]): {
  total: number
  compatible: number
  incompatible: ClassMapping[]
  deprecated: ClassMapping[]
  warnings: ClassMapping[]
  compatibilityRate: number
} {
  const mappings = mapClasses(classes)

  const compatible = mappings.filter(m => m.compatible && !m.deprecated && !m.warning)
  const incompatible = mappings.filter(m => !m.compatible)
  const deprecated = mappings.filter(m => m.deprecated)
  const warnings = mappings.filter(m => m.warning && m.compatible && !m.deprecated)

  return {
    total: classes.length,
    compatible: compatible.length,
    incompatible,
    deprecated,
    warnings,
    compatibilityRate: classes.length > 0
      ? Math.round((compatible.length / classes.length) * 100)
      : 100,
  }
}

/**
 * Get category for a class
 */
export function getClassCategory(className: string): string {
  for (const [category, pattern] of Object.entries(classCategories)) {
    if (pattern.test(className)) {
      return category
    }
  }
  return 'other'
}

/**
 * Group classes by category
 */
export function groupClassesByCategory(classes: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {}

  for (const cls of classes) {
    const category = getClassCategory(cls)
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(cls)
  }

  return grouped
}

/**
 * Generate migration suggestions
 */
export function generateMigrationSuggestions(mappings: ClassMapping[]): string[] {
  const suggestions: string[] = []

  const deprecated = mappings.filter(m => m.deprecated)
  const warnings = mappings.filter(m => m.warning)

  if (deprecated.length > 0) {
    suggestions.push(
      `Found ${deprecated.length} deprecated classes that should be updated:`
    )
    for (const d of deprecated.slice(0, 5)) {
      suggestions.push(`  - ${d.original} → ${d.replacement || 'see warning'}`)
    }
    if (deprecated.length > 5) {
      suggestions.push(`  ... and ${deprecated.length - 5} more`)
    }
  }

  if (warnings.length > 0) {
    suggestions.push(`\nFound ${warnings.length} classes with suggestions:`)
    const uniqueWarnings = Array.from(new Set(warnings.map(w => w.warning)))
    for (const warning of uniqueWarnings.slice(0, 3)) {
      suggestions.push(`  - ${warning}`)
    }
  }

  // CoralCSS-specific suggestions
  const hasMultipleHoverStates = mappings.filter(m =>
    m.original.startsWith('hover:')
  ).length > 2

  if (hasMultipleHoverStates) {
    suggestions.push(
      '\nTip: Use CoralCSS variant groups for cleaner hover states:'
    )
    suggestions.push('  hover:(bg-blue-500 text-white scale-105)')
  }

  return suggestions
}
