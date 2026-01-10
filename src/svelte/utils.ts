/**
 * CoralCSS Svelte Utilities
 *
 * Utility functions for class name handling in Svelte.
 * @module svelte/utils
 */

type ClassValue = string | number | boolean | null | undefined | ClassValue[]
type ClassObject = Record<string, boolean | null | undefined>

/**
 * Combine class names conditionally (clsx-compatible)
 *
 * @example
 * ```svelte
 * <script>
 *   import { cn } from '@coral-css/core/svelte'
 *
 *   let isActive = false
 *   $: className = cn('base', isActive && 'active', { disabled: !isActive })
 * </script>
 *
 * <div class={className}>Content</div>
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
 * ```svelte
 * <script>
 *   import { cva } from '@coral-css/core/svelte'
 *
 *   const button = cva('px-4 py-2 rounded font-medium', {
 *     variants: {
 *       intent: {
 *         primary: 'bg-coral-500 text-white hover:bg-coral-600',
 *         secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
 *       },
 *       size: {
 *         sm: 'text-sm h-8',
 *         md: 'text-base h-10',
 *         lg: 'text-lg h-12',
 *       },
 *     },
 *     defaultVariants: {
 *       intent: 'primary',
 *       size: 'md',
 *     },
 *   })
 *
 *   let variant = 'primary'
 *   let size = 'md'
 *   $: className = button({ intent: variant, size })
 * </script>
 *
 * <button class={className}>Click me</button>
 * ```
 */
export function cva<V extends Record<string, Record<string, string>>>(
  base: string,
  config?: {
    variants?: V
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
    compoundVariants?: Array<{
      [K in keyof V]?: keyof V[K]
    } & { class: string }>
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
        const { class: compoundClass, ...conditions } = compound
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
 * Define component variants (for use with Svelte components)
 *
 * @example
 * ```ts
 * // button.ts
 * import { defineVariants } from '@coral-css/core/svelte'
 *
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
 * ```
 */
export function defineVariants<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
  compoundVariants?: Array<{
    [K in keyof V]?: keyof V[K]
  } & { class: string }>
}) {
  return cva(config.base ?? '', config as {
    variants?: V
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
    compoundVariants?: Array<{ [K in keyof V]?: keyof V[K] } & { class: string }>
  })
}

/**
 * Create responsive class names
 *
 * @example
 * ```svelte
 * <script>
 *   import { responsive } from '@coral-css/core/svelte'
 *
 *   const className = responsive({
 *     base: 'p-2',
 *     sm: 'p-4',
 *     md: 'p-6',
 *     lg: 'p-8',
 *   })
 * </script>
 *
 * <div class={className}>Responsive padding</div>
 * ```
 */
export function responsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}): string {
  const result: string[] = []

  if (classes.base) {
    result.push(classes.base)
  }
  if (classes.sm) {
    result.push(classes.sm.split(' ').map(c => `sm:${c}`).join(' '))
  }
  if (classes.md) {
    result.push(classes.md.split(' ').map(c => `md:${c}`).join(' '))
  }
  if (classes.lg) {
    result.push(classes.lg.split(' ').map(c => `lg:${c}`).join(' '))
  }
  if (classes.xl) {
    result.push(classes.xl.split(' ').map(c => `xl:${c}`).join(' '))
  }
  if (classes['2xl']) {
    result.push(classes['2xl'].split(' ').map(c => `2xl:${c}`).join(' '))
  }

  return result.join(' ')
}
