/**
 * CoralCSS Prettier Plugin
 *
 * Sorts utility classes in a consistent order.
 * @module prettier
 */

import type { Plugin, Parser, Printer } from 'prettier'

/**
 * Sort order categories (lower = earlier)
 */
const SORT_ORDER: Record<string, number> = {
  // Layout
  'container': 1,
  'block': 2,
  'inline-block': 3,
  'inline': 4,
  'flex': 5,
  'inline-flex': 6,
  'grid': 7,
  'inline-grid': 8,
  'contents': 9,
  'flow-root': 10,
  'hidden': 11,
  'table': 12,

  // Position
  'static': 20,
  'fixed': 21,
  'absolute': 22,
  'relative': 23,
  'sticky': 24,

  // Visibility
  'visible': 30,
  'invisible': 31,
  'collapse': 32,

  // Isolation
  'isolate': 35,
  'isolation-auto': 36,

  // Z-index prefix
  'z-': 40,

  // Box sizing
  'box-border': 45,
  'box-content': 46,

  // Float
  'float-': 50,
  'clear-': 51,

  // Object fit/position
  'object-': 55,

  // Overflow
  'overflow-': 60,
  'overscroll-': 61,

  // Inset
  'inset-': 70,
  'top-': 71,
  'right-': 72,
  'bottom-': 73,
  'left-': 74,
  'start-': 75,
  'end-': 76,

  // Flexbox
  'flex-row': 80,
  'flex-row-reverse': 81,
  'flex-col': 82,
  'flex-col-reverse': 83,
  'flex-wrap': 84,
  'flex-wrap-reverse': 85,
  'flex-nowrap': 86,
  'flex-1': 87,
  'flex-auto': 88,
  'flex-initial': 89,
  'flex-none': 90,
  'grow': 91,
  'grow-': 92,
  'shrink': 93,
  'shrink-': 94,
  'basis-': 95,

  // Grid
  'grid-cols-': 100,
  'grid-rows-': 101,
  'col-': 102,
  'row-': 103,
  'grid-flow-': 104,
  'auto-cols-': 105,
  'auto-rows-': 106,

  // Justify
  'justify-': 110,
  'justify-items-': 111,
  'justify-self-': 112,

  // Align
  'content-': 115,
  'items-': 116,
  'self-': 117,

  // Place
  'place-content-': 120,
  'place-items-': 121,
  'place-self-': 122,

  // Order
  'order-': 125,

  // Gap
  'gap-': 130,
  'gap-x-': 131,
  'gap-y-': 132,

  // Space between
  'space-x-': 135,
  'space-y-': 136,
  'space-x-reverse': 137,
  'space-y-reverse': 138,

  // Divide
  'divide-': 140,

  // Size
  'size-': 150,
  'w-': 151,
  'min-w-': 152,
  'max-w-': 153,
  'h-': 154,
  'min-h-': 155,
  'max-h-': 156,

  // Padding
  'p-': 160,
  'px-': 161,
  'py-': 162,
  'pt-': 163,
  'pr-': 164,
  'pb-': 165,
  'pl-': 166,
  'ps-': 167,
  'pe-': 168,

  // Margin
  'm-': 170,
  'mx-': 171,
  'my-': 172,
  'mt-': 173,
  'mr-': 174,
  'mb-': 175,
  'ml-': 176,
  'ms-': 177,
  'me-': 178,

  // Typography
  'font-': 200,
  'text-': 210,
  'antialiased': 215,
  'subpixel-antialiased': 216,
  'italic': 217,
  'not-italic': 218,
  'tracking-': 220,
  'leading-': 225,
  'list-': 230,
  'placeholder-': 235,
  'underline': 240,
  'overline': 241,
  'line-through': 242,
  'no-underline': 243,
  'decoration-': 244,
  'uppercase': 250,
  'lowercase': 251,
  'capitalize': 252,
  'normal-case': 253,
  'truncate': 260,
  'text-ellipsis': 261,
  'text-clip': 262,
  'whitespace-': 265,
  'break-': 270,
  'hyphens-': 275,

  // Background
  'bg-': 300,
  'from-': 301,
  'via-': 302,
  'to-': 303,
  'gradient-': 304,

  // Border
  'rounded': 310,
  'rounded-': 311,
  'border': 320,
  'border-': 321,

  // Ring
  'ring': 330,
  'ring-': 331,
  'ring-offset-': 332,

  // Outline
  'outline': 340,
  'outline-': 341,

  // Shadow
  'shadow': 350,
  'shadow-': 351,

  // Opacity
  'opacity-': 360,

  // Blend mode
  'mix-blend-': 365,
  'bg-blend-': 366,

  // Filter
  'filter': 370,
  'blur': 371,
  'blur-': 372,
  'brightness-': 373,
  'contrast-': 374,
  'grayscale': 375,
  'hue-rotate-': 376,
  'invert': 377,
  'saturate-': 378,
  'sepia': 379,
  'drop-shadow': 380,
  'drop-shadow-': 381,

  // Backdrop filter
  'backdrop-': 390,

  // Transform
  'transform': 400,
  'transform-': 401,
  'origin-': 402,
  'scale-': 403,
  'rotate-': 404,
  'translate-': 405,
  'skew-': 406,

  // Transition
  'transition': 420,
  'transition-': 421,
  'duration-': 422,
  'ease-': 423,
  'delay-': 424,

  // Animation
  'animate-': 430,

  // Cursor
  'cursor-': 450,

  // Touch
  'touch-': 455,

  // User select
  'select-': 460,

  // Resize
  'resize': 465,
  'resize-': 466,

  // Scroll
  'scroll-': 470,
  'snap-': 475,

  // Pointer events
  'pointer-events-': 480,

  // Will change
  'will-change-': 485,

  // Appearance
  'appearance-': 490,

  // Accessibility
  'sr-only': 500,
  'not-sr-only': 501,
}

/**
 * Variant order (lower = earlier)
 */
const VARIANT_ORDER: Record<string, number> = {
  // Responsive (smallest first)
  'sm': 1,
  'md': 2,
  'lg': 3,
  'xl': 4,
  '2xl': 5,

  // Max responsive
  'max-sm': 10,
  'max-md': 11,
  'max-lg': 12,
  'max-xl': 13,
  'max-2xl': 14,

  // State
  'dark': 20,
  'light': 21,

  // Motion
  'motion-safe': 25,
  'motion-reduce': 26,

  // Contrast
  'contrast-more': 28,
  'contrast-less': 29,

  // Orientation
  'portrait': 30,
  'landscape': 31,

  // Print
  'print': 35,

  // Direction
  'rtl': 40,
  'ltr': 41,

  // Pseudo-elements
  'before': 50,
  'after': 51,
  'first-letter': 52,
  'first-line': 53,
  'marker': 54,
  'selection': 55,
  'file': 56,
  'placeholder': 57,
  'backdrop': 58,

  // Group/Peer
  'group-hover': 60,
  'group-focus': 61,
  'group-focus-within': 62,
  'group-focus-visible': 63,
  'group-active': 64,
  'group-disabled': 65,
  'peer-hover': 66,
  'peer-focus': 67,
  'peer-focus-within': 68,
  'peer-checked': 69,
  'peer-invalid': 70,
  'peer-disabled': 71,

  // State pseudo-classes
  'hover': 80,
  'focus': 81,
  'focus-within': 82,
  'focus-visible': 83,
  'active': 84,
  'visited': 85,
  'target': 86,

  // Form state
  'disabled': 90,
  'enabled': 91,
  'checked': 92,
  'indeterminate': 93,
  'default': 94,
  'required': 95,
  'valid': 96,
  'invalid': 97,
  'in-range': 98,
  'out-of-range': 99,
  'placeholder-shown': 100,
  'autofill': 101,
  'read-only': 102,

  // Structural
  'first': 110,
  'last': 111,
  'only': 112,
  'odd': 113,
  'even': 114,
  'first-of-type': 115,
  'last-of-type': 116,
  'only-of-type': 117,
  'empty': 118,

  // Open
  'open': 120,
}

/**
 * Class info for sorting
 */
interface ClassInfo {
  original: string
  variants: string[]
  base: string
  important: boolean
  negative: boolean
  sortKey: number
  variantKey: number
}

/**
 * Parse a class name into its components
 */
function parseClassName(className: string): ClassInfo {
  let remaining = className
  const variants: string[] = []
  let important = false
  let negative = false

  // Check for important modifier at the end
  if (remaining.endsWith('!')) {
    important = true
    remaining = remaining.slice(0, -1)
  }

  // Check for important modifier at the start
  if (remaining.startsWith('!')) {
    important = true
    remaining = remaining.slice(1)
  }

  // Parse variants (before the base class)
  const parts = remaining.split(':')
  const base = parts.pop() || ''

  for (const part of parts) {
    variants.push(part)
  }

  // Check for negative prefix
  let baseClass = base
  if (baseClass.startsWith('-')) {
    negative = true
    baseClass = baseClass.slice(1)
  }

  // Calculate sort keys
  const sortKey = getClassSortKey(baseClass)
  const variantKey = getVariantSortKey(variants)

  return {
    original: className,
    variants,
    base: baseClass,
    important,
    negative,
    sortKey,
    variantKey,
  }
}

/**
 * Get sort key for a base class
 */
function getClassSortKey(className: string): number {
  // Exact match first
  if (SORT_ORDER[className] !== undefined) {
    return SORT_ORDER[className]
  }

  // Prefix match
  for (const [prefix, order] of Object.entries(SORT_ORDER)) {
    if (prefix.endsWith('-') && className.startsWith(prefix)) {
      return order
    }
  }

  // Arbitrary values and unknown classes go last
  if (className.includes('[')) {
    return 9000
  }

  return 9999
}

/**
 * Get sort key for variants
 */
function getVariantSortKey(variants: string[]): number {
  if (variants.length === 0) {
    return 0
  }

  // Calculate combined variant key
  let key = 0
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]
    if (!variant) { continue }
    const order = VARIANT_ORDER[variant] ?? 999
    // Weight earlier variants more heavily
    key += order * Math.pow(1000, variants.length - i - 1)
  }

  return key
}

/**
 * Compare two classes for sorting
 */
function compareClasses(a: ClassInfo, b: ClassInfo): number {
  // First, sort by variants
  if (a.variantKey !== b.variantKey) {
    return a.variantKey - b.variantKey
  }

  // Then by base class sort order
  if (a.sortKey !== b.sortKey) {
    return a.sortKey - b.sortKey
  }

  // Then by negative (non-negative first)
  if (a.negative !== b.negative) {
    return a.negative ? 1 : -1
  }

  // Then by important (non-important first)
  if (a.important !== b.important) {
    return a.important ? 1 : -1
  }

  // Finally, alphabetically
  return a.original.localeCompare(b.original)
}

/**
 * Sort class names
 */
export function sortClassNames(classNames: string): string {
  if (!classNames || classNames.trim().length === 0) {
    return classNames
  }

  // Split into individual classes
  const classes = classNames.trim().split(/\s+/).filter(Boolean)

  if (classes.length <= 1) {
    return classNames
  }

  // Parse each class
  const parsed = classes.map(parseClassName)

  // Sort
  parsed.sort(compareClasses)

  // Reconstruct
  return parsed.map(c => c.original).join(' ')
}

/**
 * Sort classes in an HTML/JSX string
 */
export function sortClassesInContent(content: string): string {
  // Match class/className attributes
  const classRegex = /(class|className)=["']([^"']+)["']/g

  return content.replace(classRegex, (match, attr, classes) => {
    const sorted = sortClassNames(classes)
    return `${attr}="${sorted}"`
  })
}

/**
 * Sort classes in template literal (cn, clsx, etc.)
 */
export function sortClassesInTemplateLiteral(content: string): string {
  // Match function calls like cn('...'), clsx('...'), etc.
  const fnRegex = /\b(cn|cx|clsx|classnames|cva)\s*\(\s*(['"`])([^'"`]+)\2/g

  return content.replace(fnRegex, (match, fn, quote, classes) => {
    const sorted = sortClassNames(classes)
    return `${fn}(${quote}${sorted}${quote}`
  })
}

/**
 * Prettier plugin for CoralCSS
 */
export const prettierPlugin: Plugin = {
  languages: [
    {
      name: 'html',
      extensions: ['.html', '.htm'],
      parsers: ['html'],
    },
    {
      name: 'vue',
      extensions: ['.vue'],
      parsers: ['vue'],
    },
    {
      name: 'svelte',
      extensions: ['.svelte'],
      parsers: ['svelte'],
    },
  ],

  parsers: {
    'coral-html': {
      parse: (text: string) => ({ type: 'coral-html', body: text }),
      astFormat: 'coral-ast',
      locStart: () => 0,
      locEnd: (node: { body: string }) => node.body.length,
    } as Parser,
  },

  printers: {
    'coral-ast': {
      print: (path: { getValue: () => { body: string } }) => {
        const node = path.getValue()
        return sortClassesInContent(node.body)
      },
    } as Printer,
  },
}

/**
 * Default export for Prettier
 */
export default prettierPlugin

/**
 * Options for sorting
 */
export interface SortOptions {
  /** Enable variant grouping */
  groupByVariant?: boolean
  /** Enable category grouping */
  groupByCategory?: boolean
  /** Custom sort order */
  customOrder?: Record<string, number>
}

/**
 * Create a custom class sorter with options
 */
export function createClassSorter(options: SortOptions = {}) {
  const customOrder = options.customOrder || {}

  return (classNames: string): string => {
    if (!classNames || classNames.trim().length === 0) {
      return classNames
    }

    const classes = classNames.trim().split(/\s+/).filter(Boolean)

    if (classes.length <= 1) {
      return classNames
    }

    // Parse each class
    const parsed = classes.map(className => {
      const info = parseClassName(className)

      // Apply custom order if available
      const customSortKey = customOrder[info.base]
      if (customSortKey !== undefined) {
        info.sortKey = customSortKey
      }

      return info
    })

    // Sort
    parsed.sort(compareClasses)

    // Group if needed
    if (options.groupByVariant) {
      // Group by variant combination
      const groups = new Map<string, ClassInfo[]>()
      for (const cls of parsed) {
        const key = cls.variants.join(':')
        if (!groups.has(key)) {
          groups.set(key, [])
        }
        groups.get(key)!.push(cls)
      }

      // Flatten groups
      const result: string[] = []
      for (const [, group] of groups) {
        for (const cls of group) {
          result.push(cls.original)
        }
      }
      return result.join(' ')
    }

    return parsed.map(c => c.original).join(' ')
  }
}

/**
 * Get category for a class name
 */
export function getClassCategory(className: string): string {
  const info = parseClassName(className)
  const sortKey = info.sortKey

  if (sortKey < 20) { return 'layout' }
  if (sortKey < 40) { return 'position' }
  if (sortKey < 100) { return 'flexbox-grid' }
  if (sortKey < 160) { return 'sizing' }
  if (sortKey < 200) { return 'spacing' }
  if (sortKey < 300) { return 'typography' }
  if (sortKey < 320) { return 'backgrounds' }
  if (sortKey < 360) { return 'borders' }
  if (sortKey < 400) { return 'effects' }
  if (sortKey < 430) { return 'transforms' }
  if (sortKey < 450) { return 'transitions' }

  return 'interactivity'
}
