/**
 * CVA Utility Functions
 *
 * Helper utilities for class manipulation.
 *
 * @module cva/utils
 */

import type { ClassValue } from './cva'

/**
 * Merge class values into a single string
 * Handles strings, arrays, objects, and nested values
 *
 * @example
 * ```ts
 * cx('foo', 'bar') // 'foo bar'
 * cx('foo', null, 'bar') // 'foo bar'
 * cx(['foo', 'bar']) // 'foo bar'
 * cx({ foo: true, bar: false }) // 'foo'
 * cx('foo', ['bar', { baz: true }]) // 'foo bar baz'
 * ```
 */
export function cx(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) {
      continue
    }

    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const nested = cx(...input)
      if (nested) {
        classes.push(nested)
      }
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}

/**
 * Alias for cx - compatibility with clsx library
 */
export const clsx = cx

/**
 * Merge classes with Tailwind-style conflict resolution
 * Later classes override earlier ones for the same utility
 *
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('bg-red-500', 'bg-blue-500') // 'bg-blue-500'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  const merged = cx(...inputs)
  return mergeClasses(merged)
}

/**
 * Class conflict groups - classes in the same group override each other
 */
const conflictGroups: Record<string, RegExp> = {
  // Spacing
  padding: /^p[xytblr]?-/,
  margin: /^-?m[xytblr]?-/,
  gap: /^gap-/,
  space: /^space-[xy]-/,

  // Sizing
  width: /^w-/,
  minWidth: /^min-w-/,
  maxWidth: /^max-w-/,
  height: /^h-/,
  minHeight: /^min-h-/,
  maxHeight: /^max-h-/,

  // Colors
  textColor: /^text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|coral|white|black|transparent|current)-/,
  bgColor: /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|coral|white|black|transparent|current)-/,
  borderColor: /^border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|coral|white|black|transparent|current)-/,

  // Typography
  fontSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
  fontWeight: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  fontFamily: /^font-(sans|serif|mono)$/,
  textAlign: /^text-(left|center|right|justify|start|end)$/,
  lineHeight: /^leading-/,
  letterSpacing: /^tracking-/,

  // Layout
  display: /^(block|inline-block|inline|flex|inline-flex|table|inline-table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|flow-root|grid|inline-grid|contents|list-item|hidden)$/,
  position: /^(static|fixed|absolute|relative|sticky)$/,
  overflow: /^overflow-/,
  zIndex: /^z-/,

  // Flexbox
  flexDirection: /^flex-(row|row-reverse|col|col-reverse)$/,
  flexWrap: /^flex-(wrap|wrap-reverse|nowrap)$/,
  flex: /^flex-(1|auto|initial|none)$/,
  flexGrow: /^grow/,
  flexShrink: /^shrink/,
  justifyContent: /^justify-/,
  alignItems: /^items-/,
  alignContent: /^content-/,
  alignSelf: /^self-/,

  // Grid
  gridCols: /^grid-cols-/,
  gridRows: /^grid-rows-/,
  gridFlow: /^grid-flow-/,
  colSpan: /^col-/,
  rowSpan: /^row-/,

  // Borders
  borderWidth: /^border(-[xytblr])?-?\d*$/,
  borderRadius: /^rounded/,
  borderStyle: /^border-(solid|dashed|dotted|double|hidden|none)$/,

  // Effects
  opacity: /^opacity-/,
  shadow: /^shadow/,
  blur: /^blur/,

  // Transforms
  scale: /^scale-/,
  rotate: /^rotate-/,
  translate: /^translate-/,
  skew: /^skew-/,

  // Transitions
  transition: /^transition/,
  duration: /^duration-/,
  ease: /^ease-/,
  delay: /^delay-/,

  // Interactivity
  cursor: /^cursor-/,
  pointerEvents: /^pointer-events-/,
  userSelect: /^select-/,
}

/**
 * Merge classes with conflict resolution
 */
function mergeClasses(classString: string): string {
  const classes = classString.split(/\s+/).filter(Boolean)
  const groups = new Map<string, string>()
  const ungrouped: string[] = []

  for (const cls of classes) {
    // Remove variant prefixes for conflict detection
    const baseClass = cls.replace(/^(hover:|focus:|active:|disabled:|dark:|sm:|md:|lg:|xl:|2xl:)+/, '')

    let matched = false
    for (const [groupName, pattern] of Object.entries(conflictGroups)) {
      if (pattern.test(baseClass)) {
        // Include variant prefix in the key to allow different variants
        const prefix = cls.slice(0, cls.length - baseClass.length)
        groups.set(`${prefix}${groupName}`, cls)
        matched = true
        break
      }
    }

    if (!matched) {
      ungrouped.push(cls)
    }
  }

  // Combine grouped (deduplicated) and ungrouped classes
  return [...groups.values(), ...ungrouped].join(' ')
}

/**
 * Conditionally join class names
 *
 * @example
 * ```ts
 * classNames('foo', isActive && 'active', hasError && 'error')
 * ```
 */
export function classNames(...args: (string | undefined | null | false)[]): string {
  return args.filter(Boolean).join(' ')
}

/**
 * Create a class name with BEM-like modifiers
 *
 * @example
 * ```ts
 * bem('button', { size: 'lg', variant: 'primary' })
 * // 'button button--size-lg button--variant-primary'
 * ```
 */
export function bem(
  base: string,
  modifiers: Record<string, string | boolean | undefined | null>
): string {
  const classes = [base]

  for (const [key, value] of Object.entries(modifiers)) {
    if (value === true) {
      classes.push(`${base}--${key}`)
    } else if (typeof value === 'string' && value) {
      classes.push(`${base}--${key}-${value}`)
    }
  }

  return classes.join(' ')
}

/**
 * Split a class string into an array
 */
export function splitClasses(classString: string): string[] {
  return classString.split(/\s+/).filter(Boolean)
}

/**
 * Check if a class string contains a specific class
 */
export function hasClass(classString: string, className: string): boolean {
  return splitClasses(classString).includes(className)
}

/**
 * Add a class to a class string if not already present
 */
export function addClass(classString: string, className: string): string {
  if (hasClass(classString, className)) {
    return classString
  }
  return cx(classString, className)
}

/**
 * Remove a class from a class string
 */
export function removeClass(classString: string, className: string): string {
  return splitClasses(classString)
    .filter(c => c !== className)
    .join(' ')
}

/**
 * Toggle a class in a class string
 */
export function toggleClass(classString: string, className: string, force?: boolean): string {
  const has = hasClass(classString, className)
  const shouldAdd = force ?? !has

  if (shouldAdd && !has) {
    return addClass(classString, className)
  } else if (!shouldAdd && has) {
    return removeClass(classString, className)
  }

  return classString
}
