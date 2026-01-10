/**
 * CoralCSS Preact Utilities
 *
 * Utility functions for class name handling in Preact.
 * @module preact/utils
 */

type ClassValue = string | number | boolean | null | undefined | ClassValue[]
type ClassObject = Record<string, boolean | null | undefined>

/**
 * Combine class names conditionally (clsx-compatible)
 *
 * @example
 * ```tsx
 * cn('base', condition && 'conditional', { active: isActive })
 * // Returns: 'base conditional active' (if conditions are true)
 * ```
 */
export function cn(...inputs: (ClassValue | ClassObject)[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) {
      continue
    }

    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'number') {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const nested = cn(...input)
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
 * Alias for cn (clsx compatibility)
 */
export const cx = cn

/**
 * Merge class names, deduplicating and handling conflicts
 * Last class wins for conflicting utilities
 *
 * @example
 * ```tsx
 * merge('p-2 bg-red-500', 'p-4 bg-blue-500')
 * // Returns: 'p-4 bg-blue-500' (last values win)
 * ```
 */
export function merge(...inputs: (ClassValue | ClassObject)[]): string {
  const combined = cn(...inputs)
  const classes = combined.split(/\s+/).filter(Boolean)

  // Simple deduplication - more advanced conflict resolution could be added
  const seen = new Map<string, string>()

  for (const cls of classes) {
    // Extract utility prefix for conflict detection
    const prefix = extractPrefix(cls)
    seen.set(prefix, cls)
  }

  return Array.from(seen.values()).join(' ')
}

/**
 * Extract utility prefix for conflict detection
 */
function extractPrefix(className: string): string {
  // Handle variants
  const parts = className.split(':')
  const utility = parts[parts.length - 1] ?? className

  // Handle negative prefix
  const isNegative = utility.startsWith('-')
  const cleanUtility = isNegative ? utility.slice(1) : utility

  // Extract prefix up to the value
  // e.g., 'p-4' -> 'p', 'bg-red-500' -> 'bg-red', 'text-xl' -> 'text'
  const match = cleanUtility.match(/^([a-z-]+)-/)
  if (match) {
    const prefix = match[1]
    // Special handling for color utilities
    if (['bg', 'text', 'border', 'ring', 'fill', 'stroke'].includes(prefix ?? '')) {
      // Include color name: bg-red, text-blue, etc.
      const colorMatch = cleanUtility.match(/^([a-z]+-[a-z]+)/)
      return (isNegative ? '-' : '') + parts.slice(0, -1).join(':') + ':' + (colorMatch?.[1] ?? prefix)
    }
    return (isNegative ? '-' : '') + parts.slice(0, -1).join(':') + ':' + prefix
  }

  // Return full class if no prefix pattern matches
  return className
}

/**
 * Create a variant-aware class name generator (CVA-like)
 *
 * @example
 * ```tsx
 * const button = cva('px-4 py-2 rounded', {
 *   variants: {
 *     intent: {
 *       primary: 'bg-coral-500 text-white',
 *       secondary: 'bg-gray-200 text-gray-800',
 *     },
 *     size: {
 *       sm: 'text-sm',
 *       md: 'text-base',
 *       lg: 'text-lg',
 *     },
 *   },
 *   defaultVariants: {
 *     intent: 'primary',
 *     size: 'md',
 *   },
 * })
 *
 * button({ intent: 'secondary', size: 'lg' })
 * // Returns: 'px-4 py-2 rounded bg-gray-200 text-gray-800 text-lg'
 * ```
 */
export function cva<V extends Record<string, Record<string, string>>>(
  base: string,
  config?: {
    variants?: V
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
    compoundVariants?: Array<{
      [K in keyof V]?: keyof V[K]
    } & { className: string }>
  }
) {
  return (props?: Partial<{ [K in keyof V]: keyof V[K] }> & { className?: string }) => {
    const classes: string[] = [base]

    if (config?.variants) {
      for (const [variantName, variantValues] of Object.entries(config.variants)) {
        const value = (props?.[variantName as keyof V] ?? config.defaultVariants?.[variantName as keyof V]) as string | undefined
        if (value !== undefined && variantValues[value]) {
          classes.push(variantValues[value])
        }
      }
    }

    if (config?.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { className: compoundClass, ...conditions } = compound
        let matches = true

        for (const [key, value] of Object.entries(conditions)) {
          const propValue = props?.[key as keyof V] ?? config.defaultVariants?.[key as keyof V]
          if (propValue !== value) {
            matches = false
            break
          }
        }

        if (matches) {
          classes.push(compoundClass)
        }
      }
    }

    if (props?.className) {
      classes.push(props.className)
    }

    return cn(...classes)
  }
}

/**
 * Type-safe variant props extractor
 */
export type VariantProps<T extends (...args: unknown[]) => string> =
  T extends (props?: infer P) => string ? Omit<P, 'className'> : never
