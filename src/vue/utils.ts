/**
 * CoralCSS Vue Utilities
 *
 * Utility functions for class name handling in Vue.
 * @module vue/utils
 */

type ClassValue = string | number | boolean | null | undefined | ClassValue[]
type ClassObject = Record<string, boolean | null | undefined>

/**
 * Combine class names conditionally (clsx-compatible)
 *
 * @example
 * ```ts
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
 * Create a variant-aware class name generator (CVA-like)
 *
 * @example
 * ```ts
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
  return (props?: Partial<{ [K in keyof V]: keyof V[K] }> & { class?: string }) => {
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

    // Vue uses 'class' instead of 'className'
    if (props?.class) {
      classes.push(props.class)
    }

    return cn(...classes)
  }
}

/**
 * Type-safe variant props extractor
 */
export type VariantProps<T extends (...args: unknown[]) => string> =
  T extends (props?: infer P) => string ? Omit<P, 'class'> : never

/**
 * Merge class names with conflict resolution
 * Last class wins for conflicting utilities
 */
export function merge(...inputs: (ClassValue | ClassObject)[]): string {
  const combined = cn(...inputs)
  const classes = combined.split(/\s+/).filter(Boolean)

  // Simple deduplication
  const seen = new Map<string, string>()

  for (const cls of classes) {
    const prefix = extractPrefix(cls)
    seen.set(prefix, cls)
  }

  return Array.from(seen.values()).join(' ')
}

/**
 * Extract utility prefix for conflict detection
 */
function extractPrefix(className: string): string {
  const parts = className.split(':')
  const utility = parts[parts.length - 1] ?? className

  const isNegative = utility.startsWith('-')
  const cleanUtility = isNegative ? utility.slice(1) : utility

  const match = cleanUtility.match(/^([a-z-]+)-/)
  if (match) {
    const prefix = match[1]
    if (['bg', 'text', 'border', 'ring', 'fill', 'stroke'].includes(prefix ?? '')) {
      const colorMatch = cleanUtility.match(/^([a-z]+-[a-z]+)/)
      return (isNegative ? '-' : '') + parts.slice(0, -1).join(':') + ':' + (colorMatch?.[1] ?? prefix)
    }
    return (isNegative ? '-' : '') + parts.slice(0, -1).join(':') + ':' + prefix
  }

  return className
}

/**
 * Define component variants for Vue components
 *
 * @example
 * ```ts
 * // button.ts
 * export const buttonVariants = defineVariants({
 *   base: 'inline-flex items-center justify-center rounded-md font-medium',
 *   variants: {
 *     variant: {
 *       default: 'bg-coral-500 text-white hover:bg-coral-600',
 *       outline: 'border border-coral-500 text-coral-500 hover:bg-coral-50',
 *       ghost: 'hover:bg-coral-100 text-coral-500',
 *     },
 *     size: {
 *       sm: 'h-8 px-3 text-sm',
 *       md: 'h-10 px-4',
 *       lg: 'h-12 px-6 text-lg',
 *     },
 *   },
 *   defaultVariants: {
 *     variant: 'default',
 *     size: 'md',
 *   },
 * })
 *
 * // Button.vue
 * <script setup lang="ts">
 * import { buttonVariants, type VariantProps } from './button'
 *
 * interface Props extends VariantProps<typeof buttonVariants> {
 *   class?: string
 * }
 *
 * const props = defineProps<Props>()
 * const className = computed(() => buttonVariants(props))
 * </script>
 * ```
 */
export function defineVariants<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
  compoundVariants?: Array<{
    [K in keyof V]?: keyof V[K]
  } & { className: string }>
}) {
  return cva(config.base ?? '', config as {
    variants?: V
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
    compoundVariants?: Array<{ [K in keyof V]?: keyof V[K] } & { className: string }>
  })
}
